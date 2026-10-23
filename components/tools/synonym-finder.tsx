"use client";
import { useState } from "react";
import { Loader2, Search } from "lucide-react";

export default function SynonymFinderTool() {
  const [word, setWord] = useState("");
  const [results, setResults] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);

  async function search() {
    if (!word) return;
    setLoading(true);
    try {
      const res = await fetch(`https://api.datamuse.com/words?rel_syn=${word}`);
      const data = await res.json();
      setResults(data.slice(0, 20).map((d: any) => d.word));
    } catch { setResults([]); }
    finally { setLoading(false); }
  }

  return (
    <div className="space-y-4 max-w-2xl mx-auto">
      <div className="flex gap-2">
        <input value={word} onChange={(e)=>setWord(e.target.value)} placeholder="Enter word" className="flex-1 p-2 border rounded-lg" onKeyDown={(e)=>e.key==="Enter" && search()} />
        <button onClick={search} disabled={loading} className="bg-blue-600 text-white px-4 rounded-lg">
          {loading ? <Loader2 className="animate-spin w-4 h-4" /> : <Search className="w-4 h-4" />}
        </button>
      </div>
      {results.length > 0 && (
        <div className="flex flex-wrap gap-2">
          {results.map((r, i) => <span key={i} className="px-3 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 rounded-full text-sm">{r}</span>)}
        </div>
      )}
    </div>
  );
}