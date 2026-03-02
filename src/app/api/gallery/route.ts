import { NextResponse } from "next/server";
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

    // Buscamos el objeto de la foto (Regex relajada para pillar todo hasta la llave de cierre)
    const regex = new RegExp(`({\\s*id:\\s*['"]${id}['"].*?})`, "g");
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
      // Eliminar el objeto del archivo gallery.ts junto con la coma si la hay
      const deleteRegex = new RegExp(
        `[\\t ]*{\\s*id:\\s*['"]${id}['"].*?},?\\n?`,
        "g",
      );
      fileContent = fileContent.replace(deleteRegex, "");

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
    if (!category || !title) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 },
      );
    }

    let newObjectStr = currentObjectStr.replace(
      /category:\s*['"][a-zA-ZÀ-ÿ0-9\s]+['"]/,
      `category: '${category}'`,
    );

    newObjectStr = newObjectStr.replace(
      /title:\s*['"][a-zA-ZÀ-ÿ0-9\s,]+['"]/,
      `title: '${title}'`,
    );

    // Reemplazar o añadir tags si es una boda
    if (tags && Array.isArray(tags)) {
      const tagsStr = `tags: [${tags.map((t: string) => `'${t}'`).join(", ")}]`;

      if (/tags:\s*\[.*?\]/.test(newObjectStr)) {
        // Reemplazar existente
        newObjectStr = newObjectStr.replace(/tags:\s*\[.*?\]/, tagsStr);
      } else {
        // Inyectar antes de la llave de cierre
        newObjectStr = newObjectStr.replace(/(\s*})$/, `, ${tagsStr}$1`);
      }
    } else {
      // Eliminar la propiedad tags si ya no hay y se pasaron a otra categoría
      newObjectStr = newObjectStr.replace(/,\s*tags:\s*\[.*?\]/, "");
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
