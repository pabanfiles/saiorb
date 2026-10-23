"use client";

import React, { useState } from "react";
import { Upload, Image as ImageIcon, Download, RefreshCw, Check, Sliders } from "lucide-react";
import { toast } from "sonner";

export default function ImageCompressTool() {
  const [originalFile, setOriginalFile] = useState<File | null>(null);
  const [originalPreview, setOriginalPreview] = useState<string | null>(null);
  const [compressedBlob, setCompressedBlob] = useState<Blob | null>(null);
  const [compressedPreview, setCompressedPreview] = useState<string | null>(null);
  const [quality, setQuality] = useState<number>(75);
  const [targetKb, setTargetKb] = useState<string>("");
  const [isCompressing, setIsCompressing] = useState<boolean>(false);

  const handleImageSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files || !e.target.files[0]) return;
    const file = e.target.files[0];

    if (!file.type.startsWith("image/")) {
      toast.error("Please select a valid image file (JPG, PNG, or WebP).");
      return;
    }

    setOriginalFile(file);
    const url = URL.createObjectURL(file);
    setOriginalPreview(url);
    setCompressedBlob(null);
    setCompressedPreview(null);

    processCompression(file, quality);
  };

  const processCompression = (file: File, qPercent: number) => {
    setIsCompressing(true);
    const reader = new FileReader();

    reader.onload = (event) => {
      const img = new window.Image();
      img.onload = () => {
        const canvas = document.createElement("canvas");
        const ctx = canvas.getContext("2d");

        let { width, height } = img;
        const maxDimension = 2400;
        if (width > maxDimension || height > maxDimension) {
          if (width > height) {
            height = Math.round((height * maxDimension) / width);
            width = maxDimension;
          } else {
            width = Math.round((width * maxDimension) / height);
            height = maxDimension;
          }
        }

        canvas.width = width;
        canvas.height = height;

        if (ctx) {
          ctx.fillStyle = "#FFFFFF";
          ctx.fillRect(0, 0, width, height);
          ctx.drawImage(img, 0, 0, width, height);
        }

        const mime = file.type === "image/png" ? "image/jpeg" : file.type;
        const qFactor = Math.max(0.1, Math.min(1.0, qPercent / 100));

        canvas.toBlob(
          (blob) => {
            if (blob) {
              setCompressedBlob(blob);
              setCompressedPreview(URL.createObjectURL(blob));
              toast.success("Image compressed successfully!");
            }
            setIsCompressing(false);
          },
          mime,
          qFactor
        );
      };
      img.src = event.target?.result as string;
    };
    reader.readAsDataURL(file);
  };

  const handleTargetKbCompress = () => {
    if (!originalFile) return;
    const kb = parseFloat(targetKb);
    if (isNaN(kb) || kb <= 0) {
      toast.error("Please enter a valid target size in KB (e.g., 50 or 100).");
      return;
    }

    const currentKb = originalFile.size / 1024;
    let computedQuality = Math.min(95, Math.max(10, Math.round((kb / currentKb) * 85)));
    setQuality(computedQuality);
    processCompression(originalFile, computedQuality);
  };

  const formatSize = (bytes: number) => {
    if (bytes < 1024) return bytes + " B";
    if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + " KB";
    return (bytes / (1024 * 1024)).toFixed(2) + " MB";
  };

  const calculateReduction = () => {
    if (!originalFile || !compressedBlob) return 0;
    const diff = originalFile.size - compressedBlob.size;
    return Math.max(0, Math.round((diff / originalFile.size) * 100));
  };

  return (
    <div className="bg-white border border-gray-200 rounded-lg p-5 sm:p-7 shadow-xs space-y-6 text-gray-900">
      <div>
        <h2 className="text-xl font-bold text-gray-900 flex items-center gap-2">
          <ImageIcon className="w-5 h-5 text-blue-600" />
          Compress Image File Size
        </h2>
        <p className="text-xs text-gray-600 mt-1">
          Reduce JPG, PNG, and WebP photo sizes with high fidelity directly in your browser.
        </p>
      </div>

      {/* Upload Dropzone */}
      <div className="border-2 border-dashed border-gray-300 hover:border-blue-500 rounded-lg p-6 sm:p-8 text-center transition bg-gray-50/50">
        <input
          type="file"
          id="image-compress-input"
          accept="image/jpeg,image/png,image/webp"
          onChange={handleImageSelect}
          className="hidden"
        />
        <label
          htmlFor="image-compress-input"
          className="flex flex-col items-center justify-center cursor-pointer space-y-2.5"
        >
          <div className="w-12 h-12 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center border border-blue-200">
            <Upload className="w-6 h-6" />
          </div>
          <div>
            <p className="text-sm font-semibold text-gray-800">
              Click to select an image, or drag and drop here
            </p>
            <p className="text-xs text-gray-500 mt-0.5">
              Supports JPG, PNG, and WebP format
            </p>
          </div>
          <span className="inline-block px-3 py-1 bg-white border border-gray-300 rounded text-xs font-semibold text-gray-700 shadow-2xs hover:bg-gray-50">
            Browse Image
          </span>
        </label>
      </div>

      {/* Controls & Previews */}
      {originalFile && (
        <div className="space-y-6 pt-2">
          {/* Controls Bar */}
          <div className="p-4 bg-gray-50 border border-gray-200 rounded-lg grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Quality Slider */}
            <div className="space-y-2">
              <div className="flex justify-between text-xs font-semibold text-gray-700">
                <span className="flex items-center gap-1">
                  <Sliders className="w-3.5 h-3.5 text-blue-600" /> Compression Quality
                </span>
                <span className="font-mono text-blue-600">{quality}%</span>
              </div>
              <input
                type="range"
                min="10"
                max="95"
                value={quality}
                onChange={(e) => {
                  const val = Number(e.target.value);
                  setQuality(val);
                  processCompression(originalFile, val);
                }}
                className="w-full accent-blue-600 cursor-pointer"
              />
              <div className="flex justify-between text-[10px] text-gray-400">
                <span>Smaller File Size</span>
                <span>Higher Quality</span>
              </div>
            </div>

            {/* Target KB Input */}
            <div className="space-y-2">
              <label className="block text-xs font-semibold text-gray-700">
                Need Specific Target Size? (e.g. 50 KB / 100 KB)
              </label>
              <div className="flex gap-2">
                <input
                  type="number"
                  placeholder="e.g. 50"
                  value={targetKb}
                  onChange={(e) => setTargetKb(e.target.value)}
                  className="w-full px-3 py-1.5 bg-white border border-gray-300 rounded-md text-xs text-gray-900"
                />
                <button
                  onClick={handleTargetKbCompress}
                  className="px-3 py-1.5 bg-gray-200 hover:bg-gray-300 text-gray-800 rounded-md text-xs font-semibold transition shrink-0"
                >
                  Apply
                </button>
              </div>
              <p className="text-[10px] text-gray-500">
                Calculates optimal compression level automatically.
              </p>
            </div>
          </div>

          {/* Side by side comparison */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Original Card */}
            <div className="p-4 bg-white border border-gray-200 rounded-lg space-y-2">
              <div className="flex justify-between items-center text-xs">
                <span className="font-bold text-gray-700">Original Photo</span>
                <span className="font-mono font-semibold text-gray-600">
                  {formatSize(originalFile.size)}
                </span>
              </div>
              <div className="h-52 bg-gray-100 rounded border border-gray-200 flex items-center justify-center overflow-hidden">
                {originalPreview && (
                  /* eslint-disable-next-line @next/next/no-img-element */
                  <img
                    src={originalPreview}
                    alt="Original image"
                    className="max-h-full max-w-full object-contain"
                  />
                )}
              </div>
            </div>

            {/* Compressed Card */}
            <div className="p-4 bg-white border border-blue-200 rounded-lg space-y-2">
              <div className="flex justify-between items-center text-xs">
                <span className="font-bold text-blue-900 flex items-center gap-1">
                  Compressed Result
                  {compressedBlob && (
                    <span className="text-[10px] bg-emerald-100 text-emerald-800 px-1.5 py-0.2 rounded font-bold">
                      -{calculateReduction()}%
                    </span>
                  )}
                </span>
                <span className="font-mono font-bold text-emerald-600">
                  {compressedBlob ? formatSize(compressedBlob.size) : "Compressing..."}
                </span>
              </div>
              <div className="h-52 bg-gray-100 rounded border border-gray-200 flex items-center justify-center overflow-hidden relative">
                {isCompressing ? (
                  <div className="flex items-center gap-2 text-xs text-blue-600 font-semibold">
                    <RefreshCw className="w-4 h-4 animate-spin" />
                    <span>Compressing image...</span>
                  </div>
                ) : compressedPreview ? (
                  /* eslint-disable-next-line @next/next/no-img-element */
                  <img
                    src={compressedPreview}
                    alt="Compressed result"
                    className="max-h-full max-w-full object-contain"
                  />
                ) : null}
              </div>
            </div>
          </div>

          {/* Download Action */}
          {compressedBlob && compressedPreview && (
            <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-lg flex flex-col sm:flex-row items-center justify-between gap-3">
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-full bg-emerald-600 text-white flex items-center justify-center shrink-0">
                  <Check className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-sm font-bold text-emerald-950">
                    Image Compressed by {calculateReduction()}%!
                  </p>
                  <p className="text-xs text-emerald-800">
                    File size reduced from {formatSize(originalFile.size)} to {formatSize(compressedBlob.size)}.
                  </p>
                </div>
              </div>

              <a
                href={compressedPreview}
                download={`compressed-${originalFile.name}`}
                className="w-full sm:w-auto px-5 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-md text-xs font-semibold flex items-center justify-center gap-1.5 transition shadow-xs"
              >
                <Download className="w-4 h-4" />
                <span>Download Compressed Photo</span>
              </a>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
