"use client";
import { useState } from "react";

export default function UnitConverterTool() {
  const [val, setVal] = useState("");
  const [from, setFrom] = useState("m");
  const [to, setTo] = useState("km");
  const [result, setResult] = useState<number | null>(null);

  const convert = () => {
    const v = parseFloat(val);
    if (from === "m" && to === "km") setResult(v / 1000);
    else if (from === "km" && to === "m") setResult(v * 1000);
    else if (from === "kg" && to === "g") setResult(v * 1000);
    else if (from === "g" && to === "kg") setResult(v / 1000);
    else setResult(v);
  };

  return (
    <div className="space-y-4 max-w-md mx-auto">
      <input type="number" placeholder="Value" value={val} onChange={(e) => setVal(e.target.value)} className="w-full p-2 border rounded" />
      <div className="flex gap-2 justify-between">
        <select value={from} onChange={(e)=>setFrom(e.target.value)} className="p-2 border rounded w-1/2">
          <option value="m">Meters</option><option value="km">Kilometers</option><option value="kg">Kilograms</option><option value="g">Grams</option>
        </select>
        <span className="self-center">to</span>
        <select value={to} onChange={(e)=>setTo(e.target.value)} className="p-2 border rounded w-1/2">
          <option value="m">Meters</option><option value="km">Kilometers</option><option value="kg">Kilograms</option><option value="g">Grams</option>
        </select>
      </div>
      <button onClick={convert} className="w-full bg-blue-600 text-white py-2 rounded">Convert</button>
      {result !== null && <div className="p-4 bg-green-50 text-xl text-center font-bold text-green-700 rounded">{result}</div>}
    </div>
  );
}