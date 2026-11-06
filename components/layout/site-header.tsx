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
        <div
          data-scrolled={scrolled}
          className="mx-auto flex h-13 max-w-2xl items-center justify-between gap-4 rounded-xl border border-transparent pr-2 pl-3 transition-[background-color,border-color] duration-300 data-[scrolled=true]:border-border data-[scrolled=true]:bg-background/70 data-[scrolled=true]:backdrop-blur-xl motion-reduce:transition-none"
        >
          <Logo name={site.name} initials={site.initials} label={ui.homeLabel} />

          <nav aria-label={ui.menuTitle} className="hidden md:block">
            <ul className="flex items-center">
              {navigation.links.map((link) => (
                <li key={link.href}>
                  <Button variant="nav" size="sm" asChild>
                    <a href={link.href}>{link.label}</a>
                  </Button>
                </li>
              ))}
            </ul>
          </nav>

          <div className="flex items-center gap-1.5">
            <Button size="sm" asChild>
              <a href={navigation.cta.href}>{navigation.cta.label}</a>
            </Button>
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
        </div>
      </div>
    </header>
  );
}
