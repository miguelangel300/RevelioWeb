
import type { Metadata } from 'next';
import { siteConfig } from '@/lib/site';
import Link from 'next/link';
import Breadcrumbs from '@/components/seo/Breadcrumbs';

const title = 'Declaración de Accesibilidad | Revelio Photography';
const description =
  'Declaración de accesibilidad de la web de Revelio Photography y cómo avisarnos de una barrera.';

export const metadata: Metadata = {
  title,
  description,
  alternates: {
    canonical: '/accesibilidad',
  },
  openGraph: {
    title,
    description,
    url: `${siteConfig.siteUrl}/accesibilidad`,
    siteName: siteConfig.name,
    locale: siteConfig.locale,
    type: 'website',
    images: [siteConfig.ogImage],
  },
};

export default function AccessibilityStatementPage() {
  return (
    <div className="container mx-auto px-4 py-16 sm:py-24 max-w-4xl">
      <Breadcrumbs name="Declaración de accesibilidad" path="/accesibilidad" />
      <section className="text-center">
        <h1 className="text-4xl font-serif font-semibold text-primary mb-6">Declaración de Accesibilidad</h1>
      </section>

      <section className="space-y-4 text-foreground/80">
        <p>Última actualización: {new Date().toLocaleDateString('es-ES', { year: 'numeric', month: 'long', day: 'numeric' })}</p>

        <p>
          En Revelio Photography, estamos comprometidos a garantizar que nuestro sitio web sea accesible para todas las personas, incluidas aquellas con discapacidades.
          Nos esforzamos por cumplir con las Pautas de Accesibilidad al Contenido en la Web (WCAG) 2.1 Nivel AA, un conjunto de recomendaciones para hacer que el contenido web sea más accesible.
        </p>

        <h2 className="text-2xl font-serif font-semibold text-primary pt-4">Medidas que tomamos</h2>
        <p>Hemos tomado las siguientes medidas para mejorar la accesibilidad de nuestro sitio web:</p>
        <ul className="list-disc list-inside space-y-2 pl-4">
          <li>Uso de texto alternativo para las imágenes.</li>
          <li>Estructura de encabezados semánticos para facilitar la navegación.</li>
          <li>Contraste de color adecuado entre el texto y el fondo (trabajamos continuamente para mejorarlo).</li>
          <li>Diseño responsivo que se adapta a diferentes tamaños de pantalla y dispositivos.</li>
          <li>Navegación por teclado funcional.</li>
          <li>Uso de atributos ARIA cuando es apropiado para mejorar la experiencia con lectores de pantalla.</li>
        </ul>

        <h2 className="text-2xl font-serif font-semibold text-primary pt-4">Esfuerzos continuos</h2>
        <p>
          La accesibilidad es un esfuerzo continuo. Revisamos y mejoramos activamente nuestro sitio web para asegurar que cumplimos con los estándares de accesibilidad y las mejores prácticas.
          Agradecemos tus comentarios sobre la accesibilidad de Revelio Photography.
        </p>

        <h2 className="text-2xl font-serif font-semibold text-primary pt-4">Limitaciones conocidas</h2>
        <p>
          Somos conscientes de algunas limitaciones y estamos trabajando para abordarlas:
        </p>
        <ul className="list-disc list-inside space-y-2 pl-4">
          <li>
            Algunos componentes de terceros (como los carruseles de imágenes o mapas integrados, si los hubiera) pueden no ser completamente accesibles.
            Siempre que sea posible, elegiremos componentes que prioricen la accesibilidad.
          </li>
          <li>
            Los videos, si se añaden en el futuro, podrían no tener subtítulos o transcripciones de inmediato, pero trabajaremos para incluirlos.
          </li>
        </ul>

        <h2 className="text-2xl font-serif font-semibold text-primary pt-4">Comentarios y Contacto</h2>
        <p>
          Si encuentras alguna barrera de accesibilidad o tienes alguna sugerencia sobre cómo podemos mejorar la accesibilidad de nuestro sitio web, por favor contáctanos.
          Tus comentarios son importantes para nosotros.
        </p>
        <p>
          Puedes contactarnos a través de nuestra página de <Link href="/contacto" className="underline hover:text-primary">Contacto</Link>.
        </p>
        <p>
          Haremos todos los esfuerzos razonables para abordar tus inquietudes.
        </p>
      </section>
    </div>
  );
}
