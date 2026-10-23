"use client";
import { useState } from "react";

export default function ReceiptMakerTool() {
  const [payer, setPayer] = useState("");
  const [amount, setAmount] = useState("");
  const [reason, setReason] = useState("");

  return (
    <div className="space-y-4 max-w-md mx-auto">
      <input value={payer} onChange={(e)=>setPayer(e.target.value)} placeholder="Paid By" className="w-full p-2 border rounded" />
      <input type="number" value={amount} onChange={(e)=>setAmount(e.target.value)} placeholder="Amount (₹)" className="w-full p-2 border rounded" />
      <input value={reason} onChange={(e)=>setReason(e.target.value)} placeholder="Purpose" className="w-full p-2 border rounded" />
      <div className="p-6 border rounded-lg">
        <h2 className="font-bold">Payment Receipt</h2>
        <p className="mt-2">Received ₹{amount} from {payer}</p>
        <p className="text-sm text-gray-600">Purpose: {reason}</p>
        <button onClick={() => window.print()} className="mt-4 w-full bg-blue-600 text-white py-2 rounded">Print Receipt</button>
      </div>
    </div>
  );
}