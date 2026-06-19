import { NextResponse } from "next/server";
import { readApplications, writeApplications } from "@/app/lib/db";
import { verifyAdminAuth } from "@/app/lib/auth";

export const runtime = "nodejs";

export async function GET() {
  try {
    if (!(await verifyAdminAuth())) {
      return NextResponse.json({ error: "Unauthorized access" }, { status: 401 });
    }
    const apps = await readApplications();
    return NextResponse.json(apps);
  } catch (err) {
    return NextResponse.json({ error: "Failed to fetch candidate applications" }, { status: 500 });
  }
}

export async function POST(req) {
  try {
    const newApp = await req.json();
    if (!newApp.personal || !newApp.personal.name || !newApp.personal.phone) {
      return NextResponse.json({ error: "Invalid applicant payload" }, { status: 400 });
    }
    
    // Add unique ID for robust tracking
    if (!newApp.id) {
      newApp.id = "app-" + Date.now();
    }
    
    const apps = await readApplications();
    const updated = [...apps, newApp];
    await writeApplications(updated);
    return NextResponse.json({ success: true, application: newApp });
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
    const indexStr = searchParams.get("index");
    
    const apps = await readApplications();
    let updated;
    
    if (id) {
      updated = apps.filter((app) => app.id !== id);
    } else if (indexStr !== null && indexStr !== undefined) {
      const index = parseInt(indexStr, 10);
      if (isNaN(index) || index < 0 || index >= apps.length) {
        return NextResponse.json({ error: "Invalid index parameter" }, { status: 400 });
      }
      updated = apps.filter((_, i) => i !== index);
    } else {
      return NextResponse.json({ error: "Missing delete criteria (id or index)" }, { status: 400 });
    }
    
    await writeApplications(updated);
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
    const { id, read } = await req.json();
    if (!id) {
      return NextResponse.json({ error: "Missing application ID" }, { status: 400 });
    }
    const apps = await readApplications();
    const updated = apps.map((app) => (app.id === id ? { ...app, read: read === true } : app));
    await writeApplications(updated);
    return NextResponse.json({ success: true });
  } catch (err) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
