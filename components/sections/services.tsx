"use client";

import * as React from "react";

import type { ServiceMedia, ServicesContent, UiStrings } from "@/types/content";
import { interpolate } from "@/lib/utils";
import { DESKTOP_MOTION_OK, gsap, useGSAP } from "@/lib/gsap";
import { Button } from "@/components/ui/button";
import { Card, CardDescription, CardTitle } from "@/components/ui/card";
import { CompareSlider, CompareSliderAfter, CompareSliderBefore, CompareSliderLabel } from "@/components/ui/compare-slider";
import { MediaImage } from "@/components/ui/media-image";
import { Section, SectionDescription, SectionEyebrow, SectionHeader, SectionTitle } from "@/components/ui/section";
import { Slideshow, SlideshowContent, SlideshowDots, SlideshowItem } from "@/components/ui/slideshow";
import { Reveal } from "@/components/motion/reveal";

type ServicesProps = { content: ServicesContent; ui: UiStrings };

const MEDIA_SIZES = "(min-width: 1024px) 420px, 90vw";

export function Services({ content, ui }: ServicesProps) {
  const listRef = React.useRef<HTMLOListElement>(null);

  // Desktop: cards stack (CSS sticky) and the covered card recedes as the next one arrives.
  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add(DESKTOP_MOTION_OK, () => {
        const cards = gsap.utils.toArray<HTMLElement>("[data-service-card]");
        cards.slice(0, -1).forEach((card, index) => {
          gsap.to(card.firstElementChild, {
            scale: 0.94,
            opacity: 0.45,
            ease: "none",
            scrollTrigger: { trigger: cards[index + 1], start: "top bottom", end: "top 30%", scrub: true },
          });
        });
      });
    },
    { scope: listRef },
  );

  return (
    <Section id={content.id} aria-labelledby={`${content.id}-title`}>
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
            <Card size="lg" className="origin-top grid items-center gap-8 bg-card lg:grid-cols-2 lg:gap-10">
              <div className="flex flex-col items-start gap-3 lg:pl-2">
                <CardTitle className="text-xl md:text-2xl">{service.title}</CardTitle>
                {service.paragraphs.map((paragraph) => (
                  <CardDescription key={paragraph.slice(0, 24)} className="max-w-sm">
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
        <Slideshow label={title} className="aspect-[4/3] overflow-hidden rounded-lg bg-muted">
          <SlideshowContent>
            {media.assets.map((asset) => (
              <SlideshowItem key={asset.src}>
                <MediaImage asset={asset} radius="none" className="size-full" sizes={MEDIA_SIZES} />
              </SlideshowItem>
            ))}
          </SlideshowContent>
          <SlideshowDots getLabel={(index, total) => interpolate(ui.showSlide, { index, total })} />
        </Slideshow>
      );

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
