import React from "react";
import { Metadata } from "next";
import { AlertTriangle } from "lucide-react";

export const metadata: Metadata = {
  title: "Legal Disclaimer | SaiOrb",
  description: "SaiOrb Legal Disclaimer regarding government guidelines, copyright, and utility usage.",
};

export default function DisclaimerPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 space-y-8 text-gray-900">
      <div className="space-y-2">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-50 border border-amber-300 text-amber-900 text-xs font-semibold">
          <AlertTriangle className="w-3.5 h-3.5 text-amber-600" />
          <span>Statutory Notice & Compliance</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-bold text-gray-900">
          Legal Disclaimer
        </h1>
        <p className="text-xs text-gray-500">Effective Date: October 2026</p>
      </div>

      <div className="p-6 sm:p-8 bg-white border border-gray-200 rounded-lg space-y-6 text-sm sm:text-base leading-relaxed text-gray-700 shadow-xs">
        <h2 className="text-lg font-bold text-gray-900">1. Independent Utility Platform Declaration</h2>
        <p>
          SaiOrb is an independent private web utility platform and is not affiliated with, endorsed by, or representing any government body, ministry, or commission (such as the Election Commission of India, UIDAI, NSDL, or State Public Service Commissions).
        </p>
        <p>
          Our sizing tools (e.g., 50KB photo cropper, 213x213 pixel resizers) are independent technical utilities built solely to assist users in preparing images and documents to meet standard digital specifications prescribed in public portal application guidelines.
        </p>

        <h2 className="text-lg font-bold text-gray-900">2. Copyright Notice (Indian Copyright Act, 1957 Compliance)</h2>
        <p>
          Under the Indian Copyright Act, 1957, reproducing, downloading, or redistributing copyrighted audiovisual media, music recordings, or photographs without authorization from the copyright holder is strictly prohibited and legally actionable.
        </p>
        <p className="p-4 bg-amber-50 border border-amber-300 rounded-md text-xs sm:text-sm text-amber-950">
          <strong>Mandatory Notice:</strong> SaiOrb media tools are strictly designated for personal backup of user-authored creations, fair-use analysis (Section 52), educational evaluation, or content in the public domain. Users are solely responsible for ensuring they possess legitimate legal rights or explicit consent before processing external media links.
        </p>
      </div>
    </div>
  );
}
