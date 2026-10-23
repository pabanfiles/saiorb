"use client";
import { useState, useRef } from "react";
import { Upload, Download, Scissors } from "lucide-react";

export default function VideoTrimmerTool() {
  const [preview, setPreview] = useState<string | null>(null);
  const [processing, setProcessing] = useState(false);

  async function handleFile(f: File) {
    setProcessing(true);
    setPreview(URL.createObjectURL(f));
    setProcessing(false);
  }

  return (
    <div className="space-y-6">
      <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed rounded-lg cursor-pointer">
        <Upload className="w-8 h-8 mb-2" />
        <p>Upload Video (Basic Preview)</p>
        <input type="file" accept="video/*" onChange={(e) => { const f = e.target.files?.[0]; if (f) handleFile(f); }} className="hidden" />
      </label>
      {preview && (
        <div className="text-center space-y-4">
          <video src={preview} controls className="mx-auto max-h-64 rounded" />
          <a href={preview} download="video.mp4" className="inline-flex items-center gap-2 bg-green-600 text-white px-4 py-2 rounded">
            <Download className="w-4 h-4" /> Download Video
          </a>
        </div>
      )}
    </div>
  );
}