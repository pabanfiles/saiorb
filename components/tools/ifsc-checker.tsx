"use client";
import { useState } from "react";
import { Loader2, Search } from "lucide-react";

export default function IfscCheckerTool() {
  const [ifsc, setIfsc] = useState("");
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  async function check() {
    if (!ifsc) return;
    setLoading(true);
    try {
      const res = await fetch(`https://ifsc.razorpay.com/${ifsc.toUpperCase()}`);
      if (!res.ok) throw new Error();
      setData(await res.json());
    } catch { setData({ error: "IFSC not found" }); }
    finally { setLoading(false); }
  }

  return (
    <div className="space-y-4 max-w-md mx-auto">
      <div className="flex gap-2">
        <input value={ifsc} onChange={(e)=>setIfsc(e.target.value)} placeholder="Enter IFSC Code" className="flex-1 p-2 border rounded-lg uppercase" onKeyDown={(e)=>e.key==="Enter" && check()} />
        <button onClick={check} disabled={loading} className="bg-blue-600 text-white px-4 rounded-lg">
          {loading ? <Loader2 className="animate-spin w-4 h-4" /> : <Search className="w-4 h-4" />}
        </button>
      </div>
      {data && !data.error && (
        <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg space-y-1 text-sm">
          <p><b>Bank:</b> {data.BANK}</p>
          <p><b>Branch:</b> {data.BRANCH}</p>
          <p><b>Address:</b> {data.ADDRESS}</p>
        </div>
      )}
      {data?.error && <div className="p-4 bg-red-50 text-red-700 rounded-lg">{data.error}</div>}
    </div>
  );
}