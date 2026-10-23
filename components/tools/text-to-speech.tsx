"use client";
import { useState } from "react";
import { Volume2 } from "lucide-react";

export default function TextToSpeechTool() {
  const [text, setText] = useState("");

  const speak = () => {
    if ("speechSynthesis" in window) {
      const utterance = new SpeechSynthesisUtterance(text);
      window.speechSynthesis.speak(utterance);
    } else {
      alert("Text-to-speech not supported in this browser");
    }
  };

  return (
    <div className="space-y-4 max-w-2xl mx-auto">
      <textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        className="w-full p-3 border rounded-lg h-32 dark:bg-gray-800 dark:border-gray-700"
        placeholder="Type text to speak..."
      />
      <button onClick={speak} disabled={!text} className="w-full flex items-center justify-center gap-2 bg-blue-600 text-white py-2 rounded disabled:opacity-50">
        <Volume2 className="w-4 h-4" /> Speak
      </button>
    </div>
  );
}