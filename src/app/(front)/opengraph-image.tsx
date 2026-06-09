import { ImageResponse } from "next/og";
import { getSiteSettings } from "@/lib/site-settings";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const alt = "buildwithreys.tech";

// Brand OG image — warm cream/orange palette, no blue/indigo per brand rules.
export default async function OpengraphImage() {
  const settings = await getSiteSettings();
  const siteName = settings.siteName || "WebServices";
  const tagline = settings.tagline || "Your Tech Partner";

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "linear-gradient(135deg, #ffffff 0%, #fffcc9 45%, #ffcd80 100%)",
          padding: "80px",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "20px" }}>
          <div
            style={{
              width: "64px",
              height: "64px",
              borderRadius: "16px",
              background: "#ff8a00",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "#ffffff",
              fontSize: "36px",
              fontWeight: 800,
            }}
          >
            {siteName.charAt(0).toUpperCase()}
          </div>
          <div style={{ fontSize: "32px", fontWeight: 700, color: "#1a1a1a" }}>{siteName}</div>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
          <div
            style={{
              fontSize: "84px",
              fontWeight: 800,
              color: "#1a1a1a",
              lineHeight: 1.05,
              letterSpacing: "-2px",
              maxWidth: "1000px",
            }}
          >
            {tagline}
          </div>
          <div style={{ fontSize: "30px", color: "#7a5200", maxWidth: "900px", lineHeight: 1.3 }}>
            {settings.description || "Web services profesional untuk bisnis, startup, dan personal brand."}
          </div>
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
          <div style={{ height: "8px", width: "64px", borderRadius: "999px", background: "#ff8a00" }} />
          <div style={{ fontSize: "26px", fontWeight: 600, color: "#ff8a00" }}>buildwithreys.tech</div>
        </div>
      </div>
    ),
    { ...size },
  );
}
