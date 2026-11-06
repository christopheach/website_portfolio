import { ApertureIcon, CameraIcon, FilmIcon, MapPinIcon, SparklesIcon, TimerIcon, type LucideIcon } from "lucide-react";

import type { WhyContent, WhyIcon } from "@/types/content";
import { Card, CardDescription, CardTitle } from "@/components/ui/card";
import { IconTile } from "@/components/ui/icon-tile";
import { MediaImage } from "@/components/ui/media-image";
import { Section, SectionDescription, SectionEyebrow, SectionHeader, SectionTitle } from "@/components/ui/section";
import { Reveal, RevealGroup, RevealItem } from "@/components/motion/reveal";

const ICONS: Record<WhyIcon, LucideIcon> = {
  aperture: ApertureIcon,
  "map-pin": MapPinIcon,
  timer: TimerIcon,
  sparkles: SparklesIcon,
  camera: CameraIcon,
  film: FilmIcon,
};

export function WhyMe({ content }: { content: WhyContent }) {
  return (
    <Section id={content.id} aria-labelledby={`${content.id}-title`}>
      <Reveal>
        <SectionHeader>
          <SectionEyebrow>{content.eyebrow}</SectionEyebrow>
          <SectionTitle id={`${content.id}-title`}>{content.title}</SectionTitle>
          {content.description && <SectionDescription>{content.description}</SectionDescription>}
        </SectionHeader>
      </Reveal>

      <RevealGroup className="grid gap-4 lg:grid-cols-[1.15fr_1fr]">
        <RevealItem className="h-full">
          <Card size="none" className="group relative isolate h-full min-h-[26rem] overflow-hidden">
            <MediaImage
              asset={content.feature.image}
              radius="none"
              className="absolute inset-0 -z-10"
              sizes="(min-width: 1024px) 55vw, 92vw"
              imageClassName="transition-transform duration-1000 ease-out group-hover:scale-105 motion-reduce:transition-none"
            />
            <div aria-hidden className="absolute inset-0 -z-10 bg-gradient-to-t from-black/90 via-black/35 to-black/0" />
            <div className="mt-auto p-6 md:p-8">
              <CardTitle className="text-2xl text-white md:text-[1.75rem]">{content.feature.title}</CardTitle>
              <CardDescription className="mt-2 max-w-xs text-white/75">{content.feature.description}</CardDescription>
            </div>
          </Card>
        </RevealItem>

        <div className="grid gap-4">
          {content.points.map((point) => {
            const Icon = ICONS[point.icon];
            return (
              <RevealItem key={point.title}>
                <Card size="lg" className="h-full justify-between gap-12">
                  <IconTile>
                    <Icon />
                  </IconTile>
                  <div>
                    <CardTitle className="text-xl">{point.title}</CardTitle>
                    <CardDescription className="mt-2 max-w-xs">{point.description}</CardDescription>
                  </div>
                </Card>
              </RevealItem>
            );
          })}
        </div>
      </RevealGroup>
    </Section>
  );
}
