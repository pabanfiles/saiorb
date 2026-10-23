"use client";
import { useState } from "react";

export default function BreakEvenCalculatorTool() {
  const [fixed, setFixed] = useState("");
  const [price, setPrice] = useState("");
  const [variable, setVariable] = useState("");
  const breakEven = price && variable ? (parseFloat(fixed) / (parseFloat(price) - parseFloat(variable))) : 0;

  return (
    <div className="space-y-4 max-w-md mx-auto">
      <input type="number" value={fixed} onChange={(e)=>setFixed(e.target.value)} placeholder="Fixed Costs (₹)" className="w-full p-2 border rounded" />
      <input type="number" value={price} onChange={(e)=>setPrice(e.target.value)} placeholder="Price per Unit (₹)" className="w-full p-2 border rounded" />
      <input type="number" value={variable} onChange={(e)=>setVariable(e.target.value)} placeholder="Variable Cost per Unit (₹)" className="w-full p-2 border rounded" />
      <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg text-center">
        <p className="text-lg font-bold">Break-Even Units: {isFinite(breakEven) ? breakEven.toFixed(0) : "N/A"}</p>
      </div>
    </div>
  );
}