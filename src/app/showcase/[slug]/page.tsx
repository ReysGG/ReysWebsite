import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getPublishedShowcaseItem } from "@/features/showcase/data";
import { ShowcaseFrame } from "@/features/showcase/components/showcase-frame";
import { absoluteUrl } from "@/lib/site-url";

type PageProps = { params: Promise<{ slug: string }> };

export const revalidate = 3600;
export const dynamicParams = true;

export async function generateStaticParams() {
  return [];
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const item = await getPublishedShowcaseItem(slug);
  if (!item) return { title: "Showcase tidak ditemukan" };
  return {
    title: `${item.title} (Prototipe) | Showcase`,
    description: item.description,
    alternates: { canonical: `/showcase/${item.slug}` },
    openGraph: {
      title: `${item.title} (Prototipe) | Showcase`,
      description: item.description,
      url: absoluteUrl(`/showcase/${item.slug}`),
      images: item.thumbnail ? [{ url: item.thumbnail, alt: item.title }] : undefined,
    },
  };
}

export default async function ShowcaseDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const item = await getPublishedShowcaseItem(slug);
  if (!item) notFound();

  return <ShowcaseFrame slug={item.slug} title={item.title} htmlPath={item.htmlPath} category={item.category} />;
}
