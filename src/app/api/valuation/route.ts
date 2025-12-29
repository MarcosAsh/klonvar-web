import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/db/prisma'
import { valuationRequestSchema } from '@/lib/validation/schemas'
import { sendValuationNotification } from '@/lib/email'
import { checkRateLimit, getRateLimitIdentifier } from '@/lib/utils/rate-limit'

export async function POST(request: NextRequest) {
  try {
    // Rate limiting
    const identifier = getRateLimitIdentifier(request)
    const rateLimit = checkRateLimit(`valuation:${identifier}`)

    if (!rateLimit.allowed) {
      return NextResponse.json(
        { error: 'Demasiadas solicitudes. Por favor, espera unos minutos.' },
        { status: 429 }
      )
    }

    const body = await request.json()
    const validation = valuationRequestSchema.safeParse(body)

    if (!validation.success) {
      return NextResponse.json(
        { error: 'Datos inválidos', details: validation.error.flatten() },
        { status: 400 }
      )
    }

    const data = validation.data

    // Save to database
    const valuationRequest = await prisma.valuationRequest.create({
      data: {
        name: data.name,
        email: data.email,
        phone: data.phone,
        address: data.address,
        message: data.message || null,
      },
    })

    // Send email notification
    try {
      await sendValuationNotification(data)
    } catch (emailError) {
      console.error('Failed to send valuation notification:', emailError)
      // Don't fail the request if email fails
    }

    return NextResponse.json(
      {
        success: true,
        message: 'Solicitud recibida. Te contactaremos pronto.',
        id: valuationRequest.id,
      },
      { status: 201 }
    )
  } catch (error) {
    console.error('Error creating valuation request:', error)
    return NextResponse.json(
      { error: 'Error interno del servidor' },
      { status: 500 }
    )
  }
}
