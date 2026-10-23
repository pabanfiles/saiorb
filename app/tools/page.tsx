"use client";

import React, { useState, useMemo } from "react";
import Link from "next/link";
import { ALL_TOOLS, CATEGORIES, ToolDefinition } from "@/lib/tools-data";
import { Search, ShieldCheck, Zap, ArrowRight, Layers, X } from "lucide-react";

export default function AllToolsPage() {
  const [selectedCat, setSelectedCat] = useState<string>("all");
  const [filterType, setFilterType] = useState<"all" | "client" | "server">("all");
  const [searchQuery, setSearchQuery] = useState("");

  const filtered = useMemo(() => {
    return ALL_TOOLS.filter((t) => {
      const matchCat = selectedCat === "all" || t.categoryId === selectedCat;
      const matchType =
        filterType === "all" ||
        (filterType === "client" && t.isClientSide) ||
        (filterType === "server" && t.isServerSide);
      const matchQuery =
        !searchQuery.trim() ||
        t.name_en.toLowerCase().includes(searchQuery.toLowerCase()) ||
        t.description_en.toLowerCase().includes(searchQuery.toLowerCase()) ||
        t.slug.toLowerCase().includes(searchQuery.toLowerCase()) ||
        t.tags.some((tag) => tag.toLowerCase().includes(searchQuery.toLowerCase()));

      return matchCat && matchType && matchQuery;
    });
  }, [selectedCat, filterType, searchQuery]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-8 text-gray-900">
      {/* Page Header */}
      <div className="space-y-2">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-50 border border-blue-200 text-blue-700 text-xs font-semibold">
          <Layers className="w-3.5 h-3.5" />
          <span>Full Directory • 128 Tools</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-bold text-gray-900">
          All 128 Digital Tools
        </h1>
        <p className="text-sm sm:text-base text-gray-600 max-w-2xl">
          Browse the complete directory of 128 tools tailored for productivity, document handling, photo editing, and utilities.
        </p>
      </div>

      {/* Filter and Search Bar */}
      <div className="p-4 bg-white border border-gray-200 rounded-lg shadow-xs space-y-4">
        {/* Search Input */}
        <div className="relative">
          <Search className="absolute left-3.5 top-3 w-4 h-4 text-gray-400 pointer-events-none" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search by name, category, or keyword (e.g. PDF, compress, QR)..."
            className="w-full pl-10 pr-10 py-2.5 bg-gray-50 border border-gray-300 rounded-md text-sm text-gray-900 focus:outline-none focus:border-blue-600"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery("")}
              className="absolute right-3 top-2.5 p-1 rounded hover:bg-gray-200 text-gray-400 hover:text-gray-600"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>

        {/* Filter Controls */}
        <div className="flex flex-wrap items-center justify-between gap-3 pt-1 border-t border-gray-100">
          {/* Architecture tabs */}
          <div className="flex items-center gap-1 text-xs">
            <span className="text-gray-500 font-medium mr-1">Type:</span>
            <button
              onClick={() => setFilterType("all")}
              className={`px-3 py-1.5 rounded-md font-medium transition ${
                filterType === "all"
                  ? "bg-blue-600 text-white font-semibold"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
            >
              All (128)
            </button>
            <button
              onClick={() => setFilterType("client")}
              className={`px-3 py-1.5 rounded-md font-medium transition ${
                filterType === "client"
                  ? "bg-blue-600 text-white font-semibold"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
            >
              100% Browser Client
            </button>
            <button
              onClick={() => setFilterType("server")}
              className={`px-3 py-1.5 rounded-md font-medium transition ${
                filterType === "server"
                  ? "bg-blue-600 text-white font-semibold"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
            >
              Cloud Processed
            </button>
          </div>

          {/* Category Dropdown */}
          <div className="flex items-center gap-2 text-xs">
            <span className="text-gray-500 font-medium">Category:</span>
            <select
              value={selectedCat}
              onChange={(e) => setSelectedCat(e.target.value)}
              className="bg-gray-50 border border-gray-300 rounded-md px-3 py-1.5 text-xs text-gray-700 focus:outline-none"
            >
              <option value="all">All Categories ({CATEGORIES.length})</option>
              {CATEGORIES.map((cat) => (
                <option key={cat.id} value={cat.id}>
                  {cat.name_en}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Grid of Results */}
      <div>
        <div className="flex items-center justify-between pb-3 text-xs text-gray-500">
          <span>Showing <strong className="text-gray-900">{filtered.length}</strong> of 128 tools</span>
        </div>

        {filtered.length === 0 ? (
          <div className="p-12 text-center bg-white rounded-lg border border-gray-200 space-y-2">
            <p className="text-sm font-semibold text-gray-700">No matching tools found</p>
            <p className="text-xs text-gray-500">Try broadening your search term or selecting another category.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {filtered.map((tool) => (
              <div
                key={tool.id}
                className="bg-white border border-gray-200 hover:border-gray-300 rounded-lg p-4 flex flex-col justify-between shadow-2xs hover:shadow-xs transition"
              >
                <div>
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-gray-500 bg-gray-100 px-1.5 py-0.5 rounded">
                      {tool.categoryId}
                    </span>
                    {tool.isClientSide ? (
                      <span className="text-[10px] text-emerald-700 font-semibold flex items-center gap-0.5">
                        <ShieldCheck className="w-3 h-3 text-emerald-600" /> Browser
                      </span>
                    ) : (
                      <span className="text-[10px] text-blue-700 font-semibold flex items-center gap-0.5">
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
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
