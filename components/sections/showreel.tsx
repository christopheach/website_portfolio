"use client";

import * as React from "react";
import { PlayIcon } from "lucide-react";

import type { ShowreelContent } from "@/types/content";
import { gsap, MOTION_OK, useGSAP } from "@/lib/gsap";
import { Badge, BadgeDot } from "@/components/ui/badge";
import { MediaImage } from "@/components/ui/media-image";

export function Showreel({ content }: { content: ShowreelContent }) {
  const scope = React.useRef<HTMLElement>(null);
  const [playing, setPlaying] = React.useState(false);

  // The frame grows to full width as it scrolls in; the still drifts inside it.
  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add(MOTION_OK, () => {
        const trigger = { trigger: "[data-reel-frame]", start: "top bottom", end: "center center", scrub: true };
        gsap.fromTo("[data-reel-frame]", { scale: 0.88, borderRadius: 32 }, { scale: 1, borderRadius: 16, ease: "none", scrollTrigger: trigger });
        gsap.fromTo(
          "[data-reel-still]",
          { yPercent: -6 },
          { yPercent: 6, ease: "none", scrollTrigger: { trigger: "[data-reel-frame]", start: "top bottom", end: "bottom top", scrub: true } },
        );
      });
    },
    { scope },
  );

  const canPlay = Boolean(content.youtubeId);

  return (
    <section ref={scope} aria-label={content.label} className="pb-4">
      <div className="container-page">
        <figure data-reel-frame className="relative aspect-video overflow-hidden rounded-2xl border bg-black will-change-transform">
          {playing && content.youtubeId ? (
            // Loaded only after the click, so YouTube adds no weight to the initial page.
            <iframe
              src={`https://www.youtube-nocookie.com/embed/${content.youtubeId}?autoplay=1&rel=0&modestbranding=1&playsinline=1`}
              title={content.label}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              referrerPolicy="strict-origin-when-cross-origin"
              allowFullScreen
              className="absolute inset-0 size-full"
            />
          ) : (
            <>
              <div data-reel-still className="absolute inset-0 scale-[1.14]">
                <MediaImage asset={content.image} radius="none" className="size-full" sizes="100vw" quality={90} />
              </div>
              <div aria-hidden className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/0 to-black/10" />

              {canPlay && (
                <button
                  type="button"
                  onClick={() => setPlaying(true)}
                  aria-label={content.playLabel}
                  className="group absolute inset-0 grid place-items-center outline-none"
                >
                  <span className="grid size-16 place-items-center rounded-full bg-white/15 text-white ring-1 ring-white/30 backdrop-blur-md transition-transform duration-300 group-hover:scale-110 group-focus-visible:ring-[3px] group-focus-visible:ring-ring motion-reduce:transition-none md:size-20">
                    <PlayIcon aria-hidden className="ml-1 size-7 fill-current md:size-8" />
                  </span>
                </button>
              )}

              <figcaption className="pointer-events-none absolute bottom-0 left-0 flex flex-col items-center gap-2 p-4 md:p-6">
                <Badge variant="overlay" size="lg">
                  <BadgeDot tone="primary" className="animate-blink-5s motion-reduce:animate-none" />
                  {content.label}
                </Badge>
                <span className="text-center text-sm text-white/85 md:text-base">{content.caption}</span>
              </figcaption>
            </>
          )}
        </figure>
      </div>
    </section>
  );
}
