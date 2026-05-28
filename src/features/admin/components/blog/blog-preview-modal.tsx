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
      className={className ?? "text-sm font-semibold text-[#ff8a00] hover:text-[#ff8a00]"}
    >
      {label}
    </Link>
  );
}
