"use client";
import { useState } from "react";
import { PDFDocument } from "pdf-lib";
import { Upload, Download, Loader2 } from "lucide-react";

export default function PdfProtectTool() {
  const [file, setFile] = useState<File | null>(null);
  const [processing, setProcessing] = useState(false);

  async function process() {
    if (!file) return;
    setProcessing(true);
    try {
      alert("PDF Password Protection is a paid feature in pdf-lib. Basic encryption requires backend.");
    } finally { setProcessing(false); }
  }

  return (
    <div className="space-y-6 max-w-md mx-auto">
      <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed rounded-lg cursor-pointer">
        <Upload className="w-8 h-8 mb-2" />
        <p>Upload PDF</p>
        <input type="file" accept="application/pdf" onChange={(e) => setFile(e.target.files?.[0] || null)} className="hidden" />
      </label>
      <button onClick={process} disabled={!file || processing} className="w-full bg-blue-600 text-white py-2 rounded flex justify-center">
        {processing ? <Loader2 className="animate-spin" /> : "Protect PDF"}
      </button>
    </div>
  );
}