"use client";
import { useState } from "react";

export default function RandomNamePickerTool() {
  const [names, setNames] = useState("");
  const [winner, setWinner] = useState("");

  const pick = () => {
    const list = names.split("\n").filter(n => n.trim());
    if (list.length) setWinner(list[Math.floor(Math.random() * list.length)]);
  };

  return (
    <div className="space-y-4 max-w-md mx-auto">
      <textarea value={names} onChange={(e)=>setNames(e.target.value)} rows={6} placeholder="Enter names (one per line)" className="w-full p-2 border rounded" />
      <button onClick={pick} className="w-full bg-blue-600 text-white py-2 rounded">Pick Random Winner</button>
      {winner && <div className="p-6 bg-yellow-50 dark:bg-yellow-900/20 text-yellow-700 text-center rounded-lg text-2xl font-bold">🏆 {winner}</div>}
    </div>
  );
}