# Klonvar Inmobiliaria

Real estate platform built with Next.js 14, Supabase, and Prisma.

## Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Database**: PostgreSQL (Supabase)
- **Auth**: Supabase Auth
- **Storage**: Supabase Storage
- **Email**: Resend
- **ORM**: Prisma
- **UI**: Chakra UI + Framer Motion

## Setup

### 1. Install dependencies

```bash
npm install
```

### 2. Configure Supabase

1. Go to [supabase.com](https://supabase.com) and create a project
2. Get your credentials from Settings > API:
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - `SUPABASE_SERVICE_ROLE_KEY`
3. Get your database connection string from Settings > Database

### 3. Configure Supabase Storage

1. Go to Storage in your Supabase dashboard
2. Create a new bucket called `property-images`
3. Set the bucket to **public** (or configure RLS policies)
4. Add these policies:
   - Allow authenticated users to upload
   - Allow public read access

### 4. Configure Supabase Auth

1. Go to Authentication > Providers
2. Enable Email provider
3. Configure email templates (optional)
4. Set Site URL in Authentication > URL Configuration

### 5. Configure Resend

1. Go to [resend.com](https://resend.com) and create an account
2. Get your API key
3. (Optional) Verify a domain for production emails

### 6. Set up environment variables

Copy `.env.example` to `.env.local` and fill in your values:

```bash
cp .env.example .env.local
```

Required variables:
```
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key
DATABASE_URL=postgresql://postgres:password@db.your-project.supabase.co:5432/postgres
RESEND_API_KEY=re_xxxxx
RESEND_FROM_EMAIL=onboarding@resend.dev
NOTIFICATION_EMAIL=your-email@example.com
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

### 7. Set up the database

```bash
# Generate Prisma client
npx prisma generate

# Push schema to database
npx prisma db push

# (Optional) Open Prisma Studio
npx prisma studio
```

### 8. Run the development server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

## Project Structure

```
src/
├── app/                    # Next.js App Router
│   ├── api/               # API routes
│   │   ├── contact/       # Contact form
│   │   ├── valuation/     # Valuation requests
│   │   ├── properties/    # Public properties
│   │   └── portal/        # Authenticated client APIs
│   ├── portal/            # Client portal pages
│   └── (public pages)     # Marketing pages
├── components/
│   ├── layout/            # Header, Footer
│   ├── portal/            # Portal-specific components
│   ├── property/          # Property cards, etc.
│   └── ui/                # GlassCard, etc.
├── lib/
│   ├── auth/              # Auth hooks and context
│   ├── db/                # Prisma client
│   ├── email/             # Resend email functions
│   ├── storage/           # Supabase Storage helpers
│   ├── supabase/          # Supabase clients
│   ├── utils/             # Rate limiting, etc.
│   └── validation/        # Zod schemas
└── styles/                # Chakra theme
```

## Features

### Public
- Home, About, Contact pages
- Property listings with filters
- Valuation request form
- Contact form

### Client Portal
- User registration and login
- Property management
- Image uploads
- Document management
- Messaging

## Deployment

### Vercel (Recommended)

1. Push to GitHub
2. Import project in Vercel
3. Add environment variables
4. Deploy

### Environment Variables for Production

Update these for production:
- `NEXT_PUBLIC_APP_URL` - Your production URL
- `RESEND_FROM_EMAIL` - Your verified domain email

## License

Private - Klonvar Invest S.L.
