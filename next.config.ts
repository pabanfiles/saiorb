// next.config.ts
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  compress: true,
  poweredByHeader: false,

  images: {
    unoptimized: true,
  },

  // ✅ Cloudflare Edge Runtime-এ Environment Variables পাস করার জন্য
  env: {
    NEXT_PUBLIC_SITE_URL: process.env.NEXT_PUBLIC_SITE_URL || "https://saiorb.pages.dev",
    ADMIN_PASSWORD: process.env.ADMIN_PASSWORD,
    GEMINI_API_KEY: process.env.GEMINI_API_KEY,
    TURSO_DATABASE_URL: process.env.TURSO_DATABASE_URL,
    TURSO_AUTH_TOKEN: process.env.TURSO_AUTH_TOKEN,
  },

  serverExternalPackages: ["@libsql/client"],

  experimental: {
    optimizePackageImports: ["lucide-react", "recharts"],
  },
};

export default nextConfig;