
import type { Metadata } from 'next';
import { greatVibes, cormorantGaramond, lato } from '@/lib/fonts';
import './globals.css';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { Toaster } from "@/components/ui/toaster";
import FloatingWhatsAppButton from '@/components/layout/FloatingWhatsAppButton';
import CookieConsentBanner from '@/components/layout/CookieConsentBanner';
import { SpeedInsights } from '@vercel/speed-insights/next';
import { Analytics } from '@vercel/analytics/next';

export const metadata: Metadata = {
  title: 'Fotógrafos de Bodas en Sevilla | Revelio Weddings',
  description: 'Fotografía de bodas en Sevilla y Andalucía, natural, sin poses forzadas, para parejas auténticas (¡y sus mascotas!). Capturamos la emoción real, la fiesta y los mejores momentos de vuestro gran día. Vivid vuestra boda, nosotros la contamos en imágenes.',
  keywords: [
    'fotógrafo de bodas Sevilla',
    'fotografía de bodas Sevilla',
    'fotógrafo bodas natural',
    'fotógrafo bodas mascotas',
    'fotografía documental bodas',
    'fotógrafo bodas Andalucía',
    'fotografía boda espontánea',
    'fotógrafo bodas sin poses',
    'fotografía boda divertida',
    'fotógrafo bodas originales',
    'fotografía boda Sevilla',
    'fotógrafo bodas con perros',
    'fotógrafo bodas con gatos',
    'fotografía boda fiesta',
    'fotógrafo bodas naturales Sevilla',
  ],
  openGraph: {
    title: 'Fotógrafos de Bodas en Sevilla | Revelio Weddings',
    description: 'Fotografía de bodas natural y divertida en Sevilla y Andalucía. Sin poses, sin artificios, solo verdad. Capturamos la emoción, la fiesta y a todos (¡mascotas incluidas!).',
    url: 'https://revelioweddings.com',
    type: 'website',
    images: [
      {
        url: '/logoRevelio completo sin fondo.png',
        width: 800,
        height: 600,
        alt: 'Revelio Weddings - Fotógrafos de bodas en Sevilla',
      },
    ],
    locale: 'es_ES',
    siteName: 'Revelio Weddings',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Fotógrafos de Bodas en Sevilla | Revelio Weddings',
    description: 'Fotografía de bodas natural y divertida en Sevilla y Andalucía. Sin poses, sin artificios, solo verdad. Capturamos la emoción, la fiesta y a todos (¡mascotas incluidas!).',
    images: ['/logoRevelio completo sin fondo.png'],
  },
  alternates: {
    canonical: 'https://revelioweddings.com',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <head>
        <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
      </head>
      <body className={`${greatVibes.variable} ${cormorantGaramond.variable} ${lato.variable} font-sans antialiased flex flex-col min-h-screen bg-background text-foreground`}>
        <Header />
        <main className="flex-grow">
          {children}
        </main>
        <CookieConsentBanner />
        <Footer />
        <FloatingWhatsAppButton />
        <Toaster />
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
