"use client";

import * as React from "react";

import type { FooterContent, SiteContent, UiStrings } from "@/types/content";
import { interpolate } from "@/lib/utils";
import { gsap, MOTION_OK, useGSAP } from "@/lib/gsap";
import { Button } from "@/components/ui/button";
import { Glow } from "@/components/ui/glow";
import { Logo } from "@/components/layout/logo";
import { SocialIcon } from "@/components/icons/social-icons";

type SiteFooterProps = { footer: FooterContent; site: SiteContent; ui: UiStrings };

export function SiteFooter({ footer, site, ui }: SiteFooterProps) {
  const scope = React.useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add(MOTION_OK, () => {
        gsap.fromTo(
          "[data-footer-glow]",
          { opacity: 0.45, scale: 0.85, yPercent: 15 },
          {
            opacity: 1,
            scale: 1,
            yPercent: 0,
            ease: "none",
            scrollTrigger: { trigger: scope.current, start: "top bottom", end: "bottom bottom", scrub: true },
          },
        );
      });
    },
    { scope },
  );

  return (
    <footer ref={scope} className="relative isolate overflow-hidden border-t pt-24 pb-8 md:pt-32">
      <div data-footer-glow aria-hidden className="absolute inset-x-0 bottom-0 -z-10 h-full origin-bottom">
        <Glow blur="lg" className="bottom-[-45%] left-1/2 h-[110%] w-[130%] -translate-x-1/2" />
        <Glow variant="white" blur="lg" className="bottom-[-30%] left-1/2 h-[50%] w-[60%] -translate-x-1/2" />
      </div>

      <div className="container-page flex flex-col items-center text-center">
        <Logo name={site.name} initials={site.initials} label={ui.homeLabel} className="text-base" />
        <p className="mt-4 max-w-xs text-sm leading-relaxed text-pretty text-muted-foreground">{footer.tagline}</p>

        <nav aria-label="Footer" className="mt-8">
          <ul className="flex flex-wrap justify-center gap-x-6 gap-y-2 text-sm">
            {footer.links.map((link) => (
              <li key={link.href}>
                <a href={link.href} className="rounded-sm text-foreground/80 outline-none transition-colors hover:text-foreground focus-visible:ring-[3px] focus-visible:ring-ring">
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <ul className="mt-8 flex items-center gap-2">
          {site.socials.map((social) => (
            <li key={social.platform}>
              <Button size="icon-sm" shape="pill" asChild>
                <a href={social.href} target="_blank" rel="noopener noreferrer" aria-label={social.label}>
                  <SocialIcon platform={social.platform} />
                </a>
              </Button>
            </li>
          ))}
        </ul>
      </div>

      <div className="container-page mt-24 flex flex-col items-center justify-between gap-3 text-xs text-foreground/70 sm:flex-row">
        <p>{interpolate(footer.copyright, { year: new Date().getFullYear() })}</p>
        <a href="#top" className="rounded-sm outline-none hover:text-foreground focus-visible:ring-[3px] focus-visible:ring-ring">
          {footer.backToTop}
        </a>
      </div>
    </footer>
  );
}
