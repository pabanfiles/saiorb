"use client";
import { useState } from "react";

export default function CertificateMakerTool() {
  const [name, setName] = useState("");
  const [course, setCourse] = useState("");
  return (
    <div className="space-y-4 max-w-2xl mx-auto">
      <input value={name} onChange={(e)=>setName(e.target.value)} placeholder="Recipient Name" className="w-full p-3 border rounded-lg dark:bg-gray-800 dark:border-gray-700" />
      <input value={course} onChange={(e)=>setCourse(e.target.value)} placeholder="Course / Achievement" className="w-full p-3 border rounded-lg dark:bg-gray-800 dark:border-gray-700" />
      <div className="border-8 border-double border-blue-600 p-12 text-center rounded-lg bg-white">
        <h1 className="text-2xl font-serif font-bold text-blue-800">Certificate of Completion</h1>
        <p className="mt-4 text-lg text-gray-700">This is to certify that</p>
        <p className="text-3xl font-bold text-blue-900 mt-2">{name || "Your Name"}</p>
        <p className="mt-2 text-gray-700">has successfully completed</p>
        <p className="text-xl font-semibold text-blue-700 mt-1">{course || "Course Name"}</p>
      </div>
      <button onClick={() => window.print()} className="w-full bg-green-600 text-white py-2 rounded">Print / Save as PDF</button>
    </div>
  );
}