import type { ClientsContent } from "@/types/content";
import { Marquee, MarqueeItem } from "@/components/ui/marquee";
import { MediaImage } from "@/components/ui/media-image";

export function Clients({ content }: { content: ClientsContent }) {
  return (
    <section aria-label={content.label} className="py-8">
      <div className="container-page flex flex-col items-center gap-5 sm:flex-row sm:gap-8">
        <p className="max-w-[9rem] shrink-0 text-center text-xs leading-snug text-muted-foreground sm:text-left">{content.label}</p>
        <Marquee duration={36} className="w-full min-w-0 flex-1">
          {content.items.map((client) => (
            <MarqueeItem key={client.name}>
              <MediaImage
                asset={client.logo}
                radius="md"
                className="size-11 border opacity-70 grayscale transition duration-300 hover:opacity-100 hover:grayscale-0"
                sizes="44px"
              />
            </MarqueeItem>
          ))}
        </Marquee>
      </div>
    </section>
  );
}
