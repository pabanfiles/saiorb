"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Wrench,
  FolderTree,
  FileText,
  Settings,
  HelpCircle,
  BarChart3,
  Users,
  Shield,
  ArrowLeft,
  Menu,
  X,
} from "lucide-react";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const menuItems = [
    { href: "/admin", label: "Overview & Trends", icon: LayoutDashboard },
    { href: "/admin/tools", label: "Tools Manager (128)", icon: Wrench },
    { href: "/admin/categories", label: "Categories (12)", icon: FolderTree },
    { href: "/admin/analytics", label: "Usage & Analytics", icon: BarChart3 },
    { href: "/admin/blog", label: "Blog & Content CMS", icon: FileText },
    { href: "/admin/settings", label: "Site Settings & SEO", icon: Settings },
    { href: "/admin/faqs", label: "FAQs Manager", icon: HelpCircle },
    { href: "/admin/users", label: "Users & Roles (RBAC)", icon: Users },
  ];

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col text-gray-900">
      {/* Top Admin Notice Bar */}
      <div className="bg-blue-600 text-white px-4 py-2 text-xs font-semibold flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Shield className="w-4 h-4" />
          <span>SaiOrb Admin Control Center • Role: Super Administrator</span>
        </div>
        <Link href="/" className="hover:underline flex items-center gap-1 font-medium">
          <ArrowLeft className="w-3.5 h-3.5" /> Return to Main Site
        </Link>
      </div>

      <div className="flex-1 flex flex-col md:flex-row">
        {/* Mobile toggle */}
        <div className="md:hidden p-3 bg-white border-b border-gray-200 flex items-center justify-between">
          <span className="font-bold text-sm text-gray-900">SaiOrb Admin Panel</span>
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="p-1.5 rounded-md border border-gray-300 text-gray-700"
            aria-label="Toggle navigation"
          >
            {sidebarOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>

        {/* Sidebar */}
        <aside
          className={`${
            sidebarOpen ? "block" : "hidden"
          } md:block w-full md:w-64 bg-white border-r border-gray-200 p-4 space-y-2 shrink-0`}
        >
          <div className="pb-4 mb-2 border-b border-gray-200 flex items-center gap-2">
            <div className="w-8 h-8 rounded-md bg-blue-600 text-white flex items-center justify-center font-bold text-sm">
              S
            </div>
            <div>
              <p className="font-bold text-sm text-gray-900">SaiOrb Admin</p>
              <p className="text-[10px] text-gray-500">128 Tools Management</p>
            </div>
          </div>

          <nav className="space-y-1">
            {menuItems.map((item) => {
              const Icon = item.icon;
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setSidebarOpen(false)}
                  className={`flex items-center gap-2.5 px-3 py-2 rounded-md text-xs font-semibold transition ${
                    isActive
                      ? "bg-blue-600 text-white shadow-2xs"
                      : "text-gray-700 hover:bg-gray-100"
                  }`}
                >
                  <Icon className="w-4 h-4 shrink-0" />
                  <span>{item.label}</span>
                </Link>
              );
            })}
          </nav>
        </aside>

        {/* Main Content Area */}
        <main className="flex-1 p-4 sm:p-6 lg:p-8 max-w-6xl">{children}</main>
      </div>
    </div>
  );
}
