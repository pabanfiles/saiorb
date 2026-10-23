// app/sitemap.ts
import type { MetadataRoute } from "next";
import { ALL_TOOLS, CATEGORIES } from "@/lib/tools-data";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl =
    process.env.NEXT_PUBLIC_SITE_URL ?? "https://saiorb.pages.dev";

  const tools = ALL_TOOLS.map((t) => ({
    url: `${baseUrl}/${t.slug}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: t.isFeatured ? 0.9 : 0.8,
  }));

  const categories = CATEGORIES.map((c) => ({
    url: `${baseUrl}/category/${c.slug}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: 0.7,
  }));

  const staticPages = [
    "",
    "/tools",
    "/category",
    "/search",
    "/about",
    "/privacy",
    "/terms",
    "/disclaimer",
    "/contact",
    "/blog",
  ].map((path) => ({
    url: `${baseUrl}${path}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: path === "" ? 1 : 0.6,
  }));

  return [...staticPages, ...categories, ...tools];
}