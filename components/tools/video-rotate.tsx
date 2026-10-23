"use client";
import { useState } from "react";
import { Upload } from "lucide-react";

export default function VideoRotateTool() {
  return (
    <div className="space-y-6 max-w-md mx-auto text-center">
      <div className="p-6 bg-yellow-50 text-yellow-700 rounded-lg">
        <p>Video rotation requires FFmpeg.wasm. Not available.</p>
      </div>
    </div>
  );
}