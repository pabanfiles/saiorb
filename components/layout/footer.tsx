"use client";

import React from "react";
import Link from "next/link";
import { ShieldCheck, ArrowRight } from "lucide-react";
import { CATEGORIES } from "@/lib/tools-data";

export default function Footer() {
  return (
    <footer className="w-full bg-white border-t border-gray-200 text-gray-600 text-xs mt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
          {/* Brand Info */}
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 rounded bg-blue-600 text-white font-bold flex items-center justify-center text-xs">
                S
              </div>
              <span className="text-base font-bold text-gray-900">SaiOrb</span>
            </div>
            <p className="text-xs text-gray-500 leading-relaxed">
              All Tools, One Place. A comprehensive suite of 128 web utility tools crafted for productivity, document handling, and media processing.
            </p>
            <div className="inline-flex items-center gap-1.5 text-[11px] font-semibold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded border border-emerald-200">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
              <span>100% Browser Processing • Zero Server Uploads</span>
            </div>
          </div>

          {/* Quick Categories */}
          <div>
            <h3 className="font-bold text-gray-900 text-xs uppercase tracking-wider mb-2.5">Popular Categories</h3>
            <ul className="space-y-1.5">
              <li>
                <Link href="/#pdf" className="hover:text-blue-600 transition">
                  PDF Tools (Merge, Compress, Split)
                </Link>
              </li>
              <li>
                <Link href="/#image" className="hover:text-blue-600 transition">
                  Image Tools & Photo Compressor
                </Link>
              </li>
              <li>
                <Link href="/#utility" className="hover:text-blue-600 transition">
                  QR Code Generator & Utilities
                </Link>
              </li>
              <li>
                <Link href="/#video" className="hover:text-blue-600 transition">
                  Video & Audio Converter Tools
                </Link>
              </li>
              <li>
                <Link href="/#social" className="hover:text-blue-600 transition">
                  Social Media Utilities & Reels
                </Link>
              </li>
            </ul>
          </div>

          {/* Featured Tools Direct Links */}
          <div>
            <h3 className="font-bold text-gray-900 text-xs uppercase tracking-wider mb-2.5">Featured Tools</h3>
            <ul className="space-y-1.5">
              <li>
                <Link href="/pdf-merge" className="hover:text-blue-600 transition">
                  PDF Merge Tool
                </Link>
              </li>
              <li>
                <Link href="/image-compress" className="hover:text-blue-600 transition">
                  Image Compressor
                </Link>
              </li>
              <li>
                <Link href="/qr-generator" className="hover:text-blue-600 transition">
                  UPI & URL QR Code Generator
                </Link>
              </li>
              <li>
                <Link href="/voter-id-photo" className="hover:text-blue-600 transition">
                  Voter Photo (50KB Cropper)
                </Link>
              </li>
              <li>
                <Link href="/pan-photo" className="hover:text-blue-600 transition">
                  PAN Photo (213px Resizer)
                </Link>
              </li>
              <li>
                <Link href="/social-media-downloader" className="hover:text-blue-600 transition">
                  Social Media Downloader
                </Link>
              </li>
            </ul>
          </div>

          {/* Legal and Support */}
          <div>
            <h3 className="font-bold text-gray-900 text-xs uppercase tracking-wider mb-2.5">Legal & Support</h3>
            <ul className="space-y-1.5">
              <li>
                <Link href="/privacy" className="hover:text-blue-600 transition">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/terms" className="hover:text-blue-600 transition">
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link href="/disclaimer" className="hover:text-blue-600 transition">
                  Copyright & Disclaimer
                </Link>
              </li>
              <li>
                <Link href="/about" className="hover:text-blue-600 transition">
                  About SaiOrb
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-blue-600 transition">
                  Contact & Support
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom copyright notice */}
        <div className="pt-6 border-t border-gray-200 flex flex-col sm:flex-row items-center justify-between gap-3 text-[11px] text-gray-500">
          <p>
            © {new Date().getFullYear()} SaiOrb. All rights reserved. Client-side privacy architecture.
          </p>
          <div className="flex items-center gap-3 text-gray-400">
            <span>Browser-based Utility Platform</span>
            <span>•</span>
            <Link href="/admin" className="text-blue-600 hover:underline font-medium">Admin Dashboard</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
