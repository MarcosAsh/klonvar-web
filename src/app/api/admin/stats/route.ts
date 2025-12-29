import { NextResponse } from 'next/server';
import { prisma } from '@/lib/db/prisma';
import { getAdminUser } from '@/lib/auth/admin';

export async function GET() {
  try {
    const admin = await getAdminUser();
    if (!admin) {
      return NextResponse.json({ error: 'No autorizado' }, { status: 401 });
    }

    const [totalProperties, activeProperties, totalClients, pendingValuations, pendingContacts] = await Promise.all([
      prisma.property.count(),
      prisma.property.count({ where: { status: 'AVAILABLE' } }),
      prisma.client.count(),
      prisma.valuationRequest.count({ where: { status: 'PENDING' } }),
      prisma.contactRequest.count({ where: { status: 'PENDING' } }),
    ]);

    return NextResponse.json({
      totalProperties,
      activeProperties,
      totalClients,
      pendingRequests: pendingValuations + pendingContacts,
    });
  } catch (error) {
    console.error('Error fetching stats:', error);
    return NextResponse.json({ error: 'Error interno' }, { status: 500 });
  }
}
