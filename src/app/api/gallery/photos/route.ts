import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";
import type { Photo } from "@/types";

const IMAGE_EXTENSIONS = new Set([".jpg", ".jpeg", ".png", ".webp"]);

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

function sanitizeFolderName(value: string) {
  if (!value || value.includes("..") || value.includes("/") || value.includes("\\")) {
    return null;
  }
  return value;
}

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const weddingParam = searchParams.get("wedding") || "";
    const tagParam = searchParams.get("tag") || "";
    const offsetParam = Number.parseInt(searchParams.get("offset") || "0", 10);
    const limitParam = Number.parseInt(searchParams.get("limit") || "72", 10);

    const wedding = sanitizeFolderName(weddingParam);
    if (!wedding) {
      return NextResponse.json({ error: "Missing or invalid wedding parameter" }, { status: 400 });
    }

    const offset = Number.isNaN(offsetParam) || offsetParam < 0 ? 0 : offsetParam;
    const limit = Number.isNaN(limitParam) ? 72 : Math.min(Math.max(limitParam, 1), 200);

    const bodasDir = path.join(process.cwd(), "public", "bodas");
    const weddingPath = path.join(bodasDir, wedding);

    if (!fs.existsSync(weddingPath) || !fs.statSync(weddingPath).isDirectory()) {
      return NextResponse.json({ photos: [] });
    }

    let folders = fs
      .readdirSync(weddingPath, { withFileTypes: true })
      .filter((entry) => entry.isDirectory())
      .map((entry) => entry.name);

    if (tagParam && tagParam !== "todas") {
      const tag = sanitizeFolderName(tagParam);
      if (!tag) {
        return NextResponse.json({ error: "Invalid tag parameter" }, { status: 400 });
      }
      folders = folders.filter((folder) => folder === tag);
    }

    folders.sort((a, b) => {
      const indexA = PREDEFINED_TAG_ORDER.indexOf(a.toLowerCase());
      const indexB = PREDEFINED_TAG_ORDER.indexOf(b.toLowerCase());

      if (indexA !== -1 && indexB !== -1) return indexA - indexB;
      if (indexA !== -1) return -1;
      if (indexB !== -1) return 1;
      return a.localeCompare(b);
    });

    const photos: Photo[] = [];
    let seenPhotos = 0;
    let hasMore = false;

    outerLoop:
    for (const folder of folders) {
      const folderPath = path.join(weddingPath, folder);
      const files = fs
        .readdirSync(folderPath, { withFileTypes: true })
        .filter((entry) => entry.isFile())
        .map((entry) => entry.name)
        .filter((fileName) => IMAGE_EXTENSIONS.has(path.extname(fileName).toLowerCase()))
        .sort((a, b) => a.localeCompare(b, undefined, { numeric: true }));

      for (const fileName of files) {
        if (seenPhotos < offset) {
          seenPhotos++;
          continue;
        }

        if (photos.length >= limit) {
          hasMore = true;
          break outerLoop;
        }

        const id = fileName.replace(/\.[^/.]+$/, "");
        photos.push({
          id,
          src: `/bodas/${wedding}/${folder}/${fileName}`,
          alt: id,
          dataAiHint: "foto boda",
          height: 800,
          category: "Bodas",
          subFolder: wedding,
          title: id,
          tags: [folder],
        });
        seenPhotos++;
      }
    }

    return NextResponse.json(
      {
        photos,
        hasMore,
        nextOffset: offset + photos.length,
      },
      {
        headers: {
          "Cache-Control": "public, s-maxage=900, stale-while-revalidate=86400",
        },
      },
    );
  } catch (error) {
    console.error("Error leyendo fotos de boda:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
