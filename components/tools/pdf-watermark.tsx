"use client";
import { useState } from "react";
import { PDFDocument, rgb, StandardFonts } from "pdf-lib";
import { Upload, Download, Loader2 } from "lucide-react";

export default function PdfWatermarkTool() {
  const [file, setFile] = useState<File | null>(null);
  const [text, setText] = useState("CONFIDENTIAL");
  const [processing, setProcessing] = useState(false);
  const [pdfUrl, setPdfUrl] = useState<string | null>(null);

  async function process() {
    if (!file || !text) return;
    setProcessing(true);
    try {
      const bytes = await file.arrayBuffer();
      const pdf = await PDFDocument.load(bytes);
      const font = await pdf.embedFont(StandardFonts.HelveticaBold);
      const pages = pdf.getPages();

      pages.forEach((page) => {
        const { width, height } = page.getSize();
        page.drawText(text, {
          x: width / 4, y: height / 2, size: 50, font,
          color: rgb(0.7, 0.7, 0.7), opacity: 0.3, rotate: { type: 0, angle: 45 } as any,
        });
      });

      const newBytes = await pdf.save();
      setPdfUrl(URL.createObjectURL(new Blob([newBytes as unknown as BlobPart], { type: "application/pdf" })));
    } catch { alert("Error adding watermark"); }
    finally { setProcessing(false); }
  }

  return (
    <div className="space-y-6 max-w-md mx-auto">
      <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed rounded-lg cursor-pointer">
        <Upload className="w-8 h-8 mb-2" />
        <p>Upload PDF</p>
        <input type="file" accept="application/pdf" onChange={(e) => setFile(e.target.files?.[0] || null)} className="hidden" />
      </label>
      <input value={text} onChange={(e) => setText(e.target.value)} placeholder="Watermark text" className="w-full p-2 border rounded" />
      <button onClick={process} disabled={!file || processing} className="w-full bg-blue-600 text-white py-2 rounded flex justify-center">
        {processing ? <Loader2 className="animate-spin" /> : "Add Watermark"}
      </button>
      {pdfUrl && <a href={pdfUrl} download="watermarked.pdf" className="w-full flex justify-center bg-green-600 text-white py-2 rounded"><Download className="w-4 h-4 mr-2"/> Download</a>}
    </div>
  );
}