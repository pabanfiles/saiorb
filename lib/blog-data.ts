export interface BlogPost {
  slug: string;
  title: string;
  excerpt: string;
  date: string;
  readTime: string;
  cover: string;
  category: string;
}

export const BLOG_POSTS: BlogPost[] = [
  {
    slug: "voter-card-photo-resize-guide",
    title: "How to Resize Application Photos to Exact 50KB Without Quality Loss",
    excerpt: "Online application portals strictly require photos under 50KB with exact 3.5 x 4.5 cm aspect ratios. Learn how to resize and compress photos directly in your browser.",
    date: "October 22, 2026",
    readTime: "4 min read",
    cover: "https://picsum.photos/seed/voterblog/800/450",
    category: "Guides",
  },
  {
    slug: "aadhaar-document-under-200kb-guide",
    title: "How to Compress Scanned Documents Under 200KB for Digital Submissions",
    excerpt: "Learn how to convert oversized mobile camera photos into crisp, legible PDF documents under 200KB with zero server uploads.",
    date: "October 20, 2026",
    readTime: "3 min read",
    cover: "https://picsum.photos/seed/aadhaarblog/800/450",
    category: "Documents",
  },
  {
    slug: "pan-card-photo-signature-213px-resizer",
    title: "Step-by-Step Guide for 213x213 Pixel Photo & Signature Resizing",
    excerpt: "A complete walkthrough on how to prepare images to exact 213x213 pixel dimensions and 30KB file sizes required by portal validators.",
    date: "October 18, 2026",
    readTime: "5 min read",
    cover: "https://picsum.photos/seed/panblog/800/450",
    category: "Tutorials",
  },
  {
    slug: "merge-pdf-in-browser-safely",
    title: "How to Merge Confidential PDF Documents Purely in Client Browser",
    excerpt: "Uploading bank statements and legal contracts to remote cloud converters poses privacy hazards. Discover how browser-based WebAssembly keeps files safe.",
    date: "October 15, 2026",
    readTime: "3 min read",
    cover: "https://picsum.photos/seed/pdfmergeblog/800/450",
    category: "Security",
  },
];
