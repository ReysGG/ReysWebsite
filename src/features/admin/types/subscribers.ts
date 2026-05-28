import type { SubscriberStatusFilter } from "@/features/admin/constants/subscribers";

export type SubscriberListItem = {
  id: string;
  email: string;
  source: string | null;
  active: boolean;
  createdAt: Date;
};

export type SubscriberListFilters = {
  q: string;
  status: SubscriberStatusFilter;
  page: number;
};

export type SubscriberListResult = {
  subscribers: SubscriberListItem[];
  totalCount: number;
  activeCount: number;
  inactiveCount: number;
  filteredCount: number;
  totalPages: number;
  pageSize: number;
  databaseError: boolean;
};
