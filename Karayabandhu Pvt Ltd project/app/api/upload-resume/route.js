import { NextResponse } from "next/server";
import { writeFile, mkdir } from "fs/promises";
import path from "path";

export const runtime = "nodejs";

export async function POST(req) {
  try {
    const formData = await req.formData();
    const file = formData.get("file");
    
    if (!file) {
      return NextResponse.json({ error: "No file provided" }, { status: 400 });
    }

    // Secure file size validation (Max 10MB)
    const limitBytes = 10 * 1024 * 1024;
    if (file.size > limitBytes) {
      return NextResponse.json({ error: "File too large. Maximum size allowed is 10MB." }, { status: 400 });
    }

    // Secure file type validation (PDF, DOC, DOCX)
    const allowedExtensions = [".pdf", ".doc", ".docx"];
    const ext = path.extname(file.name).toLowerCase();
    if (!allowedExtensions.includes(ext)) {
      return NextResponse.json({ error: "Unsupported file format. Please upload PDF, DOC, or DOCX." }, { status: 400 });
    }

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    // Set destination directory inside workspace 'public/uploads'
    const uploadDir = path.join(process.cwd(), "public", "uploads");
    await mkdir(uploadDir, { recursive: true });

    // Clean filename to prevent spaces or weird characters
    const cleanName = Date.now() + "_" + file.name.replace(/[^a-zA-Z0-9.\-_]/g, "");
    const filePath = path.join(uploadDir, cleanName);

    // Write the buffer to file system
    await writeFile(filePath, buffer);
    const fileUrl = `/uploads/${cleanName}`;

    return NextResponse.json({ success: true, url: fileUrl });
  } catch (err) {
    console.error("Resume upload error:", err);
    return NextResponse.json({ error: "Failed to save file: " + err.message }, { status: 500 });
  }
}
