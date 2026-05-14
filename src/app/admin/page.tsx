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
        orderBy: { views: "desc" },
        take: 5,
        select: { id: true, title: true, slug: true, views: true, createdAt: true },
      }),
    ]);
  } catch {
    databaseError = true;
  }

  const statCards = [
    {
      title: "Total Artikel",
      value: totalPosts,
      description: "Artikel blog diterbitkan",
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
    <div className="space-y-6">
      {databaseError && (
        <div className="rounded-md border border-amber-200 bg-amber-50 px-4 py-3 text-sm font-medium text-amber-800">
          Database tidak bisa diakses. Dashboard ditampilkan dalam mode fallback.
        </div>
      )}

      {/* Header */}
      <div className="rounded-md border border-neutral-200 bg-white p-6 shadow-none">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-xs font-semibold uppercase tracking-widest text-indigo-600">
              Admin Overview
            </p>
            <h1 className="mt-2 text-2xl font-bold tracking-tight text-neutral-900 md:text-3xl">
              Dashboard
            </h1>
            <p className="mt-1 text-sm text-neutral-500">
              Ringkasan performa, konten, dan shortcut operasional website.
            </p>
          </div>
          <div className="rounded-md bg-indigo-600 px-5 py-3 text-white shrink-0">
            <p className="text-xs font-medium opacity-70">Published content</p>
            <p className="text-2xl font-bold">{totalPosts + totalProjects}</p>
          </div>
        </div>
      </div>

      {/* Stat Cards */}
      <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        {statCards.map((stat) => {
          const Icon = stat.icon;
          return (
            <Card key={stat.title} className="border-neutral-200 bg-white shadow-none">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-xs font-semibold text-neutral-500">
                  {stat.title}
                </CardTitle>
                <div className="flex h-8 w-8 items-center justify-center rounded-md bg-indigo-50">
                  <Icon className="h-4 w-4 text-indigo-600" />
                </div>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-neutral-900">{stat.value}</div>
                <p className="mt-1 text-xs text-neutral-400">{stat.description}</p>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <AnalyticsChart />
        </div>
        <div className="lg:col-span-1">
          <TrendingPosts posts={trendingPosts} />
        </div>
      </div>

      {/* Quick Actions */}
      <div className="rounded-md border border-neutral-200 bg-white p-6 shadow-none">
        <div className="mb-5">
          <h2 className="text-base font-semibold text-neutral-900">Quick Actions</h2>
          <p className="mt-1 text-sm text-neutral-500">
            Akses cepat ke task yang paling sering dikerjakan.
          </p>
        </div>
        <OverviewBento />
      </div>
    </div>
  );
}
