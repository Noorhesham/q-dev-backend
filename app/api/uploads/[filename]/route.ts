import { NextRequest, NextResponse } from "next/server";
import path from "path";
import { promises as fs } from "fs";

export async function GET(req: NextRequest, { params }: { params: { filename: string } }) {
  const { filename } = params;
  const filePath = path.join(process.cwd(), "uploads", filename);

  try {
    const fileBuffer = await fs.readFile(filePath);
    return new NextResponse(fileBuffer, {
      headers: {
        "Content-Type": "image/jpeg", // Adjust based on file type
        "Cache-Control": "public, max-age=31536000, immutable",
      },
    });
  } catch (error) {
    return NextResponse.json({ error: "File not found" }, { status: 404 });
  }
}
