import { BlogNavbar } from '@/features/blog/components/blog-navbar';
import { Footer } from '@/components/ui/footer';
import { PromoBanner } from '@/components/ui/promo-banner';

export default function BlogGroupLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="relative w-full bg-white dark:bg-white">
      <PromoBanner />
      <BlogNavbar />
      {children}
      <Footer />
    </div>
  );
}
