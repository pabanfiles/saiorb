// lib/tools-registry.tsx
"use client";

import dynamic from "next/dynamic";
import type { ComponentType } from "react";

export const toolsRegistry: Record<string, ComponentType> = {
  // PDF tools
  "pdf-merge": dynamic(() => import("@/components/tools/pdf-merge"), { ssr: false }),
  "pdf-split": dynamic(() => import("@/components/tools/pdf-split"), { ssr: false }),
  "pdf-compress": dynamic(() => import("@/components/tools/pdf-compress"), { ssr: false }),

  // Image tools
  "image-compress": dynamic(() => import("@/components/tools/image-compress"), { ssr: false }),
  "image-resize": dynamic(() => import("@/components/tools/image-resize"), { ssr: false }),

  // Govt ID tools
  "aadhaar-masking": dynamic(() => import("@/components/tools/aadhaar-masking"), { ssr: false }),
  "aadhaar-photo": dynamic(() => import("@/components/tools/aadhaar-photo"), { ssr: false }),
  "pan-photo": dynamic(() => import("@/components/tools/pan-photo"), { ssr: false }),
  "passport-photo": dynamic(() => import("@/components/tools/passport-photo"), { ssr: false }),

  // QR tools
  "qr-generator": dynamic(() => import("@/components/tools/qr-generator"), { ssr: false }),
  "qr-scanner": dynamic(() => import("@/components/tools/qr-scanner"), { ssr: false }),

  // Finance
  "emi-calculator": dynamic(() => import("@/components/tools/emi-calculator"), { ssr: false }),
  "gst-calculator": dynamic(() => import("@/components/tools/gst-calculator"), { ssr: false }),
  "invoice-generator": dynamic(() => import("@/components/tools/invoice-generator"), { ssr: false }),

  // Video tools — ⚠️ তোমার actual file নাম
  "video-compress": dynamic(() => import("@/components/tools/video-compress"), { ssr: false }),
  "video-crop": dynamic(() => import("@/components/tools/video-crop"), { ssr: false }),
  "video-merge": dynamic(() => import("@/components/tools/video-merge"), { ssr: false }),
  "video-rotate": dynamic(() => import("@/components/tools/video-rotate"), { ssr: false }),
  "video-speed-change": dynamic(() => import("@/components/tools/video-speed-change"), { ssr: false }),
  "video-to-gif": dynamic(() => import("@/components/tools/video-to-gif"), { ssr: false }),
  "video-to-mp3": dynamic(() => import("@/components/tools/video-to-mp3"), { ssr: false }),
  "video-trim": dynamic(() => import("@/components/tools/video-trim"), { ssr: false }),

  // ⚠️ External tools (redirect only — no component needed):
  // video-downloader → external URL
  // pdf-editor → external URL
  // reels-downloader → external URL
  // social-media-downloader → external URL
};