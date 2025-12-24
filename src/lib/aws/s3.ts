import { S3Client, PutObjectCommand, DeleteObjectCommand } from '@aws-sdk/client-s3';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';
import { imageUploadSchema } from '@/lib/validation/schemas';

const s3Client = new S3Client({
  region: process.env.AWS_REGION || 'eu-west-1',
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID || '',
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY || '',
  },
});

const BUCKET_NAME = process.env.AWS_S3_BUCKET || 'klonvar-property-images';

// Generate a unique key for the image
function generateImageKey(propertyId: string, filename: string): string {
  const timestamp = Date.now();
  const sanitizedFilename = filename.replace(/[^a-zA-Z0-9.-]/g, '_');
  return `properties/${propertyId}/${timestamp}-${sanitizedFilename}`;
}

// Get a presigned URL for uploading
export async function getUploadUrl(
  propertyId: string,
  filename: string,
  contentType: string,
  size: number
): Promise<{ uploadUrl: string; key: string; publicUrl: string } | { error: string }> {
  // Validate input
  const validation = imageUploadSchema.safeParse({ filename, contentType, size });
  if (!validation.success) {
    return { error: validation.error.errors[0].message };
  }

  const key = generateImageKey(propertyId, filename);

  const command = new PutObjectCommand({
    Bucket: BUCKET_NAME,
    Key: key,
    ContentType: contentType,
    ContentLength: size,
  });

  try {
    const uploadUrl = await getSignedUrl(s3Client, command, { expiresIn: 300 }); // 5 minutes
    const publicUrl = `https://${BUCKET_NAME}.s3.${process.env.AWS_REGION}.amazonaws.com/${key}`;

    return { uploadUrl, key, publicUrl };
  } catch (error) {
    console.error('Error generating presigned URL:', error);
    return { error: 'Error al generar URL de subida' };
  }
}

// Delete an image from S3
export async function deleteImage(key: string): Promise<boolean> {
  const command = new DeleteObjectCommand({
    Bucket: BUCKET_NAME,
    Key: key,
  });

  try {
    await s3Client.send(command);
    return true;
  } catch (error) {
    console.error('Error deleting image:', error);
    return false;
  }
}

// Delete multiple images
export async function deleteImages(keys: string[]): Promise<void> {
  await Promise.all(keys.map((key) => deleteImage(key)));
}
