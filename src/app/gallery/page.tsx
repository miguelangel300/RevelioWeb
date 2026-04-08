
import { Suspense } from 'react';
import GalleryClientPage from './gallery-client-page';
import type { Metadata } from 'next';
import { siteConfig } from '@/lib/site';

export const revalidate = 3600;

export const metadata: Metadata = {
  title: 'Galeria de Bodas | Revelio Photography',
  description:
    'Descubre historias reales de bodas capturadas por Revelio Photography en Sevilla y Andalucia.',
  alternates: {
    canonical: '/gallery',
  },
  openGraph: {
    title: 'Galeria de Bodas | Revelio Photography',
    description:
      'Descubre historias reales de bodas capturadas por Revelio Photography en Sevilla y Andalucia.',
    url: `${siteConfig.siteUrl}/gallery`,
    siteName: siteConfig.name,
    locale: siteConfig.locale,
    type: 'website',
  },
};

export default function GalleryPage() {
  return (
    <Suspense fallback={<div className="w-full h-96 flex items-center justify-center text-muted-foreground">Cargando galería...</div>}>
      <GalleryClientPage />
    </Suspense>
  );
}

