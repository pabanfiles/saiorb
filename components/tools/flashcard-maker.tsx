"use client";
import { useState } from "react";

export default function FlashcardMakerTool() {
  const [cards, setCards] = useState<{q: string; a: string}[]>([]);
  const [q, setQ] = useState("");
  const [a, setA] = useState("");
  const [flipped, setFlipped] = useState(false);
  const [current, setCurrent] = useState(0);

  return (
    <div className="space-y-4 max-w-md mx-auto">
      <div className="flex gap-2">
        <input value={q} onChange={(e)=>setQ(e.target.value)} placeholder="Question" className="flex-1 p-2 border rounded" />
        <input value={a} onChange={(e)=>setA(e.target.value)} placeholder="Answer" className="flex-1 p-2 border rounded" />
        <button onClick={() => { if (q && a) { setCards([...cards, {q,a}]); setQ(""); setA(""); } }} className="bg-blue-600 text-white px-4 py-2 rounded">Add</button>
      </div>
      {cards.length > 0 && (
        <div>
          <div onClick={() => setFlipped(!flipped)} className="p-8 bg-blue-50 dark:bg-blue-900/20 rounded-lg text-center cursor-pointer min-h-[150px] flex items-center justify-center">
            <p className="text-xl font-bold">{flipped ? cards[current].a : cards[current].q}</p>
          </div>
          <div className="flex gap-2 mt-2">
            <button onClick={() => { setCurrent((c) => (c - 1 + cards.length) % cards.length); setFlipped(false); }} className="flex-1 bg-gray-200 py-2 rounded">Prev</button>
            <button onClick={() => { setCurrent((c) => (c + 1) % cards.length); setFlipped(false); }} className="flex-1 bg-gray-200 py-2 rounded">Next</button>
          </div>
        </div>
      )}
    </div>
  );
}