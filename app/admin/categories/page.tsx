"use client";

import React, { useState } from "react";
import { CATEGORIES } from "@/lib/tools-data";
import { FolderTree, Save } from "lucide-react";
import { toast } from "sonner";

export default function AdminCategoriesPage() {
  const [categories] = useState(CATEGORIES);

  return (
    <div className="space-y-6 text-gray-900">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
        <div>
          <h1 className="text-xl sm:text-2xl font-bold text-gray-900">Categories (12 Collections)</h1>
          <p className="text-xs text-gray-500 mt-0.5">Primary tool categories, naming structures, and collection definitions</p>
        </div>
        <button
          onClick={() => toast.info("Category arrangement saved successfully.")}
          className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-md text-xs font-semibold flex items-center gap-1.5 shadow-xs transition cursor-pointer"
        >
          <Save className="w-4 h-4" />
          Save Order
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {categories.map((cat, idx) => (
          <div
            key={cat.id}
            className="p-5 bg-white border border-gray-200 rounded-lg space-y-3 shadow-2xs"
          >
            <div className="flex items-center justify-between">
              <span className="w-7 h-7 rounded-md bg-blue-50 text-blue-700 font-bold text-xs flex items-center justify-center border border-blue-200">
                {idx + 1}
              </span>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-gray-100 text-gray-600">
                /{cat.slug}
              </span>
            </div>

            <div>
              <h3 className="font-bold text-base text-gray-900">{cat.name_en}</h3>
            </div>

            <p className="text-xs text-gray-600 leading-relaxed line-clamp-2">
              {cat.description_en}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
