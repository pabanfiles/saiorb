"use client";
import { useState } from "react";

export default function UrlShortenerTool() {
  const [url, setUrl] = useState("");
  const [short, setShort] = useState("");

  const shorten = () => {
    if (!url) return;
    const random = Math.random().toString(36).substring(2, 8);
    setShort(`https://sai.orb/${random}`);
  };

  return (
    <div className="space-y-4 max-w-md mx-auto">
      <input value={url} onChange={(e)=>setUrl(e.target.value)} placeholder="Paste long URL" className="w-full p-2 border rounded" />
      <button onClick={shorten} className="w-full bg-blue-600 text-white py-2 rounded">Shorten</button>
      {short && <div className="p-4 bg-green-50 text-green-700 rounded text-center font-mono">{short}</div>}
    </div>
  );
}