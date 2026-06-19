import { NextResponse } from "next/server";

// ─── Launch date: June 19, 2026 at 12:36:30 PM IST ───────────────────────────
const LAUNCH_DATE = new Date("2026-06-19T12:36:30+05:30");

export function proxy(request) {
  const now = new Date();
  const { pathname } = request.nextUrl;

  // Allow the coming-soon page through — avoids redirect loop
  if (pathname === "/coming-soon") {
    return NextResponse.next();
  }

  // Before launch: redirect everything to coming-soon
  if (now < LAUNCH_DATE) {
    return NextResponse.redirect(new URL("/coming-soon", request.url));
  }

  // After launch: let all requests through
  return NextResponse.next();
}

export const config = {
  // Applies to all routes EXCEPT api, _next internals, and favicon
  matcher: ["/((?!api|_next|favicon.ico).*)"],
};
