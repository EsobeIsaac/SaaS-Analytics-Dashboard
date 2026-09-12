import { DollarSign, ShoppingCart, Users, TrendingUp, ArrowUpRight, ArrowDownRight } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import type { Stat } from '@/lib/types';
import { formatCurrency, formatNumber, formatPercent } from '@/lib/format';
import { cn } from '@/lib/utils';

const iconMap = {
  revenue: DollarSign,
  sales: ShoppingCart,
  customers: Users,
  conversion: TrendingUp,
} as const;

function formatValue(stat: Stat): string {
  switch (stat.format) {
    case 'currency':
      return formatCurrency(stat.value, true);
    case 'number':
      return formatNumber(stat.value, true);
    case 'percent':
      return formatPercent(stat.value);
  }
}

function formatPrevValue(stat: Stat): string {
  switch (stat.format) {
    case 'currency':
      return formatCurrency(stat.previousValue, true);
    case 'number':
      return formatNumber(stat.previousValue, true);
    case 'percent':
      return formatPercent(stat.previousValue);
  }
}

export function StatCard({ stat }: { stat: Stat }) {
  const Icon = iconMap[stat.icon];
  const isPositive = stat.changePercent >= 0;

  return (
    <Card className="transition-shadow hover:shadow-md">
      <CardContent className="p-5 sm:p-6">
        <div className="flex items-start justify-between">
          <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-primary/10">
            <Icon className="h-5 w-5 text-primary" />
          </div>
          <span
            className={cn(
              'flex items-center gap-0.5 rounded-full px-2 py-1 text-xs font-medium',
              isPositive
                ? 'bg-success/10 text-success'
                : 'bg-destructive/10 text-destructive'
            )}
          >
            {isPositive ? (
              <ArrowUpRight className="h-3 w-3" />
            ) : (
              <ArrowDownRight className="h-3 w-3" />
            )}
            {Math.abs(stat.changePercent).toFixed(1)}%
          </span>
        </div>
        <div className="mt-4">
          <p className="text-sm text-muted-foreground">{stat.label}</p>
          <p className="mt-1 text-2xl font-semibold tracking-tight">
            {formatValue(stat)}
          </p>
          <p className="mt-2 text-xs text-muted-foreground">
            vs {formatPrevValue(stat)} last period
          </p>
        </div>
      </CardContent>
    </Card>
  );
}
