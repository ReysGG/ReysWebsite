import React from "react";
import { HeroSection } from "@/components/sections/hero";
import { StatsSection } from "@/components/sections/stats";
import { ServicesSection } from "@/components/sections/services";
import { PortfolioSection } from "@/components/sections/portfolio";
import { WorkflowSection } from "@/components/sections/workflow";
import { PricingSection } from "@/components/sections/pricing";
import { TestimonialsSection } from "@/components/sections/testimonials";
import { CtaSection } from "@/components/sections/cta";
import { FaqSection } from "@/components/sections/faq";
import { Footer } from "@/components/ui/footer";
import { WaveDivider } from "@/components/ui/wave-divider";
import { SiteNavbar } from "@/components/ui/site-navbar";
import { getSiteConfig } from "@/lib/site-config";

export default async function Home() {
  const config = await getSiteConfig();

  return (
    <main className="flex min-h-screen flex-col items-center justify-between font-sans bg-white text-neutral-900 selection:bg-neutral-200">
      <SiteNavbar />
      <HeroSection content={config.hero} />
      <StatsSection stats={config.stats} />
      <ServicesSection content={config.services} />
      <WorkflowSection content={config.workflow} />
      <PortfolioSection />
      <PricingSection content={config.pricing} />
      <TestimonialsSection />
      <CtaSection content={config.cta} />
      <FaqSection content={config.faq} />
      <Footer />
    </main>
  );
}
