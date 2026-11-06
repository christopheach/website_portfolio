"use client";

import * as React from "react";
import { motion, useMotionValue, useReducedMotion, useSpring } from "motion/react";

import type { HeroContent, UiStrings } from "@/types/content";
import { interpolate } from "@/lib/utils";
import { gsap, MOTION_OK, useGSAP } from "@/lib/gsap";
import { Avatar, AvatarFallback, AvatarGroup, AvatarImage } from "@/components/ui/avatar";
import { Badge, BadgeDot } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Glow } from "@/components/ui/glow";
import { MediaImage } from "@/components/ui/media-image";
import { Rating } from "@/components/ui/rating";
import { Viewfinder, ViewfinderBar, ViewfinderRec } from "@/components/ui/viewfinder";

type HeroProps = { content: HeroContent; ui: UiStrings };

export function Hero({ content, ui }: HeroProps) {
  const scope = React.useRef<HTMLElement>(null);

  // One orchestrated entrance, plus a light scroll parallax.
  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add(MOTION_OK, () => {
        const tl = gsap.timeline({ defaults: { ease: "expo.out", duration: 1.2 } });
        tl.set("[data-hero-title]", { opacity: 1 })
          .fromTo("[data-hero-line]", { yPercent: 110 }, { yPercent: 0, stagger: 0.09 }, 0.1)
          .fromTo("[data-hero-fade]", { opacity: 0, y: 18 }, { opacity: 1, y: 0, stagger: 0.08, duration: 1 }, 0.35)
          .fromTo(
            "[data-hero-media]",
            { opacity: 0, y: 40, scale: 0.94 },
            { opacity: 1, y: 0, scale: 1, duration: 1.6 },
            0.2,
          );

        gsap.to("[data-hero-parallax]", {
          yPercent: 10,
          ease: "none",
          scrollTrigger: { trigger: scope.current, start: "top top", end: "bottom top", scrub: true },
        });
        gsap.to("[data-hero-glow]", {
          opacity: 0.2,
          ease: "none",
          scrollTrigger: { trigger: scope.current, start: "top top", end: "bottom top", scrub: true },
        });
      });
    },
    { scope },
  );

  return (
    <section ref={scope} id="top" aria-labelledby="hero-title" className="relative isolate overflow-hidden pt-28 pb-14 md:pt-36 md:pb-20">
      <HeroBackdrop />

      <div className="container-page grid items-center gap-12 lg:grid-cols-[1.12fr_1fr] lg:gap-10">
        <div className="flex flex-col items-center text-center lg:items-start lg:text-left">
          <Badge variant="glass" size="lg" data-hero-item data-hero-fade>
            <BadgeDot tone="primary" pulse />
            {content.availability}
          </Badge>

          <h1
            id="hero-title"
            data-hero-item
            data-hero-title
            className="mt-6 text-[2.45rem] leading-[1.02] font-medium tracking-[-0.045em] text-balance sm:text-5xl lg:text-[3.55rem] xl:text-[clamp(4.25rem,4.4vw,7.5rem)]"
          >
            {content.titleLines.map((line) => (
              <span key={line} className="block overflow-hidden pb-[0.06em]">
                <span data-hero-line className="block">
                  {line}
                </span>
              </span>
            ))}
          </h1>

          <p
            data-hero-item
            data-hero-fade
            className="mt-5 max-w-md text-sm leading-relaxed whitespace-pre-line text-pretty text-muted-foreground md:text-base xl:max-w-xl xl:text-lg 2xl:max-w-2xl 2xl:text-xl"
          >
            {content.description}
          </p>

          <div data-hero-item data-hero-fade className="mt-7 flex flex-wrap justify-center gap-3">
            <Button asChild>
              <a href={content.primaryCta.href}>{content.primaryCta.label}</a>
            </Button>
            <Button variant="secondary" asChild>
              <a href={content.secondaryCta.href}>{content.secondaryCta.label}</a>
            </Button>
          </div>

          <div data-hero-item data-hero-fade className="mt-8 flex items-center gap-3">
            <AvatarGroup>
              {content.proof.avatars.map((avatar, index) => (
                <Avatar key={index} size="sm">
                  <AvatarImage asset={avatar} />
                </Avatar>
              ))}
              <Avatar size="sm">
                <AvatarFallback className="bg-primary text-[0.625rem] text-primary-foreground">{content.proof.extraCount}</AvatarFallback>
              </Avatar>
            </AvatarGroup>
            <div className="flex flex-col items-start gap-0.5">
              <Rating
                size="sm"
                value={content.proof.rating}
                label={interpolate(ui.ratingLabel, { value: content.proof.rating, max: 5 })}
              />
              <p className="text-xs text-muted-foreground">{content.proof.label}</p>
            </div>
          </div>
        </div>

        <HeroMedia content={content} />
      </div>
    </section>
  );
}

function HeroBackdrop() {
  return (
    <div data-hero-glow aria-hidden className="absolute inset-0 -z-10">
      <Glow blur="lg" className="-top-40 -right-32 h-[34rem] w-[46rem] rotate-[-18deg]" />
      <Glow variant="soft" blur="lg" className="-top-56 -left-48 h-[28rem] w-[36rem]" />
      <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-b from-transparent to-background" />
    </div>
  );
}

function HeroMedia({ content }: { content: HeroContent }) {
  const reduceMotion = useReducedMotion();
  const rotateX = useSpring(useMotionValue(0), { stiffness: 140, damping: 18 });
  const rotateY = useSpring(useMotionValue(0), { stiffness: 140, damping: 18 });

  function handlePointerMove(event: React.PointerEvent<HTMLDivElement>) {
    if (reduceMotion || event.pointerType !== "mouse") return;
    const rect = event.currentTarget.getBoundingClientRect();
    const x = (event.clientX - rect.left) / rect.width - 0.5;
    const y = (event.clientY - rect.top) / rect.height - 0.5;
    rotateY.set(x * 8);
    rotateX.set(y * -8);
  }

  function reset() {
    rotateX.set(0);
    rotateY.set(0);
  }

  return (
    <div data-hero-item data-hero-media className="relative mx-auto w-full max-w-sm [perspective:1200px] lg:mr-0 lg:max-w-[min(100%,60vh)]">
      <Glow className="inset-x-6 -inset-y-6 opacity-80" blur="lg" />
      <motion.div
        onPointerMove={handlePointerMove}
        onPointerLeave={reset}
        style={{ rotateX, rotateY }}
        className="rounded-2xl border border-white/10 bg-white/[0.04] p-2 shadow-[0_40px_80px_-30px_rgb(0_0_0/0.8)] backdrop-blur-xl"
      >
        <div className="relative overflow-hidden rounded-xl">
          <div data-hero-parallax className="scale-115">
            <MediaImage
              asset={content.image}
              aspect="portrait"
              radius="none"
              preload
              quality={90}
              sizes="(min-width: 1024px) 70vh, (min-width: 640px) 440px, 100vw"
            />
          </div>
          <div aria-hidden className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-black/30" />
          <Viewfinder>
            <ViewfinderBar>
              <ViewfinderRec>{content.viewfinder.rec}</ViewfinderRec>
              <span>{content.viewfinder.timecode}</span>
            </ViewfinderBar>
            <ViewfinderBar className="text-white/80">
              {content.viewfinder.settings.map((setting) => (
                <span key={setting}>{setting}</span>
              ))}
            </ViewfinderBar>
          </Viewfinder>
        </div>
      </motion.div>
    </div>
  );
}
