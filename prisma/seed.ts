import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  // Create admin user (password is handled by Supabase Auth, not stored here)
  const admin = await prisma.adminUser.upsert({
    where: { email: 'admin@klonvar.com' },
    update: {},
    create: {
      authId: 'supabase-auth-id-here', // This should match the Supabase Auth user ID
      email: 'admin@klonvar.com',
      name: 'Admin',
      role: 'ADMIN',
    },
  })

  console.log({ admin })
}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })