"use client";
import { useState, useEffect } from "react";

export default function StudyTimerTool() {
  const [seconds, setSeconds] = useState(25 * 60);
  const [running, setRunning] = useState(false);

  useEffect(() => {
    if (!running) return;
    const interval = setInterval(() => {
      setSeconds((s) => (s > 0 ? s - 1 : 0));
    }, 1000);
    return () => clearInterval(interval);
  }, [running]);

  const min = Math.floor(seconds / 60);
  const sec = seconds % 60;

  return (
    <div className="space-y-4 text-center max-w-md mx-auto">
      <div className="text-6xl font-bold">{String(min).padStart(2,"0")}:{String(sec).padStart(2,"0")}</div>
      <div className="flex gap-2 justify-center">
        <button onClick={() => setRunning(true)} className="bg-green-600 text-white px-4 py-2 rounded">Start</button>
        <button onClick={() => setRunning(false)} className="bg-yellow-500 text-white px-4 py-2 rounded">Pause</button>
        <button onClick={() => { setSeconds(25*60); setRunning(false); }} className="bg-red-600 text-white px-4 py-2 rounded">Reset</button>
      </div>
    </div>
  );
}