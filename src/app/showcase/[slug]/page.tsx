import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getPublishedShowcaseItem, getAllShowcaseSlugs } from "@/features/showcase/data";
import { ShowcaseFrame } from "@/features/showcase/components/showcase-frame";

type PageProps = { params: Promise<{ slug: string }> };

export const revalidate = 3600;

export async function generateStaticParams() {
  const slugs = await getAllShowcaseSlugs();
  return slugs.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const item = await getPublishedShowcaseItem(slug);
  if (!item) return { title: "Showcase tidak ditemukan" };
  return {
    title: `${item.title} (Prototipe) | Showcase`,
    description: item.description,
    robots: { index: false, follow: false },
  };
}

export default async function ShowcaseDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const item = await getPublishedShowcaseItem(slug);
  if (!item) notFound();

  return <ShowcaseFrame title={item.title} htmlPath={item.htmlPath} category={item.category} />;
}
