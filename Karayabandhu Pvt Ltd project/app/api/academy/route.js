import { NextResponse } from "next/server";
import { readAcademyModules, writeAcademyModules } from "@/app/lib/db";
import { verifyAdminAuth } from "@/app/lib/auth";

export const runtime = "nodejs";

// Default modules to seed if database is empty
const defaultModules = [
  {
    id: 1,
    stepTitle: "Welcome & Platform Basics",
    moduleTitle: "Module 1: Introduction to Karaya Bandhu Platform & Operations",
    duration: "4 mins 20 secs",
    desc: "An overarching introduction to the gig-economy model. Get familiar with consumer bookings, live tracking systems, and how our central platform acts as your partner dashboard.",
    videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    bgTheme: "from-blue-900 to-indigo-950",
    embedColor: "bg-blue-950"
  },
  {
    id: 2,
    stepTitle: "Customer Etiquette & Safety",
    moduleTitle: "Module 2: Professional Customer Conduct, Communication & Safety Protocols",
    duration: "6 mins 15 secs",
    desc: "Critical training on standard partner procedures. Learn proper consumer engagement, emergency response protocols, in-app safety tools, and behavioral best practices.",
    videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    bgTheme: "from-indigo-900 to-slate-950",
    embedColor: "bg-slate-950"
  },
  {
    id: 3,
    stepTitle: "Compliance & Certification",
    moduleTitle: "Module 3: Legal Compliance, Platform Standards & Official Verification",
    duration: "5 mins 10 secs",
    desc: "Final module reviewing standard service level agreements, transparent pricing policies, digital verification checks, and final steps to claim your formal credentials.",
    videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    bgTheme: "from-slate-900 to-emerald-950",
    embedColor: "bg-emerald-950"
  }
];

export async function GET() {
  try {
    let modules = await readAcademyModules();
    if (!modules || modules.length === 0) {
      console.log("Seeding default academy training modules...");
      await writeAcademyModules(defaultModules);
      modules = await readAcademyModules();
    }
    return NextResponse.json(modules);
  } catch (err) {
    console.error("GET /api/academy error:", err);
    return NextResponse.json({ error: "Failed to fetch training modules" }, { status: 500 });
  }
}

export async function POST(req) {
  try {
    if (!(await verifyAdminAuth())) {
      return NextResponse.json({ error: "Unauthorized access" }, { status: 401 });
    }
    const payload = await req.json();
    
    // Support either adding a single module or saving the entire array
    if (Array.isArray(payload)) {
      await writeAcademyModules(payload);
      return NextResponse.json({ success: true, count: payload.length });
    } else {
      if (!payload.stepTitle || !payload.moduleTitle || !payload.videoUrl) {
        return NextResponse.json({ error: "Missing required module fields" }, { status: 400 });
      }
      
      const current = await readAcademyModules();
      
      // Determine new ID (auto-increment)
      const nextId = payload.id ? Number(payload.id) : (current.length > 0 ? Math.max(...current.map(m => m.id)) + 1 : 1);
      
      const newModule = {
        id: nextId,
        stepTitle: payload.stepTitle,
        moduleTitle: payload.moduleTitle,
        duration: payload.duration || "5 mins",
        desc: payload.desc || "",
        videoUrl: payload.videoUrl,
        bgTheme: payload.bgTheme || "from-blue-900 to-indigo-950",
        embedColor: payload.embedColor || "bg-blue-950"
      };
      
      const updated = [...current.filter(m => m.id !== nextId), newModule].sort((a, b) => a.id - b.id);
      await writeAcademyModules(updated);
      return NextResponse.json({ success: true, module: newModule });
    }
  } catch (err) {
    console.error("POST /api/academy error:", err);
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
      return NextResponse.json({ error: "Missing module ID parameter" }, { status: 400 });
    }
    const current = await readAcademyModules();
    const updated = current.filter((m) => m.id !== Number(id));
    await writeAcademyModules(updated);
    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("DELETE /api/academy error:", err);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
