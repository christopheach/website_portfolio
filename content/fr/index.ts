import type { Dictionary } from "@/types/content";
import { about, process, why } from "./about";
import { hero, showreel } from "./hero";
import { booking, faq, pricing } from "./pricing";
import { services } from "./services";
import { footer, navigation, site, ui } from "./site";
import { clients, stats, testimonials } from "./social-proof";
import { work } from "./work";

export const fr = {
  site,
  ui,
  navigation,
  hero,
  showreel,
  services,
  work,
  why,
  process,
  about,
  clients,
  stats,
  testimonials,
  pricing,
  booking,
  faq,
  footer,
} satisfies Dictionary;
