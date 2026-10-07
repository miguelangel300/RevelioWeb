import Link from 'next/link';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Página no encontrada | Revelio Photography',
  // Sin canonical: heredar el de la home junto a un noindex son dos
  // senales contradictorias y Google desaconseja combinarlas.
  alternates: { canonical: null },
  robots: {
    index: false,
    follow: true,
  },
};

const atajos = [
  { href: '/galeria', label: 'La galería', detalle: 'Bodas reales, de principio a fin.' },
  { href: '/sobre-nosotros', label: 'Sobre nosotros', detalle: 'Cómo trabajamos y por qué.' },
  { href: '/colaboradores', label: 'Colaboradores', detalle: 'Proveedores que recomendamos.' },
  { href: '/contacto', label: 'Contacto', detalle: 'Contadnos vuestra fecha.' },
];

export default function NotFound() {
  return (
    <div className="bg-background text-foreground pt-20">
      <section className="py-24 sm:py-32">
        <div className="container mx-auto px-4 max-w-2xl text-center">
          <p className="text-xs uppercase tracking-widest text-primary mb-4">Error 404</p>
          <h1 className="text-5xl font-script font-semibold text-primary mb-6">
            Aquí no hay nada
          </h1>
          <p className="text-lg text-foreground/80 leading-relaxed mb-12">
            O el enlace estaba mal, o hemos movido esa página de sitio. Lo que sí sigue donde
            estaba es esto:
          </p>

          <ul className="grid sm:grid-cols-2 gap-4 text-left list-none p-0">
            {atajos.map((atajo) => (
              <li key={atajo.href}>
                <Link
                  href={atajo.href}
                  className="block h-full bg-muted/90 p-6 rounded-lg border-l-4 border-primary shadow-xl hover:bg-muted transition-colors"
                >
                  <span className="block text-xl font-serif text-primary mb-1">{atajo.label}</span>
                  <span className="block text-sm text-foreground/70">{atajo.detalle}</span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </div>
  );
}
