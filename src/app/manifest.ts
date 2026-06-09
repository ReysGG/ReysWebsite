import type { MetadataRoute } from "next";
import { getSiteSettings } from "@/lib/site-settings";

export const dynamic = "force-static";

export default async function manifest(): Promise<MetadataRoute.Manifest> {
  const settings = await getSiteSettings();
  const siteName = settings.siteName || "WebServices";

  return {
    name: `${siteName} | ${settings.tagline || "Your Tech Partner"}`,
    short_name: siteName,
    description: settings.description || "Web services profesional untuk bisnis, startup, dan personal brand.",
    start_url: "/",
    display: "standalone",
    background_color: "#ffffff",
    theme_color: "#ff8a00",
    lang: "id-ID",
    icons: [
      { src: "/192.png", sizes: "192x192", type: "image/png", purpose: "any" },
      { src: "/512.png", sizes: "512x512", type: "image/png", purpose: "any" },
    ],
  };
}
