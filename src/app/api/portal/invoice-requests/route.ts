import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'
import { prisma } from '@/lib/db/prisma'
import { sendInvoiceRequestNotification } from '@/lib/email/invoices'
import { z } from 'zod'

const invoiceRequestSchema = z.object({
  propertyId: z.string().cuid().optional(),
  description: z.string().min(1, 'La descripción es requerida').max(1000, 'La descripción es muy larga'),
  amount: z.number().positive('El monto debe ser positivo').optional(),
  invoiceType: z.enum(['RENT', 'MAINTENANCE', 'SERVICE', 'OTHER']).default('OTHER'),
})

// GET client's invoice requests
export async function GET(request: NextRequest) {
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

    const invoiceRequests = await prisma.invoiceRequest.findMany({
      where: { clientId: client.id },
      include: {
        property: {
          select: { id: true, title: true, address: true },
        },
      },
      orderBy: { createdAt: 'desc' },
    })

    return NextResponse.json({ invoiceRequests })
  } catch (error) {
    console.error('Error fetching invoice requests:', error)
    return NextResponse.json({ error: 'Error interno' }, { status: 500 })
  }
}

// POST create a new invoice request
export async function POST(request: NextRequest) {
  try {
    const supabase = await createClient()
    const { data: { user }, error: authError } = await supabase.auth.getUser()

    if (authError || !user) {
      return NextResponse.json({ error: 'No autorizado' }, { status: 401 })
    }

    const client = await prisma.client.findUnique({
      where: { authId: user.id },
      select: { id: true, name: true, email: true, phone: true },
    })

    if (!client) {
      return NextResponse.json({ error: 'Perfil no encontrado' }, { status: 404 })
    }

    const body = await request.json()
    const validation = invoiceRequestSchema.safeParse(body)

    if (!validation.success) {
      return NextResponse.json(
        { error: 'Datos inválidos', details: validation.error.flatten() },
        { status: 400 }
      )
    }

    const { propertyId, description, amount, invoiceType } = validation.data

    // Verify property ownership if propertyId is provided
    let property = null
    if (propertyId) {
      property = await prisma.property.findFirst({
        where: { id: propertyId, clientId: client.id },
        select: { id: true, title: true, address: true },
      })
      if (!property) {
        return NextResponse.json({ error: 'Propiedad no encontrada' }, { status: 404 })
      }
    }

    const invoiceRequest = await prisma.invoiceRequest.create({
      data: {
        description,
        amount,
        invoiceType,
        status: 'PENDING',
        clientId: client.id,
        propertyId: propertyId || null,
      },
      include: {
        property: {
          select: { id: true, title: true, address: true },
        },
      },
    })

    // Send email notification to admin
    try {
      await sendInvoiceRequestNotification({
        clientName: client.name,
        clientEmail: client.email,
        clientPhone: client.phone,
        description,
        amount,
        invoiceType,
        propertyTitle: property?.title,
        propertyAddress: property?.address,
        requestId: invoiceRequest.id,
      })
    } catch (emailError) {
      console.error('Failed to send invoice request notification:', emailError)
    }

    return NextResponse.json({ invoiceRequest }, { status: 201 })
  } catch (error) {
    console.error('Error creating invoice request:', error)
    return NextResponse.json({ error: 'Error interno' }, { status: 500 })
  }
}
