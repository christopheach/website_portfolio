import { getDictionary } from "@/content";
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
import { Showreel } from "@/components/sections/showreel";
import { Stats } from "@/components/sections/stats";
import { Testimonials } from "@/components/sections/testimonials";
import { WhyMe } from "@/components/sections/why-me";
import { Work } from "@/components/sections/work";
import { JsonLd } from "@/components/seo/json-ld";

export default function HomePage() {
  const t = getDictionary(); 

  return (
    <>
      <SiteHeader navigation={t.navigation} site={t.site} ui={t.ui} />
      <main id="main" tabIndex={-1} className="outline-none">
        <Hero content={t.hero} ui={t.ui} />
        <Showreel content={t.showreel} />
        <Services content={t.services} ui={t.ui} />
        <Work content={t.work} />
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
