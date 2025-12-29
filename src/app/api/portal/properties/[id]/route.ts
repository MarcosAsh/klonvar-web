import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'
import { prisma } from '@/lib/db/prisma'
import { propertySchema } from '@/lib/validation/schemas'
import { deletePropertyImages } from '@/lib/storage'

interface RouteParams {
  params: Promise<{ id: string }>
}

// GET single property
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

    const property = await prisma.property.findFirst({
      where: {
        id,
        clientId: client.id,
      },
      include: {
        images: { orderBy: { order: 'asc' } },
        documents: { where: { visibleToClient: true } },
        activities: {
          orderBy: { createdAt: 'desc' },
          take: 10,
        },
        valuation: true,
        contract: true,
      },
    })

    if (!property) {
      return NextResponse.json({ error: 'Propiedad no encontrada' }, { status: 404 })
    }

    return NextResponse.json({ property })
  } catch (error) {
    console.error('Error fetching property:', error)
    return NextResponse.json({ error: 'Error interno' }, { status: 500 })
  }
}

// PATCH update property
export async function PATCH(request: NextRequest, { params }: RouteParams) {
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

    // Check ownership
    const existingProperty = await prisma.property.findFirst({
      where: { id, clientId: client.id },
    })

    if (!existingProperty) {
      return NextResponse.json({ error: 'Propiedad no encontrada' }, { status: 404 })
    }

    const body = await request.json()
    const validation = propertySchema.partial().safeParse(body)

    if (!validation.success) {
      return NextResponse.json(
        { error: 'Datos inválidos', details: validation.error.flatten() },
        { status: 400 }
      )
    }

    const property = await prisma.property.update({
      where: { id },
      data: validation.data,
      include: { images: true },
    })

    // Log activity
    await prisma.propertyActivity.create({
      data: {
        type: 'UPDATED',
        description: 'Propiedad actualizada',
        actorType: 'client',
        actorId: client.id,
        propertyId: property.id,
      },
    })

    return NextResponse.json({ property })
  } catch (error) {
    console.error('Error updating property:', error)
    return NextResponse.json({ error: 'Error interno' }, { status: 500 })
  }
}

// DELETE property
export async function DELETE(request: NextRequest, { params }: RouteParams) {
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

    // Check ownership and get images
    const property = await prisma.property.findFirst({
      where: { id, clientId: client.id },
      include: { images: true },
    })

    if (!property) {
      return NextResponse.json({ error: 'Propiedad no encontrada' }, { status: 404 })
    }

    // Delete images from storage
    if (property.images.length > 0) {
      const paths = property.images.map((img) => img.path)
      await deletePropertyImages(paths)
    }

    // Delete property (cascades to images, activities)
    await prisma.property.delete({
      where: { id },
    })

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Error deleting property:', error)
    return NextResponse.json({ error: 'Error interno' }, { status: 500 })
  }
}
