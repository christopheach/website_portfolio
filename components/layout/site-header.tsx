"use client";

import * as React from "react";
import { MenuIcon } from "lucide-react";

import type { NavigationContent, SiteContent, UiStrings } from "@/types/content";
import { Button } from "@/components/ui/button";
import { Sheet, SheetClose, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { Logo } from "@/components/layout/logo";

type SiteHeaderProps = { navigation: NavigationContent; site: SiteContent; ui: UiStrings };

export function SiteHeader({ navigation, site, ui }: SiteHeaderProps) {
  const [scrolled, setScrolled] = React.useState(false);
  const [open, setOpen] = React.useState(false);

  React.useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header className="fixed inset-x-0 top-0 z-50 pt-[env(safe-area-inset-top)]">
      <div className="container-page pt-3">
        {/* Wide frosted pill: links on the left, logo centered, call-to-action on the right. */}
        <div
          data-scrolled={scrolled}
          className="relative grid h-14 w-full grid-cols-[1fr_auto_1fr] items-center gap-4 rounded-full border border-white/10 bg-white/[0.05] px-3 shadow-[inset_0_1px_0_rgb(255_255_255/0.08)] backdrop-blur-xl transition-[background-color,border-color] duration-300 data-[scrolled=true]:border-border data-[scrolled=true]:bg-background/70 md:h-20 md:px-5 lg:px-6 motion-reduce:transition-none"
        >
          <div className="flex items-center justify-start">
            <nav aria-label={ui.menuTitle} className="hidden md:block">
              <ul className="flex items-center lg:gap-2">
                {navigation.links.map((link) => (
                  <li key={link.href}>
                    <Button variant="nav" size="sm" className="h-10 px-2.5 text-sm text-foreground/85 lg:px-3 lg:text-base xl:px-4 xl:text-lg" asChild>
                      <a href={link.href}>{link.label}</a>
                    </Button>
                  </li>
                ))}
              </ul>
            </nav>

            <Sheet open={open} onOpenChange={setOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon-sm" className="md:hidden" aria-label={ui.openMenu}>
                  <MenuIcon aria-hidden />
                </Button>
              </SheetTrigger>
              <SheetContent side="top" closeLabel={ui.closeMenu} aria-describedby={undefined} className="pb-6">
                <SheetHeader className="px-5 pt-5">
                  <SheetTitle className="text-sm text-muted-foreground">{ui.menuTitle}</SheetTitle>
                </SheetHeader>
                <nav aria-label={ui.menuTitle} className="px-5">
                  <ul className="flex flex-col">
                    {navigation.links.map((link) => (
                      <li key={link.href} className="border-b last:border-b-0">
                        <SheetClose asChild>
                          <a
                            href={link.href}
                            className="block rounded-md py-3.5 text-2xl font-medium tracking-tight outline-none focus-visible:ring-[3px] focus-visible:ring-ring"
                          >
                            {link.label}
                          </a>
                        </SheetClose>
                      </li>
                    ))}
                  </ul>
                  <SheetClose asChild>
                    <Button size="lg" className="mt-6 w-full" asChild>
                      <a href={navigation.cta.href}>{navigation.cta.label}</a>
                    </Button>
                  </SheetClose>
                </nav>
              </SheetContent>
            </Sheet>
          </div>

          <div className="flex justify-center">
            <Logo name={site.name} label={ui.homeLabel} className="h-10 md:h-12" />
          </div>

          <div className="flex items-center justify-end">
            <Button size="sm" className="h-10 px-4 text-sm md:h-11 md:px-5 md:text-base" asChild>
              <a href={navigation.cta.href}>{navigation.cta.label}</a>
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
}
