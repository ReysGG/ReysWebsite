import React from "react";
import { OverviewBento } from "@/components/admin/overview-bento";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { IconArticle, IconBriefcase, IconMessageCircle, IconLayoutList } from "@tabler/icons-react";
import db from "@/lib/db";
import { AnalyticsChart } from "@/features/admin/components/analytics-chart";
import { TrendingPosts } from "@/features/admin/components/trending-posts";

export default async function AdminDashboard() {
  const [totalPosts, totalProjects, totalServices, totalTestimonials] = await Promise.all([
    db.post.count(),
    db.project.count(),
    db.service.count(),
    db.testimonial.count(),
  ]);

  const trendingPosts = await db.post.findMany({
    orderBy: { views: 'desc' },
    take: 5,
    select: { id: true, title: true, slug: true, views: true, createdAt: true }
  });

  return (
    <div className="space-y-12">
      <div>
        <h1 className="text-3xl font-bold tracking-tight text-neutral-900 dark:text-neutral-100">Overview</h1>
        <p className="text-neutral-500 mt-2">Ringkasan performa dan data konten website Anda.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <AnalyticsChart />
        </div>
        <div className="lg:col-span-1">
          <TrendingPosts posts={trendingPosts} />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="shadow-none">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Artikel</CardTitle>
            <IconArticle className="h-4 w-4 text-neutral-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalPosts}</div>
            <p className="text-xs text-neutral-500 mt-1">Artikel blog yang diterbitkan</p>
          </CardContent>
        </Card>
        <Card className="shadow-none">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Portfolio</CardTitle>
            <IconBriefcase className="h-4 w-4 text-neutral-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalProjects}</div>
            <p className="text-xs text-neutral-500 mt-1">Project di showcase</p>
          </CardContent>
        </Card>
        <Card className="shadow-none">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Layanan</CardTitle>
            <IconLayoutList className="h-4 w-4 text-neutral-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalServices}</div>
            <p className="text-xs text-neutral-500 mt-1">Layanan yang ditawarkan</p>
          </CardContent>
        </Card>
        <Card className="shadow-none">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Testimoni</CardTitle>
            <IconMessageCircle className="h-4 w-4 text-neutral-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalTestimonials}</div>
            <p className="text-xs text-neutral-500 mt-1">Ulasan klien aktif</p>
          </CardContent>
        </Card>
      </div>

      <div>
        <h2 className="text-xl font-bold mb-6">Quick Actions & Shortcuts</h2>
        <OverviewBento />
      </div>
    </div>
  );
}
