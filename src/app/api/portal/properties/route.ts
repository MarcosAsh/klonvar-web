import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'
import { prisma } from '@/lib/db/prisma'
import { propertySchema } from '@/lib/validation/schemas'

// GET client's properties
export async function GET() {
  try {
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

    const properties = await prisma.property.findMany({
      where: { clientId: client.id },
      include: {
        images: {
          orderBy: { order: 'asc' },
          take: 5,
        },
      },
      orderBy: { createdAt: 'desc' },
    })

    return NextResponse.json({ properties })
  } catch (error) {
    console.error('Error fetching properties:', error)
    return NextResponse.json({ error: 'Error interno' }, { status: 500 })
  }
}

// POST create new property
export async function POST(request: NextRequest) {
  try {
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

    const body = await request.json()
    const validation = propertySchema.safeParse(body)

    if (!validation.success) {
      return NextResponse.json(
        { error: 'Datos inválidos', details: validation.error.flatten() },
        { status: 400 }
      )
    }

    const data = validation.data

    const property = await prisma.property.create({
      data: {
        ...data,
        clientId: client.id,
        status: 'DRAFT',
      },
      include: {
        images: true,
      },
    })

    // Log activity
    await prisma.propertyActivity.create({
      data: {
        type: 'CREATED',
        description: 'Propiedad creada',
        actorType: 'client',
        actorId: client.id,
        propertyId: property.id,
      },
    })

    return NextResponse.json({ property }, { status: 201 })
  } catch (error) {
    console.error('Error creating property:', error)
    return NextResponse.json({ error: 'Error interno' }, { status: 500 })
  }
}
