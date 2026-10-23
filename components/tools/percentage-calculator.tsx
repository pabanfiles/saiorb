"use client";
import { useState } from "react";

export default function PercentageCalculatorTool() {
  const [val1, setVal1] = useState("");
  const [val2, setVal2] = useState("");
  const [result, setResult] = useState<number | null>(null);

  return (
    <div className="space-y-4 max-w-md mx-auto">
      <div className="flex gap-2 items-center">
        <input type="number" placeholder="Value" value={val1} onChange={(e) => setVal1(e.target.value)} className="w-full p-2 border rounded" />
        <span>% of</span>
        <input type="number" placeholder="Total" value={val2} onChange={(e) => setVal2(e.target.value)} className="w-full p-2 border rounded" />
      </div>
      <button onClick={() => setResult((parseFloat(val1) / 100) * parseFloat(val2))} className="w-full bg-blue-600 text-white py-2 rounded">Calculate</button>
      {result !== null && !isNaN(result) && <div className="p-4 bg-green-50 text-center text-2xl font-bold text-green-700 rounded">Result: {result}</div>}
    </div>
  );
}