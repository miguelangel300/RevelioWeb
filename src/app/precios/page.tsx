import type { Metadata } from 'next';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import Breadcrumbs from '@/components/seo/Breadcrumbs';
import Reveal from '@/components/motion/Reveal';
import { cobertura, extras, paquetes, vigenciaGaleria } from '@/data/packages';
import { siteConfig } from '@/lib/site';

const title = 'Packs de boda | Revelio Photography';
const description =
  'Cuatro packs de fotografía y vídeo de boda en Sevilla y Andalucía: qué incluye cada uno, equipo, número de fotos y plazos de entrega.';

export const metadata: Metadata = {
  title,
  description,
  alternates: {
    canonical: '/precios',
  },
  openGraph: {
    title,
    description,
    url: `${siteConfig.siteUrl}/precios`,
    siteName: siteConfig.name,
    locale: siteConfig.locale,
    type: 'website',
    images: [siteConfig.ogImage],
  },
};

export default function PreciosPage() {
  return (
    <div className="bg-background text-foreground transition-colors duration-300 antialiased font-sans pt-20">
      <Breadcrumbs name="Packs de boda" path="/precios" />

      <section className="py-24 sm:py-28">
        {/* Sin Reveal a proposito: es el bloque del pliegue y no queremos
            servir el H1 en opacity 0, que retrasaria el LCP. */}
        <div className="container mx-auto px-4 max-w-3xl text-center">
          <h1 className="text-5xl font-script font-semibold text-primary mb-6">
            Packs de boda en Sevilla y Andalucía
          </h1>
          <p className="text-lg text-foreground/80 leading-relaxed mb-4">
            Cuatro formas de cubrir vuestro día. Todas parten de lo mismo:{' '}
            {cobertura.toLowerCase()}. Lo que cambia es cuánta gente somos y si hay vídeo.
          </p>
          <p className="text-lg text-foreground/80 leading-relaxed">
            Contadnos vuestra fecha y el sitio y os pasamos el presupuesto cerrado, sin
            sorpresas después.
          </p>
        </div>
      </section>

      <section className="pb-8">
        <div className="container mx-auto px-4 max-w-5xl">
          <ul className="grid md:grid-cols-2 gap-8 list-none p-0">
            {paquetes.map((paquete, index) => (
              <li key={paquete.slug} id={paquete.slug} className="h-full scroll-mt-24">
                <Reveal
                  delay={index * 0.06}
                  className={`h-full bg-muted/90 p-8 rounded-lg shadow-xl flex flex-col border-l-4 ${
                    paquete.destacado ? 'border-primary' : 'border-primary/40'
                  }`}
                >
                  {paquete.destacado ? (
                    <p className="text-xs uppercase tracking-widest text-primary font-bold mb-3">
                      El que más contratan
                    </p>
                  ) : null}
                  <h2 className="text-2xl font-serif text-primary mb-6">{paquete.name}</h2>

                  <dl className="space-y-4 text-sm flex-grow">
                    <div>
                      <dt className="uppercase tracking-widest text-xs text-primary mb-1">Equipo</dt>
                      <dd className="text-foreground/80">{paquete.equipo}</dd>
                    </div>
                    <div>
                      <dt className="uppercase tracking-widest text-xs text-primary mb-1">
                        Fotografía
                      </dt>
                      <dd className="text-foreground/80">{paquete.fotografia}</dd>
                    </div>
                    {paquete.video ? (
                      <div>
                        <dt className="uppercase tracking-widest text-xs text-primary mb-1">
                          Vídeo
                        </dt>
                        <dd className="text-foreground/80">{paquete.video}</dd>
                      </div>
                    ) : null}
                    <div>
                      <dt className="uppercase tracking-widest text-xs text-primary mb-1">
                        Entrega
                      </dt>
                      <dd className="text-foreground/80">{paquete.entrega}</dd>
                    </div>
                  </dl>
                </Reveal>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="py-16">
        <Reveal className="container mx-auto px-4 max-w-3xl">
          <h2 className="text-3xl font-serif font-semibold text-primary mb-8 text-center">
            Extras
          </h2>
          <ul className="list-none p-0 divide-y divide-border">
            {extras.map((extra) => (
              <li key={extra.name} className="py-4">
                <span className="text-foreground/80">
                  {extra.name}
                  {extra.nota ? (
                    <span className="text-muted-foreground text-sm"> · {extra.nota}</span>
                  ) : null}
                </span>
              </li>
            ))}
          </ul>

          <p className="text-sm text-muted-foreground mt-8 leading-relaxed">
            El fotomatón y el videobooth los ponen{' '}
            <Link href="/colaboradores" className="underline decoration-primary/40 underline-offset-2 hover:decoration-primary">
              dos de nuestros colaboradores
            </Link>
            , así que trabajáis con gente que ya conocemos.
          </p>
          <p className="text-sm text-muted-foreground mt-4 leading-relaxed">
            La galería web se mantiene disponible {vigenciaGaleria} desde la entrega, tiempo de
            sobra para que la descarguéis y la compartáis con vuestra gente. Si necesitáis algo
            que no veis aquí, preguntadnos: casi todo se puede ajustar.
          </p>
        </Reveal>
      </section>

      <section className="py-24 bg-muted">
        <Reveal className="container mx-auto px-4 max-w-2xl text-center">
          <h2 className="text-4xl font-serif font-semibold text-primary mb-4">
            ¿Tenéis fecha?
          </h2>
          <p className="text-lg text-foreground/80 leading-relaxed mb-8">
            Escribidnos y os decimos si la tenemos libre. Sin compromiso y sin insistir después.
          </p>
          <Button
            asChild
            size="lg"
            className="bg-primary text-primary-foreground hover:bg-primary/90 text-lg px-8 py-6 rounded-full font-serif italic tracking-wide"
          >
            <Link href="/contacto">Consultar nuestra fecha</Link>
          </Button>
        </Reveal>
      </section>
    </div>
  );
}
