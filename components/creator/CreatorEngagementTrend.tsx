"use client";

import { Card } from "@/components/ui/card";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

interface CreatorEngagementTrendProps {
  data: Array<{
    date: string;
    engagement: number;
  }>;
}

export function CreatorEngagementTrend({ data }: CreatorEngagementTrendProps) {
  return (
    <Card className="p-6">
      <h3 className="text-xl font-semibold mb-4">Engagement Trend</h3>
      <div className="h-[300px]">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis 
              dataKey="date"
              padding={{ left: 0, right: 0 }}
            />
            <YAxis 
              width={60}
              padding={{ top: 20, bottom: 20 }}
            />
            <Tooltip />
            <Line
              type="monotone"
              dataKey="engagement"
              stroke="hsl(var(--chart-1))"
              strokeWidth={2}
              dot={false}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </Card>
  );
}