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
      className="p-4"
      onClick={onClick}
    >
      <div className="flex items-center gap-3">
        <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-muted to-secondary flex items-center justify-center text-2xl">
          {cropEmoji}
        </div>
        
        <div className="flex-1 min-w-0">
          <h3 className="font-semibold text-foreground truncate">
            {language === 'hi' ? disease.nameHindi : disease.name}
          </h3>
          <p className="text-sm text-muted-foreground capitalize">{disease.crop}</p>
        </div>

        <Badge variant="outline" className={cn(color, "flex-shrink-0")}>
          <SeverityIcon className="w-3 h-3 mr-1" />
          {label}
        </Badge>

        <ChevronRight className="w-5 h-5 text-muted-foreground flex-shrink-0" />
      </div>
    </Card>
  );
}
