"use client";
import { useState } from "react";

export default function WordEditorTool() {
  const [text, setText] = useState("");

  return (
    <div className="space-y-4 max-w-2xl mx-auto">
      <div className="flex gap-2 mb-2">
        <button onClick={() => document.execCommand("bold")} className="p-2 bg-gray-200 rounded font-bold">B</button>
        <button onClick={() => document.execCommand("italic")} className="p-2 bg-gray-200 rounded italic">I</button>
        <button onClick={() => document.execCommand("underline")} className="p-2 bg-gray-200 rounded underline">U</button>
      </div>
      <div contentEditable onInput={(e) => setText(e.currentTarget.innerHTML)} className="min-h-[200px] p-4 border rounded-lg dark:bg-gray-800 dark:border-gray-700 focus:outline-none" suppressContentEditableWarning />
    </div>
  );
}