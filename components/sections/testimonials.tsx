import type { TestimonialsContent } from "@/types/content";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { Card } from "@/components/ui/card";
import { Section, SectionDescription, SectionEyebrow, SectionHeader, SectionTitle } from "@/components/ui/section";
import { Reveal, RevealGroup, RevealItem } from "@/components/motion/reveal";

export function Testimonials({ content }: { content: TestimonialsContent }) {
  return (
    <Section id={content.id} aria-labelledby={`${content.id}-title`}>
      <Reveal>
        <SectionHeader>
          <SectionEyebrow>{content.eyebrow}</SectionEyebrow>
          <SectionTitle id={`${content.id}-title`}>{content.title}</SectionTitle>
          {content.description && <SectionDescription>{content.description}</SectionDescription>}
        </SectionHeader>
      </Reveal>

      <RevealGroup as="ul" className="grid gap-4 md:grid-cols-2">
        {content.items.map((testimonial) => (
          <RevealItem as="li" key={testimonial.name}>
            <Card size="default" className="h-full gap-5">
              <figure className="flex h-full flex-col gap-5">
                <figcaption className="flex items-center gap-3">
                  <Avatar>
                    <AvatarImage asset={testimonial.avatar} />
                  </Avatar>
                  <span className="flex flex-col">
                    <span className="text-sm font-medium">{testimonial.name}</span>
                    <span className="text-xs text-muted-foreground">{testimonial.role}</span>
                  </span>
                </figcaption>
                <blockquote className="text-sm leading-relaxed text-pretty text-muted-foreground">
                  <p>{testimonial.quote}</p>
                </blockquote>
              </figure>
            </Card>
          </RevealItem>
        ))}
      </RevealGroup>
    </Section>
  );
}
