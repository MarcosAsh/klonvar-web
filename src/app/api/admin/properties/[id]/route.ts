import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/db/prisma';
import { getAdminUser } from '@/lib/auth/admin';

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const admin = await getAdminUser();
    if (!admin) {
      return NextResponse.json({ error: 'No autorizado' }, { status: 401 });
    }

    const property = await prisma.property.findUnique({
      where: { id: params.id },
      include: {
        images: { orderBy: { order: 'asc' } },
        client: true,
        activities: { orderBy: { createdAt: 'desc' }, take: 10 },
      },
    });

    if (!property) {
      return NextResponse.json({ error: 'No encontrado' }, { status: 404 });
    }

    return NextResponse.json({ property });
  } catch (error) {
    console.error('Error fetching property:', error);
    return NextResponse.json({ error: 'Error interno' }, { status: 500 });
  }
}

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

    const property = await prisma.property.update({
      where: { id: params.id },
      data: {
        ...(body.title && { title: body.title }),
        ...(body.description && { description: body.description }),
        ...(body.price && { price: body.price }),
        ...(body.address && { address: body.address }),
        ...(body.city && { city: body.city }),
        ...(body.neighborhood !== undefined && { neighborhood: body.neighborhood }),
        ...(body.postalCode !== undefined && { postalCode: body.postalCode }),
        ...(body.propertyType && { propertyType: body.propertyType }),
        ...(body.bedrooms !== undefined && { bedrooms: body.bedrooms }),
        ...(body.bathrooms !== undefined && { bathrooms: body.bathrooms }),
        ...(body.squareMeters !== undefined && { squareMeters: body.squareMeters }),
        ...(body.floor !== undefined && { floor: body.floor }),
        ...(body.hasElevator !== undefined && { hasElevator: body.hasElevator }),
        ...(body.hasParking !== undefined && { hasParking: body.hasParking }),
        ...(body.hasStorage !== undefined && { hasStorage: body.hasStorage }),
        ...(body.hasTerrace !== undefined && { hasTerrace: body.hasTerrace }),
        ...(body.hasPool !== undefined && { hasPool: body.hasPool }),
        ...(body.hasAC !== undefined && { hasAC: body.hasAC }),
        ...(body.yearBuilt !== undefined && { yearBuilt: body.yearBuilt }),
        ...(body.energyRating !== undefined && { energyRating: body.energyRating }),
        ...(body.status && { status: body.status }),
        ...(body.featured !== undefined && { featured: body.featured }),
      },
      include: { images: true },
    });

    await prisma.propertyActivity.create({
      data: {
        type: 'UPDATED',
        description: 'Propiedad actualizada',
        actorType: 'admin',
        actorId: admin.id,
        propertyId: property.id,
      },
    });

    return NextResponse.json({ property });
  } catch (error) {
    console.error('Error updating property:', error);
    return NextResponse.json({ error: 'Error interno' }, { status: 500 });
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const admin = await getAdminUser();
    if (!admin) {
      return NextResponse.json({ error: 'No autorizado' }, { status: 401 });
    }

    await prisma.property.delete({ where: { id: params.id } });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error deleting property:', error);
    return NextResponse.json({ error: 'Error interno' }, { status: 500 });
  }
}
