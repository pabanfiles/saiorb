// app/api/debug-env/route.ts
export const runtime = "edge";

export async function GET() {
  return Response.json({
    hasGemini: !!process.env.GEMINI_API_KEY,
    hasTursoUrl: !!process.env.TURSO_DATABASE_URL,
    hasTursoToken: !!process.env.TURSO_AUTH_TOKEN,
    hasAdminPass: !!process.env.ADMIN_PASSWORD,
    siteUrl: process.env.NEXT_PUBLIC_SITE_URL,
  });
}