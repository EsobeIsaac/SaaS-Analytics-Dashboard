import { ScrollArea } from '@/components/ui/scroll-area';

interface Column<T> {
  key: string;
  header: string;
  className?: string;
  render: (row: T) => React.ReactNode;
}

interface DataTableProps<T> {
  columns: Column<T>[];
  data: T[];
  onRowClick?: (row: T) => void;
  emptyState?: React.ReactNode;
}

export function DataTable<T extends { id: string }>({
  columns,
  data,
  onRowClick,
  emptyState,
}: DataTableProps<T>) {
  return (
    <div className="overflow-x-auto scrollbar-thin">
      <table className="w-full caption-bottom text-sm">
        <thead>
          <tr className="border-b">
            {columns.map((col) => (
              <th
                key={col.key}
                className={`h-12 px-4 text-left align-middle text-xs font-medium uppercase tracking-wider text-muted-foreground ${col.className ?? ''}`}
              >
                {col.header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.length === 0 ? (
            <tr>
              <td colSpan={columns.length} className="p-0">
                {emptyState}
              </td>
            </tr>
          ) : (
            data.map((row) => (
              <tr
                key={row.id}
                onClick={() => onRowClick?.(row)}
                className={`border-b transition-colors last:border-0 ${
                  onRowClick
                    ? 'cursor-pointer hover:bg-muted/50'
                    : ''
                }`}
              >
                {columns.map((col) => (
                  <td
                    key={col.key}
                    className={`p-4 align-middle ${col.className ?? ''}`}
                  >
                    {col.render(row)}
                  </td>
                ))}
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}
