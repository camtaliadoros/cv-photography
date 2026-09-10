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
};

export default nextConfig;
