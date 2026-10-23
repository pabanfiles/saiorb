"use client";
import { useState } from "react";
import { Upload } from "lucide-react";

export default function PhotoCollageTool() {
  const [images, setImages] = useState<string[]>([]);

  return (
    <div className="space-y-6 max-w-2xl mx-auto">
      <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed rounded-lg cursor-pointer">
        <Upload className="w-8 h-8 mb-2" />
        <p>Select Multiple Images</p>
        <input type="file" multiple accept="image/*" onChange={(e) => {
          const files = Array.from(e.target.files || []);
          setImages(files.map((f) => URL.createObjectURL(f)));
        }} className="hidden" />
      </label>
      <div className="grid grid-cols-3 gap-2">
        {images.map((src, i) => <img key={i} src={src} className="w-full h-24 object-cover rounded" />)}
      </div>
    </div>
  );
}