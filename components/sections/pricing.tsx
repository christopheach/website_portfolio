import { CheckIcon } from "lucide-react";

import type { PricingContent } from "@/types/content";
import { Badge, BadgeDot } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Glow } from "@/components/ui/glow";
import { Section, SectionDescription, SectionEyebrow, SectionHeader, SectionTitle } from "@/components/ui/section";
import { Reveal } from "@/components/motion/reveal";

export function Pricing({ content, locale }: { content: PricingContent; locale: string }) {
  return (
    <Section id={content.id} aria-labelledby={`${content.id}-title`}>
      <Reveal>
        <SectionHeader>
          <SectionEyebrow>{content.eyebrow}</SectionEyebrow>
          <SectionTitle id={`${content.id}-title`}>{content.title}</SectionTitle>
          {content.description && <SectionDescription>{content.description}</SectionDescription>}
        </SectionHeader>
      </Reveal>

      <div className="mx-auto flex max-w-md flex-col gap-4">
        {content.plans.map((plan) => {
          const price = new Intl.NumberFormat(locale, {
            style: "currency",
            currency: plan.currency,
            maximumFractionDigits: 0,
          }).format(plan.price);

          return (
            <Reveal key={plan.name}>
              <Card size="lg" className="relative isolate overflow-hidden">
                <Glow variant="soft" blur="lg" className="-top-32 left-1/2 size-80 -translate-x-1/2" />
                <CardHeader className="gap-3">
                  <div className="flex items-center justify-between gap-3">
                    <CardTitle className="text-sm text-muted-foreground">{plan.name}</CardTitle>
                    {plan.badge && (
                      <Badge variant="secondary" size="lg">
                        <BadgeDot tone="success" pulse />
                        {plan.badge}
                      </Badge>
                    )}
                  </div>
                  <p className="flex items-baseline gap-1">
                    <span className="text-5xl font-medium tracking-[-0.05em]">{price}</span>
                    <span className="text-sm text-muted-foreground">{plan.period}</span>
                  </p>
                  <CardDescription>{plan.description}</CardDescription>
                </CardHeader>

                <Button size="lg" className="w-full" asChild>
                  <a href={plan.cta.href}>{plan.cta.label}</a>
                </Button>

                <ul className="flex flex-col gap-3 border-t pt-6">
                  {plan.features.map((feature) => (
                    <li key={feature} className="flex items-start gap-3 text-sm text-foreground/85">
                      <span aria-hidden className="mt-0.5 grid size-4 shrink-0 place-items-center rounded-full bg-primary/15 text-primary">
                        <CheckIcon className="size-3" strokeWidth={3} />
                      </span>
                      {feature}
                    </li>
                  ))}
                </ul>
              </Card>
            </Reveal>
          );
        })}

        {content.footnote && (
          <p className="text-center text-sm text-muted-foreground">
            {content.footnote.text}{" "}
            <a href={content.footnote.link.href} className="rounded-sm text-foreground underline-offset-4 outline-none hover:underline focus-visible:ring-[3px] focus-visible:ring-ring">
              {content.footnote.link.label}
            </a>
          </p>
        )}
      </div>
    </Section>
  );
}
