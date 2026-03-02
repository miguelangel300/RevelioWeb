import fs from 'fs';
import path from 'path';
import sharp from 'sharp';

const inputDir = path.join(process.cwd(), 'raw_images');
const outputDir = path.join(process.cwd(), 'public');

const MAX_WIDTH = 1920;

async function optimizeImages() {
    if (!fs.existsSync(outputDir)) {
        fs.mkdirSync(outputDir, { recursive: true });
    }

    const files = fs.readdirSync(inputDir);
    let optimizedCount = 0;
    let totalSavedBytes = 0;

    for (const file of files) {
        const ext = path.extname(file).toLowerCase();
        // Procesamos sólo las extensiones típicas de fotos pesadas
        if (!['.jpg', '.jpeg', '.png', '.webp'].includes(ext)) {
            continue;
        }

        const inputPath = path.join(inputDir, file);
        const outputPath = path.join(outputDir, file);

        // Obtenemos info del archivo
        const stats = fs.statSync(inputPath);
        const originalSize = stats.size;

        console.log(`Procesando: ${file} (${(originalSize / 1024 / 1024).toFixed(2)} MB)...`);

        try {
            const image = sharp(inputPath);
            const metadata = await image.metadata();

            if (!metadata.width) {
                console.warn(`No se pudo leer el width de ${file}, se omite.`);
                continue;
            }

            // Redimensionamos sólo si excede el ancho máximo, conservando aspect ratio (proporción)
            const shouldResize = metadata.width > MAX_WIDTH;

            let pipeline = image;
            if (shouldResize) {
                pipeline = pipeline.resize({ width: MAX_WIDTH, withoutEnlargement: true });
            }

            // Comprimimos manteniendo el mismo formato (o convirtiendo a WEBP si se desea, pero 
            // para no romper los src="" actuales de Next.js que referencian a .jpg, 
            // simplemente guardaremos con la misma extensión pero súper optimizado).
            if (['.jpg', '.jpeg'].includes(ext)) {
                pipeline = pipeline.jpeg({ quality: 80, mozjpeg: true });
            } else if (ext === '.png') {
                pipeline = pipeline.png({ quality: 80, compressionLevel: 8 });
            } else if (ext === '.webp') {
                pipeline = pipeline.webp({ quality: 80 });
            }

            // Guardamos la imagen optimizada
            await pipeline.toFile(outputPath);

            const optimizedStats = fs.statSync(outputPath);
            const optimizedSize = optimizedStats.size;
            const savedBytes = originalSize - optimizedSize;
            const percentage = ((savedBytes / originalSize) * 100).toFixed(1);

            totalSavedBytes += savedBytes;
            optimizedCount++;

            console.log(`✅ ${file}: Reducido un ${percentage}% -> ${(optimizedSize / 1024 / 1024).toFixed(2)} MB`);

        } catch (err) {
            console.error(`❌ Error procesando ${file}:`, err);
        }
    }

    console.log('\n================================');
    console.log('🎉 OPTIMIZACIÓN COMPLETADA 🎉');
    console.log(`Imágenes optimizadas: ${optimizedCount}`);
    console.log(`Espacio total ahorrado: ${(totalSavedBytes / 1024 / 1024 / 1024).toFixed(2)} GB`);
    console.log('================================');
}

optimizeImages();
