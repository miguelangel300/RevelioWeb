import { MetadataRoute } from 'next';
import { siteConfig } from '@/lib/site';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      // Los endpoints de la galeria devuelven JSON; no son paginas.
      disallow: '/api/',
    },
    host: siteConfig.siteUrl,
    sitemap: `${siteConfig.siteUrl}/sitemap.xml`,
  };
}
