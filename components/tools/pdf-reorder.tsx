"use client";
import { useState } from "react";
import { PDFDocument } from "pdf-lib";
import { Upload, Download } from "lucide-react";

export default function PdfReorderTool() {
  const [file, setFile] = useState<File | null>(null);
  const [order, setOrder] = useState("1,2,3");
  const [pdfUrl, setPdfUrl] = useState<string | null>(null);

  async function process() {
    if (!file) return;
    try {
      const bytes = await file.arrayBuffer();
      const pdf = await PDFDocument.load(bytes);
      const pageIndices = order.split(",").map((n) => parseInt(n.trim()) - 1).filter((i) => i >= 0 && i < pdf.getPageCount());
      const newPdf = await PDFDocument.create();
      const pages = await newPdf.copyPages(pdf, pageIndices);
      pages.forEach((p) => newPdf.addPage(p));
      const newBytes = await newPdf.save();
      setPdfUrl(URL.createObjectURL(new Blob([newBytes as unknown as BlobPart], { type: "application/pdf" })));
    } catch { alert("Error reordering"); }
  }

  return (
    <div className="space-y-6 max-w-md mx-auto">
      <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed rounded-lg cursor-pointer">
        <Upload className="w-8 h-8 mb-2" />
        <p>Upload PDF</p>
        <input type="file" accept="application/pdf" onChange={(e) => setFile(e.target.files?.[0] || null)} className="hidden" />
      </label>
      <input value={order} onChange={(e) => setOrder(e.target.value)} placeholder="Example: 3,1,2" className="w-full p-2 border rounded" />
      <button onClick={process} disabled={!file} className="w-full bg-blue-600 text-white py-2 rounded">Reorder</button>
      {pdfUrl && <a href={pdfUrl} download="reordered.pdf" className="w-full flex justify-center bg-green-600 text-white py-2 rounded"><Download className="w-4 h-4 mr-2"/> Download</a>}
    </div>
  );
}