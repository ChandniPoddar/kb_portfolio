import { NextResponse } from "next/server";
import { readCredentials, writeCredentials } from "@/app/lib/db";
import { verifyAdminAuth } from "@/app/lib/auth";

export const runtime = "nodejs";

export async function GET() {
  try {
    if (!(await verifyAdminAuth())) {
      return NextResponse.json({ error: "Unauthorized access" }, { status: 401 });
    }
    const credentials = await readCredentials();
    return NextResponse.json(credentials);
  } catch (err) {
    return NextResponse.json({ error: "Failed to fetch provider credentials" }, { status: 500 });
  }
}

export async function POST(req) {
  try {
    if (!(await verifyAdminAuth())) {
      return NextResponse.json({ error: "Unauthorized access" }, { status: 401 });
    }
    const newCred = await req.json();
    if (!newCred.id || !newCred.name || !newCred.mobile || !newCred.passcode) {
      return NextResponse.json({ error: "Invalid provider credentials payload" }, { status: 400 });
    }
    const credentials = await readCredentials();
    const updated = [...credentials, newCred];
    await writeCredentials(updated);
    return NextResponse.json({ success: true, credentials: newCred });
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
      return NextResponse.json({ error: "Missing provider credentials ID parameter" }, { status: 400 });
    }
    const credentials = await readCredentials();
    const updated = credentials.filter((c) => c.id !== id);
    await writeCredentials(updated);
    return NextResponse.json({ success: true });
  } catch (err) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
