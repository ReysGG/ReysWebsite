import { AiStudioHeader } from "@/features/ai/components/ai-studio-header";
import { ProviderManager } from "@/features/ai/components/provider-manager";
import { isEncryptionConfigured } from "@/features/ai/lib/crypto";
import { listProviders } from "@/features/ai/services/provider-service";

export const dynamic = "force-dynamic";

export default async function AiProvidersPage() {
  const providers = await listProviders();
  return (
    <div className="space-y-6">
      <AiStudioHeader
        title="LLM Providers"
        description="Hubungkan banyak provider sekaligus. Jika satu gagal, AI otomatis pindah ke provider berikutnya."
        active="/admin/ai/providers"
      />
      <ProviderManager providers={providers} encryptionReady={isEncryptionConfigured()} />
    </div>
  );
}
