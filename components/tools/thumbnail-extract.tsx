"use client";
import { useState, useRef } from "react";
import { Upload, Download } from "lucide-react";

export default function ThumbnailExtractTool() {
  const [thumb, setThumb] = useState<string | null>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  function grab() {
    const video = videoRef.current;
    if (!video) return;
    const canvas = document.createElement("canvas");
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    canvas.getContext("2d")!.drawImage(video, 0, 0);
    setThumb(canvas.toDataURL("image/png"));
  }

  return (
    <div className="space-y-6 max-w-md mx-auto">
      <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed rounded-lg cursor-pointer">
        <Upload className="w-8 h-8 mb-2" />
        <p>Upload Video</p>
        <input type="file" accept="video/*" onChange={(e) => {
          const f = e.target.files?.[0];
          if (f && videoRef.current) videoRef.current.src = URL.createObjectURL(f);
        }} className="hidden" />
      </label>
      <video ref={videoRef} controls className="w-full rounded" />
      <button onClick={grab} className="w-full bg-blue-600 text-white py-2 rounded">Grab Thumbnail</button>
      {thumb && (
        <div className="text-center space-y-2">
          <img src={thumb} className="mx-auto border rounded" />
          <a href={thumb} download="thumb.png" className="inline-flex items-center gap-2 bg-green-600 text-white px-4 py-2 rounded"><Download className="w-4 h-4"/> Download</a>
        </div>
      )}
    </div>
  );
}