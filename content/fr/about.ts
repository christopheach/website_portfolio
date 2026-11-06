import { media } from "@/config/media";
import type { AboutContent, ProcessContent, WhyContent } from "@/types/content";

export const why = {
  id: "why",
  eyebrow: "Pourquoi moi",
  title: "Bien plus qu'appuyer sur REC.",
  description: "Chaque image est pensée avec intention, du premier moodboard à l'étalonnage final.",
  feature: {
    title: "Dirigé, pas seulement filmé",
    description:
      "Je guide la posture, le rythme et l'expression pour que chacun paraisse naturel à l'image, même ceux qui détestent être filmés.",
    image: media.why.feature,
  },
  points: [
    {
      icon: "map-pin",
      title: "Paris sur le bout des doigts",
      description:
        "Rooftops, studios, autorisations et spots golden hour que je connais déjà : les journées de tournage restent dans les temps.",
    },
    {
      icon: "timer",
      title: "Sélection en 48 heures",
      description: "Une première sélection sous deux jours. Photos et films finalisés en une semaine.",
    },
  ],
} satisfies WhyContent;

export const process = {
  id: "process",
  eyebrow: "Méthode",
  title: "Du brief à l'image finale.",
  description: "Quatre étapes pour que chaque tournage respecte le planning et le budget.",
  steps: [
    {
      title: "Brief & moodboard",
      description: "Un appel de 15 minutes, puis un moodboard, une liste de plans et un planning à valider.",
    },
    {
      title: "Jour de tournage",
      description: "Je m'occupe du lieu, de la lumière et de la direction. Vous n'avez qu'à être devant la caméra.",
    },
    {
      title: "Montage & étalonnage",
      description: "Sélection, retouche, montage, son et couleur, avec une série de retours incluse.",
    },
    {
      title: "Livraison",
      description: "Fichiers haute résolution et exports prêts pour chaque plateforme, dans une galerie privée en ligne.",
    },
  ],
  cta: { label: "Réserver un appel de 15 min", href: "#contact" },
} satisfies ProcessContent;

export const about = {
  id: "about",
  title: "À propos",
  name: "Fayad Aiechou",
  role: "Photographe & vidéaste, Paris",
  paragraphs: [
    "Je suis photographe et vidéaste à Paris. J'ai commencé en filmant les sessions de skate de mes amis dans le 11e arrondissement, et je tourne aujourd'hui des campagnes, des clips et des films courts pour des marques et des artistes partout en Europe.",
    "Mon approche mêle un instinct documentaire à une lumière et une composition maîtrisées : des images sincères, mais jamais dues au hasard.",
  ],
  image: media.about.portrait,
  cta: { label: "Me contacter", href: "#contact" },
} satisfies AboutContent;
