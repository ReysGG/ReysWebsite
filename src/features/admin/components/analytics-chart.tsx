"use client";

import { TrendingUp, Calendar } from "lucide-react";
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

const chartData = [
  { Day: "Mon", views: 420 },
  { Day: "Tue", views: 530 },
  { Day: "Wed", views: 610 },
  { Day: "Thu", views: 890 },
  { Day: "Fri", views: 1200 },
  { Day: "Sat", views: 1540 },
  { Day: "Sun", views: 1300 },
];

const chartConfig = {
  views: {
    label: "Views",
    color: "hsl(var(--primary))",
  },
} satisfies ChartConfig;

export function AnalyticsChart() {
  return (
    <Card className="flex flex-col h-full shadow-none bg-white dark:bg-neutral-950 border-neutral-200 dark:border-neutral-800">
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <div className="space-y-1">
          <CardTitle className="text-xl">Traffic Visitor (Views)</CardTitle>
          <CardDescription>
            Menampilkan total tampilan dari semua artikel & porto
          </CardDescription>
        </div>
        <div>
           <Select defaultValue="7days">
            <SelectTrigger className="w-[140px] h-9 text-xs">
              <SelectValue placeholder="Pilih Filter" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="7days">7 Hari Terakhir</SelectItem>
              <SelectItem value="30days">30 Hari Terakhir</SelectItem>
              <SelectItem value="1year">Tahun Ini</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </CardHeader>
      <CardContent className="flex-1 mt-4">
        <ChartContainer config={chartConfig} className="w-full h-[300px]">
          <AreaChart
            accessibilityLayer
            data={chartData}
            margin={{
              left: 0,
              right: 0,
              top: 10,
              bottom: 0,
            }}
          >
            <CartesianGrid vertical={false} strokeDasharray="3 3" opacity={0.3} />
            <XAxis
              dataKey="Day"
              tickLine={false}
              axisLine={false}
              tickMargin={12}
              tick={{ fontSize: 12, fill: "currentColor" }}
            />
             <YAxis 
               tickLine={false}
               axisLine={false}
               tickMargin={12}
               tick={{ fontSize: 12, fill: "currentColor" }}
             />
            <ChartTooltip
              cursor={{ stroke: "hsl(var(--primary))", strokeWidth: 1, strokeDasharray: "4 4" }}
              content={<ChartTooltipContent indicator="dot" className="bg-white dark:bg-neutral-900 border-neutral-200 dark:border-neutral-800 shadow-md" />}
            />
            <defs>
              <linearGradient id="fillViews" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="var(--color-views)" stopOpacity={0.8} />
                <stop offset="95%" stopColor="var(--color-views)" stopOpacity={0.0} />
              </linearGradient>
            </defs>
            <Area
              dataKey="views"
              type="monotone"
              fill="url(#fillViews)"
              stroke="var(--color-views)"
              strokeWidth={3}
              activeDot={{ r: 6, strokeWidth: 0 }}
            />
          </AreaChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
