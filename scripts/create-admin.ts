// Run with: npx tsx scripts/create-admin.ts admin@klonvar.com YourPassword123 "Admin Name"

import { createClient } from '@supabase/supabase-js';
import { PrismaClient } from '@prisma/client';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;

const supabase = createClient(supabaseUrl, supabaseServiceKey, {
  auth: { autoRefreshToken: false, persistSession: false }
});

const prisma = new PrismaClient();

async function createAdmin() {
  const email = process.argv[2];
  const password = process.argv[3];
  const name = process.argv[4] || 'Admin';

  if (!email || !password) {
    console.log('Usage: npx tsx scripts/create-admin.ts <email> <password> [name]');
    process.exit(1);
  }

  try {
    // Create Supabase auth user
    const { data: authData, error: authError } = await supabase.auth.admin.createUser({
      email,
      password,
      email_confirm: true,
    });

    if (authError) {
      console.error('Error creating auth user:', authError.message);
      process.exit(1);
    }

    console.log('Auth user created:', authData.user.id);

    // Create AdminUser in database
    const admin = await prisma.adminUser.create({
      data: {
        email,
        name,
        authId: authData.user.id,
        role: 'SUPER_ADMIN',
      },
    });

    console.log('Admin user created:', admin);
    console.log('\n✅ Admin created successfully!');
    console.log(`Email: ${email}`);
    console.log(`Password: ${password}`);
    console.log('\nYou can now login at /admin/login');

  } catch (error) {
    console.error('Error:', error);
    process.exit(1);
  } finally {
    await prisma.$disconnect();
  }
}

createAdmin();
