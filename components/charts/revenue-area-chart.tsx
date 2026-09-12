'use client';

import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';
import type { RevenuePoint } from '@/lib/types';
import { formatCurrency, formatShortDate } from '@/lib/format';

export function RevenueAreaChart({ data }: { data: RevenuePoint[] }) {
  return (
    <ResponsiveContainer width="100%" height={300}>
      <AreaChart data={data} margin={{ top: 5, right: 10, left: 0, bottom: 0 }}>
        <defs>
          <linearGradient id="colorRevenueArea" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="hsl(var(--chart-1))" stopOpacity={0.3} />
            <stop offset="95%" stopColor="hsl(var(--chart-1))" stopOpacity={0} />
          </linearGradient>
        </defs>
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
                <div className="flex items-center gap-2 text-sm">
                  <span className="h-2 w-2 rounded-full bg-primary" />
                  <span className="text-muted-foreground">Revenue:</span>
                  <span className="font-medium">{formatCurrency(payload[0].value as number)}</span>
                </div>
              </div>
            );
          }}
        />
        <Area
          type="monotone"
          dataKey="revenue"
          stroke="hsl(var(--chart-1))"
          strokeWidth={2}
          fill="url(#colorRevenueArea)"
        />
      </AreaChart>
    </ResponsiveContainer>
  );
}
