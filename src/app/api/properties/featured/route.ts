import { NextResponse } from 'next/server';
import { prisma } from '@/lib/db/prisma';

export async function GET() {
  try {
    // Get up to 3 featured/available properties with images
    const properties = await prisma.property.findMany({
      where: {
        status: 'AVAILABLE',
      },
      include: {
        images: {
          orderBy: { order: 'asc' },
          take: 1,
        },
      },
      orderBy: [
        { featured: 'desc' },
        { createdAt: 'desc' },
      ],
      take: 3,
    });

    return NextResponse.json({ properties });
  } catch (error) {
    console.error('Error fetching featured properties:', error);
    return NextResponse.json({ properties: [] });
  }
}
