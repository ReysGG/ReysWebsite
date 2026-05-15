import Link from "next/link";

interface BlogPreviewModalProps {
  slug: string;
  label?: React.ReactNode;
  className?: string;
}

export function BlogPreviewModal({ slug, label = "↗ Preview", className }: BlogPreviewModalProps) {
  return (
    <Link
      href={`/admin/blog/${slug}/preview`}
      target="_blank"
      rel="noopener noreferrer"
      className={className ?? "text-sm font-semibold text-indigo-600 hover:text-indigo-700"}
    >
      {label}
    </Link>
  );
}
