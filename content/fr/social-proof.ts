import { media } from "@/config/media";
import type { ClientsContent, StatsContent, TestimonialsContent } from "@/types/content";

export const clients = {
  label: "Marques et artistes avec qui j'ai travaillé",
  items: Object.values(media.clients).map((logo) => ({ name: logo.alt, logo })),
} satisfies ClientsContent;

export const stats = {
  title: "Des chiffres qui parlent d'eux-mêmes",
  items: [
    { value: 420, suffix: "+", label: "Tournages livrés" },
    { value: 6, suffix: "+", label: "Années derrière la caméra" },
    { value: 92, suffix: "\u00a0%", label: "Clients fidèles" },
    { value: 60, suffix: "+", label: "Marques & artistes" },
  ],
} satisfies StatsContent;

export const testimonials = {
  id: "testimonials",
  eyebrow: "Témoignages",
  title: "Ils nous font confiance.",
  description: "Ce qu'ils disent après le tournage, et après les résultats.",
  items: [
    {
      quote:
        "Fayad a transformé un après-midi pluvieux dans le Marais en notre campagne la plus performante. Calme sur le plateau, précis dans les détails, et la sélection est arrivée dès le lendemain.",
      name: "Camille Roux",
      role: "Directrice de marque, Maison Lune",
      avatar: media.avatars.a1,
    },
    {
      quote:
        "Il avait compris la chanson avant même qu'on commence. Le clip a l'air d'avoir coûté trois fois ce qu'on a payé.",
      name: "Nour Belkacem",
      role: "Autrice-compositrice-interprète",
      avatar: media.avatars.a2,
    },
    {
      quote:
        "Nos reels ressemblent enfin à une seule et même marque. L'engagement a doublé dès le premier mois de collaboration.",
      name: "Yanis Ferhat",
      role: "Fondateur, Café Oberkampf",
      avatar: media.avatars.a3,
    },
    {
      quote:
        "Je déteste être prise en photo. Fayad a rendu ça facile, et ce sont les premiers portraits de moi que j'aime vraiment.",
      name: "Lina Haddad",
      role: "Musicienne",
      avatar: media.avatars.a4,
    },
  ],
} satisfies TestimonialsContent;
