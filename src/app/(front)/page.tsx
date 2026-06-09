import React from "react";
import type { Metadata } from "next";
import { HeroSection } from "@/components/sections/hero";
import { ServicesSection } from "@/components/sections/services";
import { TrustStripSection } from "@/components/sections/trust-strip";
import { ProblemSection } from "@/components/sections/problem-section";
import { WhatYouGetSection } from "@/components/sections/what-you-get";
import { PortfolioSection } from "@/components/sections/portfolio";
import { WorkflowSection } from "@/components/sections/workflow";
import { PricingSection } from "@/components/sections/pricing";
import { TestimonialsSection } from "@/components/sections/testimonials";
import { CtaSection } from "@/components/sections/cta";
import { FaqSection } from "@/components/sections/faq";
import { Footer } from "@/components/ui/footer";

import { PromoBanner } from "@/components/ui/promo-banner";
import { defaultSiteConfig, getSiteConfig } from "@/lib/site-config";
import { getSiteSettings } from "@/lib/site-settings";
import { getPortfolioIntro, getPortfolioProjects } from "@/lib/portfolio-config";
import { getPublicTestimonials } from "@/lib/testimonials";
import { JsonLd } from "@/components/seo/json-ld";
import { buildFaqJsonLd, buildOrganizationJsonLd, buildWebSiteJsonLd } from "@/lib/structured-data";

export async function generateMetadata(): Promise<Metadata> {
  const settings = await getSiteSettings();
  const siteName = settings.siteName || "WebServices";
  const tagline = settings.tagline || "Your Tech Partner";
  const title = `${siteName} | ${tagline}`;
  const description = settings.description || "Dinamis & profesional web services, startups, and personal brands.";

  return {
    title,
    description,
    alternates: { canonical: "/" },
    openGraph: {
      type: "website",
      url: "/",
      siteName,
      title,
      description,
      locale: "id_ID",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
    },
  };
}

export default async function Home() {
  const [config, siteSettings, portfolioIntro, portfolioProjects, testimonials] = await Promise.all([
    getSiteConfig(),
    getSiteSettings(),
    getPortfolioIntro(),
    getPortfolioProjects(),
    getPublicTestimonials(),
  ]);

  const whatsappUrl = siteSettings.whatsapp || config.cta.whatsappUrl;
  const ctaContent = {
    ...config.cta,
    whatsappUrl,
  };
  const hasPublishedPortfolio = portfolioProjects.length > 0;
  const usesDefaultHeroSecondaryCta = config.hero.secondaryCta === defaultSiteConfig.hero.secondaryCta;
  const heroContent = usesDefaultHeroSecondaryCta
    ? {
        ...config.hero,
        secondaryCta: hasPublishedPortfolio ? "Lihat Portfolio" : "Lihat Contoh Solusi",
      }
    : config.hero;

  const organizationJsonLd = buildOrganizationJsonLd(siteSettings);
  const webSiteJsonLd = buildWebSiteJsonLd(siteSettings);
  const faqJsonLd = buildFaqJsonLd(config.faq.items);

  return (
    <main className="flex min-h-screen flex-col items-center justify-between font-sans bg-white text-neutral-900 selection:bg-neutral-200">
      <JsonLd data={[organizationJsonLd, webSiteJsonLd, faqJsonLd]} />
      <PromoBanner />
      <HeroSection content={heroContent} secondaryHref="#portfolio" />
      <TrustStripSection content={config.trustStrip} />
      <ProblemSection content={config.problems} />
      <ServicesSection content={config.services} whatsappUrl={whatsappUrl} />
      <WorkflowSection content={config.workflow} />
      <PortfolioSection intro={portfolioIntro} projects={portfolioProjects} solutions={config.solutions} />
      <PricingSection content={config.pricing} />
      <WhatYouGetSection content={config.whatYouGet} />
      {testimonials.length > 0 && <TestimonialsSection testimonials={testimonials} />}
      <CtaSection content={ctaContent} />
      <FaqSection content={config.faq} />
      <Footer settings={siteSettings} />
    </main>
  );
}
