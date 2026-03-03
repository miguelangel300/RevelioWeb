'use client';
import Image from 'next/image';
import { galleryPhotos } from '@/data/gallery';
import { useSearchParams, useRouter, usePathname } from 'next/navigation';
import React, { useState, useEffect, createContext, useContext } from 'react';
import { Masonry } from 'masonic';
import { useWindowSize } from '@/hooks/use-window-size';
import type { Photo } from '@/types';
import { AnimatePresence, motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import { X } from 'lucide-react';

import {
  Dialog,
  DialogContent,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

const GalleryDialogContext = createContext<(index: number) => void>(() => { });

// Componente para una tarjeta de foto individual
const PhotoCard = ({ data: photo, index }: { data: Photo, index: number }) => {
  const setSelectedIndex = useContext(GalleryDialogContext);

  return (
    <div
      className="relative overflow-hidden rounded-lg shadow-lg group cursor-pointer"
      onClick={() => setSelectedIndex(index)}
    >
      <Image
        src={photo.src}
        alt={photo.alt}
        width={350}
        height={photo.height ? Math.round(photo.height * (350 / 500)) : 525}
        className="w-full h-auto"
        data-ai-hint={photo.dataAiHint}
        loading="lazy"
        placeholder="blur"
        blurDataURL="/favicon.svg"
        quality={90}
      />
      <div className="absolute inset-0 bg-foreground/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
        <div className="text-center transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
          <p className="text-primary-foreground font-serif text-2xl italic mb-1">{photo.title || 'Historia'}</p>
          <span className="text-xs text-primary-foreground/80 uppercase tracking-widest">{photo.category || 'Bodas'}</span>
        </div>
      </div>
    </div>
  );
};

export default function GalleryClientPage() {
  const [isClient, setIsClient] = useState(false);
  const [activeCategory, setActiveCategory] = useState<string>('Todo');
  const [activeSubCategory, setActiveSubCategory] = useState<string | null>(null);
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

  const categories = ['Todo', 'Bodas', 'Retratos', 'Detalles', 'Editorial'];

  const bodasSubmenu = [
    {
      group: 'Momentos del Evento',
      items: ['Preparativos', 'Ceremonia', 'Fiesta', 'Sesión de Pareja']
    },
    {
      group: 'Sensaciones',
      items: ['Blanco y Negro', 'Espontáneas', 'Minimalista']
    },
    {
      group: 'Localización',
      items: ['Exterior', 'Interior', 'Golden Hour']
    }
  ];

  useEffect(() => {
    setIsClient(true);
  }, []);

  const { width } = useWindowSize();
  const columnCount = width ? (width < 640 ? 2 : width < 1024 ? 3 : 4) : 3;

  const filteredPhotos = galleryPhotos.filter(photo => {
    // Primero filtramos siempre por categoría principal
    if (activeCategory !== 'Todo' && photo.category !== activeCategory) {
      return false;
    }
    // Si la gelería activa tiene una sub-categoría marcada (ej. 'La Ceremonia'), filtramos tmbn por tags
    if (activeSubCategory) {
      if (!photo.tags || !photo.tags.includes(activeSubCategory)) {
        return false;
      }
    }
    return true;
  });

  return (
    <div className="container mx-auto px-4 py-16 sm:py-24">
      <section className="text-center mb-12">
        <h1 className="text-5xl font-serif font-semibold text-primary mb-4">Galería de Historias</h1>
        <p className="text-lg text-foreground/80 max-w-3xl mx-auto italic">
          "Capturando momentos efímeros, creando recuerdos eternos."
        </p>

        {/* Filters */}
        <div className="mt-12 flex flex-wrap justify-center gap-4 relative z-20">
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => {
                setActiveCategory(cat);
                if (cat !== 'Bodas') setActiveSubCategory(null);
              }}
              className={cn(
                "px-6 py-2 rounded-full border transition-all text-sm tracking-widest uppercase",
                activeCategory === cat
                  ? "border-primary bg-primary text-primary-foreground hover:bg-primary/90"
                  : "border-border text-muted-foreground hover:border-primary hover:text-primary bg-transparent"
              )}
            >
              {cat}
            </button>
          ))}
        </div>
        {/* Filters-submenu dinámico */}
        <AnimatePresence>
          {activeCategory === 'Bodas' && (
            <motion.div
              initial={{ opacity: 0, height: 0, y: -10 }}
              animate={{ opacity: 1, height: 'auto', y: 0 }}
              exit={{ opacity: 0, height: 0, y: -10 }}
              transition={{ duration: 0.3, ease: 'easeInOut' }}
              className="mt-8 overflow-hidden w-full max-w-5xl mx-auto"
            >
              <div className="flex flex-row justify-start md:justify-between gap-8 md:gap-4 p-6 bg-primary/5 rounded-2xl border border-primary/10 overflow-x-auto snap-x snap-mandatory [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
                {bodasSubmenu.map((groupData) => (
                  <div key={groupData.group} className="flex flex-col space-y-3 min-w-[240px] md:min-w-[200px] flex-1 snap-start">
                    <h3 className="text-xs uppercase tracking-widest text-primary/70 font-bold border-b border-primary/10 pb-2 mb-2 w-full text-left">
                      {groupData.group}
                    </h3>
                    <div className="flex flex-col space-y-2">
                      {groupData.items.map(subItem => (
                        <button
                          key={subItem}
                          onClick={() => setActiveSubCategory(subItem === activeSubCategory ? null : subItem)}
                          className={cn(
                            "text-sm text-left transition-all w-full flex items-center group",
                            activeSubCategory === subItem
                              ? "text-primary font-bold"
                              : "text-muted-foreground hover:text-primary"
                          )}
                        >
                          <span className={cn(
                            "w-1.5 h-1.5 rounded-full mr-2 transition-all",
                            activeSubCategory === subItem ? "bg-primary" : "bg-transparent group-hover:bg-primary/40"
                          )} />
                          {subItem}
                        </button>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </section>

      <AnimatePresence mode="wait">
        <motion.div
          key="gallery"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.3 }}
        >
          {isClient ? (
            <GalleryDialogContext.Provider value={setSelectedIndex}>
              <Masonry
                key={`${activeCategory}-${activeSubCategory || 'all'}`}
                items={filteredPhotos}
                columnGutter={24}
                columnCount={columnCount}
                render={PhotoCard}
              />
            </GalleryDialogContext.Provider>
          ) : (
            <div className="w-full h-96 flex items-center justify-center text-muted-foreground">Cargando galería...</div>
          )}
        </motion.div>
      </AnimatePresence>

      {/* Lightbox con Carrusel (Soporta deslizamiento táctil y flechas) */}
      <Dialog open={selectedIndex !== null} onOpenChange={(open) => !open && setSelectedIndex(null)}>
        <DialogContent className="max-w-[100vw] h-[100vh] sm:max-w-[95vw] sm:h-[95vh] p-0 bg-transparent border-0 flex flex-col justify-center items-center shadow-none [&>button:not(.custom-close)]:hidden">
          <DialogTitle className="sr-only">Visor de imágenes interactivo</DialogTitle>

          {/* Botón personalizado para cerrar */}
          <button
            onClick={() => setSelectedIndex(null)}
            className="custom-close fixed top-2 right-4 sm:top-8 sm:right-6 z-[60] flex items-center justify-center p-2 bg-transparent border-none text-background/50 hover:text-background transition-all focus:outline-none"
            title="Cerrar (O haz clic fuera de la foto)"
          >
            <X className="h-12 w-12" />
            <span className="sr-only">Cerrar</span>
          </button>

          {selectedIndex !== null && (
            <Carousel
              opts={{ startIndex: selectedIndex, loop: true }}
              className="w-full h-full relative flex items-center justify-center [&_.overflow-hidden]:w-full [&_.overflow-hidden]:h-full"
            >
              <CarouselContent className="h-full ml-0">
                {filteredPhotos.map((photo, index) => (
                  <CarouselItem
                    key={photo.id}
                    className="h-full w-full flex items-center justify-center pl-0 cursor-pointer"
                    onClick={() => setSelectedIndex(null)}
                  >
                    <div
                      className="relative inline-flex items-center justify-center max-h-[90vh] sm:max-h-[95vh] max-w-[100vw] sm:max-w-[90vw]"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <Image
                        src={photo.src}
                        alt={photo.alt}
                        className="object-contain max-h-[90vh] sm:max-h-[95vh] w-auto max-w-full cursor-default"
                        width={1200}
                        height={800}
                        quality={100}
                        priority={Math.abs(selectedIndex - index) <= 1}
                      />
                      {/* Las flechas envuelven a la imagen concreta, colocándose siempre en SU borde */}
                      <CarouselPrevious
                        className="absolute left-2 sm:-left-8 lg:-left-12 bg-transparent hover:bg-transparent border-none text-white/50 hover:text-white w-20 h-20 sm:w-24 sm:h-24 lg:w-32 lg:h-32 flex [&>svg]:!w-12 [&>svg]:!h-12 sm:[&>svg]:!w-16 sm:[&>svg]:!h-16 lg:[&>svg]:!w-24 lg:[&>svg]:!h-24 transition-colors z-[70] shadow-none"
                      />
                      <CarouselNext
                        className="absolute right-2 sm:-right-8 lg:-right-12 bg-transparent hover:bg-transparent border-none text-white/50 hover:text-white w-20 h-20 sm:w-24 sm:h-24 lg:w-32 lg:h-32 flex [&>svg]:!w-12 [&>svg]:!h-12 sm:[&>svg]:!w-16 sm:[&>svg]:!h-16 lg:[&>svg]:!w-24 lg:[&>svg]:!h-24 transition-colors z-[70] shadow-none"
                      />
                    </div>
                  </CarouselItem>
                ))}
              </CarouselContent>
            </Carousel>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
