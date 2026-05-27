import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ImageIcon } from "lucide-react";
import db from "@/lib/db";
import { ProjectForm } from "@/features/admin/components/portfolio/project-form";
import { updateProject } from "@/features/admin/actions/portfolio-actions";

export default async function EditPortfolioProjectPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const project = await db.project.findUnique({ where: { id } });

  if (!project) notFound();

  const action = updateProject.bind(null, project.id);

  return (
    <div className="space-y-6">
      <div className="rounded-md border border-neutral-200 bg-white p-6 shadow-none">
        <Link href="/admin/portfolio" className="mb-5 inline-flex items-center gap-2 text-xs font-semibold text-neutral-500 hover:text-[#ff8a00]">
          <ArrowLeft className="h-3.5 w-3.5" /> Kembali ke Portfolio
        </Link>
        <div className="flex items-start gap-4">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-md bg-[#fffcc9] text-[#ff8a00]">
            <ImageIcon className="h-5 w-5" />
          </div>
          <div>
            <p className="text-xs font-semibold uppercase tracking-widest text-[#ff8a00]">Portfolio Content</p>
            <h1 className="mt-2 text-2xl font-bold tracking-tight text-neutral-900">Edit Project</h1>
            <p className="mt-1 text-sm text-neutral-500">Perbarui detail portfolio: {project.title}.</p>
          </div>
        </div>
      </div>

      <ProjectForm
        action={action}
        submitLabel="Update Project"
        defaultValue={{
          title: project.title,
          description: project.description,
          imageUrl: project.imageUrl,
          gifUrl: project.gifUrl,
          link: project.link,
        }}
      />
    </div>
  );
}
