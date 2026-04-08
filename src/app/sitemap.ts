import { MetadataRoute } from 'next';
import { siteConfig } from '@/lib/site';

export default function sitemap(): MetadataRoute.Sitemap {
  const siteUrl = siteConfig.siteUrl;

  // Rutas estáticas
  return [
    '/',
    '/about',
    '/contact',
    '/gallery',
    '/cookie-policy',
    '/legal-notice',
    '/privacy-policy',
    '/accessibility-statement',
  ].map((route) => ({
    url: `${siteUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: 'weekly',
    priority: route === '/' ? 1 : 0.8,
  }));
}
