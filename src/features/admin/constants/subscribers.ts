export const SUBSCRIBERS_PAGE_SIZE = 20;

export const SUBSCRIBER_STATUS_FILTERS = ["all", "active", "inactive"] as const;

export type SubscriberStatusFilter = (typeof SUBSCRIBER_STATUS_FILTERS)[number];

export function normalizeSubscriberStatus(value: string | undefined): SubscriberStatusFilter {
  if (value === "active" || value === "inactive") return value;
  return "all";
}
