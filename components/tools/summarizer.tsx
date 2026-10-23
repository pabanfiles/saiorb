"use client";
import { useState } from "react";
import { Sparkles, Loader2 } from "lucide-react";

export default function SummarizerTool() {
  const [text, setText] = useState("");
  const [summary, setSummary] = useState("");
  const [loading, setLoading] = useState(false);

  async function summarize() {
    if (!text.trim()) return;
    setLoading(true);
    try {
      const res = await fetch("/api/gemini/translate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text: `Summarize this in 3 sentences: ${text}`, targetLanguage: "en" }),
      });
      const data = await res.json();
      setSummary(data.translated || "Could not summarize.");
    } catch { setSummary("Error."); }
    finally { setLoading(false); }
  }

  return (
    <div className="space-y-6 max-w-2xl mx-auto">
      <textarea value={text} onChange={(e)=>setText(e.target.value)} rows={6} placeholder="Paste long text to summarize" className="w-full p-3 border rounded-lg dark:bg-gray-800 dark:border-gray-700" />
      <button onClick={summarize} disabled={loading || !text.trim()} className="w-full flex items-center justify-center gap-2 bg-blue-600 text-white py-2 rounded-lg">
        {loading ? <Loader2 className="animate-spin w-4 h-4" /> : <Sparkles className="w-4 h-4" />} Summarize
      </button>
      {summary && <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg whitespace-pre-wrap">{summary}</div>}
    </div>
  );
}