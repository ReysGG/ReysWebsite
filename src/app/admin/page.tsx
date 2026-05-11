import React from "react";
import { OverviewBento } from "@/components/admin/overview-bento";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { IconArticle, IconBriefcase, IconMessageCircle, IconLayoutList } from "@tabler/icons-react";
import db from "@/lib/db";
import { AnalyticsChart } from "@/features/admin/components/analytics-chart";
import { TrendingPosts } from "@/features/admin/components/trending-posts";

type TrendingPost = {
  id: string;
  title: string;
  slug: string;
  views: number;
  createdAt: Date;
};

export default async function AdminDashboard() {
  let databaseError = false;
  let totalPosts = 0;
  let totalProjects = 0;
  let totalServices = 0;
  let totalTestimonials = 0;
  let trendingPosts: TrendingPost[] = [];

  try {
    [totalPosts, totalProjects, totalServices, totalTestimonials, trendingPosts] = await Promise.all([
      db.post.count(),
      db.project.count(),
      db.service.count(),
      db.testimonial.count(),
      db.post.findMany({
        orderBy: { views: 'desc' },
        take: 5,
        select: { id: true, title: true, slug: true, views: true, createdAt: true }
      }),
    ]);
  } catch {
    databaseError = true;
  }

  const statCards = [
    {
      title: "Total Artikel",
      value: totalPosts,
      description: "Artikel blog yang diterbitkan",
      icon: IconArticle,
    },
    {
      title: "Portfolio",
      value: totalProjects,
      description: "Project di showcase",
      icon: IconBriefcase,
    },
    {
      title: "Layanan",
      value: totalServices,
      description: "Layanan yang ditawarkan",
      icon: IconLayoutList,
    },
    {
      title: "Testimoni",
      value: totalTestimonials,
      description: "Ulasan klien aktif",
      icon: IconMessageCircle,
    },
  ];

  return (
    <div className="space-y-8">
      {databaseError && (
        <div className="rounded-2xl border border-amber-200 bg-amber-50 p-4 text-sm font-medium text-amber-800">
          Database sedang tidak bisa diakses. Dashboard ditampilkan dalam mode fallback sampai koneksi Postgres/Supabase diperbaiki.
        </div>
      )}

      <div className="rounded-2xl border border-neutral-200 bg-white p-6 shadow-sm dark:border-neutral-800 dark:bg-neutral-900 md:p-8">
        <p className="text-xs font-bold uppercase tracking-[0.22em] text-neutral-500">Admin Overview</p>
        <div className="mt-4 flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight text-neutral-900 dark:text-neutral-100 md:text-4xl">
              Dashboard
            </h1>
            <p className="mt-2 max-w-2xl text-neutral-500">
              Ringkasan performa, konten, dan shortcut operasional website Anda.
            </p>
          </div>
          <div className="rounded-xl bg-neutral-950 px-4 py-3 text-white dark:bg-white dark:text-neutral-950">
            <p className="text-xs font-medium opacity-60">Published content</p>
            <p className="text-2xl font-bold">{totalPosts + totalProjects}</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
        {statCards.map((stat) => {
          const Icon = stat.icon;

          return (
            <Card key={stat.title} className="border-neutral-200 bg-white shadow-sm dark:border-neutral-800 dark:bg-neutral-900">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-neutral-600 dark:text-neutral-400">{stat.title}</CardTitle>
                <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-neutral-100 dark:bg-neutral-800">
                  <Icon className="h-4 w-4 text-neutral-700 dark:text-neutral-200" />
                </span>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-neutral-950 dark:text-neutral-50">{stat.value}</div>
                <p className="mt-1 text-xs text-neutral-500">{stat.description}</p>
              </CardContent>
            </Card>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <AnalyticsChart />
        </div>
        <div className="lg:col-span-1">
          <TrendingPosts posts={trendingPosts} />
        </div>
      </div>

      <div className="rounded-2xl border border-neutral-200 bg-white p-6 shadow-sm dark:border-neutral-800 dark:bg-neutral-900">
        <h2 className="text-xl font-bold mb-2">Quick Actions & Shortcuts</h2>
        <p className="mb-6 text-sm text-neutral-500">Akses cepat ke task yang paling sering dikerjakan.</p>
        <OverviewBento />
      </div>
    </div>
  );
}
