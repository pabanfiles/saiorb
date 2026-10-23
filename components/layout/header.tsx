"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Menu,
  X,
  ChevronDown,
  Shield,
  Layers,
} from "lucide-react";
import { CATEGORIES } from "@/lib/tools-data";

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [categoryDropdownOpen, setCategoryDropdownOpen] = useState(false);
  const pathname = usePathname();

  const navLinks = [
    { href: "/", label: "Home" },
    { href: "/tools", label: "All 128 Tools" },
    { href: "/pdf-merge", label: "PDF Merge" },
    { href: "/image-compress", label: "Image Compress" },
    { href: "/qr-generator", label: "QR Generator" },
    { href: "/admin", label: "Admin Panel" },
  ];

  return (
    <header className="sticky top-0 z-50 w-full bg-white border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-15 flex items-center justify-between gap-4">
        {/* Brand Logo */}
        <Link href="/" className="flex items-center gap-2 shrink-0">
          <div className="w-8 h-8 rounded-md bg-blue-600 flex items-center justify-center text-white font-bold text-sm">
            S
          </div>
          <div>
            <div className="flex items-center gap-1.5 leading-none">
              <span className="text-lg font-bold tracking-tight text-gray-900">SaiOrb</span>
              <span className="text-[10px] px-1.5 py-0.2 rounded bg-blue-50 text-blue-700 font-semibold border border-blue-200">
                128 Tools
              </span>
            </div>
            <p className="text-[10px] text-gray-500 font-normal mt-0.5">All Tools, One Place</p>
          </div>
        </Link>

        {/* Navigation */}
        <nav className="hidden md:flex items-center gap-1 text-xs sm:text-sm font-medium text-gray-700">
          {navLinks.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`px-3 py-1.5 rounded-md transition ${
                  isActive
                    ? "bg-gray-100 text-blue-600 font-semibold"
                    : "hover:bg-gray-50 hover:text-gray-900 text-gray-700"
                }`}
              >
                {link.label}
              </Link>
            );
          })}

          {/* Categories Dropdown */}
          <div className="relative">
            <button
              onClick={() => setCategoryDropdownOpen(!categoryDropdownOpen)}
              onBlur={() => setTimeout(() => setCategoryDropdownOpen(false), 200)}
              className="flex items-center gap-1 px-3 py-1.5 rounded-md hover:bg-gray-50 text-gray-700 transition"
            >
              <span>Categories</span>
              <ChevronDown className="w-3.5 h-3.5 text-gray-400" />
            </button>

            {categoryDropdownOpen && (
              <div className="absolute left-0 top-full mt-1 w-56 bg-white border border-gray-200 rounded-md shadow-lg p-1.5 z-50 grid grid-cols-1 gap-0.5">
                {CATEGORIES.map((cat) => (
                  <Link
                    key={cat.id}
                    href={`/#${cat.id}`}
                    className="px-2.5 py-1.5 text-xs text-gray-700 hover:bg-blue-50 hover:text-blue-700 rounded transition"
                  >
                    {cat.name_en}
                  </Link>
                ))}
              </div>
            )}
          </div>
        </nav>

        {/* Right Actions */}
        <div className="flex items-center gap-2">
          <Link
            href="/admin"
            className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-gray-700 bg-gray-50 hover:bg-gray-100 border border-gray-300 rounded-md transition"
          >
            <Shield className="w-3.5 h-3.5 text-blue-600" />
            <span>Admin</span>
          </Link>

          {/* Mobile menu button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-1.5 rounded-md border border-gray-200 text-gray-700 hover:bg-gray-50"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-gray-200 bg-white p-3 space-y-2 text-xs">
          <div className="grid grid-cols-2 gap-1.5 pb-2 border-b border-gray-100">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="px-2.5 py-2 rounded bg-gray-50 text-gray-800 font-medium"
              >
                {link.label}
              </Link>
            ))}
          </div>

          <p className="font-semibold text-gray-400 uppercase text-[10px] pt-1">12 Categories</p>
          <div className="grid grid-cols-2 gap-1 max-h-48 overflow-y-auto">
            {CATEGORIES.map((cat) => (
              <Link
                key={cat.id}
                href={`/#${cat.id}`}
                onClick={() => setMobileMenuOpen(false)}
                className="px-2 py-1 text-gray-600 hover:text-blue-600 hover:bg-gray-50 rounded"
              >
                {cat.name_en}
              </Link>
            ))}
          </div>
        </div>
      )}
    </header>
  );
}
