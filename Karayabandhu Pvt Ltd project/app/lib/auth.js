import { cookies } from "next/headers";
import crypto from "crypto";

const SECRET_KEY = process.env.ADMIN_SECRET || "kb-super-secret-key-101103";

export function generateSessionToken(username, password) {
  return crypto
    .createHmac("sha256", SECRET_KEY)
    .update(`${username.toLowerCase()}:${password}`)
    .digest("hex");
}

export async function verifyAdminAuth() {
  try {
    const cookieStore = await cookies();
    const sessionCookie = cookieStore.get("kb_admin_session");
    
    if (!sessionCookie) return false;
    
    const expectedUser = (process.env.ADMIN_USERNAME || process.env.NEXT_PUBLIC_ADMIN_USERNAME || "kbadmin").trim().toLowerCase();
    const expectedPass = (process.env.ADMIN_PASSWORD || process.env.NEXT_PUBLIC_ADMIN_PASSWORD || "piyush@101103").trim();
    
    const expectedToken = generateSessionToken(expectedUser, expectedPass);
    
    return sessionCookie.value === expectedToken;
  } catch (err) {
    console.error("Auth verification failed:", err);
    return false;
  }
}
