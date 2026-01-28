import { ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Layout } from '@/components/layout/Layout';
import { RecentScanCard } from '@/components/home/RecentScanCard';
import { useLanguage } from '@/contexts/LanguageContext';
import { ScanResult } from '@/types/disease';
import { diseases } from '@/data/diseases';

// Mock history for demo
const mockHistory: ScanResult[] = [
  {
    id: '1',
    imageUrl: 'https://images.unsplash.com/photo-1592921870789-04563d55041c?w=400&h=400&fit=crop',
    timestamp: new Date(Date.now() - 3600000),
    disease: diseases[0],
    confidence: 0.92,
    isHealthy: false,
    crop: 'tomato',
  },
  {
    id: '2',
    imageUrl: 'https://images.unsplash.com/photo-1518977676601-b53f82ber633?w=400&h=400&fit=crop',
    timestamp: new Date(Date.now() - 86400000),
    disease: null,
    confidence: 0.98,
    isHealthy: true,
    crop: 'potato',
  },
  {
    id: '3',
    imageUrl: 'https://images.unsplash.com/photo-1574943320219-553eb213f72d?w=400&h=400&fit=crop',
    timestamp: new Date(Date.now() - 172800000),
    disease: diseases[3],
    confidence: 0.85,
    isHealthy: false,
    crop: 'potato',
  },
  {
    id: '4',
    imageUrl: 'https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=400&h=400&fit=crop',
    timestamp: new Date(Date.now() - 259200000),
    disease: diseases[1],
    confidence: 0.78,
    isHealthy: false,
    crop: 'tomato',
  },
  {
    id: '5',
    imageUrl: 'https://images.unsplash.com/photo-1560806175-91d2d30abc99?w=400&h=400&fit=crop',
    timestamp: new Date(Date.now() - 345600000),
    disease: null,
    confidence: 0.95,
    isHealthy: true,
    crop: 'pepper',
  },
];

export default function HistoryPage() {
  const { t } = useLanguage();
  const navigate = useNavigate();

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
          <h1 className="text-xl font-bold text-foreground">{t('nav.history')}</h1>
        </div>

        {/* History List */}
        <div className="space-y-3">
          {mockHistory.length > 0 ? (
            mockHistory.map(scan => (
              <RecentScanCard 
                key={scan.id} 
                scan={scan}
                onClick={() => {/* Navigate to scan detail */}}
              />
            ))
          ) : (
            <div className="text-center py-12">
              <p className="text-muted-foreground">No scan history yet</p>
              <Button 
                variant="default" 
                className="mt-4"
                onClick={() => navigate('/scan')}
              >
                Start Your First Scan
              </Button>
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
}
