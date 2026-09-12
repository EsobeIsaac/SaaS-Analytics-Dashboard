'use client';

import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from 'recharts';
import type { CustomerGrowthPoint } from '@/lib/types';
import { formatNumber } from '@/lib/format';

export function CustomerGrowthChart({ data }: { data: CustomerGrowthPoint[] }) {
  return (
    <ResponsiveContainer width="100%" height={300}>
      <AreaChart data={data} margin={{ top: 5, right: 10, left: 0, bottom: 0 }}>
        <defs>
          <linearGradient id="colorTotal" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="hsl(var(--chart-1))" stopOpacity={0.3} />
            <stop offset="95%" stopColor="hsl(var(--chart-1))" stopOpacity={0} />
          </linearGradient>
          <linearGradient id="colorNew" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="hsl(var(--chart-2))" stopOpacity={0.3} />
            <stop offset="95%" stopColor="hsl(var(--chart-2))" stopOpacity={0} />
          </linearGradient>
        </defs>
        <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" vertical={false} />
        <XAxis
          dataKey="month"
          tick={{ fontSize: 12, fill: 'hsl(var(--muted-foreground))' }}
          axisLine={false}
          tickLine={false}
        />
        <YAxis
          tickFormatter={(v) => formatNumber(v, true)}
          tick={{ fontSize: 12, fill: 'hsl(var(--muted-foreground))' }}
          axisLine={false}
          tickLine={false}
          width={50}
        />
        <Tooltip
          content={({ active, payload, label }) => {
            if (!active || !payload?.length) return null;
            return (
              <div className="rounded-lg border bg-background px-3 py-2 shadow-lg">
                <p className="mb-1.5 text-xs font-medium text-muted-foreground">{label}</p>
                {payload.map((entry) => (
                  <div key={entry.dataKey} className="flex items-center gap-2 text-sm">
                    <span className="h-2 w-2 rounded-full" style={{ backgroundColor: entry.color }} />
                    <span className="capitalize text-muted-foreground">{entry.name}:</span>
                    <span className="font-medium">{formatNumber(entry.value as number)}</span>
                  </div>
                ))}
              </div>
            );
          }}
        />
        <Legend wrapperStyle={{ fontSize: 12, paddingTop: 8 }} iconType="circle" />
        <Area
          type="monotone"
          dataKey="totalCustomers"
          stroke="hsl(var(--chart-1))"
          strokeWidth={2}
          fill="url(#colorTotal)"
          name="Total Customers"
        />
        <Area
          type="monotone"
          dataKey="newCustomers"
          stroke="hsl(var(--chart-2))"
          strokeWidth={2}
          fill="url(#colorNew)"
          name="New Customers"
        />
      </AreaChart>
    </ResponsiveContainer>
  );
}
