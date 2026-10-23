// middleware.ts
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export const runtime = "edge";

export function middleware(req: NextRequest) {
  const path = req.nextUrl.pathname;

  if (path.startsWith("/admin")) {
    const password = process.env.ADMIN_PASSWORD;

    // Debug log (remove after fix)
    console.log("ADMIN_PASSWORD exists:", !!password);

    if (!password) {
      return new NextResponse(
        "Admin not configured. Set ADMIN_PASSWORD environment variable.",
        { status: 503 }
      );
    }

    const auth = req.headers.get("authorization");
    const expected = `Basic ${btoa(`admin:${password}`)}`;

    if (auth !== expected) {
      return new NextResponse("Unauthorized", {
        status: 401,
        headers: { "WWW-Authenticate": 'Basic realm="SaiOrb Admin"' },
      });
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: "/admin/:path*",
};