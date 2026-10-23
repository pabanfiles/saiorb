"use client";

import React, { useState } from "react";
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  PieChart,
  Pie,
  Cell,
} from "recharts";
import {
  TrendingUp,
  BarChart3,
  PieChart as PieIcon,
  Calendar,
  Layers,
  ArrowUpRight,
  Filter,
} from "lucide-react";

// Mock 14-day trend data across top tools
const DAILY_TRENDS_14D = [
  { date: "Oct 09", pdfMerge: 2400, imageCompress: 2100, voterPhoto: 3200, upiQr: 1800, videoUtil: 1600, total: 11100 },
  { date: "Oct 10", pdfMerge: 2600, imageCompress: 2250, voterPhoto: 3450, upiQr: 1900, videoUtil: 1750, total: 11950 },
  { date: "Oct 11", pdfMerge: 2800, imageCompress: 2400, voterPhoto: 3600, upiQr: 2050, videoUtil: 1800, total: 12650 },
  { date: "Oct 12", pdfMerge: 3100, imageCompress: 2700, voterPhoto: 3900, upiQr: 2200, videoUtil: 1950, total: 13850 },
  { date: "Oct 13", pdfMerge: 2900, imageCompress: 2600, voterPhoto: 3800, upiQr: 2150, videoUtil: 1900, total: 13350 },
  { date: "Oct 14", pdfMerge: 3300, imageCompress: 2900, voterPhoto: 4100, upiQr: 2300, videoUtil: 2100, total: 14700 },
  { date: "Oct 15", pdfMerge: 3500, imageCompress: 3100, voterPhoto: 4350, upiQr: 2450, videoUtil: 2200, total: 15600 },
  { date: "Oct 16", pdfMerge: 3400, imageCompress: 3000, voterPhoto: 4200, upiQr: 2400, videoUtil: 2150, total: 15150 },
  { date: "Oct 17", pdfMerge: 3700, imageCompress: 3300, voterPhoto: 4500, upiQr: 2600, videoUtil: 2300, total: 16400 },
  { date: "Oct 18", pdfMerge: 3900, imageCompress: 3500, voterPhoto: 4800, upiQr: 2750, videoUtil: 2450, total: 17400 },
  { date: "Oct 19", pdfMerge: 4100, imageCompress: 3650, voterPhoto: 5100, upiQr: 2900, videoUtil: 2600, total: 18350 },
  { date: "Oct 20", pdfMerge: 4300, imageCompress: 3800, voterPhoto: 5350, upiQr: 3050, videoUtil: 2700, total: 19200 },
  { date: "Oct 21", pdfMerge: 4550, imageCompress: 3950, voterPhoto: 5600, upiQr: 3200, videoUtil: 2850, total: 20150 },
  { date: "Oct 22", pdfMerge: 4800, imageCompress: 4120, voterPhoto: 5900, upiQr: 3400, videoUtil: 3000, total: 21220 },
];

// Top 10 most popular tools ranking data
const TOP_10_TOOLS = [
  { name: "Voter Photo (50KB)", slug: "voter-id-photo", executions: 5900, category: "Govt ID", share: 27.8 },
  { name: "PDF Merge", slug: "pdf-merge", executions: 4800, category: "PDF", share: 22.6 },
  { name: "Image Compress", slug: "image-compress", executions: 4120, category: "Image", share: 19.4 },
  { name: "UPI QR Generator", slug: "qr-generator", executions: 3400, category: "Utility", share: 16.0 },
  { name: "Video Downloader", slug: "video-downloader", executions: 3000, category: "Video", share: 14.1 },
  { name: "PAN Card Photo (213px)", slug: "pan-photo", executions: 2750, category: "Govt ID", share: 12.9 },
  { name: "Social Media Downloader", slug: "social-media-downloader", executions: 2600, category: "Social", share: 12.2 },
  { name: "PDF to Word Converter", slug: "pdf-to-word", executions: 2200, category: "PDF", share: 10.3 },
  { name: "Aadhaar Document Helper", slug: "aadhaar-photo", executions: 1980, category: "Govt ID", share: 9.3 },
  { name: "Age Calculator", slug: "age-calculator", executions: 1720, category: "Utility", share: 8.1 },
];

// Category distribution data
const CATEGORY_DISTRIBUTION = [
  { name: "PDF Tools", value: 32, color: "#2563EB" },
  { name: "Govt ID & Forms", value: 24, color: "#4F46E5" },
  { name: "Image Tools", value: 20, color: "#059669" },
  { name: "Utility & Calculators", value: 12, color: "#D97706" },
  { name: "Video & Media", value: 8, color: "#DC2626" },
  { name: "Document & Office", value: 4, color: "#7C3AED" },
];

export default function AnalyticsDashboardWidget() {
  const [timeRange, setTimeRange] = useState<"7d" | "14d">("14d");
  const [selectedMetric, setSelectedMetric] = useState<"all" | "pdfMerge" | "imageCompress" | "voterPhoto">("all");

  const chartData = timeRange === "7d" ? DAILY_TRENDS_14D.slice(7) : DAILY_TRENDS_14D;

  return (
    <div className="space-y-6">
      {/* Widget Header with Timeframe selector */}
      <div className="bg-white border border-gray-200 rounded-lg p-5 shadow-xs space-y-4">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 border-b border-gray-200 pb-4">
          <div>
            <h2 className="text-base sm:text-lg font-bold text-gray-900 flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-blue-600" />
              Daily Tool Usage Trends (128 Tools)
            </h2>
            <p className="text-xs text-gray-500 mt-0.5">
              Visualizing daily execution volume, peak hours, and popularity across the tool suite.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-xs text-gray-500 font-medium">Timeframe:</span>
            <div className="inline-flex rounded-md border border-gray-300 p-0.5 bg-gray-50 text-xs">
              <button
                onClick={() => setTimeRange("7d")}
                className={`px-3 py-1 rounded font-medium transition ${
                  timeRange === "7d" ? "bg-white text-blue-600 shadow-2xs font-semibold" : "text-gray-600 hover:text-gray-900"
                }`}
              >
                Last 7 Days
              </button>
              <button
                onClick={() => setTimeRange("14d")}
                className={`px-3 py-1 rounded font-medium transition ${
                  timeRange === "14d" ? "bg-white text-blue-600 shadow-2xs font-semibold" : "text-gray-600 hover:text-gray-900"
                }`}
              >
                Last 14 Days
              </button>
            </div>
          </div>
        </div>

        {/* Recharts Area Chart for Daily Trends */}
        <div className="h-72 w-full pt-2">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={chartData} margin={{ top: 10, right: 10, left: -15, bottom: 0 }}>
              <defs>
                <linearGradient id="colorTotal" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#2563EB" stopOpacity={0.25} />
                  <stop offset="95%" stopColor="#2563EB" stopOpacity={0.0} />
                </linearGradient>
                <linearGradient id="colorVoter" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#4F46E5" stopOpacity={0.2} />
                  <stop offset="95%" stopColor="#4F46E5" stopOpacity={0.0} />
                </linearGradient>
                <linearGradient id="colorPdf" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#059669" stopOpacity={0.2} />
                  <stop offset="95%" stopColor="#059669" stopOpacity={0.0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E5E7EB" />
              <XAxis dataKey="date" tick={{ fontSize: 11, fill: "#6B7280" }} axisLine={{ stroke: "#E5E7EB" }} />
              <YAxis tick={{ fontSize: 11, fill: "#6B7280" }} axisLine={{ stroke: "#E5E7EB" }} />
              <Tooltip
                contentStyle={{
                  backgroundColor: "#FFFFFF",
                  border: "1px solid #E5E7EB",
                  borderRadius: "8px",
                  fontSize: "12px",
                  boxShadow: "0 2px 4px rgba(0,0,0,0.05)",
                }}
              />
              <Legend wrapperStyle={{ fontSize: "11px", paddingTop: "8px" }} />
              <Area
                type="monotone"
                dataKey="total"
                name="Total Daily Runs"
                stroke="#2563EB"
                strokeWidth={2}
                fillOpacity={1}
                fill="url(#colorTotal)"
              />
              <Area
                type="monotone"
                dataKey="voterPhoto"
                name="Voter Photo 50KB"
                stroke="#4F46E5"
                strokeWidth={1.5}
                fillOpacity={1}
                fill="url(#colorVoter)"
              />
              <Area
                type="monotone"
                dataKey="pdfMerge"
                name="PDF Merge"
                stroke="#059669"
                strokeWidth={1.5}
                fillOpacity={1}
                fill="url(#colorPdf)"
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Grid of 2 Charts: Top 10 Tools (BarChart) + Category Share (PieChart) */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Most Popular of 128 Tools Ranking (2 Cols) */}
        <div className="lg:col-span-2 bg-white border border-gray-200 rounded-lg p-5 shadow-xs space-y-4">
          <div className="flex items-center justify-between border-b border-gray-200 pb-3">
            <div>
              <h3 className="text-sm font-bold text-gray-900 flex items-center gap-1.5">
                <BarChart3 className="w-4 h-4 text-blue-600" />
                Top 10 Most Popular Tools (Out of 128 Tools)
              </h3>
              <p className="text-xs text-gray-500">Ranked by weekly execution volume</p>
            </div>
            <span className="text-xs font-semibold text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded border border-emerald-200">
              Live Tracker
            </span>
          </div>

          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={TOP_10_TOOLS}
                layout="vertical"
                margin={{ top: 5, right: 20, left: 35, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="#E5E7EB" />
                <XAxis type="number" tick={{ fontSize: 10, fill: "#6B7280" }} />
                <YAxis
                  type="category"
                  dataKey="name"
                  tick={{ fontSize: 10, fill: "#374151" }}
                  width={110}
                />
                <Tooltip
                  formatter={(val: any) => [`${val} runs`, "Executions"]}
                  contentStyle={{
                    backgroundColor: "#FFFFFF",
                    border: "1px solid #E5E7EB",
                    borderRadius: "6px",
                    fontSize: "11px",
                  }}
                />
                <Bar dataKey="executions" fill="#2563EB" radius={[0, 4, 4, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Category Share Distribution (1 Col) */}
        <div className="bg-white border border-gray-200 rounded-lg p-5 shadow-xs space-y-4 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between border-b border-gray-200 pb-3 mb-2">
              <h3 className="text-sm font-bold text-gray-900 flex items-center gap-1.5">
                <PieIcon className="w-4 h-4 text-blue-600" />
                Category Distribution
              </h3>
              <span className="text-xs text-gray-500">12 Cats</span>
            </div>

            <div className="h-44 w-full flex items-center justify-center">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={CATEGORY_DISTRIBUTION}
                    cx="50%"
                    cy="50%"
                    innerRadius={45}
                    outerRadius={68}
                    paddingAngle={3}
                    dataKey="value"
                  >
                    {CATEGORY_DISTRIBUTION.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip
                    formatter={(val: any) => [`${val}%`, "Share"]}
                    contentStyle={{
                      backgroundColor: "#FFFFFF",
                      border: "1px solid #E5E7EB",
                      borderRadius: "6px",
                      fontSize: "11px",
                    }}
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Legend Items */}
          <div className="grid grid-cols-2 gap-2 text-xs border-t border-gray-100 pt-3">
            {CATEGORY_DISTRIBUTION.map((cat, idx) => (
              <div key={idx} className="flex items-center gap-1.5 min-w-0">
                <span className="w-2.5 h-2.5 rounded-full shrink-0" style={{ backgroundColor: cat.color }} />
                <span className="text-[11px] text-gray-600 truncate">{cat.name} ({cat.value}%)</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
