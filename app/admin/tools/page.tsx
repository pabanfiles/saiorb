"use client";

import React, { useState } from "react";
import { ALL_TOOLS, CATEGORIES } from "@/lib/tools-data";
import { Search, Star, Shield, Zap, Save } from "lucide-react";
import { toast } from "sonner";

export default function AdminToolsManager() {
  const [toolsList, setToolsList] = useState(
    ALL_TOOLS.map((t) => ({ ...t, is_active: true, custom_seo_title: "" }))
  );
  const [search, setSearch] = useState("");
  const [selectedCat, setSelectedCat] = useState("all");

  const filtered = toolsList.filter((t) => {
    const matchCat = selectedCat === "all" || t.categoryId === selectedCat;
    const matchSearch =
      !search ||
      t.name_en.toLowerCase().includes(search.toLowerCase()) ||
      t.slug.toLowerCase().includes(search.toLowerCase());
    return matchCat && matchSearch;
  });

  const toggleStatus = (id: string) => {
    setToolsList((prev) =>
      prev.map((t) => (t.id === id ? { ...t, is_active: !t.is_active } : t))
    );
    toast.success("Tool status updated successfully!");
  };

  const toggleFeatured = (id: string) => {
    setToolsList((prev) =>
      prev.map((t) => (t.id === id ? { ...t, isFeatured: !t.isFeatured } : t))
    );
    toast.success("Featured status updated!");
  };

  return (
    <div className="space-y-6 text-gray-900">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
        <div>
          <h1 className="text-xl sm:text-2xl font-bold text-gray-900">Tools Manager (128 Tools)</h1>
          <p className="text-xs text-gray-500 mt-0.5">Manage availability, homepage featured flags, and parameters for all 128 tools</p>
        </div>
        <button
          onClick={() => toast.success("All configuration changes saved successfully!")}
          className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-md text-xs font-semibold flex items-center gap-1.5 shadow-xs transition"
        >
          <Save className="w-4 h-4" />
          Save Changes
        </button>
      </div>

      {/* Filter and Search */}
      <div className="p-4 bg-white border border-gray-200 rounded-lg flex flex-col sm:flex-row gap-3 shadow-2xs">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-2.5 w-4 h-4 text-gray-400" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by tool name or URL slug..."
            className="w-full pl-9 pr-4 py-2 bg-gray-50 border border-gray-300 rounded-md text-xs sm:text-sm focus:outline-none focus:border-blue-600"
          />
        </div>

        <select
          value={selectedCat}
          onChange={(e) => setSelectedCat(e.target.value)}
          className="bg-gray-50 border border-gray-300 rounded-md px-3 py-2 text-xs sm:text-sm text-gray-700 focus:outline-none"
        >
          <option value="all">All Categories ({CATEGORIES.length})</option>
          {CATEGORIES.map((c) => (
            <option key={c.id} value={c.id}>
              {c.name_en}
            </option>
          ))}
        </select>
      </div>

      {/* Tools Table */}
      <div className="bg-white border border-gray-200 rounded-lg overflow-hidden shadow-xs">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-gray-50 border-b border-gray-200 text-gray-500 font-semibold uppercase tracking-wider">
              <tr>
                <th className="p-3.5">Tool Name & Slug</th>
                <th className="p-3.5">Category</th>
                <th className="p-3.5">Architecture</th>
                <th className="p-3.5">Featured</th>
                <th className="p-3.5">Status</th>
                <th className="p-3.5 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {filtered.map((tool) => (
                <tr key={tool.id} className="hover:bg-gray-50/80 transition">
                  <td className="p-3.5">
                    <p className="font-bold text-gray-900">{tool.name_en}</p>
                    <p className="text-[11px] text-gray-400 font-mono">
                      /{tool.slug}
                    </p>
                  </td>
                  <td className="p-3.5">
                    <span className="px-2 py-0.5 rounded bg-gray-100 font-medium text-gray-700">
                      {tool.categoryId}
                    </span>
                  </td>
                  <td className="p-3.5">
                    {tool.isClientSide ? (
                      <span className="text-emerald-700 font-semibold flex items-center gap-1">
                        <Shield className="w-3 h-3 text-emerald-600" /> Browser
                      </span>
                    ) : (
                      <span className="text-blue-700 font-semibold flex items-center gap-1">
                        <Zap className="w-3 h-3 text-blue-600" /> Cloud
                      </span>
                    )}
                  </td>
                  <td className="p-3.5">
                    <button
                      onClick={() => toggleFeatured(tool.id)}
                      className={`p-1.5 rounded border transition cursor-pointer ${
                        tool.isFeatured
                          ? "bg-amber-50 text-amber-600 border-amber-300"
                          : "text-gray-400 border-transparent hover:border-gray-300"
                      }`}
                      title="Toggle Featured"
                    >
                      <Star className={`w-3.5 h-3.5 ${tool.isFeatured ? "fill-amber-500" : ""}`} />
                    </button>
                  </td>
                  <td className="p-3.5">
                    <span
                      className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                        tool.is_active
                          ? "bg-emerald-100 text-emerald-800"
                          : "bg-red-100 text-red-800"
                      }`}
                    >
                      {tool.is_active ? "Active" : "Disabled"}
                    </span>
                  </td>
                  <td className="p-3.5 text-right">
                    <button
                      onClick={() => toggleStatus(tool.id)}
                      className="px-2.5 py-1 text-gray-700 hover:bg-gray-100 rounded border border-gray-200 text-xs font-semibold cursor-pointer"
                    >
                      {tool.is_active ? "Disable" : "Enable"}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
