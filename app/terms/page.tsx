import React from "react";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terms of Service | SaiOrb",
  description: "SaiOrb Terms of Service and acceptable use policy.",
};

export default function TermsPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 space-y-8 text-gray-900">
      <div className="space-y-2">
        <h1 className="text-3xl sm:text-4xl font-bold text-gray-900">
          Terms of Service
        </h1>
        <p className="text-xs text-gray-500">Effective Date: October 2026</p>
      </div>

      <div className="p-6 sm:p-8 bg-white border border-gray-200 rounded-lg space-y-6 text-sm sm:text-base leading-relaxed text-gray-700 shadow-xs">
        <h2 className="text-lg font-bold text-gray-900">1. Acceptable Use Policy</h2>
        <p>
          By accessing and using SaiOrb, you agree to comply with all applicable local, national, and international laws. You agree not to use any tool on this platform for unlawful, harmful, or fraudulent activities (including forgery, malicious code distribution, or copyright infringement).
        </p>

        <h2 className="text-lg font-bold text-gray-900">2. Disclaimer of Warranties</h2>
        <p>
          SaiOrb tools are provided on an &ldquo;as-is&rdquo; and &ldquo;as-available&rdquo; basis without warranties of any kind. While our algorithms are thoroughly engineered to deliver high precision for document conversion and image resizing, users are responsible for verifying dimensions and formatting prior to final official submission.
        </p>

        <h2 className="text-lg font-bold text-gray-900">3. Intellectual Property Rights</h2>
        <p>
          The SaiOrb brand, logos, software architecture, and interface designs are proprietary. However, you retain full ownership and intellectual property rights in all documents, images, and content you process using the tools.
        </p>

        <h2 className="text-lg font-bold text-gray-900">4. Modifications to Terms</h2>
        <p>
          We reserve the right to revise or update these terms to reflect feature additions or legal compliance requirements. Continued use of the platform denotes acceptance of any updated terms.
        </p>
      </div>
    </div>
  );
}
