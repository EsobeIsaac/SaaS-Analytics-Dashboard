'use client';

import { useState, useEffect } from 'react';
import { PageHeader } from '@/components/shared/page-header';
import { ChartCard } from '@/components/shared/chart-card';
import { DateRangeSelector } from '@/components/shared/date-range-selector';
import { ChartSkeleton, StatCardSkeleton } from '@/components/shared/loading-state';
import { RevenueAreaChart } from '@/components/charts/revenue-area-chart';
import { SalesChart } from '@/components/charts/sales-chart';
import { CustomerGrowthChart } from '@/components/charts/customer-growth-chart';
import { ProductPerformanceChart } from '@/components/charts/product-performance-chart';
import { Card, CardContent } from '@/components/ui/card';
import { api } from '@/lib/api';
import type { RevenuePoint, CustomerGrowthPoint, ProductPerformancePoint, DateRange, Stat } from '@/lib/types';
import { formatCurrency, formatNumber, formatPercent } from '@/lib/format';
import { DollarSign, ShoppingCart, Users, TrendingUp, ArrowUpRight } from 'lucide-react';

interface SummaryStat {
  label: string;
  value: string;
  change: string;
  icon: React.ComponentType<{ className?: string }>;
}

export default function AnalyticsPage() {
  const [revenueData, setRevenueData] = useState<RevenuePoint[]>([]);
  const [growthData, setGrowthData] = useState<CustomerGrowthPoint[]>([]);
  const [perfData, setPerfData] = useState<ProductPerformancePoint[]>([]);
  const [loading, setLoading] = useState(true);
  const [dateRange, setDateRange] = useState<DateRange>('30d');

  useEffect(() => {
    setLoading(true);
    Promise.all([
      api.getRevenueData(dateRange),
      api.getCustomerGrowth(),
      api.getProductPerformance(),
    ]).then(([r, g, p]) => {
      setRevenueData(r);
      setGrowthData(g);
      setPerfData(p);
      setLoading(false);
    });
  }, [dateRange]);

  const totalRevenue = revenueData.reduce((sum, d) => sum + d.revenue, 0);
  const totalSales = revenueData.reduce((sum, d) => sum + d.sales, 0);
  const avgOrderValue = totalSales > 0 ? totalRevenue / totalSales : 0;
  const totalNewCustomers = growthData.reduce((sum, d) => sum + d.newCustomers, 0);

  const summaryStats: SummaryStat[] = [
    { label: 'Total Revenue', value: formatCurrency(totalRevenue, true), change: '+14.6%', icon: DollarSign },
    { label: 'Total Sales', value: formatNumber(totalSales), change: '+13.5%', icon: ShoppingCart },
    { label: 'Avg Order Value', value: formatCurrency(avgOrderValue), change: '+2.1%', icon: TrendingUp },
    { label: 'New Customers', value: formatNumber(totalNewCustomers), change: '+8.9%', icon: Users },
  ];

  return (
    <div className="space-y-6">
      <PageHeader title="Analytics" description="Deep dive into your store's performance metrics.">
        <DateRangeSelector value={dateRange} onChange={setDateRange} />
      </PageHeader>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {loading
          ? Array.from({ length: 4 }).map((_, i) => <StatCardSkeleton key={i} />)
          : summaryStats.map((stat) => (
              <Card key={stat.label}>
                <CardContent className="p-5">
                  <div className="flex items-center justify-between">
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                      <stat.icon className="h-5 w-5 text-primary" />
                    </div>
                    <span className="flex items-center gap-0.5 text-xs font-medium text-success">
                      <ArrowUpRight className="h-3 w-3" />
                      {stat.change}
                    </span>
                  </div>
                  <p className="mt-3 text-sm text-muted-foreground">{stat.label}</p>
                  <p className="mt-1 text-xl font-semibold">{stat.value}</p>
                </CardContent>
              </Card>
            ))}
      </div>

      <div className="grid gap-4 lg:grid-cols-2">
        {loading ? <ChartSkeleton /> : (
          <ChartCard title="Revenue Trend" description="Revenue over the selected period">
            <RevenueAreaChart data={revenueData} />
          </ChartCard>
        )}
        {loading ? <ChartSkeleton /> : (
          <ChartCard title="Sales Volume" description="Number of sales over time">
            <SalesChart data={revenueData} />
          </ChartCard>
        )}
      </div>

      <div className="grid gap-4 lg:grid-cols-2">
        {loading ? <ChartSkeleton /> : (
          <ChartCard title="Customer Growth" description="Monthly new vs total customers">
            <CustomerGrowthChart data={growthData} />
          </ChartCard>
        )}
        {loading ? <ChartSkeleton /> : (
          <ChartCard title="Product Performance" description="Top products by sales volume">
            <ProductPerformanceChart data={perfData} />
          </ChartCard>
        )}
      </div>
    </div>
  );
}
