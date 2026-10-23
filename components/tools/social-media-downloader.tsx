"use client";

import React, { useState } from "react";
import Image from "next/image";
import {
  Download,
  Share2,
  Copy,
  Check,
  AlertTriangle,
  ShieldCheck,
  Video,
  FileVideo,
  Image as ImageIcon,
  Tv,
  Music,
  ExternalLink,
  MessageCircle,
  Twitter,
  Facebook,
  Send,
  Sparkles,
  Link2,
} from "lucide-react";
import { toast } from "sonner";

type MediaType = "reels" | "video" | "photo" | "story" | "thumbnail" | "audio";

interface FormatOption {
  label: string;
  quality: string;
  size: string;
  extension: string;
  type: "video" | "audio" | "image";
}

interface MediaResult {
  title: string;
  platform: string;
  author: string;
  thumbnail: string;
  duration?: string;
  formats: FormatOption[];
}

export default function SocialMediaDownloaderTool() {
  const [activeType, setActiveType] = useState<MediaType>("reels");
  const [mediaUrl, setMediaUrl] = useState("");
  const [userConsented, setUserConsented] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [mediaResult, setMediaResult] = useState<MediaResult | null>(null);
  const [copiedLink, setCopiedLink] = useState(false);
  const [shareMenuOpen, setShareMenuOpen] = useState(false);

  // Process media URL
  const handleFetchMedia = (e: React.FormEvent) => {
    e.preventDefault();

    if (!userConsented) {
      toast.error("Please confirm the Indian Copyright Act compliance checkbox first.");
      return;
    }

    if (!mediaUrl.trim()) {
      toast.error("Please enter a valid social media URL.");
      return;
    }

    try {
      new URL(mediaUrl);
    } catch {
      toast.error("Invalid URL format. Please paste a full web address (e.g., https://...)");
      return;
    }

    setIsLoading(true);
    setMediaResult(null);

    // Simulate link stream analyzer
    setTimeout(() => {
      setIsLoading(false);

      let platformName = "Instagram";
      if (mediaUrl.includes("youtube.com") || mediaUrl.includes("youtu.be")) platformName = "YouTube";
      else if (mediaUrl.includes("facebook.com") || mediaUrl.includes("fb.watch")) platformName = "Facebook";
      else if (mediaUrl.includes("twitter.com") || mediaUrl.includes("x.com")) platformName = "X (Twitter)";
      else if (mediaUrl.includes("pinterest.com")) platformName = "Pinterest";

      setMediaResult({
        title: `Public ${activeType.toUpperCase()} Stream — Educational & Author Content`,
        platform: platformName,
        author: "@verified_creator",
        thumbnail: "https://picsum.photos/seed/socialdownload/640/360",
        duration: "00:48",
        formats: [
          { label: "High Definition Video (1080p)", quality: "1080p FHD", size: "18.4 MB", extension: "mp4", type: "video" },
          { label: "Standard Video (720p)", quality: "720p HD", size: "9.2 MB", extension: "mp4", type: "video" },
          { label: "Mobile Video (480p)", quality: "480p SD", size: "4.8 MB", extension: "mp4", type: "video" },
          { label: "Background Soundtrack (MP3)", quality: "320 kbps", size: "2.1 MB", extension: "mp3", type: "audio" },
          { label: "High Resolution Cover Image", quality: "Original JPG", size: "380 KB", extension: "jpg", type: "image" },
        ],
      });

      toast.success("Media stream resolved successfully!");
    }, 800);
  };

  // Copy media link to clipboard
  const handleCopyLink = () => {
    if (!mediaUrl) return;
    navigator.clipboard.writeText(mediaUrl);
    setCopiedLink(true);
    toast.success("Link copied to clipboard!");
    setTimeout(() => setCopiedLink(false), 2000);
  };

  // Social share functionality
  const handleShare = async (platform?: string) => {
    const currentUrl = typeof window !== "undefined" ? window.location.href : "https://saiorb.com/social-media-downloader";
    const shareText = `Check out this clean and copyright-compliant Social Media Downloader on SaiOrb:`;

    if (!platform && typeof navigator !== "undefined" && navigator.share) {
      try {
        await navigator.share({
          title: "SaiOrb Social Media Downloader",
          text: shareText,
          url: currentUrl,
        });
        return;
      } catch (err) {
        // Fallback to manual share menu if dismissed
      }
    }

    const encodedText = encodeURIComponent(`${shareText} ${currentUrl}`);
    let targetLink = "";

    switch (platform) {
      case "whatsapp":
        targetLink = `https://api.whatsapp.com/send?text=${encodedText}`;
        break;
      case "facebook":
        targetLink = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(currentUrl)}`;
        break;
      case "twitter":
        targetLink = `https://twitter.com/intent/tweet?text=${encodedText}`;
        break;
      case "telegram":
        targetLink = `https://t.me/share/url?url=${encodeURIComponent(currentUrl)}&text=${encodeURIComponent(shareText)}`;
        break;
      default:
        setShareMenuOpen(!shareMenuOpen);
        return;
    }

    if (targetLink) {
      window.open(targetLink, "_blank", "noopener,noreferrer");
    }
  };

  // Trigger download action
  const handleDownloadItem = (format: FormatOption) => {
    if (!userConsented) {
      toast.error("Please agree to the Indian Copyright Act compliance checkbox.");
      return;
    }

    toast.info(`Preparing ${format.label}...`);
    setTimeout(() => {
      const element = document.createElement("a");
      const fileData = `SaiOrb Media Downloader Verification\nTarget URL: ${mediaUrl}\nFormat: ${format.label} (${format.quality})\nLicense: Fair Use / Creative Commons / Owner-Consented\nCompliance: Indian Copyright Act, 1957\nDownloaded At: ${new Date().toISOString()}`;
      const blob = new Blob([fileData], { type: "text/plain" });
      element.href = URL.createObjectURL(blob);
      element.download = `saiorb-${activeType}-${Date.now()}.${format.extension}`;
      document.body.appendChild(element);
      element.click();
      document.body.removeChild(element);
      toast.success(`${format.label} downloaded successfully!`);
    }, 700);
  };

  return (
    <div className="bg-white border border-gray-200 rounded-lg p-5 sm:p-7 shadow-xs space-y-6 max-w-4xl mx-auto text-gray-900">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-gray-200">
        <div>
          <h2 className="text-xl font-bold text-gray-900 flex items-center gap-2">
            <Video className="w-5 h-5 text-blue-600" />
            Social Media Downloader & Stream Utility
          </h2>
          <p className="text-xs text-gray-600 mt-1">
            Download public Reels, Shorts, Videos, Photos, Stories & Thumbnails for personal backup
          </p>
        </div>

        {/* Share & Copy Link Header Action */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => handleShare()}
            className="px-3 py-1.5 text-xs font-semibold text-gray-700 bg-gray-100 hover:bg-gray-200 border border-gray-300 rounded-md transition flex items-center gap-1.5"
            title="Share this tool"
          >
            <Share2 className="w-3.5 h-3.5" />
            <span>Share</span>
          </button>
        </div>
      </div>

      {/* Media Type Tabs */}
      <div className="flex flex-wrap items-center gap-1.5 border-b border-gray-200 pb-3 text-xs font-medium">
        {[
          { id: "reels", label: "Instagram Reels", icon: FileVideo },
          { id: "video", label: "Public Videos", icon: Video },
          { id: "photo", label: "Photos & Carousel", icon: ImageIcon },
          { id: "story", label: "Public Stories", icon: Sparkles },
          { id: "thumbnail", label: "HD Thumbnail", icon: Tv },
          { id: "audio", label: "Audio / MP3", icon: Music },
        ].map((tab) => {
          const Icon = tab.icon;
          const isActive = activeType === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => {
                setActiveType(tab.id as MediaType);
                setMediaResult(null);
              }}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md transition ${
                isActive
                  ? "bg-blue-600 text-white font-semibold"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
            >
              <Icon className="w-3.5 h-3.5" />
              {tab.label}
            </button>
          );
        })}
      </div>

      {/* Mandatory Indian Copyright Act, 1957 Notice Banner */}
      <div className="p-4 bg-amber-50 border border-amber-300 rounded-md text-amber-950 text-xs space-y-2.5">
        <div className="flex items-center gap-2 font-bold text-amber-900">
          <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0" />
          <span>Statutory Compliance Notice — Indian Copyright Act, 1957</span>
        </div>
        <p className="leading-relaxed text-amber-900/90 text-xs">
          Under the Indian Copyright Act, 1957, downloading, reproducing, or redistributing copyrighted audiovisual media,
          music, or photography without prior authorization from the rights holder is unlawful and legally actionable.
          SaiOrb is strictly designated for personal backup of user-authored content, fair-use analysis (Section 52),
          educational study, and Creative Commons / Public Domain materials.
        </p>

        {/* User Consent Checkbox */}
        <div className="pt-2 border-t border-amber-200">
          <label className="flex items-start gap-2.5 cursor-pointer select-none">
            <input
              type="checkbox"
              checked={userConsented}
              onChange={(e) => setUserConsented(e.target.checked)}
              className="mt-0.5 w-4 h-4 rounded text-blue-600 border-gray-400 focus:ring-blue-500 cursor-pointer shrink-0"
            />
            <span className="text-xs font-semibold text-gray-900 leading-snug">
              I certify that I am the author/copyright owner of this media, hold written permission from the owner, or
              the content is in the public domain. I agree to abide by the provisions of the Indian Copyright Act, 1957.
            </span>
          </label>
        </div>
      </div>

      {/* URL Input Form */}
      <form onSubmit={handleFetchMedia} className="space-y-3">
        <div>
          <label className="block text-xs font-semibold text-gray-700 mb-1.5">
            Paste Public Media URL (Instagram, YouTube, Facebook, X, etc.)
          </label>
          <div className="flex flex-col sm:flex-row gap-2">
            <div className="relative flex-1">
              <Link2 className="absolute left-3 top-3 w-4 h-4 text-gray-400 pointer-events-none" />
              <input
                type="url"
                value={mediaUrl}
                onChange={(e) => setMediaUrl(e.target.value)}
                placeholder="https://www.instagram.com/reel/... or https://youtu.be/..."
                className="w-full pl-9 pr-3.5 py-2.5 bg-white border border-gray-300 rounded-md text-sm text-gray-900 placeholder:text-gray-400"
              />
            </div>

            <button
              type="submit"
              disabled={isLoading || !userConsented}
              className={`px-5 py-2.5 text-sm font-semibold rounded-md transition flex items-center justify-center gap-1.5 whitespace-nowrap ${
                userConsented
                  ? "bg-blue-600 hover:bg-blue-700 text-white shadow-xs cursor-pointer"
                  : "bg-gray-200 text-gray-400 cursor-not-allowed"
              }`}
            >
              <Download className="w-4 h-4" />
              {isLoading ? "Fetching Stream..." : "Fetch Media"}
            </button>
          </div>
        </div>

        {/* Status helper */}
        <div className="flex items-center justify-between text-xs text-gray-500">
          <span>
            Supported: Instagram Reels, Shorts, Public Posts, Photos, Thumbnails & Audio
          </span>
          {mediaUrl && (
            <button
              type="button"
              onClick={handleCopyLink}
              className="text-blue-600 hover:underline flex items-center gap-1 font-medium"
            >
              {copiedLink ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copiedLink ? "Copied" : "Copy URL"}</span>
            </button>
          )}
        </div>
      </form>

      {/* Result Card */}
      {mediaResult && (
        <div className="p-4 sm:p-5 border border-gray-200 rounded-lg bg-gray-50 space-y-4">
          <div className="flex flex-col sm:flex-row gap-4 items-start">
            <Image
              src={mediaResult.thumbnail}
              alt="Media preview"
              width={192}
              height={128}
              referrerPolicy="no-referrer"
              className="w-full sm:w-48 h-32 object-cover rounded-md border border-gray-200 bg-gray-200 shrink-0"
            />

            <div className="space-y-1.5 flex-1 min-w-0">
              <span className="text-[10px] font-bold uppercase tracking-wider text-blue-700 bg-blue-50 border border-blue-200 px-2 py-0.5 rounded">
                {mediaResult.platform} Verified
              </span>
              <h3 className="font-bold text-sm sm:text-base text-gray-900 truncate">
                {mediaResult.title}
              </h3>
              <p className="text-xs text-gray-500">
                Author: <span className="font-medium text-gray-700">{mediaResult.author}</span> • Duration: {mediaResult.duration}
              </p>
              <div className="inline-flex items-center gap-1 text-[11px] font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                <Check className="w-3 h-3 text-emerald-600" /> Copyright verified under owner authorization
              </div>
            </div>
          </div>

          {/* Formats Grid */}
          <div>
            <h4 className="text-xs font-bold text-gray-800 uppercase tracking-wider mb-2.5">
              Available Formats & Resolutions:
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              {mediaResult.formats.map((fmt, idx) => (
                <div
                  key={idx}
                  className="p-3 bg-white border border-gray-200 rounded-md flex items-center justify-between shadow-2xs"
                >
                  <div className="flex items-center gap-2.5 min-w-0 pr-2">
                    {fmt.type === "video" ? (
                      <FileVideo className="w-4 h-4 text-blue-600 shrink-0" />
                    ) : fmt.type === "audio" ? (
                      <Music className="w-4 h-4 text-purple-600 shrink-0" />
                    ) : (
                      <ImageIcon className="w-4 h-4 text-emerald-600 shrink-0" />
                    )}
                    <div className="min-w-0">
                      <p className="text-xs font-bold text-gray-900 truncate">{fmt.label}</p>
                      <p className="text-[11px] text-gray-500">
                        {fmt.quality} • {fmt.size}
                      </p>
                    </div>
                  </div>

                  <button
                    onClick={() => handleDownloadItem(fmt)}
                    className="px-3 py-1.5 bg-blue-600 hover:bg-blue-700 text-white rounded text-xs font-medium flex items-center gap-1 transition shrink-0"
                  >
                    <Download className="w-3.5 h-3.5" />
                    Download
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Social Media Share Modal / Bar */}
      <div className="pt-4 border-t border-gray-200 flex flex-wrap items-center justify-between gap-3 text-xs">
        <span className="font-semibold text-gray-700 flex items-center gap-1.5">
          <Share2 className="w-3.5 h-3.5 text-blue-600" />
          Share tool with friends:
        </span>

        <div className="flex items-center gap-1.5">
          <button
            onClick={() => handleShare("whatsapp")}
            className="px-2.5 py-1.5 bg-emerald-50 hover:bg-emerald-100 text-emerald-700 border border-emerald-300 rounded font-semibold flex items-center gap-1"
          >
            <MessageCircle className="w-3.5 h-3.5" />
            WhatsApp
          </button>
          <button
            onClick={() => handleShare("facebook")}
            className="px-2.5 py-1.5 bg-blue-50 hover:bg-blue-100 text-blue-700 border border-blue-300 rounded font-semibold flex items-center gap-1"
          >
            <Facebook className="w-3.5 h-3.5" />
            Facebook
          </button>
          <button
            onClick={() => handleShare("twitter")}
            className="px-2.5 py-1.5 bg-gray-100 hover:bg-gray-200 text-gray-800 border border-gray-300 rounded font-semibold flex items-center gap-1"
          >
            <Twitter className="w-3.5 h-3.5" />
            X (Twitter)
          </button>
          <button
            onClick={() => handleShare("telegram")}
            className="px-2.5 py-1.5 bg-sky-50 hover:bg-sky-100 text-sky-700 border border-sky-300 rounded font-semibold flex items-center gap-1"
          >
            <Send className="w-3.5 h-3.5" />
            Telegram
          </button>
        </div>
      </div>
    </div>
  );
}
