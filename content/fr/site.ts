import type { SiteContent, UiStrings, NavigationContent, FooterContent } from "@/types/content";

export const site = {
  locale: "fr",
  intlLocale: "fr-FR",
  name: "Studio Cabines",
  shortName: "Fayad",
  initials: "FA",
  jobTitle: "Photographe & vidéaste",
  title: "Studio Cabines | Photographe & vidéaste à Paris",
  description:
    "Studio Cabines, photographe et vidéaste basé à Paris : campagnes, portraits, clips et vidéos courtes pour les marques, les artistes et les créateurs.",
  keywords: [
    "photographe Paris",
    "vidéaste Paris",
    "directeur de la photographie Paris",
    "réalisateur de clips",
    "photographie de marque",
    "photographie de campagne",
    "vidéo courte",
    "étalonnage",
    "Studio Cabines",
  ],
  location: { city: "Paris", region: "Île-de-France", country: "France", countryCode: "FR" },
  email: "hello@fayadaiechou.com",
  socials: [
    { platform: "instagram", label: "Instagram", href: "https://instagram.com/fayadaiechou" },
    { platform: "youtube", label: "YouTube", href: "https://youtube.com/@fayadaiechou" },
    { platform: "x", label: "X", href: "https://x.com/fayadaiechou" },
    { platform: "linkedin", label: "LinkedIn", href: "https://linkedin.com/in/fayadaiechou" },
  ],
} satisfies SiteContent;

export const ui = {
  skipToContent: "Aller au contenu",
  openMenu: "Ouvrir le menu",
  closeMenu: "Fermer le menu",
  menuTitle: "Navigation",
  homeLabel: "Studio Cabines, retour en haut de page",
  previousMonth: "Mois précédent",
  nextMonth: "Mois suivant",
  showSlide: "Afficher l'image {index} sur {total}",
  compareLabel: "Faites glisser pour comparer avant et après l'étalonnage",
  ratingLabel: "Noté {value} sur {max}",
} satisfies UiStrings;

export const navigation = {
  links: [
    { label: "Projets", href: "#work" },
    { label: "Services", href: "#services" },
    { label: "Méthode", href: "#process" },
    { label: "À propos", href: "#about" },
  ],
  cta: { label: "Réserver un appel", href: "#contact" },
} satisfies NavigationContent;

export const footer = {
  tagline: "Photo et vidéo pour les marques, les artistes et les créateurs. Basé à Paris, disponible partout.",
  links: [
    { label: "Projets", href: "#work" },
    { label: "Services", href: "#services" },
    { label: "Tarifs", href: "#pricing" },
    { label: "Contact", href: "#contact" },
  ],
  copyright: "© {year} Studio Cabines. Tous droits réservés.",
  backToTop: "Retour en haut",
} satisfies FooterContent;
