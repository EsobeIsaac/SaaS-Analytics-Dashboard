import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';

interface ChartCardProps {
  title: string;
  description?: string;
  children: React.ReactNode;
  action?: React.ReactNode;
  className?: string;
}

export function ChartCard({ title, description, children, action, className }: ChartCardProps) {
  return (
    <Card className={className}>
      <CardHeader className="flex flex-row items-start justify-between space-y-0">
        <div>
          <CardTitle className="text-base font-semibold">{title}</CardTitle>
          {description && (
            <CardDescription className="mt-1">{description}</CardDescription>
          )}
        </div>
        {action}
      </CardHeader>
      <CardContent>{children}</CardContent>
    </Card>
  );
}
