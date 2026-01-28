import { Sun, Focus, Hand } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { useLanguage } from '@/contexts/LanguageContext';

const tips = [
  { icon: Sun, key: 'scan.tip1' },
  { icon: Focus, key: 'scan.tip2' },
  { icon: Hand, key: 'scan.tip3' },
];

export function ScanTips() {
  const { t } = useLanguage();

  return (
    <Card variant="glass" className="p-4">
      <h3 className="text-sm font-semibold text-foreground mb-3">{t('scan.tips')}</h3>
      <div className="space-y-2">
        {tips.map((tip, index) => (
          <div key={index} className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center">
              <tip.icon className="w-4 h-4 text-primary" />
            </div>
            <p className="text-sm text-muted-foreground">{t(tip.key)}</p>
          </div>
        ))}
      </div>
    </Card>
  );
}
