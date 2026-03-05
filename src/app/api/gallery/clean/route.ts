import { NextResponse } from "next/server";
export const dynamic = "force-dynamic";
import fs from "fs";
import path from "path";
import { galleryPhotos } from "@/data/gallery";

export async function POST() {
  try {
    const publicDir = path.join(process.cwd(), "public");

    // Filtrar las fotos fantasma
    const validPhotos = galleryPhotos.filter((photo) => {
      // url decode the src in case there are spaces (ej: "Marta y Alejandro")
      const decodedSrc = decodeURIComponent(photo.src);
      // Remove leading slash for path.join
      const filePath = path.join(
        publicDir,
        decodedSrc.startsWith("/") ? decodedSrc.slice(1) : decodedSrc,
      );
      return fs.existsSync(filePath);
    });

    const removedCount = galleryPhotos.length - validPhotos.length;

    if (removedCount > 0) {
      // Recrear el archivo gallery.ts limpiando las cacas
      let newContent = `import type { Photo } from "@/types";\n\n`;
      newContent += `// Se añaden alturas para un mejor renderizado en la galería masonry.\n`;
      newContent += `export const galleryPhotos: Photo[] = [\n`;

      const photoStrings = validPhotos.map((photo) => {
        let entry = `{\n`;
        entry += `    id: ${JSON.stringify(photo.id)},\n`;
        entry += `    src: ${JSON.stringify(photo.src)},\n`;
        entry += `    alt: ${JSON.stringify(photo.alt || photo.id)},\n`;
        if (photo.dataAiHint) {
          entry += `    dataAiHint: ${JSON.stringify(photo.dataAiHint)},\n`;
        }
        if (photo.height) {
          entry += `    height: ${photo.height},\n`;
        }
        if (photo.category) {
          entry += `    category: ${JSON.stringify(photo.category)},\n`;
        }
        if (photo.title) {
          entry += `    title: ${JSON.stringify(photo.title)},\n`;
        }
        if (photo.subFolder) {
          entry += `    subFolder: ${JSON.stringify(photo.subFolder)},\n`;
        }
        if (photo.tags && photo.tags.length > 0) {
          entry += `    tags: ${JSON.stringify(photo.tags)},\n`;
        }
        entry += `  }`;
        return entry;
      });

      newContent += photoStrings.join(",\n");
      newContent += `\n];\n`;

      const galleryFilePath = path.join(
        process.cwd(),
        "src",
        "data",
        "gallery.ts",
      );
      fs.writeFileSync(galleryFilePath, newContent, "utf8");
    }

    return NextResponse.json({
      success: true,
      message:
        removedCount > 0
          ? `Operación completada: Se han eliminado ${removedCount} fotos de la base de datos que ya no existían en disco.`
          : `Todo al día. No se han encontrado fotos perdidas.`,
      removed: removedCount,
    });
  } catch (error) {
    console.error("Error limpiando galería:", error);
    return NextResponse.json(
      { error: "Error limpiando la base de datos de la galería" },
      { status: 500 },
    );
  }
}
