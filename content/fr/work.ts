import { media } from "@/config/media";
import type { WorkContent } from "@/types/content";

export const work = {
  id: "work",
  eyebrow: "Projets",
  title: "Projets choisis",
  description: "Campagnes, portraits et films réalisés ces deux dernières années.",
  filterLabel: "Filtrer les projets",
  filters: [
    { value: "all", label: "Tous" },
    { value: "photo", label: "Photo" },
    { value: "film", label: "Vidéo" },
  ],
  verifiedLabel: "Client vérifié",
  filmLabel: "Vidéo, {duration}",
  viewLabel: "Voir le projet",
  items: [
    {
      id: "maison-lune",
      title: "Lookbook Automne/Hiver 26",
      category: "photo",
      client: { name: "Maison Lune", avatar: media.avatars.a5, verified: true },
      image: media.work.lookbook,
    },
    {
      id: "nour-seine",
      title: "Clip « Seine »",
      category: "film",
      duration: "3:42",
      client: { name: "Nour Belkacem", avatar: media.avatars.a6, verified: true },
      image: media.work.musicVideo,
    },
    {
      id: "atelier-sauvage",
      title: "Photos de lancement produit",
      category: "photo",
      client: { name: "Atelier Sauvage", avatar: media.avatars.a7, verified: true },
      image: media.work.productLaunch,
    },
    {
      id: "theo-marchand",
      title: "Série de portraits",
      category: "photo",
      client: { name: "Théo Marchand", avatar: media.avatars.a8, verified: true },
      image: media.work.portraits,
    },
    {
      id: "cafe-oberkampf",
      title: "Film de marque",
      category: "film",
      duration: "1:05",
      client: { name: "Café Oberkampf", avatar: media.avatars.a9, verified: true },
      image: media.work.brandFilm,
    },
    {
      id: "lina-haddad",
      title: "Carnet de tournée",
      category: "film",
      duration: "2:18",
      client: { name: "Lina Haddad", avatar: media.avatars.a10, verified: true },
      image: media.work.tourDiary,
    },
  ],
} satisfies WorkContent;
