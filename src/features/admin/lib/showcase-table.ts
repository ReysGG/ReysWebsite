export const showcaseTableDateFormatter = new Intl.DateTimeFormat('id-ID', {
  day: '2-digit',
  month: 'short',
  year: 'numeric',
});

export function formatShowcaseTableDate(date: Date) {
  return showcaseTableDateFormatter.format(new Date(date));
}

export function buildShowcasePageHref(pathname: string, searchParams: URLSearchParams, page: number) {
  const params = new URLSearchParams(searchParams.toString());
  if (page <= 1) params.delete('page');
  else params.set('page', String(page));

  const qs = params.toString();
  return qs ? `${pathname}?${qs}` : pathname;
}

export function getShowcasePreviewHref(slug: string) {
  return `/showcase/${slug}`;
}
