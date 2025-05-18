"use client";

import { Card } from "@/components/ui/card";
import { HashtagStats } from "@/lib/analytics/hashtags";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

interface HashtagsAnalysisProps {
  hashtags: HashtagStats[];
}

const defaultYAxisWidth = 100;
const defaultTickFontSize = 12;

export function HashtagsAnalysis({ hashtags }: HashtagsAnalysisProps) {
  const topHashtags = hashtags.slice(0, 10);

  return (
    <Card className="p-6">
      <h2 className="text-2xl font-bold mb-6">Top Hashtags</h2>
      <div className="h-[300px]">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={topHashtags} layout="vertical">
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis type="number" />
            <YAxis 
              dataKey="tag" 
              type="category" 
              width={defaultYAxisWidth}
              tick={{ fontSize: defaultTickFontSize }}
            />
            <Tooltip />
            <Bar 
              dataKey="engagement" 
              fill="hsl(var(--chart-1))" 
              name="Engagement"
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </Card>
  );
}