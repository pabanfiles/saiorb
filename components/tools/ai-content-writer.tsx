"use client";
import { useState } from "react";
import { Sparkles, Loader2, Copy } from "lucide-react";

export default function AiContentWriterTool() {
  const [prompt, setPrompt] = useState("");
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(false);
  const [copied, setCopied] = useState(false);

  async function generate() {
    if (!prompt.trim()) return;
    setLoading(true);
    setContent("");
    try {
      const res = await fetch("/api/gemini/translate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text: `Write a short article about: ${prompt}`, targetLanguage: "en" }),
      });
      const data = await res.json();
      setContent(data.translated || "No content generated.");
    } catch {
      setContent("Error generating content. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  const copy = () => {
    navigator.clipboard.writeText(content);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-6 max-w-2xl mx-auto">
      <textarea value={prompt} onChange={(e)=>setPrompt(e.target.value)} rows={3} placeholder="Enter topic or prompt (e.g. 'Write about AI in healthcare')" className="w-full p-3 border rounded-lg dark:bg-gray-800 dark:border-gray-700" />
      <button onClick={generate} disabled={loading || !prompt.trim()} className="w-full flex items-center justify-center gap-2 bg-blue-600 text-white py-2 rounded-lg disabled:opacity-50">
        {loading ? <Loader2 className="animate-spin w-4 h-4" /> : <Sparkles className="w-4 h-4" />} Generate Content
      </button>
      {content && (
        <div className="space-y-3">
          <div className="p-4 bg-gray-50 dark:bg-gray-800 rounded-lg whitespace-pre-wrap">{content}</div>
          <button onClick={copy} className="w-full bg-green-600 text-white py-2 rounded-lg flex items-center justify-center gap-2">
            <Copy className="w-4 h-4" /> {copied ? "Copied!" : "Copy to Clipboard"}
          </button>
        </div>
      )}
    </div>
  );
}