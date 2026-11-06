import type { AboutContent, SocialLink } from "@/types/content";
import { Button } from "@/components/ui/button";
import { MediaImage } from "@/components/ui/media-image";
import { Section, SectionHeader, SectionTitle } from "@/components/ui/section";
import { SocialIcon } from "@/components/icons/social-icons";
import { Reveal } from "@/components/motion/reveal";

export function About({ content, socials }: { content: AboutContent; socials: SocialLink[] }) {
  return (
    <Section id={content.id} aria-labelledby={`${content.id}-title`}>
      <div className="grid items-center gap-10 md:grid-cols-[minmax(0,0.9fr)_1fr] md:gap-14">
        <Reveal>
          <MediaImage asset={content.image} aspect="square" radius="2xl" className="border" sizes="(min-width: 768px) 420px, 92vw" />
        </Reveal>

        <Reveal delay={0.1} className="flex flex-col items-start">
          <SectionHeader align="start" spacing="none">
            <SectionTitle id={`${content.id}-title`} size="sm">
              {content.title}
            </SectionTitle>
            <p className="text-sm font-medium text-primary">
              {content.name}
              <span className="text-muted-foreground">, {content.role}</span>
            </p>
          </SectionHeader>

          <div className="mt-5 flex max-w-md flex-col gap-4 text-sm leading-relaxed text-pretty text-muted-foreground">
            {content.paragraphs.map((paragraph) => (
              <p key={paragraph.slice(0, 24)}>{paragraph}</p>
            ))}
          </div>

          <ul className="mt-6 flex items-center gap-1">
            {socials.map((social) => (
              <li key={social.platform}>
                <Button variant="ghost" size="icon-sm" asChild>
                  <a href={social.href} target="_blank" rel="noopener noreferrer" aria-label={social.label}>
                    <SocialIcon platform={social.platform} />
                  </a>
                </Button>
              </li>
            ))}
          </ul>

          <Button size="sm" className="mt-6" asChild>
            <a href={content.cta.href}>{content.cta.label}</a>
          </Button>
        </Reveal>
      </div>
    </Section>
  );
}
