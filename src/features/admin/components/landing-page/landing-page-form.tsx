import React from "react";
import type { SiteConfig } from "@/lib/site-config";
import { saveLandingPage } from "@/features/admin/actions/landing-page-actions";
import { AdminFormSection, Field, NestedCard } from "./form-fields";

export function LandingPageForm({ config }: { config: SiteConfig }) {
  return (
    <form action={saveLandingPage} className="space-y-6">
      <AdminFormSection title="Hero">
        <Field label="Trust badge" name="hero.trustText" defaultValue={config.hero.trustText} />
        <Field label="Headline awal" name="hero.headlinePrefix" defaultValue={config.hero.headlinePrefix} />
        <Field label="Kata rotasi (1 baris per kata)" name="hero.rotatingWords" defaultValue={config.hero.rotatingWords.join("\n")} textarea />
        <Field label="Deskripsi" name="hero.description" defaultValue={config.hero.description} textarea />
        <Field label="CTA utama" name="hero.primaryCta" defaultValue={config.hero.primaryCta} />
        <Field label="CTA kedua" name="hero.secondaryCta" defaultValue={config.hero.secondaryCta} />
      </AdminFormSection>

      <AdminFormSection title="Statistik">
        {config.stats.map((stat, index) => (
          <NestedCard key={index}>
            <div className="grid gap-3 md:grid-cols-2">
              <Field label="Angka" name={`stats.${index}.value`} defaultValue={stat.value} />
              <Field label="Suffix" name={`stats.${index}.suffix`} defaultValue={stat.suffix} />
              <Field label="Label" name={`stats.${index}.label`} defaultValue={stat.label} />
              <Field label="Deskripsi" name={`stats.${index}.description`} defaultValue={stat.description} />
            </div>
          </NestedCard>
        ))}
      </AdminFormSection>

      <AdminFormSection title="Layanan">
        <Field label="Eyebrow" name="services.eyebrow" defaultValue={config.services.eyebrow} />
        <Field label="Heading" name="services.heading" defaultValue={config.services.heading} textarea />
        {config.services.items.map((item, index) => (
          <NestedCard key={index}>
            <div className="grid gap-3">
              <Field label="Nomor" name={`services.${index}.number`} defaultValue={item.number} />
              <Field label="Judul" name={`services.${index}.title`} defaultValue={item.title} />
              <Field label="Deskripsi" name={`services.${index}.description`} defaultValue={item.description} textarea />
            </div>
          </NestedCard>
        ))}
      </AdminFormSection>

      <AdminFormSection title="Proses Kerja">
        <Field label="Eyebrow" name="workflow.eyebrow" defaultValue={config.workflow.eyebrow} />
        <Field label="Heading awal" name="workflow.headingPrefix" defaultValue={config.workflow.headingPrefix} />
        <Field label="Kata rotasi" name="workflow.rotatingWords" defaultValue={config.workflow.rotatingWords.join("\n")} textarea />
        <Field label="Deskripsi" name="workflow.description" defaultValue={config.workflow.description} textarea />
        {config.workflow.steps.map((step, index) => (
          <NestedCard key={index}>
            <div className="grid gap-3">
              <Field label="Nomor" name={`workflow.${index}.step`} defaultValue={step.step} />
              <Field label="Judul" name={`workflow.${index}.title`} defaultValue={step.title} />
              <Field label="Deskripsi" name={`workflow.${index}.description`} defaultValue={step.description} textarea />
            </div>
          </NestedCard>
        ))}
      </AdminFormSection>

      <AdminFormSection title="Harga / Paket">
        <Field label="Eyebrow" name="pricing.eyebrow" defaultValue={config.pricing.eyebrow} />
        <Field label="Heading" name="pricing.heading" defaultValue={config.pricing.heading} />
        <Field label="Deskripsi" name="pricing.description" defaultValue={config.pricing.description} textarea />
        {config.pricing.tiers.map((tier, index) => (
          <NestedCard key={index}>
            <div className="grid gap-3">
              <Field label="Nama paket" name={`pricing.${index}.title`} defaultValue={tier.title} />
              <Field label="Harga" name={`pricing.${index}.price`} defaultValue={tier.price} />
              <Field label="Timeline" name={`pricing.${index}.timeline`} defaultValue={tier.timeline} />
              <Field label="Deskripsi" name={`pricing.${index}.description`} defaultValue={tier.description} textarea />
              <Field label="Fitur (1 baris per fitur)" name={`pricing.${index}.features`} defaultValue={tier.features.join("\n")} textarea />
              <Field label="Tombol" name={`pricing.${index}.buttonText`} defaultValue={tier.buttonText} />
              <label className="flex items-center gap-2 text-sm font-semibold">
                <input type="checkbox" name={`pricing.${index}.popular`} defaultChecked={tier.popular} /> Paket paling populer
              </label>
            </div>
          </NestedCard>
        ))}
      </AdminFormSection>

      <AdminFormSection title="CTA Akhir">
        <Field label="Badge" name="cta.badge" defaultValue={config.cta.badge} />
        <Field label="Heading atas" name="cta.headingTop" defaultValue={config.cta.headingTop} />
        <Field label="Heading aksen" name="cta.headingAccent" defaultValue={config.cta.headingAccent} />
        <Field label="WhatsApp URL" name="cta.whatsappUrl" defaultValue={config.cta.whatsappUrl} />
        <Field label="Deskripsi" name="cta.description" defaultValue={config.cta.description} textarea />
        <Field label="CTA utama" name="cta.primaryCta" defaultValue={config.cta.primaryCta} />
        <Field label="CTA kedua" name="cta.secondaryCta" defaultValue={config.cta.secondaryCta} />
        <Field label="Social proof" name="cta.socialProof" defaultValue={config.cta.socialProof} />
        <Field label="Rating text" name="cta.ratingText" defaultValue={config.cta.ratingText} />
      </AdminFormSection>

      <AdminFormSection title="FAQ">
        <Field label="Eyebrow" name="faq.eyebrow" defaultValue={config.faq.eyebrow} />
        <Field label="Heading" name="faq.heading" defaultValue={config.faq.heading} />
        {config.faq.items.map((item, index) => (
          <NestedCard key={index}>
            <div className="grid gap-3">
              <Field label="Pertanyaan" name={`faq.${index}.question`} defaultValue={item.question} />
              <Field label="Jawaban" name={`faq.${index}.answer`} defaultValue={item.answer} textarea />
            </div>
          </NestedCard>
        ))}
      </AdminFormSection>

      <div className="sticky bottom-4 z-10 flex justify-end">
        <button className="rounded-xl bg-indigo-600 px-6 py-3 text-sm font-bold text-white shadow-lg shadow-indigo-500/20 hover:bg-indigo-700">Simpan perubahan</button>
      </div>
    </form>
  );
}
