"use client";

import React, { useState, useMemo } from "react";
import Link from "next/link";
import {
  Search,
  ShieldCheck,
  Zap,
  ArrowRight,
  ExternalLink,
  SlidersHorizontal,
  X,
} from "lucide-react";
import { CATEGORIES, ALL_TOOLS, ToolDefinition } from "@/lib/tools-data";

export default function HomePage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");

  const filteredTools = useMemo(() => {
    let list = ALL_TOOLS;

    if (selectedCategory !== "all") {
      list = list.filter((t) => t.categoryId === selectedCategory);
    }

    if (!searchQuery.trim()) return list;

    const q = searchQuery.toLowerCase().trim();
    return list.filter((t) => {
      return (
        t.name_en.toLowerCase().includes(q) ||
        t.description_en.toLowerCase().includes(q) ||
        t.slug.toLowerCase().includes(q) ||
        t.tags.some((tag) => tag.toLowerCase().includes(q))
      );
    });
  }, [searchQuery, selectedCategory]);

  return (
    <div className="bg-gray-50 min-h-screen text-gray-900">
      {/* Clean Google-style Hero & Search Header */}
      <section className="bg-white border-b border-gray-200 py-10 sm:py-14 px-4 text-center">
        <div className="max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 border border-blue-200 text-blue-700 text-xs font-semibold">
            <span>128 Digital Utility Tools</span>
            <span>•</span>
            <span>100% Free & Secure</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-bold tracking-tight text-gray-900">
            SaiOrb Tools
          </h1>

          <p className="text-sm sm:text-base text-gray-600 font-medium max-w-2xl mx-auto">
            All tools in one place. No file uploads to servers, 100% private and browser-based.
          </p>

          {/* Prominent Google-like Search Bar */}
          <div className="pt-2 max-w-2xl mx-auto">
            <div className="relative flex items-center">
              <Search className="absolute left-4 w-5 h-5 text-gray-400 pointer-events-none" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search tools (e.g., PDF Merge, Photo Resize)"
                className="w-full pl-11 pr-10 py-3 sm:py-3.5 bg-white border border-gray-300 rounded-full shadow-xs text-sm sm:text-base text-gray-900 focus:border-blue-600 focus:ring-2 focus:ring-blue-100 focus:outline-none transition placeholder:text-gray-400"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery("")}
                  className="absolute right-4 p-1 rounded-full hover:bg-gray-100 text-gray-400 hover:text-gray-600"
                  aria-label="Clear search"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>

            {searchQuery && (
              <p className="text-xs text-gray-500 mt-2 text-left px-2">
                Search results: <span className="font-semibold text-gray-900">{filteredTools.length}</span> tools found
              </p>
            )}
          </div>

          {/* Popular searches in English */}
          <div className="flex flex-wrap items-center justify-center gap-1.5 pt-2 text-xs">
            <span className="text-gray-500 font-medium">Popular:</span>
            {[
              { label: "PDF Merge", href: "/pdf-merge" },
              { label: "Image Compress", href: "/image-compress" },
              { label: "Voter Photo (50KB)", href: "/voter-id-photo" },
              { label: "PAN Photo (213px)", href: "/pan-photo" },
              { label: "UPI QR Code", href: "/qr-generator" },
              { label: "Video & Reels Utility", href: "/social-media-downloader" },
            ].map((item, idx) => (
              <Link
                key={idx}
                href={item.href}
                className="px-2.5 py-1 bg-gray-100 hover:bg-gray-200 border border-gray-200 rounded-md text-gray-700 font-medium transition"
              >
                {item.label}
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Category Pills Navigation */}
      <div className="bg-white border-b border-gray-200 sticky top-15 z-40 px-4 py-2.5 overflow-x-auto scrollbar-none">
        <div className="max-w-7xl mx-auto flex items-center gap-1.5 min-w-max text-xs">
          <button
            onClick={() => setSelectedCategory("all")}
            className={`px-3 py-1.5 rounded-full font-medium transition ${
              selectedCategory === "all"
                ? "bg-blue-600 text-white font-semibold"
                : "bg-gray-100 text-gray-700 hover:bg-gray-200"
            }`}
          >
            All Categories (128)
          </button>
          {CATEGORIES.map((cat) => {
            const count = ALL_TOOLS.filter((t) => t.categoryId === cat.id).length;
            const isSelected = selectedCategory === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-3 py-1.5 rounded-full font-medium transition flex items-center gap-1 ${
                  isSelected
                    ? "bg-blue-600 text-white font-semibold"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
              >
                <span>{cat.name_en}</span>
                <span className={`text-[10px] ${isSelected ? "text-blue-100" : "text-gray-400"}`}>
                  ({count})
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Main Tools Container */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-12">
        {/* If search query or specific category is selected, show filtered grid */}
        {searchQuery || selectedCategory !== "all" ? (
          <div className="space-y-4">
            <div className="flex items-center justify-between border-b border-gray-200 pb-2">
              <h2 className="text-lg font-bold text-gray-900">
                {selectedCategory !== "all"
                  ? `${CATEGORIES.find((c) => c.id === selectedCategory)?.name_en || "Selected Category"} (${filteredTools.length} Tools)`
                  : `Filtered Results (${filteredTools.length} Tools)`}
              </h2>
              {(searchQuery || selectedCategory !== "all") && (
                <button
                  onClick={() => {
                    setSearchQuery("");
                    setSelectedCategory("all");
                  }}
                  className="text-xs text-blue-600 hover:underline font-medium"
                >
                  Reset Filters
                </button>
              )}
            </div>
            {filteredTools.length === 0 ? (
              <div className="p-12 text-center bg-white rounded-lg border border-gray-200 space-y-2">
                <p className="text-sm font-semibold text-gray-700">No matching tools found</p>
                <p className="text-xs text-gray-500">Try searching for keywords like &quot;PDF&quot;, &quot;image&quot;, &quot;compress&quot;, or &quot;resize&quot;.</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                {filteredTools.map((tool) => (
                  <ToolCard key={tool.id} tool={tool} />
                ))}
              </div>
            )}
          </div>
        ) : (
          /* Normal Category-by-Category Clean Display */
          <div className="space-y-12">
            {CATEGORIES.map((category) => {
              const toolsInCat = ALL_TOOLS.filter((t) => t.categoryId === category.id);
              return (
                <section key={category.id} id={category.id} className="space-y-4 scroll-mt-28">
                  {/* Category Header */}
                  <div className="flex flex-col sm:flex-row sm:items-baseline justify-between border-b border-gray-200 pb-2.5 gap-1">
                    <div>
                      <h2 className="text-xl font-bold text-gray-900">
                        {category.name_en}
                      </h2>
                      <p className="text-xs text-gray-600 mt-0.5">{category.description_en}</p>
                    </div>
                    <span className="text-xs font-semibold text-gray-500">
                      {toolsInCat.length} Tools
                    </span>
                  </div>

                  {/* Grid of Tools in this category */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3.5">
                    {toolsInCat.map((tool) => (
                      <ToolCard key={tool.id} tool={tool} />
                    ))}
                  </div>
                </section>
              );
            })}
          </div>
        )}

        {/* Client Privacy Architecture Notice */}
        <section className="bg-white border border-gray-200 rounded-lg p-5 space-y-2 text-xs text-gray-600">
          <div className="flex items-center gap-2 font-bold text-gray-900">
            <ShieldCheck className="w-4 h-4 text-emerald-600" />
            <span>Zero-Knowledge Browser Architecture</span>
          </div>
          <p className="leading-relaxed">
            All client-side tools execute directly in your web browser&apos;s memory using WebAssembly and standard HTML5 Canvas APIs. Your files, documents, and images are never uploaded or retained on any remote server, guaranteeing complete privacy and confidentiality.
          </p>
        </section>
      </main>
    </div>
  );
}

function ToolCard({ tool }: { tool: ToolDefinition }) {
  return (
    <div className="bg-white border border-gray-200 hover:border-gray-300 rounded-lg p-4 flex flex-col justify-between shadow-2xs hover:shadow-xs transition">
      <div>
        <div className="flex items-center justify-between mb-1.5">
          <span className="text-[10px] font-bold uppercase tracking-wider text-gray-500 bg-gray-100 px-1.5 py-0.5 rounded">
            {tool.categoryId}
          </span>
          {tool.isClientSide ? (
            <span className="text-[10px] text-emerald-700 font-semibold flex items-center gap-0.5" title="100% Browser Execution">
              <ShieldCheck className="w-3 h-3 text-emerald-600" /> Browser
            </span>
          ) : (
            <span className="text-[10px] text-blue-700 font-semibold flex items-center gap-0.5" title="Cloud Stream Utility">
              <Zap className="w-3 h-3 text-blue-600" /> Cloud
            </span>
          )}
        </div>

        <h3 className="text-sm font-bold text-gray-900 leading-snug">
          {tool.name_en}
        </h3>

        <p className="text-xs text-gray-600 line-clamp-2 leading-relaxed mt-1">
          {tool.description_en}
        </p>
      </div>

      <div className="mt-3.5 pt-2.5 border-t border-gray-100 flex items-center justify-between">
        <Link
          href={`/${tool.slug}`}
          className="w-full inline-flex items-center justify-center gap-1.5 py-2 px-3 bg-blue-600 hover:bg-blue-700 text-white rounded-md text-xs font-semibold transition"
        >
          <span>Launch Now</span>
          <ArrowRight className="w-3 h-3" />
        </Link>
      </div>
    </div>
  );
}
