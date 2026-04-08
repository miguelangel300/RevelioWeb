import { NextResponse } from "next/server";
export const dynamic = "force-dynamic";
import fs from "fs";
import path from "path";

// Orden cronológico lógico para las subcarpetas de una boda
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
  "preboda",
];

/**
 * GET /api/gallery/weddings
 * Devuelve la lista de bodas disponibles y sus subcarpetas (tags/filtros)
 */
export async function GET() {
  try {
    const bodasDir = path.join(process.cwd(), "public", "bodas");

    if (!fs.existsSync(bodasDir)) {
      return NextResponse.json(
        { weddings: [] },
        {
          headers: {
            "Cache-Control": "public, s-maxage=3600, stale-while-revalidate=86400",
          },
        },
      );
    }

    const weddingFolders = fs
      .readdirSync(bodasDir, { withFileTypes: true })
      .filter((entry) => entry.isDirectory())
      .map((entry) => {
        const weddingPath = path.join(bodasDir, entry.name);

        // Obtener subcarpetas y ordenarlas lógicamente
        const tagFolders = fs
          .readdirSync(weddingPath, { withFileTypes: true })
          .filter((subEntry) => subEntry.isDirectory())
          .map((subEntry) => subEntry.name)
          .sort((a, b) => {
            const indexA = PREDEFINED_TAG_ORDER.indexOf(a.toLowerCase());
            const indexB = PREDEFINED_TAG_ORDER.indexOf(b.toLowerCase());

            if (indexA !== -1 && indexB !== -1) return indexA - indexB;
            if (indexA !== -1) return -1;
            if (indexB !== -1) return 1;
            return a.localeCompare(b);
          });

        // Obtener miniatura (prioridad 1: miniatura.jpg, prioridad 2: primera foto de orden lógico)
        let thumbnail = "";

        // Comprobar si existe una miniatura personalizada en la raíz de la boda
        const miniaturaJpg = path.join(weddingPath, "miniatura.jpg");
        const miniaturaJpeg = path.join(weddingPath, "miniatura.jpeg");

        if (fs.existsSync(miniaturaJpg)) {
          thumbnail = `/bodas/${entry.name}/miniatura.jpg`;
        } else if (fs.existsSync(miniaturaJpeg)) {
          thumbnail = `/bodas/${entry.name}/miniatura.jpeg`;
        } else {
          // Si no hay miniatura manual, buscar la primera disponible según el orden lógico
          const searchOrder = tagFolders.includes("todas")
            ? ["todas", ...tagFolders.filter((t) => t !== "todas")]
            : tagFolders;

          for (const tag of searchOrder) {
            const tagPath = path.join(weddingPath, tag);
            const images = fs
              .readdirSync(tagPath)
              .filter((f) =>
                [".jpg", ".jpeg", ".png", ".webp"].includes(
                  path.extname(f).toLowerCase(),
                ),
              );
            if (images.length > 0) {
              thumbnail = `/bodas/${entry.name}/${tag}/${images[0]}`;
              break;
            }
          }
        }

        return {
          name: entry.name,
          tags: tagFolders,
          thumbnail,
          imageCount: tagFolders.reduce((acc, tag) => {
            const tagPath = path.join(weddingPath, tag);
            try {
              return (
                acc +
                fs
                  .readdirSync(tagPath)
                  .filter((f) =>
                    [".jpg", ".jpeg", ".png", ".webp"].includes(
                      path.extname(f).toLowerCase(),
                    ),
                  ).length
              );
            } catch {
              return acc;
            }
          }, 0),
        };
      });

    return NextResponse.json(
      { weddings: weddingFolders },
      {
        headers: {
          "Cache-Control": "public, s-maxage=3600, stale-while-revalidate=86400",
        },
      },
    );
  } catch (error) {
    console.error("Error leyendo carpeta bodas:", error);
    return NextResponse.json(
      { error: "Error leyendo carpetas de bodas" },
      { status: 500 },
    );
  }
}
