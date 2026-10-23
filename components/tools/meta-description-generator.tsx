"use client";
import { useState } from "react";

export default function MetaDescriptionGeneratorTool() {
  const [title, setTitle] = useState("");
  const [keywords, setKeywords] = useState("");
  const meta = `${title} — Learn about ${keywords}. Free online tool.`.slice(0, 155);

  return (
    <div className="space-y-4 max-w-2xl mx-auto">
      <input value={title} onChange={(e)=>setTitle(e.target.value)} placeholder="Page Title" className="w-full p-2 border rounded" />
      <input value={keywords} onChange={(e)=>setKeywords(e.target.value)} placeholder="Keywords (comma separated)" className="w-full p-2 border rounded" />
      <div className="p-4 bg-gray-100 dark:bg-gray-800 rounded">
        <p className="text-sm text-gray-500">Preview:</p>
        <p className="text-blue-700 text-lg">{title || "Page Title"}</p>
        <p className="text-sm text-gray-600 dark:text-gray-400">{meta}</p>
      </div>
    </div>
  );
}