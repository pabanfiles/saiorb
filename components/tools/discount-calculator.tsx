"use client";
import { useState } from "react";

export default function DiscountCalculatorTool() {
  const [price, setPrice] = useState("");
  const [discount, setDiscount] = useState("");
  const finalPrice = price && discount ? parseFloat(price) - (parseFloat(price) * parseFloat(discount) / 100) : 0;

  return (
    <div className="space-y-4 max-w-md mx-auto">
      <input type="number" value={price} onChange={(e)=>setPrice(e.target.value)} placeholder="Original Price (₹)" className="w-full p-2 border rounded" />
      <input type="number" value={discount} onChange={(e)=>setDiscount(e.target.value)} placeholder="Discount (%)" className="w-full p-2 border rounded" />
      <div className="p-4 bg-green-50 dark:bg-green-900/20 rounded-lg text-center">
        <p className="text-lg font-bold">Final Price: ₹{finalPrice.toFixed(2)}</p>
        <p className="text-sm">You save: ₹{(parseFloat(price || "0") - finalPrice).toFixed(2)}</p>
      </div>
    </div>
  );
}