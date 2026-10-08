import "server-only";

import { isEncryptionConfigured } from "@/features/ai/lib/crypto";
import { getTaxonomy } from "@/features/ai/services/ai-blog-service";
import { getStockSources } from "@/features/ai/services/image-search-service";
import { listProviders } from "@/features/ai/services/provider-service";
import { getRunStats, listRecentRuns } from "@/features/ai/services/run-service";
import { listSchedules } from "@/features/ai/services/schedule-service";

/** Everything the AI Studio overview page renders, as plain serializable data. */
export async function getAiOverview() {
  const [providers, runs, stats, schedules, taxonomy] = await Promise.all([
    listProviders(),
    listRecentRuns(20),
    getRunStats(30),
    listSchedules(),
    getTaxonomy(),
  ]);

  return {
    providers: providers.map((p) => ({
      id: p.id,
      name: p.name,
      model: p.defaultModel,
      enabled: p.enabled,
      hasError: Boolean(p.lastError && (!p.lastUsedAt || (p.lastErrorAt ?? "") > p.lastUsedAt)),
    })),
    activeProviders: providers.filter((p) => p.enabled).length,
    runs,
    stats,
    upcoming: schedules
      .filter((s) => s.enabled && s.nextRunAt)
      .sort((a, b) => (a.nextRunAt ?? "").localeCompare(b.nextRunAt ?? ""))
      .slice(0, 5)
      .map((s) => ({ id: s.id, name: s.name, nextRunAt: s.nextRunAt!, nextTopic: s.topics[0] ?? null, timezone: s.timezone })),
    categories: taxonomy.categories,
    env: {
      encryption: isEncryptionConfigured(),
      cronSecret: Boolean(process.env.CRON_SECRET && process.env.CRON_SECRET.length >= 16),
      ...getStockSources(),
    },
  };
}
