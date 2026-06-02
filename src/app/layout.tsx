import type { Metadata } from "next";
import "./globals.css";
import { FloatingConsult } from "@/components/ui/floating-consult";
import { getSiteSettings } from "@/lib/site-settings";
import { getSiteUrl } from "@/lib/site-url";
import { ClerkProvider } from "@clerk/nextjs";

export async function generateMetadata(): Promise<Metadata> {
  const settings = await getSiteSettings();
  const siteName = settings.siteName || "WebServices";
  const tagline = settings.tagline || "Your Tech Partner";
  return {
    metadataBase: new URL(getSiteUrl()),
    title: `${siteName} | ${tagline}`,
    description: settings.description || "Dinamis & profesional web services, startups, and personal brands.",
    alternates: { canonical: "/" },
    icons: {
      icon: [
        { url: "/32.png", sizes: "32x32", type: "image/png" },
        { url: "/192.png", sizes: "192x192", type: "image/png" },
        { url: "/512.png", sizes: "512x512", type: "image/png" },
      ],
      apple: [{ url: "/190.png", sizes: "180x180", type: "image/png" }],
    },
    other: {
      "facebook-domain-verification": "14p40lig23xo6orqv8qnge0u0qm19q",
    },
  };
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const settings = await getSiteSettings();
  return (
    <ClerkProvider>
      <html lang="id" suppressHydrationWarning>
        <body
          className="antialiased min-h-screen bg-background font-sans"
          suppressHydrationWarning
        >
          {children}
          <FloatingConsult whatsappUrl={settings.whatsapp} siteName={settings.siteName} />
        </body>
      </html>
    </ClerkProvider>
  );
}
