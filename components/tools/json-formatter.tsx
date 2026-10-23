"use client";
import { useState } from "react";

export default function JsonFormatterTool() {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [error, setError] = useState("");

  const format = () => {
    try {
      const parsed = JSON.parse(input);
      setOutput(JSON.stringify(parsed, null, 2));
      setError("");
    } catch (e: any) {
      setError(e.message);
      setOutput("");
    }
  };

  return (
    <div className="space-y-4 max-w-2xl mx-auto">
      <textarea
        value={input}
        onChange={(e) => setInput(e.target.value)}
        className="w-full p-3 border rounded-lg h-32 dark:bg-gray-800 dark:border-gray-700 font-mono text-sm"
        placeholder='{"key": "value"}'
      />
      <button onClick={format} className="w-full bg-blue-600 text-white py-2 rounded">Format JSON</button>
      {error && <div className="p-3 bg-red-50 text-red-700 rounded text-sm">{error}</div>}
      {output && (
        <pre className="p-4 bg-gray-100 dark:bg-gray-800 rounded-lg overflow-auto text-sm">
          {output}
        </pre>
      )}
    </div>
  );
}