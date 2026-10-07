import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { Globe, Instagram } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Breadcrumbs from '@/components/seo/Breadcrumbs';
import JsonLd from '@/components/seo/JsonLd';
import Reveal from '@/components/motion/Reveal';
import { collaborators } from '@/data/collaborators';
import { getCollaboratorsSchema } from '@/lib/schema';
import { siteConfig } from '@/lib/site';

const title = 'Colaboradores | Revelio Photography';
const description =
  'Proveedores de confianza con los que colaboramos en Sevilla y Andalucía: fotomatón, videobooth, animación y catering.';

export const metadata: Metadata = {
  title,
  description,
  alternates: {
    canonical: '/colaboradores',
  },
  openGraph: {
    title,
    description,
    url: `${siteConfig.siteUrl}/colaboradores`,
    siteName: siteConfig.name,
    locale: siteConfig.locale,
    type: 'website',
    images: [siteConfig.ogImage],
  },
};

export default function CollaboratorsPage() {
  return (
    <div className="bg-background text-foreground transition-colors duration-300 antialiased font-sans pt-20">
      <Breadcrumbs name="Colaboradores" path="/colaboradores" />
      <JsonLd data={getCollaboratorsSchema(collaborators)} />

      <section className="py-24 sm:py-28">
        <Reveal className="container mx-auto px-4 max-w-3xl text-center">
          <h1 className="text-5xl font-script font-semibold text-primary mb-6">
            Con quién trabajamos
          </h1>
          <p className="text-lg text-foreground/80 leading-relaxed">
            Proveedores de confianza con los que colaboramos en Sevilla y Andalucía. Los
            recomendamos porque sabemos cómo trabajan: si estáis montando vuestra boda, es un
            buen sitio por donde empezar.
          </p>
        </Reveal>
      </section>

      <section className="pb-24 sm:pb-32">
        <div className="container mx-auto px-4 max-w-5xl">
          <ul className="grid md:grid-cols-2 gap-8 list-none p-0">
            {collaborators.map((collaborator, index) => (
              <li key={collaborator.slug} className="h-full">
                <Reveal
                  delay={index * 0.08}
                  className="h-full bg-muted/90 rounded-lg border-l-4 border-primary shadow-xl overflow-hidden flex flex-col"
                >
                  <div className="relative aspect-[4/3] bg-background flex items-center justify-center">
                    {collaborator.logo ? (
                      <Image
                        src={collaborator.logo}
                        alt={`Logo de ${collaborator.name}`}
                        fill
                        sizes="(min-width: 768px) 50vw, 100vw"
                        className="object-contain p-8"
                      />
                    ) : (
                      <span className="font-script text-4xl text-primary px-6 text-center">
                        {collaborator.name}
                      </span>
                    )}
                  </div>

                  <div className="p-8 flex flex-col flex-grow">
                    <p className="text-xs uppercase tracking-widest text-primary mb-2">
                      {collaborator.category}
                    </p>
                    <h2 className="text-2xl font-serif text-primary mb-1">{collaborator.name}</h2>
                    <p className="text-sm text-muted-foreground mb-4">{collaborator.city}</p>
                    <p className="text-foreground/80 leading-relaxed mb-6 flex-grow">
                      {collaborator.description}
                    </p>

                    <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-sm font-sans">
                      {collaborator.website ? (
                        <a
                          href={collaborator.website}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-2 text-primary hover:text-primary/80 transition-colors"
                        >
                          <Globe className="w-4 h-4" />
                          Web de {collaborator.name}
                        </a>
                      ) : null}
                      <a
                        href={collaborator.instagram}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 text-primary hover:text-primary/80 transition-colors"
                      >
                        <Instagram className="w-4 h-4" />
                        {collaborator.name} en Instagram
                      </a>
                    </div>
                  </div>
                </Reveal>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="py-24 bg-muted">
        <Reveal className="container mx-auto px-4 max-w-2xl text-center">
          <h2 className="text-4xl font-serif font-semibold text-primary mb-4">
            ¿Trabajas en bodas y quieres que hablemos?
          </h2>
          <p className="text-lg text-foreground/80 leading-relaxed mb-8">
            Si eres finca, wedding planner, catering, floristería, papelería, maquillaje, música o
            decoración en Andalucía, escríbenos. Te pasamos fotos profesionales de tu trabajo para
            tu web y tus redes, te etiquetamos y entras en esta lista.
          </p>
          <Button
            asChild
            size="lg"
            className="bg-primary text-primary-foreground hover:bg-primary/90 text-lg px-8 py-6 rounded-full font-serif italic tracking-wide"
          >
            <Link href="/contacto">Escríbenos</Link>
          </Button>
        </Reveal>
      </section>
    </div>
  );
}
