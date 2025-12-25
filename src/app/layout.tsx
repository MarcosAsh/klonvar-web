import type { Metadata } from 'next';
import { Providers } from './providers';

export const metadata: Metadata = {
  title: {
    default: 'Klonvar Inmobiliaria | Vende o Compra tu Vivienda en Madrid',
    template: '%s | Klonvar Inmobiliaria',
  },
  description:
    'Agencia inmobiliaria en Madrid. Te ayudamos a vender o comprar tu vivienda con seguridad, al mejor precio y con acompañamiento profesional.',
  keywords: [
    'inmobiliaria madrid',
    'vender piso madrid',
    'comprar vivienda madrid',
    'valoración gratuita',
    'agentes inmobiliarios madrid',
  ],
  authors: [{ name: 'Klonvar Inmobiliaria' }],
  openGraph: {
    type: 'website',
    locale: 'es_ES',
    url: 'https://klonvar.com',
    siteName: 'Klonvar Inmobiliaria',
    title: 'Klonvar Inmobiliaria | Vende o Compra tu Vivienda en Madrid',
    description:
      'Agencia inmobiliaria en Madrid. Te ayudamos a vender o comprar tu vivienda con seguridad.',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Klonvar Inmobiliaria',
    description: 'Agencia inmobiliaria en Madrid',
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        {/* Apple System Font stack - no external fonts needed for SF Pro fallback */}
        <meta name="theme-color" content="#fafafa" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
      </head>
      <body
        style={{
          margin: 0,
          padding: 0,
          WebkitFontSmoothing: 'antialiased',
          MozOsxFontSmoothing: 'grayscale',
        }}
      >
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
