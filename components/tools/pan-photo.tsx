"use client";
import { useState, useRef } from "react";
import { Upload, Download } from "lucide-react";

export default function PanPhotoTool() {
  const [preview, setPreview] = useState<string | null>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  async function processImage(f: File) {
    const img = new Image();
    img.src = URL.createObjectURL(f);
    await new Promise((r) => (img.onload = r));
    const canvas = canvasRef.current!;
    canvas.width = 213; canvas.height = 213;
    const ctx = canvas.getContext("2d")!;
    ctx.drawImage(img, 0, 0, 213, 213);
    setPreview(canvas.toDataURL("image/jpeg", 0.8));
  }

  return (
    <div className="space-y-6">
      <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed rounded-lg cursor-pointer">
        <Upload className="w-8 h-8 mb-2 text-gray-500" />
        <p className="text-sm text-gray-500">Upload Photo for PAN Card</p>
        <input type="file" accept="image/*" onChange={(e) => { const f = e.target.files?.[0]; if (f) processImage(f); }} className="hidden" />
      </label>
      <canvas ref={canvasRef} className="hidden" />
      {preview && (
        <div className="text-center space-y-4">
          <img src={preview} alt="PAN" className="mx-auto border rounded-lg" />
          <a href={preview} download="pan-photo.jpg" className="inline-flex items-center gap-2 bg-green-600 text-white px-4 py-2 rounded-lg">
            <Download className="w-4 h-4" /> Download (213x213)
          </a>
        </div>
      )}
    </div>
  );
}