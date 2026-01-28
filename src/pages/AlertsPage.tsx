import { ArrowLeft, Bell, MapPin, AlertCircle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Layout } from '@/components/layout/Layout';
import { useLanguage } from '@/contexts/LanguageContext';
import { format } from 'date-fns';

// Mock alerts for demo
const mockAlerts = [
  {
    id: '1',
    disease: 'Late Blight',
    crop: 'tomato',
    location: 'Within 5km',
    timestamp: new Date(Date.now() - 7200000),
    count: 3,
    severity: 'high',
  },
  {
    id: '2',
    disease: 'Early Blight',
    crop: 'potato',
    location: 'Within 10km',
    timestamp: new Date(Date.now() - 86400000),
    count: 7,
    severity: 'medium',
  },
  {
    id: '3',
    disease: 'Bacterial Spot',
    crop: 'pepper',
    location: 'Within 15km',
    timestamp: new Date(Date.now() - 172800000),
    count: 2,
    severity: 'low',
  },
];

export default function AlertsPage() {
  const { t } = useLanguage();
  const navigate = useNavigate();

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'high':
        return 'bg-destructive/10 text-destructive border-destructive/30';
      case 'medium':
        return 'bg-warning/10 text-warning border-warning/30';
      default:
        return 'bg-muted text-muted-foreground border-muted';
    }
  };

  return (
    <Layout>
      <div className="px-4 py-6 space-y-6 max-w-lg mx-auto">
        {/* Header */}
        <div className="flex items-center gap-3">
          <Button 
            variant="ghost" 
            size="icon"
            onClick={() => navigate(-1)}
          >
            <ArrowLeft className="w-5 h-5" />
          </Button>
          <h1 className="text-xl font-bold text-foreground">{t('nav.alerts')}</h1>
        </div>

        {/* Info Card */}
        <Card variant="glass" className="border-primary/20">
          <CardContent className="p-4">
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
                <Bell className="w-5 h-5 text-primary" />
              </div>
              <div>
                <h3 className="font-semibold text-foreground text-sm">Community Alerts</h3>
                <p className="text-xs text-muted-foreground mt-1">
                  Get notified when diseases are detected near your location
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Alerts List */}
        <div className="space-y-3">
          {mockAlerts.map(alert => (
            <Card key={alert.id} variant="interactive" className="p-4">
              <div className="flex items-start gap-3">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-destructive/20 to-warning/20 flex items-center justify-center">
                  <AlertCircle className="w-6 h-6 text-destructive" />
                </div>
                
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <h3 className="font-semibold text-foreground">{alert.disease}</h3>
                    <Badge variant="outline" className={getSeverityColor(alert.severity)}>
                      {alert.severity}
                    </Badge>
                  </div>
                  
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <span className="capitalize">{alert.crop}</span>
                    <span>•</span>
                    <span>{alert.count} reports</span>
                  </div>
                  
                  <div className="flex items-center gap-1 mt-2 text-xs text-muted-foreground">
                    <MapPin className="w-3 h-3" />
                    <span>{alert.location}</span>
                    <span>•</span>
                    <span>{format(alert.timestamp, 'MMM d, h:mm a')}</span>
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </Layout>
  );
}
