// app/blog/[slug]/page.tsx
export const runtime = "edge";

import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Link from "next/link";
import * as blogData from "@/lib/blog-data";

interface BlogPost {
  slug: string;
  title: string;
  excerpt?: string;
  content: string;
  publishedAt: string;
  author?: string;
  tags?: string[];
}

function getBlogPosts(): BlogPost[] {
  const data = blogData as any;
  return (
    data.blogPosts ??
    data.blogData ??
    data.posts ??
    data.BLOG_POSTS ??
    data.POSTS ??
    []
  );
}

function findPost(slug: string): BlogPost | undefined {
  return getBlogPosts().find((p) => p.slug === slug);
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = findPost(slug);

  if (!post) {
    return { title: "Post Not Found | SaiOrb Blog" };
  }

  const siteUrl =
    process.env.NEXT_PUBLIC_SITE_URL ?? "https://saiorb.pages.dev";

  return {
    title: `${post.title} | SaiOrb Blog`,
    description: post.excerpt ?? post.content.slice(0, 160),
    openGraph: {
      title: post.title,
      description: post.excerpt ?? post.content.slice(0, 160),
      url: `${siteUrl}/blog/${slug}`,
      siteName: "SaiOrb",
      type: "article",
      publishedTime: post.publishedAt,
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.excerpt ?? post.content.slice(0, 160),
    },
    alternates: { canonical: `${siteUrl}/blog/${slug}` },
  };
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = findPost(slug);

  if (!post) notFound();

  return (
    <main className="container mx-auto px-4 py-8 max-w-3xl">
      <nav className="text-sm text-gray-500 mb-4">
        <Link href="/" className="hover:underline">
          Home
        </Link>
        {" / "}
        <Link href="/blog" className="hover:underline">
          Blog
        </Link>
        {" / "}
        <span className="text-gray-700 dark:text-gray-300">{post.title}</span>
      </nav>

      <article>
        <header className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-2">
            {post.title}
          </h1>
          <div className="flex flex-wrap items-center gap-3 text-sm text-gray-500">
            <time dateTime={post.publishedAt}>
              {new Date(post.publishedAt).toLocaleDateString("en-IN", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </time>
            {post.author && <span>By {post.author}</span>}
          </div>
          {post.tags && post.tags.length > 0 && (
            <div className="mt-3 flex flex-wrap gap-2">
              {post.tags.map((tag) => (
                <span
                  key={tag}
                  className="text-xs bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 px-2 py-1 rounded"
                >
                  {tag}
                </span>
              ))}
            </div>
          )}
        </header>

        <div
          className="prose dark:prose-invert max-w-none"
          dangerouslySetInnerHTML={{ __html: post.content }}
        />

        <footer className="mt-10 pt-6 border-t dark:border-gray-700">
          <Link href="/blog" className="text-blue-600 hover:underline">
            ← Back to all posts
          </Link>
        </footer>
      </article>
    </main>
  );
}