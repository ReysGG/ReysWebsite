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

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between font-sans bg-white text-neutral-900 selection:bg-neutral-200">
      <HeroSection />
      {/* cream → indigo-50 */}
      <WaveDivider fromColor="#EFECE6" toColor="rgba(238,242,255,0.4)" />
      <StatsSection />
      {/* indigo-50 → white */}
      <WaveDivider fromColor="rgba(238,242,255,0.4)" toColor="#ffffff" />
      <ServicesSection />
      {/* white → neutral-50 */}
      <WaveDivider fromColor="#ffffff" toColor="#fafafa" />
      <WorkflowSection />
      {/* neutral-50 → white */}
      <WaveDivider fromColor="#fafafa" toColor="#ffffff" />
      <PortfolioSection />
      {/* white → neutral-50 */}
      <WaveDivider fromColor="#ffffff" toColor="#fafafa" />
      <PricingSection />
      {/* neutral-50 → neutral-50 (same, no wave needed) */}
      <TestimonialsSection />
      {/* neutral-50 → white */}
      <WaveDivider fromColor="#fafafa" toColor="#ffffff" />
      <CtaSection />
      <FaqSection />
      {/* white → black footer */}
      <WaveDivider fromColor="#ffffff" toColor="#000000" />
      <Footer />
    </main>
  );
}
