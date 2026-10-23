"use client";
import { useState, useRef } from "react";
import { Upload, Download } from "lucide-react";

export default function ImageRoundCornersTool() {
  const [preview, setPreview] = useState<string | null>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  async function handleFile(f: File) {
    const img = new Image();
    img.src = URL.createObjectURL(f);
    await new Promise((r) => (img.onload = r));
    const canvas = canvasRef.current!;
    canvas.width = img.width;
    canvas.height = img.height;
    const ctx = canvas.getContext("2d")!;
    const radius = Math.min(img.width, img.height) / 2;
    ctx.beginPath();
    ctx.arc(img.width / 2, img.height / 2, radius, 0, Math.PI * 2);
    ctx.clip();
    ctx.drawImage(img, 0, 0);
    setPreview(canvas.toDataURL("image/png"));
  }

  return (
    <div className="space-y-6 max-w-md mx-auto">
      <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed rounded-lg cursor-pointer">
        <Upload className="w-8 h-8 mb-2" />
        <p>Upload Image</p>
        <input type="file" accept="image/*" onChange={(e) => { const f = e.target.files?.[0]; if (f) handleFile(f); }} className="hidden" />
      </label>
      <canvas ref={canvasRef} className="hidden" />
      {preview && (
        <div className="text-center space-y-2">
          <img src={preview} alt="Preview" className="mx-auto border rounded-full" />
          <a href={preview} download="circular.png" className="inline-flex items-center gap-2 bg-green-600 text-white px-4 py-2 rounded"><Download className="w-4 h-4"/> Download</a>
        </div>
      )}
    </div>
  );
}