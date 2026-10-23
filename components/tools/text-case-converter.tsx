"use client";
import { useState } from "react";

export default function TextCaseConverterTool() {
  const [text, setText] = useState("");

  return (
    <div className="space-y-4 max-w-2xl mx-auto">
      <textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        className="w-full p-3 border rounded-lg h-32 dark:bg-gray-800 dark:border-gray-700"
        placeholder="Type text here..."
      />
      <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
        <button onClick={() => setText(text.toUpperCase())} className="bg-blue-600 text-white py-2 rounded">UPPERCASE</button>
        <button onClick={() => setText(text.toLowerCase())} className="bg-blue-600 text-white py-2 rounded">lowercase</button>
        <button onClick={() => setText(text.replace(/\b\w/g, c => c.toUpperCase()))} className="bg-blue-600 text-white py-2 rounded">Title Case</button>
        <button onClick={() => setText(text.split("").reverse().join(""))} className="bg-blue-600 text-white py-2 rounded">Reverse</button>
      </div>
    </div>
  );
}