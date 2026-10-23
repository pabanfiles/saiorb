"use client";
import { useState, useRef } from "react";
import { Upload, Download } from "lucide-react";

export default function ImageMergeTool() {
  const [preview, setPreview] = useState<string | null>(null);
  const [files, setFiles] = useState<File[]>([]);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  async function merge() {
    if (files.length < 2) return;
    const images = await Promise.all(files.map(async (f) => {
      const img = new Image();
      img.src = URL.createObjectURL(f);
      await new Promise((r) => (img.onload = r));
      return img;
    }));
    const totalWidth = images.reduce((s, img) => s + img.width, 0);
    const maxHeight = Math.max(...images.map(i => i.height));
    const canvas = canvasRef.current!;
    canvas.width = totalWidth;
    canvas.height = maxHeight;
    const ctx = canvas.getContext("2d")!;
    let x = 0;
    images.forEach((img) => {
      ctx.drawImage(img, x, 0);
      x += img.width;
    });
    setPreview(canvas.toDataURL());
  }

  return (
    <div className="space-y-6 max-w-md mx-auto">
      <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed rounded-lg cursor-pointer">
        <Upload className="w-8 h-8 mb-2" />
        <p>Select 2+ Images</p>
        <input type="file" multiple accept="image/*" onChange={(e) => setFiles(Array.from(e.target.files || []))} className="hidden" />
      </label>
      <canvas ref={canvasRef} className="hidden" />
      <button onClick={merge} disabled={files.length < 2} className="w-full bg-blue-600 text-white py-2 rounded">Merge Images</button>
      {preview && (
        <div className="text-center space-y-2">
          <img src={preview} alt="Merged" className="mx-auto border rounded" />
          <a href={preview} download="merged.png" className="inline-flex items-center gap-2 bg-green-600 text-white px-4 py-2 rounded"><Download className="w-4 h-4"/> Download</a>
        </div>
      )}
    </div>
  );
}