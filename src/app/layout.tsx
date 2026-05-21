import type { Metadata } from "next";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { ClerkProvider } from "@clerk/nextjs";
import { ScrollProgress } from "@/components/ui/scroll-progress";
import { BackToTop } from "@/components/ui/back-to-top";
import { FloatingConsult } from "@/components/ui/floating-consult";
import { getSiteSettings } from "@/lib/site-settings";

export async function generateMetadata(): Promise<Metadata> {
  const settings = await getSiteSettings();
  const siteName = settings.siteName || "WebServices";
  const tagline = settings.tagline || "Your Tech Partner";
  return {
    metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || "https://buildwithreys.tech"),
    title: `${siteName} | ${tagline}`,
    description: settings.description || "Dinamis & profesional web services, startups, and personal brands.",
    icons: { icon: '/favicon.ico' },
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
    <html lang="id" suppressHydrationWarning>
      <body
        className="antialiased min-h-screen bg-background font-sans"
        suppressHydrationWarning
      >
        <ClerkProvider>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            <ScrollProgress />
            {children}
            <BackToTop />
            <FloatingConsult whatsappUrl={settings.whatsapp} siteName={settings.siteName} />
          </ThemeProvider>
        </ClerkProvider>
      </body>
    </html>
  );
}
