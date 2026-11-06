import type { Dictionary } from "@/types/content";
import { siteConfig } from "@/config/site";

/** Structured data for search engines: the person, their business and the FAQ. */
export function JsonLd({ dictionary }: { dictionary: Dictionary }) {
  const { site, faq, pricing } = dictionary;
  const url = siteConfig.url;

  const data = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebSite",
        "@id": `${url}/#website`,
        url,
        name: site.name,
        inLanguage: site.intlLocale,
      },
      {
        "@type": "Person",
        "@id": `${url}/#person`,
        name: site.name,
        jobTitle: site.jobTitle,
        email: `mailto:${site.email}`,
        url,
        address: {
          "@type": "PostalAddress",
          addressLocality: site.location.city,
          addressRegion: site.location.region,
          addressCountry: site.location.countryCode,
        },
        sameAs: site.socials.map((social) => social.href),
      },
      {
        "@type": "ProfessionalService",
        "@id": `${url}/#business`,
        name: `${site.name}, ${site.jobTitle}`,
        description: site.description,
        url,
        email: site.email,
        founder: { "@id": `${url}/#person` },
        areaServed: [site.location.city, site.location.country, "Europe"],
        address: {
          "@type": "PostalAddress",
          addressLocality: site.location.city,
          addressRegion: site.location.region,
          addressCountry: site.location.countryCode,
        },
        makesOffer: pricing.plans.map((plan) => ({
          "@type": "Offer",
          name: plan.name,
          description: plan.description,
          price: plan.price,
          priceCurrency: plan.currency,
        })),
      },
      {
        "@type": "FAQPage",
        "@id": `${url}/#faq`,
        mainEntity: faq.items.map((item) => ({
          "@type": "Question",
          name: item.question,
          acceptedAnswer: { "@type": "Answer", text: item.answer },
        })),
      },
    ],
  };

  return (
    <script
      type="application/ld+json"
      // Escape "<" so the JSON can never close the script tag.
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data).replace(/</g, "\\u003c") }}
    />
  );
}
