export type BlogSearchParams = {
  q?: string;
  tag?: string;
  category?: string;
  status?: "published" | "draft" | "all";
  year?: number;
  page: number;
};

type SearchParamsInput = Record<string, string | string[] | undefined> | URLSearchParams | undefined;

function getParam(searchParams: SearchParamsInput, key: string) {
  if (!searchParams) return undefined;
  const value = searchParams instanceof URLSearchParams ? searchParams.get(key) : searchParams[key];
  return Array.isArray(value) ? value[0] : value ?? undefined;
}

function cleanText(value: string | undefined, maxLength = 80) {
  const cleaned = value?.trim().replace(/\s+/g, " ");
  return cleaned ? cleaned.slice(0, maxLength) : undefined;
}

function cleanYear(value: string | undefined) {
  const year = Number(value);
  const currentYear = new Date().getFullYear() + 1;
  return Number.isInteger(year) && year >= 2000 && year <= currentYear ? year : undefined;
}

function cleanPage(value: string | undefined) {
  const page = Number(value);
  return Number.isInteger(page) && page > 0 ? page : 1;
}

export function parseBlogSearchParams(searchParams: SearchParamsInput): BlogSearchParams {
  return {
    q: cleanText(getParam(searchParams, "q"), 120),
    tag: cleanText(getParam(searchParams, "tag")),
    category: cleanText(getParam(searchParams, "category")),
    status: getParam(searchParams, "status") === "published" || getParam(searchParams, "status") === "draft" ? getParam(searchParams, "status") as "published" | "draft" : "all",
    year: cleanYear(getParam(searchParams, "year")),
    page: cleanPage(getParam(searchParams, "page")),
  };
}
