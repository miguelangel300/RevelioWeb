'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { galleryPhotos } from '@/data/gallery';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Trash2, CalendarClock } from 'lucide-react';

export default function AdminGalleryPage() {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [photos, setPhotos] = useState(galleryPhotos);
    const [title, setTitle] = useState('');
    const [category, setCategory] = useState<string>('Bodas');
    const [selectedTags, setSelectedTags] = useState<string[]>([]);
    const [fileDateText, setFileDateText] = useState<string>('');
    const [fileDateColor, setFileDateColor] = useState<string>('');
    const [isSaving, setIsSaving] = useState(false);
    const [message, setMessage] = useState('');

    const categories = ['Bodas', 'Retratos', 'Detalles', 'Editorial'];

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

    const currentPhoto = photos[currentIndex];

    useEffect(() => {
        // Cuando cambiamos de foto, rellenar el input con el título, categoría y tags que tuviese
        if (currentPhoto) {
            setTitle(currentPhoto.title || '');
            setCategory(currentPhoto.category || 'Bodas');
            setSelectedTags(currentPhoto.tags || []);
            setFileDateText('Cargando...');
            setFileDateColor('text-muted-foreground');

            fetch(`/api/gallery/info?src=${encodeURIComponent(currentPhoto.src)}`)
                .then(res => res.json())
                .then(data => {
                    if (data.mtimeMs) {
                        const diffDays = Math.floor((Date.now() - data.mtimeMs) / (1000 * 60 * 60 * 24));
                        if (diffDays === 0) { setFileDateText('Hoy'); setFileDateColor('text-green-500 font-bold'); }
                        else if (diffDays === 1) { setFileDateText('Ayer'); setFileDateColor('text-green-500 font-bold'); }
                        else if (diffDays <= 7) { setFileDateText(`Hace ${diffDays} días`); setFileDateColor('text-green-500 font-bold'); }
                        else if (diffDays <= 30) { setFileDateText(`Hace ${diffDays} días`); setFileDateColor('text-yellow-500 font-bold'); }
                        else { setFileDateText(`Hace ${diffDays} días`); setFileDateColor('text-red-500 font-bold'); }
                    } else {
                        setFileDateText('Desconocido');
                    }
                })
                .catch(() => setFileDateText('Desconocido'));
        }
    }, [currentIndex, currentPhoto]);

    const toggleTag = (tag: string) => {
        setSelectedTags(prev =>
            prev.includes(tag) ? prev.filter(t => t !== tag) : [...prev, tag]
        );
    };

    const handleSaveAndNext = async () => {
        if (!currentPhoto) return;

        setIsSaving(true);
        setMessage('Guardando...');

        try {
            const response = await fetch('/api/gallery', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    id: currentPhoto.id,
                    category,
                    title,
                    action: 'UPDATE',
                    tags: category === 'Bodas' ? selectedTags : []
                }),
            });

            if (!response.ok) {
                throw new Error('Error guardando la foto');
            }

            setMessage(`¡Guardada correctamente! (${currentIndex + 1}/${photos.length})`);

            // Pasar a la siguiente foto automáticamente
            if (currentIndex < photos.length - 1) {
                setTimeout(() => {
                    setCurrentIndex(prev => prev + 1);
                    setMessage('');
                }, 500);
            } else {
                setMessage('¡Ya has clasificado todas las fotos!');
            }

        } catch (error) {
            console.error(error);
            setMessage('Hubo un error al guardar.');
        } finally {
            setIsSaving(false);
        }
    };

    const handleDiscard = async () => {
        if (!currentPhoto) return;
        const confirmDelete = window.confirm("¿Seguro que quieres descartar esta foto sacándola de la web?");
        if (!confirmDelete) return;

        setIsSaving(true);
        setMessage('Descartando imagen...');

        try {
            const response = await fetch('/api/gallery', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ id: currentPhoto.id, action: 'DELETE' }),
            });

            if (!response.ok) throw new Error('Error al descartar la foto');

            setMessage(`Imagen descartada y movida a /discarded_images.`);

            setTimeout(() => {
                setPhotos(prev => prev.filter(p => p.id !== currentPhoto.id));
                setMessage('');
            }, 800);

        } catch (error) {
            console.error(error);
            setMessage('Hubo un error al descartar.');
        } finally {
            setIsSaving(false);
        }
    };

    if (!currentPhoto) {
        return <div className="p-20 text-center">No hay más fotos.</div>;
    }

    return (
        <div className="min-h-screen bg-background p-4 sm:p-12 mb-32 pt-32">
            <div className="max-w-6xl mx-auto flex flex-col items-center">

                <h1 className="text-4xl font-serif text-primary mb-2">Clasificador Rápido</h1>
                <div className="flex flex-wrap items-center justify-center gap-4 text-muted-foreground mb-8">
                    <span>Foto {currentIndex + 1} de {photos.length}</span>
                    <span className="flex items-center gap-1 ml-4 border-l pl-4 border-border">
                        <CalendarClock className="w-4 h-4" />
                        Modificada: <span className={fileDateColor}>{fileDateText}</span>
                    </span>
                </div>

                {/* Notificaciones */}
                <div className="h-8 mb-4 font-bold text-green-600">
                    {message}
                </div>

                <div className="flex flex-col md:flex-row w-full gap-8 bg-card shadow-xl rounded-2xl p-6 border border-border">

                    {/* Columna Izquierda: La Foto */}
                    <div className="w-full md:w-1/2 flex items-center justify-center bg-gray-100 dark:bg-gray-900 rounded-xl overflow-hidden relative" style={{ minHeight: '500px' }}>
                        <Image
                            src={currentPhoto.src}
                            alt={currentPhoto.alt}
                            className="object-contain"
                            fill
                            sizes="(max-width: 768px) 100vw, 50vw"
                            priority
                        />
                    </div>

                    {/* Columna Derecha: Controles */}
                    <div className="w-full md:w-1/2 flex flex-col justify-center space-y-8">

                        {/* 1. Categoría */}
                        <div className="space-y-2">
                            <label className="text-sm font-bold uppercase tracking-widest text-primary">1. Selecciona la Categoría</label>
                            <div className="grid grid-cols-2 gap-4">
                                {categories.map(cat => (
                                    <button
                                        key={cat}
                                        onClick={() => setCategory(cat)}
                                        className={cn(
                                            "py-2 rounded-xl border-2 transition-all font-bold text-sm uppercase tracking-wider",
                                            category === cat
                                                ? "border-primary bg-primary text-primary-foreground shadow-lg scale-105"
                                                : "border-border text-muted-foreground hover:border-primary/50 hover:bg-primary/5"
                                        )}
                                    >
                                        {cat}
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* 2. Título */}
                        <div className="space-y-2">
                            <label className="text-sm font-bold uppercase tracking-widest text-primary">2. Escribe un Título Breve</label>
                            <Input
                                type="text"
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                                className="text-sm p-4 h-8 border-2 border-border focus:border-primary placeholder:text-muted-foreground/50"
                                placeholder="Ej: El Sí quiero, Mirada de la novia, Anillos..."
                                onKeyDown={(e) => {
                                    // Si pulsa Enter, guardar
                                    if (e.key === 'Enter') {
                                        handleSaveAndNext();
                                    }
                                }}
                            />
                            <p className="text-sm text-muted-foreground italic">Puedes pulsar la tecla ENTER para guardar rápidamente.</p>
                        </div>

                        {/* 3. Multi-tags (Solo para Bodas) */}
                        {category === 'Bodas' && (
                            <div className="space-y-2 animate-in fade-in slide-in-from-top-4">
                                <label className="text-sm font-bold uppercase tracking-widest text-primary">3. Subfiltros Bodas</label>
                                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                                    {bodasSubmenu.map((group: { group: string, items: string[] }) => (
                                        <div key={group.group} className="space-y-1">
                                            <p className="font-bold text-xs uppercase text-muted-foreground bg-primary/5 p-1 px-2 rounded">{group.group}</p>
                                            <div className="flex flex-col gap-1">
                                                {group.items.map(tag => (
                                                    <button
                                                        key={tag}
                                                        onClick={() => toggleTag(tag)}
                                                        className={cn(
                                                            "text-left px-2 py-1 rounded-md text-xs transition-colors border",
                                                            selectedTags.includes(tag)
                                                                ? "bg-primary text-primary-foreground border-primary font-bold shadow-md"
                                                                : "bg-transparent text-muted-foreground border-border hover:border-primary/50"
                                                        )}
                                                    >
                                                        {tag}
                                                    </button>
                                                ))}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* Guardar y Pasar / Descartar */}
                        <div className="pt-6 space-y-4">
                            <Button
                                onClick={handleSaveAndNext}
                                disabled={isSaving}
                                className="w-full h-16 text-sm uppercase tracking-widest font-bold bg-primary hover:bg-primary/90 text-primary-foreground"
                            >
                                {isSaving ? 'Procesando...' : 'Guardar y Siguiente Foto ->'}
                            </Button>

                            <Button
                                onClick={handleDiscard}
                                disabled={isSaving}
                                variant="destructive"
                                className="w-full h-12 text-sm uppercase tracking-widest font-bold border-2 border-red-500/20"
                            >
                                <Trash2 className="w-5 h-5 mr-2" />
                                Descartar Foto (Mover a Papelera)
                            </Button>
                        </div>

                        {/* Navegación manual por si quiere saltarse alguna */}
                        <div className="flex justify-between mt-8 pt-8 border-t border-border">
                            <Button
                                variant="outline"
                                onClick={() => setCurrentIndex(prev => Math.max(0, prev - 1))}
                                disabled={currentIndex === 0}
                            >
                                Anterior
                            </Button>
                            <Button
                                variant="outline"
                                onClick={() => setCurrentIndex(prev => Math.min(photos.length - 1, prev + 1))}
                                disabled={currentIndex === photos.length - 1}
                            >
                                Saltar
                            </Button>
                        </div>

                    </div>

                </div>

            </div>
        </div>
    );
}
