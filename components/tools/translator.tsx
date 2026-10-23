"use client";
import { useState } from "react";
import { Languages, Loader2, Copy } from "lucide-react";

export default function TranslatorTool() {
  const [text, setText] = useState("");
  const [translated, setTranslated] = useState("");
  const [lang, setLang] = useState("bn");
  const [loading, setLoading] = useState(false);

  async function translate() {
    if (!text.trim()) return;
    setLoading(true);
    try {
      const res = await fetch("/api/gemini/translate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text, targetLanguage: lang }),
      });
      const data = await res.json();
      setTranslated(data.translated || "Translation failed.");
    } catch { setTranslated("Error translating."); }
    finally { setLoading(false); }
  }

  return (
    <div className="space-y-6 max-w-2xl mx-auto">
      <textarea value={text} onChange={(e)=>setText(e.target.value)} rows={4} placeholder="Enter text to translate" className="w-full p-3 border rounded-lg dark:bg-gray-800 dark:border-gray-700" />
      <div className="flex gap-2">
        <select value={lang} onChange={(e)=>setLang(e.target.value)} className="flex-1 p-2 border rounded-lg">
          <option value="bn">Bengali</option>
          <option value="hi">Hindi</option>
          <option value="en">English</option>
          <option value="ur">Urdu</option>
        </select>
        <button onClick={translate} disabled={loading || !text.trim()} className="flex-1 flex items-center justify-center gap-2 bg-blue-600 text-white px-4 rounded-lg">
          {loading ? <Loader2 className="animate-spin w-4 h-4" /> : <Languages className="w-4 h-4" />} Translate
        </button>
      </div>
      {translated && (
        <div className="p-4 bg-green-50 dark:bg-green-900/20 rounded-lg whitespace-pre-wrap">
          <p className="text-sm text-gray-500 mb-1">Translated:</p>
          {translated}
        </div>
      )}
    </div>
  );
}