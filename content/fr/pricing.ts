import type { BookingContent, FaqContent, PricingContent } from "@/types/content";

export const pricing = {
  id: "pricing",
  eyebrow: "Tarifs",
  title: "Des tarifs simples.",
  description:
    "Un forfait créatif mensuel pour les marques et les artistes qui ont besoin de contenus frais et cohérents, sans jongler entre plusieurs freelances.",
  plans: [
    {
      name: "Forfait créatif",
      badge: "Plus que 2 places",
      price: 2400,
      currency: "EUR",
      period: "/mois",
      description: "Deux jours de tournage par mois, photo et vidéo, entièrement produits.",
      cta: { label: "Commencer", href: "#contact" },
      features: [
        "2 jours de tournage par mois à Paris",
        "40 photos retouchées",
        "4 films courts ou reels",
        "Étalonnage sur chaque livrable",
        "Moodboards et listes de plans",
        "Livraison via une galerie privée",
        "Droits d'utilisation pour les réseaux sociaux et le web",
      ],
    },
  ],
  footnote: {
    text: "Besoin d'un seul tournage ? Tarif à la journée à partir de 750 €.",
    link: { label: "Demander un devis", href: "#contact" },
  },
} satisfies PricingContent;

export const booking = {
  id: "contact",
  eyebrow: "Contact",
  title: "Réserver un appel",
  description:
    "Choisissez un jour pour un appel gratuit de 15 minutes sur votre projet, vos dates et votre budget. Je réponds sous 24 heures.",
  emailLabel: "E-mail",
  followLabel: "Suivez-moi sur",
  calendar: {
    title: "Choisissez une date",
    timezone: "Heure de Paris (CET)",
    unavailableWeekdays: [0],
    slots: ["10:00", "11:30", "14:00", "16:30", "18:00"],
    emptyState: "Sélectionnez une date pour voir les créneaux disponibles.",
    timesLabel: "Créneaux disponibles le {date}",
    selectTimeLabel: "Choisissez un horaire",
    requestLabel: "Demander le {date} à {time}",
    mailSubject: "Demande d'appel : {date} à {time}",
    mailBody:
      "Bonjour,\n\nJe souhaiterais réserver un appel de 15 minutes le {date} à {time} (heure de Paris).\n\nÀ propos de mon projet :\n",
  },
} satisfies BookingContent;

export const faq = {
  id: "faq",
  eyebrow: "FAQ",
  title: "Questions fréquentes.",
  description: "Tournages, délais et livraison : les réponses.",
  items: [
    {
      question: "Vous déplacez-vous en dehors de Paris ?",
      answer:
        "Oui. Je tourne régulièrement partout en France et en Europe. Le transport et l'hébergement sont chiffrés à part, et je peux souvent regrouper les déplacements pour limiter les coûts.",
    },
    {
      question: "Quels sont vos délais de livraison ?",
      answer:
        "Une première sélection arrive sous 48 heures. Les photos finales prennent environ une semaine, et les films montés une à deux semaines selon leur durée.",
    },
    {
      question: "Combien de retours sont inclus ?",
      answer:
        "Une série complète de retours est incluse sur chaque montage et chaque retouche. Les séries supplémentaires sont facturées à l'heure, et je vous préviens toujours avant.",
    },
    {
      question: "Pouvez-vous reprendre l'identité visuelle de ma marque ?",
      answer:
        "Oui. Envoyez-moi votre charte graphique ou quelques campagnes passées : je construis une lumière et un étalonnage qui collent, ou je vous aide à définir un nouveau style.",
    },
    {
      question: "À qui appartiennent les photos et les vidéos ?",
      answer:
        "Vous recevez les droits d'utilisation pour les canaux prévus dans le devis. Des droits étendus (print, publicité payante ou diffusion TV) peuvent être ajoutés.",
    },
    {
      question: "De quoi avez-vous besoin avant le tournage ?",
      answer:
        "Un court brief, les références que vous aimez, et les personnes ou produits à photographier. J'en fais un moodboard et un plan à valider ensemble.",
    },
  ],
} satisfies FaqContent;
