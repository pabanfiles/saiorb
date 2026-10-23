"use client";
import { useState } from "react";
import { Upload } from "lucide-react";

export default function VideoCompressTool() {
  return (
    <div className="space-y-6 max-w-md mx-auto text-center">
      <div className="p-6 bg-yellow-50 text-yellow-700 rounded-lg">
        <p>Video compression requires FFmpeg.wasm (paid tier). Not available in free version.</p>
      </div>
      <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed rounded-lg cursor-pointer">
        <Upload className="w-8 h-8 mb-2" />
        <p>Upload Video (Preview only)</p>
        <input type="file" accept="video/*" className="hidden" />
      </label>
    </div>
  );
}