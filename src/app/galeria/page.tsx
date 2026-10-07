
import { Suspense } from 'react';
import GalleryClientPage from './gallery-client-page';
import type { Metadata } from 'next';
import { siteConfig } from '@/lib/site';
import Breadcrumbs from '@/components/seo/Breadcrumbs';

export const revalidate = 3600;

export const metadata: Metadata = {
  title: 'Galería de Bodas | Revelio Photography',
  description:
    'Descubre historias reales de bodas capturadas por Revelio Photography en Sevilla y Andalucía.',
  alternates: {
    canonical: '/galeria',
  },
  openGraph: {
    title: 'Galería de Bodas | Revelio Photography',
    description:
      'Descubre historias reales de bodas capturadas por Revelio Photography en Sevilla y Andalucía.',
    url: `${siteConfig.siteUrl}/galeria`,
    siteName: siteConfig.name,
    locale: siteConfig.locale,
    type: 'website',
    images: [siteConfig.ogImage],
  },
};

export default function GalleryPage() {
  return (
    <>
      <Breadcrumbs name="Galería" path="/galeria" />
      <Suspense fallback={<div className="w-full h-96 flex items-center justify-center text-muted-foreground">Cargando galería...</div>}>
        <GalleryClientPage />
      </Suspense>
    </>
  );
}

