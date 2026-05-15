import Link from "next/link";
import { ArrowLeft, ImageIcon } from "lucide-react";
import { ProjectForm } from "@/features/admin/components/portfolio/project-form";
import { createProject } from "@/features/admin/actions/portfolio-actions";

export default function AddPortfolioProjectPage() {
  return (
    <div className="space-y-6">
      <div className="rounded-md border border-neutral-200 bg-white p-6 shadow-none">
        <Link href="/admin/portfolio" className="mb-5 inline-flex items-center gap-2 text-xs font-semibold text-neutral-500 hover:text-indigo-600">
          <ArrowLeft className="h-3.5 w-3.5" /> Kembali ke Portfolio
        </Link>
        <div className="flex items-start gap-4">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-md bg-indigo-50 text-indigo-600">
            <ImageIcon className="h-5 w-5" />
          </div>
          <div>
            <p className="text-xs font-semibold uppercase tracking-widest text-indigo-600">Portfolio Content</p>
            <h1 className="mt-2 text-2xl font-bold tracking-tight text-neutral-900">Tambah Project</h1>
            <p className="mt-1 text-sm text-neutral-500">Tambahkan project portfolio baru yang akan tampil di section homepage.</p>
          </div>
        </div>
      </div>

      <ProjectForm action={createProject} />
    </div>
  );
}
