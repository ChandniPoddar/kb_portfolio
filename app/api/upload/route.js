import { NextResponse } from "next/server";
import { writeFile, mkdir } from "fs/promises";
import path from "path";
import { verifyAdminAuth } from "@/app/lib/auth";

export const runtime = "nodejs";

export async function POST(req) {
  try {
    if (!(await verifyAdminAuth())) {
      return NextResponse.json({ error: "Unauthorized access" }, { status: 401 });
    }
    const formData = await req.formData();
    const file = formData.get("file");
    
    if (!file) {
      return NextResponse.json({ error: "No file provided" }, { status: 400 });
    }

    // Secure file size validation (Max 150MB)
    const limitBytes = 150 * 1024 * 1024;
    if (file.size > limitBytes) {
      return NextResponse.json({ error: "File too large. Maximum size allowed is 150MB." }, { status: 400 });
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
    console.error("Upload error:", err);
    return NextResponse.json({ error: "Failed to save file: " + err.message }, { status: 500 });
  }
}
