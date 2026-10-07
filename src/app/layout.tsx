
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
import JsonLd from '@/components/seo/JsonLd';
import { getBusinessSchema } from '@/lib/schema';
import MotionProvider from '@/components/motion/MotionProvider';
import PageTransition from '@/components/motion/PageTransition';

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.siteUrl),
  title: siteConfig.title,
  description: siteConfig.description,
  openGraph: {
    title: siteConfig.title,
    description: siteConfig.description,
    url: siteConfig.siteUrl,
    type: 'website',
    images: [siteConfig.ogImage],
    locale: siteConfig.locale,
    siteName: siteConfig.name,
  },
  // Solo la tarjeta: asi cada pagina hereda su propio titulo y descripcion
  // en vez de repetir los de la home al compartirse.
  twitter: {
    card: 'summary_large_image',
  },
  alternates: {
    canonical: '/',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-image-preview': 'large',
      'max-snippet': -1,
      'max-video-preview': -1,
    },
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
        <JsonLd data={getBusinessSchema()} />
        <noscript>
          <style
            dangerouslySetInnerHTML={{
              __html: '[data-reveal]{opacity:1!important;transform:none!important}',
            }}
          />
        </noscript>
      </head>
      <body className={`${greatVibes.variable} ${cormorantGaramond.variable} ${lato.variable} font-sans antialiased flex flex-col min-h-screen bg-background text-foreground`}>
        <Header />
        <main className="flex-grow">
          <MotionProvider>
            <PageTransition>{children}</PageTransition>
          </MotionProvider>
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
