'use client';

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';
import type { CategoryPoint } from '@/lib/types';
import { formatNumber } from '@/lib/format';

export function SalesByCategoryChart({ data }: { data: CategoryPoint[] }) {
  return (
    <ResponsiveContainer width="100%" height={300}>
      <BarChart data={data} margin={{ top: 5, right: 10, left: 0, bottom: 0 }}>
        <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" vertical={false} />
        <XAxis
          dataKey="category"
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
          cursor={{ fill: 'hsl(var(--muted))', opacity: 0.5 }}
          content={({ active, payload, label }) => {
            if (!active || !payload?.length) return null;
            return (
              <div className="rounded-lg border bg-background px-3 py-2 shadow-lg">
                <p className="mb-1 text-xs font-medium text-muted-foreground">{label}</p>
                <div className="flex items-center gap-2 text-sm">
                  <span
                    className="h-2 w-2 rounded-full"
                    style={{ backgroundColor: payload[0].payload.color }}
                  />
                  <span className="font-medium">{formatNumber(payload[0].value as number)} sales</span>
                </div>
              </div>
            );
          }}
        />
        <Bar dataKey="sales" radius={[6, 6, 0, 0]} fill="hsl(var(--chart-1))" barSize={40} />
      </BarChart>
    </ResponsiveContainer>
  );
}
