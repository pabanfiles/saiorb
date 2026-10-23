"use client";
import { useState } from "react";
import { Upload } from "lucide-react";

export default function CsvToExcelTool() {
  const [rows, setRows] = useState<string[][]>([]);

  function handleFile(f: File) {
    const reader = new FileReader();
    reader.onload = (e) => {
      const text = e.target?.result as string;
      const lines = text.split("\n").map((l) => l.split(","));
      setRows(lines);
    };
    reader.readAsText(f);
  }

  return (
    <div className="space-y-4 max-w-2xl mx-auto">
      <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed rounded-lg cursor-pointer">
        <Upload className="w-8 h-8 mb-2" />
        <p>Upload CSV File</p>
        <input type="file" accept=".csv" onChange={(e) => { const f = e.target.files?.[0]; if (f) handleFile(f); }} className="hidden" />
      </label>
      {rows.length > 0 && (
        <div className="overflow-auto">
          <table className="w-full text-sm border">
            <tbody>
              {rows.map((row, i) => (
                <tr key={i} className="border-b">
                  {row.map((cell, j) => <td key={j} className="p-2 border-r">{cell}</td>)}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}