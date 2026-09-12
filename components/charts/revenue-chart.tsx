'use client';

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from 'recharts';
import type { RevenuePoint } from '@/lib/types';
import { formatCurrency, formatNumber, formatShortDate } from '@/lib/format';

interface RevenueChartProps {
  data: RevenuePoint[];
  showSales?: boolean;
}

export function RevenueChart({ data, showSales = true }: RevenueChartProps) {
  return (
    <ResponsiveContainer width="100%" height={300}>
      <LineChart data={data} margin={{ top: 5, right: 10, left: 0, bottom: 0 }}>
        <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" vertical={false} />
        <XAxis
          dataKey="date"
          tickFormatter={(v) => formatShortDate(v)}
          tick={{ fontSize: 12, fill: 'hsl(var(--muted-foreground))' }}
          axisLine={false}
          tickLine={false}
        />
        <YAxis
          tickFormatter={(v) => formatCurrency(v, true)}
          tick={{ fontSize: 12, fill: 'hsl(var(--muted-foreground))' }}
          axisLine={false}
          tickLine={false}
          width={60}
        />
        <Tooltip
          content={({ active, payload, label }) => {
            if (!active || !payload?.length) return null;
            return (
              <div className="rounded-lg border bg-background px-3 py-2 shadow-lg">
                <p className="mb-1.5 text-xs font-medium text-muted-foreground">
                  {formatShortDate(label)}
                </p>
                {payload.map((entry) => (
                  <div key={entry.dataKey} className="flex items-center gap-2 text-sm">
                    <span
                      className="h-2 w-2 rounded-full"
                      style={{ backgroundColor: entry.color }}
                    />
                    <span className="capitalize text-muted-foreground">{entry.name}:</span>
                    <span className="font-medium">
                      {entry.dataKey === 'revenue'
                        ? formatCurrency(entry.value as number)
                        : formatNumber(entry.value as number)}
                    </span>
                  </div>
                ))}
              </div>
            );
          }}
        />
        {showSales && (
          <Legend
            wrapperStyle={{ fontSize: 12, paddingTop: 8 }}
            iconType="circle"
          />
        )}
        <Line
          type="monotone"
          dataKey="revenue"
          stroke="hsl(var(--chart-1))"
          strokeWidth={2}
          dot={false}
          activeDot={{ r: 4 }}
          name="Revenue"
        />
        {showSales && (
          <Line
            type="monotone"
            dataKey="sales"
            stroke="hsl(var(--chart-2))"
            strokeWidth={2}
            dot={false}
            activeDot={{ r: 4 }}
            name="Sales"
          />
        )}
      </LineChart>
    </ResponsiveContainer>
  );
}
