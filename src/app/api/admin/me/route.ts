import { NextResponse } from 'next/server';
import { getAdminUser } from '@/lib/auth/admin';

export async function GET() {
  try {
    const admin = await getAdminUser();

    if (!admin) {
      return NextResponse.json({ error: 'No autorizado' }, { status: 401 });
    }

    return NextResponse.json({ admin });
  } catch (error) {
    console.error('Error fetching admin:', error);
    return NextResponse.json({ error: 'Error interno' }, { status: 500 });
  }
}
