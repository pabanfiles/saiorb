"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { Calendar, Clock, ArrowRight, BookOpen } from "lucide-react";
import { BLOG_POSTS } from "@/lib/blog-data";

export default function BlogListPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16 space-y-10 text-gray-900">
      <div className="space-y-2">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-50 border border-blue-200 text-blue-700 text-xs font-semibold">
          <BookOpen className="w-3.5 h-3.5" />
          <span>Tutorials & Guides</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-bold text-gray-900">
          SaiOrb Knowledge Base & Guides
        </h1>
        <p className="text-sm sm:text-base text-gray-600 max-w-2xl">
          Practical tutorials on image sizing, document compression, and browser-based utility workflows.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {BLOG_POSTS.map((post) => (
          <article
            key={post.slug}
            className="group bg-white border border-gray-200 rounded-lg overflow-hidden hover:border-gray-300 transition-all flex flex-col justify-between shadow-2xs hover:shadow-xs"
          >
            <div>
              <div className="relative aspect-video w-full overflow-hidden bg-gray-100">
                <Image
                  src={post.cover}
                  alt={post.title}
                  width={800}
                  height={450}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover group-hover:scale-102 transition duration-300"
                />
                <span className="absolute top-3 left-3 px-2.5 py-0.5 bg-black/75 text-white rounded text-[11px] font-semibold">
                  {post.category}
                </span>
              </div>

              <div className="p-5 sm:p-6 space-y-2.5">
                <div className="flex items-center gap-4 text-xs text-gray-500">
                  <span className="flex items-center gap-1.5">
                    <Calendar className="w-3.5 h-3.5" />
                    {post.date}
                  </span>
                  <span className="flex items-center gap-1.5">
                    <Clock className="w-3.5 h-3.5" />
                    {post.readTime}
                  </span>
                </div>

                <h2 className="text-base sm:text-lg font-bold text-gray-900 group-hover:text-blue-600 transition leading-snug">
                  <Link href={`/blog/${post.slug}`}>{post.title}</Link>
                </h2>

                <p className="text-xs sm:text-sm text-gray-600 line-clamp-2 leading-relaxed">
                  {post.excerpt}
                </p>
              </div>
            </div>

            <div className="p-5 sm:p-6 pt-0 border-t border-gray-100">
              <Link
                href={`/blog/${post.slug}`}
                className="inline-flex items-center gap-1.5 text-xs font-semibold text-blue-600 hover:text-blue-800 transition"
              >
                <span>Read Full Guide</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}
