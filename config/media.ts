/**
 * Centralised media registry.
 *
 * Every image on the site is referenced from here. Files are hosted on Zipline, not in the repo:
 *
 *   1. Put the file in /media-src (git-ignored), e.g. /media-src/images/hero.jpg
 *   2. Run `npm run media:upload` — it uploads new files and records their URL in media-manifest.json
 *   3. Replace `placeholder("hero", 1200, 1500)` with mediaUrl("/images/hero.jpg")
 *
 * An empty `src` renders the striped placeholder used by the original template.
 */

import manifest from "./media-manifest.json";

/**
 * Resolves a media key such as "/images/hero.jpg" to its Zipline URL.
 * Throws on unknown keys so a missing upload fails the build instead of showing a broken image.
 */
export function mediaUrl(key: string): string {
  const url = (manifest as Record<string, string>)[key];
  if (!url) throw new Error(`Media "${key}" is not in config/media-manifest.json. Run \`npm run media:upload\`.`);
  return url;
}

export type MediaAsset = {
  /** mediaUrl("/images/x.jpg") or an allowed remote URL. Empty string = striped placeholder. */
  src: string;
  /** Describe what the image shows. Use "" only for purely decorative images. */
  alt: string;
  /** Optional base64 blur shown while loading (local imports generate this automatically). */
  blurDataURL?: string;
};

/** Temporary photography from picsum.photos. Seeds keep each slot's image stable. */
const placeholder = (seed: string, width: number, height: number) =>
  `https://picsum.photos/seed/fayad-${seed}/${width}/${height}`;

export const media = {
  hero: {
    portrait: { src: mediaUrl("/images/hero.jpg"), alt: "Personne en chemise et cravate mangeant des chips sur un banc, photographiée en contre-plongée" },
  },
  showreel: {
    cover: { src: mediaUrl("/images/showreel.jpg"), alt: "Deux personnes assises dans l'herbe d'un parc, discutant face aux toits de Paris" },
  },
  services: {
    campaign: { src: placeholder("campaign", 1200, 900), alt: "Photo de campagne d'un mannequin dans une douce lumière de fenêtre" },
    /** Auto-playing carousel of the "Photographie de marque & de campagne" card (files in /media-src/images/carousel). */
    campaignCarousel: Array.from({ length: 15 }, (_, i) => ({
      src: mediaUrl(`/images/carousel/campagne-${String(i + 1).padStart(2, "0")}.jpg`),
      alt: `Photo de marque et de campagne ${i + 1} sur 15`,
    })),
    shortForm: [
      { src: placeholder("reel-1", 1200, 900), alt: "Coulisses d'un tournage de vidéo courte" },
      { src: placeholder("reel-2", 1200, 900), alt: "Image verticale tournée dans une rue de Paris" },
      { src: placeholder("reel-3", 1200, 900), alt: "Gros plan extrait d'un reel produit" },
    ],
    narrative: [
      { src: placeholder("mv-1", 1200, 900), alt: "Image de clip éclairée au néon rouge" },
      { src: placeholder("mv-2", 1200, 900), alt: "Plan large extrait d'un court documentaire" },
      { src: placeholder("mv-3", 1200, 900), alt: "Artiste en performance dans un studio sombre" },
    ],
    // Same photo on both sides: the "before" side is desaturated automatically to fake an ungraded look.
    gradeBefore: { src: mediaUrl("/images/love-story.jpg"), alt: "Photo « Love Story » avant étalonnage" },
    gradeAfter: { src: mediaUrl("/images/love-story.jpg"), alt: "La même photo « Love Story » après étalonnage" },
  },
  work: {
    lookbook: { src: placeholder("work-lookbook", 800, 1000), alt: "Mannequin en manteau ajusté pour un lookbook d'automne" },
    musicVideo: { src: placeholder("work-mv", 800, 1000), alt: "Chanteuse sous les lampadaires dans un clip" },
    productLaunch: { src: placeholder("work-product", 800, 1000), alt: "Nature morte de produit sur une surface en pierre" },
    portraits: { src: placeholder("work-portraits", 800, 1000), alt: "Portrait en noir et blanc d'un jeune homme" },
    brandFilm: { src: placeholder("work-cafe", 800, 1000), alt: "Barista servant un café dans un café parisien" },
    tourDiary: { src: placeholder("work-tour", 800, 1000), alt: "Artiste en coulisses avant un concert" },
  },
  why: {
    feature: { src: placeholder("direction", 900, 1100), alt: "Direction de la pose d'un mannequin pendant un shooting" },
  },
  about: {
    portrait: { src: placeholder("about", 900, 900), alt: "Portrait de Fayad Aiechou" },
  },
  avatars: {
    a1: { src: placeholder("avatar-1", 160, 160), alt: "" },
    a2: { src: placeholder("avatar-2", 160, 160), alt: "" },
    a3: { src: placeholder("avatar-3", 160, 160), alt: "" },
    a4: { src: placeholder("avatar-4", 160, 160), alt: "" },
    a5: { src: placeholder("avatar-5", 160, 160), alt: "" },
    a6: { src: placeholder("avatar-6", 160, 160), alt: "" },
    a7: { src: placeholder("avatar-7", 160, 160), alt: "" },
    a8: { src: placeholder("avatar-8", 160, 160), alt: "" },
    a9: { src: placeholder("avatar-9", 160, 160), alt: "" },
    a10: { src: placeholder("avatar-10", 160, 160), alt: "" },
  },
  /** Client logos for the marquee. Use transparent PNG/SVG logos when you have them. */
  clients: {
    c1: { src: placeholder("client-1", 120, 120), alt: "Maison Lune" },
    c2: { src: placeholder("client-2", 120, 120), alt: "Atelier Sauvage" },
    c3: { src: placeholder("client-3", 120, 120), alt: "Café Oberkampf" },
    c4: { src: placeholder("client-4", 120, 120), alt: "Nour Belkacem" },
    c5: { src: placeholder("client-5", 120, 120), alt: "Studio Rive" },
    c6: { src: placeholder("client-6", 120, 120), alt: "Lina Haddad" },
    c7: { src: placeholder("client-7", 120, 120), alt: "Brume Records" },
    c8: { src: placeholder("client-8", 120, 120), alt: "Théo Marchand" },
    c9: { src: placeholder("client-9", 120, 120), alt: "Galerie Pigalle" },
  },
} as const satisfies Record<string, Record<string, MediaAsset | readonly MediaAsset[]>>;
