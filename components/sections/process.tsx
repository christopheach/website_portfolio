import type { ProcessContent } from "@/types/content";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Card, CardDescription, CardTitle } from "@/components/ui/card";
import { Section, SectionDescription, SectionEyebrow, SectionHeader, SectionTitle } from "@/components/ui/section";
import { Reveal, RevealGroup, RevealItem } from "@/components/motion/reveal";

export function Process({ content }: { content: ProcessContent }) {
  const total = content.steps.length;

  return (
    <Section id={content.id} aria-labelledby={`${content.id}-title`}>
      <Reveal>
        <SectionHeader>
          <SectionEyebrow>{content.eyebrow}</SectionEyebrow>
          <SectionTitle id={`${content.id}-title`}>{content.title}</SectionTitle>
          {content.description && <SectionDescription>{content.description}</SectionDescription>}
        </SectionHeader>
      </Reveal>

      <RevealGroup as="ol" className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        {content.steps.map((step, index) => (
          <RevealItem as="li" key={step.title}>
            <Card size="sm" className="h-full gap-10">
              <div className="flex items-center justify-between">
                <span aria-hidden className="flex gap-1">
                  {Array.from({ length: total }, (_, dot) => (
                    <span key={dot} className={cn("size-1.5 rounded-full", dot <= index ? "bg-primary" : "bg-muted-foreground/30")} />
                  ))}
                </span>
                <span className="text-xs text-muted-foreground tabular-nums">{String(index + 1).padStart(2, "0")}</span>
              </div>
              <div>
                <CardTitle className="text-sm">{step.title}</CardTitle>
                <CardDescription className="mt-1.5 text-xs">{step.description}</CardDescription>
              </div>
            </Card>
          </RevealItem>
        ))}
      </RevealGroup>

      <Reveal className="mt-10 flex justify-center">
        <Button asChild>
          <a href={content.cta.href}>{content.cta.label}</a>
        </Button>
      </Reveal>
    </Section>
  );
}
