"use client";

import React, { useState } from "react";
import { Settings, Save } from "lucide-react";
import { toast } from "sonner";

export default function AdminSettingsPage() {
  const [settings, setSettings] = useState({
    site_name: "SaiOrb",
    tagline_en: "All Tools, One Place",
    primary_color: "#2563EB",
    adsense_enabled: false,
    adsense_client_id: "ca-pub-0000000000000000",
    ga4_measurement_id: "G-SAIORB001",
    contact_email: "support@saiorb.com",
    rate_limit_per_day: 50,
    retention_hours: 1,
  });

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success("Site configuration and SEO settings saved successfully!");
  };

  return (
    <div className="space-y-6 text-gray-900">
      <div>
        <h1 className="text-xl sm:text-2xl font-bold text-gray-900">Site Settings & SEO</h1>
        <p className="text-xs text-gray-500 mt-0.5">Branding, Google Analytics 4, AdSense parameters, and server retention policy</p>
      </div>

      <form
        onSubmit={handleSave}
        className="p-6 bg-white border border-gray-200 rounded-lg space-y-6 shadow-xs"
      >
        <div className="space-y-4">
          <h2 className="text-sm font-bold text-gray-900 border-b border-gray-200 pb-2">
            1. General Branding & Metadata
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-gray-700 mb-1">
                Website Name (Site Name)
              </label>
              <input
                type="text"
                value={settings.site_name}
                onChange={(e) => setSettings({ ...settings, site_name: e.target.value })}
                className="w-full px-3.5 py-2 text-sm bg-gray-50 border border-gray-300 rounded-md"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-gray-700 mb-1">
                Primary Brand Color (Hex)
              </label>
              <div className="flex gap-2 items-center">
                <input
                  type="color"
                  value={settings.primary_color}
                  onChange={(e) => setSettings({ ...settings, primary_color: e.target.value })}
                  className="w-9 h-9 rounded border border-gray-300 cursor-pointer shrink-0"
                />
                <input
                  type="text"
                  value={settings.primary_color}
                  onChange={(e) => setSettings({ ...settings, primary_color: e.target.value })}
                  className="w-full px-3.5 py-2 text-sm bg-gray-50 border border-gray-300 rounded-md font-mono"
                />
              </div>
            </div>
            <div className="sm:col-span-2">
              <label className="block text-xs font-semibold text-gray-700 mb-1">
                Official Tagline
              </label>
              <input
                type="text"
                value={settings.tagline_en}
                onChange={(e) => setSettings({ ...settings, tagline_en: e.target.value })}
                className="w-full px-3.5 py-2 text-sm bg-gray-50 border border-gray-300 rounded-md"
              />
            </div>
          </div>
        </div>

        <div className="space-y-4 pt-4 border-t border-gray-200">
          <h2 className="text-sm font-bold text-gray-900 border-b border-gray-200 pb-2">
            2. Google Analytics & Monetization
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-gray-700 mb-1">
                Google Analytics 4 Measurement ID
              </label>
              <input
                type="text"
                value={settings.ga4_measurement_id}
                onChange={(e) => setSettings({ ...settings, ga4_measurement_id: e.target.value })}
                placeholder="G-XXXXXXX"
                className="w-full px-3.5 py-2 text-sm bg-gray-50 border border-gray-300 rounded-md font-mono"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-gray-700 mb-1">
                Google AdSense Toggle
              </label>
              <div className="flex items-center gap-2 pt-2">
                <input
                  type="checkbox"
                  id="adsense"
                  checked={settings.adsense_enabled}
                  onChange={(e) => setSettings({ ...settings, adsense_enabled: e.target.checked })}
                  className="w-4 h-4 rounded text-blue-600 cursor-pointer"
                />
                <label htmlFor="adsense" className="text-xs text-gray-700 cursor-pointer">
                  Enable AdSense placements (Disabled by default)
                </label>
              </div>
            </div>
          </div>
        </div>

        <div className="space-y-4 pt-4 border-t border-gray-200">
          <h2 className="text-sm font-bold text-gray-900 border-b border-gray-200 pb-2">
            3. Security & Automatic Purge
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-gray-700 mb-1">
                Daily Rate Limit (Per IP)
              </label>
              <input
                type="number"
                value={settings.rate_limit_per_day}
                onChange={(e) => setSettings({ ...settings, rate_limit_per_day: Number(e.target.value) })}
                className="w-full px-3.5 py-2 text-sm bg-gray-50 border border-gray-300 rounded-md"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-gray-700 mb-1">
                Cloud Retention Window
              </label>
              <input
                type="text"
                disabled
                value="1 Hour (Automatic Garbage Collection)"
                className="w-full px-3.5 py-2 text-sm bg-gray-100 border border-gray-300 rounded-md text-gray-500"
              />
            </div>
          </div>
        </div>

        <button
          type="submit"
          className="py-2.5 px-6 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-md text-sm transition flex items-center justify-center gap-2 shadow-xs cursor-pointer"
        >
          <Save className="w-4 h-4" />
          Save Settings
        </button>
      </form>
    </div>
  );
}
