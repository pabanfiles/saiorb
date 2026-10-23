"use client";
import { useState } from "react";
import { PDFDocument } from "pdf-lib";
import { Upload, Download } from "lucide-react";

export default function PdfCropTool() {
  const [file, setFile] = useState<File | null>(null);
  const [pdfUrl, setPdfUrl] = useState<string | null>(null);

  async function process() {
    if (!file) return;
    try {
      const bytes = await file.arrayBuffer();
      const pdf = await PDFDocument.load(bytes);
      const pages = pdf.getPages();
      pages.forEach((p) => {
        p.setCropBox(50, 50, p.getWidth() - 100, p.getHeight() - 100);
      });
      const newBytes = await pdf.save();
      setPdfUrl(URL.createObjectURL(new Blob([newBytes as unknown as BlobPart], { type: "application/pdf" })));
    } catch { alert("Error cropping"); }
  }

  return (
    <div className="space-y-6 max-w-md mx-auto">
      <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed rounded-lg cursor-pointer">
        <Upload className="w-8 h-8 mb-2" />
        <p>Upload PDF to Crop</p>
        <input type="file" accept="application/pdf" onChange={(e) => setFile(e.target.files?.[0] || null)} className="hidden" />
      </label>
      <button onClick={process} disabled={!file} className="w-full bg-blue-600 text-white py-2 rounded">Crop PDF</button>
      {pdfUrl && <a href={pdfUrl} download="cropped.pdf" className="w-full flex justify-center bg-green-600 text-white py-2 rounded"><Download className="w-4 h-4 mr-2"/> Download</a>}
    </div>
  );
}