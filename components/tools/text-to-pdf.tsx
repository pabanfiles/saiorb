"use client";
import { useState } from "react";
import { PDFDocument, StandardFonts, rgb } from "pdf-lib";
import { Download } from "lucide-react";

export default function TextToPdfTool() {
  const [text, setText] = useState("");
  const [pdfUrl, setPdfUrl] = useState<string | null>(null);

  const generate = async () => {
    const pdfDoc = await PDFDocument.create();
    const page = pdfDoc.addPage();
    const font = await pdfDoc.embedFont(StandardFonts.Helvetica);
    const { height } = page.getSize();
    page.drawText(text || "Empty", { x: 50, y: height - 50, size: 12, font, color: rgb(0,0,0), maxWidth: 500 });
    const bytes = await pdfDoc.save();
    setPdfUrl(URL.createObjectURL(new Blob([bytes as unknown as BlobPart], { type: "application/pdf" })));
  };

  return (
    <div className="space-y-4 max-w-2xl mx-auto">
      <textarea value={text} onChange={(e)=>setText(e.target.value)} rows={10} className="w-full p-3 border rounded-lg dark:bg-gray-800 dark:border-gray-700" placeholder="Type or paste your text..." />
      <button onClick={generate} className="w-full bg-blue-600 text-white py-2 rounded">Convert to PDF</button>
      {pdfUrl && <a href={pdfUrl} download="text.pdf" className="w-full flex justify-center bg-green-600 text-white py-2 rounded"><Download className="w-4 h-4 mr-2"/> Download PDF</a>}
    </div>
  );
}