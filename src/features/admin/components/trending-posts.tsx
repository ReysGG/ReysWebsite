import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Eye, TrendingUp } from 'lucide-react';
import Link from "next/link";
import { format } from "date-fns";

type TrendingPostProps = {
  id: string;
  title: string;
  slug: string;
  views: number;
  createdAt: Date;
};

export function TrendingPosts({ posts }: { posts: TrendingPostProps[] }) {
  return (
    <Card className="flex flex-col h-full shadow-none bg-white border-neutral-200">
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <div className="space-y-1">
            <CardTitle className="text-base font-semibold text-neutral-900 flex items-center gap-2">
              Artikel Populer
              <TrendingUp className="text-indigo-500" size={16} />
            </CardTitle>
            <CardDescription className="text-xs text-neutral-500">
              Postingan dengan views terbanyak
            </CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent className="mt-2 flex-1">
        {posts.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-10 text-center">
            <div className="flex h-10 w-10 items-center justify-center rounded-md bg-neutral-100 mb-3">
              <TrendingUp size={18} className="text-neutral-400" />
            </div>
            <p className="text-sm text-neutral-500">Belum ada artikel.</p>
            <Link
              href="/admin/blog/create"
              className="mt-3 text-xs font-semibold text-indigo-600 hover:text-indigo-800 transition-colors"
            >
              Tulis artikel pertama →
            </Link>
          </div>
        ) : (
          <div className="space-y-4">
            {posts.map((post, index) => (
              <div key={post.id} className="flex items-center gap-3">
                <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-md bg-indigo-50 text-xs font-bold text-indigo-600">
                  {index + 1}
                </div>
                <div className="flex-1 min-w-0">
                  <Link
                    href={`/admin/blog/${post.id}`}
                    className="block truncate text-sm font-medium text-neutral-900 hover:text-indigo-600 transition-colors"
                  >
                    {post.title}
                  </Link>
                  <span className="text-xs text-neutral-400">
                    {format(post.createdAt, "dd MMM yyyy")}
                  </span>
                </div>
                <div className="flex items-center gap-1 text-xs font-medium text-neutral-500 bg-neutral-100 px-2 py-1 rounded-md whitespace-nowrap shrink-0">
                  <Eye size={12} />
                  {post.views.toLocaleString()}
                </div>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
