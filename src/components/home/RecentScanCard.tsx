import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ScanResult } from '@/types/disease';
import { useLanguage } from '@/contexts/LanguageContext';
import { format } from 'date-fns';
import { CheckCircle, AlertTriangle, AlertCircle } from 'lucide-react';
import { cn } from '@/lib/utils';

interface RecentScanCardProps {
  scan: ScanResult;
  onClick?: () => void;
}

export function RecentScanCard({ scan, onClick }: RecentScanCardProps) {
  const { language, t } = useLanguage();

  const getSeverityConfig = () => {
    if (scan.isHealthy) {
      return {
        icon: CheckCircle,
        color: 'bg-success/10 text-success border-success/30',
        label: t('result.healthy'),
      };
    }
    
    switch (scan.disease?.severity) {
      case 'high':
        return {
          icon: AlertCircle,
          color: 'bg-destructive/10 text-destructive border-destructive/30',
          label: t('severity.high'),
        };
      case 'medium':
        return {
          icon: AlertTriangle,
          color: 'bg-warning/10 text-warning border-warning/30',
          label: t('severity.medium'),
        };
      default:
        return {
          icon: AlertTriangle,
          color: 'bg-muted text-muted-foreground border-muted',
          label: t('severity.low'),
        };
    }
  };

  const { icon: StatusIcon, color, label } = getSeverityConfig();

  return (
    <Card 
      variant="interactive" 
      className="group flex items-center gap-4 p-4 border-white/40 shadow-[0_8px_30px_rgb(0,0,0,0.04)]"
      onClick={onClick}
    >
      <div className="w-20 h-20 rounded-2xl overflow-hidden bg-muted flex-shrink-0 shadow-inner group-hover:scale-105 transition-transform duration-500">
        <img 
          src={scan.imageUrl} 
          alt="Scan result" 
          className="w-full h-full object-cover"
        />
      </div>
      
      <div className="flex-1 min-w-0 py-1">
        <div className="flex items-center gap-2 mb-1.5">
          <span className="text-xl leading-none readable">{scan.crop === 'tomato' ? '🍅' : scan.crop === 'potato' ? '🥔' : '🌶️'}</span>
          <h3 className="font-bold text-foreground truncate tracking-tight readable">
            {scan.isHealthy 
              ? t('result.healthy')
              : language === 'hi' 
                ? scan.disease?.nameHindi 
                : scan.disease?.name
            }
          </h3>
        </div>
        
        <div className="flex flex-col gap-2">
          <Badge variant="outline" className={cn("w-fit px-2 py-0.5 rounded-lg border-0 font-bold text-[10px] uppercase tracking-wider", color)}>
            <StatusIcon className="w-3 h-3 mr-1" />
            {label}
          </Badge>
          <span className="text-[10px] font-semibold text-muted-foreground/60 uppercase tracking-widest">
            {format(scan.timestamp, 'MMM d • h:mm a')}
          </span>
        </div>
      </div>
      
      <div className="text-right flex flex-col items-end">
        <div className="bg-primary/5 rounded-2xl p-2 border border-primary/10">
          <p className="text-sm font-black text-primary leading-none mb-0.5">{Math.round(scan.confidence * 100)}%</p>
          <p className="text-[10px] font-bold text-primary/60 uppercase tracking-tighter leading-none">{t('result.confidence')}</p>
        </div>
      </div>
    </Card>
  );
}
