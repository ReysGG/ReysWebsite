import { sanitizeRichText } from '@/features/blog/lib/sanitize';
import { optimizeArticleImages } from '@/features/blog/lib/optimize-images';

export function ArticleContent({ content }: { content: string }) {
  const safe = optimizeArticleImages(sanitizeRichText(content));
  return (
    <div
      className="quill-content text-base leading-7 text-neutral-700 md:text-lg md:leading-8 [&_a]:font-semibold [&_a]:text-indigo-700 [&_blockquote]:border-l-4 [&_blockquote]:border-indigo-200 [&_blockquote]:pl-5 [&_h2]:mt-9 [&_h2]:scroll-mt-24 [&_h2]:text-2xl [&_h2]:font-bold [&_h2]:text-neutral-950 md:[&_h2]:text-3xl [&_h3]:mt-7 [&_h3]:scroll-mt-24 [&_h3]:text-xl [&_h3]:font-bold [&_h3]:text-neutral-950 md:[&_h3]:text-2xl [&_img]:rounded-2xl [&_li]:my-1.5 [&_ol]:list-decimal [&_ol]:pl-6 [&_p]:my-4 [&_ul]:list-disc [&_ul]:pl-6"
      dangerouslySetInnerHTML={{ __html: safe }}
    />
  );
}
