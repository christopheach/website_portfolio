import type { MediaAsset, VideoAsset } from "@/config/media";

export type Locale = "en" | "fr";

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

export type ShowreelContent = {
  label: string;
  caption: string;
  /** Cover shown before the video plays. */
  image: MediaAsset;
  /** YouTube video id (the part after youtu.be/). The player only loads after a click. */
  youtubeId?: string;
  /** Accessible label of the play button. */
  playLabel: string;
};

export type ServiceMedia =
  | { type: "image"; asset: MediaAsset }
  | { type: "slideshow"; assets: readonly MediaAsset[]; /** "portrait" = 4:5 frame; default is 4:3. */ aspect?: "landscape" | "portrait" }
  /** Muted looping video. `aspect` is the video's own width/height, e.g. "9/16" for a vertical reel. */
  | { type: "video"; video: VideoAsset; aspect: string; label: string }
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
/** "client" = commissioned work, "personal" = the studio's own project. */
export type ProjectKind = "client" | "personal";

export type WorkItem = {
  id: string;
  title: string;
  category: WorkCategory;
  /** Defaults to "client". */
  kind?: ProjectKind;
  /** `name` is optional: without it the card shows the project type instead. */
  client: { name?: string; avatar: MediaAsset; verified?: boolean };
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
  /** External link button in the project modal (photo projects, or videos that can't be embedded). */
  viewLabel: string;
  /** Accessible names of the card buttons: "<label>: <title>, <client>". */
  openLabel: string;
  playLabel: string;
  closeLabel: string;
  /** Shown instead of a client name: personal projects, or client projects without a name. */
  personalLabel: string;
  clientLabel: string;
  /** Announced while a project's video or image loads in the modal. */
  loadingLabel: string;
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
