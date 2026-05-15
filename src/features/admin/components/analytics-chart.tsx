"use client";

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
    color: "#6366f1",
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
          <div className="flex h-[260px] items-center justify-center text-sm text-neutral-400">
            Belum ada data views artikel.
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
                cursor={{ stroke: "#6366f1", strokeWidth: 1, strokeDasharray: "4 4" }}
                content={
                  <ChartTooltipContent
                    indicator="dot"
                    className="bg-white border-neutral-200 shadow-none text-xs"
                  />
                }
              />
              <defs>
                <linearGradient id="fillViews" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#6366f1" stopOpacity={0.15} />
                  <stop offset="95%" stopColor="#6366f1" stopOpacity={0} />
                </linearGradient>
              </defs>
              <Area
                dataKey="views"
                type="monotone"
                fill="url(#fillViews)"
                stroke="#6366f1"
                strokeWidth={2.5}
                activeDot={{ r: 5, strokeWidth: 0, fill: "#6366f1" }}
              />
            </AreaChart>
          </ChartContainer>
        )}
      </CardContent>
    </Card>
  );
}
