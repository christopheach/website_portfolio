"use client";

import * as React from "react";
import { AnimatePresence, motion } from "motion/react";
import Image from "next/image";
import { ArrowUpRightIcon, BadgeCheckIcon, Maximize2Icon, PlayIcon, XIcon } from "lucide-react";

import type { WorkContent, WorkFilter, WorkItem } from "@/types/content";
import { cn, interpolate } from "@/lib/utils";
import { getVideoEmbed, type VideoEmbed } from "@/lib/video-embed";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Dialog, DialogClose, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { MediaImage } from "@/components/ui/media-image";
import { Spinner } from "@/components/ui/spinner";
import { Section, SectionDescription, SectionEyebrow, SectionHeader, SectionTitle } from "@/components/ui/section";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { Reveal } from "@/components/motion/reveal";

export function Work({ content }: { content: WorkContent }) {
  // Starts on the first tab that has projects (Photo, unless only videos exist); there is no "all" tab.
  const [filter, setFilter] = React.useState<WorkFilter>(
    () =>
      content.filters.find((option) => content.items.some((item) => item.category === option.value))?.value ??
      content.filters[0]?.value ??
      "all",
  );
  const items = filter === "all" ? content.items : content.items.filter((item) => item.category === filter);
  // `selected` outlives `open` so the modal keeps its content during the closing animation.
  const [selected, setSelected] = React.useState<WorkItem | null>(null);
  const [open, setOpen] = React.useState(false);
  // The card that opened the modal gets focus back on close (Radix only does this for its own Trigger).
  const opener = React.useRef<HTMLElement | null>(null);
  const openProject = (item: WorkItem, from: HTMLElement) => {
    opener.current = from;
    setSelected(item);
    setOpen(true);
  };

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
              <WorkCard item={item} content={content} onOpen={(from) => openProject(item, from)} />
            </motion.li>
          ))}
        </AnimatePresence>
      </motion.ul>

      <Dialog open={open} onOpenChange={setOpen}>
        {selected && (
          <ProjectModal
            key={selected.id}
            item={selected}
            content={content}
            onCloseAutoFocus={(event) => {
              event.preventDefault();
              opener.current?.focus();
            }}
          />
        )}
      </Dialog>
    </Section>
  );
}

/** Who the project is for: the client's name, else "Projet personnel" / "Projet client". */
function byline(item: WorkItem, content: WorkContent) {
  if (item.kind === "personal") return content.personalLabel;
  return item.client.name || content.clientLabel;
}

/** The verified badge only makes sense next to a named client. */
function isVerifiedClient(item: WorkItem) {
  return item.kind !== "personal" && Boolean(item.client.name) && Boolean(item.client.verified);
}

function WorkCard({ item, content, onOpen }: { item: WorkItem; content: WorkContent; onOpen: (from: HTMLElement) => void }) {
  const playable = item.category === "film" && getVideoEmbed(item.href) !== null;
  const [loaded, setLoaded] = React.useState(!item.image.src);

  return (
    <article className="group relative">
      <Card size="none" className="overflow-hidden transition-colors duration-300 group-hover:border-white/15">
        <header className="flex items-center gap-2 px-3 py-2.5">
          <Avatar size="xs">
            <AvatarImage asset={item.client.avatar} />
          </Avatar>
          <span className="truncate text-xs font-medium">{byline(item, content)}</span>
          {isVerifiedClient(item) && (
            <BadgeCheckIcon role="img" aria-label={content.verifiedLabel} className="size-3.5 shrink-0 text-primary" />
          )}
        </header>

        <MediaImage
          asset={item.image}
          aspect="portrait"
          radius="none"
          sizes="(min-width: 1024px) 33vw, (min-width: 640px) 45vw, 92vw"
          data-fade-in
          onLoad={() => setLoaded(true)}
          onError={() => setLoaded(true)}
          imageClassName={cn(
            "transition-[transform,opacity] duration-700 ease-out group-hover:scale-105 motion-reduce:transition-none motion-reduce:group-hover:scale-100",
            loaded ? "opacity-100" : "opacity-0",
          )}
        >
          {!loaded && (
            <div aria-hidden data-loading-overlay className="absolute inset-0 grid place-items-center overflow-hidden bg-surface">
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/[0.06] to-transparent motion-safe:animate-shimmer" />
              <Spinner tone="muted" label="" />
            </div>
          )}
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
            <span
              aria-hidden
              className="grid size-8 shrink-0 translate-y-1 place-items-center rounded-full bg-white text-black opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100 group-focus-within:translate-y-0 group-focus-within:opacity-100 motion-reduce:transition-none"
            >
              {playable ? <PlayIcon className="ml-0.5 size-3.5 fill-current" /> : <Maximize2Icon className="size-3.5" />}
            </span>
          </div>
        </MediaImage>
      </Card>

      {/* The whole card opens the project modal. */}
      <button
        type="button"
        onClick={(event) => onOpen(event.currentTarget)}
        aria-haspopup="dialog"
        aria-label={`${playable ? content.playLabel : content.openLabel}: ${item.title}, ${byline(item, content)}`}
        className="absolute inset-0 cursor-pointer rounded-xl outline-none focus-visible:ring-[3px] focus-visible:ring-ring"
      />
    </article>
  );
}

/** Space kept around the media for the footer and screen margins. */
const MEDIA_MAX_H = "max-h-[calc(100dvh-9rem)]";

function ProjectModal({
  item,
  content,
  onCloseAutoFocus,
}: {
  item: WorkItem;
  content: WorkContent;
  onCloseAutoFocus: (event: Event) => void;
}) {
  // Only film projects are played; a photo project's link stays a plain "view project" button.
  const embed = item.category === "film" ? getVideoEmbed(item.href) : null;
  const vertical = embed?.kind === "iframe" && embed.vertical;

  return (
    <DialogContent
      showCloseButton={false}
      onCloseAutoFocus={onCloseAutoFocus}
      aria-describedby={undefined}
      className={vertical ? "max-w-[min(26rem,calc((100dvh-9rem)*9/16))]" : embed ? "max-w-5xl" : "max-w-3xl"}
    >
      <div className="min-h-0 flex-1 bg-black">
        {embed ? (
          <ProjectVideo embed={embed} item={item} loadingLabel={content.loadingLabel} />
        ) : (
          <ProjectImage item={item} loadingLabel={content.loadingLabel} />
        )}
      </div>

      <footer className="flex flex-wrap items-center gap-x-4 gap-y-3 p-4">
        <div className="flex min-w-0 flex-1 items-center gap-3">
          <Avatar>
            <AvatarImage asset={item.client.avatar} />
          </Avatar>
          <div className="min-w-0">
            <DialogTitle className="truncate">{item.title}</DialogTitle>
            <p className="flex items-center gap-1 text-sm text-muted-foreground">
              <span className="truncate">{byline(item, content)}</span>
              {isVerifiedClient(item) && (
                <BadgeCheckIcon role="img" aria-label={content.verifiedLabel} className="size-3.5 shrink-0 text-primary" />
              )}
              {item.category === "film" && item.duration && (
                <span className="tabular-nums">
                  <span aria-hidden className="mx-1.5">
                    ·
                  </span>
                  {item.duration}
                </span>
              )}
            </p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          {item.href && !embed && (
            <Button asChild variant="secondary" size="sm" shape="pill">
              <a href={item.href} target="_blank" rel="noopener noreferrer">
                {content.viewLabel}
                <ArrowUpRightIcon aria-hidden />
              </a>
            </Button>
          )}
          {/* In the footer rather than over the media, where it would cover the player's controls. */}
          <DialogClose asChild>
            <Button variant="ghost" size="icon-sm" shape="pill" aria-label={content.closeLabel}>
              <XIcon />
            </Button>
          </DialogClose>
        </div>
      </footer>
    </DialogContent>
  );
}

/** Centered aperture spinner that fades out once the media inside the same box is ready. */
function MediaLoading({ loading, label }: { loading: boolean; label: string }) {
  return (
    <div
      aria-hidden={!loading}
      className={cn(
        "pointer-events-none absolute inset-0 z-1 grid place-items-center transition-opacity duration-500 motion-reduce:transition-none",
        loading ? "opacity-100" : "opacity-0",
      )}
    >
      {loading && <Spinner size="lg" tone="overlay" label={label} />}
    </div>
  );
}

function ProjectVideo({ embed, item, loadingLabel }: { embed: VideoEmbed; item: WorkItem; loadingLabel: string }) {
  const [ready, setReady] = React.useState(false);

  if (embed.kind === "file") {
    return (
      <div className="relative">
        <video
          src={embed.src}
          poster={item.image.src || undefined}
          controls
          autoPlay
          playsInline
          onPlaying={() => setReady(true)}
          onCanPlay={() => setReady(true)}
          onError={() => setReady(true)}
          className={cn("mx-auto block w-full bg-black", MEDIA_MAX_H)}
        />
        <MediaLoading loading={!ready} label={loadingLabel} />
      </div>
    );
  }
  // Mounted only while the modal is open, so the player loads on demand and stops when it closes.
  return (
    <div className={cn("relative w-full", embed.vertical ? "aspect-[9/16]" : "aspect-video")}>
      <iframe
        src={embed.src}
        title={item.title}
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; fullscreen; gyroscope; picture-in-picture; web-share"
        referrerPolicy="strict-origin-when-cross-origin"
        allowFullScreen
        onLoad={() => setReady(true)}
        className={cn("absolute inset-0 size-full transition-opacity duration-500", ready ? "opacity-100" : "opacity-0")}
      />
      <MediaLoading loading={!ready} label={loadingLabel} />
    </div>
  );
}

function ProjectImage({ item, loadingLabel }: { item: WorkItem; loadingLabel: string }) {
  const [ready, setReady] = React.useState(false);

  if (!item.image.src) {
    return <div role="img" aria-label={item.image.alt} className={cn("aspect-[4/5] bg-surface bg-stripes", MEDIA_MAX_H)} />;
  }
  // width/height only reserve a 4:5 box until the file loads; then the image keeps its own proportions,
  // capped to the screen, so the frame hugs it instead of showing letterbox bars.
  return (
    // Until the file arrives the image has no size, so the box keeps a portrait-ish height for the spinner.
    <div className={cn("relative grid place-items-center", !ready && "min-h-[min(calc(100dvh-9rem),36rem)]")}>
      <Image
        src={item.image.src}
        alt={item.image.alt}
        width={1600}
        height={2000}
        sizes="(min-width: 768px) 48rem, 100vw"
        quality={90}
        onLoad={() => setReady(true)}
        onError={() => setReady(true)}
        className={cn(
          "mx-auto block h-auto w-auto max-w-full transition-opacity duration-500 motion-reduce:transition-none",
          MEDIA_MAX_H,
          ready ? "opacity-100" : "opacity-0",
        )}
      />
      <MediaLoading loading={!ready} label={loadingLabel} />
    </div>
  );
}
