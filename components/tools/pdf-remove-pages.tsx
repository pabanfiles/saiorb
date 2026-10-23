"use client";
import { useState } from "react";
import { PDFDocument } from "pdf-lib";
import { Upload, Download } from "lucide-react";

export default function PdfRemovePagesTool() {
  const [file, setFile] = useState<File | null>(null);
  const [pageNum, setPageNum] = useState(1);
  const [pdfUrl, setPdfUrl] = useState<string | null>(null);

  async function process() {
    if (!file) return;
    try {
      const bytes = await file.arrayBuffer();
      const pdf = await PDFDocument.load(bytes);
      if (pageNum < 1 || pageNum > pdf.getPageCount()) return;
      pdf.removePage(pageNum - 1);
      const newBytes = await pdf.save();
      setPdfUrl(URL.createObjectURL(new Blob([newBytes as unknown as BlobPart], { type: "application/pdf" })));
    } catch { alert("Error removing page"); }
  }

  return (
    <div className="space-y-6 max-w-md mx-auto">
      <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed rounded-lg cursor-pointer">
        <Upload className="w-8 h-8 mb-2" />
        <p>Upload PDF</p>
        <input type="file" accept="application/pdf" onChange={(e) => setFile(e.target.files?.[0] || null)} className="hidden" />
      </label>
      <input type="number" value={pageNum} onChange={(e) => setPageNum(+e.target.value)} placeholder="Page number to remove" className="w-full p-2 border rounded" />
      <button onClick={process} disabled={!file} className="w-full bg-blue-600 text-white py-2 rounded">Remove Page</button>
      {pdfUrl && <a href={pdfUrl} download="removed.pdf" className="w-full flex justify-center bg-green-600 text-white py-2 rounded"><Download className="w-4 h-4 mr-2"/> Download</a>}
    </div>
  );
}