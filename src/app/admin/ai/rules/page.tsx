import { AiStudioHeader } from "@/features/ai/components/ai-studio-header";
import { WriterRulesForm } from "@/features/ai/components/writer-rules-form";
import { getWriterRules } from "@/features/ai/services/writer-rules-service";

export const dynamic = "force-dynamic";

export default async function AiRulesPage() {
  const rules = await getWriterRules();
  return (
    <div className="space-y-6">
      <AiStudioHeader
        title="Writer Rules"
        description="Aturan gaya, SEO, dan larangan yang selalu dipatuhi AI saat menulis — di chat maupun jadwal otomatis."
        active="/admin/ai/rules"
      />
      <WriterRulesForm rules={rules} />
    </div>
  );
}
