'use client';
import Image from 'next/image';
import { galleryPhotos } from '@/data/gallery';
import React, { useState, useEffect, createContext, useContext, useCallback } from 'react';
import { Masonry } from 'masonic';
import { useWindowSize } from '@/hooks/use-window-size';
import type { Photo } from '@/types';
import { AnimatePresence, motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import { X, ArrowLeft, Camera } from 'lucide-react';

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

interface WeddingInfo {
  name: string;
  tags: string[];
  thumbnail: string;
  imageCount: number;
}

const GalleryDialogContext = createContext<(index: number) => void>(() => { });

// Componente para una tarjeta de foto individual
const PhotoCard = ({ data: photo, index }: { data: Photo, index: number }) => {
  const setSelectedIndex = useContext(GalleryDialogContext);

  // Lógica para determinar qué texto mostrar
  const getMainTitle = () => {
    if (photo.category === 'Bodas' && photo.tags && photo.tags.length > 0) {
      const mainTag = photo.tags.find(t => t !== 'todas') || 'bodas';
      return mainTag.charAt(0).toUpperCase() + mainTag.slice(1);
    }
    return photo.title || 'Historia';
  };

  const getSubtitle = () => {
    if (photo.category === 'Bodas' && photo.subFolder) {
      return photo.subFolder;
    }
    return photo.category || 'Fotografía';
  };

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
          <p className="text-primary-foreground font-serif text-3xl italic mb-1">{getMainTitle()}</p>
          <span className="text-xs text-primary-foreground/80 uppercase tracking-widest">{getSubtitle()}</span>
        </div>
      </div>
    </div>
  );
};

// Componente para la tarjeta de una boda (vista de miniaturas)
const WeddingCard = ({ wedding, onClick }: { wedding: WeddingInfo, onClick: () => void }) => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.3 }}
      className="relative overflow-hidden rounded-2xl shadow-lg group cursor-pointer aspect-[4/3]"
      onClick={onClick}
    >
      {wedding.thumbnail ? (
        <Image
          src={wedding.thumbnail}
          alt={wedding.name}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-110"
          loading="lazy"
          quality={80}
        />
      ) : (
        <div className="w-full h-full bg-primary/10 flex items-center justify-center">
          <Camera className="w-16 h-16 text-primary/30" />
        </div>
      )}
      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-80 group-hover:opacity-90 transition-opacity duration-300" />
      <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
        <h3 className="text-2xl font-serif font-semibold mb-1">{wedding.name}</h3>
        <p className="text-sm text-white/70">{wedding.imageCount} fotos · {wedding.tags.length} categorías</p>
      </div>
    </motion.div>
  );
};

export default function GalleryClientPage() {
  const [isClient, setIsClient] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

  // Bodas navigation state
  const [weddings, setWeddings] = useState<WeddingInfo[]>([]);
  const [selectedWedding, setSelectedWedding] = useState<string | null>(null);
  const [activeTag, setActiveTag] = useState<string | null>(null);
  const [loadingWeddings, setLoadingWeddings] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  // Cargar bodas al inicio
  useEffect(() => {
    if (weddings.length === 0) {
      setLoadingWeddings(true);
      fetch('/api/gallery/weddings')
        .then(res => res.json())
        .then(data => {
          setWeddings(data.weddings || []);
        })
        .catch(err => console.error('Error cargando bodas:', err))
        .finally(() => setLoadingWeddings(false));
    }
  }, [weddings.length]);



  const handleSelectWedding = useCallback((weddingName: string) => {
    setSelectedWedding(weddingName);
    setActiveTag(null); // Reset tag, mostrará "todas" por defecto
  }, []);

  const handleBackToWeddings = useCallback(() => {
    setSelectedWedding(null);
    setActiveTag(null);
  }, []);

  const { width } = useWindowSize();
  const columnCount = width ? (width < 640 ? 2 : width < 1024 ? 3 : 4) : 3;

  // Obtener las tags disponibles para la boda seleccionada
  const currentWeddingTags = selectedWedding
    ? weddings.find(w => w.name === selectedWedding)?.tags || []
    : [];

  // Orden cronológico lógico para las subcarpetas de una boda, igual que en el backend
  const PREDEFINED_TAG_ORDER = [
    "todas",
    "preparacion",
    "ceremonia",
    "sesion",
    "coctel",
    "banquete",
    "barralibre",
    "fiesta",
    "postboda",
    "preboda"
  ];

  const filteredPhotos = React.useMemo(() => {
    const filtered = galleryPhotos.filter(photo => {
      // Filtrar siempre por la categoría Bodas
      if (photo.category !== 'Bodas') return false;

      // Filtrar por boda seleccionada y su tag
      if (selectedWedding) {
        if (photo.subFolder !== selectedWedding) return false;

        if (activeTag && activeTag !== 'todas') {
          if (!photo.tags || !photo.tags.includes(activeTag)) return false;
        }
      }
      return true;
    });

    // Ordenar fotos de la vista "todas" cronológicamente según PREDEFINED_TAG_ORDER
    if (selectedWedding && (!activeTag || activeTag === 'todas')) {
      return [...filtered].sort((a, b) => {
        const getTagIndex = (tags?: string[]) => {
          if (!tags || tags.length === 0) return 999;
          const indices = tags.map(t => {
            const idx = PREDEFINED_TAG_ORDER.indexOf(t.toLowerCase());
            return idx === -1 ? 999 : idx;
          });
          return Math.min(...indices);
        };
        const indexA = getTagIndex(a.tags);
        const indexB = getTagIndex(b.tags);
        return indexA - indexB;
      });
    }

    return filtered;
  }, [activeTag, selectedWedding]);

  return (
    <div className="container mx-auto px-4 py-16 sm:py-24">
      <section className="text-center mb-12">
        <h1 className="text-5xl font-serif font-semibold text-primary mb-4">Galería de Historias</h1>
        <p className="text-lg text-foreground/80 max-w-3xl mx-auto italic">
          &quot;Capturando momentos efímeros, creando recuerdos eternos.&quot;
        </p>



        {/* Bodas: Botón volver + Tags de la boda seleccionada */}
        <AnimatePresence>
          {selectedWedding && (
            <motion.div
              initial={{ opacity: 0, height: 0, y: -10 }}
              animate={{ opacity: 1, height: 'auto', y: 0 }}
              exit={{ opacity: 0, height: 0, y: -10 }}
              transition={{ duration: 0.3, ease: 'easeInOut' }}
              className="mt-8 overflow-hidden w-full max-w-5xl mx-auto"
            >
              {/* Botón volver */}
              <div className="flex items-center justify-between mb-4">
                <button
                  onClick={handleBackToWeddings}
                  className="flex items-center gap-2 text-primary hover:text-primary/80 transition-colors text-sm uppercase tracking-widest"
                >
                  <ArrowLeft className="w-4 h-4" />
                  Volver a bodas
                </button>
                <h2 className="text-xl font-serif text-primary">{selectedWedding}</h2>
              </div>

              {/* Filtros de tags */}
              <div className="flex flex-wrap justify-center gap-3 p-4 bg-primary/5 rounded-2xl border border-primary/10">
                <button
                  onClick={() => setActiveTag(null)}
                  className={cn(
                    "px-5 py-1.5 rounded-full border text-xs tracking-widest uppercase transition-all",
                    !activeTag
                      ? "border-primary bg-primary text-primary-foreground"
                      : "border-border text-muted-foreground hover:border-primary hover:text-primary"
                  )}
                >
                  Todas
                </button>
                {currentWeddingTags
                  .filter(tag => tag !== 'todas')
                  .map(tag => (
                    <button
                      key={tag}
                      onClick={() => setActiveTag(tag === activeTag ? null : tag)}
                      className={cn(
                        "px-5 py-1.5 rounded-full border text-xs tracking-widest uppercase transition-all",
                        activeTag === tag
                          ? "border-primary bg-primary text-primary-foreground"
                          : "border-border text-muted-foreground hover:border-primary hover:text-primary"
                      )}
                    >
                      {tag}
                    </button>
                  ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </section>

      {/* Vista de bodas: Tarjetas de cada boda */}
      <AnimatePresence mode="wait">
        {!selectedWedding ? (
          <motion.div
            key="weddings-grid"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
          >
            {loadingWeddings ? (
              <div className="w-full h-64 flex items-center justify-center text-muted-foreground">
                Cargando bodas...
              </div>
            ) : weddings.length === 0 ? (
              <div className="w-full h-64 flex items-center justify-center text-muted-foreground">
                No hay bodas disponibles todavía.
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {weddings.map((wedding) => (
                  <WeddingCard
                    key={wedding.name}
                    wedding={wedding}
                    onClick={() => handleSelectWedding(wedding.name)}
                  />
                ))}
              </div>
            )}
          </motion.div>
        ) : (
          <motion.div
            key={`gallery-bodas-${selectedWedding}-${activeTag}`}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
          >
            {isClient ? (
              <GalleryDialogContext.Provider value={setSelectedIndex}>
                <Masonry
                  key={`bodas-${selectedWedding || 'all'}-${activeTag || 'all'}`}
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
        )}
      </AnimatePresence>

      {/* Lightbox con Carrusel */}
      <Dialog open={selectedIndex !== null} onOpenChange={(open) => !open && setSelectedIndex(null)}>
        <DialogContent className="max-w-[100vw] h-[100vh] sm:max-w-[95vw] sm:h-[95vh] p-0 bg-transparent border-0 flex flex-col justify-center items-center shadow-none [&>button:not(.custom-close)]:hidden">
          <DialogTitle className="sr-only">Visor de imágenes interactivo</DialogTitle>

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
