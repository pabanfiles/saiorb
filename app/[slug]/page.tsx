// app/[slug]/page.tsx
export const runtime = "edge";

import { notFound, redirect } from "next/navigation";
import type { Metadata } from "next";
import Link from "next/link";
import {
  ALL_TOOLS,
  getToolBySlug,
  getCategoryBySlug,
} from "@/lib/tools-data";
import { ToolRenderer } from "@/components/tools/tool-renderer";
import { JsonLd } from "@/components/seo/json-ld";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const tool = getToolBySlug(slug);
  if (!tool) return { title: "Tool Not Found | SaiOrb" };
  const siteUrl =
    process.env.NEXT_PUBLIC_SITE_URL ?? "https://saiorb.pages.dev";
  return {
    title: `${tool.name_en} — Free Online Tool | SaiOrb`,
    description: tool.description_en,
    keywords: tool.tags,
    openGraph: {
      title: tool.name_en,
      description: tool.description_en,
      url: `${siteUrl}/${tool.slug}`,
      siteName: "SaiOrb",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: tool.name_en,
      description: tool.description_en,
    },
    alternates: { canonical: `${siteUrl}/${tool.slug}` },
  };
}

export default async function ToolPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const tool = getToolBySlug(slug);
  if (!tool) notFound();
  if (tool.externalUrl) redirect(tool.externalUrl);

  const category = getCategoryBySlug(tool.categoryId);

  return (
    <main className="container mx-auto px-4 py-8 max-w-4xl">
      <JsonLd tool={tool} />

      <nav className="text-sm text-gray-500 mb-4">
        <Link href="/" className="hover:underline">Home</Link>
        {" / "}
        <Link href="/tools" className="hover:underline">Tools</Link>
        {" / "}
        {category && (
          <>
            <Link href={`/category/${category.slug}`} className="hover:underline">
              {category.name_en}
            </Link>
            {" / "}
          </>
        )}
        <span className="text-gray-700 dark:text-gray-300">{tool.name_en}</span>
      </nav>

      <header className="mb-8">
        <div className="flex items-start justify-between gap-4">
          <div>
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white">
              {tool.name_en}
            </h1>
            <p className="text-gray-600 dark:text-gray-400 mt-2">
              {tool.description_en}
            </p>
          </div>
          <div className="flex gap-2 shrink-0">
            {tool.isFeatured && (
              <span className="text-xs bg-yellow-100 text-yellow-700 px-2 py-1 rounded">
                Popular
              </span>
            )}
          </div>
        </div>

        <div className="mt-4 flex flex-wrap gap-2">
          <span className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded">
            🔒 100% Private
          </span>
          <span className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded">
            ⚡ Zero Upload
          </span>
          <span className="text-xs bg-purple-100 text-purple-700 px-2 py-1 rounded">
            🆓 Free Forever
          </span>
        </div>
      </header>

      <div className="mt-8 p-6 bg-white dark:bg-gray-900 rounded-lg border dark:border-gray-700">
        <ToolRenderer slug={tool.slug} />
      </div>

      {tool.howToEn && tool.howToEn.length > 0 && (
        <section className="mt-12">
          <h2 className="text-2xl font-semibold mb-4 text-gray-900 dark:text-white">
            How to Use
          </h2>
          <ol className="list-decimal list-inside space-y-2 text-gray-700 dark:text-gray-300">
            {tool.howToEn.map((step, i) => (
              <li key={i}>{step}</li>
            ))}
          </ol>
        </section>
      )}

      {tool.faqsEn && tool.faqsEn.length > 0 && (
        <section className="mt-8">
          <h2 className="text-2xl font-semibold mb-4 text-gray-900 dark:text-white">
            Frequently Asked Questions
          </h2>
          <div className="space-y-4">
            {tool.faqsEn.map((faq, i) => (
              <div key={i} className="border rounded-lg p-4 dark:border-gray-700">
                <h3 className="font-semibold mb-2 text-gray-900 dark:text-white">
                  {faq.q}
                </h3>
                <p className="text-gray-600 dark:text-gray-400">{faq.a}</p>
              </div>
            ))}
          </div>
        </section>
      )}

      {(() => {
        const related = ALL_TOOLS.filter(
          (t) => t.categoryId === tool.categoryId && t.slug !== tool.slug
        ).slice(0, 6);
        if (related.length === 0) return null;
        return (
          <section className="mt-12">
            <h2 className="text-2xl font-semibold mb-4 text-gray-900 dark:text-white">
              Related Tools
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {related.map((t) => (
                <Link
                  key={t.slug}
                  href={`/${t.slug}`}
                  className="block p-4 border rounded-lg hover:shadow-md transition-shadow dark:border-gray-700"
                >
                  <h3 className="font-semibold text-gray-900 dark:text-white">
                    {t.name_en}
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mt-1 line-clamp-2">
                    {t.description_en}
                  </p>
                </Link>
              ))}
            </div>
          </section>
        );
      })()}
    </main>
  );
}