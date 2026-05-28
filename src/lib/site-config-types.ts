import type { SolutionExampleConfig } from "@/lib/solutions-config";

export type StatItemConfig = {
  value: number;
  suffix: string;
  label: string;
  description: string;
};

export type ServiceItemConfig = {
  number: string;
  title: string;
  description: string;
};

export type WorkflowStepConfig = {
  step: string;
  title: string;
  description: string;
};


export type PricingTierConfig = {
  title: string;
  price: string;
  timeline: string;
  description: string;
  features: string[];
  buttonText: string;
  popular: boolean;
};

export type FaqItemConfig = {
  question: string;
  answer: string;
};

export type TrustStripConfig = {
  eyebrow: string;
  heading: string;
  description: string;
  items: SimpleTextItemConfig[];
  footerText: string;
  buttonText: string;
};

export type SimpleTextItemConfig = {
  title: string;
  description: string;
};

export type SiteConfig = {
  hero: {
    trustText: string;
    headlinePrefix: string;
    rotatingWords: string[];
    description: string;
    primaryCta: string;
    secondaryCta: string;
    visualImage: string;
    scopePreview: {
      eyebrow: string;
      title: string;
      projectLabel: string;
      pages: string;
      features: string;
      timeline: string;
      revisions: string;
      deliverable: string;
      status: string;
    };
  };
  stats: StatItemConfig[];
  trustStrip: TrustStripConfig;
  problems: {
    eyebrow: string;
    heading: string;
    description: string;
    items: SimpleTextItemConfig[];
  };
  services: {
    eyebrow: string;
    heading: string;
    items: ServiceItemConfig[];
  };
  workflow: {
    eyebrow: string;
    headingPrefix: string;
    rotatingWords: string[];
    description: string;
    steps: WorkflowStepConfig[];
  };
  solutions: {
    eyebrow: string;
    heading: string;
    description: string;
    items: SolutionExampleConfig[];
  };
  pricing: {
    eyebrow: string;
    heading: string;
    description: string;
    tiers: PricingTierConfig[];
  };
  whatYouGet: {
    eyebrow: string;
    heading: string;
    description: string;
    items: string[];
  };
  cta: {
    badge: string;
    headingTop: string;
    headingAccent: string;
    description: string;
    whatsappUrl: string;
    primaryCta: string;
    secondaryCta: string;
    socialProof: string;
    ratingText: string;
  };
  faq: {
    eyebrow: string;
    heading: string;
    items: FaqItemConfig[];
  };
};
