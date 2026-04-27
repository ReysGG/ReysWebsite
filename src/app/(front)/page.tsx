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
import { SectionDivider } from "@/components/ui/section-divider";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between font-sans bg-white text-neutral-900 selection:bg-neutral-200">
      <div className="w-full bg-neutral-50">
        <HeroSection />
      </div>
      <StatsSection />
      <SectionDivider />
      <ServicesSection />
      <SectionDivider />
      <WorkflowSection />
      <SectionDivider />
      <PortfolioSection />
      <SectionDivider />
      <PricingSection />
      <SectionDivider />
      <TestimonialsSection />
      <SectionDivider />
      <CtaSection />
      <SectionDivider />
      <FaqSection />
      <Footer />
    </main>
  );
}
