"use client";

import * as React from "react";

import { Button } from "@/components/ui/button";
import { Glow } from "@/components/ui/glow";

type GlassFrameProps = {
  /** Video URL, e.g. mediaUrl("/videos/film.mp4"). Plays muted, on a loop, as a background. Leave out for an empty frame. */
  videoSrc?: string;
  /** Small line above the title. */
  eyebrow?: string;
  title?: string;
  /** Optional text under the title. */
  description?: string;
  cta?: { label: string; href: string };
};

/** 16:9 frosted-glass panel with an optional background video and centred text on top. */
export function GlassFrame({
  videoSrc,
  eyebrow,
  title,
  description,
  cta,
}: GlassFrameProps) {
  const titleId = React.useId();
  const videoRef = React.useRef<HTMLVideoElement>(null);

  // People who ask for reduced motion get a still frame.
  React.useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) videoRef.current?.pause();
  }, []);

  const hasText = Boolean(eyebrow || title || description || cta);

  return (
    <section
      aria-labelledby={title ? titleId : undefined}
      aria-hidden={!title && !videoSrc ? true : undefined}
      className="relative isolate pb-14 md:pb-20"
    >
      <div className="container-page">
        <div className="relative isolate overflow-hidden rounded-[1.75rem] border border-white/10 bg-white/[0.035] p-2 shadow-[inset_0_1px_0_rgb(255_255_255/0.08),0_40px_80px_-40px_rgb(0_0_0/0.7)] backdrop-blur-2xl md:rounded-[2.25rem] md:p-3">
          <div aria-hidden className="pointer-events-none absolute inset-0 -z-10 bg-gradient-to-br from-white/[0.09] via-white/[0.015] to-white/[0.05]" />
          <div aria-hidden className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-px bg-gradient-to-r from-transparent via-white/30 to-transparent" />
          <Glow blur="lg" className="-bottom-1/3 -left-1/6 h-3/4 w-1/2 rotate-[-18deg] opacity-70" />
          <Glow variant="soft" blur="lg" className="-top-1/3 -right-1/6 h-2/3 w-1/2" />

          {/* Below sm the frame grows taller than 16:9 when it holds text, so the text still fits. */}
          <div
            className={`relative grid place-items-center overflow-hidden rounded-[1.25rem] md:rounded-[1.75rem] ${
              hasText ? "aspect-[4/5] sm:aspect-video" : "aspect-video"
            } ${videoSrc ? "bg-black" : "bg-white/[0.02]"}`}
          >
            {videoSrc && (
              <>
                <video
                  ref={videoRef}
                  src={videoSrc}
                  aria-hidden
                  autoPlay
                  muted
                  loop
                  playsInline
                  preload="auto"
                  className="absolute inset-0 size-full object-cover"
                />
                {hasText && (
                  // Darkens the video so the white text stays readable.
                  <div aria-hidden className="absolute inset-0 bg-black/35 bg-[radial-gradient(ellipse_at_center,rgb(0_0_0/0.35),transparent_70%)]" />
                )}
              </>
            )}

            {hasText && (
              <div className="relative flex max-w-2xl flex-col items-center px-6 text-center text-white">
                {eyebrow && <p className="text-xs font-semibold tracking-[0.2em] uppercase md:text-sm">{eyebrow}</p>}
                {title && (
                  <h2
                    id={titleId}
                    className="mt-3 text-4xl leading-[1.02] font-semibold tracking-[-0.03em] text-balance uppercase md:text-6xl xl:text-7xl"
                  >
                    {title}
                  </h2>
                )}
                {description && (
                  <p className="mt-4 text-sm leading-relaxed whitespace-pre-line text-pretty text-white/90 md:text-lg">{description}</p>
                )}
                {cta && (
                  <Button asChild size="lg" className="mt-7">
                    <a href={cta.href}>{cta.label}</a>
                  </Button>
                )}
              </div>
            )}

          </div>
        </div>
      </div>
    </section>
  );
}
