import { NextResponse } from "next/server";
export const dynamic = "force-dynamic";
import fs from "fs";
import path from "path";
import { galleryPhotos } from "@/data/gallery";

// Rutas conocidas en la web
const validCategories = ["Bodas", "Retratos", "Detalles", "Editorial"];

function getAllJpgFiles(dirPath: string, arrayOfFiles: string[] = []) {
  const files = fs.readdirSync(dirPath);

  files.forEach((file) => {
    const fullPath = path.join(dirPath, file);
    if (fs.statSync(fullPath).isDirectory()) {
      arrayOfFiles = getAllJpgFiles(fullPath, arrayOfFiles);
    } else {
      if (
        file.toLowerCase().endsWith(".jpg") ||
        file.toLowerCase().endsWith(".jpeg") ||
        file.toLowerCase().endsWith(".png")
      ) {
        arrayOfFiles.push(fullPath);
      }
    }
  });

  return arrayOfFiles;
}

export async function POST() {
  try {
    const publicDir = path.join(process.cwd(), "public");
    const allImages = getAllJpgFiles(publicDir);

    const existingIds = galleryPhotos.map((p) => p.id);
    let newImagesAdded = 0;

    // Preparar el array final en memoria que inyectaremos en el archivo ts
    const newEntries: string[] = [];

    allImages.forEach((absolutePath) => {
      const relativePath = absolutePath
        .replace(publicDir, "")
        .replace(/\\/g, "/"); // Ej: /Bodas/Fiesta/foto.jpg o /foto2.jpg
      const fileName = path.basename(relativePath);
      const id = fileName.replace(/\.[^/.]+$/, ""); // Quitar extensión = "_DMA123"

      // Ignorar si está en carpeta descartadas o no deseadas
      if (
        relativePath.includes("/discarded_images/") ||
        relativePath.includes("/icons/")
      )
        return;

      // Si ya existe en gallery.ts, lo saltamos por seguridad.
      // Esta sincronización solo AÑADE fotos nuevas no registradas.
      if (existingIds.includes(id)) {
        return;
      }

      // Analizar las carpetas para deducir categoría y tags
      const parts = relativePath.split("/").filter(Boolean); // ["Bodas", "Fiesta", "foto.jpg"]
      let category = "Bodas"; // Default
      let title = id;
      const tags: string[] = [];

      if (parts.length > 1) {
        // La foto está dentro de una carpeta. La primera carpeta suele ser la categoría
        const potentialCategory = parts[0];
        if (validCategories.includes(potentialCategory)) {
          category = potentialCategory;
        }

        // Si es bodas y tiene subcarpetas, la subcarpeta del medio será el tag
        if (category === "Bodas" && parts.length > 2) {
          // ["Bodas", "Preparativos", "foto.jpg"]
          const subFolder = parts[1];
          tags.push(subFolder);
        }
      }

      // Format TypeScript object string
      let newEntryStr = `
  {
    id: "${id}",
    src: "${relativePath}",
    alt: "${id}",
    dataAiHint: "foto boda",
    height: 800,
    category: "${category}",
    title: "${title}",`;

      if (tags.length > 0) {
        newEntryStr += `\n    tags: [${tags.map((t) => JSON.stringify(t)).join(", ")}]`;
      }

      newEntryStr += `\n  }`;

      newEntries.push(newEntryStr);
      newImagesAdded++;
    });

    if (newImagesAdded > 0) {
      // Leer y Modificar gallery.ts
      const galleryFilePath = path.join(
        process.cwd(),
        "src",
        "data",
        "gallery.ts",
      );
      let fileContent = fs.readFileSync(galleryFilePath, "utf8");

      // Buscar el ÚLTIMO '];' para insertar las nuevas fotos de forma segura
      const lastBracketIndex = fileContent.lastIndexOf("];");
      if (lastBracketIndex !== -1) {
        const combinedEntries = newEntries.join(",\n");
        fileContent =
          fileContent.substring(0, lastBracketIndex) +
          `, ${combinedEntries}\n];`;
        fs.writeFileSync(galleryFilePath, fileContent, "utf8");
      }
    }

    return NextResponse.json({
      success: true,
      message: `Sync completada: ${newImagesAdded} imágenes nuevas añadidas e interpretadas dinámicamente.`,
      added: newImagesAdded,
    });
  } catch (error) {
    console.error("Error sincronizando carpetas:", error);
    return NextResponse.json(
      { error: "Error de sincronización con el disco duro" },
      { status: 500 },
    );
  }
}
