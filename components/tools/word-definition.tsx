"use client";
import { useState } from "react";
import { Search, Loader2 } from "lucide-react";

export default function WordDefinitionTool() {
  const [word, setWord] = useState("");
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  async function search() {
    if (!word) return;
    setLoading(true);
    try {
      const res = await fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${word}`);
      const json = await res.json();
      setData(json[0] || null);
    } catch { setData(null); }
    finally { setLoading(false); }
  }

  return (
    <div className="space-y-4 max-w-2xl mx-auto">
      <div className="flex gap-2">
        <input value={word} onChange={(e)=>setWord(e.target.value)} placeholder="Enter word" className="flex-1 p-2 border rounded-lg" onKeyDown={(e)=>e.key==="Enter" && search()} />
        <button onClick={search} disabled={loading} className="bg-blue-600 text-white px-4 rounded-lg flex items-center gap-2">
          {loading ? <Loader2 className="animate-spin w-4 h-4" /> : <Search className="w-4 h-4" />}
        </button>
      </div>
      {data && (
        <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
          <h3 className="text-xl font-bold">{data.word}</h3>
          {data.phonetic && <p className="text-sm text-gray-600">{data.phonetic}</p>}
          {data.meanings?.map((m: any, i: number) => (
            <div key={i} className="mt-3">
              <p className="text-sm italic text-gray-500">{m.partOfSpeech}</p>
              <ul className="list-disc list-inside text-sm">
                {m.definitions.slice(0, 3).map((d: any, j: number) => <li key={j}>{d.definition}</li>)}
              </ul>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}