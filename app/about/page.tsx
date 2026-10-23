"use client";

import React from "react";
import { Sparkles, Shield, Zap, Users } from "lucide-react";
import Link from "next/link";

export default function AboutPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 space-y-10 text-gray-900">
      <div className="space-y-3 text-center">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-50 border border-blue-200 text-blue-700 text-xs font-semibold">
          <Sparkles className="w-3.5 h-3.5" />
          <span>About Us</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-extrabold text-gray-900">
          About SaiOrb
        </h1>
        <p className="text-sm sm:text-base text-gray-600 max-w-xl mx-auto">
          All tools in one place — built for high-performance, privacy-first computing with zero server uploads.
        </p>
      </div>

      <div className="p-6 sm:p-8 bg-white border border-gray-200 rounded-lg space-y-6 text-gray-700 text-sm sm:text-base leading-relaxed shadow-xs">
        <h2 className="text-xl font-bold text-gray-900">Our Mission & Architecture</h2>
        <p>
          In the digital world, everyday productivity tasks frequently require hopping between disjointed utility sites—whether to merge PDF documents, resize application photos to exact byte thresholds, format tabular spreadsheets, or generate UPI QR payment codes. Many websites force unnecessary sign-ups, intrude with tracking cookies, and upload confidential files to external servers.
        </p>
        <p>
          <strong>SaiOrb</strong> was developed to provide a unified, clean, and reliable alternative. We brought 128 of the most critical digital utility tools under one single roof, prioritizing <em>Client-Side Browser Execution</em>. Using WebAssembly, Canvas rendering, and modern browser APIs, your documents and photos are processed in local memory without leaving your device.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4">
          <div className="p-4 bg-gray-50 rounded-lg border border-gray-200 text-center space-y-1">
            <p className="text-2xl font-extrabold text-blue-600">128</p>
            <p className="text-xs text-gray-500 font-semibold">Utility Tools</p>
          </div>
          <div className="p-4 bg-gray-50 rounded-lg border border-gray-200 text-center space-y-1">
            <p className="text-2xl font-extrabold text-emerald-600">100%</p>
            <p className="text-xs text-gray-500 font-semibold">Free & No Login</p>
          </div>
          <div className="p-4 bg-gray-50 rounded-lg border border-gray-200 text-center space-y-1">
            <p className="text-2xl font-extrabold text-indigo-600">0 Bytes</p>
            <p className="text-xs text-gray-500 font-semibold">Server Storage</p>
          </div>
        </div>

        <div className="pt-4 text-center">
          <Link
            href="/tools"
            className="inline-flex items-center justify-center px-6 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-md text-sm transition shadow-xs"
          >
            Explore All 128 Tools
          </Link>
        </div>
      </div>
    </div>
  );
}
