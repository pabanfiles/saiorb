"use client";
import { useState } from "react";
import { Loader2, CheckSquare } from "lucide-react";

export default function GrammarCheckerTool() {
  const [text, setText] = useState("");
  const [result, setResult] = useState("");
  const [loading, setLoading] = useState(false);

  async function check() {
    if (!text.trim()) return;
    setLoading(true);
    try {
      const res = await fetch("/api/gemini/translate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text: `Fix grammar: "${text}"`, targetLanguage: "en" }),
      });
      const data = await res.json();
      setResult(data.translated || "No suggestions.");
    } catch { setResult("Error."); }
    finally { setLoading(false); }
  }

  return (
    <div className="space-y-6 max-w-2xl mx-auto">
      <textarea value={text} onChange={(e)=>setText(e.target.value)} rows={5} placeholder="Paste text to check grammar" className="w-full p-3 border rounded-lg dark:bg-gray-800 dark:border-gray-700" />
      <button onClick={check} disabled={loading || !text.trim()} className="w-full flex items-center justify-center gap-2 bg-blue-600 text-white py-2 rounded-lg">
        {loading ? <Loader2 className="animate-spin w-4 h-4" /> : <CheckSquare className="w-4 h-4" />} Check Grammar
      </button>
      {result && <div className="p-4 bg-green-50 dark:bg-green-900/20 rounded-lg whitespace-pre-wrap">{result}</div>}
    </div>
  );
}