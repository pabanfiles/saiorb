// components/tools/tool-renderer.tsx
"use client";

import { toolsRegistry } from "@/lib/tools-registry";
import { AlertCircle } from "lucide-react";

export function ToolRenderer({ slug }: { slug: string }) {
  const ToolComponent = toolsRegistry[slug];

  if (!ToolComponent) {
    return (
      <div className="flex items-center gap-2 p-4 bg-red-50 dark:bg-red-900/20 text-red-700 dark:text-red-400 rounded-lg">
        <AlertCircle className="w-5 h-5" />
        <span>Tool not available: {slug}</span>
      </div>
    );
  }

  return <ToolComponent />;
}