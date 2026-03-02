'use client';
import Image from 'next/image';
import { galleryPhotos } from '@/data/gallery';
import { useSearchParams, useRouter, usePathname } from 'next/navigation';
import { useState, useEffect } from 'react';
import { Masonry } from 'masonic';
import { useWindowSize } from '@/hooks/use-window-size';
import type { Photo } from '@/types';
import { AnimatePresence, motion } from 'framer-motion';
import { cn } from '@/lib/utils';

import {
  Dialog,
  DialogContent,
  DialogTitle,
} from "@/components/ui/dialog";

// Componente para una tarjeta de foto individual
const PhotoCard = ({ data: photo }: { data: Photo }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <div
        className="relative overflow-hidden rounded-lg shadow-lg group cursor-pointer"
        onClick={() => setIsOpen(true)}
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

      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="max-w-[90vw] max-h-[90vh] p-0 bg-transparent border-0">
          <DialogTitle className="sr-only">
            Vista ampliada de {photo.alt}
          </DialogTitle>
          <div className="relative w-full h-full flex items-center justify-center">
            <Image
              src={photo.src}
              alt={photo.alt}
              className="object-contain max-h-[90vh] rounded-lg"
              width={1200}
              height={800}
              quality={100}
              priority
            />
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default function GalleryClientPage() {
  const [isClient, setIsClient] = useState(false);
  const [activeCategory, setActiveCategory] = useState<string>('Todo');

  const categories = ['Todo', 'Bodas', 'Retratos', 'Detalles', 'Editorial'];

  useEffect(() => {
    setIsClient(true);
  }, []);

  const { width } = useWindowSize();
  const columnCount = width ? (width < 640 ? 2 : width < 1024 ? 3 : 4) : 3;

  const filteredPhotos = activeCategory === 'Todo'
    ? galleryPhotos
    : galleryPhotos.filter(photo => photo.category === activeCategory);

  return (
    <div className="container mx-auto px-4 py-16 sm:py-24">
      <section className="text-center mb-12">
        <h1 className="text-5xl font-serif font-semibold text-primary mb-4">Galería de Historias</h1>
        <p className="text-lg text-foreground/80 max-w-3xl mx-auto italic">
          "Capturando momentos efímeros, creando recuerdos eternos."
        </p>

        {/* Filters */}
        <div className="mt-12 flex flex-wrap justify-center gap-4">
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
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
            <Masonry
              items={filteredPhotos}
              columnGutter={24}
              columnCount={columnCount}
              render={PhotoCard}
            />
          ) : (
            <div className="w-full h-96 flex items-center justify-center text-muted-foreground">Cargando galería...</div>
          )}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
