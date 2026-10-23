"use client";
import { useState, useRef } from "react";
import { Upload, Download, Crop } from "lucide-react";

export default function ImageCropTool() {
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
    ctx.drawImage(img, 0, 0);
    setPreview(canvas.toDataURL("image/jpeg"));
  }

  return (
    <div className="space-y-6">
      <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed rounded-lg cursor-pointer">
        <Upload className="w-8 h-8 mb-2" />
        <p>Upload Image to Crop</p>
        <input type="file" accept="image/*" onChange={(e) => { const f = e.target.files?.[0]; if (f) handleFile(f); }} className="hidden" />
      </label>
      <canvas ref={canvasRef} className="hidden" />
      {preview && (
        <div className="text-center space-y-4">
          <img src={preview} alt="Crop Preview" className="mx-auto max-h-64 border rounded" />
          <a href={preview} download="cropped.jpg" className="inline-flex items-center gap-2 bg-green-600 text-white px-4 py-2 rounded">
            <Download className="w-4 h-4" /> Download
          </a>
        </div>
      )}
    </div>
  );
}