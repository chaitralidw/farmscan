import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Camera, Scan as ScanIcon, Activity, CheckCircle, AlertTriangle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Layout } from '@/components/layout/Layout';
import { StatCard } from '@/components/home/StatCard';
import { RecentScanCard } from '@/components/home/RecentScanCard';
import { useLanguage } from '@/contexts/LanguageContext';
import { ScanResult } from '@/types/disease';
import { diseases } from '@/data/diseases';
import heroBanner from '@/assets/hero-banner.jpg';
const mockScans: ScanResult[] = [
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
];

const Index = () => {
  const { t } = useLanguage();
  const navigate = useNavigate();

  return (
    <Layout>
      <div className="px-4 py-6 space-y-6 max-w-lg mx-auto">
        {/* Hero Section with Banner */}
        <div className="relative rounded-2xl overflow-hidden">
          <img 
            src={heroBanner} 
            alt="Healthy crops" 
            className="w-full h-48 object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/60 to-transparent" />
          <div className="absolute bottom-0 left-0 right-0 p-4 text-center">
            <h1 className="text-2xl font-bold text-foreground">
              {t('home.title')}
            </h1>
            <p className="text-muted-foreground text-sm mt-1">
              {t('home.subtitle')}
            </p>
          </div>
        </div>

        {/* Scan Button */}
        <Button 
          variant="scan" 
          size="xl"
          className="w-full"
          onClick={() => navigate('/scan')}
        >
          <Camera className="w-6 h-6 mr-2" />
          {t('home.scanNow')}
        </Button>

        {/* Stats Grid */}
        <div>
          <h2 className="text-lg font-semibold text-foreground mb-3">
            {t('home.quickStats')}
          </h2>
          <div className="grid grid-cols-3 gap-3">
            <StatCard 
              icon={<ScanIcon className="w-5 h-5 text-primary" />}
              label={t('home.totalScans')}
              value={24}
              color="primary"
            />
            <StatCard 
              icon={<CheckCircle className="w-5 h-5 text-success" />}
              label={t('home.healthyPlants')}
              value={18}
              color="success"
            />
            <StatCard 
              icon={<AlertTriangle className="w-5 h-5 text-warning" />}
              label={t('home.diseasesFound')}
              value={6}
              color="warning"
            />
          </div>
        </div>

        {/* Recent Scans */}
        <div>
          <h2 className="text-lg font-semibold text-foreground mb-3">
            {t('home.recentScans')}
          </h2>
          <div className="space-y-3">
            {mockScans.map((scan) => (
              <RecentScanCard 
                key={scan.id} 
                scan={scan}
                onClick={() => navigate(`/result/${scan.id}`)}
              />
            ))}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Index;
