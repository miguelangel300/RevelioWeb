import JsonLd from '@/components/seo/JsonLd';
import { getBreadcrumbSchema } from '@/lib/schema';

/**
 * BreadcrumbList de dos niveles: Inicio > esta pagina.
 * Solo emite JSON-LD; la miga visible no hace falta para que Google
 * la use en los resultados.
 */
export default function Breadcrumbs({ name, path }: { name: string; path: string }) {
  return <JsonLd data={getBreadcrumbSchema([{ name, path }])} />;
}
