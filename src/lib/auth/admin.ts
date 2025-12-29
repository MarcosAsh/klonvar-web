import { createClient } from '@/lib/supabase/server'
import { prisma } from '@/lib/db/prisma'

export async function getAdminUser() {
  const supabase = await createClient()
  const { data: { user }, error } = await supabase.auth.getUser()

  if (error || !user) {
    return null
  }

  const admin = await prisma.adminUser.findUnique({
    where: { authId: user.id },
  })

  return admin
}

export async function requireAdmin() {
  const admin = await getAdminUser()
  
  if (!admin) {
    throw new Error('Unauthorized')
  }

  return admin
}
