import type { StatsContent } from "@/types/content";
import { NumberTicker } from "@/components/ui/number-ticker";
import { Section, SectionTitle } from "@/components/ui/section";
import { Reveal } from "@/components/motion/reveal";

export function Stats({ content, locale }: { content: StatsContent; locale: string }) {
  return (
    <Section spacing="sm" aria-labelledby="stats-title">
      <Reveal>
        <SectionTitle id="stats-title" size="sm" className="mb-12 text-center">
          {content.title}
        </SectionTitle>
      </Reveal>
      <dl className="grid grid-cols-2 gap-x-6 gap-y-10 lg:grid-cols-4">
        {content.items.map((stat) => (
          <div key={stat.label} className="flex flex-col-reverse items-center gap-2 text-center">
            <dt className="text-xs text-muted-foreground md:text-sm">{stat.label}</dt>
            <dd className="text-5xl font-medium tracking-[-0.05em] md:text-6xl">
              <NumberTicker value={stat.value} prefix={stat.prefix} suffix={stat.suffix} locale={locale} />
            </dd>
          </div>
        ))}
      </dl>
    </Section>
  );
}
