export type ShowcaseStatus = 'all' | 'published' | 'draft';

export type ShowcaseRow = {
  id: string;
  slug: string;
  title: string;
  description: string;
  category: string;
  thumbnail: string | null;
  htmlUrl: string;
  tags: string[];
  published: boolean;
  order: number;
  createdAt: Date;
  updatedAt: Date;
};

export type ShowcaseCategory = {
  name: string;
  count: number;
};

export type ShowcaseFilters = {
  q: string;
  status: ShowcaseStatus;
  category: string;
  page: number;
};

export type ShowcasePagination = {
  page: number;
  pageSize: number;
  total: number;
  totalPages: number;
  hasNextPage: boolean;
  hasPreviousPage: boolean;
};

export type ShowcaseTableProps = {
  items: ShowcaseRow[];
  categories: ShowcaseCategory[];
  filters: ShowcaseFilters;
  pagination: ShowcasePagination;
};
