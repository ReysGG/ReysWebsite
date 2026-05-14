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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const chartData = [
  { Day: "Sen", views: 420 },
  { Day: "Sel", views: 530 },
  { Day: "Rab", views: 610 },
  { Day: "Kam", views: 890 },
  { Day: "Jum", views: 1200 },
  { Day: "Sab", views: 1540 },
  { Day: "Min", views: 1300 },
];

const chartConfig = {
  views: {
    label: "Views",
    color: "#6366f1",
  },
} satisfies ChartConfig;

export function AnalyticsChart() {
  return (
    <Card className="flex flex-col h-full shadow-none bg-white border-neutral-200">
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <div className="space-y-1">
          <CardTitle className="text-base font-semibold text-neutral-900">
            Traffic Visitor
          </CardTitle>
          <CardDescription className="text-xs text-neutral-500">
            Total views artikel & portfolio minggu ini
          </CardDescription>
        </div>
        <Select defaultValue="7days">
          <SelectTrigger className="w-[140px] h-8 text-xs border-neutral-200 bg-neutral-50">
            <SelectValue placeholder="Pilih Filter" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="7days">7 Hari Terakhir</SelectItem>
            <SelectItem value="30days">30 Hari Terakhir</SelectItem>
            <SelectItem value="1year">Tahun Ini</SelectItem>
          </SelectContent>
        </Select>
      </CardHeader>
      <CardContent className="flex-1 mt-2">
        <ChartContainer config={chartConfig} className="w-full h-[260px]">
          <AreaChart
            accessibilityLayer
            data={chartData}
            margin={{ left: 0, right: 0, top: 10, bottom: 0 }}
          >
            <CartesianGrid vertical={false} strokeDasharray="3 3" opacity={0.2} />
            <XAxis
              dataKey="Day"
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
      </CardContent>
    </Card>
  );
}
