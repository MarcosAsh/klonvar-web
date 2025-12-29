import { NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'
import { prisma } from '@/lib/db/prisma'

// GET current user profile
export async function GET() {
  try {
    const supabase = await createClient()
    const { data: { user }, error: authError } = await supabase.auth.getUser()

    if (authError || !user) {
      return NextResponse.json({ error: 'No autorizado' }, { status: 401 })
    }

    // Find or return client profile
    const client = await prisma.client.findUnique({
      where: { authId: user.id },
      select: {
        id: true,
        email: true,
        name: true,
        phone: true,
        clientType: true,
        status: true,
        createdAt: true,
      },
    })

    if (!client) {
      return NextResponse.json({ error: 'Perfil no encontrado' }, { status: 404 })
    }

    return NextResponse.json({ client })
  } catch (error) {
    console.error('Error fetching client profile:', error)
    return NextResponse.json({ error: 'Error interno' }, { status: 500 })
  }
}

// POST - Create client profile after signup
export async function POST(request: Request) {
  try {
    const supabase = await createClient()
    const { data: { user }, error: authError } = await supabase.auth.getUser()

    if (authError || !user) {
      return NextResponse.json({ error: 'No autorizado' }, { status: 401 })
    }

    // Check if client already exists
    const existingClient = await prisma.client.findUnique({
      where: { authId: user.id },
    })

    if (existingClient) {
      return NextResponse.json({ client: existingClient })
    }

    // Create new client profile
    const client = await prisma.client.create({
      data: {
        authId: user.id,
        email: user.email!,
        name: user.user_metadata?.name || user.email?.split('@')[0] || 'Usuario',
        phone: user.user_metadata?.phone || null,
      },
      select: {
        id: true,
        email: true,
        name: true,
        phone: true,
        clientType: true,
        status: true,
        createdAt: true,
      },
    })

    return NextResponse.json({ client }, { status: 201 })
  } catch (error) {
    console.error('Error creating client profile:', error)
    return NextResponse.json({ error: 'Error interno' }, { status: 500 })
  }
}

// PATCH - Update client profile
export async function PATCH(request: Request) {
  try {
    const supabase = await createClient()
    const { data: { user }, error: authError } = await supabase.auth.getUser()

    if (authError || !user) {
      return NextResponse.json({ error: 'No autorizado' }, { status: 401 })
    }

    const body = await request.json()
    const { name, phone, preferredContact } = body

    const client = await prisma.client.update({
      where: { authId: user.id },
      data: {
        ...(name && { name }),
        ...(phone && { phone }),
        ...(preferredContact && { preferredContact }),
      },
      select: {
        id: true,
        email: true,
        name: true,
        phone: true,
        clientType: true,
        status: true,
        createdAt: true,
      },
    })

    return NextResponse.json({ client })
  } catch (error) {
    console.error('Error updating client profile:', error)
    return NextResponse.json({ error: 'Error interno' }, { status: 500 })
  }
}
