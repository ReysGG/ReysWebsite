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
import { getSiteConfig } from "@/lib/site-config";

export default async function Home() {
  const config = await getSiteConfig();

  return (
    <main className="flex min-h-screen flex-col items-center justify-between font-sans bg-white text-neutral-900 selection:bg-neutral-200">
      <HeroSection content={config.hero} />
      <WaveDivider fromColor="#EFECE6" toColor="rgba(238,242,255,0.4)" />
      <StatsSection stats={config.stats} />
      <WaveDivider fromColor="rgba(238,242,255,0.4)" toColor="#ffffff" />
      <ServicesSection content={config.services} />
      <WaveDivider fromColor="#ffffff" toColor="#fafafa" />
      <WorkflowSection content={config.workflow} />
      <WaveDivider fromColor="#fafafa" toColor="#ffffff" />
      <PortfolioSection />
      <WaveDivider fromColor="#ffffff" toColor="#fafafa" />
      <PricingSection content={config.pricing} />
      <TestimonialsSection />
      <WaveDivider fromColor="#fafafa" toColor="#ffffff" />
      <CtaSection content={config.cta} />
      <FaqSection content={config.faq} />
      <WaveDivider fromColor="#ffffff" toColor="#000000" />
      <Footer />
    </main>
  );
}
