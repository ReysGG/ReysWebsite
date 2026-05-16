import type { Metadata } from "next";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { ClerkProvider } from "@clerk/nextjs";
import { ScrollProgress } from "@/components/ui/scroll-progress";
import { BackToTop } from "@/components/ui/back-to-top";
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
  };
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
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
          </ThemeProvider>
        </ClerkProvider>
      </body>
    </html>
  );
}
