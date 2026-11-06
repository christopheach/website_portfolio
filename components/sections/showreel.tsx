"use client";

import * as React from "react";

import type { ShowreelContent } from "@/types/content";
import { gsap, MOTION_OK, useGSAP } from "@/lib/gsap";
import { Badge, BadgeDot } from "@/components/ui/badge";
import { MediaImage } from "@/components/ui/media-image";

export function Showreel({ content }: { content: ShowreelContent }) {
  const scope = React.useRef<HTMLElement>(null);

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

  return (
    <section ref={scope} aria-label={content.label} className="pb-4">
      <div className="container-page">
        <figure data-reel-frame className="relative overflow-hidden rounded-2xl border will-change-transform">
          <div data-reel-still className="scale-[1.14]">
            <MediaImage asset={content.image} aspect="video" radius="none" sizes="(min-width: 960px) 900px, 100vw" />
          </div>
          <div aria-hidden className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/0 to-black/10" />
          <figcaption className="absolute inset-x-0 bottom-0 flex flex-col items-start gap-2 p-4 md:p-6">
            <Badge variant="overlay" size="lg">
              <BadgeDot tone="primary" />
              {content.label}
            </Badge>
            <span className="text-sm text-white/85 md:text-base">{content.caption}</span>
          </figcaption>
        </figure>
      </div>
    </section>
  );
}
