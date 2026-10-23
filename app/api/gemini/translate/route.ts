// app/api/gemini/translate/route.ts
export const runtime = "edge";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { text, targetLanguage = "en" } = body;

    if (!text || typeof text !== "string") {
      return Response.json({ error: "Text required" }, { status: 400 });
    }

    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      return Response.json(
        { error: "GEMINI_API_KEY not configured" },
        { status: 500 }
      );
    }

    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          contents: [
            {
              parts: [
                {
                  text: `Translate the following text to ${targetLanguage}. Return only the translation:\n\n${text}`,
                },
              ],
            },
          ],
        }),
      }
    );

    if (!response.ok) {
      const errText = await response.text();
      console.error("Gemini API error:", errText);
      return Response.json({ error: "Gemini failed" }, { status: 500 });
    }

    const data = await response.json();
    const translated =
      data.candidates?.[0]?.content?.parts?.[0]?.text ?? "";

    return Response.json({ translated });
  } catch (err) {
    console.error("Translate error:", err);
    return Response.json({ error: "Failed" }, { status: 500 });
  }
}