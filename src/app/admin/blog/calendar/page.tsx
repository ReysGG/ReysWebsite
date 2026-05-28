import { BlogCalendarView } from "@/features/admin/components/blog/calendar/blog-calendar-view";
import { parseBlogCalendarFilters } from "@/features/admin/lib/blog-calendar";
import { getBlogCalendarData } from "@/features/admin/services/blog-calendar-service";

export default async function EditorialCalendarPage({
  searchParams,
}: {
  searchParams?: Promise<{ week?: string; tab?: string }>;
}) {
  const filters = parseBlogCalendarFilters((await searchParams) || {});
  const data = await getBlogCalendarData(filters);

  return <BlogCalendarView filters={filters} data={data} />;
}
