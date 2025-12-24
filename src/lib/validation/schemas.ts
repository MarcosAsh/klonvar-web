import { z } from 'zod';
import DOMPurify from 'isomorphic-dompurify';

// Sanitization helper
const sanitizeString = (str: string): string => {
  return DOMPurify.sanitize(str.trim(), { ALLOWED_TAGS: [] });
};

// Custom sanitized string type
const sanitizedString = z.string().transform(sanitizeString);

// Phone validation (Spanish format)
const phoneRegex = /^(\+34)?[6-9]\d{8}$/;

// Email validation
const emailSchema = z
  .string()
  .email('Email inválido')
  .transform((email) => sanitizeString(email.toLowerCase()));

// Phone validation
const phoneSchema = z
  .string()
  .regex(phoneRegex, 'Teléfono inválido. Usa formato español: 612345678')
  .transform(sanitizeString);

// Valuation request schema
export const valuationRequestSchema = z.object({
  name: sanitizedString
    .pipe(z.string().min(2, 'El nombre debe tener al menos 2 caracteres'))
    .pipe(z.string().max(100, 'El nombre es demasiado largo')),
  email: emailSchema,
  phone: phoneSchema,
  address: sanitizedString
    .pipe(z.string().min(5, 'La dirección debe tener al menos 5 caracteres'))
    .pipe(z.string().max(200, 'La dirección es demasiado larga')),
  message: sanitizedString
    .pipe(z.string().max(1000, 'El mensaje es demasiado largo'))
    .optional(),
});

// Contact request schema
export const contactRequestSchema = z.object({
  name: sanitizedString
    .pipe(z.string().min(2, 'El nombre debe tener al menos 2 caracteres'))
    .pipe(z.string().max(100, 'El nombre es demasiado largo')),
  email: emailSchema,
  phone: phoneSchema.optional(),
  subject: sanitizedString
    .pipe(z.string().max(200, 'El asunto es demasiado largo'))
    .optional(),
  message: sanitizedString
    .pipe(z.string().min(10, 'El mensaje debe tener al menos 10 caracteres'))
    .pipe(z.string().max(2000, 'El mensaje es demasiado largo')),
  propertyId: z.string().cuid().optional(),
});

// Property schema for admin
export const propertySchema = z.object({
  title: sanitizedString
    .pipe(z.string().min(5, 'El título debe tener al menos 5 caracteres'))
    .pipe(z.string().max(200, 'El título es demasiado largo')),
  description: sanitizedString
    .pipe(z.string().min(20, 'La descripción debe tener al menos 20 caracteres'))
    .pipe(z.string().max(5000, 'La descripción es demasiado larga')),
  price: z.number().positive('El precio debe ser positivo').max(100000000, 'Precio demasiado alto'),
  address: sanitizedString
    .pipe(z.string().min(5, 'La dirección debe tener al menos 5 caracteres'))
    .pipe(z.string().max(200, 'La dirección es demasiado larga')),
  city: sanitizedString.pipe(z.string().default('Madrid')),
  neighborhood: sanitizedString.pipe(z.string().max(100)).optional(),
  postalCode: z
    .string()
    .regex(/^\d{5}$/, 'Código postal inválido')
    .optional(),
  propertyType: z.enum([
    'APARTMENT',
    'HOUSE',
    'PENTHOUSE',
    'STUDIO',
    'DUPLEX',
    'LOFT',
    'COMMERCIAL',
    'LAND',
  ]),
  bedrooms: z.number().int().min(0).max(20),
  bathrooms: z.number().int().min(1).max(10),
  squareMeters: z.number().int().positive().max(10000),
  floor: z.number().int().min(-5).max(100).optional(),
  hasElevator: z.boolean().default(false),
  hasParking: z.boolean().default(false),
  hasStorage: z.boolean().default(false),
  hasTerrace: z.boolean().default(false),
  hasPool: z.boolean().default(false),
  hasAC: z.boolean().default(false),
  yearBuilt: z.number().int().min(1800).max(new Date().getFullYear() + 5).optional(),
  energyRating: z.string().max(10).optional(),
  status: z.enum(['AVAILABLE', 'RESERVED', 'SOLD', 'RENTED', 'OFF_MARKET']).default('AVAILABLE'),
  featured: z.boolean().default(false),
});

// Image upload validation
export const imageUploadSchema = z.object({
  filename: z.string().max(255),
  contentType: z.enum(['image/jpeg', 'image/png', 'image/webp']),
  size: z.number().max(10 * 1024 * 1024, 'La imagen no puede superar 10MB'),
});

// Types
export type ValuationRequest = z.infer<typeof valuationRequestSchema>;
export type ContactRequest = z.infer<typeof contactRequestSchema>;
export type PropertyInput = z.infer<typeof propertySchema>;
export type ImageUpload = z.infer<typeof imageUploadSchema>;

// Validation helper function
export function validateInput<T>(
  schema: z.ZodSchema<T>,
  data: unknown
): { success: true; data: T } | { success: false; errors: z.ZodError } {
  const result = schema.safeParse(data);
  if (result.success) {
    return { success: true, data: result.data };
  }
  return { success: false, errors: result.error };
}
