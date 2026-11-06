/** Technical site settings (not translated). Copy lives in /content. */
export const siteConfig = {
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://fayadaiechou.com",
  defaultLocale: "en",
  twitterHandle: "@fayadaiechou",
  themeColor: "#0a0a0a",
} as const;
