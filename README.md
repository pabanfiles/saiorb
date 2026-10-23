# SaiOrb — All Tools, One Place

> **A high-performance, privacy-first digital utility suite featuring 128 online tools running directly in your web browser.**

---

## 1. System Architecture

```
                       +-----------------------------------+
                       |           Client Device           |
                       |  Desktop / Mobile Browser / PWA   |
                       +-----------------+-----------------+
                                         |
                       +-----------------+-----------------+
                       |       Cloudflare Global Edge      |
                       |   DNS • DDoS Shield • SSL/TLS     |
                       +-----------------+-----------------+
                                         |
                       +-----------------+-----------------+
                       |    Cloudflare Pages (Next.js)     |
                       |    - HTML / CSS / JS Assets       |
                       |    - SSR & App Router Pages       |
                       +--------+-----------------+--------+
                                |                 |
         +----------------------+                 +----------------------+
         | (100% Client Tools)                    | (Server AI & Worker APIs)
+--------v-------------------------+     +--------v-------------------------+
|  Client-Side Browser Execution   |     |    Edge Worker Proxy Routes      |
|  - HTML5 Canvas & Web Workers    |     |    - Rate Limiter (20 req/day)   |
|  - pdf-lib PDF Merger & Editor   |     |    - Gemini AI Language Utilities|
|  - QRCode Generator & Scanner    |     |    - Safe Video URL Stream Engine|
|  - Govt 50KB / 213px Croppers    |     +--------+-----------------+--------+
|  - Zero Data Upload (Privacy)    |              |                 |
+----------------------------------+     +--------v--------+ +------v--------+
                                         |  Cloudflare D1  | | Cloudflare R2  |
                                         |  (SQLite DB)    | | (Temp Storage) |
                                         |  - Tools & Post | | - 1h Auto-Purge|
                                         +-----------------+ +----------------+
```

---

## 2. Key Highlights

- **128 Complete Digital Utility Tools:** PDF, Image, Video & Audio, Social Media, Documents, Govt ID & Forms, Utility & Calculators, Text & Writing, Finance, Education, and Security.
- **100% Client-Side Privacy:** All core file processing executes directly in your browser's local memory. No files or personal data are ever uploaded or stored on remote servers.
- **Govt & Identity Utilities:** Voter ID photo (50 KB), Aadhaar document resizer (200 KB), PAN card photo & signature cropper (213x213 px, 30 KB), Exam photo date stampers.
- **Social Media Downloader & Stream Utility:** Compliant with the Indian Copyright Act, 1957 with explicit user consent checkbox, direct clipboard copy, and social sharing.
- **Admin Analytics Dashboard:** Built with Recharts to visualize daily execution trends, peak hours, and popularity rankings across all 128 tools.
- **Google-Style Clean Minimalist UI:** Built with Next.js 15, TypeScript, and Tailwind CSS. Clean light borders, readable typography, no heavy gradients or AI clutter.

---

## 3. Local Development & Setup

```bash
# 1. Install dependencies
npm install

# 2. Run local development server
npm run dev

# 3. Build for production
npm run build
```

---

## 4. Compliance & Privacy

- All client tools perform computations in memory via WebAssembly and Canvas.
- Media downloader utilities strictly adhere to Fair Use under Section 52 of the Indian Copyright Act, 1957.
- Zero tracking telemetry or server-side logging of user documents.
