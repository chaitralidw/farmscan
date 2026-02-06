import { ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Layout } from '@/components/layout/Layout';
import { RecentScanCard } from '@/components/home/RecentScanCard';
import { useLanguage } from '@/contexts/LanguageContext';
import { ScanResult } from '@/types/disease';
import { Tables } from '@/integrations/supabase/types';
import { diseases } from '@/data/diseases';
import { useEffect, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';
import { Loader2 } from 'lucide-react';

// Mock history for demo
// removed mockHistory array

export default function HistoryPage() {
  const { t } = useLanguage();
  const { user } = useAuth();
  const navigate = useNavigate();
  const [scans, setScans] = useState<ScanResult[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchScans = async () => {
      if (!user) return;

      try {
        const { data, error } = await supabase
          .from("scans")
          .select("*")
          .eq("user_id", user.id)
          .order("created_at", { ascending: false });

        if (error) throw error;

        if (data) {
          // Map database records to ScanResult type
          const formattedScans: ScanResult[] = data.map((record: Tables<"scans">) => {
            const diseaseId = record.disease_id || "";
            const foundDisease = diseases.find(d => d.id === diseaseId) || null;
            
            // Try to extract crop from disease_id (e.g., 'tomato-late-blight' -> 'tomato')
            const fallbackCrop = diseaseId.split('-')[0] || 'unknown';
            
            return {
              id: record.id,
              imageUrl: record.image_url,
              timestamp: record.created_at ? new Date(record.created_at) : new Date(),
              disease: foundDisease,
              confidence: record.confidence || 0,
              isHealthy: record.is_healthy,
              crop: foundDisease?.crop || fallbackCrop,
            };
          });

          setScans(formattedScans);
        }
      } catch (error) {
        console.error("Error fetching scans:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchScans();
  }, [user]);

  return (
    <Layout>
      <div className="px-4 py-8 space-y-8 max-w-lg mx-auto pb-32">
        {/* Header */}
        <div className="flex items-center gap-4">
          <Button 
            variant="glass" 
            size="icon"
            onClick={() => navigate(-1)}
            className="rounded-2xl"
          >
            <ArrowLeft className="w-5 h-5" />
          </Button>
          <div className="flex flex-col">
            <h1 className="text-2xl font-black text-foreground tracking-tight">{t('nav.history')}</h1>
            <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest leading-none">Archived Scans</p>
          </div>
        </div>

        {/* History List */}
        <div className="space-y-3">
          {isLoading ? (
            <div className="flex justify-center py-12">
              <Loader2 className="w-8 h-8 animate-spin text-primary" />
            </div>
          ) : scans.length > 0 ? (
            scans.map(scan => (
              <RecentScanCard 
                key={scan.id} 
                scan={scan}
              />
            ))
          ) : (
            <div className="text-center py-12">
              <p className="text-muted-foreground">{t('common.noHistory')}</p>
              <Button 
                variant="default" 
                className="mt-4"
                onClick={() => navigate('/scan')}
              >
                {t('common.startFirstScan')}
              </Button>
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
}
