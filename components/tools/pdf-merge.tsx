"use client";

import React, { useState } from "react";
import { PDFDocument } from "pdf-lib";
import { Upload, FileText, ArrowUp, ArrowDown, Trash2, Check, Download, AlertCircle, RefreshCw } from "lucide-react";
import { toast } from "sonner";

interface PDFItem {
  id: string;
  file: File;
  name: string;
  size: number;
  pageCount?: number;
}

export default function PdfMergeTool() {
  const [files, setFiles] = useState<PDFItem[]>([]);
  const [isProcessing, setIsProcessing] = useState(false);
  const [mergedPdfUrl, setMergedPdfUrl] = useState<string | null>(null);

  const handleFileSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;
    const selectedFiles = Array.from(e.target.files).filter(
      (file) => file.type === "application/pdf" || file.name.endsWith(".pdf")
    );

    if (selectedFiles.length === 0) {
      toast.error("Please select valid PDF files.");
      return;
    }

    const newItems: PDFItem[] = [];
    for (const file of selectedFiles) {
      const id = Math.random().toString(36).substring(7);
      try {
        const arrayBuffer = await file.arrayBuffer();
        const pdfDoc = await PDFDocument.load(arrayBuffer);
        const pageCount = pdfDoc.getPageCount();
        newItems.push({ id, file, name: file.name, size: file.size, pageCount });
      } catch (err) {
        console.warn("Could not parse page count:", err);
        newItems.push({ id, file, name: file.name, size: file.size, pageCount: undefined });
      }
    }

    setFiles((prev) => [...prev, ...newItems]);
    setMergedPdfUrl(null);
    toast.success(`Added ${selectedFiles.length} PDF file(s).`);
  };

  const moveUp = (index: number) => {
    if (index === 0) return;
    setFiles((prev) => {
      const copy = [...prev];
      const temp = copy[index - 1];
      copy[index - 1] = copy[index];
      copy[index] = temp;
      return copy;
    });
  };

  const moveDown = (index: number) => {
    if (index === files.length - 1) return;
    setFiles((prev) => {
      const copy = [...prev];
      const temp = copy[index + 1];
      copy[index + 1] = copy[index];
      copy[index] = temp;
      return copy;
    });
  };

  const removeFile = (id: string) => {
    setFiles((prev) => prev.filter((item) => item.id !== id));
    setMergedPdfUrl(null);
  };

  const handleMerge = async () => {
    if (files.length < 2) {
      toast.error("Please add at least 2 PDF files to merge.");
      return;
    }

    setIsProcessing(true);
    try {
      const mergedPdf = await PDFDocument.create();

      for (const item of files) {
        const fileBytes = await item.file.arrayBuffer();
        const pdfDoc = await PDFDocument.load(fileBytes);
        const copiedPages = await mergedPdf.copyPages(pdfDoc, pdfDoc.getPageIndices());
        copiedPages.forEach((page) => mergedPdf.addPage(page));
      }

      const mergedPdfBytes = await mergedPdf.save();
      const blob = new Blob([mergedPdfBytes as unknown as BlobPart], { type: "application/pdf" });
      const url = URL.createObjectURL(blob);
      setMergedPdfUrl(url);
      toast.success("PDF files successfully merged!");
    } catch (error) {
      console.error(error);
      toast.error("Failed to merge PDF files. Please verify the files are not encrypted or corrupted.");
    } finally {
      setIsProcessing(false);
    }
  };

  const formatSize = (bytes: number) => {
    if (bytes < 1024) return bytes + " B";
    if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + " KB";
    return (bytes / (1024 * 1024)).toFixed(2) + " MB";
  };

  return (
    <div className="bg-white border border-gray-200 rounded-lg p-5 sm:p-7 shadow-xs space-y-6 text-gray-900">
      <div>
        <h2 className="text-xl font-bold text-gray-900 flex items-center gap-2">
          <FileText className="w-5 h-5 text-blue-600" />
          Merge PDF Documents
        </h2>
        <p className="text-xs text-gray-600 mt-1">
          Combine multiple PDF files into a single document instantly in your browser with zero server uploads.
        </p>
      </div>

      {/* Upload Dropzone */}
      <div className="border-2 border-dashed border-gray-300 hover:border-blue-500 rounded-lg p-6 sm:p-8 text-center transition bg-gray-50/50">
        <input
          type="file"
          id="pdf-upload-input"
          multiple
          accept=".pdf,application/pdf"
          onChange={handleFileSelect}
          className="hidden"
        />
        <label
          htmlFor="pdf-upload-input"
          className="flex flex-col items-center justify-center cursor-pointer space-y-2.5"
        >
          <div className="w-12 h-12 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center border border-blue-200">
            <Upload className="w-6 h-6" />
          </div>
          <div>
            <p className="text-sm font-semibold text-gray-800">
              Click to select PDF files, or drag and drop here
            </p>
            <p className="text-xs text-gray-500 mt-0.5">
              Select 2 or more PDF documents to combine
            </p>
          </div>
          <span className="inline-block px-3 py-1 bg-white border border-gray-300 rounded text-xs font-semibold text-gray-700 shadow-2xs hover:bg-gray-50">
            Browse Files
          </span>
        </label>
      </div>

      {/* File List */}
      {files.length > 0 && (
        <div className="space-y-3">
          <div className="flex items-center justify-between text-xs font-semibold text-gray-600 border-b border-gray-200 pb-2">
            <span>Selected Files ({files.length}): Arrange order as needed</span>
            <button
              onClick={() => {
                setFiles([]);
                setMergedPdfUrl(null);
              }}
              className="text-red-600 hover:underline"
            >
              Clear All
            </button>
          </div>

          <div className="space-y-2">
            {files.map((item, index) => (
              <div
                key={item.id}
                className="flex items-center justify-between p-3 bg-white border border-gray-200 rounded-md shadow-2xs hover:border-gray-300 transition"
              >
                <div className="flex items-center gap-3 min-w-0">
                  <span className="w-6 h-6 rounded bg-gray-100 text-gray-700 font-bold text-xs flex items-center justify-center shrink-0">
                    {index + 1}
                  </span>
                  <div className="min-w-0">
                    <p className="text-xs font-semibold text-gray-900 truncate max-w-xs sm:max-w-md">
                      {item.name}
                    </p>
                    <p className="text-[11px] text-gray-500">
                      {formatSize(item.size)} {item.pageCount ? `• ${item.pageCount} pages` : ""}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-1 shrink-0">
                  <button
                    onClick={() => moveUp(index)}
                    disabled={index === 0}
                    className="p-1.5 text-gray-500 hover:bg-gray-100 disabled:opacity-30 rounded"
                    title="Move Up"
                  >
                    <ArrowUp className="w-3.5 h-3.5" />
                  </button>
                  <button
                    onClick={() => moveDown(index)}
                    disabled={index === files.length - 1}
                    className="p-1.5 text-gray-500 hover:bg-gray-100 disabled:opacity-30 rounded"
                    title="Move Down"
                  >
                    <ArrowDown className="w-3.5 h-3.5" />
                  </button>
                  <button
                    onClick={() => removeFile(item.id)}
                    className="p-1.5 text-red-500 hover:bg-red-50 rounded ml-1"
                    title="Remove"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Merge Action */}
          <div className="pt-3 flex flex-col sm:flex-row items-center gap-3">
            <button
              onClick={handleMerge}
              disabled={isProcessing || files.length < 2}
              className={`w-full sm:w-auto px-6 py-2.5 rounded-md text-sm font-semibold flex items-center justify-center gap-2 transition ${
                files.length >= 2 && !isProcessing
                  ? "bg-blue-600 hover:bg-blue-700 text-white shadow-xs cursor-pointer"
                  : "bg-gray-200 text-gray-400 cursor-not-allowed"
              }`}
            >
              {isProcessing ? (
                <>
                  <RefreshCw className="w-4 h-4 animate-spin" />
                  <span>Merging PDF Files...</span>
                </>
              ) : (
                <>
                  <Check className="w-4 h-4" />
                  <span>Merge {files.length} PDFs Now</span>
                </>
              )}
            </button>

            {files.length < 2 && (
              <span className="text-xs text-amber-700 flex items-center gap-1">
                <AlertCircle className="w-3.5 h-3.5" /> Add at least 2 files to merge
              </span>
            )}
          </div>
        </div>
      )}

      {/* Merged Download Result */}
      {mergedPdfUrl && (
        <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-lg flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-full bg-emerald-600 text-white flex items-center justify-center shrink-0">
              <Check className="w-5 h-5" />
            </div>
            <div>
              <p className="text-sm font-bold text-emerald-950">
                PDF Files Successfully Merged!
              </p>
              <p className="text-xs text-emerald-800">
                Combined document is ready for instant download.
              </p>
            </div>
          </div>

          <a
            href={mergedPdfUrl}
            download="merged-document.pdf"
            className="w-full sm:w-auto px-5 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-md text-xs font-semibold flex items-center justify-center gap-1.5 transition shadow-xs"
          >
            <Download className="w-4 h-4" />
            <span>Download Merged PDF</span>
          </a>
        </div>
      )}
    </div>
  );
}
