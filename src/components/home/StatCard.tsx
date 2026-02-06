import { ReactNode } from 'react';
import { Card } from '@/components/ui/card';
import { cn } from '@/lib/utils';

interface StatCardProps {
  icon: ReactNode;
  label: string;
  value: string | number;
  trend?: 'up' | 'down' | 'neutral';
  color?: 'primary' | 'success' | 'warning' | 'destructive';
}

export function StatCard({ icon, label, value, color = 'primary' }: StatCardProps) {
  const colorMap = {
    primary: 'bg-primary/10 text-primary border-primary/20',
    success: 'bg-success/10 text-success border-success/20',
    warning: 'bg-warning/10 text-warning border-warning/20',
    destructive: 'bg-destructive/10 text-destructive border-destructive/20',
  };

  return (
    <Card variant="default" className={cn(
      "p-4 flex flex-col items-center justify-center text-center group hover:scale-105 transition-transform duration-300",
      colorMap[color]
    )}>
      <div className={cn(
        "w-12 h-12 rounded-2xl flex items-center justify-center mb-3 transition-colors",
        "bg-white dark:bg-black/20 shadow-sm"
      )}>
        {icon}
      </div>
      <p className="text-xl font-bold text-foreground mb-0.5">{value}</p>
      <p className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground leading-tight">
        {label}
      </p>
    </Card>
  );
}
