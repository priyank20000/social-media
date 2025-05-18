"use client";

import { Card } from "@/components/ui/card";
import { BaseLineChart } from "./BaseLineChart";

interface EngagementChartProps {
  data: Array<{
    date: string;
    engagement: number;
    type: string;
  }>;
}

export function EngagementChart({ data }: EngagementChartProps) {
  return (
    <Card className="p-6">
      <h2 className="text-2xl font-bold mb-6">Engagement Trends</h2>
      <BaseLineChart 
        data={data}
        xAxisKey="date"
        lines={[
          { key: "engagement", color: "hsl(var(--primary))", name: "Engagement" }
        ]}
      />
    </Card>
  );
}