
import type { Metadata } from 'next';
import { greatVibes, cormorantGaramond, lato } from '@/lib/fonts';
import './globals.css';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { Toaster } from "@/components/ui/toaster";
import FloatingWhatsAppButton from '@/components/layout/FloatingWhatsAppButton';
import CookieConsentBanner from '@/components/layout/CookieConsentBanner';
import AnalyticsGate from '@/components/layout/AnalyticsGate';
import { siteConfig } from '@/lib/site';

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.siteUrl),
  title: siteConfig.title,
  description: siteConfig.description,
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
    title: siteConfig.title,
    description: siteConfig.description,
    url: siteConfig.siteUrl,
    type: 'website',
    images: [
      {
        url: '/logoRevelio completo sin fondo.png',
        width: 1000,
        height: 600,
        alt: 'Revelio Weddings - Fotógrafos de bodas en Sevilla',
      },
    ],
    locale: siteConfig.locale,
    siteName: siteConfig.name,
  },
  twitter: {
    card: 'summary_large_image',
    title: siteConfig.title,
    description: siteConfig.description,
    images: ['/logoRevelio completo sin fondo.png'],
  },
  alternates: {
    canonical: '/',
  },
  robots: {
    index: true,
    follow: true,
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
        <AnalyticsGate />
      </body>
    </html>
  );
}
