"use client";
import { useState } from "react";

export default function LoanEligibilityTool() {
  const [income, setIncome] = useState("");
  const [expenses, setExpenses] = useState("");
  const maxEmi = (parseFloat(income) || 0) * 0.5;
  const eligibleEmi = maxEmi - (parseFloat(expenses) || 0);

  return (
    <div className="space-y-4 max-w-md mx-auto">
      <input type="number" value={income} onChange={(e)=>setIncome(e.target.value)} placeholder="Monthly Income (₹)" className="w-full p-2 border rounded" />
      <input type="number" value={expenses} onChange={(e)=>setExpenses(e.target.value)} placeholder="Monthly Expenses (₹)" className="w-full p-2 border rounded" />
      <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg text-center">
        <p className="text-sm">Maximum EMI You Can Pay</p>
        <p className="text-2xl font-bold text-blue-600">₹{Math.max(0, eligibleEmi).toFixed(2)}</p>
      </div>
    </div>
  );
}