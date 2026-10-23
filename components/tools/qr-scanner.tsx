"use client";
import { useState } from "react";
import { Upload, Camera } from "lucide-react";

export default function QrScannerTool() {
  const [result, setResult] = useState<string | null>(null);

  return (
    <div className="space-y-6 text-center">
      <div className="p-4 bg-blue-50 text-blue-700 rounded-lg">
        <Camera className="w-8 h-8 mx-auto mb-2" />
        <p>QR Scanner is under development. Use your phone camera for now.</p>
      </div>
      <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed rounded-lg cursor-pointer">
        <Upload className="w-8 h-8 mb-2" />
        <p>Upload QR Image</p>
        <input type="file" accept="image/*" onChange={() => setResult("Demo mode — QR decoding coming soon")} className="hidden" />
      </label>
      {result && <div className="p-4 bg-green-50 text-green-700 rounded-lg">{result}</div>}
    </div>
  );
}