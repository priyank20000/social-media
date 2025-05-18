"use client";

import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip } from "recharts";
import { ChartWrapper } from "./ChartWrapper";

interface BaseLineChartProps {
  data: any[];
  lines: Array<{
    key: string;
    color: string;
    name: string;
  }>;
  xAxisKey: string;
  xAxisFormatter?: (value: any) => string;
}

export function BaseLineChart({ data, lines, xAxisKey, xAxisFormatter }: BaseLineChartProps) {
  return (
    <ChartWrapper>
      <LineChart data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis 
          dataKey={xAxisKey}
          tickFormatter={xAxisFormatter}
          padding={{ left: 0, right: 0 }}
        />
        <YAxis 
          width={60}
          padding={{ top: 20, bottom: 20 }}
        />
        <Tooltip />
        {lines.map(line => (
          <Line
            key={line.key}
            type="monotone"
            dataKey={line.key}
            stroke={line.color}
            name={line.name}
          />
        ))}
      </LineChart>
    </ChartWrapper>
  );
}