"use client";
import { useState } from "react";

export default function PlagiarismCheckerTool() {
  const [text, setText] = useState("");
  return (
    <div className="space-y-4 max-w-2xl mx-auto">
      <div className="p-4 bg-yellow-50 dark:bg-yellow-900/20 text-yellow-700 rounded-lg">
        <p>Plagiarism checker requires web scraping API. Currently in demo mode.</p>
      </div>
      <textarea value={text} onChange={(e)=>setText(e.target.value)} rows={6} placeholder="Paste text" className="w-full p-3 border rounded-lg dark:bg-gray-800 dark:border-gray-700" />
      <button className="w-full bg-blue-600 text-white py-2 rounded-lg">Check Plagiarism (Demo)</button>
    </div>
  );
}