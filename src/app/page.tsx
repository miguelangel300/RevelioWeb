'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ArrowRight, Camera, Handshake, Heart, Images } from 'lucide-react';
import {
  type CarouselApi,
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";
import * as React from "react";

// --- CONFIGURACIÓN DEL CARRUSEL PRINCIPAL ---
const heroSlides = [
  {
    src: '/_DMA7595.jpg',
    alt: 'Fotografia de bodas en Sevilla, abrazo con luz natural',
    dataAiHint: 'foto boda',
    caption: 'Respuesta en menos de 24h',
  },
  {
    src: '/IMG_8687.jpg',
    alt: 'Pareja de boda en Andalucia, estilo documental sin poses',
    dataAiHint: 'foto boda',
    caption: 'Cobertura en Sevilla y destino',
  },
  {
    src: '/IMG_3153.jpg',
    alt: 'Fiesta de boda con alma, celebracion en Sevilla',
    dataAiHint: 'foto boda',
    caption: 'Entrega completa en 2-6 semanas',
  },
];



export default function HomePage() {
  const plugin = React.useRef(
    Autoplay({ delay: 5000, stopOnInteraction: false, stopOnMouseEnter: true })
  );
  const [carouselApi, setCarouselApi] = React.useState<CarouselApi>();
  const [activeSlideIndex, setActiveSlideIndex] = React.useState(0);

  React.useEffect(() => {
    if (!carouselApi) {
      return;
    }

    const onSelect = () => {
      setActiveSlideIndex(carouselApi.selectedScrollSnap());
    };

    onSelect();
    carouselApi.on('select', onSelect);
    carouselApi.on('reInit', onSelect);

    return () => {
      carouselApi.off('select', onSelect);
      carouselApi.off('reInit', onSelect);
    };
  }, [carouselApi]);



  return (
    <div className="space-y-0 pt-0">
      {/* Hero Section with Autoplaying Carousel Background - Full Width */}
      <section className="relative h-screen flex flex-col justify-end text-center overflow-hidden">
        <div className="absolute inset-0 w-full h-full z-0">
          <Carousel
            plugins={[plugin.current]}
            opts={{ loop: true }}
            setApi={setCarouselApi}
            className="w-full h-full"
          >
            <CarouselContent className="-ml-0">
              {heroSlides.map((slide, index) => (
                <CarouselItem key={index} className="pl-0">
                  <div className="relative w-full h-screen bg-foreground">
                    {/* Imagen principal */}
                    <Image
                      src={slide.src}
                      alt={slide.alt}
                      fill
                      sizes="100vw"
                      quality={82}
                      className="object-cover "
                      data-ai-hint={slide.dataAiHint}
                      priority={index === 0}
                    />
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
          </Carousel>
          {/* Overlay */}
          <div className="absolute inset-0 bg-foreground/40"></div>
        </div>

        <div className="relative z-10 p-6 pb-24 md:pb-32 space-y-6 text-primary-foreground max-w-4xl mx-auto w-full">
          <h1 className="text-4xl md:text-6xl font-serif font-bold leading-tight text-primary-foreground">
            Fotografía de Bodas con Alma
          </h1>
          <p className="text-lg md:text-xl text-primary-foreground/90">
            Contamos vuestra historia a través de imágenes que perduran.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button asChild size="lg" variant="outline" className="bg-transparent border-primary-foreground text-primary-foreground hover:bg-primary-foreground hover:text-primary w-full sm:w-auto">
              <Link href="/contact">
                Hablemos de vuestra boda <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
          
          </div>
          <p className="pt-2 text-lg md:text-xl font-serif italic text-primary-foreground/85">
            {heroSlides[activeSlideIndex]?.caption}
          </p>
        </div>
      </section>

      {/* About Us Section */}
      <section className="py-24 sm:py-32 bg-background">
        <div className="container mx-auto px-4 grid md:grid-cols-2 gap-12 items-center">
          <div className="order-2 md:order-1">
            <h2 className="text-4xl font-serif font-semibold text-primary mb-6">
              Somos Revelio
            </h2>
            <p className="text-lg text-foreground/80 leading-relaxed mb-4">
              Más que fotógrafos, somos narradores de historias. Nuestra pasión es descubrir y capturar la esencia única de cada pareja, creando un recuerdo visual que va más allá de la fotografía tradicional.
            </p>
            <p className="text-lg text-foreground/80 leading-relaxed mb-8">
              Buscamos la luz perfecta, el gesto inadvertido, la lágrima de alegría. Nuestro enfoque es documental y artístico, permitiendo que vuestro día fluya con naturalidad mientras nos encargamos de inmortalizar cada instante.
            </p>
            <p className="text-lg text-foreground/80 leading-relaxed mb-8">
              Como Revelio Photography, nos mueve una fotografia de bodas con alma que respire verdad. Trabajamos en Sevilla y en toda Andalucia con cercania, para que cada pareja se sienta acompañada y libre de poses forzadas.
            </p>
            <Link
              href="/about"
              className="inline-flex items-center text-primary border-b border-primary pb-1 hover:text-primary/80 transition-colors uppercase text-sm tracking-widest font-sans font-medium mt-4"
            >
              Conoced nuestra filosofía
              <Heart className="ml-2 w-4 h-4" />
            </Link>
          </div>
          <div className="order-1 md:order-2">
            <Image
              src="/miguel.jpg"
              alt="Retrato del equipo de fotógrafos de bodas"
              width={1200}
              height={1600}
              className="rounded-lg shadow-xl w-full h-auto"
              data-ai-hint="photographer portrait team"
              quality={95}
            />
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="py-24 sm:py-28 relative overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src="/bodas/Marta y Alejandro/ceremonia/DMA-95.jpg"
            alt="Ceremonia de boda en Sevilla con luz natural"
            fill
            sizes="100vw"
            className="object-cover"
          />
          <div className="absolute inset-0 bg-primary/80" />
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-3xl mx-auto text-center mb-14">
            <h2 className="text-4xl font-serif font-semibold text-primary-foreground mb-4">Nuestro proceso, sin complicaciones</h2>
            <p className="text-lg text-primary-foreground/90">
              Queremos que viváis vuestra boda, no que poséis todo el día. Así trabajamos para que todo fluya natural.
            </p>          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <article className="bg-muted/90 p-8 rounded-lg border-l-4 border-primary shadow-xl">
              <p className="text-xs uppercase tracking-widest text-primary mb-3">Paso 1</p>
              <h3 className="text-2xl font-serif text-primary mb-3">Nos conocemos</h3>
              <p className="font-serif italic text-lg text-foreground leading-relaxed">Hablamos de vuestro día, estilo y prioridades para diseñar un reportaje alineado con vuestra historia.</p>
              <div className="mt-6 flex items-center gap-2 text-primary font-sans text-xs uppercase tracking-widest font-bold">
                <Handshake className="w-4 h-4" />
                <span>Conexión y confianza</span>
              </div>
            </article>
            <article className="bg-muted/90 p-8 rounded-lg border-l-4 border-primary shadow-xl">
              <p className="text-xs uppercase tracking-widest text-primary mb-3">Paso 2</p>
              <h3 className="text-2xl font-serif text-primary mb-3">Documentamos todo</h3>
              <p className="font-serif italic text-lg text-foreground leading-relaxed">Capturamos emociones reales con enfoque documental, desde los preparativos hasta la última canción.</p>
              <div className="mt-6 flex items-center gap-2 text-primary font-sans text-xs uppercase tracking-widest font-bold">
                <Camera className="w-4 h-4" />
                <span>Fotografía documental</span>
              </div>
            </article>
            <article className="bg-muted/90 p-8 rounded-lg border-l-4 border-primary shadow-xl">
              <p className="text-xs uppercase tracking-widest text-primary mb-3">Paso 3</p>
              <h3 className="text-2xl font-serif text-primary mb-3">Entregamos recuerdos</h3>
              <p className="font-serif italic text-lg text-foreground leading-relaxed">Recibís un adelanto en la primera semana y la galería final editada en 3-6 semanas.</p>
              <div className="mt-6 flex items-center gap-2 text-primary font-sans text-xs uppercase tracking-widest font-bold">
                <Images className="w-4 h-4" />
                <span>Galería final cuidada</span>
              </div>
            </article>
          </div>
        </div>
      </section>

      {/* Wedding Stories Section */}
      <section className="py-24 sm:py-32 bg-muted">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-serif font-semibold text-primary mb-4">
            Historias de Boda
          </h2>
          <p className="text-lg text-foreground/80 max-w-3xl mx-auto mb-16">
            Cada boda es un mundo, una historia única que tenemos el privilegio de contar. Estos son algunos de los momentos que hemos compartido.
          </p>
          <div className="grid lg:grid-cols-3 md:grid-cols-2 gap-12">
            {/* Imágenes reales para las historias de boda */}
            {[
              {
                img: "carrusel1.jpg",
                couple: "Helen & Dani",
                alt: "Boda de Helen y Dani en Sevilla, fotografia natural en verano",
                description: "En pleno verano sevillano, Helen y Dani nos hicieron disfrutar con su complicidad y esa manera tan suya de mirarse. Su boda fue íntima, con un aire mediterráneo y llena de momentos que se vivieron a lo grande."
              },
              {
                img: "_DMA6873.jpg",
                couple: "Lola & Marcos",
                alt: "Boda de Lola y Marcos en la nieve, reportaje sin poses forzadas",
                description: "Lola y Marcos se dieron el 'sí' bajo un paisaje nevado. El contraste entre el frío y el amor de su gente nos regaló fotografías únicas. Una boda de invierno que fue pura magia, risas y baile."
              },
              {
                img: "_DMA1102.jpg",
                couple: "Florentino & Amor",
                alt: "Celebracion de Florentino y Amor, fotografia con alma en familia",
                description: "Florentino y Amor celebraron 50 años juntos con la misma ilusión de siempre. Fue un día entrañable, lleno de ternura y de momentos que reflejaban todo lo que han construido. Entre risas, miradas cómplices y la compañía de hijos y nietos, festejaron medio siglo de amor de verdad."
              }
            ].map((story, index) => (
              <div key={index} className="flex flex-col items-center text-center group">
                <div className="block w-full aspect-[4/3] overflow-hidden rounded-lg shadow-xl mb-6 relative">
                  <Image
                    src={`/${story.img}`}
                    alt={story.alt}
                    fill
                    sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"
                    className="object-cover rounded-lg"
                    data-ai-hint="wedding story"
                    quality={80}
                    loading="lazy"
                    placeholder="blur"
                    blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRg=="
                  />
                </div>
                <h3 className="text-2xl font-serif font-medium text-primary mb-2">
                  {story.couple}
                </h3>
                <p className="text-foreground/70 mb-4 max-w-md mx-auto">{story.description}</p>
              </div>
            ))}
          </div>
          <Link
            href="/gallery"
            className="inline-flex items-center text-primary border-b border-primary pb-1 hover:text-primary/80 transition-colors uppercase text-sm tracking-widest font-sans font-medium mt-12"
          >
            Explorar mas historias
            <ArrowRight className="ml-2 w-4 h-4" />
          </Link>
        </div>
      </section>

    </div>
  );
}
