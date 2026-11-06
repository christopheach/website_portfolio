import type { MetadataRoute } from "next";

import { siteConfig } from "@/config/site";
import { getDictionary } from "@/content";

export default function manifest(): MetadataRoute.Manifest {
  const { site } = getDictionary();
  return {
    name: site.title,
    short_name: site.name,
    description: site.description,
    start_url: "/",
    display: "standalone",
    background_color: siteConfig.themeColor,
    theme_color: siteConfig.themeColor,
    icons: [{ src: "/icon.svg", sizes: "any", type: "image/svg+xml" }],
  };
}
