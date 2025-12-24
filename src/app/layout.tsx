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
        <link
          href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@400;500;600;700&family=DM+Sans:wght@400;500;600;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
