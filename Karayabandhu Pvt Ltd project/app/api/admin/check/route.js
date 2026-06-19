import { NextResponse } from "next/server";
import { verifyAdminAuth } from "@/app/lib/auth";

export async function GET() {
  try {
    const isAuthenticated = await verifyAdminAuth();
    return NextResponse.json({ authenticated: isAuthenticated });
  } catch (err) {
    console.error("Check auth route error:", err);
    return NextResponse.json({ authenticated: false });
  }
}
