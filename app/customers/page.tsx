'use client';

import { useState, useEffect, useMemo } from 'react';
import { PageHeader } from '@/components/shared/page-header';
import { CustomerStatusBadge } from '@/components/shared/status-badge';
import { EmptyState } from '@/components/shared/empty-state';
import { TableSkeleton } from '@/components/shared/loading-state';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog';
import { Search, Users, MapPin, Calendar, ShoppingBag, DollarSign } from 'lucide-react';
import { api } from '@/lib/api';
import type { Customer, CustomerStatus } from '@/lib/types';
import { formatCurrency, formatDate, formatNumber } from '@/lib/format';

export default function CustomersPage() {
  const [allCustomers, setAllCustomers] = useState<Customer[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState<CustomerStatus | 'all'>('all');
  const [selected, setSelected] = useState<Customer | null>(null);

  useEffect(() => {
    api.getCustomers().then((c) => {
      setAllCustomers(c);
      setLoading(false);
    });
  }, []);

  const filtered = useMemo(() => {
    return allCustomers.filter((c) => {
      const matchesSearch =
        c.name.toLowerCase().includes(search.toLowerCase()) ||
        c.email.toLowerCase().includes(search.toLowerCase());
      const matchesStatus = statusFilter === 'all' || c.status === statusFilter;
      return matchesSearch && matchesStatus;
    });
  }, [allCustomers, search, statusFilter]);

  return (
    <div className="space-y-6">
      <PageHeader title="Customers" description="Manage your customer relationships and track activity." />

      <Card>
        <CardContent className="p-4 sm:p-6">
          <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-center">
            <div className="relative flex-1">
              <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                placeholder="Search customers..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="pl-9"
              />
            </div>
            <Select value={statusFilter} onValueChange={(v) => setStatusFilter(v as CustomerStatus | 'all')}>
              <SelectTrigger className="w-full sm:w-[160px]">
                <SelectValue placeholder="Filter by status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All statuses</SelectItem>
                <SelectItem value="active">Active</SelectItem>
                <SelectItem value="inactive">Inactive</SelectItem>
                <SelectItem value="churned">Churned</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {loading ? (
            <TableSkeleton rows={10} />
          ) : filtered.length === 0 ? (
            <EmptyState
              icon={Users}
              title="No customers found"
              description="Try adjusting your search or filter criteria."
            />
          ) : (
            <div className="overflow-x-auto scrollbar-thin">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b">
                    <th className="h-10 px-4 text-left text-xs font-medium uppercase tracking-wider text-muted-foreground">Customer</th>
                    <th className="h-10 px-4 text-left text-xs font-medium uppercase tracking-wider text-muted-foreground">Status</th>
                    <th className="h-10 px-4 text-left text-xs font-medium uppercase tracking-wider text-muted-foreground">Orders</th>
                    <th className="h-10 px-4 text-left text-xs font-medium uppercase tracking-wider text-muted-foreground">Total Spending</th>
                    <th className="h-10 px-4 text-left text-xs font-medium uppercase tracking-wider text-muted-foreground">Location</th>
                    <th className="h-10 px-4 text-left text-xs font-medium uppercase tracking-wider text-muted-foreground">Joined</th>
                  </tr>
                </thead>
                <tbody>
                  {filtered.map((c) => (
                    <tr
                      key={c.id}
                      onClick={() => setSelected(c)}
                      className="cursor-pointer border-b transition-colors last:border-0 hover:bg-muted/50"
                    >
                      <td className="p-4">
                        <div className="flex items-center gap-2.5">
                          <Avatar className="h-8 w-8">
                            <AvatarFallback className="bg-primary/10 text-xs font-medium text-primary">
                              {c.avatar}
                            </AvatarFallback>
                          </Avatar>
                          <div>
                            <p className="font-medium leading-tight">{c.name}</p>
                            <p className="text-xs text-muted-foreground">{c.email}</p>
                          </div>
                        </div>
                      </td>
                      <td className="p-4"><CustomerStatusBadge status={c.status} /></td>
                      <td className="p-4 text-muted-foreground">{formatNumber(c.orders)}</td>
                      <td className="p-4 font-medium">{formatCurrency(c.totalSpending)}</td>
                      <td className="p-4 text-muted-foreground">{c.location}</td>
                      <td className="p-4 text-muted-foreground">{formatDate(c.joinedDate)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </CardContent>
      </Card>

      <Dialog open={!!selected} onOpenChange={(open) => !open && setSelected(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Customer Details</DialogTitle>
            <DialogDescription>{selected?.id}</DialogDescription>
          </DialogHeader>
          {selected && (
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <Avatar className="h-14 w-14">
                  <AvatarFallback className="bg-primary/10 text-lg font-medium text-primary">
                    {selected.avatar}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <p className="text-base font-medium">{selected.name}</p>
                  <p className="text-sm text-muted-foreground">{selected.email}</p>
                  <div className="mt-1"><CustomerStatusBadge status={selected.status} /></div>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4 rounded-lg border p-4">
                <div className="flex items-center gap-2">
                  <ShoppingBag className="h-4 w-4 text-muted-foreground" />
                  <div>
                    <p className="text-xs text-muted-foreground">Orders</p>
                    <p className="text-sm font-medium">{formatNumber(selected.orders)}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <DollarSign className="h-4 w-4 text-muted-foreground" />
                  <div>
                    <p className="text-xs text-muted-foreground">Total Spending</p>
                    <p className="text-sm font-medium">{formatCurrency(selected.totalSpending)}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <MapPin className="h-4 w-4 text-muted-foreground" />
                  <div>
                    <p className="text-xs text-muted-foreground">Location</p>
                    <p className="text-sm font-medium">{selected.location}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Calendar className="h-4 w-4 text-muted-foreground" />
                  <div>
                    <p className="text-xs text-muted-foreground">Joined</p>
                    <p className="text-sm font-medium">{formatDate(selected.joinedDate)}</p>
                  </div>
                </div>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
