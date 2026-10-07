import { MetadataRoute } from 'next';
import { siteConfig } from '@/lib/site';

type Route = {
  path: string;
  priority: number;
  changeFrequency: MetadataRoute.Sitemap[number]['changeFrequency'];
  /** Fecha real del ultimo cambio de contenido, no la del despliegue. */
  lastModified: string;
};

// Rutas reales de src/app. Si se añade una página nueva, va aquí también.
const routes: Route[] = [
  { path: '/', priority: 1, changeFrequency: 'weekly', lastModified: '2026-08-25' },
  { path: '/galeria', priority: 0.9, changeFrequency: 'weekly', lastModified: '2026-08-25' },
  { path: '/precios', priority: 0.9, changeFrequency: 'monthly', lastModified: '2026-08-25' },
  { path: '/contacto', priority: 0.9, changeFrequency: 'monthly', lastModified: '2026-08-25' },
  { path: '/sobre-nosotros', priority: 0.8, changeFrequency: 'monthly', lastModified: '2026-08-25' },
  { path: '/colaboradores', priority: 0.7, changeFrequency: 'monthly', lastModified: '2026-08-25' },
  { path: '/aviso-legal', priority: 0.3, changeFrequency: 'yearly', lastModified: '2026-06-11' },
  { path: '/politica-de-privacidad', priority: 0.3, changeFrequency: 'yearly', lastModified: '2026-06-11' },
  { path: '/politica-de-cookies', priority: 0.3, changeFrequency: 'yearly', lastModified: '2026-06-11' },
  { path: '/accesibilidad', priority: 0.3, changeFrequency: 'yearly', lastModified: '2026-08-25' },
];

export default function sitemap(): MetadataRoute.Sitemap {
  return routes.map(({ path, priority, changeFrequency, lastModified }) => ({
    url: `${siteConfig.siteUrl}${path === '/' ? '/' : path}`,
    lastModified,
    changeFrequency,
    priority,
  }));
}
