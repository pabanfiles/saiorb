"use client";
import { useState } from "react";

export default function InvoiceGeneratorTool() {
  const [client, setClient] = useState("");
  const [amount, setAmount] = useState("");
  const [items, setItems] = useState([{desc: "", qty: 1, price: 0}]);

  const total = items.reduce((s, i) => s + i.qty * i.price, 0);

  return (
    <div className="space-y-4 max-w-2xl mx-auto">
      <input value={client} onChange={(e)=>setClient(e.target.value)} placeholder="Client Name" className="w-full p-2 border rounded" />
      {items.map((item, i) => (
        <div key={i} className="grid grid-cols-3 gap-2">
          <input value={item.desc} onChange={(e) => {
            const newItems = [...items];
            newItems[i].desc = e.target.value;
            setItems(newItems);
          }} placeholder="Description" className="p-2 border rounded" />
          <input type="number" value={item.qty} onChange={(e) => {
            const newItems = [...items];
            newItems[i].qty = +e.target.value;
            setItems(newItems);
          }} placeholder="Qty" className="p-2 border rounded" />
          <input type="number" value={item.price} onChange={(e) => {
            const newItems = [...items];
            newItems[i].price = +e.target.value;
            setItems(newItems);
          }} placeholder="Price" className="p-2 border rounded" />
        </div>
      ))}
      <button onClick={() => setItems([...items, {desc: "", qty: 1, price: 0}])} className="bg-blue-600 text-white px-3 py-1 rounded">+ Add Item</button>
      <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded">
        <p>Client: {client || "-"}</p>
        <p className="text-lg font-bold">Total: ₹{total.toFixed(2)}</p>
      </div>
      <button onClick={() => window.print()} className="w-full bg-green-600 text-white py-2 rounded">Print Invoice</button>
    </div>
  );
}