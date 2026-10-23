import React from "react";
import { Metadata } from "next";
import { ShieldCheck, Lock, CheckCircle2 } from "lucide-react";

export const metadata: Metadata = {
  title: "Privacy Policy | SaiOrb",
  description: "SaiOrb Privacy Policy - Client-side processing and zero server uploads guarantee.",
};

export default function PrivacyPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 space-y-8 text-gray-900">
      <div className="space-y-2">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-semibold">
          <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
          <span>Data Protection & Privacy</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-bold text-gray-900">
          Privacy Policy
        </h1>
        <p className="text-xs text-gray-500">Effective Date: October 2026</p>
      </div>

      <div className="p-6 sm:p-8 bg-white border border-gray-200 rounded-lg space-y-6 text-sm sm:text-base leading-relaxed text-gray-700 shadow-xs">
        <h2 className="text-lg font-bold text-gray-900">1. Core Philosophy: Client-Side Browser Processing</h2>
        <p>
          SaiOrb is engineered around a strict privacy-first model. The majority of our 128 tools (including PDF Merge, Image Compressor, Photo Resizer, QR Generator, and Document tools) run 100% in your local web browser memory using standard HTML5 Canvas, WebAssembly, and modern browser APIs.
        </p>
        <p>
          This ensures that your files, photos, or confidential records are never transmitted across the network to our remote servers. All operations conclude directly inside your device sandbox and are cleared when the session closes.
        </p>

        <h2 className="text-lg font-bold text-gray-900">2. Server-Assisted Tools & Garbage Collection</h2>
        <p>
          For tools that require worker-assisted conversion or machine learning, temporary streams are processed in secure memory buffers. All temporary objects are strictly purged and permanently deleted within 1 hour. We do not maintain any long-term repository of user files.
        </p>

        <h2 className="text-lg font-bold text-gray-900">3. Cookies & Local Storage</h2>
        <p>
          We use browser LocalStorage solely to preserve user interface preferences (such as light/dark mode and search filtering states). We do not deploy invasive third-party ad tracking or cross-site profiling scripts.
        </p>

        <h2 className="text-lg font-bold text-gray-900">4. Contact Information</h2>
        <p>
          If you have any questions or concerns regarding our privacy practices, please contact our team at: <strong>privacy@saiorb.com</strong>
        </p>
      </div>
    </div>
  );
}
