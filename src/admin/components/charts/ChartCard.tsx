import { ReactNode } from 'react';
import { Card, CardHeader, CardTitle } from '../ui/Card';

interface ChartCardProps {
  title: string;
  subtitle?: string;
  children: ReactNode;
  className?: string;
}

export function ChartCard({ title, subtitle, children, className }: ChartCardProps) {
  return (
    <Card className={className}>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        {subtitle && (
          <p className="text-sm text-slate-500 dark:text-slate-400">{subtitle}</p>
        )}
      </CardHeader>
      <div className="h-[280px]">{children}</div>
    </Card>
  );
}