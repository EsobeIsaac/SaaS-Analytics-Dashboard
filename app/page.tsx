'use client';

import { useState, useEffect } from 'react';
import { PageHeader } from '@/components/shared/page-header';
import { StatCard } from '@/components/shared/stat-card';
import { ChartCard } from '@/components/shared/chart-card';
import { DateRangeSelector } from '@/components/shared/date-range-selector';
import { TransactionStatusBadge } from '@/components/shared/status-badge';
import { StatCardSkeleton, ChartSkeleton, TableSkeleton } from '@/components/shared/loading-state';
import { RevenueChart } from '@/components/charts/revenue-chart';
import { SalesByCategoryChart } from '@/components/charts/sales-by-category-chart';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { api } from '@/lib/api';
import type { Stat, RevenuePoint, CategoryPoint, Transaction, DateRange } from '@/lib/types';
import { formatCurrency, formatDate } from '@/lib/format';
import { Download } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function OverviewPage() {
  const [stats, setStats] = useState<Stat[]>([]);
  const [revenueData, setRevenueData] = useState<RevenuePoint[]>([]);
  const [categoryData, setCategoryData] = useState<CategoryPoint[]>([]);
  const [recentTxns, setRecentTxns] = useState<Transaction[]>([]);
  const [loading, setLoading] = useState(true);
  const [dateRange, setDateRange] = useState<DateRange>('30d');

  useEffect(() => {
    setLoading(true);
    Promise.all([
      api.getStats(),
      api.getRevenueData(dateRange),
      api.getCategoryData(),
      api.getTransactions(),
    ]).then(([s, r, c, t]) => {
      setStats(s);
      setRevenueData(r);
      setCategoryData(c);
      setRecentTxns(t.slice(0, 6));
      setLoading(false);
    });
  }, [dateRange]);

  return (
    <div className="space-y-6">
      <PageHeader title="Overview" description="Welcome back, Alex. Here's what's happening with your store.">
        <Button variant="outline" size="sm">
          <Download className="mr-2 h-4 w-4" />
          Export
        </Button>
      </PageHeader>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {loading
          ? Array.from({ length: 4 }).map((_, i) => <StatCardSkeleton key={i} />)
          : stats.map((stat) => <StatCard key={stat.label} stat={stat} />)}
      </div>

      <div className="grid gap-4 lg:grid-cols-3">
        <div className="lg:col-span-2">
          {loading ? (
            <ChartSkeleton />
          ) : (
            <ChartCard
              title="Revenue Analytics"
              description="Revenue and sales over time"
              action={<DateRangeSelector value={dateRange} onChange={setDateRange} />}
            >
              <RevenueChart data={revenueData} />
            </ChartCard>
          )}
        </div>
        <div>
          {loading ? (
            <ChartSkeleton />
          ) : (
            <ChartCard title="Sales by Category" description="Top performing categories">
              <SalesByCategoryChart data={categoryData} />
            </ChartCard>
          )}
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="text-base font-semibold">Recent Transactions</CardTitle>
          <CardDescription>Latest customer orders across your store</CardDescription>
        </CardHeader>
        <CardContent>
          {loading ? (
            <TableSkeleton rows={6} />
          ) : (
            <div className="overflow-x-auto scrollbar-thin">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b">
                    <th className="h-10 px-4 text-left text-xs font-medium uppercase tracking-wider text-muted-foreground">Customer</th>
                    <th className="h-10 px-4 text-left text-xs font-medium uppercase tracking-wider text-muted-foreground">Product</th>
                    <th className="h-10 px-4 text-left text-xs font-medium uppercase tracking-wider text-muted-foreground">Amount</th>
                    <th className="h-10 px-4 text-left text-xs font-medium uppercase tracking-wider text-muted-foreground">Status</th>
                    <th className="h-10 px-4 text-left text-xs font-medium uppercase tracking-wider text-muted-foreground">Date</th>
                  </tr>
                </thead>
                <tbody>
                  {recentTxns.map((txn) => (
                    <tr key={txn.id} className="border-b transition-colors last:border-0 hover:bg-muted/50">
                      <td className="p-4">
                        <div className="flex items-center gap-2.5">
                          <Avatar className="h-8 w-8">
                            <AvatarFallback className="bg-primary/10 text-xs font-medium text-primary">
                              {txn.customerAvatar}
                            </AvatarFallback>
                          </Avatar>
                          <div>
                            <p className="font-medium leading-tight">{txn.customerName}</p>
                            <p className="text-xs text-muted-foreground">{txn.customerEmail}</p>
                          </div>
                        </div>
                      </td>
                      <td className="p-4 text-muted-foreground">{txn.product}</td>
                      <td className="p-4 font-medium">{formatCurrency(txn.amount)}</td>
                      <td className="p-4"><TransactionStatusBadge status={txn.status} /></td>
                      <td className="p-4 text-muted-foreground">{formatDate(txn.date)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
