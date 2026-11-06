import { media } from "@/config/media";
import type { WorkContent } from "@/types/content";

export const work = {
  id: "work",
  eyebrow: "Projects",
  title: "Selected work",
  description: "Campaigns, portraits and films shot over the last two years.",
  filterLabel: "Filter projects",
  filters: [
    { value: "all", label: "All" },
    { value: "photo", label: "Photography" },
    { value: "film", label: "Film" },
  ],
  verifiedLabel: "Verified client",
  filmLabel: "Film, {duration}",
  viewLabel: "View project",
  items: [
    {
      id: "maison-lune",
      title: "Autumn/Winter 26 lookbook",
      category: "photo",
      client: { name: "Maison Lune", avatar: media.avatars.a5, verified: true },
      image: media.work.lookbook,
    },
    {
      id: "nour-seine",
      title: "“Seine” music video",
      category: "film",
      duration: "3:42",
      client: { name: "Nour Belkacem", avatar: media.avatars.a6, verified: true },
      image: media.work.musicVideo,
    },
    {
      id: "atelier-sauvage",
      title: "Product launch stills",
      category: "photo",
      client: { name: "Atelier Sauvage", avatar: media.avatars.a7, verified: true },
      image: media.work.productLaunch,
    },
    {
      id: "theo-marchand",
      title: "Portrait series",
      category: "photo",
      client: { name: "Théo Marchand", avatar: media.avatars.a8, verified: true },
      image: media.work.portraits,
    },
    {
      id: "cafe-oberkampf",
      title: "Brand film",
      category: "film",
      duration: "1:05",
      client: { name: "Café Oberkampf", avatar: media.avatars.a9, verified: true },
      image: media.work.brandFilm,
    },
    {
      id: "lina-haddad",
      title: "Tour diary",
      category: "film",
      duration: "2:18",
      client: { name: "Lina Haddad", avatar: media.avatars.a10, verified: true },
      image: media.work.tourDiary,
    },
  ],
} satisfies WorkContent;
