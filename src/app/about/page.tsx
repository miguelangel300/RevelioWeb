import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Heart, PawPrint, Quote } from 'lucide-react';

export default function AboutPage() {
  return (
    <div className="bg-background text-foreground transition-colors duration-300 antialiased font-sans flex flex-col pt-20">

      {/* Intro Section */}
      <section className="py-24 bg-muted/30 transition-colors duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="lg:grid lg:grid-cols-2 lg:gap-16 items-center">
            <div className="mb-12 lg:mb-0 pr-0 lg:pr-8">
              <h2 className="font-script font-semibold text-primary text-5xl mb-4">
                Somos Revelio
              </h2>
              <h3 className="font-serif text-3xl text-muted-foreground mb-6 italic">
                Narradores de historias auténticas
              </h3>
              <div className="prose prose-lg text-muted-foreground font-light font-sans leading-relaxed">
                <p className="mb-6">
                  Más que fotógrafos, somos narradores de historias. Nuestra pasión es descubrir y capturar la esencia única de cada pareja, incluyendo a esos compañeros de vida incondicionales que son vuestras mascotas. Creamos un recuerdo visual que va más allá de la fotografía tradicional, celebrando el amor en todas sus formas.
                </p>
                <p className="mb-8">
                  Buscamos la luz perfecta, el gesto inadvertido, la lágrima de alegría. Nuestro enfoque es documental y artístico, permitiendo que vuestro día fluya con naturalidad mientras nos encargamos de inmortalizar cada instante.
                </p>
              </div>

            </div>
            <div className="relative group">
              <div className="absolute -inset-4 bg-primary/10 rounded-lg blur-lg opacity-0 group-hover:opacity-100 transition duration-500"></div>
              <div className="relative overflow-hidden rounded-lg shadow-2xl aspect-[3/4] w-full max-w-md mx-auto">
                {/* Usamos una de la galería que evoque retrato narrativo */}
                <Image
                  alt="Somos Revelio Photography"
                  src="/elia.jpg"
                  fill
                  className="object-cover transform group-hover:scale-105 transition duration-700 ease-out"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
              </div>
              <div className="absolute -bottom-6 -left-6 w-24 h-24 bg-background rounded-full flex items-center justify-center shadow-lg border border-border z-10">
                <span className="font-serif italic text-primary text-center leading-tight text-sm font-bold">
                  Desde<br />2015
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Mascotas Section */}
      <section className="py-24 bg-background transition-colors duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="font-script font-semibold text-5xl text-primary mb-4">
              Mascotas: Un Miembro Más de la Familia
            </h2>
            <p className="font-serif text-xl text-muted-foreground font-light max-w-2xl mx-auto">
              Entendemos que vuestra historia de amor no estaría completa sin ellos. Capturamos ese vínculo puro y leal que vuestras mascotas aportan a vuestro gran día.
            </p>
          </div>
          <div className="grid lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-7">
              <div className="relative overflow-hidden rounded-lg shadow-2xl h-[600px] w-full">
                {/* Imagen sugerente de boda con perro/mascota si hubiera, usando una de retratos */}
                <Image
                  alt="Pareja con mascota"
                  src="/_DMA7702_1.jpg"
                  fill
                  className="object-cover object-center"
                  sizes="(max-width: 1024px) 100vw, 60vw"
                />
              </div>
            </div>
            <div className="lg:col-span-5 flex flex-col gap-8">
              <div className="relative overflow-hidden rounded-lg shadow-xl h-[350px] w-full">
                <Image
                  alt="Detalles de mascotas en bodas"
                  src="/_DMA7836.jpg"
                  fill
                  className="object-cover object-top"
                  sizes="(max-width: 1024px) 100vw, 40vw"
                />
              </div>
              <div className="bg-muted/90 p-8 rounded-lg border-l-4 border-primary">
                <p className="font-serif italic text-lg text-foreground leading-relaxed">
                  "Desde el perro que lleva los anillos hasta el gato que observa desde la ventana, cada gesto de vuestros compañeros peludos es una pincelada más en el lienzo de vuestros recuerdos."
                </p>
                <div className="mt-6 flex items-center gap-2 text-primary font-sans text-xs uppercase tracking-widest font-bold">
                  <PawPrint className="w-4 h-4" />
                  <span>Wedding Pet Friendly</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonio Section */}
      <section id="filosofia" className="py-24 bg-primary text-primary-foreground relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <Image
            alt="Fondo testimonio"
            src="/_DMA8034.jpg"
            fill
            className="object-cover"
          />
        </div>
        <div className="max-w-4xl mx-auto px-4 text-center relative z-10 flex flex-col items-center">
          <Quote className="w-8 h-8 opacity-50 mb-6 text-primary-foreground fill-current" />
          <p className="font-serif text-2xl md:text-3xl italic font-light leading-relaxed mb-8">
            "Revelio no solo hizo fotos increíbles, sino que nos hizo sentir cómodos en todo momento. Capturaron emociones que ni sabíamos que estábamos mostrando. El mejor recuerdo de nuestra vida."
          </p>
          <div className="flex items-center justify-center gap-4">
            <div className="h-px w-12 bg-primary-foreground/50"></div>
            <span className="font-sans uppercase tracking-widest text-sm font-bold">Carmen & Hugo</span>
            <div className="h-px w-12 bg-primary-foreground/50"></div>
          </div>
        </div>
      </section>

      {/* CTA Final */}
      <section className="py-24 text-center bg-background">
        <h2 className="text-5xl font-script font-semibold text-primary mb-6">
          ¿Listos para crear algo inolvidable?
        </h2>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-8">
          Si nuestra visión de la fotografía de bodas resuena con vosotros, nos encantaría escuchar vuestra historia.
        </p>
        <Button asChild size="lg" className="bg-primary text-primary-foreground hover:bg-primary/90 text-lg px-8 py-6 rounded-full font-serif italic tracking-wide">
          <Link href="/contact">
            Contactad con nosotros
          </Link>
        </Button>
      </section>

    </div>
  );
}
