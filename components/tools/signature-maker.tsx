"use client";
import { useRef, useState } from "react";
import { Download, Trash2 } from "lucide-react";

export default function SignatureMakerTool() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [url, setUrl] = useState<string | null>(null);

  const startDraw = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current!;
    const ctx = canvas.getContext("2d")!;
    ctx.beginPath();
    ctx.moveTo(e.nativeEvent.offsetX, e.nativeEvent.offsetY);
    
    canvas.onmousemove = (ev: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      const x = ev.clientX - rect.left;
      const y = ev.clientY - rect.top;
      ctx.lineTo(x, y);
      ctx.stroke();
    };
    
    canvas.onmouseup = () => { 
      canvas.onmousemove = null; 
      canvas.onmouseup = null; 
    };
  };

  const save = () => setUrl(canvasRef.current!.toDataURL("image/png"));

  return (
    <div className="space-y-4 text-center">
      <canvas 
        ref={canvasRef} 
        width={400} 
        height={200} 
        onMouseDown={startDraw} 
        className="border mx-auto bg-white cursor-crosshair rounded" 
      />
      <div className="flex justify-center gap-4">
        <button onClick={save} className="bg-green-600 text-white px-4 py-2 rounded">Save Signature</button>
        <button 
          onClick={() => { 
            const ctx = canvasRef.current!.getContext("2d")!; 
            ctx.clearRect(0,0,400,200); 
            setUrl(null); 
          }} 
          className="bg-red-600 text-white px-4 py-2 rounded"
        >
          <Trash2 className="w-4 h-4" />
        </button>
      </div>
      {url && (
        <a href={url} download="signature.png" className="inline-block bg-blue-600 text-white px-4 py-2 rounded mt-4">
          <Download className="inline w-4 h-4 mr-1" /> Download PNG
        </a>
      )}
    </div>
  );
}