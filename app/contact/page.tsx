"use client";

import React, { useState } from "react";
import { Mail, MessageSquare, Send, CheckCircle2 } from "lucide-react";
import { toast } from "sonner";

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", message: "", category: "feedback" });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.message) {
      toast.error("Please fill in all required fields.");
      return;
    }
    setSubmitted(true);
    toast.success("Thank you! Your message has been received.");
  };

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 space-y-8 text-gray-900">
      <div className="space-y-2 text-center">
        <h1 className="text-3xl sm:text-4xl font-bold text-gray-900">Contact & Support</h1>
        <p className="text-sm text-gray-600 max-w-md mx-auto">
          Have tool suggestions, bug reports, or partnership inquiries? Get in touch with the SaiOrb engineering team.
        </p>
      </div>

      <div className="bg-white border border-gray-200 rounded-lg p-6 sm:p-8 shadow-xs">
        {submitted ? (
          <div className="text-center py-10 space-y-3">
            <div className="w-12 h-12 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-6 h-6" />
            </div>
            <h2 className="text-lg font-bold text-gray-900">Message Received!</h2>
            <p className="text-xs text-gray-600 max-w-sm mx-auto">
              We appreciate your feedback. Our support team will review your note and respond to {form.email} promptly.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1">Your Name *</label>
                <input
                  type="text"
                  required
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  placeholder="e.g. Alex Smith"
                  className="w-full px-3.5 py-2 text-sm bg-gray-50 border border-gray-300 rounded-md focus:outline-none focus:border-blue-600"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1">Email Address *</label>
                <input
                  type="email"
                  required
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  placeholder="alex@domain.com"
                  className="w-full px-3.5 py-2 text-sm bg-gray-50 border border-gray-300 rounded-md focus:outline-none focus:border-blue-600"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-gray-700 mb-1">Inquiry Topic</label>
              <select
                value={form.category}
                onChange={(e) => setForm({ ...form, category: e.target.value })}
                className="w-full px-3.5 py-2 text-sm bg-gray-50 border border-gray-300 rounded-md focus:outline-none"
              >
                <option value="feedback">General Feedback & Suggestions</option>
                <option value="bug">Bug Report / Tool Issue</option>
                <option value="feature">Request New Tool Feature</option>
                <option value="legal">Copyright & Legal Inquiries</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-gray-700 mb-1">Message *</label>
              <textarea
                rows={4}
                required
                value={form.message}
                onChange={(e) => setForm({ ...form, message: e.target.value })}
                placeholder="Describe your inquiry or question in detail..."
                className="w-full px-3.5 py-2 text-sm bg-gray-50 border border-gray-300 rounded-md focus:outline-none focus:border-blue-600"
              />
            </div>

            <button
              type="submit"
              className="w-full py-2.5 px-4 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-md text-xs sm:text-sm transition flex items-center justify-center gap-2 shadow-xs cursor-pointer"
            >
              <Send className="w-4 h-4" />
              <span>Send Message</span>
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
