import { cn } from '@/lib/utils';
import type { TransactionStatus, CustomerStatus, StockStatus } from '@/lib/types';

const transactionStyles: Record<TransactionStatus, string> = {
  completed: 'bg-success/10 text-success border-success/20',
  pending: 'bg-warning/10 text-warning border-warning/20',
  failed: 'bg-destructive/10 text-destructive border-destructive/20',
};

const customerStyles: Record<CustomerStatus, string> = {
  active: 'bg-success/10 text-success border-success/20',
  inactive: 'bg-muted text-muted-foreground border-border',
  churned: 'bg-destructive/10 text-destructive border-destructive/20',
};

const stockStyles: Record<StockStatus, string> = {
  in_stock: 'bg-success/10 text-success border-success/20',
  low_stock: 'bg-warning/10 text-warning border-warning/20',
  out_of_stock: 'bg-destructive/10 text-destructive border-destructive/20',
};

const stockLabels: Record<StockStatus, string> = {
  in_stock: 'In Stock',
  low_stock: 'Low Stock',
  out_of_stock: 'Out of Stock',
};

export function TransactionStatusBadge({ status }: { status: TransactionStatus }) {
  return (
    <span
      className={cn(
        'inline-flex items-center gap-1.5 rounded-full border px-2.5 py-0.5 text-xs font-medium capitalize',
        transactionStyles[status]
      )}
    >
      <span className={cn('h-1.5 w-1.5 rounded-full', {
        'bg-success': status === 'completed',
        'bg-warning': status === 'pending',
        'bg-destructive': status === 'failed',
      })} />
      {status}
    </span>
  );
}

export function CustomerStatusBadge({ status }: { status: CustomerStatus }) {
  return (
    <span
      className={cn(
        'inline-flex items-center gap-1.5 rounded-full border px-2.5 py-0.5 text-xs font-medium capitalize',
        customerStyles[status]
      )}
    >
      <span className={cn('h-1.5 w-1.5 rounded-full', {
        'bg-success': status === 'active',
        'bg-muted-foreground': status === 'inactive',
        'bg-destructive': status === 'churned',
      })} />
      {status}
    </span>
  );
}

export function StockStatusBadge({ status }: { status: StockStatus }) {
  return (
    <span
      className={cn(
        'inline-flex items-center gap-1.5 rounded-full border px-2.5 py-0.5 text-xs font-medium',
        stockStyles[status]
      )}
    >
      <span className={cn('h-1.5 w-1.5 rounded-full', {
        'bg-success': status === 'in_stock',
        'bg-warning': status === 'low_stock',
        'bg-destructive': status === 'out_of_stock',
      })} />
      {stockLabels[status]}
    </span>
  );
}
