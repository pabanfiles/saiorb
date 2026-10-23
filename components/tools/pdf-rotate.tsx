"use client";
import { useState } from "react";
import { PDFDocument, degrees } from "pdf-lib";
import { Upload, Download, Loader2 } from "lucide-react";

export default function PdfRotateTool() {
  const [file, setFile] = useState<File | null>(null);
  const [processing, setProcessing] = useState(false);
  const [pdfUrl, setPdfUrl] = useState<string | null>(null);

  async function rotate() {
    if (!file) return;
    setProcessing(true);
    try {
      const bytes = await file.arrayBuffer();
      const pdf = await PDFDocument.load(bytes);
      const pages = pdf.getPages();
      pages.forEach((page) => {
        page.setRotation(degrees(page.getRotation().angle + 90));
      });
      const newBytes = await pdf.save();
      const blob = new Blob([newBytes as unknown as BlobPart], { type: "application/pdf" });
      setPdfUrl(URL.createObjectURL(blob));
    } catch { alert("Error rotating PDF"); }
    finally { setProcessing(false); }
  }

  return (
    <div className="space-y-6">
      <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed rounded-lg cursor-pointer">
        <Upload className="w-8 h-8 mb-2" />
        <p>Upload PDF to Rotate 90°</p>
        <input type="file" accept="application/pdf" onChange={(e) => setFile(e.target.files?.[0] || null)} className="hidden" />
      </label>
      <button onClick={rotate} disabled={!file || processing} className="w-full bg-blue-600 text-white py-2 rounded flex justify-center">
        {processing ? <Loader2 className="animate-spin" /> : "Rotate PDF"}
      </button>
      {pdfUrl && (
        <a href={pdfUrl} download="rotated.pdf" className="w-full flex justify-center bg-green-600 text-white py-2 rounded">
          <Download className="w-4 h-4 mr-2" /> Download
        </a>
      )}
    </div>
  );
}