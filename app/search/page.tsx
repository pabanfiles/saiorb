"use client";

import React, { Suspense } from "react";
import SearchBar from "@/components/tools/search-bar";
import { Sparkles } from "lucide-react";

export default function SearchPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-14 space-y-6 text-gray-900">
      <div className="text-center space-y-2">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-50 text-blue-700 text-xs font-semibold">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Fast Tool Finder</span>
        </div>
        <h1 className="text-2xl sm:text-4xl font-bold text-gray-900">
          Search All 128 Tools
        </h1>
        <p className="text-xs sm:text-sm text-gray-600 max-w-lg mx-auto">
          Type any keyword, file format, or task to find the matching browser tool immediately.
        </p>
      </div>

      <Suspense fallback={<div className="text-center text-sm text-gray-500 py-6">Loading search results...</div>}>
        <SearchBar autoFocus />
      </Suspense>
    </div>
  );
}
