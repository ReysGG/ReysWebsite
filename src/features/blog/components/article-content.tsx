import { sanitizeRichText } from '@/features/blog/lib/sanitize';

export function ArticleContent({ content }: { content: string }) {
  const safe = sanitizeRichText(content);
  return <div className="mt-8 rounded-3xl border border-indigo-100 dark:border-indigo-100 bg-white dark:bg-white p-6 shadow-sm md:p-10"><div className="quill-content text-base leading-8 text-neutral-700 dark:text-neutral-700 md:text-lg [&_a]:font-semibold [&_a]:text-indigo-700 [&_blockquote]:border-l-4 [&_blockquote]:border-indigo-200 [&_blockquote]:pl-5 [&_h2]:mt-10 [&_h2]:text-3xl [&_h2]:font-bold [&_h2]:text-neutral-950 [&_h3]:mt-8 [&_h3]:text-2xl [&_h3]:font-bold [&_h3]:text-neutral-950 [&_img]:rounded-2xl [&_li]:my-2 [&_ol]:list-decimal [&_ol]:pl-6 [&_p]:my-5 [&_ul]:list-disc [&_ul]:pl-6" dangerouslySetInnerHTML={{ __html: safe }} /></div>;
}
