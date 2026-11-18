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

## Media files (Zipline)

Photos and videos are not in the repo: they are hosted on Zipline and listed in `config/media-manifest.json`
(key such as `/images/hero.jpg` → Zipline URL). Code uses them through `mediaUrl("/images/hero.jpg")`.

1. Put the file in `media-src/` (git-ignored), e.g. `media-src/images/hero.jpg`.
2. Run `npm run media:upload`. New files are uploaded and added to the manifest; existing ones are skipped.
3. In `config/media.ts`, change `src: placeholder("hero", 1000, 1250)` to `src: mediaUrl("/images/hero.jpg")` and update `alt`.
4. When nothing uses picsum anymore, remove its entries from `images.remotePatterns` in `next.config.ts`.

To replace a file, delete its line from the manifest and run the upload again.

### Background videos

Videos are never uploaded as-is. Put the master in `media-originals/videos/` (git-ignored), then:

1. `npm run media:videos` builds `<name>.mp4` (desktop, 1080p), `<name>-small.mp4` (phones, 720p) and
   `<name>-poster.jpg` in `media-src/videos/`: muted H.264 at 1–2.5 Mbps with faststart (`scripts/optimize-videos.mjs`).
2. `npm run media:upload`.
3. Use `videoAsset("<name>")` (e.g. `<GlassFrame video={videoAsset("iceman")} />`).

`components/ui/background-video.tsx` shows the poster, downloads nothing until the video is about to scroll into view,
picks the phone or desktop file, plays it from JS and pauses it off-screen. With reduced motion it keeps the poster.

## Components

Customised shadcn: `button` (default/secondary/outline/ghost/nav/link, `shape="pill"`), `badge` (+ `BadgeDot`),
`card` (default/muted/glass/ghost × sizes), `accordion` (`variant="card"`), `toggle`/`toggle-group` (`pill`, `slot`),
`sheet`, `avatar` (next/image based, + `AvatarGroup`).

New, same conventions (cva, `data-slot`, `cn()`, Radix where relevant): `section` (Section, SectionHeader, SectionEyebrow,
SectionTitle, SectionDescription), `media-image`, `calendar` (keyboard-navigable date grid), `compare-slider`
(Radix Slider), `slideshow`, `marquee`, `number-ticker`, `rating`, `icon-tile`, `glow`, `viewfinder`,
`dialog`, `spinner` (camera-aperture loading indicator), `background-video`.

## Motion

- Hero: one GSAP timeline (line-by-line headline, then copy and the viewfinder card), scroll parallax, mouse tilt.
- Showreel: frame scales to full size on scroll. Services: sticky stacking cards on desktop.
- Work: clicking a project opens a modal (`components/ui/dialog.tsx`). Video projects embed their link
  (YouTube, Vimeo or a direct .mp4, parsed by `lib/video-embed.ts`); photo projects show the full image.
- Work filter: Motion layout animation. Stats: count-up on view. Footer: glow rises on scroll.
- All GSAP code runs inside `gsap.matchMedia("(prefers-reduced-motion: no-preference)")`; Motion uses
  `MotionConfig reducedMotion="user"`; CSS animations use `motion-safe:`/`motion-reduce:`.

## Backoffice (`/admin`)

Studio Cabines adds, edits, hides, reorders and deletes projects at `/admin`. Published projects replace the sample
projects of the "Projets" section (the samples stay until at least one project is published).

- **Images** are uploaded to Zipline (`lib/zipline.ts`) through `app/admin/api/upload/route.ts`, so the Zipline
  token never reaches the browser. Replaced or deleted images are removed from Zipline too.
- **Project data** is stored in Postgres (`DATABASE_URL`, `lib/db.ts`, `lib/projects.ts`). The schema is in
  `db/schema.sql`. `npm run start` applies it automatically first (`prestart`); run `npm run db:migrate` yourself
  when using `next dev` or another start command. It is safe to re-run.
- **Auth** is a single password (`ADMIN_PASSWORD`) with a signed httpOnly cookie (`lib/auth.ts`, 7 days).
- Saving revalidates `/`, so the home page stays static and updates right after each change.

Copy `.env.example` to `.env.local` and fill in the Zipline, database and admin values.

## Booking

The calendar has no backend: picking a date and time opens a pre-filled email. To use Cal.com or Calendly, replace the
request button in `components/sections/booking.tsx` with their link or embed.
