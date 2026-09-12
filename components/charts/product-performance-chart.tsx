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
import type { ProductPerformancePoint } from '@/lib/types';
import { formatCurrency, formatNumber } from '@/lib/format';

export function ProductPerformanceChart({ data }: { data: ProductPerformancePoint[] }) {
  return (
    <ResponsiveContainer width="100%" height={300}>
      <BarChart data={data} layout="vertical" margin={{ top: 5, right: 20, left: 10, bottom: 0 }}>
        <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" horizontal={false} />
        <XAxis
          type="number"
          tickFormatter={(v) => formatNumber(v, true)}
          tick={{ fontSize: 12, fill: 'hsl(var(--muted-foreground))' }}
          axisLine={false}
          tickLine={false}
        />
        <YAxis
          type="category"
          dataKey="name"
          tick={{ fontSize: 12, fill: 'hsl(var(--muted-foreground))' }}
          axisLine={false}
          tickLine={false}
          width={90}
        />
        <Tooltip
          cursor={{ fill: 'hsl(var(--muted))', opacity: 0.5 }}
          content={({ active, payload, label }) => {
            if (!active || !payload?.length) return null;
            return (
              <div className="rounded-lg border bg-background px-3 py-2 shadow-lg">
                <p className="mb-1 text-xs font-medium text-muted-foreground">{label}</p>
                <div className="flex items-center gap-2 text-sm">
                  <span className="h-2 w-2 rounded-full bg-primary" />
                  <span className="text-muted-foreground">Sales:</span>
                  <span className="font-medium">{formatNumber(payload[0].payload.sales)}</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <span className="h-2 w-2 rounded-full bg-success" />
                  <span className="text-muted-foreground">Revenue:</span>
                  <span className="font-medium">{formatCurrency(payload[0].payload.revenue, true)}</span>
                </div>
              </div>
            );
          }}
        />
        <Bar dataKey="sales" fill="hsl(var(--chart-1))" radius={[0, 4, 4, 0]} barSize={18} />
      </BarChart>
    </ResponsiveContainer>
  );
}
