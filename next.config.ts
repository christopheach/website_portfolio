import type { NextConfig } from "next";

import mediaManifest from "./config/media-manifest.json";

// Site media (config/media-manifest.json) and backoffice uploads are served by Zipline at <host>/raw/<file>.
const ziplineOrigins = new Set(
  [process.env.ZIPLINE_URL, ...Object.values(mediaManifest)].filter(Boolean).map((url) => new URL(url!).origin),
);

const nextConfig: NextConfig = {
  turbopack: {
    root: __dirname,
  },
  // Lets the dev site load fully when opened by network IP (phone, other computer on the same Wi-Fi).
  allowedDevOrigins: ["10.17.175.6", "192.168.1.188"],
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
      ...[...ziplineOrigins].map((origin) => {
        const { protocol, hostname, port } = new URL(origin);
        return { protocol: protocol.replace(":", "") as "http" | "https", hostname, port, pathname: "/raw/**" };
      }),
    ],
  },
};

export default nextConfig;
