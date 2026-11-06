# Fayad Aiechou — portfolio

Single-page portfolio for a Paris-based photographer and cinematographer, rebuilt from a Framer template with
Next.js 16 (App Router), TypeScript, Tailwind CSS v4, shadcn/ui conventions, GSAP and Motion.

```bash
npm install
npm run dev        # http://localhost:3000
npm run build && npm start
```

Set `NEXT_PUBLIC_SITE_URL` in production so canonical URLs, Open Graph, the sitemap and JSON-LD use the real domain.

## Where things live

| Path | What it holds |
| --- | --- |
| `content/en/*.ts` | All copy: hero, services, projects, pricing, FAQ, contact details, UI labels. Typed by `types/content.ts`. |
| `content/index.ts` | `getDictionary(locale)`. Copy `content/en` to `content/fr` to add a translation. |
| `config/media.ts` | **Every image path.** Swap a placeholder by editing one `src`. An empty `src` shows the striped placeholder. |
| `config/site.ts` | Domain, Twitter handle, theme colour. |
| `app/globals.css` | Design tokens (colours, radius, animations) and small utilities (`container-page`, `bg-stripes`). |
| `components/ui` | shadcn components customised through variants, plus new ones built the same way. |
| `components/sections` | One file per page section, in page order. |
| `components/layout` | Header (with mobile sheet), footer, logo. |
| `components/motion` | `MotionProvider` (respects reduced motion) and `Reveal` helpers. |
| `lib/gsap.ts` | GSAP + ScrollTrigger registration and the reduced-motion media queries. |

## Replacing placeholder images

1. Put the file in `public/images/`, e.g. `public/images/hero.jpg`.
2. In `config/media.ts`, change `src: placeholder("hero", 1000, 1250)` to `src: "/images/hero.jpg"` and update `alt`.
3. When nothing uses picsum anymore, remove its entries from `images.remotePatterns` in `next.config.ts`.

## Components

Customised shadcn: `button` (default/secondary/outline/ghost/nav/link, `shape="pill"`), `badge` (+ `BadgeDot`),
`card` (default/muted/glass/ghost × sizes), `accordion` (`variant="card"`), `toggle`/`toggle-group` (`pill`, `slot`),
`sheet`, `avatar` (next/image based, + `AvatarGroup`).

New, same conventions (cva, `data-slot`, `cn()`, Radix where relevant): `section` (Section, SectionHeader, SectionEyebrow,
SectionTitle, SectionDescription), `media-image`, `calendar` (keyboard-navigable date grid), `compare-slider`
(Radix Slider), `slideshow`, `marquee`, `number-ticker`, `rating`, `icon-tile`, `glow`, `viewfinder`.

## Motion

- Hero: one GSAP timeline (line-by-line headline, then copy and the viewfinder card), scroll parallax, mouse tilt.
- Showreel: frame scales to full size on scroll. Services: sticky stacking cards on desktop.
- Work filter: Motion layout animation. Stats: count-up on view. Footer: glow rises on scroll.
- All GSAP code runs inside `gsap.matchMedia("(prefers-reduced-motion: no-preference)")`; Motion uses
  `MotionConfig reducedMotion="user"`; CSS animations use `motion-safe:`/`motion-reduce:`.

## Booking

The calendar has no backend: picking a date and time opens a pre-filled email. To use Cal.com or Calendly, replace the
request button in `components/sections/booking.tsx` with their link or embed.
