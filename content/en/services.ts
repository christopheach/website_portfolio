import { media } from "@/config/media";
import type { ServicesContent } from "@/types/content";

const bookShoot = { label: "Book a shoot", href: "#contact" };

export const services = {
  id: "services",
  eyebrow: "Services",
  title: "What I shoot",
  description: "From a single portrait to a full campaign, planned, lit and delivered by one person.",
  items: [
    {
      id: "campaign",
      title: "Brand & campaign photography",
      paragraphs: [
        "Lookbooks, product launches and campaign imagery with a clear art direction, so every frame feels like it belongs to your brand.",
        "Each shoot starts with a moodboard and a shot list. On the day I handle lighting and direction, then retouch through to final delivery.",
      ],
      cta: bookShoot,
      media: { type: "image", asset: media.services.campaign },
    },
    {
      id: "short-form",
      title: "Short films & reels",
      paragraphs: [
        "Vertical and horizontal films for Instagram, TikTok and YouTube, shot to hook in the first second and hold attention to the last.",
        "I plan the edit before I shoot, so you get coverage made for cutting: cutaways, movement and sound that keep people watching.",
      ],
      cta: bookShoot,
      media: { type: "slideshow", assets: media.services.shortForm },
    },
    {
      id: "narrative",
      title: "Music videos & narrative",
      paragraphs: [
        "Music videos, short documentaries and brand stories with real cinematography: blocking, camera movement and light that serve the story.",
        "I work solo for intimate projects, or bring a small crew with a gaffer, sound recordist and stylist for bigger days.",
      ],
      cta: bookShoot,
      media: { type: "slideshow", assets: media.services.narrative },
    },
    {
      id: "grading",
      title: "Colour grading & retouching",
      paragraphs: [
        "Already have footage or photos? I grade and retouch them to one consistent look across a whole series.",
        "Skin, light and colour are corrected by hand, then matched shot to shot so your feed and films read as one body of work.",
      ],
      cta: bookShoot,
      media: {
        type: "compare",
        before: media.services.gradeBefore,
        after: media.services.gradeAfter,
        beforeLabel: "Before",
        afterLabel: "After",
      },
    },
  ],
} satisfies ServicesContent;
