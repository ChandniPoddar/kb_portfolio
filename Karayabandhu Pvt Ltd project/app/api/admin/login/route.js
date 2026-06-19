import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { generateSessionToken } from "@/app/lib/auth";

export async function POST(req) {
  try {
    const { username, password } = await req.json();
    
    if (!username || !password) {
      return NextResponse.json({ error: "Missing username or password" }, { status: 400 });
    }
    
    const expectedUser = (process.env.ADMIN_USERNAME || process.env.NEXT_PUBLIC_ADMIN_USERNAME || "kbadmin").trim().toLowerCase();
    const expectedPass = (process.env.ADMIN_PASSWORD || process.env.NEXT_PUBLIC_ADMIN_PASSWORD || "piyush@101103").trim();
    
    if (username.trim().toLowerCase() === expectedUser && password.trim() === expectedPass) {
      const token = generateSessionToken(expectedUser, expectedPass);
      const cookieStore = await cookies();
      
      // Set the session cookie securely
      cookieStore.set("kb_admin_session", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
        path: "/",
        maxAge: 60 * 60 * 24, // 24 hours
      });
      
      return NextResponse.json({ success: true });
    } else {
      return NextResponse.json({ error: "Invalid username or password" }, { status: 401 });
    }
  } catch (err) {
    console.error("Login route error:", err);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
