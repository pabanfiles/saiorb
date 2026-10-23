"use client";

import React from "react";
import Link from "next/link";
import {
  Wrench,
  FolderTree,
  FileText,
  Users,
  Activity,
  CheckCircle2,
  TrendingUp,
  Server,
  Shield,
  ArrowUpRight,
} from "lucide-react";
import { ALL_TOOLS, CATEGORIES } from "@/lib/tools-data";
import AnalyticsDashboardWidget from "@/components/admin/analytics-charts";

export default function AdminDashboardPage() {
  const clientCount = ALL_TOOLS.filter((t) => t.isClientSide).length;
  const serverCount = ALL_TOOLS.filter((t) => t.isServerSide).length;

  return (
    <div className="space-y-6 text-gray-900">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
        <div>
          <h1 className="text-xl sm:text-2xl font-bold text-gray-900">
            Admin Overview & Analytics Dashboard
          </h1>
          <p className="text-xs text-gray-500 mt-0.5">
            Real-time tool usage metrics, popularity rankings, and system health status.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-semibold">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            System Operational (All 128 Tools Live)
          </span>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="p-4 bg-white border border-gray-200 rounded-lg space-y-1 shadow-2xs">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-gray-500 uppercase tracking-wider">Total Active Tools</span>
            <div className="w-7 h-7 rounded bg-blue-50 text-blue-600 flex items-center justify-center">
              <Wrench className="w-3.5 h-3.5" />
            </div>
          </div>
          <p className="text-2xl font-extrabold text-gray-900">{ALL_TOOLS.length}</p>
          <p className="text-[11px] text-emerald-700 font-semibold flex items-center gap-1">
            <CheckCircle2 className="w-3 h-3 text-emerald-600" /> 100% Built & Accessible
          </p>
        </div>

        <div className="p-4 bg-white border border-gray-200 rounded-lg space-y-1 shadow-2xs">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-gray-500 uppercase tracking-wider">Client-Side Tools</span>
            <div className="w-7 h-7 rounded bg-emerald-50 text-emerald-600 flex items-center justify-center">
              <Shield className="w-3.5 h-3.5" />
            </div>
          </div>
          <p className="text-2xl font-extrabold text-gray-900">{clientCount}</p>
          <p className="text-[11px] text-gray-500">Zero Server Storage • Instant</p>
        </div>

        <div className="p-4 bg-white border border-gray-200 rounded-lg space-y-1 shadow-2xs">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-gray-500 uppercase tracking-wider">Cloud / Worker Tools</span>
            <div className="w-7 h-7 rounded bg-indigo-50 text-indigo-600 flex items-center justify-center">
              <Server className="w-3.5 h-3.5" />
            </div>
          </div>
          <p className="text-2xl font-extrabold text-gray-900">{serverCount}</p>
          <p className="text-[11px] text-indigo-700 font-semibold">Protected with Auto-Purge</p>
        </div>

        <div className="p-4 bg-white border border-gray-200 rounded-lg space-y-1 shadow-2xs">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-gray-500 uppercase tracking-wider">Tool Categories</span>
            <div className="w-7 h-7 rounded bg-amber-50 text-amber-600 flex items-center justify-center">
              <FolderTree className="w-3.5 h-3.5" />
            </div>
          </div>
          <p className="text-2xl font-extrabold text-gray-900">{CATEGORIES.length}</p>
          <p className="text-[11px] text-gray-500">All Major Disciplines</p>
        </div>
      </div>

      {/* D3 / Recharts-based Dashboard Widget */}
      <AnalyticsDashboardWidget />

      {/* Quick Administration Actions */}
      <div className="bg-white border border-gray-200 rounded-lg p-5 shadow-xs space-y-4">
        <h2 className="text-sm font-bold text-gray-900 flex items-center gap-2">
          <Activity className="w-4 h-4 text-blue-600" />
          Quick Management Controls
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 text-xs">
          <Link
            href="/admin/tools"
            className="p-3 bg-gray-50 hover:bg-gray-100 border border-gray-200 rounded-md transition space-y-1"
          >
            <p className="font-bold text-gray-900">Manage 128 Tools</p>
            <p className="text-gray-500 text-[11px]">Toggle availability and featured flags</p>
          </Link>
          <Link
            href="/admin/analytics"
            className="p-3 bg-gray-50 hover:bg-gray-100 border border-gray-200 rounded-md transition space-y-1"
          >
            <p className="font-bold text-gray-900">In-Depth Analytics</p>
            <p className="text-gray-500 text-[11px]">View detailed bandwidth and retention metrics</p>
          </Link>
          <Link
            href="/admin/settings"
            className="p-3 bg-gray-50 hover:bg-gray-100 border border-gray-200 rounded-md transition space-y-1"
          >
            <p className="font-bold text-gray-900">Site Settings</p>
            <p className="text-gray-500 text-[11px]">Configure GA4, branding, and metadata</p>
          </Link>
          <Link
            href="/admin/categories"
            className="p-3 bg-gray-50 hover:bg-gray-100 border border-gray-200 rounded-md transition space-y-1"
          >
            <p className="font-bold text-gray-900">Category Sorter</p>
            <p className="text-gray-500 text-[11px]">Organize 12 main tool collections</p>
          </Link>
        </div>
      </div>
    </div>
  );
}
