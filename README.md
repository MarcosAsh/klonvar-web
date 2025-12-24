# Klonvar Inmobiliaria - Website

A sleek, modern real estate website built with Next.js 14, Chakra UI, and AWS backend services.

## 🏠 Features

- **Beautiful Design**: Luxury minimal aesthetic with warm tones, elegant typography, and smooth animations
- **Property Listings**: Browse, filter, and view property details
- **Lead Capture Forms**: Valuation requests and contact forms with validation
- **Admin Panel Ready**: Database schema supports full property management
- **AWS Integration**: S3 for images, SES for emails, Cognito for auth, RDS for database
- **Security First**: Input sanitization, rate limiting, parameterized queries

## 🛠 Tech Stack

- **Frontend**: Next.js 14 (App Router), React 18, Chakra UI, Framer Motion
- **Backend**: Next.js API Routes, Prisma ORM
- **Database**: PostgreSQL (AWS RDS)
- **Storage**: AWS S3
- **Email**: AWS SES
- **Auth**: AWS Cognito
- **Validation**: Zod + DOMPurify

## 📁 Project Structure

```
klonvar-app/
├── prisma/
│   └── schema.prisma       # Database schema
├── public/
│   └── logo.png            # Company logo
├── src/
│   ├── app/                # Next.js App Router pages
│   │   ├── api/            # API routes
│   │   ├── comprar/        # Buy page
│   │   ├── contacto/       # Contact page
│   │   ├── nosotros/       # About page
│   │   ├── propiedades/    # Properties listing
│   │   ├── valoracion/     # Valuation form
│   │   ├── vender/         # Sell page
│   │   ├── layout.tsx      # Root layout
│   │   └── page.tsx        # Homepage
│   ├── components/
│   │   ├── layout/         # Header, Footer
│   │   └── property/       # Property card
│   ├── lib/
│   │   ├── aws/            # AWS clients (S3, SES, Cognito)
│   │   ├── db/             # Prisma client
│   │   ├── utils/          # Rate limiting
│   │   └── validation/     # Zod schemas
│   └── styles/
│       └── theme.ts        # Chakra UI theme
├── .env.example            # Environment variables template
├── package.json
└── README.md
```

## 🚀 Getting Started

### 1. Install Dependencies

```bash
npm install
```

### 2. Configure Environment Variables

Copy `.env.example` to `.env.local` and fill in your values:

```bash
cp .env.example .env.local
```

Required variables:
- `DATABASE_URL` - PostgreSQL connection string
- `AWS_REGION`, `AWS_ACCESS_KEY_ID`, `AWS_SECRET_ACCESS_KEY` - AWS credentials
- `AWS_S3_BUCKET` - S3 bucket for property images
- `AWS_SES_FROM_EMAIL`, `NOTIFICATION_EMAIL` - Email settings
- `COGNITO_USER_POOL_ID`, `COGNITO_CLIENT_ID` - Cognito for admin auth

### 3. Set Up AWS Resources

#### RDS (PostgreSQL)
1. Create a PostgreSQL RDS instance
2. Configure security groups to allow access
3. Update `DATABASE_URL` in your env

#### S3
1. Create an S3 bucket for property images
2. Configure CORS for uploads
3. Update `AWS_S3_BUCKET` in your env

#### SES
1. Verify your domain/email in SES
2. Move out of sandbox if needed
3. Update email variables in your env

#### Cognito (Optional - for admin)
1. Create a User Pool
2. Add your admin users
3. Update Cognito variables in your env

### 4. Set Up Database

```bash
# Generate Prisma client
npx prisma generate

# Run migrations
npx prisma migrate dev

# (Optional) Open Prisma Studio
npx prisma studio
```

### 5. Run Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

## 📦 Deployment

### Vercel (Recommended for Frontend)

1. Push to GitHub
2. Import project in Vercel
3. Add environment variables
4. Deploy!

### Environment Variables in Vercel
Add all variables from `.env.example` in your Vercel project settings.

## 🎨 Customization

### Colors
Edit `src/styles/theme.ts` to change the color palette:
- `brand.navy` - Primary dark color
- `brand.cream` - Background colors
- `brand.teal` - Accent color (from logo)
- `brand.gold` - Premium accent

### Fonts
The site uses:
- **Headings**: Cormorant Garamond (elegant serif)
- **Body**: DM Sans (clean sans-serif)

Change in `src/app/layout.tsx` and `src/styles/theme.ts`

### Content
Update Spanish text directly in the page components under `src/app/`

## 🔒 Security Features

- **Input Sanitization**: All form inputs sanitized with DOMPurify
- **Validation**: Zod schemas validate all data
- **Rate Limiting**: Form submissions are rate-limited
- **Parameterized Queries**: Prisma prevents SQL injection
- **Image Validation**: File type and size checks on uploads

## 📱 Pages

| Page | Route | Description |
|------|-------|-------------|
| Home | `/` | Main landing page |
| Sell | `/vender` | Services for sellers |
| Buy | `/comprar` | Services for buyers |
| Properties | `/propiedades` | Property listings |
| Valuation | `/valoracion` | Free valuation form |
| About | `/nosotros` | About the company |
| Contact | `/contacto` | Contact form |

## 🔌 API Routes

| Endpoint | Method | Description |
|----------|--------|-------------|
| `/api/valuation` | POST | Submit valuation request |
| `/api/contact` | POST | Submit contact form |
| `/api/properties` | GET | List properties with filters |
| `/api/properties/[id]` | GET | Get single property |

## 📄 License

Private - Klonvar Invest S.L.

---

Built with ❤️ for Klonvar Inmobiliaria
