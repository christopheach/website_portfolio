"use client";

import * as React from "react";
import { GlobeIcon, MailIcon } from "lucide-react";

import type { BookingContent, SiteContent, UiStrings } from "@/types/content";
import { interpolate } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Card } from "@/components/ui/card";
import { Section, SectionDescription, SectionEyebrow, SectionHeader, SectionTitle } from "@/components/ui/section";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { SocialIcon } from "@/components/icons/social-icons";
import { Reveal } from "@/components/motion/reveal";

type BookingProps = { content: BookingContent; site: SiteContent; ui: UiStrings };

const startOfToday = () => {
  const now = new Date();
  return new Date(now.getFullYear(), now.getMonth(), now.getDate());
};

export function Booking({ content, site, ui }: BookingProps) {
  const { calendar } = content;
  // "Today" only exists in the browser; rendering it on the server would cause a hydration mismatch.
  const [today, setToday] = React.useState<Date | null>(null);
  const [month, setMonth] = React.useState<Date | null>(null);
  const [date, setDate] = React.useState<Date | null>(null);
  const [time, setTime] = React.useState("");

  React.useEffect(() => {
    const now = startOfToday();
    setToday(now);
    setMonth(now);
  }, []);

  const dateLabel = date
    ? new Intl.DateTimeFormat(site.intlLocale, { weekday: "short", day: "numeric", month: "short" }).format(date)
    : "";
  const vars = { date: dateLabel, time };
  const mailto = `mailto:${site.email}?subject=${encodeURIComponent(interpolate(calendar.mailSubject, vars))}&body=${encodeURIComponent(interpolate(calendar.mailBody, vars))}`;

  return (
    <Section id={content.id} aria-labelledby={`${content.id}-title`}>
      <Reveal>
        <Card size="none" className="grid overflow-hidden lg:grid-cols-[1fr_1.1fr]">
          <div className="flex flex-col gap-8 p-6 md:p-10">
            <SectionHeader align="start" spacing="none">
              <SectionEyebrow>{content.eyebrow}</SectionEyebrow>
              <SectionTitle id={`${content.id}-title`}>{content.title}</SectionTitle>
              {content.description && <SectionDescription>{content.description}</SectionDescription>}
            </SectionHeader>

            <div>
              <p className="text-xs text-muted-foreground">{content.emailLabel}</p>
              <a
                href={`mailto:${site.email}`}
                className="mt-1.5 inline-flex items-center gap-2 rounded-sm text-sm outline-none transition-colors hover:text-primary focus-visible:ring-[3px] focus-visible:ring-ring"
              >
                <MailIcon aria-hidden className="size-4 text-muted-foreground" />
                {site.email}
              </a>
            </div>

            <div className="mt-auto">
              <p className="text-xs text-muted-foreground">{content.followLabel}</p>
              <ul className="mt-3 flex items-center gap-2">
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
          </div>

          <div className="border-t bg-surface/70 p-5 md:p-8 lg:border-t-0 lg:border-l">
            <div className="mb-5 flex flex-wrap items-center justify-between gap-2">
              <h3 className="text-sm font-medium">{calendar.title}</h3>
              <span className="inline-flex items-center gap-1.5 text-xs text-muted-foreground">
                <GlobeIcon aria-hidden className="size-3.5" />
                {calendar.timezone}
              </span>
            </div>

            {today && month ? (
              <Calendar
                month={month}
                onMonthChange={setMonth}
                selected={date}
                onSelect={(next) => {
                  setDate(next);
                  setTime("");
                }}
                today={today}
                minMonth={today}
                locale={site.intlLocale}
                weekStartsOn={1}
                isDateDisabled={(day) => day < today || calendar.unavailableWeekdays.includes(day.getDay())}
                labels={{ previousMonth: ui.previousMonth, nextMonth: ui.nextMonth }}
              />
            ) : (
              <div aria-hidden className="aspect-[7/6] rounded-lg bg-secondary/40 motion-safe:animate-pulse" />
            )}

            <div aria-live="polite" className="mt-6 border-t pt-5">
              {date ? (
                <>
                  <p className="mb-3 text-xs text-muted-foreground">{interpolate(calendar.timesLabel, vars)}</p>
                  <ToggleGroup
                    type="single"
                    variant="slot"
                    size="sm"
                    value={time}
                    onValueChange={setTime}
                    aria-label={interpolate(calendar.timesLabel, vars)}
                    className="grid w-full grid-cols-3 sm:grid-cols-5"
                  >
                    {calendar.slots.map((slot) => (
                      <ToggleGroupItem key={slot} value={slot}>
                        {slot}
                      </ToggleGroupItem>
                    ))}
                  </ToggleGroup>
                  {time ? (
                    <Button className="mt-4 w-full" asChild>
                      <a href={mailto}>{interpolate(calendar.requestLabel, vars)}</a>
                    </Button>
                  ) : (
                    <Button className="mt-4 w-full" disabled>
                      {calendar.selectTimeLabel}
                    </Button>
                  )}
                </>
              ) : (
                <p className="text-sm text-muted-foreground">{calendar.emptyState}</p>
              )}
            </div>
          </div>
        </Card>
      </Reveal>
    </Section>
  );
}
