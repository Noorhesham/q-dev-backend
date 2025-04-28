"use server";
import multer from "multer";
import fs from "fs";
import path from "path";
import { Readable } from "stream";

// Ensure the uploads folder exists inside /public.
const uploadFolder = path.join(process.cwd(), "uploads"); // ⚡ Not inside "public"
if (!fs.existsSync(uploadFolder)) {
  fs.mkdirSync(uploadFolder, { recursive: true });
}

// Configure Multer storage to save files in the public/uploads folder.
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadFolder);
  },
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname);
    const filename = `${Date.now()}-${Math.round(Math.random() * 1e9)}${ext}`;
    cb(null, filename);
  },
});

/**
 * Server action to upload a photo using Multer.
 * It expects a FormData with a "photo" file.
 */
export async function uploadPhotoAction(formData: FormData) {
  try {
    const file = formData.get("photo") as File;
    if (!file) {
      throw new Error("No file provided");
    }

    // Convert the File into a Buffer.
    const buffer = Buffer.from(await file.arrayBuffer());
    // Create a stream from the buffer.
    const stream = Readable.from(buffer);

    // Create a fake file object that Multer expects.
    const fakeFile: any = {
      fieldname: "photo",
      originalname: file.name,
      encoding: "7bit",
      mimetype: file.type,
      stream, // Provide the stream so Multer can pipe it
    };

    // Use Multer’s storage engine to handle saving the file.
    return new Promise<{ secure_url: string; publicId: string }>((resolve, reject) => {
      // _handleFile is an internal method that processes the file.
      storage._handleFile({} as any, fakeFile, (err, info) => {
        if (err) return reject(err);
        // Build the file URL based on the public folder location.
        const filePath = `uploads/${info.filename}`; // Now points to API route
        resolve({ secure_url: filePath, publicId: info.filename });
      });
    });
  } catch (error) {
    return { error: "Error uploading photo" };
  }
}
