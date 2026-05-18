import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { ShowcaseForm } from "@/features/admin/components/showcase/showcase-form";

export const metadata = { title: "Showcase Baru | Admin" };

export default function NewShowcasePage() {
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
        <h1 className="mt-2 text-2xl font-bold text-neutral-900">Showcase Baru</h1>
        <p className="text-sm text-neutral-500">Upload file HTML prototipe dan isi metadatanya.</p>
      </div>

      <ShowcaseForm mode="create" />
    </div>
  );
}
