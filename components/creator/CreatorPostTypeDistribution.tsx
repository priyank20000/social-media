"use client";

import { Card } from "@/components/ui/card";
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from "recharts";

interface CreatorPostTypeDistributionProps {
  postsByType: {
    reel: number;
    carousel: number;
    image: number;
  };
}

const COLORS = ['hsl(var(--chart-1))', 'hsl(var(--chart-2))', 'hsl(var(--chart-3))'];

export function CreatorPostTypeDistribution({ postsByType }: CreatorPostTypeDistributionProps) {
  const data = [
    { name: 'Reels', value: postsByType.reel },
    { name: 'Carousels', value: postsByType.carousel },
    { name: 'Images', value: postsByType.image },
  ];

  return (
    <Card className="p-6">
      <h3 className="text-xl font-semibold mb-4">Content Distribution</h3>
      <div className="h-[300px]">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={data}
              dataKey="value"
              nameKey="name"
              cx="50%"
              cy="50%"
              outerRadius={100}
              label={({ name, percent }) => 
                `${name} ${(percent * 100).toFixed(0)}%`
              }
            >
              {data.map((_, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip />
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </Card>
  );
}