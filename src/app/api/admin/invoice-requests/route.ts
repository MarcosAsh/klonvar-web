import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/db/prisma'
import { getAdminUser } from '@/lib/auth/admin'
import { sendInvoiceStatusNotification } from '@/lib/email/invoices'
import { z } from 'zod'

const updateSchema = z.object({
  status: z.enum(['PENDING', 'PROCESSING', 'COMPLETED', 'REJECTED']),
  adminNotes: z.string().max(1000).optional(),
})

// GET all invoice requests
export async function GET(request: NextRequest) {
  try {
    const admin = await getAdminUser()
    if (!admin) {
      return NextResponse.json({ error: 'No autorizado' }, { status: 401 })
    }

    const { searchParams } = new URL(request.url)
    const status = searchParams.get('status')

    const invoiceRequests = await prisma.invoiceRequest.findMany({
      where: status ? { status } : undefined,
      include: {
        client: {
          select: { id: true, name: true, email: true, phone: true },
        },
        property: {
          select: { id: true, title: true, address: true },
        },
      },
      orderBy: { createdAt: 'desc' },
    })

    // Get counts by status
    const counts = await prisma.invoiceRequest.groupBy({
      by: ['status'],
      _count: true,
    })

    const statusCounts = {
      PENDING: 0,
      PROCESSING: 0,
      COMPLETED: 0,
      REJECTED: 0,
      total: invoiceRequests.length,
    }

    counts.forEach((c) => {
      statusCounts[c.status as keyof typeof statusCounts] = c._count
    })

    return NextResponse.json({ invoiceRequests, counts: statusCounts })
  } catch (error) {
    console.error('Error fetching invoice requests:', error)
    return NextResponse.json({ error: 'Error interno' }, { status: 500 })
  }
}

// PATCH update invoice request status
export async function PATCH(request: NextRequest) {
  try {
    const admin = await getAdminUser()
    if (!admin) {
      return NextResponse.json({ error: 'No autorizado' }, { status: 401 })
    }

    const { searchParams } = new URL(request.url)
    const id = searchParams.get('id')

    if (!id) {
      return NextResponse.json({ error: 'ID requerido' }, { status: 400 })
    }

    const body = await request.json()
    const validation = updateSchema.safeParse(body)

    if (!validation.success) {
      return NextResponse.json(
        { error: 'Datos inválidos', details: validation.error.flatten() },
        { status: 400 }
      )
    }

    const { status, adminNotes } = validation.data

    const invoiceRequest = await prisma.invoiceRequest.update({
      where: { id },
      data: {
        status,
        adminNotes,
        processedAt: status === 'COMPLETED' || status === 'REJECTED' ? new Date() : undefined,
        processedBy: admin.id,
      },
      include: {
        client: {
          select: { id: true, name: true, email: true },
        },
        property: {
          select: { id: true, title: true },
        },
      },
    })

    // Send notification to client about status change
    try {
      await sendInvoiceStatusNotification({
        clientName: invoiceRequest.client!.name,
        clientEmail: invoiceRequest.client!.email,
        status,
        description: invoiceRequest.description,
        adminNotes,
        propertyTitle: invoiceRequest.property?.title,
      })
    } catch (emailError) {
      console.error('Failed to send status notification:', emailError)
    }

    // Create notification for client
    await prisma.notification.create({
      data: {
        type: 'INVOICE_UPDATE',
        title: 'Actualización de solicitud de factura',
        message: `Tu solicitud de factura ha sido ${
          status === 'COMPLETED' ? 'completada' :
          status === 'REJECTED' ? 'rechazada' :
          status === 'PROCESSING' ? 'puesta en proceso' : 'actualizada'
        }`,
        actionUrl: '/portal/invoices',
        clientId: invoiceRequest.clientId!,
      },
    })

    return NextResponse.json({ invoiceRequest })
  } catch (error) {
    console.error('Error updating invoice request:', error)
    return NextResponse.json({ error: 'Error interno' }, { status: 500 })
  }
}
