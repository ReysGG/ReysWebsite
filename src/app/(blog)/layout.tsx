import { BlogNavbar } from '@/features/blog/components/blog-navbar';
import { Footer } from '@/components/ui/footer';

export default function BlogGroupLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="relative w-full bg-white dark:bg-white">
      <BlogNavbar />
      {children}
      <Footer />
    </div>
  );
}
