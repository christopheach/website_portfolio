import type { MediaAsset } from "@/config/media";

export type Locale = "en";

export type LinkItem = { label: string; href: string };

export type SocialPlatform = "instagram" | "youtube" | "x" | "linkedin";
export type SocialLink = { platform: SocialPlatform; label: string; href: string };

export type SectionIntro = {
  /** Anchor id used by the navigation. */
  id: string;
  eyebrow: string;
  title: string;
  description?: string;
};

export type SiteContent = {
  locale: Locale;
  /** BCP 47 tag used for dates and numbers, e.g. "en-GB". */
  intlLocale: string;
  name: string;
  shortName: string;
  initials: string;
  jobTitle: string;
  title: string;
  description: string;
  keywords: string[];
  location: { city: string; region: string; country: string; countryCode: string };
  email: string;
  socials: SocialLink[];
};

export type UiStrings = {
  skipToContent: string;
  openMenu: string;
  closeMenu: string;
  menuTitle: string;
  homeLabel: string;
  previousMonth: string;
  nextMonth: string;
  showSlide: string;
  compareLabel: string;
  ratingLabel: string;
};

export type NavigationContent = {
  links: LinkItem[];
  cta: LinkItem;
};

export type HeroContent = {
  availability: string;
  /** Each entry is one animated line of the headline. */
  titleLines: string[];
  description: string;
  primaryCta: LinkItem;
  secondaryCta: LinkItem;
  proof: { label: string; rating: number; avatars: MediaAsset[]; extraCount: string };
  viewfinder: { rec: string; timecode: string; settings: string[] };
  image: MediaAsset;
};

export type ShowreelContent = { label: string; caption: string; image: MediaAsset };

export type ServiceMedia =
  | { type: "image"; asset: MediaAsset }
  | { type: "slideshow"; assets: readonly MediaAsset[] }
  | { type: "compare"; before: MediaAsset; after: MediaAsset; beforeLabel: string; afterLabel: string };

export type ServiceItem = {
  id: string;
  title: string;
  paragraphs: string[];
  cta: LinkItem;
  media: ServiceMedia;
};

export type ServicesContent = SectionIntro & { items: ServiceItem[] };

export type WorkCategory = "photo" | "film";
export type WorkFilter = "all" | WorkCategory;

export type WorkItem = {
  id: string;
  title: string;
  category: WorkCategory;
  client: { name: string; avatar: MediaAsset; verified?: boolean };
  image: MediaAsset;
  /** Shown on film projects, e.g. "1:05". */
  duration?: string;
  href?: string;
};

export type WorkContent = SectionIntro & {
  filterLabel: string;
  filters: { value: WorkFilter; label: string }[];
  items: WorkItem[];
  verifiedLabel: string;
  filmLabel: string;
  viewLabel: string;
};

export type WhyIcon = "aperture" | "map-pin" | "timer" | "sparkles" | "camera" | "film";

export type WhyContent = SectionIntro & {
  feature: { title: string; description: string; image: MediaAsset };
  points: { icon: WhyIcon; title: string; description: string }[];
};

export type ProcessContent = SectionIntro & {
  steps: { title: string; description: string }[];
  cta: LinkItem;
};

export type AboutContent = {
  id: string;
  title: string;
  name: string;
  role: string;
  paragraphs: string[];
  image: MediaAsset;
  cta: LinkItem;
};

export type ClientsContent = {
  label: string;
  items: { name: string; logo: MediaAsset }[];
};

export type StatsContent = {
  title: string;
  items: { value: number; prefix?: string; suffix?: string; label: string }[];
};

export type TestimonialsContent = SectionIntro & {
  items: { quote: string; name: string; role: string; avatar: MediaAsset }[];
};

export type PricingPlan = {
  name: string;
  badge?: string;
  price: number;
  currency: string;
  period: string;
  description: string;
  cta: LinkItem;
  features: string[];
};

export type PricingContent = SectionIntro & {
  plans: PricingPlan[];
  footnote?: { text: string; link: LinkItem };
};

export type BookingContent = SectionIntro & {
  emailLabel: string;
  followLabel: string;
  calendar: {
    title: string;
    timezone: string;
    /** 0 = Sunday … 6 = Saturday. */
    unavailableWeekdays: number[];
    slots: string[];
    emptyState: string;
    timesLabel: string;
    selectTimeLabel: string;
    /** Supports {date} and {time}. */
    requestLabel: string;
    /** Supports {date} and {time}. */
    mailSubject: string;
    mailBody: string;
  };
};

export type FaqContent = SectionIntro & {
  items: { question: string; answer: string }[];
};

export type FooterContent = {
  tagline: string;
  links: LinkItem[];
  /** Supports {year}. */
  copyright: string;
  backToTop: string;
};

export type Dictionary = {
  site: SiteContent;
  ui: UiStrings;
  navigation: NavigationContent;
  hero: HeroContent;
  showreel: ShowreelContent;
  services: ServicesContent;
  work: WorkContent;
  why: WhyContent;
  process: ProcessContent;
  about: AboutContent;
  clients: ClientsContent;
  stats: StatsContent;
  testimonials: TestimonialsContent;
  pricing: PricingContent;
  booking: BookingContent;
  faq: FaqContent;
  footer: FooterContent;
};
