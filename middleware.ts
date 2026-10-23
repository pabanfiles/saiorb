// middleware.ts
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(req: NextRequest) {
  if (req.nextUrl.pathname.startsWith("/admin")) {
    const password = process.env.ADMIN_PASSWORD;

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