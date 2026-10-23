"use client";
import { useState } from "react";
import { PDFDocument } from "pdf-lib";
import { Upload, Download } from "lucide-react";

export default function PdfSplitTool() {
  const [file, setFile] = useState<File | null>(null);
  const [pdfUrl, setPdfUrl] = useState<string | null>(null);

  async function split() {
    if (!file) return;
    const bytes = await file.arrayBuffer();
    const pdf = await PDFDocument.load(bytes);
    const newPdf = await PDFDocument.create();
    const [page] = await newPdf.copyPages(pdf, [0]);
    newPdf.addPage(page);
    const newBytes = await newPdf.save();
    setPdfUrl(URL.createObjectURL(new Blob([newBytes], { type: "application/pdf" })));
  }

  return (
    <div className="space-y-6">
      <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed rounded-lg cursor-pointer">
        <Upload className="w-8 h-8 mb-2" />
        <p>Upload PDF to Extract First Page</p>
        <input type="file" accept="application/pdf" onChange={(e) => setFile(e.target.files?.[0] || null)} className="hidden" />
      </label>
      <button onClick={split} disabled={!file} className="w-full bg-blue-600 text-white py-2 rounded">Extract First Page</button>
      {pdfUrl && (
        <a href={pdfUrl} download="first-page.pdf" className="w-full flex justify-center bg-green-600 text-white py-2 rounded">
          <Download className="w-4 h-4 mr-2" /> Download
        </a>
      )}
    </div>
  );
}