# Klonvar Inmobiliaria - Liquid Glass Edition

A stunning, Apple-inspired real estate website built with Next.js 14, Chakra UI, and modern liquid glass design aesthetics.

## ✨ Design Philosophy

This redesign embraces Apple's **Liquid Glass** design language introduced at WWDC 2025:

- **Glassmorphism 2.0**: Translucent surfaces with backdrop blur, saturation, and subtle light reflections
- **Organic Motion**: Smooth, physics-based animations with Framer Motion
- **Typography**: Clean system fonts (-apple-system stack) with careful letter-spacing
- **Color Palette**: Refined teal accents with warm amber highlights on neutral stone backgrounds
- **Depth & Layering**: Multi-layer glass effects with inset highlights and soft shadows

## 🎨 Key Visual Features

### Glass Card System
```tsx
<GlassCard variant="default" />  // Standard frosted glass
<GlassCard variant="elevated" /> // More prominent, higher blur
<GlassCard variant="subtle" />   // Lighter, background elements
<GlassCard variant="dark" />     // Dark mode glass
<GlassCard variant="accent" />   // Gradient tint glass
```

### Animated Background Orbs
Floating gradient spheres with subtle animations create depth and visual interest.

### Floating Navigation
Pill-shaped navigation bar with glass effect that adapts on scroll.

### Premium Interactions
- Scale transforms on hover
- Smooth state transitions
- Staggered reveal animations
- Parallax scroll effects

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
│   └── schema.prisma
├── public/
├── src/
│   ├── app/
│   │   ├── api/
│   │   │   ├── contact/
│   │   │   ├── properties/
│   │   │   └── valuation/
│   │   ├── comprar/
│   │   ├── contacto/
│   │   ├── nosotros/
│   │   ├── propiedades/
│   │   ├── valoracion/
│   │   ├── vender/
│   │   ├── layout.tsx
│   │   ├── page.tsx
│   │   └── providers.tsx
│   ├── components/
│   │   ├── layout/
│   │   │   ├── Header.tsx      # Floating glass navigation
│   │   │   └── Footer.tsx      # Dark theme footer
│   │   ├── property/
│   │   │   └── PropertyCard.tsx
│   │   └── ui/
│   │       └── GlassCard.tsx   # Reusable glass components
│   ├── lib/
│   │   ├── aws/
│   │   ├── db/
│   │   ├── utils/
│   │   └── validation/
│   └── styles/
│       └── theme.ts            # Liquid glass theme config
├── package.json
└── README.md
```

## 🚀 Getting Started

### 1. Install Dependencies

```bash
npm install
```

### 2. Configure Environment Variables

Create `.env.local`:

```env
DATABASE_URL="postgresql://..."
AWS_REGION="eu-west-1"
AWS_ACCESS_KEY_ID="..."
AWS_SECRET_ACCESS_KEY="..."
AWS_S3_BUCKET="klonvar-property-images"
AWS_SES_FROM_EMAIL="info@klonvar.com"
NOTIFICATION_EMAIL="info@klonvar.com"
```

### 3. Set Up Database

```bash
npx prisma generate
npx prisma migrate dev
```

### 4. Run Development Server

```bash
npm run dev
```

## 🎨 Customizing the Theme

### Colors

Edit `src/styles/theme.ts`:

```ts
colors: {
  brand: {
    charcoal: { ... },  // Primary dark tones
    stone: { ... },     // Background neutrals
    glass: { ... },     // Teal accent (main brand)
    accent: { ... },    // Warm amber highlights
  }
}
```

### Glass Effects

Adjust in the theme's `layerStyles`:

```ts
glassCard: {
  bg: 'rgba(255, 255, 255, 0.72)',
  backdropFilter: 'blur(20px) saturate(180%)',
  border: '1px solid rgba(255, 255, 255, 0.22)',
  boxShadow: '0 8px 32px rgba(0, 0, 0, 0.04), inset 0 1px 0 rgba(255, 255, 255, 0.6)',
}
```

## 📱 Pages

| Page | Route | Description |
|------|-------|-------------|
| Home | `/` | Hero with floating cards, benefits, process |
| Vender | `/vender` | Sell services with dark hero |
| Comprar | `/comprar` | Buy services with amber accents |
| Propiedades | `/propiedades` | Property grid with glass filters |
| Valoración | `/valoracion` | Valuation form with glass card |
| Nosotros | `/nosotros` | About page with values |
| Contacto | `/contacto` | Contact form with info cards |

## 🔮 Design Patterns Used

### 1. Floating Glass Navigation
Navigation morphs from transparent to frosted glass on scroll.

### 2. Gradient Orb Backgrounds
Animated radial gradients create depth without cluttering the UI.

### 3. Glass Card Hierarchy
Different glass variants establish visual hierarchy:
- `elevated`: Primary content (forms, featured items)
- `default`: Secondary content (cards, listings)
- `subtle`: Background elements (filter bars)
- `dark`: Dark sections (footers, CTAs)

### 4. Pill-shaped Elements
Apple-style rounded buttons and pills (border-radius: 980px).

### 5. Inset Highlights
`inset 0 1px 0 rgba(255, 255, 255, 0.6)` creates a subtle top highlight simulating light reflection.

## 📄 License

Private - Klonvar Invest S.L.

---

Built with ❤️ and liquid glass aesthetics
