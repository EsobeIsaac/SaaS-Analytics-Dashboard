import { Skeleton } from '@/components/ui/skeleton';
import { cn } from '@/lib/utils';

export function LoadingState({ className }: { className?: string }) {
  return (
    <div className={cn('space-y-3', className)}>
      <Skeleton className="h-4 w-3/4" />
      <Skeleton className="h-4 w-1/2" />
      <Skeleton className="h-4 w-2/3" />
    </div>
  );
}

export function StatCardSkeleton() {
  return (
    <div className="rounded-lg border bg-card p-5 sm:p-6">
      <div className="flex items-start justify-between">
        <Skeleton className="h-11 w-11 rounded-lg" />
        <Skeleton className="h-6 w-16 rounded-full" />
      </div>
      <div className="mt-4 space-y-2">
        <Skeleton className="h-4 w-24" />
        <Skeleton className="h-7 w-32" />
        <Skeleton className="h-3 w-28" />
      </div>
    </div>
  );
}

export function ChartSkeleton() {
  return (
    <div className="space-y-4">
      <div className="flex justify-between">
        <div className="space-y-2">
          <Skeleton className="h-5 w-32" />
          <Skeleton className="h-4 w-48" />
        </div>
        <Skeleton className="h-9 w-32 rounded-md" />
      </div>
      <Skeleton className="h-64 w-full rounded-md" />
    </div>
  );
}

export function TableSkeleton({ rows = 8 }: { rows?: number }) {
  return (
    <div className="space-y-3">
      <Skeleton className="h-10 w-full rounded-md" />
      {Array.from({ length: rows }).map((_, i) => (
        <Skeleton key={i} className="h-12 w-full rounded-md" />
      ))}
    </div>
  );
}
