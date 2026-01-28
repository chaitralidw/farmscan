import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ScanResult } from '@/types/disease';
import { useLanguage } from '@/contexts/LanguageContext';
import { format } from 'date-fns';
import { CheckCircle, AlertTriangle, AlertCircle } from 'lucide-react';

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
      className="flex items-center gap-3 p-3"
      onClick={onClick}
    >
      <div className="w-16 h-16 rounded-xl overflow-hidden bg-muted flex-shrink-0">
        <img 
          src={scan.imageUrl} 
          alt="Scan result" 
          className="w-full h-full object-cover"
        />
      </div>
      
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 mb-1">
          <span className="text-lg">{scan.crop === 'tomato' ? '🍅' : scan.crop === 'potato' ? '🥔' : '🌶️'}</span>
          <h3 className="font-semibold text-foreground truncate">
            {scan.isHealthy 
              ? t('result.healthy')
              : language === 'hi' 
                ? scan.disease?.nameHindi 
                : scan.disease?.name
            }
          </h3>
        </div>
        
        <div className="flex items-center gap-2">
          <Badge variant="outline" className={color}>
            <StatusIcon className="w-3 h-3 mr-1" />
            {label}
          </Badge>
          <span className="text-xs text-muted-foreground">
            {format(scan.timestamp, 'MMM d, h:mm a')}
          </span>
        </div>
      </div>
      
      <div className="text-right">
        <p className="text-sm font-semibold text-foreground">{Math.round(scan.confidence * 100)}%</p>
        <p className="text-xs text-muted-foreground">{t('result.confidence')}</p>
      </div>
    </Card>
  );
}
