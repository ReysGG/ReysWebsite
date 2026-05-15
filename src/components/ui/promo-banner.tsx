import { getPromoBanner, isBannerInSchedule } from "@/lib/promo-banner";
import { PromoBannerClient } from "./promo-banner-client";

export async function PromoBanner() {
  const banner = await getPromoBanner();
  if (!isBannerInSchedule(banner)) return null;
  return <PromoBannerClient banner={banner} />;
}
