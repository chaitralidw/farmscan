import { ChevronRight, AlertCircle, AlertTriangle } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Disease } from '@/types/disease';
import { useLanguage } from '@/contexts/LanguageContext';
import { cn } from '@/lib/utils';

interface DiseaseCardProps {
  disease: Disease;
  onClick?: () => void;
}

export function DiseaseCard({ disease, onClick }: DiseaseCardProps) {
  const { language, t } = useLanguage();

  const getSeverityConfig = () => {
    switch (disease.severity) {
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

  const { icon: SeverityIcon, color, label } = getSeverityConfig();
  const cropEmoji = disease.crop === 'tomato' ? '🍅' : disease.crop === 'potato' ? '🥔' : '🌶️';

  return (
    <Card 
      variant="interactive" 
      className="p-4 border-white/40 shadow-[0_8px_30px_rgb(0,0,0,0.04)]"
      onClick={onClick}
    >
      <div className="flex items-center gap-4">
        <div className="w-14 h-14 rounded-2xl bg-muted/30 border border-border/50 flex items-center justify-center text-3xl shadow-inner group-hover:scale-110 transition-transform duration-500">
          {cropEmoji}
        </div>
        
        <div className="flex-1 min-w-0">
          <h3 className="font-bold text-foreground truncate tracking-tight">
            {language === 'hi' ? disease.nameHindi : disease.name}
          </h3>
          <p className="text-[10px] font-bold text-muted-foreground/60 uppercase tracking-widest mt-0.5">{disease.crop}</p>
        </div>

        <div className="flex flex-col items-end gap-2">
          <Badge variant="outline" className={cn("px-2 py-0.5 rounded-lg border-0 font-bold text-[10px] uppercase tracking-wider", color)}>
            <SeverityIcon className="w-3 h-3 mr-1" />
            {label}
          </Badge>
          <ChevronRight className="w-4 h-4 text-muted-foreground/50" />
        </div>
      </div>
    </Card>
  );
}
