import { NextResponse } from "next/server";
import { readCertificates, writeCertificates } from "@/app/lib/db";
import { verifyAdminAuth } from "@/app/lib/auth";

export const runtime = "nodejs";

export async function GET() {
  try {
    const certs = await readCertificates();
    const isAdmin = await verifyAdminAuth();
    if (isAdmin) {
      return NextResponse.json(certs);
    }
    // Public count support: return empty objects to preserve length without leaking data
    return NextResponse.json(certs.map(() => ({})));
  } catch (err) {
    return NextResponse.json({ error: "Failed to fetch certificate claims" }, { status: 500 });
  }
}

export async function POST(req) {
  try {
    const newClaim = await req.json();
    if (!newClaim.id || !newClaim.name || !newClaim.mobile || !newClaim.passcode) {
      return NextResponse.json({ error: "Invalid certificate claim payload" }, { status: 400 });
    }
    const certs = await readCertificates();
    
    // Prevent duplicate entries for the exact same provider
    const isDuplicate = certs.some((c) => c.mobile === newClaim.mobile);
    if (isDuplicate) {
      return NextResponse.json({ success: true, message: "Certificate already persisted" });
    }

    const updated = [...certs, newClaim];
    await writeCertificates(updated);
    return NextResponse.json({ success: true, claim: newClaim });
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
      return NextResponse.json({ error: "Missing certificate claim ID" }, { status: 400 });
    }
    const certs = await readCertificates();
    const updated = certs.filter((c) => c.id !== id);
    await writeCertificates(updated);
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
    const { ids, read } = await req.json();
    if (!Array.isArray(ids)) {
      return NextResponse.json({ error: "Missing certificate IDs array" }, { status: 400 });
    }
    const certs = await readCertificates();
    const updated = certs.map((c) => (ids.includes(c.id) ? { ...c, read: read === true } : c));
    await writeCertificates(updated);
    return NextResponse.json({ success: true });
  } catch (err) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
