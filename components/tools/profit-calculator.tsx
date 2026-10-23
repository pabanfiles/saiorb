"use client";
import { useState } from "react";

export default function ProfitCalculatorTool() {
  const [revenue, setRevenue] = useState("");
  const [cost, setCost] = useState("");
  const profit = (parseFloat(revenue) || 0) - (parseFloat(cost) || 0);
  const margin = revenue ? (profit / parseFloat(revenue)) * 100 : 0;

  return (
    <div className="space-y-4 max-w-md mx-auto">
      <input type="number" value={revenue} onChange={(e)=>setRevenue(e.target.value)} placeholder="Total Revenue (₹)" className="w-full p-2 border rounded" />
      <input type="number" value={cost} onChange={(e)=>setCost(e.target.value)} placeholder="Total Cost (₹)" className="w-full p-2 border rounded" />
      <div className="p-4 bg-green-50 dark:bg-green-900/20 rounded-lg text-center">
        <p className="text-lg font-bold">Profit: ₹{profit.toFixed(2)}</p>
        <p className="text-sm">Margin: {margin.toFixed(2)}%</p>
      </div>
    </div>
  );
}