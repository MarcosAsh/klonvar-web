import { createClient } from '@/lib/supabase/client'
import { supabaseAdmin } from '@/lib/supabase/admin'

const BUCKET_NAME = 'property-images'

// Client-side upload
export async function uploadPropertyImage(
  propertyId: string,
  file: File
): Promise<{ url: string; path: string } | { error: string }> {
  const supabase = createClient()

  // Validate file
  const validTypes = ['image/jpeg', 'image/png', 'image/webp']
  if (!validTypes.includes(file.type)) {
    return { error: 'Tipo de archivo no válido. Usa JPG, PNG o WebP.' }
  }

  if (file.size > 10 * 1024 * 1024) {
    return { error: 'La imagen no puede superar 10MB.' }
  }

  // Generate unique filename
  const timestamp = Date.now()
  const extension = file.name.split('.').pop()
  const path = `${propertyId}/${timestamp}.${extension}`

  try {
    const { error } = await supabase.storage
      .from(BUCKET_NAME)
      .upload(path, file, {
        cacheControl: '3600',
        upsert: false,
      })

    if (error) {
      console.error('Upload error:', error)
      return { error: 'Error al subir la imagen.' }
    }

    const { data: urlData } = supabase.storage
      .from(BUCKET_NAME)
      .getPublicUrl(path)

    return { url: urlData.publicUrl, path }
  } catch (error) {
    console.error('Upload error:', error)
    return { error: 'Error al subir la imagen.' }
  }
}

// Server-side delete
export async function deletePropertyImage(path: string): Promise<boolean> {
  try {
    const { error } = await supabaseAdmin.storage
      .from(BUCKET_NAME)
      .remove([path])

    if (error) {
      console.error('Delete error:', error)
      return false
    }

    return true
  } catch (error) {
    console.error('Delete error:', error)
    return false
  }
}

// Server-side delete multiple images
export async function deletePropertyImages(paths: string[]): Promise<boolean> {
  if (paths.length === 0) return true

  try {
    const { error } = await supabaseAdmin.storage
      .from(BUCKET_NAME)
      .remove(paths)

    if (error) {
      console.error('Delete error:', error)
      return false
    }

    return true
  } catch (error) {
    console.error('Delete error:', error)
    return false
  }
}

// Get signed URL for private uploads (if needed)
export async function getSignedUploadUrl(
  propertyId: string,
  filename: string
): Promise<{ signedUrl: string; path: string } | { error: string }> {
  const timestamp = Date.now()
  const extension = filename.split('.').pop()
  const path = `${propertyId}/${timestamp}.${extension}`

  try {
    const { data, error } = await supabaseAdmin.storage
      .from(BUCKET_NAME)
      .createSignedUploadUrl(path)

    if (error) {
      console.error('Signed URL error:', error)
      return { error: 'Error al generar URL de subida.' }
    }

    return { signedUrl: data.signedUrl, path }
  } catch (error) {
    console.error('Signed URL error:', error)
    return { error: 'Error al generar URL de subida.' }
  }
}
