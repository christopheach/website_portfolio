import { getDictionary } from "@/content";
import { mediaUrl } from "@/config/media";
import { SiteFooter } from "@/components/layout/site-footer";
import { SiteHeader } from "@/components/layout/site-header";
import { About } from "@/components/sections/about";
import { Booking } from "@/components/sections/booking";
import { Clients } from "@/components/sections/clients";
import { Faq } from "@/components/sections/faq";
import { Hero } from "@/components/sections/hero";
import { Pricing } from "@/components/sections/pricing";
import { Process } from "@/components/sections/process";
import { Services } from "@/components/sections/services";
import { GlassFrame } from "@/components/sections/glass-frame";
import { Stats } from "@/components/sections/stats";
import { Testimonials } from "@/components/sections/testimonials";
import { WhyMe } from "@/components/sections/why-me";
import { Work } from "@/components/sections/work";
import { JsonLd } from "@/components/seo/json-ld";
import { getPublishedWorkItems } from "@/lib/projects";

// Saving in the backoffice refreshes this page immediately; this is a safety net (e.g. if the build ran without the database).
export const revalidate = 300;

export default async function HomePage() {
  const t = getDictionary();
  // Projects added from the backoffice (/admin) replace the sample projects once at least one is published.
  const workItems = await getPublishedWorkItems();

  return (
    <>
      <SiteHeader navigation={t.navigation} site={t.site} ui={t.ui} />
      <main id="main" tabIndex={-1} className="outline-none">
        <Hero content={t.hero} ui={t.ui} />
        {/* Placeholder text: change eyebrow, title, description and the button here. */}
        <GlassFrame
          videoSrc={mediaUrl("/videos/LSL_NOEL_2026_VDEF_169_SANS_ST.mp4")}
          eyebrow="Photographie & vidéographie"
          title="Les secrets de Loly"
          cta={{ label: "VOIR +", href: "#work" }}
        />
        <GlassFrame
          videoSrc={mediaUrl("/videos/iceman.mp4")}
          eyebrow="Photographie & vidéographie"
          title="Ice Man"
          cta={{ label: "VOIR +", href: "#work" }}
        />
        <GlassFrame
          videoSrc={mediaUrl("/videos/nyx.mp4")}
          eyebrow="Photographie & vidéographie"
          title="NYX"
          cta={{ label: "VOIR +", href: "#work" }}
        />
        <Services content={t.services} ui={t.ui} />
        <Work content={workItems ? { ...t.work, items: workItems } : t.work} />
        <WhyMe content={t.why} />
        <Process content={t.process} />
        <About content={t.about} socials={t.site.socials} />
        <Clients content={t.clients} />
        <Stats content={t.stats} locale={t.site.intlLocale} />
        <Testimonials content={t.testimonials} />
        <Pricing content={t.pricing} locale={t.site.intlLocale} />
        <Booking content={t.booking} site={t.site} ui={t.ui} />
        <Faq content={t.faq} />
      </main>
      <SiteFooter footer={t.footer} site={t.site} ui={t.ui} />
      <JsonLd dictionary={t} />
    </>
  );
}
