import { NextResponse } from "next/server";
import { readPress, writePress } from "@/app/lib/db";
import { verifyAdminAuth } from "@/app/lib/auth";

export const runtime = "nodejs";

export async function GET() {
  try {
    const press = await readPress();
    return NextResponse.json(press);
  } catch (err) {
    console.error("Fetch press error:", err);
    return NextResponse.json({ error: "Failed to fetch press articles" }, { status: 500 });
  }
}

export async function POST(req) {
  try {
    if (!(await verifyAdminAuth())) {
      return NextResponse.json({ error: "Unauthorized access" }, { status: 401 });
    }
    const newArticle = await req.json();
    if (!newArticle.id || !newArticle.title || !newArticle.content) {
      return NextResponse.json({ error: "Invalid article payload. ID, Title, and Content are required." }, { status: 400 });
    }
    const press = await readPress();
    const updated = [newArticle, ...press];
    await writePress(updated);
    return NextResponse.json({ success: true, article: newArticle });
  } catch (err) {
    console.error("Add press error:", err);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}

export async function DELETE(req) {
  try {
    if (!(await verifyAdminAuth())) {
      return NextResponse.json({ error: "Unauthorized access" }, { status: 401 });
    }
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");
    if (!id) {
      return NextResponse.json({ error: "Missing article ID parameter" }, { status: 400 });
    }
    const press = await readPress();
    const updated = press.filter((p) => p.id !== id);
    await writePress(updated);
    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("Delete press error:", err);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}

export async function PUT(req) {
  try {
    if (!(await verifyAdminAuth())) {
      return NextResponse.json({ error: "Unauthorized access" }, { status: 401 });
    }
    const updatedArticle = await req.json();
    if (!updatedArticle.id || !updatedArticle.title || !updatedArticle.content) {
      return NextResponse.json({ error: "Invalid article payload. ID, Title, and Content are required." }, { status: 400 });
    }
    const press = await readPress();
    const updated = press.map((p) => (p.id === updatedArticle.id ? updatedArticle : p));
    await writePress(updated);
    return NextResponse.json({ success: true, article: updatedArticle });
  } catch (err) {
    console.error("Update press error:", err);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
