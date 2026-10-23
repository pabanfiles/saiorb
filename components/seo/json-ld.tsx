// components/seo/json-ld.tsx
import type { ToolDefinition } from "@/lib/tools-data";

const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://saiorb.pages.dev";

// ✅ Main WebApplication schema (tool page এর জন্য)
export function JsonLd({ tool }: { tool: ToolDefinition }) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: tool.name_en,
    description: tool.description_en,
    url: `${SITE_URL}/${tool.slug}`,
    applicationCategory: "UtilityApplication",
    operatingSystem: "Any",
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "USD",
    },
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: "4.8",
      ratingCount: "1024",
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

// ✅ Alias (পুরনো code compatibility)
export const ToolJsonLd = JsonLd;

// ✅ WebSite schema (layout.tsx এ use হবে)
export function WebSiteJsonLd() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "SaiOrb",
    url: SITE_URL,
    description:
      "Free online tools for PDF, images, video, govt ID forms, finance, and developer utilities. 100% client-side, zero upload.",
    potentialAction: {
      "@type": "SearchAction",
      target: {
        "@type": "EntryPoint",
        urlTemplate: `${SITE_URL}/search?q={search_term_string}`,
      },
      "query-input": "required name=search_term_string",
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

// ✅ FAQ schema (tool page এ use হবে)
export function FAQJsonLd({ tool }: { tool: ToolDefinition }) {
  const faqs = tool.faqsEn;
  if (!faqs || faqs.length === 0) return null;

  const schema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.q,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.a,
      },
    })),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

// ✅ Breadcrumb schema (tool page এ use হবে)
export function BreadcrumbJsonLd({ tool }: { tool: ToolDefinition }) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: SITE_URL,
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Tools",
        item: `${SITE_URL}/tools`,
      },
      {
        "@type": "ListItem",
        position: 3,
        name: tool.name_en,
        item: `${SITE_URL}/${tool.slug}`,
      },
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}