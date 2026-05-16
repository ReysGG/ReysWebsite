import { BlogNavbar } from '@/features/blog/components/blog-navbar';
import { Footer } from '@/components/ui/footer';
import { PromoBanner } from '@/components/ui/promo-banner';

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL;

export default function BlogGroupLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="relative w-full bg-white dark:bg-white">
      {SUPABASE_URL ? (
        <>
          <link rel="preconnect" href={SUPABASE_URL} crossOrigin="" />
          <link rel="dns-prefetch" href={SUPABASE_URL} />
        </>
      ) : null}
      <PromoBanner />
      <BlogNavbar />
      {children}
      <Footer />
    </div>
  );
}
