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
    <div className="space-y-6 animate-slide-up">
      {/* Main Result Card */}
      <Card variant={variant} className="overflow-hidden border-0 shadow-2xl">
        <div className="relative group">
          <img 
            src={imageUrl} 
            alt="Scanned leaf" 
            className="w-full h-64 object-cover transition-transform duration-700 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-black/40" />
          
          <div className="absolute top-4 right-4 glass px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest text-white border-white/10">
            {isHealthy ? 'System Check: Clear' : 'Analysis Alert'}
          </div>

          <div className={cn(
            "absolute bottom-6 left-6 right-6 flex items-center gap-4 p-5 rounded-[2rem]",
            "glass border-white/20 shadow-2xl"
          )}>
            <div className={cn(
              "w-12 h-12 rounded-2xl flex items-center justify-center shadow-lg",
              bgColor,
              "text-white"
            )}>
              <StatusIcon className="w-7 h-7" />
            </div>
            <div className="flex-1">
              <h2 className="text-xl font-black text-white leading-tight tracking-tight">
                {isHealthy 
                  ? t('result.healthy')
                  : language === 'hi' 
                    ? disease?.nameHindi 
                    : disease?.name
                }
              </h2>
              {!isHealthy && (
                <p className="text-xs font-bold text-white/70 uppercase tracking-widest mt-0.5">
                  {disease?.crop && (
                    <span>{disease.crop}</span>
                  )}
                </p>
              )}
            </div>
          </div>
        </div>

        <CardContent className="p-8">
          {/* Confidence Score */}
          <div className="mb-8">
            <div className="flex justify-between items-end mb-3">
              <div className="flex flex-col">
                <span className="text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground/60 mb-1">
                  {t('result.confidence')}
                </span>
                <span className={cn("text-3xl font-black tracking-tighter", color)}>
                  {confidencePercent}<span className="text-lg ml-0.5">%</span>
                </span>
              </div>
              <div className="text-right">
                <span className="text-[10px] font-bold text-muted-foreground uppercase opacity-50">Precision AI</span>
              </div>
            </div>
            <div className="relative h-3 bg-muted rounded-full overflow-hidden">
               <div 
                 className={cn("absolute inset-0 transition-all duration-1000 ease-out", bgColor)}
                 style={{ width: `${confidencePercent}%` }}
               />
            </div>
          </div>

          {/* Description */}
          <div className="relative p-6 rounded-3xl bg-muted/30 border border-border/50">
            <p className="text-sm font-medium leading-relaxed text-foreground/80 italic">
              "{disease?.description || (isHealthy && "Your plant shows optimal chlorophyll levels and structural integrity. No anomalies detected by the AI core.")}"
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Details Accordion */}
      {disease && !isHealthy && (
        <Card variant="default" className="overflow-hidden border-border/50 shadow-xl">
          <Accordion type="multiple" className="w-full">
            {disease.symptoms.length > 0 && (
              <AccordionItem value="symptoms" className="border-b border-border/50">
                <AccordionTrigger className="px-6 py-4 hover:no-underline hover:bg-muted/30 transition-colors">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-destructive/10 flex items-center justify-center">
                      <AlertCircle className="w-4 h-4 text-destructive" />
                    </div>
                    <span className="text-sm font-bold uppercase tracking-wider">{t('result.symptoms')}</span>
                  </div>
                </AccordionTrigger>
                <AccordionContent className="px-6 pb-6 pt-2">
                  <ul className="grid gap-3">
                    {disease.symptoms.map((symptom, index) => (
                      <li key={index} className="flex gap-3 text-sm font-medium text-muted-foreground p-3 rounded-2xl bg-muted/20 border border-border/10">
                        <span className="w-1.5 h-1.5 rounded-full bg-destructive mt-2 flex-shrink-0" />
                        {symptom}
                      </li>
                    ))}
                  </ul>
                </AccordionContent>
              </AccordionItem>
            )}

            {disease.treatment.length > 0 && (
              <AccordionItem value="treatment" className="border-b border-border/50">
                <AccordionTrigger className="px-6 py-4 hover:no-underline hover:bg-muted/30 transition-colors">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center">
                      <CheckCircle className="w-4 h-4 text-primary" />
                    </div>
                    <span className="text-sm font-bold uppercase tracking-wider">{t('result.treatment')}</span>
                  </div>
                </AccordionTrigger>
                <AccordionContent className="px-6 pb-6 pt-2">
                  <ul className="grid gap-3">
                    {disease.treatment.map((step, index) => (
                      <li key={index} className="flex gap-4 text-sm font-medium text-muted-foreground p-4 rounded-2xl bg-primary/5 border border-primary/10">
                        <span className="w-6 h-6 rounded-full bg-primary text-white text-[10px] font-black flex items-center justify-center flex-shrink-0">
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
              <AccordionItem value="prevention" className="border-0">
                <AccordionTrigger className="px-6 py-4 hover:no-underline hover:bg-muted/30 transition-colors">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-success/10 flex items-center justify-center">
                      <AlertTriangle className="w-4 h-4 text-success" />
                    </div>
                    <span className="text-sm font-bold uppercase tracking-wider">{t('result.prevention')}</span>
                  </div>
                </AccordionTrigger>
                <AccordionContent className="px-6 pb-6 pt-2">
                  <div className="grid grid-cols-1 gap-2">
                    {disease.prevention.map((tip, index) => (
                      <div key={index} className="flex items-center gap-3 text-sm font-medium text-muted-foreground p-3 rounded-2xl bg-success/5 border border-success/10">
                        <div className="w-1.5 h-1.5 rounded-full bg-success flex-shrink-0" />
                        {tip}
                      </div>
                    ))}
                  </div>
                </AccordionContent>
              </AccordionItem>
            )}
          </Accordion>
        </Card>
      )}
    </div>
  );
}
