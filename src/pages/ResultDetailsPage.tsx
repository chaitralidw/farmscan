import { useNavigate, useParams } from 'react-router-dom';
import { ArrowLeft, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Layout } from '@/components/layout/Layout';
import { ResultCard } from '@/components/results/ResultCard';
import { useLanguage } from '@/contexts/LanguageContext';
import { diseases } from '@/data/diseases';
import { useEffect, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { ScanResult } from '@/types/disease';
import { Tables } from '@/integrations/supabase/types';

export default function ResultDetailsPage() {
  const { id } = useParams<{ id: string }>();
  const { t } = useLanguage();
  const navigate = useNavigate();
  const [scan, setScan] = useState<ScanResult | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchScanDetails = async () => {
      if (!id) return;

      try {
        const { data, error } = await supabase
          .from("scans")
          .select("*")
          .eq("id", id)
          .single();

        if (error) throw error;

        if (data) {
          const record = data as Tables<"scans">;
          const diseaseId = record.disease_id || "";
          const foundDisease = diseases.find(d => d.id === diseaseId) || null;
          const fallbackCrop = diseaseId.split('-')[0] || 'unknown';

          setScan({
            id: record.id,
            imageUrl: record.image_url,
            timestamp: record.created_at ? new Date(record.created_at) : new Date(),
            disease: foundDisease,
            confidence: record.confidence || 0,
            isHealthy: record.is_healthy,
            crop: foundDisease?.crop || fallbackCrop,
          });
        }
      } catch (error) {
        console.error("Error fetching scan details:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchScanDetails();
  }, [id]);

  if (isLoading) {
    return (
      <Layout>
        <div className="flex flex-col items-center justify-center min-h-[60vh]">
          <Loader2 className="w-10 h-10 animate-spin text-primary" />
          <p className="mt-4 text-muted-foreground font-medium">{t('common.loading')}</p>
        </div>
      </Layout>
    );
  }

  if (!scan) {
    return (
      <Layout>
        <div className="px-4 py-8 text-center">
          <h2 className="text-xl font-bold">Scan not found</h2>
          <Button onClick={() => navigate('/history')} className="mt-4">
            Back to History
          </Button>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="px-4 py-8 space-y-8 max-w-lg mx-auto pb-32">
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
            <h1 className="text-2xl font-black text-foreground tracking-tight">{t('result.title')}</h1>
            <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest leading-none">Historical Analysis</p>
          </div>
        </div>

        <ResultCard 
          disease={scan.disease}
          confidence={scan.confidence}
          isHealthy={scan.isHealthy}
          imageUrl={scan.imageUrl}
        />

        <Button 
          variant="outline" 
          className="w-full h-12 rounded-2xl font-bold"
          onClick={() => navigate('/scan')}
        >
          {t('result.scanAgain')}
        </Button>
      </div>
    </Layout>
  );
}
