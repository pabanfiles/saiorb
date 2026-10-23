"use client";

import React, { useState } from "react";
import { Plus, Trash2 } from "lucide-react";
import { toast } from "sonner";

export default function AdminFaqsPage() {
  const [faqsList, setFaqsList] = useState([
    {
      id: "faq_1",
      question: "What is SaiOrb and is it completely free?",
      answer: "Yes, SaiOrb is a 100% free online portal offering 128 utility tools for PDF, images, videos, documents, and calculations.",
    },
    {
      id: "faq_2",
      question: "Are my uploaded files or documents saved on your servers?",
      answer: "Never. Our client-side tools run strictly within your browser's local memory. No files are transmitted to or stored on remote servers.",
    },
    {
      id: "faq_3",
      question: "Can I use SaiOrb tools on mobile phones and tablets?",
      answer: "Yes, SaiOrb is mobile-first, responsive, and works smoothly on Android, iOS, Windows, Mac, and Linux across all modern browsers.",
    },
  ]);

  const [newQ, setNewQ] = useState({ q: "", a: "" });

  const handleAddFaq = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newQ.q.trim() || !newQ.a.trim()) {
      toast.error("Please provide both Question and Answer text.");
      return;
    }
    setFaqsList([
      ...faqsList,
      {
        id: "faq_" + Math.random().toString(36).substring(7),
        question: newQ.q.trim(),
        answer: newQ.a.trim(),
      },
    ]);
    setNewQ({ q: "", a: "" });
    toast.success("FAQ added successfully!");
  };

  return (
    <div className="space-y-6 text-gray-900">
      <div>
        <h1 className="text-xl sm:text-2xl font-bold text-gray-900">Frequently Asked Questions (FAQ Manager)</h1>
        <p className="text-xs text-gray-500 mt-0.5">Manage global questions and support knowledge base items</p>
      </div>

      <form
        onSubmit={handleAddFaq}
        className="p-5 bg-white border border-gray-200 rounded-lg space-y-3 shadow-2xs"
      >
        <h2 className="text-sm font-bold text-gray-900">Add New FAQ Item</h2>
        <input
          type="text"
          value={newQ.q}
          onChange={(e) => setNewQ({ ...newQ, q: e.target.value })}
          placeholder="Question (e.g., Does SaiOrb require an account?)..."
          className="w-full px-3.5 py-2 text-sm bg-gray-50 border border-gray-300 rounded-md"
        />
        <textarea
          rows={2}
          value={newQ.a}
          onChange={(e) => setNewQ({ ...newQ, a: e.target.value })}
          placeholder="Answer explanation..."
          className="w-full px-3.5 py-2 text-sm bg-gray-50 border border-gray-300 rounded-md"
        />
        <button
          type="submit"
          className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-md text-xs font-semibold flex items-center gap-1.5 shadow-xs transition cursor-pointer"
        >
          <Plus className="w-4 h-4" /> Save FAQ
        </button>
      </form>

      <div className="space-y-3">
        {faqsList.map((faq) => (
          <div
            key={faq.id}
            className="p-4 bg-white border border-gray-200 rounded-lg flex items-start justify-between gap-4 shadow-2xs"
          >
            <div className="space-y-1">
              <h3 className="font-bold text-sm text-gray-900">{faq.question}</h3>
              <p className="text-xs text-gray-600 leading-relaxed">{faq.answer}</p>
            </div>
            <button
              onClick={() => {
                setFaqsList(faqsList.filter((f) => f.id !== faq.id));
                toast.success("FAQ deleted.");
              }}
              className="p-1.5 text-red-500 hover:bg-red-50 rounded shrink-0 cursor-pointer"
            >
              <Trash2 className="w-4 h-4" />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
