import { media } from "@/config/media";
import type { HeroContent, ShowreelContent } from "@/types/content";

export const hero = {
  availability: "Only 3 shoot days left this spring",
  titleLines: ["If a pro feels", "expensive, wait", "until you see what", "an amateur costs."],
  description:
    "Campaign photography, short films and music videos for brands, artists and creators. Shot in Paris, made to stop the scroll and hold attention.",
  primaryCta: { label: "View work", href: "#work" },
  secondaryCta: { label: "See rates", href: "#pricing" },
  proof: {
    label: "Trusted by 60+ brands & artists",
    rating: 5,
    extraCount: "+60",
    avatars: [media.avatars.a1, media.avatars.a2, media.avatars.a3, media.avatars.a4],
  },
  viewfinder: {
    rec: "REC",
    timecode: "00:02:14:08",
    settings: ["4K", "24 fps", "f/1.8", "ISO 800"],
  },
  image: media.hero.portrait,
} satisfies HeroContent;

export const showreel = {
  label: "Showreel 2026",
  caption: "Paris, Marseille and Lisbon. Twelve shoots in two minutes.",
  image: media.showreel.cover,
} satisfies ShowreelContent;
