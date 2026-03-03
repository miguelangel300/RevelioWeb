import { NextResponse } from "next/server";
export const dynamic = "force-dynamic";
import fs from "fs";
import path from "path";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const src = searchParams.get("src");

  if (!src) {
    return NextResponse.json(
      { error: "Missing src parameter" },
      { status: 400 },
    );
  }

  try {
    // Calcular la ruta física al archivo en la carpeta public
    // Quitando la barra inicial si la tiene
    const relativePath = src.startsWith("/") ? src.slice(1) : src;
    const filePath = path.join(process.cwd(), "public", relativePath);

    if (!fs.existsSync(filePath)) {
      return NextResponse.json({ error: "File not found" }, { status: 404 });
    }

    const stats = fs.statSync(filePath);
    return NextResponse.json({
      mtimeMs: stats.mtimeMs,
      mtime: stats.mtime,
    });
  } catch (error) {
    console.error("Error fetching file stats:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 },
    );
  }
}
