// app/category/[slug]/page.tsx
export const runtime = "edge";

import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Link from "next/link";
import { ALL_TOOLS, getCategoryBySlug } from "@/lib/tools-data";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const category = getCategoryBySlug(slug);

  if (!category) {
    return { title: "Category Not Found | SaiOrb" };
  }

  const siteUrl =
    process.env.NEXT_PUBLIC_SITE_URL ?? "https://saiorb.pages.dev";

  return {
    title: `${category.name_en} — Free Online Tools | SaiOrb`,
    description: category.description_en,
    openGraph: {
      title: `${category.name_en} | SaiOrb`,
      description: category.description_en,
      url: `${siteUrl}/category/${category.slug}`,
      siteName: "SaiOrb",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: `${category.name_en} | SaiOrb`,
      description: category.description_en,
    },
    alternates: { canonical: `${siteUrl}/category/${category.slug}` },
  };
}

export default async function CategoryPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const category = getCategoryBySlug(slug);

  if (!category) notFound();

  const categoryTools = ALL_TOOLS.filter((t) => t.categoryId === slug);

  return (
    <main className="container mx-auto px-4 py-8 max-w-6xl">
      <header className="mb-8">
        <nav className="text-sm text-gray-500 mb-2">
          <Link href="/" className="hover:underline">
            Home
          </Link>
          {" / "}
          <Link href="/category" className="hover:underline">
            Categories
          </Link>
          {" / "}
          <span className="text-gray-700 dark:text-gray-300">
            {category.name_en}
          </span>
        </nav>
        <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white">
          {category.name_en}
        </h1>
        <p className="text-gray-600 dark:text-gray-400 mt-2">
          {category.description_en}
        </p>
        <p className="text-sm text-gray-500 mt-2">
          {categoryTools.length} free tools — 100% client-side, zero upload.
        </p>
      </header>

      {categoryTools.length === 0 ? (
        <div className="text-center py-16">
          <p className="text-gray-500">
            No tools available in this category yet.
          </p>
          <Link
            href="/tools"
            className="inline-block mt-4 text-blue-600 hover:underline"
          >
            Browse all tools →
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {categoryTools.map((tool) => (
            <Link
              key={tool.slug}
              href={`/${tool.slug}`}
              className="block p-5 border rounded-lg hover:shadow-md transition-shadow dark:border-gray-700"
            >
              <div className="flex items-start justify-between gap-2">
                <h2 className="font-semibold text-lg text-gray-900 dark:text-white">
                  {tool.name_en}
                </h2>
                {tool.isFeatured && (
                  <span className="text-xs bg-yellow-100 text-yellow-700 px-2 py-0.5 rounded">
                    Popular
                  </span>
                )}
              </div>
              <p className="text-sm text-gray-600 dark:text-gray-400 mt-2 line-clamp-2">
                {tool.description_en}
              </p>
              <div className="mt-3 flex flex-wrap gap-1">
                {tool.tags.slice(0, 3).map((tag) => (
                  <span
                    key={tag}
                    className="text-xs bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 px-2 py-0.5 rounded"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </Link>
          ))}
        </div>
      )}

      <div className="mt-10 text-center">
        <Link
          href="/tools"
          className="inline-block text-blue-600 hover:underline"
        >
          ← Browse all tools
        </Link>
      </div>
    </main>
  );
}