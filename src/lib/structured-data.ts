import { absoluteUrl, getSiteUrl } from "@/lib/site-url";
import type { SiteSettings } from "@/lib/site-settings";

/**
 * Brand/entity structured data used on the homepage so Google can associate
 * the domain with an Organization entity (knowledge panel, sitelinks, sameAs
 * social profiles) and enable the sitelinks search box via WebSite + SearchAction.
 *
 * Keep this server-only safe: it only reads plain settings + the site URL.
 */

const ORGANIZATION_ID = `${getSiteUrl()}/#organization`;
const WEBSITE_ID = `${getSiteUrl()}/#website`;

export function buildOrganizationJsonLd(settings: SiteSettings) {
  const sameAs = [settings.instagram, settings.twitter, settings.linkedin, settings.github].filter(
    (url): url is string => Boolean(url),
  );

  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": ORGANIZATION_ID,
    name: settings.siteName || "WebServices",
    url: getSiteUrl(),
    logo: {
      "@type": "ImageObject",
      url: absoluteUrl("/512.png"),
      width: 512,
      height: 512,
    },
    description: settings.description || undefined,
    ...(sameAs.length ? { sameAs } : {}),
    ...(settings.contactEmail || settings.whatsapp
      ? {
          contactPoint: {
            "@type": "ContactPoint",
            contactType: "customer support",
            ...(settings.contactEmail ? { email: settings.contactEmail } : {}),
            ...(settings.whatsapp ? { url: settings.whatsapp } : {}),
            areaServed: "ID",
            availableLanguage: ["Indonesian", "English"],
          },
        }
      : {}),
  };
}

export function buildWebSiteJsonLd(settings: SiteSettings) {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": WEBSITE_ID,
    name: settings.siteName || "WebServices",
    url: getSiteUrl(),
    inLanguage: "id-ID",
    publisher: { "@id": ORGANIZATION_ID },
    potentialAction: {
      "@type": "SearchAction",
      target: {
        "@type": "EntryPoint",
        urlTemplate: `${getSiteUrl()}/blog?q={search_term_string}`,
      },
      "query-input": "required name=search_term_string",
    },
  };
}

type FaqItem = { question: string; answer: string };

export function buildFaqJsonLd(items: FaqItem[]) {
  const valid = items
    .map((item) => ({
      question: (item.question || "").trim(),
      answer: (item.answer || "").trim(),
    }))
    .filter((item) => item.question && item.answer);

  if (valid.length === 0) return null;

  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: valid.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer,
      },
    })),
  };
}
