"use client";

import React from "react";
import type { SiteConfig } from "@/lib/site-config";
import { CtaSection } from "@/components/sections/cta";
import { FaqSection } from "@/components/sections/faq";
import { HeroSection } from "@/components/sections/hero";
import { PricingSection } from "@/components/sections/pricing";
import { ServicesSection } from "@/components/sections/services";
import { StatsSection } from "@/components/sections/stats";
import { WorkflowSection } from "@/components/sections/workflow";
import { TrustStripSection } from "@/components/sections/trust-strip";
import { ProblemSection } from "@/components/sections/problem-section";
import { WhatYouGetSection } from "@/components/sections/what-you-get";
import { PortfolioSection } from "@/components/sections/portfolio";
import type { InlineEditField, SectionKey } from "@/features/admin/lib/landing-page-edit";

export function SectionRenderer({
  section,
  config,
}: {
  section: SectionKey;
  config: SiteConfig;
  editMode: boolean;
  onQuickEdit: (field: InlineEditField) => void;
}) {
  switch (section) {
    case "hero":
      return <HeroSection content={config.hero} />;
    case "trustStrip":
      return <TrustStripSection content={config.trustStrip} />;
    case "problems":
      return <ProblemSection content={config.problems} />;
    case "stats":
      return <StatsSection stats={config.stats} />;
    case "services":
      return <ServicesSection content={config.services} whatsappUrl={config.cta.whatsappUrl} />;
    case "workflow":
      return <WorkflowSection content={config.workflow} />;
    case "solutions":
      return (
        <PortfolioSection
          intro={{
            eyebrow: "Portfolio",
            heading: "Portfolio",
            description: "Preview",
            featuredLabel: "Preview",
          }}
          projects={[]}
          solutions={config.solutions}
        />
      );
    case "pricing":
      return <PricingSection content={config.pricing} />;
    case "whatYouGet":
      return <WhatYouGetSection content={config.whatYouGet} />;
    case "cta":
      return <CtaSection content={config.cta} />;
    case "faq":
      return <FaqSection content={config.faq} />;
  }
}
