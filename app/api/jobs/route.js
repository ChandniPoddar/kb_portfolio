import { NextResponse } from "next/server";
import { readJobs, writeJobs } from "@/app/lib/db";
import { verifyAdminAuth } from "@/app/lib/auth";

export const runtime = "nodejs";

export async function GET() {
  try {
    const jobs = await readJobs();
    return NextResponse.json(jobs);
  } catch (err) {
    return NextResponse.json({ error: "Failed to fetch active vacancies" }, { status: 500 });
  }
}

export async function POST(req) {
  try {
    if (!(await verifyAdminAuth())) {
      return NextResponse.json({ error: "Unauthorized access" }, { status: 401 });
    }
    const newJob = await req.json();
    if (!newJob.id || !newJob.title || !newJob.department) {
      return NextResponse.json({ error: "Invalid job vacancy payload" }, { status: 400 });
    }
    const jobs = await readJobs();
    const updated = [...jobs, newJob];
    await writeJobs(updated);
    return NextResponse.json({ success: true, job: newJob });
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
      return NextResponse.json({ error: "Missing job ID parameter" }, { status: 400 });
    }
    const jobs = await readJobs();
    const updated = jobs.filter((j) => j.id !== id);
    await writeJobs(updated);
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
    const updatedJob = await req.json();
    if (!updatedJob.id || !updatedJob.title || !updatedJob.department) {
      return NextResponse.json({ error: "Invalid job vacancy payload" }, { status: 400 });
    }
    const jobs = await readJobs();
    const updated = jobs.map((j) => (j.id === updatedJob.id ? updatedJob : j));
    await writeJobs(updated);
    return NextResponse.json({ success: true, job: updatedJob });
  } catch (err) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
