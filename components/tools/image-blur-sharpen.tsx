"use client";
import { useState, useRef } from "react";
import { Upload, Download } from "lucide-react";

export default function ImageBlurSharpenTool() {
  const [preview, setPreview] = useState<string | null>(null);
  const [blur, setBlur] = useState(0);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const imgRef = useRef<HTMLImageElement | null>(null);

  async function handleFile(f: File) {
    const img = new Image();
    img.src = URL.createObjectURL(f);
    await new Promise((r) => (img.onload = r));
    imgRef.current = img;
    applyBlur(0);
  }

  function applyBlur(value: number) {
    const canvas = canvasRef.current;
    const img = imgRef.current;
    if (!canvas || !img) return;
    canvas.width = img.width;
    canvas.height = img.height;
    const ctx = canvas.getContext("2d")!;
    ctx.filter = `blur(${value}px)`;
    ctx.drawImage(img, 0, 0);
    setPreview(canvas.toDataURL());
  }

  return (
    <div className="space-y-6 max-w-md mx-auto">
      <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed rounded-lg cursor-pointer">
        <Upload className="w-8 h-8 mb-2" />
        <p>Upload Image</p>
        <input type="file" accept="image/*" onChange={(e) => { const f = e.target.files?.[0]; if (f) handleFile(f); }} className="hidden" />
      </label>
      <canvas ref={canvasRef} className="hidden" />
      <input type="range" min="0" max="20" value={blur} onChange={(e) => { setBlur(+e.target.value); applyBlur(+e.target.value); }} className="w-full" />
      {preview && (
        <div className="text-center space-y-2">
          <img src={preview} alt="Preview" className="mx-auto border rounded" />
          <a href={preview} download="blurred.png" className="inline-flex items-center gap-2 bg-green-600 text-white px-4 py-2 rounded"><Download className="w-4 h-4"/> Download</a>
        </div>
      )}
    </div>
  );
}