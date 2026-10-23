"use client";
import { useState, useRef } from "react";
import { Upload, Download } from "lucide-react";

export default function MemeGeneratorTool() {
  const [topText, setTopText] = useState("");
  const [bottomText, setBottomText] = useState("");
  const [preview, setPreview] = useState<string | null>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const imgRef = useRef<HTMLImageElement | null>(null);

  async function handleFile(f: File) {
    const img = new Image();
    img.src = URL.createObjectURL(f);
    await new Promise((r) => (img.onload = r));
    imgRef.current = img;
    draw();
  }

  function draw() {
    const img = imgRef.current;
    const canvas = canvasRef.current;
    if (!img || !canvas) return;
    canvas.width = img.width;
    canvas.height = img.height;
    const ctx = canvas.getContext("2d")!;
    ctx.drawImage(img, 0, 0);
    ctx.font = "bold 40px Impact, sans-serif";
    ctx.fillStyle = "white";
    ctx.strokeStyle = "black";
    ctx.lineWidth = 3;
    ctx.textAlign = "center";
    if (topText) {
      ctx.strokeText(topText.toUpperCase(), canvas.width / 2, 60);
      ctx.fillText(topText.toUpperCase(), canvas.width / 2, 60);
    }
    if (bottomText) {
      ctx.strokeText(bottomText.toUpperCase(), canvas.width / 2, canvas.height - 20);
      ctx.fillText(bottomText.toUpperCase(), canvas.width / 2, canvas.height - 20);
    }
    setPreview(canvas.toDataURL());
  }

  return (
    <div className="space-y-6 max-w-md mx-auto">
      <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed rounded-lg cursor-pointer">
        <Upload className="w-8 h-8 mb-2" />
        <p>Upload Image</p>
        <input type="file" accept="image/*" onChange={(e) => { const f = e.target.files?.[0]; if (f) handleFile(f); }} className="hidden" />
      </label>
      <input value={topText} onChange={(e) => setTopText(e.target.value)} placeholder="Top text" className="w-full p-2 border rounded" />
      <input value={bottomText} onChange={(e) => setBottomText(e.target.value)} placeholder="Bottom text" className="w-full p-2 border rounded" />
      <button onClick={draw} className="w-full bg-blue-600 text-white py-2 rounded">Generate Meme</button>
      <canvas ref={canvasRef} className="hidden" />
      {preview && (
        <div className="text-center space-y-2">
          <img src={preview} alt="Meme" className="mx-auto border rounded" />
          <a href={preview} download="meme.png" className="inline-flex items-center gap-2 bg-green-600 text-white px-4 py-2 rounded"><Download className="w-4 h-4"/> Download</a>
        </div>
      )}
    </div>
  );
}