"use client";
import { useState } from "react";

export default function HashGeneratorTool() {
  const [input, setInput] = useState("");
  const [hash, setHash] = useState("");

  const generateSHA256 = async () => {
    const msgBuffer = new TextEncoder().encode(input);
    const hashBuffer = await crypto.subtle.digest("SHA-256", msgBuffer);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    const hashHex = hashArray.map(b => b.toString(16).padStart(2, "0")).join("");
    setHash(hashHex);
  };

  return (
    <div className="space-y-4 max-w-2xl mx-auto">
      <input
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        className="w-full p-3 border rounded-lg dark:bg-gray-800 dark:border-gray-700"
        placeholder="Enter text to hash"
      />
      <button onClick={generateSHA256} className="w-full bg-blue-600 text-white py-2 rounded">Generate SHA-256</button>
      {hash && (
        <div className="p-4 bg-gray-100 dark:bg-gray-800 rounded-lg break-all font-mono text-sm">
          {hash}
        </div>
      )}
    </div>
  );
}