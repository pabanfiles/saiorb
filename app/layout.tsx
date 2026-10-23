import type { Metadata } from "next";
import "./globals.css";
import { AppProvider } from "@/lib/context";
import Header from "@/components/layout/header";
import Footer from "@/components/layout/footer";
import { Toaster } from "sonner";
import { WebSiteJsonLd } from "@/components/seo/json-ld";

export const metadata: Metadata = {
  metadataBase: new URL("https://saiorb.com"),
  title: {
    default: "SaiOrb - All Tools, One Place | 128 Web Utilities",
    template: "%s | SaiOrb - All Tools, One Place",
  },
  description:
    "All tools in one place. 128 essential digital tools: PDF merge, image compression, photo resize, QR codes, document tools, and utilities. 100% free, private, and browser-based.",
  keywords: [
    "SaiOrb",
    "online tools",
    "pdf merge",
    "image compressor",
    "photo resizer",
    "qr generator",
    "document converter",
    "free web utilities",
    "browser based tools",
    "all tools one place",
  ],
  authors: [{ name: "SaiOrb Architecture Team" }],
  creator: "SaiOrb",
  publisher: "SaiOrb Media",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    title: "SaiOrb - All Tools, One Place",
    description: "128 powerful digital tools: PDF, Image, Video, Social Media, Govt IDs, and Utilities.",
    url: "https://saiorb.com",
    siteName: "SaiOrb",
    locale: "en_US",
    type: "website",
    images: [
      {
        url: "https://picsum.photos/seed/saiorbbanner/1200/630",
        width: 1200,
        height: 630,
        alt: "SaiOrb - All Tools, One Place",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "SaiOrb - All Tools, One Place",
    description: "128 web utility tools for productivity and document handling.",
    images: ["https://picsum.photos/seed/saiorbbanner/1200/630"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  manifest: "/manifest.json",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <WebSiteJsonLd />
        <meta name="theme-color" content="#2563EB" />
      </head>
      <body className="antialiased min-h-screen flex flex-col selection:bg-blue-600 selection:text-white" suppressHydrationWarning>
        <AppProvider>
          <Header />
          <main className="flex-1 w-full">{children}</main>
          <Footer />
          <Toaster richColors position="top-right" />
        </AppProvider>
      </body>
    </html>
  );
}
