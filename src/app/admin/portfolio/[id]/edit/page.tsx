import { notFound } from "next/navigation";
import { EditProjectView } from "@/features/admin/components/portfolio/edit-project-view";
import { getAdminPortfolioProjectById } from "@/features/admin/services/portfolio-project-service";

export default async function EditPortfolioProjectPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const project = await getAdminPortfolioProjectById(id);

  if (!project) notFound();

  return <EditProjectView project={project} />;
}
