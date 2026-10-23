"use client";
import { useState } from "react";
import { Upload } from "lucide-react";

export default function PdfToPptTool() {
  return (
    <div className="space-y-6 max-w-md mx-auto text-center">
      <div className="p-6 bg-yellow-50 text-yellow-700 rounded-lg">
        <p>PDF to PPT conversion requires backend services. Not available offline.</p>
      </div>
    </div>
  );
}