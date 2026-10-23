"use client";
import { useState } from "react";

export default function QuotationMakerTool() {
  const [client, setClient] = useState("");
  const [amount, setAmount] = useState("");

  return (
    <div className="space-y-4 max-w-md mx-auto">
      <input value={client} onChange={(e)=>setClient(e.target.value)} placeholder="Client Name" className="w-full p-2 border rounded" />
      <input type="number" value={amount} onChange={(e)=>setAmount(e.target.value)} placeholder="Amount (₹)" className="w-full p-2 border rounded" />
      <div className="p-6 border rounded-lg">
        <h2 className="text-lg font-bold">Quotation for {client}</h2>
        <p className="text-2xl font-bold mt-2">₹{amount}</p>
        <button onClick={() => window.print()} className="mt-4 w-full bg-blue-600 text-white py-2 rounded">Print</button>
      </div>
    </div>
  );
}