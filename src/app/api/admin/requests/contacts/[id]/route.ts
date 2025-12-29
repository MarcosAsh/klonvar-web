import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/db/prisma';
import { getAdminUser } from '@/lib/auth/admin';

export async function PATCH(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const admin = await getAdminUser();
    if (!admin) {
      return NextResponse.json({ error: 'No autorizado' }, { status: 401 });
    }

    const body = await request.json();

    const updated = await prisma.contactRequest.update({
      where: { id: params.id },
      data: {
        status: body.status,
        notes: body.notes,
      },
    });

    return NextResponse.json({ request: updated });
  } catch (error) {
    console.error('Error updating contact request:', error);
    return NextResponse.json({ error: 'Error interno' }, { status: 500 });
  }
}
