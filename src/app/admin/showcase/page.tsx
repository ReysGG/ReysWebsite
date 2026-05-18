import Link from "next/link";
import { Plus } from "lucide-react";
import db from "@/lib/db";
import { ShowcaseTable } from "@/features/admin/components/showcase/showcase-table";

export const metadata = { title: "Showcase | Admin" };
export const dynamic = "force-dynamic";

async function getAdminShowcases() {
  try {
    return await db.showcase.findMany({
      orderBy: [{ order: "asc" }, { createdAt: "desc" }],
      select: {
        id: true,
        slug: true,
        title: true,
        category: true,
        thumbnail: true,
        htmlUrl: true,
        published: true,
        order: true,
      },
    });
  } catch {
    return [];
  }
}

export default async function AdminShowcaseListPage() {
  const items = await getAdminShowcases();

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <p className="text-xs font-semibold uppercase tracking-widest text-blue-600">Showcase</p>
          <h1 className="mt-1 text-2xl font-bold text-neutral-900">Kelola Prototipe</h1>
          <p className="mt-1 text-sm text-neutral-500">
            Upload HTML prototipe dan atur tampilannya di{" "}
            <Link href="/showcase" target="_blank" className="font-semibold text-blue-600 hover:underline">
              /showcase
            </Link>
            .
          </p>
        </div>
        <Link
          href="/admin/showcase/new"
          className="inline-flex w-fit items-center gap-2 rounded-lg bg-neutral-950 px-4 py-2 text-sm font-bold text-white transition hover:bg-blue-700"
        >
          <Plus className="h-4 w-4" />
          Showcase baru
        </Link>
      </div>

      <ShowcaseTable items={items} />
    </div>
  );
}
