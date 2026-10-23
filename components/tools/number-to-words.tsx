"use client";
import { useState } from "react";

export default function NumberToWordsTool() {
  const [num, setNum] = useState("");
  const [words, setWords] = useState("");

  const convert = () => {
    const n = parseInt(num);
    if (isNaN(n)) return setWords("Invalid number");
    const a = ["","one","two","three","four","five","six","seven","eight","nine","ten","eleven","twelve","thirteen","fourteen","fifteen","sixteen","seventeen","eighteen","nineteen"];
    const b = ["","","twenty","thirty","forty","fifty","sixty","seventy","eighty","ninety"];
    const inWords = (n: number): string => {
      if (n < 20) return a[n];
      if (n < 100) return b[Math.floor(n/10)] + (n%10 ? "-" + a[n%10] : "");
      if (n < 1000) return a[Math.floor(n/100)] + " hundred" + (n%100 ? " and " + inWords(n%100) : "");
      return "Number too large";
    };
    setWords(inWords(n));
  };

  return (
    <div className="space-y-4 max-w-md mx-auto">
      <input type="number" placeholder="Enter number" value={num} onChange={(e) => setNum(e.target.value)} className="w-full p-2 border rounded" />
      <button onClick={convert} className="w-full bg-blue-600 text-white py-2 rounded">Convert</button>
      {words && <div className="p-4 bg-blue-50 text-xl font-bold text-blue-700 rounded text-center capitalize">{words}</div>}
    </div>
  );
}