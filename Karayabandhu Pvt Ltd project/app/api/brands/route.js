import { NextResponse } from "next/server";
import { readBrands, writeBrands } from "@/app/lib/db";
import { verifyAdminAuth } from "@/app/lib/auth";

export const runtime = "nodejs";

export async function GET() {
  try {
    const brands = await readBrands();
    return NextResponse.json(brands);
  } catch (err) {
    return NextResponse.json({ error: "Failed to fetch portfolio brands" }, { status: 500 });
  }
}

export async function POST(req) {
  try {
    if (!(await verifyAdminAuth())) {
      return NextResponse.json({ error: "Unauthorized access" }, { status: 401 });
    }
    const newBrand = await req.json();
    if (!newBrand.id || !newBrand.name) {
      return NextResponse.json({ error: "Invalid brand payload" }, { status: 400 });
    }
    const brands = await readBrands();
    const updated = [...brands, newBrand];
    await writeBrands(updated);
    return NextResponse.json({ success: true, brand: newBrand });
  } catch (err) {
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
      return NextResponse.json({ error: "Missing brand ID parameter" }, { status: 400 });
    }
    const brands = await readBrands();
    const updated = brands.filter((b) => b.id !== id);
    await writeBrands(updated);
    return NextResponse.json({ success: true });
  } catch (err) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}

export async function PUT(req) {
  try {
    if (!(await verifyAdminAuth())) {
      return NextResponse.json({ error: "Unauthorized access" }, { status: 401 });
    }
    const updatedBrand = await req.json();
    if (!updatedBrand.id || !updatedBrand.name) {
      return NextResponse.json({ error: "Invalid brand payload" }, { status: 400 });
    }
    const brands = await readBrands();
    const updated = brands.map((b) => (b.id === updatedBrand.id ? updatedBrand : b));
    await writeBrands(updated);
    return NextResponse.json({ success: true, brand: updatedBrand });
  } catch (err) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
