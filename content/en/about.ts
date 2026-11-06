import { media } from "@/config/media";
import type { AboutContent, ProcessContent, WhyContent } from "@/types/content";

export const why = {
  id: "why",
  eyebrow: "Why me",
  title: "More than just pressing record.",
  description: "Every frame is planned with intention, from the first moodboard to the final grade.",
  feature: {
    title: "Directed, not just shot",
    description:
      "I guide posture, pace and expression so people look natural on camera, even the ones who hate being filmed.",
    image: media.why.feature,
  },
  points: [
    {
      icon: "map-pin",
      title: "Paris on speed dial",
      description: "Rooftops, studios, permits and golden-hour spots I already know, so shoot days run on time.",
    },
    {
      icon: "timer",
      title: "Selects in 48 hours",
      description: "Preview selects within two days. Finished photos and films within a week.",
    },
  ],
} satisfies WhyContent;

export const process = {
  id: "process",
  eyebrow: "Process",
  title: "From brief to final frame.",
  description: "Four steps that keep every shoot on schedule and on budget.",
  steps: [
    {
      title: "Brief & moodboard",
      description: "A 15-minute call, then a moodboard, shot list and schedule for you to approve.",
    },
    {
      title: "Shoot day",
      description: "I handle location, light and direction. You focus on being in front of the camera.",
    },
    {
      title: "Edit & grade",
      description: "Selects, retouching, editing, sound and colour, with one round of notes included.",
    },
    {
      title: "Delivery",
      description: "High-resolution files and platform-ready exports in a private online gallery.",
    },
  ],
  cta: { label: "Book a 15-min call", href: "#contact" },
} satisfies ProcessContent;

export const about = {
  id: "about",
  title: "About me",
  name: "Fayad Aiechou",
  role: "Photographer & cinematographer, Paris",
  paragraphs: [
    "I'm a photographer and cinematographer based in Paris. I started by filming friends' skate sessions in the 11th arrondissement and now shoot campaigns, music videos and short films for brands and artists across Europe.",
    "My approach mixes a documentary instinct with deliberate light and composition, so the images feel honest but never accidental.",
  ],
  image: media.about.portrait,
  cta: { label: "Get in touch", href: "#contact" },
} satisfies AboutContent;
