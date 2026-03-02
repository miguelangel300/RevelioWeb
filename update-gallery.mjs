import fs from 'fs';
import path from 'path';

const galleryFile = path.join(process.cwd(), 'src', 'data', 'gallery.ts');
let content = fs.readFileSync(galleryFile, 'utf8');

const categories = ['Bodas', 'Retratos', 'Detalles', 'Editorial'];
const titles = {
    'Bodas': ['Amor Eterno', 'La Promesa', 'Sí, quiero', 'Día Inolvidable', 'El Gran Día'],
    'Retratos': ['Miradas', 'Sonrisas', 'Al Natural', 'Golden Hour', 'Instantes'],
    'Detalles': ['Flores', 'Anillos', 'Preparativos', 'Decoración', 'Vestido'],
    'Editorial': ['Elegancia', 'Arte Visual', 'Claroscuro', 'Enfoque', 'Composición']
};

let matchIndex = 0;
// Using a regex to match each object in the array
const newContent = content.replace(/\{([^}]+)\}/g, (match, innerProps) => {
    // Only process if it looks like a photo object
    if (innerProps.includes('src:') || innerProps.includes('id:')) {
        const category = categories[matchIndex % categories.length];
        const categoryTitles = titles[category];
        const title = categoryTitles[matchIndex % categoryTitles.length];

        matchIndex++;

        // Add category and title before the closing bracket if they don't exist
        if (!innerProps.includes('category:')) {
            return `{${innerProps.trim()}, category: '${category}', title: '${title}' }`;
        }
    }
    return match;
});

fs.writeFileSync(galleryFile, newContent, 'utf8');
console.log('Gallery successfully updated with categories and titles!');
