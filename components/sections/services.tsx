"use client";

import * as React from "react";

import type { VideoAsset } from "@/config/media";
import type { ServiceMedia, ServicesContent, UiStrings } from "@/types/content";
import { cn, interpolate } from "@/lib/utils";
import { DESKTOP_MOTION_OK, gsap, useGSAP } from "@/lib/gsap";
import { BackgroundVideo } from "@/components/ui/background-video";
import { Button } from "@/components/ui/button";
import { Card, CardDescription, CardTitle } from "@/components/ui/card";
import { CompareSlider, CompareSliderAfter, CompareSliderBefore, CompareSliderLabel } from "@/components/ui/compare-slider";
import { MediaImage } from "@/components/ui/media-image";
import { Section, SectionDescription, SectionEyebrow, SectionHeader, SectionTitle } from "@/components/ui/section";
import { Slideshow, SlideshowContent, SlideshowDots, SlideshowItem } from "@/components/ui/slideshow";
import { Reveal } from "@/components/motion/reveal";

type ServicesProps = { content: ServicesContent; ui: UiStrings };

const MEDIA_SIZES = "(min-width: 1024px) 50vw, 90vw";

export function Services({ content, ui }: ServicesProps) {
  const listRef = React.useRef<HTMLOListElement>(null);

  // Desktop: cards stack (CSS sticky) and the covered card recedes as the next one arrives.
  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add(DESKTOP_MOTION_OK, () => {
        const cards = gsap.utils.toArray<HTMLElement>("[data-service-card]");
        cards.slice(0, -1).forEach((card, index) => {
          // Dim with brightness, not opacity: a see-through card would let the card behind show through its text.
          gsap.fromTo(card.firstElementChild, { scale: 1, filter: "brightness(1)" }, {
            scale: 0.94,
            filter: "brightness(0.45)",
            ease: "none",
            scrollTrigger: { trigger: cards[index + 1], start: "top bottom", end: "top 30%", scrub: true },
          });
        });
      });
    },
    { scope: listRef },
  );

  return (
    <Section
      id={content.id}
      aria-labelledby={`${content.id}-title`}
      // Gap above the heading = gap below it (header mb-12/md:mb-14): the video block above
      // already leaves pb-14/md:pb-20, so pull up by the difference.
      className="-mt-2 pt-0 md:-mt-6 md:pt-0"
    >
      <Reveal>
        <SectionHeader>
          <SectionEyebrow>{content.eyebrow}</SectionEyebrow>
          <SectionTitle id={`${content.id}-title`}>{content.title}</SectionTitle>
          {content.description && <SectionDescription>{content.description}</SectionDescription>}
        </SectionHeader>
      </Reveal>

      <ol ref={listRef} className="flex flex-col gap-5 lg:gap-8">
        {content.items.map((service, index) => (
          <li
            key={service.id}
            data-service-card
            className="lg:sticky"
            style={{ top: `calc(6rem + ${index * 1.25}rem)` }}
          >
            {/* Same height for every card on desktop so a taller card never peeks out under the next one. */}
            <Card size="lg" className="origin-top grid items-center gap-8 bg-card lg:h-[min(calc(100svh-9rem),44rem)] lg:grid-cols-2 lg:gap-10">
              <div className="flex flex-col items-start gap-3 lg:pl-2">
                <CardTitle className="text-xl md:text-2xl xl:text-3xl">{service.title}</CardTitle>
                {service.paragraphs.map((paragraph) => (
                  <CardDescription key={paragraph.slice(0, 24)} className="max-w-sm xl:max-w-lg xl:text-base">
                    {paragraph}
                  </CardDescription>
                ))}
                <Button variant="secondary" size="sm" className="mt-3" asChild>
                  <a href={service.cta.href}>{service.cta.label}</a>
                </Button>
              </div>
              <ServiceMediaView media={service.media} title={service.title} ui={ui} />
            </Card>
          </li>
        ))}
      </ol>
    </Section>
  );
}

function ServiceMediaView({ media, title, ui }: { media: ServiceMedia; title: string; ui: UiStrings }) {
  switch (media.type) {
    case "image":
      return <MediaImage asset={media.asset} aspect="photo" radius="lg" sizes={MEDIA_SIZES} />;

    case "slideshow":
      return (
        <Slideshow
          label={title}
          // The 4:5 campaign carousel changes every 4 s and has no dots.
          interval={media.aspect === "portrait" ? 4000 : undefined}
          className={cn(
            "overflow-hidden rounded-lg bg-muted",
            media.aspect === "portrait"
              ? // 4:5, capped so the whole frame fits on screen inside the sticky card.
                "mx-auto aspect-[4/5] w-full max-w-md lg:h-full lg:max-h-full lg:w-auto lg:max-w-full"
              : "aspect-[4/3]",
          )}
        >
          <SlideshowContent>
            {media.assets.map((asset) => (
              <SlideshowItem key={asset.src}>
                <MediaImage asset={asset} radius="none" className="size-full" sizes={MEDIA_SIZES} />
              </SlideshowItem>
            ))}
          </SlideshowContent>
          {media.aspect !== "portrait" && (
            <SlideshowDots getLabel={(index, total) => interpolate(ui.showSlide, { index, total })} />
          )}
        </Slideshow>
      );

    case "video":
      return <ServiceVideo video={media.video} aspect={media.aspect} label={media.label} />;

    case "compare": {
      // While both sides share one placeholder photo, fake an ungraded "log" look.
      const simulateLog = media.before.src === media.after.src;
      return (
        <CompareSlider label={ui.compareLabel} defaultValue={50} className="aspect-[4/3] rounded-lg bg-muted">
          <CompareSliderBefore>
            <MediaImage
              asset={media.before}
              radius="none"
              className="size-full"
              sizes={MEDIA_SIZES}
              imageClassName={simulateLog ? "saturate-[0.3] contrast-[0.75] brightness-110" : undefined}
            />
          </CompareSliderBefore>
          <CompareSliderAfter>
            <MediaImage
              asset={media.after}
              radius="none"
              className="size-full"
              sizes={MEDIA_SIZES}
              imageClassName={simulateLog ? "saturate-[1.25] contrast-[1.1]" : undefined}
            />
          </CompareSliderAfter>
          <CompareSliderLabel side="before">{media.beforeLabel}</CompareSliderLabel>
          <CompareSliderLabel side="after">{media.afterLabel}</CompareSliderLabel>
        </CompareSlider>
      );
    }
  }
}

/** Muted looping video kept in its own format (e.g. 9:16), sized to the card height on desktop. */
function ServiceVideo({ video, aspect, label }: { video: VideoAsset; aspect: string; label: string }) {
  const [w, h] = aspect.split("/").map(Number);
  const isPortrait = h > w;

  return (
    <div
      style={{ aspectRatio: aspect }}
      className={cn(
        "relative mx-auto overflow-hidden rounded-lg bg-muted",
        // Vertical videos fill the card height; horizontal ones fill the column width.
        isPortrait ? "w-full max-w-xs lg:h-full lg:max-h-full lg:w-auto lg:max-w-full" : "w-full",
      )}
    >
      <BackgroundVideo
        video={video}
        label={label}
        className="size-full"
        sizes={isPortrait ? "(min-width: 1024px) 24rem, 20rem" : "(min-width: 1024px) 40vw, 90vw"}
      />
    </div>
  );
}
