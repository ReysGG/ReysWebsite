import { SubscribersAdminView } from "@/features/admin/components/subscribers/subscribers-admin-view";
import { normalizeSubscriberStatus } from "@/features/admin/constants/subscribers";
import { getSubscriberList } from "@/features/admin/services/subscriber-service";
import type { SubscriberListFilters } from "@/features/admin/types/subscribers";

function parseSubscriberFilters(params: Record<string, string | string[] | undefined>): SubscriberListFilters {
  const pageValue = typeof params.page === "string" ? params.page : "1";

  return {
    q: typeof params.q === "string" ? params.q.trim() : "",
    status: normalizeSubscriberStatus(typeof params.status === "string" ? params.status : undefined),
    page: Math.max(1, parseInt(pageValue, 10) || 1),
  };
}

export default async function AdminSubscribersPage({ searchParams }: { searchParams: Promise<Record<string, string | string[] | undefined>> }) {
  const filters = parseSubscriberFilters(await searchParams);
  const result = await getSubscriberList(filters);

  return <SubscribersAdminView filters={filters} result={result} />;
}
