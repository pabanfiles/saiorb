// components/tools/ai-image-generator.tsx
"use client";

import { useState } from "react";
import { Sparkles, Loader2, Download, AlertCircle } from "lucide-react";

export default function AIImageGeneratorTool() {
  const [prompt, setPrompt] = useState("");
  const [loading, setLoading] = useState(false);
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  async function generate() {
    if (!prompt.trim()) return;
    setLoading(true);
    setError(null);
    setImageUrl(null);

    try {
      const res = await fetch("/api/gemini/image", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error || "Failed to generate image");
        return;
      }

      setImageUrl(data.imageUrl);
    } catch (err) {
      setError("Network error. Try again.");
    } finally {
      setLoading(false);
    }
  }

  function download() {
    if (!imageUrl) return;
    const a = document.createElement("a");
    a.href = imageUrl;
    a.download = `saiorb-ai-${Date.now()}.png`;
    a.click();
  }

  return (
    <div className="space-y-6">
      <div>
        <label className="block text-sm font-medium mb-2">
          Describe your image
        </label>
        <textarea
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          placeholder="A futuristic city with flying cars at sunset, cinematic lighting, 4k"
          className="w-full p-3 border rounded-lg dark:bg-gray-800 dark:border-gray-700 focus:ring-2 focus:ring-blue-500 outline-none"
          rows={3}
          disabled={loading}
        />
        <p className="text-xs text-gray-500 mt-1">
          Powered by Gemini AI • Free tier limits apply
        </p>
      </div>

      <button
        onClick={generate}
        disabled={loading || !prompt.trim()}
        className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg disabled:opacity-50 transition"
      >
        {loading ? (
          <>
            <Loader2 className="animate-spin w-4 h-4" /> Generating (10-20s)...
          </>
        ) : (
          <>
            <Sparkles className="w-4 h-4" /> Generate Image
          </>
        )}
      </button>

      {error && (
        <div className="flex items-center gap-2 p-4 bg-red-50 dark:bg-red-900/20 text-red-700 dark:text-red-400 rounded-lg">
          <AlertCircle className="w-5 h-5 shrink-0" />
          <span>{error}</span>
        </div>
      )}

      {imageUrl && (
        <div className="space-y-3">
          <img
            src={imageUrl}
            alt={prompt}
            className="w-full rounded-lg border shadow-lg"
          />
          <button
            onClick={download}
            className="inline-flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg transition"
          >
            <Download className="w-4 h-4" /> Download PNG
          </button>
        </div>
      )}
    </div>
  );
}