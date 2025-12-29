import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/db/prisma'
import { contactRequestSchema } from '@/lib/validation/schemas'
import { sendContactNotification } from '@/lib/email'
import { checkRateLimit, getRateLimitIdentifier } from '@/lib/utils/rate-limit'

export async function POST(request: NextRequest) {
  try {
    // Rate limiting
    const identifier = getRateLimitIdentifier(request)
    const rateLimit = checkRateLimit(`contact:${identifier}`)

    if (!rateLimit.allowed) {
      return NextResponse.json(
        { error: 'Demasiadas solicitudes. Por favor, espera unos minutos.' },
        { status: 429 }
      )
    }

    const body = await request.json()
    const validation = contactRequestSchema.safeParse(body)

    if (!validation.success) {
      return NextResponse.json(
        { error: 'Datos inválidos', details: validation.error.flatten() },
        { status: 400 }
      )
    }

    const data = validation.data

    // Save to database
    const contactRequest = await prisma.contactRequest.create({
      data: {
        name: data.name,
        email: data.email,
        phone: data.phone || null,
        subject: data.subject || null,
        message: data.message,
        propertyId: data.propertyId || null,
      },
    })

    // Send email notification
    try {
      await sendContactNotification(data)
    } catch (emailError) {
      console.error('Failed to send contact notification:', emailError)
      // Don't fail the request if email fails
    }

    return NextResponse.json(
      {
        success: true,
        message: 'Mensaje recibido. Te contactaremos pronto.',
        id: contactRequest.id,
      },
      { status: 201 }
    )
  } catch (error) {
    console.error('Error creating contact request:', error)
    return NextResponse.json(
      { error: 'Error interno del servidor' },
      { status: 500 }
    )
  }
}
