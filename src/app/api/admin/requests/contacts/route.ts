import { NextResponse } from 'next/server';
import { prisma } from '@/lib/db/prisma';
import { getAdminUser } from '@/lib/auth/admin';

export async function GET() {
  try {
    const admin = await getAdminUser();
    if (!admin) {
      return NextResponse.json({ error: 'No autorizado' }, { status: 401 });
    }

    const requests = await prisma.contactRequest.findMany({
      orderBy: { createdAt: 'desc' },
    });

    return NextResponse.json({ requests });
  } catch (error) {
    console.error('Error fetching contact requests:', error);
    return NextResponse.json({ error: 'Error interno' }, { status: 500 });
  }
}
