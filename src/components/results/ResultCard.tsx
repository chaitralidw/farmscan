import { CheckCircle, AlertTriangle, AlertCircle, ChevronDown } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Disease } from '@/types/disease';
import { useLanguage } from '@/contexts/LanguageContext';
import { cn } from '@/lib/utils';

interface ResultCardProps {
  disease: Disease | null;
  confidence: number;
  isHealthy: boolean;
  imageUrl: string;
}

export function ResultCard({ disease, confidence, isHealthy, imageUrl }: ResultCardProps) {
  const { language, t } = useLanguage();

  const getStatusConfig = () => {
    if (isHealthy) {
      return {
        icon: CheckCircle,
        variant: 'success' as const,
        color: 'text-success',
        bgColor: 'bg-success/10',
        borderColor: 'border-success/30',
      };
    }
    
    switch (disease?.severity) {
      case 'high':
        return {
          icon: AlertCircle,
          variant: 'danger' as const,
          color: 'text-destructive',
          bgColor: 'bg-destructive/10',
          borderColor: 'border-destructive/30',
        };
      case 'medium':
        return {
          icon: AlertTriangle,
          variant: 'warning' as const,
          color: 'text-warning',
          bgColor: 'bg-warning/10',
          borderColor: 'border-warning/30',
        };
      default:
        return {
          icon: AlertTriangle,
          variant: 'default' as const,
          color: 'text-muted-foreground',
          bgColor: 'bg-muted',
          borderColor: 'border-border',
        };
    }
  };

  const { icon: StatusIcon, variant, color, bgColor, borderColor } = getStatusConfig();

  const confidencePercent = Math.round(confidence * 100);

  return (
    <div className="space-y-4 animate-slide-up">
      {/* Main Result Card */}
      <Card variant={variant} className="overflow-hidden">
        <div className="relative">
          <img 
            src={imageUrl} 
            alt="Scanned leaf" 
            className="w-full h-48 object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-card via-transparent to-transparent" />
          <div className={cn(
            "absolute bottom-4 left-4 right-4 flex items-center gap-3 p-3 rounded-xl",
            bgColor,
            borderColor,
            "border backdrop-blur-sm"
          )}>
            <StatusIcon className={cn("w-8 h-8", color)} />
            <div className="flex-1">
              <h2 className="text-lg font-bold text-foreground">
                {isHealthy 
                  ? t('result.healthy')
                  : language === 'hi' 
                    ? disease?.nameHindi 
                    : disease?.name
                }
              </h2>
              {!isHealthy && (
                <p className="text-sm text-muted-foreground">
                  {disease?.crop && (
                    <span className="capitalize">{disease.crop}</span>
                  )}
                </p>
              )}
            </div>
          </div>
        </div>

        <CardContent className="pt-4">
          {/* Confidence Score */}
          <div className="mb-4">
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm font-medium text-muted-foreground">
                {t('result.confidence')}
              </span>
              <span className={cn("text-lg font-bold", color)}>
                {confidencePercent}%
              </span>
            </div>
            <Progress 
              value={confidencePercent} 
              className="h-2"
            />
          </div>

          {/* Description */}
          <p className="text-sm text-muted-foreground">
            {disease?.description || (isHealthy && "Your plant appears to be healthy! No diseases detected.")}
          </p>
        </CardContent>
      </Card>

      {/* Details Accordion */}
      {disease && !isHealthy && (
        <Card variant="elevated">
          <Accordion type="multiple" className="w-full">
            {disease.symptoms.length > 0 && (
              <AccordionItem value="symptoms" className="border-b-0">
                <AccordionTrigger className="px-4 py-3 hover:no-underline">
                  <span className="text-sm font-semibold">{t('result.symptoms')}</span>
                </AccordionTrigger>
                <AccordionContent className="px-4 pb-4">
                  <ul className="space-y-2">
                    {disease.symptoms.map((symptom, index) => (
                      <li key={index} className="flex items-start gap-2 text-sm text-muted-foreground">
                        <span className="w-1.5 h-1.5 rounded-full bg-destructive mt-2" />
                        {symptom}
                      </li>
                    ))}
                  </ul>
                </AccordionContent>
              </AccordionItem>
            )}

            {disease.treatment.length > 0 && (
              <AccordionItem value="treatment" className="border-b-0">
                <AccordionTrigger className="px-4 py-3 hover:no-underline">
                  <span className="text-sm font-semibold">{t('result.treatment')}</span>
                </AccordionTrigger>
                <AccordionContent className="px-4 pb-4">
                  <ul className="space-y-2">
                    {disease.treatment.map((step, index) => (
                      <li key={index} className="flex items-start gap-2 text-sm text-muted-foreground">
                        <span className="w-5 h-5 rounded-full bg-primary/10 text-primary text-xs flex items-center justify-center flex-shrink-0 mt-0.5">
                          {index + 1}
                        </span>
                        {step}
                      </li>
                    ))}
                  </ul>
                </AccordionContent>
              </AccordionItem>
            )}

            {disease.prevention.length > 0 && (
              <AccordionItem value="prevention" className="border-b-0">
                <AccordionTrigger className="px-4 py-3 hover:no-underline">
                  <span className="text-sm font-semibold">{t('result.prevention')}</span>
                </AccordionTrigger>
                <AccordionContent className="px-4 pb-4">
                  <ul className="space-y-2">
                    {disease.prevention.map((tip, index) => (
                      <li key={index} className="flex items-start gap-2 text-sm text-muted-foreground">
                        <span className="w-1.5 h-1.5 rounded-full bg-success mt-2" />
                        {tip}
                      </li>
                    ))}
                  </ul>
                </AccordionContent>
              </AccordionItem>
            )}
          </Accordion>
        </Card>
      )}
    </div>
  );
}
