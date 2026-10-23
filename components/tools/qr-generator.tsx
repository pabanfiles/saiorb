"use client";

import React, { useState, useEffect } from "react";
import QRCode from "qrcode";
import { QrCode, Download, Copy, Check, Globe, CreditCard, Wifi, User, Share2, Palette } from "lucide-react";
import { toast } from "sonner";

type QRType = "url" | "upi" | "wifi" | "vcard" | "text";

export default function QrGeneratorTool() {
  const [activeTab, setActiveTab] = useState<QRType>("url");
  const [qrDataUrl, setQrDataUrl] = useState<string>("");
  const [fgColor, setFgColor] = useState<string>("#000000");
  const [bgColor, setBgColor] = useState<string>("#ffffff");

  const [urlInput, setUrlInput] = useState<string>("https://saiorb.com");
  const [textInput, setTextInput] = useState<string>("");

  const [upiId, setUpiId] = useState<string>("");
  const [upiName, setUpiName] = useState<string>("");
  const [upiAmount, setUpiAmount] = useState<string>("");

  const [wifiSsid, setWifiSsid] = useState<string>("");
  const [wifiPass, setWifiPass] = useState<string>("");
  const [wifiType, setWifiType] = useState<string>("WPA");

  const [cardName, setCardName] = useState<string>("");
  const [cardPhone, setCardPhone] = useState<string>("");
  const [cardEmail, setCardEmail] = useState<string>("");

  const [copied, setCopied] = useState<boolean>(false);

  const getQRContent = React.useCallback((): string => {
    switch (activeTab) {
      case "url":
        return urlInput.trim() || "https://saiorb.com";
      case "upi": {
        if (!upiId) return "upi://pay?pa=merchant@upi&pn=SaiOrb";
        let upiStr = `upi://pay?pa=${encodeURIComponent(upiId)}&pn=${encodeURIComponent(upiName || "Payee")}`;
        if (upiAmount) upiStr += `&am=${encodeURIComponent(upiAmount)}&cu=INR`;
        return upiStr;
      }
      case "wifi":
        if (!wifiSsid) return "WIFI:S:MyWifi;T:WPA;P:password;;";
        return `WIFI:S:${wifiSsid};T:${wifiType};P:${wifiPass};;`;
      case "vcard":
        return `BEGIN:VCARD\nVERSION:3.0\nN:${cardName || "User"}\nFN:${cardName || "User"}\nTEL:${cardPhone}\nEMAIL:${cardEmail}\nEND:VCARD`;
      case "text":
        return textInput.trim() || "SaiOrb - All Tools, One Place";
      default:
        return "https://saiorb.com";
    }
  }, [activeTab, urlInput, upiId, upiName, upiAmount, wifiSsid, wifiType, wifiPass, cardName, cardPhone, cardEmail, textInput]);

  useEffect(() => {
    const generateQR = async () => {
      try {
        const text = getQRContent();
        const url = await QRCode.toDataURL(text, {
          width: 320,
          margin: 2,
          color: {
            dark: fgColor,
            light: bgColor,
          },
        });
        setQrDataUrl(url);
      } catch (err) {
        console.error("QR Code generation error:", err);
      }
    };
    generateQR();
  }, [getQRContent, fgColor, bgColor]);

  const handleCopyContent = () => {
    navigator.clipboard.writeText(getQRContent());
    setCopied(true);
    toast.success("Content copied to clipboard!");
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="bg-white border border-gray-200 rounded-lg p-5 sm:p-7 shadow-xs space-y-6 text-gray-900">
      <div>
        <h2 className="text-xl font-bold text-gray-900 flex items-center gap-2">
          <QrCode className="w-5 h-5 text-blue-600" />
          QR Code Generator
        </h2>
        <p className="text-xs text-gray-600 mt-1">
          Generate instant, high-resolution QR codes for websites, UPI payments, Wi-Fi keys, and vCards.
        </p>
      </div>

      {/* Type Selection Tabs */}
      <div className="flex flex-wrap items-center gap-1.5 border-b border-gray-200 pb-3 text-xs font-medium">
        {[
          { id: "url", label: "Website URL", icon: Globe },
          { id: "upi", label: "UPI Payment", icon: CreditCard },
          { id: "wifi", label: "Wi-Fi Key", icon: Wifi },
          { id: "vcard", label: "Contact (vCard)", icon: User },
          { id: "text", label: "Plain Text", icon: Share2 },
        ].map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as QRType)}
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

      {/* Main Workspace Layout */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Form Inputs (2 Cols) */}
        <div className="md:col-span-2 space-y-4">
          {activeTab === "url" && (
            <div className="space-y-1.5">
              <label className="block text-xs font-semibold text-gray-700">Website Address (URL)</label>
              <input
                type="url"
                value={urlInput}
                onChange={(e) => setUrlInput(e.target.value)}
                placeholder="https://example.com"
                className="w-full px-3.5 py-2.5 bg-white border border-gray-300 rounded-md text-sm text-gray-900"
              />
            </div>
          )}

          {activeTab === "upi" && (
            <div className="space-y-3">
              <div className="space-y-1">
                <label className="block text-xs font-semibold text-gray-700">UPI ID / VPA *</label>
                <input
                  type="text"
                  value={upiId}
                  onChange={(e) => setUpiId(e.target.value)}
                  placeholder="e.g., yourname@okhdfcbank or merchant@upi"
                  className="w-full px-3.5 py-2 bg-white border border-gray-300 rounded-md text-sm text-gray-900"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="block text-xs font-semibold text-gray-700">Payee Name (Optional)</label>
                  <input
                    type="text"
                    value={upiName}
                    onChange={(e) => setUpiName(e.target.value)}
                    placeholder="e.g., Store Name"
                    className="w-full px-3.5 py-2 bg-white border border-gray-300 rounded-md text-sm text-gray-900"
                  />
                </div>
                <div className="space-y-1">
                  <label className="block text-xs font-semibold text-gray-700">Fixed Amount ₹ (Optional)</label>
                  <input
                    type="number"
                    value={upiAmount}
                    onChange={(e) => setUpiAmount(e.target.value)}
                    placeholder="e.g., 250"
                    className="w-full px-3.5 py-2 bg-white border border-gray-300 rounded-md text-sm text-gray-900"
                  />
                </div>
              </div>
            </div>
          )}

          {activeTab === "wifi" && (
            <div className="space-y-3">
              <div className="space-y-1">
                <label className="block text-xs font-semibold text-gray-700">Wi-Fi Network Name (SSID) *</label>
                <input
                  type="text"
                  value={wifiSsid}
                  onChange={(e) => setWifiSsid(e.target.value)}
                  placeholder="e.g., Home_Fiber_5G"
                  className="w-full px-3.5 py-2 bg-white border border-gray-300 rounded-md text-sm text-gray-900"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="block text-xs font-semibold text-gray-700">Password</label>
                  <input
                    type="text"
                    value={wifiPass}
                    onChange={(e) => setWifiPass(e.target.value)}
                    placeholder="Network password"
                    className="w-full px-3.5 py-2 bg-white border border-gray-300 rounded-md text-sm text-gray-900"
                  />
                </div>
                <div className="space-y-1">
                  <label className="block text-xs font-semibold text-gray-700">Security Type</label>
                  <select
                    value={wifiType}
                    onChange={(e) => setWifiType(e.target.value)}
                    className="w-full px-3.5 py-2 bg-white border border-gray-300 rounded-md text-sm text-gray-900"
                  >
                    <option value="WPA">WPA / WPA2 / WPA3</option>
                    <option value="WEP">WEP</option>
                    <option value="nopass">None (Open)</option>
                  </select>
                </div>
              </div>
            </div>
          )}

          {activeTab === "vcard" && (
            <div className="space-y-3">
              <div className="space-y-1">
                <label className="block text-xs font-semibold text-gray-700">Full Name</label>
                <input
                  type="text"
                  value={cardName}
                  onChange={(e) => setCardName(e.target.value)}
                  placeholder="e.g., John Doe"
                  className="w-full px-3.5 py-2 bg-white border border-gray-300 rounded-md text-sm text-gray-900"
                />
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="block text-xs font-semibold text-gray-700">Phone Number</label>
                  <input
                    type="tel"
                    value={cardPhone}
                    onChange={(e) => setCardPhone(e.target.value)}
                    placeholder="+91 98765 43210"
                    className="w-full px-3.5 py-2 bg-white border border-gray-300 rounded-md text-sm text-gray-900"
                  />
                </div>
                <div className="space-y-1">
                  <label className="block text-xs font-semibold text-gray-700">Email Address</label>
                  <input
                    type="email"
                    value={cardEmail}
                    onChange={(e) => setCardEmail(e.target.value)}
                    placeholder="contact@domain.com"
                    className="w-full px-3.5 py-2 bg-white border border-gray-300 rounded-md text-sm text-gray-900"
                  />
                </div>
              </div>
            </div>
          )}

          {activeTab === "text" && (
            <div className="space-y-1.5">
              <label className="block text-xs font-semibold text-gray-700">Plain Text Message</label>
              <textarea
                rows={3}
                value={textInput}
                onChange={(e) => setTextInput(e.target.value)}
                placeholder="Type or paste any note, address, or serial number here..."
                className="w-full px-3.5 py-2 bg-white border border-gray-300 rounded-md text-sm text-gray-900"
              />
            </div>
          )}

          {/* Color Customization */}
          <div className="p-3 bg-gray-50 border border-gray-200 rounded-md flex items-center justify-between text-xs">
            <span className="font-semibold text-gray-700 flex items-center gap-1.5">
              <Palette className="w-3.5 h-3.5 text-blue-600" /> Color Theme:
            </span>
            <div className="flex items-center gap-4">
              <label className="flex items-center gap-1.5 cursor-pointer">
                <span className="text-gray-500">Code:</span>
                <input
                  type="color"
                  value={fgColor}
                  onChange={(e) => setFgColor(e.target.value)}
                  className="w-6 h-6 rounded border border-gray-300 cursor-pointer"
                />
              </label>
              <label className="flex items-center gap-1.5 cursor-pointer">
                <span className="text-gray-500">Background:</span>
                <input
                  type="color"
                  value={bgColor}
                  onChange={(e) => setBgColor(e.target.value)}
                  className="w-6 h-6 rounded border border-gray-300 cursor-pointer"
                />
              </label>
            </div>
          </div>
        </div>

        {/* QR Code Output Box (1 Col) */}
        <div className="flex flex-col items-center justify-between p-4 bg-gray-50 border border-gray-200 rounded-lg space-y-4">
          <div className="bg-white p-3 rounded-md border border-gray-200 shadow-2xs">
            {qrDataUrl ? (
              /* eslint-disable-next-line @next/next/no-img-element */
              <img
                src={qrDataUrl}
                alt="Generated QR code"
                className="w-48 h-48 object-contain"
              />
            ) : (
              <div className="w-48 h-48 bg-gray-100 flex items-center justify-center text-xs text-gray-400">
                Generating...
              </div>
            )}
          </div>

          <div className="w-full space-y-2">
            {qrDataUrl && (
              <a
                href={qrDataUrl}
                download={`saiorb-qr-${activeTab}.png`}
                className="w-full py-2 px-3 bg-blue-600 hover:bg-blue-700 text-white rounded-md text-xs font-semibold flex items-center justify-center gap-1.5 transition shadow-xs"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Download High-Res PNG</span>
              </a>
            )}

            <button
              onClick={handleCopyContent}
              className="w-full py-1.5 px-3 bg-white hover:bg-gray-100 text-gray-700 border border-gray-300 rounded-md text-xs font-semibold flex items-center justify-center gap-1.5 transition"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copied ? "Copied!" : "Copy Content"}</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
