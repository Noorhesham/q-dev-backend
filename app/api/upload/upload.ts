import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

export async function GET(
  request: Request,
  { params }: { params: { filename: string } }
) {
  const filename = params.filename;
  const filePath = path.join(process.cwd(), 'uploads', filename);

  if (!fs.existsSync(filePath)) {
    return NextResponse.json(
      { error: 'File not found' },
      { status: 404 }
    );
  }

  // Read the file and return it as a response
  const fileStream = fs.readFileSync(filePath);
  return new NextResponse(fileStream, {
    headers: {
      'Content-Type': 'image/*', // Adjust for videos if needed
    },
  });
}