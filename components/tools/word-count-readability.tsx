"use client";
import { useState } from "react";

export default function WordCountReadabilityTool() {
  const [text, setText] = useState("");
  const words = text.trim() ? text.trim().split(/\s+/).length : 0;
  const readingMinutes = Math.ceil(words / 200);

  return (
    <div className="space-y-4 max-w-2xl mx-auto">
      <textarea value={text} onChange={(e)=>setText(e.target.value)} className="w-full p-3 border rounded-lg h-48 dark:bg-gray-800 dark:border-gray-700" placeholder="Paste your text..." />
      <div className="grid grid-cols-3 gap-2 text-center">
        <div className="p-3 bg-blue-50 rounded-lg">
          <p className="text-2xl font-bold">{words}</p>
          <p className="text-xs">Words</p>
        </div>
        <div className="p-3 bg-green-50 rounded-lg">
          <p className="text-2xl font-bold">{text.length}</p>
          <p className="text-xs">Characters</p>
        </div>
        <div className="p-3 bg-purple-50 rounded-lg">
          <p className="text-2xl font-bold">{readingMinutes}m</p>
          <p className="text-xs">Read Time</p>
        </div>
      </div>
    </div>
  );
}