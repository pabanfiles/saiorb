// app/api/analytics/route.ts
export const runtime = "edge";

import { db } from "@/lib/db";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { slug } = body;

    if (!slug || typeof slug !== "string") {
      return Response.json({ error: "Invalid slug" }, { status: 400 });
    }

    const today = new Date().toISOString().slice(0, 10);

    await db.execute({
      sql: `
        INSERT INTO tool_hits (slug, hits, last_used_at)
        VALUES (?, 1, unixepoch())
        ON CONFLICT(slug) DO UPDATE SET
          hits = hits + 1,
          last_used_at = unixepoch()
      `,
      args: [slug],
    });

    await db.execute({
      sql: `
        INSERT INTO daily_usage (date, slug, count)
        VALUES (?, ?, 1)
        ON CONFLICT(date, slug) DO UPDATE SET count = count + 1
      `,
      args: [today, slug],
    });

    return Response.json({ ok: true });
  } catch (err) {
    console.error("Analytics error:", err);
    return Response.json({ error: "Failed" }, { status: 500 });
  }
}