import { NextResponse } from "next/server";
export const dynamic = "force-dynamic";
import fs from "fs";
import path from "path";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { id, category, title, action, tags } = body;

    if (!id) {
      return NextResponse.json(
        { error: "Missing required id" },
        { status: 400 },
      );
    }

    const galleryFilePath = path.join(
      process.cwd(),
      "src",
      "data",
      "gallery.ts",
    );
    let fileContent = fs.readFileSync(galleryFilePath, "utf8");

    // Buscamos el objeto de la foto (Regex con flag s para multilínea)
    // Usamos un patrón más estricto que requiere que el ID sea exacto
    const regex = new RegExp(
      `\\{[\\s\\S]*?id:\\s*['"]${id}['"][\\s\\S]*?\\}`,
      "g",
    );
    const matches = fileContent.match(regex);

    if (!matches || matches.length === 0) {
      return NextResponse.json(
        { error: `Image with id ${id} not found` },
        { status: 404 },
      );
    }

    const currentObjectStr = matches[0];

    // LÓGICA DE BORRADO (DESCARTE)
    if (action === "DELETE") {
      // Reemplazamos exactamente el bloque encontrado, eliminando también la coma siguiente si existe
      // Buscamos el objeto en el contexto del array (con posibles espacios/comas)
      const exactDeleteRegex = new RegExp(
        `\\s*\\{[\\s\\S]*?id:\\s*['"]${id}['"][\\s\\S]*?\\},?`,
        "g",
      );
      fileContent = fileContent.replace(exactDeleteRegex, "");

      // Mover la imagen físicamente a descartes
      const srcMatch = currentObjectStr.match(/src:\s*['"]([^'"]+)['"]/);
      if (srcMatch && srcMatch[1]) {
        const relativePath = srcMatch[1].startsWith("/")
          ? srcMatch[1].slice(1)
          : srcMatch[1];
        const oldFilePath = path.join(process.cwd(), "public", relativePath);
        const discardedDir = path.join(
          process.cwd(),
          "public",
          "discarded_images",
        );

        if (fs.existsSync(oldFilePath)) {
          if (!fs.existsSync(discardedDir)) {
            fs.mkdirSync(discardedDir, { recursive: true });
          }
          const fileName = path.basename(relativePath);
          const newFilePath = path.join(discardedDir, fileName);
          fs.renameSync(oldFilePath, newFilePath);
        }
      }

      fs.writeFileSync(galleryFilePath, fileContent, "utf8");
      return NextResponse.json({
        success: true,
        message: `Image ${id} discarded`,
      });
    }

    // LÓGICA DE ACTUALIZACIÓN
    if (!category || title === undefined) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 },
      );
    }

    let newObjectStr = currentObjectStr.replace(
      /category:\s*['"].*?['"]/,
      `category: ${JSON.stringify(category)}`,
    );

    newObjectStr = newObjectStr.replace(
      /title:\s*['"].*?['"]/,
      `title: ${JSON.stringify(title)}`,
    );

    // Reemplazar o añadir tags si es una boda
    if (tags && Array.isArray(tags)) {
      const tagsStr = `tags: [${tags.map((t: string) => JSON.stringify(t)).join(", ")}]`;

      if (/tags:\s*\[.*?\]/.test(newObjectStr)) {
        // Reemplazar existente
        newObjectStr = newObjectStr.replace(/tags:\s*\[.*?\]/, tagsStr);
      } else {
        // Inyectar antes de la llave de cierre, controlando la coma previa
        newObjectStr = newObjectStr.replace(
          /,?\s*}$/,
          `,\n    ${tagsStr}\n  }`,
        );
      }
    } else {
      // Eliminar la propiedad tags si ya no hay y se pasaron a otra categoría
      newObjectStr = newObjectStr.replace(/,?\s*tags:\s*\[.*?\]/, "");
    }

    // MOVER ARCHIVO FÍSICAMENTE
    const srcMatch = currentObjectStr.match(/src:\s*['"]([^'"]+)['"]/);
    if (srcMatch && srcMatch[1]) {
      const oldRelativePath = srcMatch[1].startsWith("/")
        ? srcMatch[1].slice(1)
        : srcMatch[1];
      const oldFilePath = path.join(process.cwd(), "public", oldRelativePath);

      if (fs.existsSync(oldFilePath)) {
        // Determinar carpeta de destino
        const isBodaWithTags = category === "Bodas" && tags && tags.length > 0;
        // Priorizar Momentos del Evento como subcarpeta principal
        let subFolder = "";
        if (isBodaWithTags) {
          const mainTags = [
            "Preparativos",
            "Ceremonia",
            "Fiesta",
            "Sesión de Pareja",
          ];
          const momementTag = tags.find((t: string) => mainTags.includes(t));
          subFolder = momementTag || tags[0]; // usar la etiqueta primordial o la 1a
        }

        const relativeDestDir = path.join(category, subFolder);
        const destDir = path.join(process.cwd(), "public", relativeDestDir);

        if (!fs.existsSync(destDir)) {
          fs.mkdirSync(destDir, { recursive: true });
        }

        const fileName = path.basename(oldRelativePath);
        const newFilePath = path.join(destDir, fileName);

        // Mover físicamente el archivo web
        fs.renameSync(oldFilePath, newFilePath);

        // Reemplazar la ruta src en la String original de TypeScript
        // El nuevo src DEBE llevar "/" por delante para que cargue en la web
        const newSrc = `/${path.posix.join(category, subFolder, fileName)}`;
        newObjectStr = newObjectStr.replace(
          /src:\s*['"][^'"]+['"]/,
          `src: ${JSON.stringify(newSrc)}`,
        );
      }
    }

    fileContent = fileContent.replace(currentObjectStr, newObjectStr);
    fs.writeFileSync(galleryFilePath, fileContent, "utf8");

    return NextResponse.json({ success: true, message: `Image ${id} updated` });
  } catch (error) {
    console.error("Error updating gallery file:", error);
    return NextResponse.json(
      { error: "Failed to update file" },
      { status: 500 },
    );
  }
}
