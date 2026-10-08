import { AiStudioHeader } from "@/features/ai/components/ai-studio-header";
import { ScheduleManager } from "@/features/ai/components/schedule-manager";
import { getTaxonomy } from "@/features/ai/services/ai-blog-service";
import { countEnabledProviders } from "@/features/ai/services/provider-service";
import { listSchedules } from "@/features/ai/services/schedule-service";

export const dynamic = "force-dynamic";

export default async function AiSchedulesPage() {
  const [schedules, taxonomy, providerCount] = await Promise.all([listSchedules(), getTaxonomy(), countEnabledProviders()]);
  return (
    <div className="space-y-6">
      <AiStudioHeader
        title="Auto-Article Schedules"
        description="AI menulis artikel SEO otomatis sesuai jadwal dan antrian keyword."
        active="/admin/ai/schedules"
      />
      <ScheduleManager schedules={schedules} categories={taxonomy.categories} hasProvider={providerCount > 0} />
    </div>
  );
}
