'use client';

import { useState, useEffect, useMemo } from 'react';
import { PageHeader } from '@/components/shared/page-header';
import { TransactionStatusBadge } from '@/components/shared/status-badge';
import { EmptyState } from '@/components/shared/empty-state';
import { TableSkeleton } from '@/components/shared/loading-state';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
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
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog';
import { Search, Download, CreditCard, ChevronLeft, ChevronRight } from 'lucide-react';
import { api } from '@/lib/api';
import type { Transaction, TransactionStatus } from '@/lib/types';
import { formatCurrency, formatDate } from '@/lib/format';

const PAGE_SIZE = 8;

export default function TransactionsPage() {
  const [allTxns, setAllTxns] = useState<Transaction[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState<TransactionStatus | 'all'>('all');
  const [page, setPage] = useState(0);
  const [selected, setSelected] = useState<Transaction | null>(null);

  useEffect(() => {
    api.getTransactions().then((t) => {
      setAllTxns(t);
      setLoading(false);
    });
  }, []);

  const filtered = useMemo(() => {
    return allTxns.filter((t) => {
      const matchesSearch =
        t.customerName.toLowerCase().includes(search.toLowerCase()) ||
        t.product.toLowerCase().includes(search.toLowerCase()) ||
        t.id.toLowerCase().includes(search.toLowerCase());
      const matchesStatus = statusFilter === 'all' || t.status === statusFilter;
      return matchesSearch && matchesStatus;
    });
  }, [allTxns, search, statusFilter]);

  const paginated = filtered.slice(page * PAGE_SIZE, (page + 1) * PAGE_SIZE);
  const totalPages = Math.ceil(filtered.length / PAGE_SIZE);

  const handleSearchChange = (v: string) => {
    setSearch(v);
    setPage(0);
  };

  const handleStatusChange = (v: string) => {
    setStatusFilter(v as TransactionStatus | 'all');
    setPage(0);
  };

  return (
    <div className="space-y-6">
      <PageHeader title="Transactions" description="View and manage all customer transactions.">
        <Button variant="outline" size="sm">
          <Download className="mr-2 h-4 w-4" />
          Export
        </Button>
      </PageHeader>

      <Card>
        <CardContent className="p-4 sm:p-6">
          <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-center">
            <div className="relative flex-1">
              <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                placeholder="Search by customer, product, or ID..."
                value={search}
                onChange={(e) => handleSearchChange(e.target.value)}
                className="pl-9"
              />
            </div>
            <Select value={statusFilter} onValueChange={handleStatusChange}>
              <SelectTrigger className="w-full sm:w-[160px]">
                <SelectValue placeholder="Filter by status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All statuses</SelectItem>
                <SelectItem value="completed">Completed</SelectItem>
                <SelectItem value="pending">Pending</SelectItem>
                <SelectItem value="failed">Failed</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {loading ? (
            <TableSkeleton rows={8} />
          ) : filtered.length === 0 ? (
            <EmptyState
              icon={CreditCard}
              title="No transactions found"
              description="Try adjusting your search or filter criteria."
            />
          ) : (
            <>
              <div className="overflow-x-auto scrollbar-thin">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b">
                      <th className="h-10 px-4 text-left text-xs font-medium uppercase tracking-wider text-muted-foreground">Transaction ID</th>
                      <th className="h-10 px-4 text-left text-xs font-medium uppercase tracking-wider text-muted-foreground">Customer</th>
                      <th className="h-10 px-4 text-left text-xs font-medium uppercase tracking-wider text-muted-foreground">Product</th>
                      <th className="h-10 px-4 text-left text-xs font-medium uppercase tracking-wider text-muted-foreground">Amount</th>
                      <th className="h-10 px-4 text-left text-xs font-medium uppercase tracking-wider text-muted-foreground">Status</th>
                      <th className="h-10 px-4 text-left text-xs font-medium uppercase tracking-wider text-muted-foreground">Date</th>
                    </tr>
                  </thead>
                  <tbody>
                    {paginated.map((txn) => (
                      <tr
                        key={txn.id}
                        onClick={() => setSelected(txn)}
                        className="cursor-pointer border-b transition-colors last:border-0 hover:bg-muted/50"
                      >
                        <td className="p-4 font-mono text-xs text-muted-foreground">{txn.id}</td>
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

              <div className="mt-4 flex items-center justify-between">
                <p className="text-sm text-muted-foreground">
                  Showing {page * PAGE_SIZE + 1}–{Math.min((page + 1) * PAGE_SIZE, filtered.length)} of {filtered.length}
                </p>
                <div className="flex items-center gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setPage((p) => Math.max(0, p - 1))}
                    disabled={page === 0}
                  >
                    <ChevronLeft className="h-4 w-4" />
                    Previous
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setPage((p) => Math.min(totalPages - 1, p + 1))}
                    disabled={page >= totalPages - 1}
                  >
                    Next
                    <ChevronRight className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </>
          )}
        </CardContent>
      </Card>

      <Dialog open={!!selected} onOpenChange={(open) => !open && setSelected(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Transaction Details</DialogTitle>
            <DialogDescription>{selected?.id}</DialogDescription>
          </DialogHeader>
          {selected && (
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <Avatar className="h-12 w-12">
                  <AvatarFallback className="bg-primary/10 font-medium text-primary">
                    {selected.customerAvatar}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <p className="font-medium">{selected.customerName}</p>
                  <p className="text-sm text-muted-foreground">{selected.customerEmail}</p>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4 rounded-lg border p-4">
                <div>
                  <p className="text-xs text-muted-foreground">Product</p>
                  <p className="mt-1 text-sm font-medium">{selected.product}</p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">Amount</p>
                  <p className="mt-1 text-sm font-medium">{formatCurrency(selected.amount)}</p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">Status</p>
                  <div className="mt-1"><TransactionStatusBadge status={selected.status} /></div>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">Date</p>
                  <p className="mt-1 text-sm font-medium">{formatDate(selected.date)}</p>
                </div>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
