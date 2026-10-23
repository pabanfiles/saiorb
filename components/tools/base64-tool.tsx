"use client";
import { useState } from "react";

export default function Base64Tool() {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");

  return (
    <div className="space-y-4 max-w-2xl mx-auto">
      <textarea
        value={input}
        onChange={(e) => setInput(e.target.value)}
        className="w-full p-3 border rounded-lg h-32 dark:bg-gray-800 dark:border-gray-700"
        placeholder="Enter text..."
      />
      <div className="flex gap-2">
        <button onClick={() => setOutput(btoa(input))} className="flex-1 bg-blue-600 text-white py-2 rounded">Encode</button>
        <button onClick={() => { try { setOutput(atob(input)); } catch { setOutput("Invalid Base64"); } }} className="flex-1 bg-green-600 text-white py-2 rounded">Decode</button>
      </div>
      {output && (
        <div className="p-4 bg-gray-100 dark:bg-gray-800 rounded-lg break-all font-mono text-sm">
          {output}
        </div>
      )}
    </div>
  );
}