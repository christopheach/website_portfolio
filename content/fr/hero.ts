import { media } from "@/config/media";
import type { HeroContent, ShowreelContent } from "@/types/content";

export const hero = {
  availability: "Plus que 3 jours de tournage ce printemps",
  titleLines: ["Un pro vous", "semble cher ? Attendez", "de voir ce que coûte", "un amateur."],
  description:
    "Photos de campagne, films courts et clips pour les marques, les artistes et les créateurs. Tournés à Paris, pensés pour arrêter le scroll et retenir l'attention.",
  primaryCta: { label: "Voir les projets", href: "#work" },
  secondaryCta: { label: "Voir les tarifs", href: "#pricing" },
  proof: {
    label: "Plus de 60 marques et artistes nous font confiance",
    rating: 5,
    extraCount: "+60",
    avatars: [media.avatars.a1, media.avatars.a2, media.avatars.a3, media.avatars.a4],
  },
  viewfinder: {
    rec: "REC",
    timecode: "00:02:14:08",
    settings: ["4K", "24 i/s", "f/1.8", "ISO 800"],
  },
  image: media.hero.portrait,
} satisfies HeroContent;

export const showreel = {
  label: "Showreel 2026",
  caption: "Paris, Marseille et Lisbonne. Douze tournages en deux minutes.",
  image: media.showreel.cover,
} satisfies ShowreelContent;
