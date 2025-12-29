import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/db/prisma';
import { getAdminUser } from '@/lib/auth/admin';

export async function GET(request: NextRequest) {
  try {
    const admin = await getAdminUser();
    if (!admin) {
      return NextResponse.json({ error: 'No autorizado' }, { status: 401 });
    }

    const { searchParams } = new URL(request.url);
    const status = searchParams.get('status');
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '20');
    const skip = (page - 1) * limit;

    const where = status ? { status: status as any } : {};

    const [properties, total] = await Promise.all([
      prisma.property.findMany({
        where,
        include: {
          images: { orderBy: { order: 'asc' }, take: 1 },
          client: { select: { name: true, email: true } },
        },
        orderBy: { createdAt: 'desc' },
        skip,
        take: limit,
      }),
      prisma.property.count({ where }),
    ]);

    return NextResponse.json({
      properties,
      pagination: { page, limit, total, pages: Math.ceil(total / limit) },
    });
  } catch (error) {
    console.error('Error fetching properties:', error);
    return NextResponse.json({ error: 'Error interno' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const admin = await getAdminUser();
    if (!admin) {
      return NextResponse.json({ error: 'No autorizado' }, { status: 401 });
    }

    const body = await request.json();

    const property = await prisma.property.create({
      data: {
        title: body.title,
        description: body.description,
        price: body.price,
        address: body.address,
        city: body.city || 'Madrid',
        neighborhood: body.neighborhood || null,
        postalCode: body.postalCode || null,
        propertyType: body.propertyType || 'APARTMENT',
        bedrooms: body.bedrooms,
        bathrooms: body.bathrooms,
        squareMeters: body.squareMeters,
        floor: body.floor || null,
        hasElevator: body.hasElevator || false,
        hasParking: body.hasParking || false,
        hasStorage: body.hasStorage || false,
        hasTerrace: body.hasTerrace || false,
        hasPool: body.hasPool || false,
        hasAC: body.hasAC || false,
        yearBuilt: body.yearBuilt || null,
        energyRating: body.energyRating || null,
        status: body.status || 'DRAFT',
        featured: body.featured || false,
        agentId: admin.id,
      },
      include: { images: true },
    });

    await prisma.propertyActivity.create({
      data: {
        type: 'CREATED',
        description: 'Propiedad creada',
        actorType: 'admin',
        actorId: admin.id,
        propertyId: property.id,
      },
    });

    return NextResponse.json({ property }, { status: 201 });
  } catch (error) {
    console.error('Error creating property:', error);
    return NextResponse.json({ error: 'Error interno' }, { status: 500 });
  }
}
