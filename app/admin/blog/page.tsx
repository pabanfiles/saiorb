"use client";

import React, { useState } from "react";
import { FileText, Plus, Save, Trash2 } from "lucide-react";
import { toast } from "sonner";

export default function AdminBlogPage() {
  const [posts, setPosts] = useState([
    {
      id: "post_1",
      slug: "how-to-crop-photo-50kb",
      title: "How to Crop and Resize Photos to Exactly 50KB for Online Applications",
      status: "published",
      date: "2026-10-22",
    },
    {
      id: "post_2",
      slug: "keep-document-under-200kb",
      title: "How to Keep Scanned Document PDF Sizes Under 200KB",
      status: "published",
      date: "2026-10-20",
    },
    {
      id: "post_3",
      slug: "pan-card-photo-signature-resizer",
      title: "Guidelines for 213x213 Pixel Photo and Signature Sizing",
      status: "draft",
      date: "2026-10-18",
    },
  ]);

  const [activeTab, setActiveTab] = useState<"list" | "create">("list");
  const [formData, setFormData] = useState({
    title: "",
    slug: "",
    excerpt: "",
    content: "",
    status: "published",
  });

  const handleCreatePost = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.title || !formData.content) {
      toast.error("Title and Content are required.");
      return;
    }

    const newPost = {
      id: "post_" + Math.random().toString(36).substring(7),
      slug: formData.slug || formData.title.toLowerCase().replace(/[^a-z0-9]+/g, "-"),
      title: formData.title,
      status: formData.status,
      date: new Date().toISOString().split("T")[0],
    };

    setPosts([newPost, ...posts]);
    setActiveTab("list");
    toast.success("Blog article published successfully!");
  };

  return (
    <div className="space-y-6 text-gray-900">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
        <div>
          <h1 className="text-xl sm:text-2xl font-bold text-gray-900">Blog & Content CMS</h1>
          <p className="text-xs text-gray-500 mt-0.5">Manage user tutorials, tool guides, and announcements</p>
        </div>
        <button
          onClick={() => setActiveTab(activeTab === "list" ? "create" : "list")}
          className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-md text-xs font-semibold flex items-center gap-1.5 shadow-xs transition cursor-pointer"
        >
          <Plus className="w-4 h-4" />
          {activeTab === "list" ? "Create New Article" : "View Article List"}
        </button>
      </div>

      {activeTab === "list" ? (
        <div className="bg-white border border-gray-200 rounded-lg overflow-hidden shadow-xs">
          <table className="w-full text-left text-xs">
            <thead className="bg-gray-50 border-b border-gray-200 text-gray-500 font-semibold uppercase tracking-wider">
              <tr>
                <th className="p-3.5">Title & Slug</th>
                <th className="p-3.5">Date</th>
                <th className="p-3.5">Status</th>
                <th className="p-3.5 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {posts.map((post) => (
                <tr key={post.id} className="hover:bg-gray-50/80 transition">
                  <td className="p-3.5">
                    <p className="font-bold text-gray-900">{post.title}</p>
                    <p className="text-[11px] text-gray-400 font-mono">/{post.slug}</p>
                  </td>
                  <td className="p-3.5 text-gray-500">{post.date}</td>
                  <td className="p-3.5">
                    <span
                      className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                        post.status === "published"
                          ? "bg-emerald-100 text-emerald-800"
                          : "bg-amber-100 text-amber-800"
                      }`}
                    >
                      {post.status === "published" ? "Published" : "Draft"}
                    </span>
                  </td>
                  <td className="p-3.5 text-right">
                    <button
                      onClick={() => {
                        setPosts(posts.filter((p) => p.id !== post.id));
                        toast.success("Post removed.");
                      }}
                      className="p-1.5 text-red-500 hover:bg-red-50 rounded"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <form
          onSubmit={handleCreatePost}
          className="p-6 bg-white border border-gray-200 rounded-lg space-y-4 shadow-xs"
        >
          <div>
            <label className="block text-xs font-semibold text-gray-700 mb-1">
              Article Title *
            </label>
            <input
              type="text"
              required
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              placeholder="e.g., How to Convert PDF to Word Without Formatting Loss"
              className="w-full px-3.5 py-2.5 text-sm bg-gray-50 border border-gray-300 rounded-md"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-gray-700 mb-1">
                URL Slug
              </label>
              <input
                type="text"
                value={formData.slug}
                onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
                placeholder="convert-pdf-to-word-guide"
                className="w-full px-3.5 py-2 text-sm bg-gray-50 border border-gray-300 rounded-md font-mono text-xs"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-gray-700 mb-1">Status</label>
              <select
                value={formData.status}
                onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                className="w-full px-3.5 py-2 text-sm bg-gray-50 border border-gray-300 rounded-md"
              >
                <option value="published">Publish Immediately</option>
                <option value="draft">Save as Draft</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-gray-700 mb-1">
              Short Excerpt
            </label>
            <input
              type="text"
              value={formData.excerpt}
              onChange={(e) => setFormData({ ...formData, excerpt: e.target.value })}
              placeholder="A brief 1-2 sentence preview of the article..."
              className="w-full px-3.5 py-2 text-sm bg-gray-50 border border-gray-300 rounded-md"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-gray-700 mb-1">
              Content (Markdown or Plain Text) *
            </label>
            <textarea
              rows={8}
              required
              value={formData.content}
              onChange={(e) => setFormData({ ...formData, content: e.target.value })}
              placeholder="Write your article body here..."
              className="w-full px-3.5 py-2 text-sm bg-gray-50 border border-gray-300 rounded-md font-mono text-xs"
            />
          </div>

          <button
            type="submit"
            className="py-2.5 px-6 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-md text-sm transition flex items-center justify-center gap-2 shadow-xs cursor-pointer"
          >
            <Save className="w-4 h-4" />
            Publish Article
          </button>
        </form>
      )}
    </div>
  );
}
