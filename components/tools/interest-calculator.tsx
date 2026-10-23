"use client";
import { useState } from "react";

export default function InterestCalculatorTool() {
  const [principal, setPrincipal] = useState("");
  const [rate, setRate] = useState("");
  const [years, setYears] = useState("");
  const p = parseFloat(principal) || 0;
  const r = parseFloat(rate) || 0;
  const t = parseFloat(years) || 0;
  const simple = (p * r * t) / 100;
  const compound = p * Math.pow(1 + r/100, t) - p;

  return (
    <div className="space-y-4 max-w-md mx-auto">
      <input type="number" value={principal} onChange={(e)=>setPrincipal(e.target.value)} placeholder="Principal (₹)" className="w-full p-2 border rounded" />
      <input type="number" value={rate} onChange={(e)=>setRate(e.target.value)} placeholder="Rate (% p.a.)" className="w-full p-2 border rounded" />
      <input type="number" value={years} onChange={(e)=>setYears(e.target.value)} placeholder="Time (Years)" className="w-full p-2 border rounded" />
      <div className="grid grid-cols-2 gap-4">
        <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg text-center">
          <p className="text-sm">Simple Interest</p>
          <p className="text-xl font-bold">₹{simple.toFixed(2)}</p>
        </div>
        <div className="p-4 bg-green-50 dark:bg-green-900/20 rounded-lg text-center">
          <p className="text-sm">Compound Interest</p>
          <p className="text-xl font-bold">₹{compound.toFixed(2)}</p>
        </div>
      </div>
    </div>
  );
}