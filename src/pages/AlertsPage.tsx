import { ArrowLeft, Bell, MapPin, AlertCircle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Layout } from '@/components/layout/Layout';
import { useLanguage } from '@/contexts/LanguageContext';
import { format } from 'date-fns';
import { useEffect, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';
import { Loader2 } from 'lucide-react';
import { Tables } from '@/integrations/supabase/types';

type Alert = Tables<"alerts">;

// Mock alerts for demo
// removed mockAlerts array

export default function AlertsPage() {
  const { t } = useLanguage();
  const { deviceId } = useAuth();
  const navigate = useNavigate();
  const [alerts, setAlerts] = useState<Alert[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchAlerts = async () => {
      if (!deviceId) return;

      try {
        const { data, error } = await supabase
          .from("alerts")
          .select("*")
          .eq("device_id", deviceId)
          .order("created_at", { ascending: false });

        if (error) throw error;
        setAlerts(data || []);
      } catch (error) {
        console.error("Error fetching alerts:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchAlerts();
  }, [deviceId]);

  // const markAsRead = async (alertId: string) => {
  //   try {
  //     const { error } = await supabase
  //       .from("alerts")
  //       .update({ is_read: true })
  //       .eq("id", alertId);
      
  //     if (error) throw error;
  //     setAlerts(prev => prev.map(a => a.id === alertId ? { ...a, is_read: true } : a));
  //   } catch (error) {
  //     console.error("Error marking alert as read:", error);
  //   }
  // };

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
          {isLoading ? (
            <div className="flex justify-center py-12">
              <Loader2 className="w-8 h-8 animate-spin text-primary" />
            </div>
          ) : alerts.length > 0 ? (
            alerts.map(alert => (
              <Card 
                key={alert.id} 
                variant="interactive" 
                className={`p-4 ${!alert.is_read ? 'border-l-4 border-l-primary' : ''}`}
                // onClick={() => markAsRead(alert.id)}
              >
                <div className="flex items-start gap-3">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-destructive/20 to-warning/20 flex items-center justify-center">
                    <AlertCircle className="w-6 h-6 text-destructive" />
                  </div>
                  
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="font-semibold text-foreground">{alert.title}</h3>
                      {!alert.is_read && <Badge className="bg-primary text-white">New</Badge>}
                    </div>
                    
                    <p className="text-sm text-muted-foreground line-clamp-2">
                      {alert.message}
                    </p>
                    
                    <div className="flex items-center gap-1 mt-2 text-xs text-muted-foreground">
                      <span>{format(new Date(alert.created_at), 'MMM d, h:mm a')}</span>
                    </div>
                  </div>
                </div>
              </Card>
            ))
          ) : (
            <div className="text-center py-12">
              <Bell className="w-12 h-12 text-muted-foreground/30 mx-auto mb-4" />
              <p className="text-muted-foreground">No alerts at the moment</p>
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
}
