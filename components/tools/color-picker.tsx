"use client";
import { useState } from "react";

export default function ColorPickerTool() {
  const [color, setColor] = useState("#3b82f6");

  return (
    <div className="space-y-4 max-w-md mx-auto">
      <input type="color" value={color} onChange={(e)=>setColor(e.target.value)} className="w-full h-32 rounded-lg cursor-pointer" />
      <div className="grid grid-cols-3 gap-2 text-center">
        <div className="p-3 bg-gray-100 dark:bg-gray-800 rounded">
          <p className="text-xs text-gray-500">HEX</p>
          <p className="font-mono text-sm">{color.toUpperCase()}</p>
        </div>
        <div className="p-3 bg-gray-100 dark:bg-gray-800 rounded">
          <p className="text-xs text-gray-500">RGB</p>
          <p className="font-mono text-xs">{parseInt(color.slice(1,3),16)}, {parseInt(color.slice(3,5),16)}, {parseInt(color.slice(5,7),16)}</p>
        </div>
        <div className="p-3 rounded" style={{ backgroundColor: color }}>
          <p className="text-xs text-white mix-blend-difference">Preview</p>
        </div>
      </div>
    </div>
  );
}