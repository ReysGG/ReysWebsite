import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { IconEye, IconTrendingUp } from "@tabler/icons-react";
import Link from 'next/link';
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
    <Card className="flex flex-col h-full shadow-none bg-white dark:bg-neutral-950 border-neutral-200 dark:border-neutral-800">
      <CardHeader className="pb-2 flex flex-row justify-between items-center">
        <div className="space-y-1">
          <CardTitle className="text-xl flex items-center gap-2">
            Naik Daun <IconTrendingUp className="text-emerald-500" size={20} />
          </CardTitle>
          <CardDescription>Postingan dengan interaksi terbanyak</CardDescription>
        </div>
      </CardHeader>
      <CardContent className="mt-4 flex-1">
        <div className="space-y-6">
          {posts.length === 0 ? (
            <div className="text-sm text-neutral-500 text-center py-6">Belum ada data postingan.</div>
          ) : (
            posts.map((post, index) => (
              <div key={post.id} className="flex justify-between items-center gap-4">
                <div className="flex items-start gap-4 overflow-hidden">
                  <div className="flex-shrink-0 w-8 h-8 flex items-center justify-center rounded-full bg-neutral-100 dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 text-sm font-semibold">
                    {index + 1}
                  </div>
                  <div className="truncate">
                    <Link href={`/admin/blog/${post.id}`} className="text-sm font-semibold hover:underline block truncate">
                      {post.title}
                    </Link>
                    <span className="text-xs text-neutral-500">
                      {format(post.createdAt, "dd MMM yyyy")}
                    </span>
                  </div>
                </div>
                <div className="flex items-center gap-1.5 text-xs font-medium text-neutral-500 bg-neutral-100 dark:bg-neutral-900 px-2.5 py-1 rounded-full whitespace-nowrap">
                  <IconEye size={14} />
                  {post.views}
                </div>
              </div>
            ))
          )}
        </div>
      </CardContent>
    </Card>
  );
}
