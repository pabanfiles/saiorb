"use client";
import { useState } from "react";
import { Loader2, Repeat2 } from "lucide-react";

export default function ContentRewriterTool() {
  const [text, setText] = useState("");
  const [result, setResult] = useState("");
  const [loading, setLoading] = useState(false);

  async function rewrite() {
    if (!text.trim()) return;
    setLoading(true);
    try {
      const res = await fetch("/api/gemini/translate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text: `Rewrite this in different words: "${text}"`, targetLanguage: "en" }),
      });
      const data = await res.json();
      setResult(data.translated || "Could not rewrite.");
    } catch { setResult("Error."); }
    finally { setLoading(false); }
  }

  return (
    <div className="space-y-6 max-w-2xl mx-auto">
      <textarea value={text} onChange={(e)=>setText(e.target.value)} rows={4} placeholder="Paste text to rewrite" className="w-full p-3 border rounded-lg dark:bg-gray-800 dark:border-gray-700" />
      <button onClick={rewrite} disabled={loading || !text.trim()} className="w-full flex items-center justify-center gap-2 bg-blue-600 text-white py-2 rounded-lg">
        {loading ? <Loader2 className="animate-spin w-4 h-4" /> : <Repeat2 className="w-4 h-4" />} Rewrite
      </button>
      {result && <div className="p-4 bg-purple-50 dark:bg-purple-900/20 rounded-lg whitespace-pre-wrap">{result}</div>}
    </div>
  );
}