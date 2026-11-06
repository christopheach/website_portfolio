"use client";

import * as React from "react";
import { AnimatePresence, motion } from "motion/react";
import { ArrowUpRightIcon, BadgeCheckIcon, PlayIcon } from "lucide-react";

import type { WorkContent, WorkFilter, WorkItem } from "@/types/content";
import { interpolate } from "@/lib/utils";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { MediaImage } from "@/components/ui/media-image";
import { Section, SectionDescription, SectionEyebrow, SectionHeader, SectionTitle } from "@/components/ui/section";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { Reveal } from "@/components/motion/reveal";

export function Work({ content }: { content: WorkContent }) {
  const [filter, setFilter] = React.useState<WorkFilter>("all");
  const items = filter === "all" ? content.items : content.items.filter((item) => item.category === filter);

  return (
    <Section id={content.id} aria-labelledby={`${content.id}-title`}>
      <Reveal>
        <SectionHeader spacing="none" className="mb-8">
          <SectionEyebrow>{content.eyebrow}</SectionEyebrow>
          <SectionTitle id={`${content.id}-title`}>{content.title}</SectionTitle>
          {content.description && <SectionDescription>{content.description}</SectionDescription>}
        </SectionHeader>
        <ToggleGroup
          type="single"
          variant="pill"
          size="sm"
          value={filter}
          onValueChange={(value) => value && setFilter(value as WorkFilter)}
          aria-label={content.filterLabel}
          className="mx-auto mb-10"
        >
          {content.filters.map((option) => (
            <ToggleGroupItem key={option.value} value={option.value}>
              {option.label}
            </ToggleGroupItem>
          ))}
        </ToggleGroup>
      </Reveal>

      <motion.ul layout className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        <AnimatePresence mode="popLayout" initial={false}>
          {items.map((item) => (
            <motion.li
              key={item.id}
              layout
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.96 }}
              transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
            >
              <WorkCard item={item} content={content} />
            </motion.li>
          ))}
        </AnimatePresence>
      </motion.ul>
    </Section>
  );
}

function WorkCard({ item, content }: { item: WorkItem; content: WorkContent }) {
  return (
    <article className="group relative">
      <Card size="none" className="overflow-hidden transition-colors duration-300 group-hover:border-white/15">
        <header className="flex items-center gap-2 px-3 py-2.5">
          <Avatar size="xs">
            <AvatarImage asset={item.client.avatar} />
          </Avatar>
          <span className="truncate text-xs font-medium">{item.client.name}</span>
          {item.client.verified && (
            <BadgeCheckIcon role="img" aria-label={content.verifiedLabel} className="size-3.5 shrink-0 text-primary" />
          )}
        </header>

        <MediaImage
          asset={item.image}
          aspect="tall"
          radius="none"
          sizes="(min-width: 1024px) 300px, (min-width: 640px) 45vw, 92vw"
          imageClassName="transition-transform duration-700 ease-out group-hover:scale-105 motion-reduce:transition-none motion-reduce:group-hover:scale-100"
        >
          <div aria-hidden className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/0 to-black/0" />

          {item.category === "film" && item.duration && (
            <Badge variant="overlay" size="lg" className="absolute top-3 right-3">
              <PlayIcon aria-hidden className="fill-current" />
              <span className="sr-only">{interpolate(content.filmLabel, { duration: item.duration })}</span>
              <span aria-hidden className="tabular-nums">{item.duration}</span>
            </Badge>
          )}

          <div className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-3 p-4">
            <h3 className="text-sm font-medium text-white">{item.title}</h3>
            {item.href && (
              <span
                aria-hidden
                className="grid size-8 shrink-0 translate-y-1 place-items-center rounded-full bg-white text-black opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100 motion-reduce:transition-none"
              >
                <ArrowUpRightIcon className="size-4" />
              </span>
            )}
          </div>
        </MediaImage>
      </Card>

      {item.href && (
        <a
          href={item.href}
          aria-label={`${content.viewLabel}: ${item.title}, ${item.client.name}`}
          className="absolute inset-0 rounded-xl outline-none focus-visible:ring-[3px] focus-visible:ring-ring"
        />
      )}
    </article>
  );
}
