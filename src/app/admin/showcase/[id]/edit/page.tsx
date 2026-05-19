import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { ShowcaseForm } from "@/features/admin/components/showcase/showcase-form";
import { getShowcaseForEdit, getShowcaseFormOptions } from "@/features/admin/services/showcase-service";

export const metadata = { title: "Edit Showcase | Admin" };
export const dynamic = "force-dynamic";

type PageProps = { params: Promise<{ id: string }> };

export default async function EditShowcasePage({ params }: PageProps) {
  const { id } = await params;
  const [item, options] = await Promise.all([
    getShowcaseForEdit(id),
    getShowcaseFormOptions().catch(() => ({ categories: [], nextOrder: 1 })),
  ]);
  if (!item) notFound();

  return (
    <div className="space-y-6">
      <div>
        <Link
          href="/admin/showcase"
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-neutral-500 hover:text-blue-700"
        >
          <ArrowLeft className="h-3.5 w-3.5" />
          Kembali ke daftar
        </Link>
        <h1 className="mt-2 text-2xl font-bold text-neutral-900">Edit Showcase</h1>
        <p className="text-sm text-neutral-500">Perbarui metadata atau ganti file HTML.</p>
      </div>

      <ShowcaseForm
        mode="edit"
        options={options}
        defaultValue={{
          id: item.id,
          slug: item.slug,
          title: item.title,
          description: item.description,
          category: item.category,
          htmlUrl: item.htmlUrl,
          thumbnail: item.thumbnail ?? undefined,
          tags: item.tags,
          published: item.published,
          order: item.order,
        }}
      />
    </div>
  );
}
