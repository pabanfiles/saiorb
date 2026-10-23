"use client";
import { useState } from "react";

export default function WordCounterTool() {
  const [text, setText] = useState("");
  const words = text.trim() ? text.trim().split(/\s+/).length : 0;
  const chars = text.length;

  return (
    <div className="space-y-6 max-w-2xl mx-auto">
      <textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        className="w-full p-4 border rounded-lg h-48 dark:bg-gray-800 dark:border-gray-700"
        placeholder="Type or paste your text here..."
      />
      <div className="grid grid-cols-2 gap-4">
        <div className="p-4 bg-blue-50 dark:bg-blue-900/20 text-center rounded-lg">
          <p className="text-3xl font-bold text-blue-600">{words}</p>
          <p className="text-sm text-gray-600 dark:text-gray-400">Words</p>
        </div>
        <div className="p-4 bg-green-50 dark:bg-green-900/20 text-center rounded-lg">
          <p className="text-3xl font-bold text-green-600">{chars}</p>
          <p className="text-sm text-gray-600 dark:text-gray-400">Characters</p>
        </div>
      </div>
    </div>
  );
}