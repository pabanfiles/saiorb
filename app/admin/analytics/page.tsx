"use client";

import React from "react";
import { BarChart3, TrendingUp, Users, ArrowUpRight, ShieldCheck, Zap } from "lucide-react";
import AnalyticsDashboardWidget from "@/components/admin/analytics-charts";

export default function AdminAnalyticsPage() {
  return (
    <div className="space-y-6 text-gray-900">
      <div>
        <h1 className="text-xl sm:text-2xl font-bold text-gray-900">Usage Metrics & Performance Analytics</h1>
        <p className="text-xs text-gray-500 mt-0.5">Comprehensive audit of 128 tools execution, privacy savings, and user adoption.</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="p-4 bg-white border border-gray-200 rounded-lg space-y-1 shadow-2xs">
          <p className="text-xs font-bold text-gray-500 uppercase tracking-wider">Monthly Active Users (MAU)</p>
          <p className="text-2xl font-extrabold text-gray-900">125,000+</p>
          <p className="text-[11px] text-emerald-700 font-semibold">↑ 18% growth over previous cycle</p>
        </div>

        <div className="p-4 bg-white border border-gray-200 rounded-lg space-y-1 shadow-2xs">
          <p className="text-xs font-bold text-gray-500 uppercase tracking-wider">Total Tasks Completed</p>
          <p className="text-2xl font-extrabold text-blue-600">890,000+</p>
          <p className="text-[11px] text-gray-500">Client-Side Zero-Latency Execution</p>
        </div>

        <div className="p-4 bg-white border border-gray-200 rounded-lg space-y-1 shadow-2xs">
          <p className="text-xs font-bold text-gray-500 uppercase tracking-wider">Server Bandwidth Saved</p>
          <p className="text-2xl font-extrabold text-emerald-600">3.4 Terabytes</p>
          <p className="text-[11px] text-gray-500">Saved through local browser processing</p>
        </div>
      </div>

      {/* Main Trends Widget */}
      <AnalyticsDashboardWidget />

      {/* Geographic Breakdown */}
      <div className="p-5 bg-white border border-gray-200 rounded-lg space-y-4 shadow-xs">
        <h2 className="text-sm font-bold text-gray-900">Top User Regions & Traffic Share</h2>
        <div className="space-y-3">
          {[
            { region: "Kolkata Metropolitan & Urban Areas", share: "38%" },
            { region: "North & South 24 Parganas", share: "22%" },
            { region: "Howrah & Hooghly", share: "16%" },
            { region: "Paschim & Purba Medinipur", share: "12%" },
            { region: "Murshidabad & Malda", share: "8%" },
            { region: "Siliguri & North Bengal", share: "4%" },
          ].map((item, idx) => (
            <div key={idx} className="space-y-1">
              <div className="flex justify-between text-xs font-semibold">
                <span className="text-gray-800">{item.region}</span>
                <span className="text-blue-600 font-bold">{item.share}</span>
              </div>
              <div className="w-full h-2 rounded-full bg-gray-100 overflow-hidden">
                <div
                  className="h-full bg-blue-600 rounded-full"
                  style={{ width: item.share }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
