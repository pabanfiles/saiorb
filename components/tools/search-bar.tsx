"use client";

import React, { useState, useMemo } from "react";
import Link from "next/link";
import { Search, X, ShieldCheck, Zap, ArrowRight } from "lucide-react";
import { ALL_TOOLS, CATEGORIES, ToolDefinition } from "@/lib/tools-data";

interface SearchBarProps {
  initialCategory?: string;
  autoFocus?: boolean;
}

export default function SearchBar({ initialCategory = "all", autoFocus = false }: SearchBarProps) {
  const [query, setQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState(initialCategory);

  const filteredTools = useMemo(() => {
    let list = ALL_TOOLS;

    if (selectedCategory !== "all") {
      list = list.filter((t) => t.categoryId === selectedCategory);
    }

    if (!query.trim()) {
      return list;
    }

    const q = query.toLowerCase().trim();
    return list.filter((t) => {
      return (
        t.name_en.toLowerCase().includes(q) ||
        t.description_en.toLowerCase().includes(q) ||
        t.slug.toLowerCase().includes(q) ||
        t.tags.some((tag) => tag.toLowerCase().includes(q))
      );
    });
  }, [query, selectedCategory]);

  return (
    <div className="w-full max-w-4xl mx-auto space-y-4">
      {/* Search Input Box */}
      <div className="relative flex items-center">
        <Search className="absolute left-4 w-5 h-5 text-gray-400 pointer-events-none" />
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search tools (e.g., PDF Merge, Image Compress, Voter Photo, UPI QR)..."
          autoFocus={autoFocus}
          className="w-full pl-11 pr-10 py-3 bg-white border border-gray-300 focus:border-blue-600 focus:ring-2 focus:ring-blue-100 rounded-lg shadow-xs text-sm sm:text-base text-gray-900 focus:outline-none transition placeholder:text-gray-400"
        />
        {query && (
          <button
            onClick={() => setQuery("")}
            className="absolute right-3.5 p-1 text-gray-400 hover:text-gray-600 rounded"
            aria-label="Clear input"
          >
            <X className="w-4 h-4" />
          </button>
        )}
      </div>

      {/* Category Filter Pills */}
      <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none text-xs">
        <button
          onClick={() => setSelectedCategory("all")}
          className={`px-3 py-1.5 rounded-full font-medium transition whitespace-nowrap ${
            selectedCategory === "all"
              ? "bg-blue-600 text-white font-semibold"
              : "bg-gray-100 text-gray-700 hover:bg-gray-200"
          }`}
        >
          All (128)
        </button>

        {CATEGORIES.map((cat) => (
          <button
            key={cat.id}
            onClick={() => setSelectedCategory(cat.id)}
            className={`px-3 py-1.5 rounded-full font-medium transition whitespace-nowrap ${
              selectedCategory === cat.id
                ? "bg-blue-600 text-white font-semibold"
                : "bg-gray-100 text-gray-700 hover:bg-gray-200"
            }`}
          >
            {cat.name_en}
          </button>
        ))}
      </div>

      {/* Result Stats */}
      <div className="flex items-center justify-between text-xs text-gray-500 px-1">
        <span>
          Found <strong className="text-gray-900">{filteredTools.length}</strong> matching tools
        </span>
        {query && (
          <button
            onClick={() => {
              setQuery("");
              setSelectedCategory("all");
            }}
            className="text-blue-600 hover:underline"
          >
            Clear Search
          </button>
        )}
      </div>

      {/* Instant Result Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 pt-1">
        {filteredTools.slice(0, 24).map((tool) => (
          <div
            key={tool.id}
            className="p-4 bg-white border border-gray-200 hover:border-gray-300 rounded-lg shadow-2xs hover:shadow-xs transition flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between mb-1.5">
                <span className="text-[10px] font-bold uppercase tracking-wider text-gray-500 bg-gray-100 px-1.5 py-0.5 rounded">
                  {tool.categoryId}
                </span>
                {tool.isClientSide ? (
                  <span className="flex items-center gap-1 text-[10px] text-emerald-700 font-semibold">
                    <ShieldCheck className="w-3 h-3 text-emerald-600" /> Browser
                  </span>
                ) : (
                  <span className="flex items-center gap-1 text-[10px] text-blue-700 font-semibold">
                    <Zap className="w-3 h-3 text-blue-600" /> Cloud
                  </span>
                )}
              </div>
              <h4 className="font-bold text-sm text-gray-900 leading-snug">
                {tool.name_en}
              </h4>
              <p className="text-xs text-gray-600 line-clamp-2 mt-1 leading-relaxed">
                {tool.description_en}
              </p>
            </div>

            <div className="mt-3 pt-2.5 border-t border-gray-100">
              <Link
                href={`/${tool.slug}`}
                className="w-full inline-flex items-center justify-center gap-1 py-1.5 px-3 bg-blue-600 hover:bg-blue-700 text-white rounded text-xs font-semibold transition"
              >
                <span>Launch Now</span>
                <ArrowRight className="w-3 h-3" />
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
