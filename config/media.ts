/**
 * Centralised media registry.
 *
 * Every image on the site is referenced from here, so swapping a placeholder
 * for a real photo means changing ONE `src` value:
 *
 *   1. Drop the file into /public/images (e.g. /public/images/hero.jpg)
 *   2. Replace `placeholder("hero", 1200, 1500)` with "/images/hero.jpg"
 *
 * An empty `src` renders the striped placeholder used by the original template.
 */

export type MediaAsset = {
  /** Local path ("/images/x.jpg") or an allowed remote URL. Empty string = striped placeholder. */
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
    portrait: { src: placeholder("hero", 1000, 1250), alt: "Portrait framed through a camera viewfinder" },
  },
  showreel: {
    cover: { src: placeholder("reel", 1920, 1080), alt: "Still frame from the 2026 showreel" },
  },
  services: {
    campaign: { src: placeholder("campaign", 1200, 900), alt: "Campaign photograph of a model in soft window light" },
    shortForm: [
      { src: placeholder("reel-1", 1200, 900), alt: "Behind the scenes of a short-form shoot" },
      { src: placeholder("reel-2", 1200, 900), alt: "Vertical film frame shot on a Paris street" },
      { src: placeholder("reel-3", 1200, 900), alt: "Close-up frame from a product reel" },
    ],
    narrative: [
      { src: placeholder("mv-1", 1200, 900), alt: "Music video frame lit in red neon" },
      { src: placeholder("mv-2", 1200, 900), alt: "Wide frame from a short documentary" },
      { src: placeholder("mv-3", 1200, 900), alt: "Artist performing in a dark studio" },
    ],
    gradeBefore: { src: placeholder("grade", 1200, 900), alt: "Ungraded log footage" },
    gradeAfter: { src: placeholder("grade", 1200, 900), alt: "The same footage after colour grading" },
  },
  work: {
    lookbook: { src: placeholder("work-lookbook", 800, 1000), alt: "Model in a tailored coat for an autumn lookbook" },
    musicVideo: { src: placeholder("work-mv", 800, 1000), alt: "Singer under street lights in a music video" },
    productLaunch: { src: placeholder("work-product", 800, 1000), alt: "Product still life on a stone surface" },
    portraits: { src: placeholder("work-portraits", 800, 1000), alt: "Black and white portrait of a young man" },
    brandFilm: { src: placeholder("work-cafe", 800, 1000), alt: "Barista pouring coffee in a Paris café" },
    tourDiary: { src: placeholder("work-tour", 800, 1000), alt: "Artist backstage before a concert" },
  },
  why: {
    feature: { src: placeholder("direction", 900, 1100), alt: "Directing a model's pose during a shoot" },
  },
  about: {
    portrait: { src: placeholder("about", 900, 900), alt: "Portrait of Fayad Aiechou" },
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
