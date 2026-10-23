"use client";
import { useState } from "react";

export default function ResumeBuilderTool() {
  const [name, setName] = useState("");
  const [role, setRole] = useState("");
  const [exp, setExp] = useState("");

  return (
    <div className="space-y-4 max-w-2xl mx-auto">
      <input value={name} onChange={(e)=>setName(e.target.value)} placeholder="Full Name" className="w-full p-2 border rounded" />
      <input value={role} onChange={(e)=>setRole(e.target.value)} placeholder="Job Role" className="w-full p-2 border rounded" />
      <textarea value={exp} onChange={(e)=>setExp(e.target.value)} placeholder="Experience..." className="w-full p-2 border rounded h-32" />
      <div className="border p-6 rounded-lg bg-white">
        <h1 className="text-2xl font-bold">{name || "Your Name"}</h1>
        <p className="text-blue-600">{role || "Role"}</p>
        <p className="mt-3 whitespace-pre-wrap text-sm">{exp}</p>
      </div>
      <button onClick={() => window.print()} className="w-full bg-green-600 text-white py-2 rounded">Print / Save PDF</button>
    </div>
  );
}