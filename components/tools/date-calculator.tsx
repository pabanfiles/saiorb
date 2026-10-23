"use client";
import { useState } from "react";

export default function DateCalculatorTool() {
  const [d1, setD1] = useState("");
  const [d2, setD2] = useState("");
  const [diff, setDiff] = useState<number | null>(null);

  const calc = () => {
    const date1 = new Date(d1).getTime();
    const date2 = new Date(d2).getTime();
    if (isNaN(date1) || isNaN(date2)) return;
    setDiff(Math.abs((date2 - date1) / (1000 * 60 * 60 * 24)));
  };

  return (
    <div className="space-y-4 max-w-md mx-auto">
      <input type="date" value={d1} onChange={(e) => setD1(e.target.value)} className="w-full p-2 border rounded" />
      <input type="date" value={d2} onChange={(e) => setD2(e.target.value)} className="w-full p-2 border rounded" />
      <button onClick={calc} className="w-full bg-blue-600 text-white py-2 rounded">Calculate Difference</button>
      {diff !== null && <div className="p-4 bg-blue-50 text-center text-2xl font-bold text-blue-700 rounded">{diff} Days</div>}
    </div>
  );
}