"use client";
import { useState } from "react";
import { PDFDocument } from "pdf-lib";
import { Upload, Download, Loader2 } from "lucide-react";

export default function ImageToPdfTool() {
  const [files, setFiles] = useState<File[]>([]);
  const [processing, setProcessing] = useState(false);
  const [pdfUrl, setPdfUrl] = useState<string | null>(null);

  async function convert() {
    if (files.length === 0) return;
    setProcessing(true);
    try {
      const pdfDoc = await PDFDocument.create();
      for (const file of files) {
        const bytes = await file.arrayBuffer();
        const img = file.type === "image/png" 
          ? await pdfDoc.embedPng(bytes) 
          : await pdfDoc.embedJpg(bytes);
        const page = pdfDoc.addPage([img.width, img.height]);
        page.drawImage(img, { x: 0, y: 0, width: img.width, height: img.height });
      }
      const pdfBytes = await pdfDoc.save();
      // FIX: Cast Uint8Array to BlobPart for TypeScript
      const blob = new Blob([pdfBytes as unknown as BlobPart], { type: "application/pdf" });
      setPdfUrl(URL.createObjectURL(blob));
    } catch (err) {
      alert("Error converting images to PDF");
    } finally {
      setProcessing(false);
    }
  }

  return (
    <div className="space-y-6">
      <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed rounded-lg cursor-pointer">
        <Upload className="w-8 h-8 mb-2" />
        <p>Select Images</p>
        <input type="file" multiple accept="image/jpeg,image/png" onChange={(e) => setFiles(Array.from(e.target.files || []))} className="hidden" />
      </label>
      {files.length > 0 && <p className="text-center">{files.length} image(s) selected</p>}
      <button onClick={convert} disabled={processing} className="w-full bg-blue-600 text-white py-2 rounded">
        {processing ? <Loader2 className="animate-spin mx-auto" /> : "Convert to PDF"}
      </button>
      {pdfUrl && (
        <a href={pdfUrl} download="images.pdf" className="w-full flex justify-center bg-green-600 text-white py-2 rounded">
          <Download className="w-4 h-4 mr-2" /> Download PDF
        </a>
      )}
    </div>
  );
}