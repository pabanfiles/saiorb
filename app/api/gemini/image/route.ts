// app/api/gemini/image/route.ts
export const runtime = "edge";

export async function POST(req: Request) {
  try {
    const { prompt } = await req.json();

    if (!prompt || typeof prompt !== "string") {
      return Response.json({ error: "Prompt required" }, { status: 400 });
    }

    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      return Response.json(
        { error: "GEMINI_API_KEY not configured" },
        { status: 500 }
      );
    }

    // Use Gemini 2.5 Flash Image (Imagen) model
    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-image-preview:generateContent?key=${apiKey}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          contents: [
            {
              parts: [{ text: prompt }],
            },
          ],
          generationConfig: {
            responseModalities: ["TEXT", "IMAGE"],
          },
        }),
      }
    );

    if (!response.ok) {
      const err = await response.text();
      console.error("Gemini image error:", err);
      return Response.json(
        { error: "Gemini image generation failed" },
        { status: 500 }
      );
    }

    const data = await response.json();

    // Extract image data
    const candidates = data.candidates ?? [];
    let imageBase64 = null;

    for (const cand of candidates) {
      const parts = cand.content?.parts ?? [];
      for (const part of parts) {
        if (part.inlineData?.data) {
          imageBase64 = part.inlineData.data;
          break;
        }
      }
      if (imageBase64) break;
    }

    if (!imageBase64) {
      return Response.json(
        { error: "No image generated. Try different prompt." },
        { status: 500 }
      );
    }

    return Response.json({
      imageUrl: `data:image/png;base64,${imageBase64}`,
    });
  } catch (err) {
    console.error("Image generation error:", err);
    return Response.json(
      { error: "Something went wrong" },
      { status: 500 }
    );
  }
}