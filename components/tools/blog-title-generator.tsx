"use client";
import { useState } from "react";

export default function BlogTitleGeneratorTool() {
  const [topic, setTopic] = useState("");
  const templates = [
    `The Ultimate Guide to ${topic}`,
    `10 Things You Didn't Know About ${topic}`,
    `How to Master ${topic} in 2026`,
    `${topic}: A Complete Beginner's Guide`,
    `Why ${topic} Matters More Than You Think`,
  ];

  return (
    <div className="space-y-4 max-w-2xl mx-auto">
      <input value={topic} onChange={(e)=>setTopic(e.target.value)} placeholder="Enter topic" className="w-full p-2 border rounded" />
      <ul className="space-y-2">
        {topic && templates.map((t, i) => <li key={i} className="p-3 bg-gray-100 dark:bg-gray-800 rounded">{t}</li>)}
      </ul>
    </div>
  );
}