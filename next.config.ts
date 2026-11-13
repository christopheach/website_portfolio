import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  turbopack: {
    root: __dirname,
  },
  // Lets the dev site load fully when opened by network IP (phone, other computer on the same Wi-Fi).
  allowedDevOrigins: ["10.17.175.6"],
  images: {
    formats: ["image/avif", "image/webp"],
    // 75 = default for most images, 90 = hero photo (needs to stay crisp on large/retina screens).
    qualities: [75, 90],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 2560, 3200],
    // Placeholder images come from picsum.photos (see config/media.ts).
    // Once every asset points to /public, these patterns can be removed.
    remotePatterns: [
      { protocol: "https", hostname: "picsum.photos" },
      { protocol: "https", hostname: "fastly.picsum.photos" },
      // YouTube video covers (showreel).
      { protocol: "https", hostname: "i.ytimg.com" },
    ],
  },
};

export default nextConfig;
