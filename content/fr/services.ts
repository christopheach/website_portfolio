import { media } from "@/config/media";
import type { ServicesContent } from "@/types/content";

const bookShoot = { label: "Réserver un tournage", href: "#contact" };

export const services = {
  id: "services",
  eyebrow: "Services",
  title: "Ce que je filme",
  description: "Chaque projet commence par une intention, une atmosphère et une obsession du détail.",
  items: [
    {
      id: "campaign",
      title: "Photographie de marque et de campagne",
      paragraphs: [
        "Lancements de produits et visuels de campagne avec une direction artistique claire, pour que chaque image appartienne à votre marque.",
        "Chaque shooting commence par un moodboard et une liste de plans. Le jour J, je gère la lumière et la direction, puis la retouche jusqu'à la livraison finale.",
      ],
      cta: bookShoot,
      media: { type: "slideshow", assets: media.services.campaignCarousel, aspect: "portrait" },
    },
    {
      id: "short-form",
      title: "Vidéos courtes ( TikTok - Instagram )",
      paragraphs: [
        "Des vidéos tournées pour accrocher dès la première seconde et retenir l'attention jusqu'à la dernière.",
        "Je prépare le montage avant de tourner : vous obtenez des rushes pensés pour le montage, avec plans de coupe, mouvements et son qui donnent envie de rester.",
      ],
      cta: bookShoot,
      media: { type: "video", src: "/videos/hair-style-check.mp4", aspect: "9/16", label: "Extrait vidéo verticale « Hair Style Check »" },
    },
    {
      id: "narrative",
      title: "Clips et fiction",
      paragraphs: [
        "Clips, courts documentaires et films de marque avec une vraie image de cinéma : mise en place, mouvements de caméra et lumière au service de l'histoire.",
        "Je travaille seul pour les projets intimes, ou avec une petite équipe (chef électro, ingé son et styliste) pour les journées plus ambitieuses.",
      ],
      cta: bookShoot,
      media: { type: "video", src: "/videos/recap.mp4", aspect: "16/9", label: "Extrait vidéo « Recap »" },
    },
    {
      id: "grading",
      title: "Étalonnage, retouche et montage vidéos",
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
