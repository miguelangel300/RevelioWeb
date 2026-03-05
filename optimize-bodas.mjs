import fs from 'fs';
import path from 'path';
import sharp from 'sharp';

const inputBaseDir = path.join(process.cwd(), 'rawBodas');
const outputBaseDir = path.join(process.cwd(), 'public', 'bodas');

const MAX_WIDTH = 1920;

global.totalSavedBytes = 0;
global.optimizedCount = 0;

async function processDirectory(currentInputDir, currentOutputDir) {
    if (!fs.existsSync(currentOutputDir)) {
        fs.mkdirSync(currentOutputDir, { recursive: true });
    }

    const entries = fs.readdirSync(currentInputDir, { withFileTypes: true });

    for (const entry of entries) {
        const inputPath = path.join(currentInputDir, entry.name);
        const outputPath = path.join(currentOutputDir, entry.name);

        if (entry.isDirectory()) {
            await processDirectory(inputPath, outputPath);
        } else {
            const ext = path.extname(entry.name).toLowerCase();
            if (!['.jpg', '.jpeg', '.png', '.webp'].includes(ext)) {
                continue;
            }

            // Si ya existe la imagen en el destino y es más pequeña que la original (asumiendo que está optimizada), la saltamos
            if (fs.existsSync(outputPath)) {
                console.log(`⏭️  Omitiendo: ${entry.name} - (Ya existe en destino)`);
                continue;
            }

            const stats = fs.statSync(inputPath);
            const originalSize = stats.size;

            console.log(`Procesando: ${inputPath} (${(originalSize / 1024 / 1024).toFixed(2)} MB)...`);

            try {
                const image = sharp(inputPath);
                const metadata = await image.metadata();

                if (!metadata.width) {
                    console.warn(`No se pudo leer el width de ${entry.name}, se omite.`);
                    continue;
                }

                const shouldResize = metadata.width > MAX_WIDTH;

                let pipeline = image;
                if (shouldResize) {
                    pipeline = pipeline.resize({ width: MAX_WIDTH, withoutEnlargement: true });
                }

                if (['.jpg', '.jpeg'].includes(ext)) {
                    pipeline = pipeline.jpeg({ quality: 80, mozjpeg: true });
                } else if (ext === '.png') {
                    pipeline = pipeline.png({ quality: 80, compressionLevel: 8 });
                } else if (ext === '.webp') {
                    pipeline = pipeline.webp({ quality: 80 });
                }

                await pipeline.toFile(outputPath);

                const optimizedStats = fs.statSync(outputPath);
                const optimizedSize = optimizedStats.size;
                const savedBytes = originalSize - optimizedSize;
                const percentage = ((savedBytes / originalSize) * 100).toFixed(1);

                global.totalSavedBytes += savedBytes;
                global.optimizedCount++;

                console.log(`✅ ${entry.name}: Reducido un ${percentage}% -> ${(optimizedSize / 1024 / 1024).toFixed(2)} MB`);

            } catch (err) {
                console.error(`❌ Error procesando ${entry.name}:`, err);
            }
        }
    }
}

async function optimizeImages() {
    if (!fs.existsSync(inputBaseDir)) {
        console.error(`❌ El directorio de entrada no existe: ${inputBaseDir}`);
        fs.mkdirSync(inputBaseDir, { recursive: true });
        console.log(`Directorio creado. Añade tus carpetas de bodas en rawBodas y vuelve a ejecutar.`);
        return;
    }

    console.log(`Iniciando optimización recursiva de ${inputBaseDir} hacia ${outputBaseDir}...`);
    await processDirectory(inputBaseDir, outputBaseDir);

    console.log('\n================================');
    console.log('🎉 OPTIMIZACIÓN COMPLETADA 🎉');
    console.log(`Imágenes optimizadas: ${global.optimizedCount}`);
    console.log(`Espacio total ahorrado: ${(global.totalSavedBytes / 1024 / 1024 / 1024).toFixed(2)} GB`);
    console.log('================================');
}

optimizeImages();
