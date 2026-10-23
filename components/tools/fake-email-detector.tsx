"use client";
import { useState } from "react";

export default function FakeEmailDetectorTool() {
  const [email, setEmail] = useState("");
  const disposable = ["tempmail.com", "guerrillamail.com", "10minutemail.com", "mailinator.com"];
  const isFake = disposable.some(d => email.toLowerCase().includes(d));

  return (
    <div className="space-y-4 max-w-md mx-auto">
      <input value={email} onChange={(e)=>setEmail(e.target.value)} placeholder="Enter email address" className="w-full p-2 border rounded" />
      {email && (
        <div className={`p-4 rounded-lg text-center ${isFake ? "bg-red-50 text-red-700" : "bg-green-50 text-green-700"}`}>
          {isFake ? "⚠️ Disposable Email Detected" : "✅ Looks like a valid email"}
        </div>
      )}
    </div>
  );
}