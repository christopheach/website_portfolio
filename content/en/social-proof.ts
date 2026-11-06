import { media } from "@/config/media";
import type { ClientsContent, StatsContent, TestimonialsContent } from "@/types/content";

export const clients = {
  label: "Brands & artists I've worked with",
  items: Object.values(media.clients).map((logo) => ({ name: logo.alt, logo })),
} satisfies ClientsContent;

export const stats = {
  title: "Numbers that speak for themselves",
  items: [
    { value: 420, suffix: "+", label: "Shoots delivered" },
    { value: 6, suffix: "+", label: "Years behind the camera" },
    { value: 92, suffix: "%", label: "Returning clients" },
    { value: 60, suffix: "+", label: "Brands & artists" },
  ],
} satisfies StatsContent;

export const testimonials = {
  id: "testimonials",
  eyebrow: "Testimonials",
  title: "Trusted by brands and artists.",
  description: "What people say after the shoot, and after the results come in.",
  items: [
    {
      quote:
        "Fayad turned a rainy afternoon in the Marais into our best-performing campaign. Calm on set, sharp on details, and the selects arrived the next day.",
      name: "Camille Roux",
      role: "Brand director, Maison Lune",
      avatar: media.avatars.a1,
    },
    {
      quote:
        "He understood the song before we even started. The video looks like it cost three times what we paid.",
      name: "Nour Belkacem",
      role: "Singer-songwriter",
      avatar: media.avatars.a2,
    },
    {
      quote:
        "Our reels finally look like one brand. Engagement doubled in the first month of the retainer.",
      name: "Yanis Ferhat",
      role: "Founder, Café Oberkampf",
      avatar: media.avatars.a3,
    },
    {
      quote:
        "I hate being photographed. Fayad made it easy, and these are the first portraits of me I actually like.",
      name: "Lina Haddad",
      role: "Musician",
      avatar: media.avatars.a4,
    },
  ],
} satisfies TestimonialsContent;
