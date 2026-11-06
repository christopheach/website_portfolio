import type { SiteContent, UiStrings, NavigationContent, FooterContent } from "@/types/content";

export const site = {
  locale: "en",
  intlLocale: "en-GB",
  name: "Studio Cabines",
  shortName: "Fayad",
  initials: "FA",
  jobTitle: "Photographer & Cinematographer",
  title: "Fayad Aiechou | Photographer & Cinematographer in Paris",
  description:
    "Fayad Aiechou is a Paris-based photographer and cinematographer shooting campaigns, portraits, music videos and short-form films for brands, artists and creators.",
  keywords: [
    "photographer Paris",
    "cinematographer Paris",
    "videographer Paris",
    "music video director",
    "brand photography",
    "campaign photography",
    "short-form video",
    "colour grading",
    "Fayad Aiechou",
  ],
  location: { city: "Paris", region: "Île-de-France", country: "France", countryCode: "FR" },
  email: "hello@fayadaiechou.com",
  socials: [
    { platform: "instagram", label: "Instagram", href: "https://instagram.com/fayadaiechou" },
    { platform: "youtube", label: "YouTube", href: "https://youtube.com/@fayadaiechou" },
    { platform: "x", label: "X", href: "https://x.com/fayadaiechou" },
    { platform: "linkedin", label: "LinkedIn", href: "https://linkedin.com/in/fayadaiechou" },
  ],
} satisfies SiteContent;

export const ui = {
  skipToContent: "Skip to content",
  openMenu: "Open menu",
  closeMenu: "Close menu",
  menuTitle: "Navigation",
  homeLabel: "Studio Cabines, back to top",
  previousMonth: "Previous month",
  nextMonth: "Next month",
  showSlide: "Show image {index} of {total}",
  compareLabel: "Drag to compare before and after grading",
  ratingLabel: "Rated {value} out of {max}",
} satisfies UiStrings;

export const navigation = {
  links: [
    { label: "Work", href: "#work" },
    { label: "Services", href: "#services" },
    { label: "Process", href: "#process" },
    { label: "About", href: "#about" },
  ],
  cta: { label: "Book a call", href: "#contact" },
} satisfies NavigationContent;

export const footer = {
  tagline: "Photography and cinematography for brands, artists and creators. Based in Paris, available worldwide.",
  links: [
    { label: "Work", href: "#work" },
    { label: "Services", href: "#services" },
    { label: "Pricing", href: "#pricing" },
    { label: "Contact", href: "#contact" },
  ],
  copyright: "© {year} Fayad Aiechou. All rights reserved.",
  backToTop: "Back to top",
} satisfies FooterContent;
