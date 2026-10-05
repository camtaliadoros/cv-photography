import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // Sanity's CDN serves every photograph on the site.
    remotePatterns: [{ protocol: "https", hostname: "cdn.sanity.io" }],
    // AVIF first — on a gallery this size it saves meaningfully over WebP.
    formats: ["image/avif", "image/webp"],
    // Sanity assets are immutable (the URL contains a content hash), so cache hard.
    minimumCacheTTL: 31536000,
  },
  // Trim the response a little; photography pages ship a lot of markup.
  compress: true,
  poweredByHeader: false,
  async redirects() {
    // The contact page used to live at /enquire; keep old links working.
    return [{ source: "/enquire", destination: "/contact", permanent: true }];
  },
  // Standalone pages carried over from the old site — the enquiry autoresponder
  // and client welcome emails link to these, so they must keep resolving.
  async rewrites() {
    return [
      { source: "/brochure", destination: "/brochure/index.html" },
      { source: "/newborn-welcome", destination: "/newborn-welcome/index.html" },
      { source: "/family-welcome", destination: "/family-welcome/index.html" },
      {
        source: "/pumpkin-welcome",
        destination: "/pumpkin-welcome/pumpkin-patch-welcome-guide.pdf",
      },
    ];
  },
};

export default nextConfig;
