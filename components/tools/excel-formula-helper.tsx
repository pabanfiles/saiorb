"use client";
import { useState } from "react";

export default function ExcelFormulaHelperTool() {
  const [task, setTask] = useState("");
  return (
    <div className="space-y-4 max-w-md mx-auto">
      <input value={task} onChange={(e)=>setTask(e.target.value)} placeholder="e.g. Sum column A" className="w-full p-2 border rounded" />
      <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded">
        <p className="text-sm">Suggested Formula:</p>
        <p className="font-mono text-lg">{task.toLowerCase().includes("sum") ? "=SUM(A:A)" : "=IF(...)"}</p>
      </div>
    </div>
  );
}