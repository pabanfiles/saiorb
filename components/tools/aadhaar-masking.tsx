"use client";
import { useState, useRef } from "react";
import { Upload, Download, EyeOff, Loader2 } from "lucide-react";

export default function AadhaarMaskingTool() {
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [processing, setProcessing] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  function handleFile(e: React.ChangeEvent<HTMLInputElement>) {
    const f = e.target.files?.[0];
    if (f) { setFile(f); setPreview(URL.createObjectURL(f)); }
  }

  async function maskAadhaar() {
    if (!file || !canvasRef.current) return;
    setProcessing(true);
    const img = new Image();
    img.src = URL.createObjectURL(file);
    await new Promise((r) => (img.onload = r));

    const canvas = canvasRef.current;
    canvas.width = img.width;
    canvas.height = img.height;
    const ctx = canvas.getContext("2d")!;
    ctx.drawImage(img, 0, 0);

    ctx.fillStyle = "black";
    ctx.fillRect(canvas.width * 0.1, canvas.height * 0.75, canvas.width * 0.45, canvas.height * 0.1);
    
    setPreview(canvas.toDataURL("image/jpeg"));
    setProcessing(false);
  }

  return (
    <div className="space-y-6">
      <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed rounded-lg cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-800">
        <Upload className="w-8 h-8 mb-2 text-gray-500" />
        <p className="text-sm text-gray-500">Upload Aadhaar Photo</p>
        <input type="file" accept="image/*" onChange={handleFile} className="hidden" />
      </label>
      <canvas ref={canvasRef} className="hidden" />
      {preview && <img src={preview} alt="Preview" className="max-h-64 rounded-lg border mx-auto" />}
      {file && (
        <button onClick={maskAadhaar} disabled={processing} className="w-full flex items-center justify-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg disabled:opacity-50">
          {processing ? <Loader2 className="animate-spin w-4 h-4" /> : <EyeOff className="w-4 h-4" />} Mask First 8 Digits
        </button>
      )}
      {preview && !processing && (
        <a href={preview} download="masked-aadhaar.jpg" className="w-full flex items-center justify-center gap-2 bg-green-600 text-white px-4 py-2 rounded-lg">
          <Download className="w-4 h-4" /> Download Masked Image
        </a>
      )}
    </div>
  );
}