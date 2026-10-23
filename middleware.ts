// middleware.ts
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export const runtime = "experimental-edge";

export function middleware(req: NextRequest) {
  const path = req.nextUrl.pathname;

  // Protect /admin routes (except /admin/login)
  if (path.startsWith("/admin") && !path.startsWith("/admin/login")) {
    const authCookie = req.cookies.get("admin_auth")?.value;
    const expectedToken = process.env.ADMIN_PASSWORD
      ? btoa(`admin:${process.env.ADMIN_PASSWORD}`)
      : null;

    // If not logged in, redirect to custom login page
    if (!expectedToken || authCookie !== expectedToken) {
      const loginUrl = new URL("/admin/login", req.url);
      return NextResponse.redirect(loginUrl);
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*"],
};