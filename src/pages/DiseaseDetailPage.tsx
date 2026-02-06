import { useNavigate, useParams } from 'react-router-dom';
import { ArrowLeft, AlertCircle, CheckCircle, ShieldCheck, Zap } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Layout } from '@/components/layout/Layout';
import { useLanguage } from '@/contexts/LanguageContext';
import { diseases, crops } from '@/data/diseases';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';
import { Card } from '@/components/ui/card';

export default function DiseaseDetailPage() {
  const { id } = useParams<{ id: string }>();
  const { t, language } = useLanguage();
  const navigate = useNavigate();

  const disease = diseases.find(d => d.id === id);
  const crop = crops.find(c => c.id === disease?.crop);

  if (!disease) {
    return (
      <Layout>
        <div className="px-4 py-8 text-center space-y-4">
          <div className="w-20 h-20 bg-muted/30 rounded-full flex items-center justify-center mx-auto">
            <AlertCircle className="w-10 h-10 text-muted-foreground" />
          </div>
          <h2 className="text-xl font-bold">{t('common.error')}</h2>
          <p className="text-muted-foreground">Disease details not found.</p>
          <Button onClick={() => navigate('/diseases')} className="rounded-2xl">
            {t('common.back')}
          </Button>
        </div>
      </Layout>
    );
  }

  const getSeverityColor = () => {
    switch (disease.severity) {
      case 'high': return 'text-destructive bg-destructive/10 border-destructive/20';
      case 'medium': return 'text-warning bg-warning/10 border-warning/20';
      case 'low': return 'text-success bg-success/10 border-success/20';
      default: return 'text-muted-foreground bg-muted/10 border-muted/20';
    }
  };

  return (
    <Layout>
      <div className="px-4 py-8 space-y-8 max-w-lg mx-auto pb-32 animate-in fade-in slide-in-from-bottom-4 duration-700">
        {/* Header */}
        <div className="flex items-center gap-4">
          <Button 
            variant="glass" 
            size="icon"
            onClick={() => navigate(-1)}
            className="rounded-2xl shrink-0"
          >
            <ArrowLeft className="w-5 h-5" />
          </Button>
          <div className="flex flex-col min-w-0">
            <h1 className="text-2xl font-black text-foreground tracking-tight truncate">
              {language === 'hi' ? disease.nameHindi : disease.name}
            </h1>
            <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest leading-none">
              {crop ? (language === 'hi' ? crop.nameHindi : crop.name) : disease.crop} • {t(`severity.${disease.severity}`)}
            </p>
          </div>
        </div>

        {/* Hero Card */}
        <div className="relative group">
          <div className="absolute -inset-1 bg-gradient-to-r from-primary/20 to-success/20 rounded-[2.5rem] blur opacity-25" />
          <div className="relative bg-card border border-white/40 shadow-2xl rounded-[2.5rem] overflow-hidden">
            <div className="p-8 space-y-6">
              <div className="flex justify-between items-start">
                <div className="w-16 h-16 rounded-3xl bg-muted/30 border border-border/50 flex items-center justify-center text-4xl shadow-inner">
                  {crop?.icon || '🌱'}
                </div>
                <Badge variant="outline" className={cn("px-3 py-1 rounded-xl font-bold text-[10px] uppercase tracking-wider", getSeverityColor())}>
                  {t(`severity.${disease.severity}`)}
                </Badge>
              </div>

              <div className="space-y-2">
                <h2 className="text-sm font-black uppercase tracking-widest text-muted-foreground/60">{t('nav.diseases')} Information</h2>
                <p className="text-lg font-medium leading-relaxed italic text-foreground/80">
                  "{disease.description}"
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Details Sections */}
        <div className="grid gap-6">
          {/* Symptoms */}
          {disease.symptoms.length > 0 && (
            <section className="space-y-3">
              <div className="flex items-center gap-2 px-2">
                <div className="w-8 h-8 rounded-xl bg-destructive/10 flex items-center justify-center">
                  <AlertCircle className="w-4 h-4 text-destructive" />
                </div>
                <h3 className="text-sm font-black uppercase tracking-wider">{t('result.symptoms')}</h3>
              </div>
              <div className="grid gap-2">
                {disease.symptoms.map((symptom, i) => (
                  <div key={i} className="flex gap-3 text-sm font-medium text-foreground/80 p-4 rounded-2xl bg-muted/20 border border-border/10">
                    <span className="w-1.5 h-1.5 rounded-full bg-destructive mt-2 shrink-0" />
                    {symptom}
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Treatment */}
          {disease.treatment.length > 0 && (
            <section className="space-y-3">
              <div className="flex items-center gap-2 px-2">
                <div className="w-8 h-8 rounded-xl bg-primary/10 flex items-center justify-center">
                  <Zap className="w-4 h-4 text-primary" />
                </div>
                <h3 className="text-sm font-black uppercase tracking-wider">{t('result.treatment')}</h3>
              </div>
              <div className="grid gap-2">
                {disease.treatment.map((step, i) => (
                  <div key={i} className="flex gap-4 text-sm font-medium text-foreground/80 p-4 rounded-2xl bg-primary/5 border border-primary/10">
                    <div className="w-6 h-6 rounded-full bg-primary text-white text-[10px] font-bold flex items-center justify-center shrink-0 shadow-lg shadow-primary/20">
                      {i + 1}
                    </div>
                    {step}
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Prevention */}
          {disease.prevention.length > 0 && (
            <section className="space-y-3">
              <div className="flex items-center gap-2 px-2">
                <div className="w-8 h-8 rounded-xl bg-success/10 flex items-center justify-center">
                  <ShieldCheck className="w-4 h-4 text-success" />
                </div>
                <h3 className="text-sm font-black uppercase tracking-wider">{t('result.prevention')}</h3>
              </div>
              <div className="grid gap-2">
                {disease.prevention.map((tip, i) => (
                  <div key={i} className="flex items-center gap-3 text-sm font-medium text-foreground/80 p-4 rounded-2xl bg-success/5 border border-success/10">
                    <div className="w-1.5 h-1.5 rounded-full bg-success shrink-0" />
                    {tip}
                  </div>
                ))}
              </div>
            </section>
          )}
        </div>

        {/* Action Button */}
        <Button 
          className="w-full h-14 rounded-2xl font-black text-sm uppercase tracking-widest shadow-xl shadow-primary/20 transition-all active:scale-95"
          onClick={() => navigate('/scan')}
        >
          {t('home.scanNow')}
        </Button>
      </div>
    </Layout>
  );
}
