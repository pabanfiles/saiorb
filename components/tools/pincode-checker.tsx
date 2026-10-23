"use client";
import { useState } from "react";
import { Loader2, Search } from "lucide-react";

export default function PincodeCheckerTool() {
  const [pin, setPin] = useState("");
  const [data, setData] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  async function check() {
    if (pin.length !== 6) return;
    setLoading(true);
    try {
      const res = await fetch(`https://api.postalpincode.in/pincode/${pin}`);
      const json = await res.json();
      setData(json[0]?.PostOffice || []);
    } catch { setData([]); }
    finally { setLoading(false); }
  }

  return (
    <div className="space-y-4 max-w-md mx-auto">
      <div className="flex gap-2">
        <input value={pin} onChange={(e)=>setPin(e.target.value)} placeholder="Enter 6-digit Pincode" maxLength={6} className="flex-1 p-2 border rounded-lg" />
        <button onClick={check} disabled={loading} className="bg-blue-600 text-white px-4 rounded-lg">
          {loading ? <Loader2 className="animate-spin w-4 h-4" /> : <Search className="w-4 h-4" />}
        </button>
      </div>
      {data.length > 0 && (
        <div className="space-y-2">
          {data.map((p, i) => (
            <div key={i} className="p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg text-sm">
              <p className="font-bold">{p.Name}</p>
              <p>{p.District}, {p.State}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}