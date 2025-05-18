"use client";

import { Card } from "@/components/ui/card";
import { PostingPattern } from "@/lib/analytics/posting-patterns";
import { BaseLineChart } from "@/components/charts/BaseLineChart";

interface PostingTimeAnalysisProps {
  patterns: PostingPattern[];
}

export function PostingTimeAnalysis({ patterns }: PostingTimeAnalysisProps) {
  return (
    <Card className="p-6">
      <h2 className="text-2xl font-bold mb-6">Posting Time Analysis</h2>
      <BaseLineChart 
        data={patterns}
        xAxisKey="hour"
        xAxisFormatter={(hour) => `${hour}:00`}
        lines={[
          { key: "count", color: "hsl(var(--chart-1))", name: "Post Count" },
          { key: "avgEngagement", color: "hsl(var(--chart-2))", name: "Avg Engagement" }
        ]}
      />
    </Card>
  );
}