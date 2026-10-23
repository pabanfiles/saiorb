"use client";
import { useState } from "react";
import { Upload } from "lucide-react";

export default function AudioConverterTool() {
  return (
    <div className="space-y-6 max-w-md mx-auto text-center">
      <div className="p-6 bg-yellow-50 text-yellow-700 rounded-lg">
        <p>Audio conversion requires FFmpeg.wasm. Not available in this version.</p>
      </div>
    </div>
  );
}