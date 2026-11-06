import { media } from "@/config/media";
import type { ServicesContent } from "@/types/content";

const bookShoot = { label: "Réserver un tournage", href: "#contact" };

export const services = {
  id: "services",
  eyebrow: "Services",
  title: "Ce que je filme",
  description: "Du simple portrait à la campagne complète : préparé, éclairé et livré par une seule personne.",
  items: [
    {
      id: "campaign",
      title: "Photographie de marque & de campagne",
      paragraphs: [
        "Lookbooks, lancements de produits et visuels de campagne avec une direction artistique claire, pour que chaque image appartienne à votre marque.",
        "Chaque shooting commence par un moodboard et une liste de plans. Le jour J, je gère la lumière et la direction, puis la retouche jusqu'à la livraison finale.",
      ],
      cta: bookShoot,
      media: { type: "image", asset: media.services.campaign },
    },
    {
      id: "short-form",
      title: "Films courts & reels",
      paragraphs: [
        "Des films verticaux et horizontaux pour Instagram, TikTok et YouTube, tournés pour accrocher dès la première seconde et retenir l'attention jusqu'à la dernière.",
        "Je prépare le montage avant de tourner : vous obtenez des rushes pensés pour le montage, avec plans de coupe, mouvements et son qui donnent envie de rester.",
      ],
      cta: bookShoot,
      media: { type: "slideshow", assets: media.services.shortForm },
    },
    {
      id: "narrative",
      title: "Clips & fiction",
      paragraphs: [
        "Clips, courts documentaires et films de marque avec une vraie image de cinéma : mise en place, mouvements de caméra et lumière au service de l'histoire.",
        "Je travaille seul pour les projets intimes, ou avec une petite équipe (chef électro, ingé son et styliste) pour les journées plus ambitieuses.",
      ],
      cta: bookShoot,
      media: { type: "slideshow", assets: media.services.narrative },
    },
    {
      id: "grading",
      title: "Étalonnage & retouche",
      paragraphs: [
        "Vous avez déjà des vidéos ou des photos ? Je les étalonne et les retouche pour obtenir un rendu cohérent sur toute une série.",
        "Peau, lumière et couleurs sont corrigées à la main, puis harmonisées plan par plan pour que votre feed et vos films forment un ensemble.",
      ],
      cta: bookShoot,
      media: {
        type: "compare",
        before: media.services.gradeBefore,
        after: media.services.gradeAfter,
        beforeLabel: "Avant",
        afterLabel: "Après",
      },
    },
  ],
} satisfies ServicesContent;
