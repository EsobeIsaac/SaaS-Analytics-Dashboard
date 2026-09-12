'use client';

import { useState, useEffect, useMemo } from 'react';
import { PageHeader } from '@/components/shared/page-header';
import { StockStatusBadge } from '@/components/shared/status-badge';
import { EmptyState } from '@/components/shared/empty-state';
import { StatCardSkeleton } from '@/components/shared/loading-state';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Search, Package, AlertTriangle, Download } from 'lucide-react';
import { api } from '@/lib/api';
import type { Product, StockStatus } from '@/lib/types';
import { formatCurrency, formatNumber } from '@/lib/format';

const productIcons: Record<string, string> = {
  headphones: '🎧',
  watch: '⌚',
  hoodie: '👕',
  speaker: '🔊',
  mug: '☕',
  camera: '📷',
  yogamat: '🧘',
  keyboard: '⌨️',
  bottle: '🍶',
  shoes: '👟',
  charger: '🔌',
  backpack: '🎒',
};

export default function ProductsPage() {
  const [allProducts, setAllProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [categoryFilter, setCategoryFilter] = useState<string>('all');
  const [stockFilter, setStockFilter] = useState<StockStatus | 'all'>('all');

  useEffect(() => {
    api.getProducts().then((p) => {
      setAllProducts(p);
      setLoading(false);
    });
  }, []);

  const categories = useMemo(() => {
    return Array.from(new Set(allProducts.map((p) => p.category)));
  }, [allProducts]);

  const filtered = useMemo(() => {
    return allProducts.filter((p) => {
      const matchesSearch =
        p.name.toLowerCase().includes(search.toLowerCase()) ||
        p.sku.toLowerCase().includes(search.toLowerCase());
      const matchesCategory = categoryFilter === 'all' || p.category === categoryFilter;
      const matchesStock = stockFilter === 'all' || p.stockStatus === stockFilter;
      return matchesSearch && matchesCategory && matchesStock;
    });
  }, [allProducts, search, categoryFilter, stockFilter]);

  const lowStockCount = allProducts.filter((p) => p.stockStatus === 'low_stock').length;
  const outOfStockCount = allProducts.filter((p) => p.stockStatus === 'out_of_stock').length;

  return (
    <div className="space-y-6">
      <PageHeader title="Products" description="Manage your product catalog and inventory.">
        <Button variant="outline" size="sm">
          <Download className="mr-2 h-4 w-4" />
          Export
        </Button>
      </PageHeader>

      {(lowStockCount > 0 || outOfStockCount > 0) && !loading && (
        <div className="flex flex-wrap gap-3">
          {lowStockCount > 0 && (
            <div className="flex items-center gap-2 rounded-lg border border-warning/20 bg-warning/5 px-4 py-2.5 text-sm">
              <AlertTriangle className="h-4 w-4 text-warning" />
              <span className="text-warning font-medium">{lowStockCount} products</span>
              <span className="text-muted-foreground">running low on stock</span>
            </div>
          )}
          {outOfStockCount > 0 && (
            <div className="flex items-center gap-2 rounded-lg border border-destructive/20 bg-destructive/5 px-4 py-2.5 text-sm">
              <AlertTriangle className="h-4 w-4 text-destructive" />
              <span className="text-destructive font-medium">{outOfStockCount} products</span>
              <span className="text-muted-foreground">out of stock</span>
            </div>
          )}
        </div>
      )}

      <Card>
        <CardContent className="p-4 sm:p-6">
          <div className="mb-4 flex flex-col gap-3 lg:flex-row lg:items-center">
            <div className="relative flex-1">
              <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                placeholder="Search products..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="pl-9"
              />
            </div>
            <Select value={categoryFilter} onValueChange={setCategoryFilter}>
              <SelectTrigger className="w-full lg:w-[160px]">
                <SelectValue placeholder="Category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All categories</SelectItem>
                {categories.map((cat) => (
                  <SelectItem key={cat} value={cat}>{cat}</SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Select value={stockFilter} onValueChange={(v) => setStockFilter(v as StockStatus | 'all')}>
              <SelectTrigger className="w-full lg:w-[160px]">
                <SelectValue placeholder="Stock status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All stock</SelectItem>
                <SelectItem value="in_stock">In Stock</SelectItem>
                <SelectItem value="low_stock">Low Stock</SelectItem>
                <SelectItem value="out_of_stock">Out of Stock</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {loading ? (
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {Array.from({ length: 6 }).map((_, i) => <StatCardSkeleton key={i} />)}
            </div>
          ) : filtered.length === 0 ? (
            <EmptyState
              icon={Package}
              title="No products found"
              description="Try adjusting your search or filter criteria."
            />
          ) : (
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {filtered.map((p) => (
                <div key={p.id} className="rounded-lg border bg-card p-4 transition-shadow hover:shadow-md">
                  <div className="flex items-start gap-3">
                    <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-lg bg-muted text-2xl">
                      {productIcons[p.image] ?? '📦'}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="truncate font-medium">{p.name}</p>
                      <p className="text-xs text-muted-foreground">{p.sku}</p>
                      <div className="mt-1.5"><StockStatusBadge status={p.stockStatus} /></div>
                    </div>
                  </div>
                  <div className="mt-4 grid grid-cols-3 gap-2 border-t pt-3">
                    <div>
                      <p className="text-xs text-muted-foreground">Price</p>
                      <p className="text-sm font-medium">{formatCurrency(p.price)}</p>
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground">Stock</p>
                      <p className="text-sm font-medium">{formatNumber(p.stock)}</p>
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground">Sales</p>
                      <p className="text-sm font-medium">{formatNumber(p.sales)}</p>
                    </div>
                  </div>
                  <div className="mt-3">
                    <span className="inline-block rounded-md bg-muted px-2 py-1 text-xs text-muted-foreground">{p.category}</span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
