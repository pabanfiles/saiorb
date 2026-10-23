"use client";
import { useState } from "react";
import { Upload, Loader2 } from "lucide-react";

export default function PdfToImageTool() {
  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);

  async function convert() {
    if (!file) return;
    setLoading(true);
    setTimeout(() => {
      alert("PDF to Image conversion requires backend or pdfjs-dist library. You can download the original file for now.");
      setLoading(false);
    }, 1000);
  }

  return (
    <div className="space-y-6">
      <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed rounded-lg cursor-pointer">
        <Upload className="w-8 h-8 mb-2" />
        <p>Upload PDF</p>
        <input type="file" accept="application/pdf" onChange={(e) => setFile(e.target.files?.[0] || null)} className="hidden" />
      </label>
      <button onClick={convert} disabled={!file || loading} className="w-full bg-blue-600 text-white py-2 rounded">
        {loading ? <Loader2 className="animate-spin mx-auto" /> : "Convert to Image"}
      </button>
    </div>
  );
}