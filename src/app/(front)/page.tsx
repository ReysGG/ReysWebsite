import React from "react";
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

  return (
    <main className="flex min-h-screen flex-col items-center justify-between font-sans bg-white text-neutral-900 selection:bg-neutral-200">
      <PromoBanner />
      <HeroSection content={heroContent} secondaryHref="#portfolio" />
      <TrustStripSection content={config.trustStrip} />
      <ProblemSection content={config.problems} />
      <ServicesSection content={config.services} whatsappUrl={whatsappUrl} />
      <WorkflowSection content={config.workflow} />
      <PortfolioSection intro={portfolioIntro} projects={portfolioProjects} />
      <PricingSection content={config.pricing} />
      <WhatYouGetSection content={config.whatYouGet} />
      {testimonials.length > 0 && <TestimonialsSection testimonials={testimonials} />}
      <CtaSection content={ctaContent} />
      <FaqSection content={config.faq} />
      <Footer settings={siteSettings} />
    </main>
  );
}
