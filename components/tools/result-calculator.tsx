"use client";
import { useState } from "react";

export default function ResultCalculatorTool() {
  const [marks, setMarks] = useState<string[]>(Array(5).fill(""));
  const total = marks.reduce((sum, m) => sum + (parseFloat(m) || 0), 0);
  const percentage = marks.length ? (total / (marks.length * 100)) * 100 : 0;

  return (
    <div className="space-y-4 max-w-md mx-auto">
      {marks.map((m, i) => (
        <input key={i} type="number" value={m} onChange={(e) => {
          const newMarks = [...marks];
          newMarks[i] = e.target.value;
          setMarks(newMarks);
        }} className="w-full p-2 border rounded-lg dark:bg-gray-800 dark:border-gray-700" placeholder={`Subject ${i+1} (out of 100)`} />
      ))}
      <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg text-center">
        <p className="text-lg font-bold">Total: {total} / {marks.length*100}</p>
        <p className="text-lg font-bold text-blue-600">Percentage: {percentage.toFixed(2)}%</p>
      </div>
    </div>
  );
}