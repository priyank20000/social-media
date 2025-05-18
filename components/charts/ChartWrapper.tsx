"use client";

import React from "react";
import { ResponsiveContainer } from "recharts";

interface ChartWrapperProps {
  children: React.ReactNode;
  height?: number;
}

export function ChartWrapper({ children, height = 300 }: ChartWrapperProps) {
  return (
    <div style={{ height: height }}>
      <ResponsiveContainer width="100%" height="100%">
        {React.isValidElement(children) ? children : <div />}
      </ResponsiveContainer>
    </div>
  );
}