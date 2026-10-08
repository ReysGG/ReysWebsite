"use client";

import Link from "next/link";
import { TrendingUp } from "lucide-react";
import { Area, AreaChart, CartesianGrid, XAxis, YAxis } from "recharts";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";

export type ChartDataPoint = {
  day: string;
  views: number;
};

const chartConfig = {
  views: {
    label: "Views",
    color: "#1E6BFF",
  },
} satisfies ChartConfig;

export function AnalyticsChart({ data, label }: { data: ChartDataPoint[]; label?: string }) {
  const totalViews = data.reduce((sum, d) => sum + d.views, 0);

  return (
    <Card className="flex flex-col h-full shadow-none bg-white border-neutral-200">
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <div className="space-y-1">
          <CardTitle className="text-base font-semibold text-neutral-900">
            Traffic Visitor
          </CardTitle>
          <CardDescription className="text-xs text-neutral-500">
            {label ?? "Total views artikel 7 hari terakhir"} · <span className="font-semibold text-neutral-700">{totalViews.toLocaleString("id-ID")} views</span>
          </CardDescription>
        </div>
      </CardHeader>
      <CardContent className="flex-1 mt-2">
        {data.length === 0 || totalViews === 0 ? (
          <div className="flex h-[260px] flex-col items-center justify-center gap-3 text-center">
            <div className="flex h-12 w-12 items-center justify-center rounded-md bg-brand-tint text-brand">
              <TrendingUp className="h-5 w-5" />
            </div>
            <div>
              <p className="text-sm font-semibold text-neutral-900">Belum ada data traffic</p>
              <p className="mt-1 text-xs text-neutral-500">Publikasikan artikel agar views mulai terekam di sini.</p>
            </div>
            <Link
              href="/admin/blog/create"
              className="inline-flex items-center gap-1.5 rounded-md bg-brand px-3 py-2 text-xs font-semibold text-white transition hover:bg-brand-deep active:bg-brand-deep active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-soft"
            >
              Tulis artikel pertama
            </Link>
          </div>
        ) : (
          <ChartContainer config={chartConfig} className="w-full h-[260px]">
            <AreaChart
              accessibilityLayer
              data={data}
              margin={{ left: 0, right: 0, top: 10, bottom: 0 }}
            >
              <CartesianGrid vertical={false} strokeDasharray="3 3" opacity={0.2} />
              <XAxis
                dataKey="day"
                tickLine={false}
                axisLine={false}
                tickMargin={10}
                tick={{ fontSize: 11, fill: "#a3a3a3" }}
              />
              <YAxis
                tickLine={false}
                axisLine={false}
                tickMargin={10}
                tick={{ fontSize: 11, fill: "#a3a3a3" }}
              />
              <ChartTooltip
                cursor={{ stroke: "#1E6BFF", strokeWidth: 1, strokeDasharray: "4 4" }}
                content={
                  <ChartTooltipContent
                    indicator="dot"
                    className="bg-white border-neutral-200 shadow-none text-xs"
                  />
                }
              />
              <defs>
                <linearGradient id="fillViews" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#1E6BFF" stopOpacity={0.18} />
                  <stop offset="95%" stopColor="#1E6BFF" stopOpacity={0} />
                </linearGradient>
              </defs>
              <Area
                dataKey="views"
                type="monotone"
                fill="url(#fillViews)"
                stroke="#1E6BFF"
                strokeWidth={2.5}
                activeDot={{ r: 5, strokeWidth: 0, fill: "#1E6BFF" }}
              />
            </AreaChart>
          </ChartContainer>
        )}
      </CardContent>
    </Card>
  );
}
