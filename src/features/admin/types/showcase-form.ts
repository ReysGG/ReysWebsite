export type ShowcaseFormMode = 'create' | 'edit';
export type ShowcaseHtmlSourceMode = 'upload' | 'editor';

export type ShowcaseFormData = {
  id?: string;
  slug?: string;
  title?: string;
  description?: string;
  category?: string;
  htmlUrl?: string;
  thumbnail?: string;
  tags?: string[];
  published?: boolean;
  order?: number;
};

export type ShowcaseFormOptions = {
  categories: string[];
  nextOrder: number;
};
