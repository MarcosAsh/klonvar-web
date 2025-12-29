import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'
import { prisma } from '@/lib/db/prisma'
import { deletePropertyImage } from '@/lib/storage'

interface RouteParams {
  params: Promise<{ id: string }>
}

// GET property images
export async function GET(request: NextRequest, { params }: RouteParams) {
  try {
    const { id } = await params
    const supabase = await createClient()
    const { data: { user }, error: authError } = await supabase.auth.getUser()

    if (authError || !user) {
      return NextResponse.json({ error: 'No autorizado' }, { status: 401 })
    }

    const client = await prisma.client.findUnique({
      where: { authId: user.id },
      select: { id: true },
    })

    if (!client) {
      return NextResponse.json({ error: 'Perfil no encontrado' }, { status: 404 })
    }

    // Verify ownership
    const property = await prisma.property.findFirst({
      where: { id, clientId: client.id },
      select: { id: true },
    })

    if (!property) {
      return NextResponse.json({ error: 'Propiedad no encontrada' }, { status: 404 })
    }

    const images = await prisma.propertyImage.findMany({
      where: { propertyId: id },
      orderBy: { order: 'asc' },
    })

    return NextResponse.json({ images })
  } catch (error) {
    console.error('Error fetching images:', error)
    return NextResponse.json({ error: 'Error interno' }, { status: 500 })
  }
}

// POST add image record (after client-side upload to Supabase Storage)
export async function POST(request: NextRequest, { params }: RouteParams) {
  try {
    const { id } = await params
    const supabase = await createClient()
    const { data: { user }, error: authError } = await supabase.auth.getUser()

    if (authError || !user) {
      return NextResponse.json({ error: 'No autorizado' }, { status: 401 })
    }

    const client = await prisma.client.findUnique({
      where: { authId: user.id },
      select: { id: true },
    })

    if (!client) {
      return NextResponse.json({ error: 'Perfil no encontrado' }, { status: 404 })
    }

    // Verify ownership
    const property = await prisma.property.findFirst({
      where: { id, clientId: client.id },
      select: { id: true },
    })

    if (!property) {
      return NextResponse.json({ error: 'Propiedad no encontrada' }, { status: 404 })
    }

    const body = await request.json()
    const { url, path, caption } = body

    if (!url || !path) {
      return NextResponse.json({ error: 'URL y path requeridos' }, { status: 400 })
    }

    // Get current max order
    const lastImage = await prisma.propertyImage.findFirst({
      where: { propertyId: id },
      orderBy: { order: 'desc' },
    })

    const order = (lastImage?.order ?? -1) + 1
    const isPrimary = order === 0

    const image = await prisma.propertyImage.create({
      data: {
        url,
        path,
        caption: caption || null,
        order,
        isPrimary,
        propertyId: id,
        uploadedById: client.id,
      },
    })

    // Log activity
    await prisma.propertyActivity.create({
      data: {
        type: 'IMAGE_ADDED',
        description: 'Imagen añadida',
        actorType: 'client',
        actorId: client.id,
        propertyId: id,
      },
    })

    return NextResponse.json({ image }, { status: 201 })
  } catch (error) {
    console.error('Error adding image:', error)
    return NextResponse.json({ error: 'Error interno' }, { status: 500 })
  }
}

// DELETE image
export async function DELETE(request: NextRequest, { params }: RouteParams) {
  try {
    const { id: propertyId } = await params
    const { searchParams } = new URL(request.url)
    const imageId = searchParams.get('imageId')

    if (!imageId) {
      return NextResponse.json({ error: 'imageId requerido' }, { status: 400 })
    }

    const supabase = await createClient()
    const { data: { user }, error: authError } = await supabase.auth.getUser()

    if (authError || !user) {
      return NextResponse.json({ error: 'No autorizado' }, { status: 401 })
    }

    const client = await prisma.client.findUnique({
      where: { authId: user.id },
      select: { id: true },
    })

    if (!client) {
      return NextResponse.json({ error: 'Perfil no encontrado' }, { status: 404 })
    }

    // Verify ownership
    const property = await prisma.property.findFirst({
      where: { id: propertyId, clientId: client.id },
      select: { id: true },
    })

    if (!property) {
      return NextResponse.json({ error: 'Propiedad no encontrada' }, { status: 404 })
    }

    // Get image
    const image = await prisma.propertyImage.findFirst({
      where: { id: imageId, propertyId },
    })

    if (!image) {
      return NextResponse.json({ error: 'Imagen no encontrada' }, { status: 404 })
    }

    // Delete from storage
    await deletePropertyImage(image.path)

    // Delete from database
    await prisma.propertyImage.delete({
      where: { id: imageId },
    })

    // Log activity
    await prisma.propertyActivity.create({
      data: {
        type: 'IMAGE_REMOVED',
        description: 'Imagen eliminada',
        actorType: 'client',
        actorId: client.id,
        propertyId,
      },
    })

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Error deleting image:', error)
    return NextResponse.json({ error: 'Error interno' }, { status: 500 })
  }
}
