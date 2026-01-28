import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Layout } from '@/components/layout/Layout';
import { ImageUploader } from '@/components/scan/ImageUploader';
import { ScanTips } from '@/components/scan/ScanTips';
import { ResultCard } from '@/components/results/ResultCard';
import { useLanguage } from '@/contexts/LanguageContext';
import { diseases } from '@/data/diseases';
import { Disease } from '@/types/disease';

export default function ScanPage() {
  const { t } = useLanguage();
  const navigate = useNavigate();
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [result, setResult] = useState<{
    disease: Disease | null;
    confidence: number;
    isHealthy: boolean;
  } | null>(null);

  const handleImageSelect = (imageUrl: string) => {
    setSelectedImage(imageUrl);
    setResult(null);
  };

  const handleClear = () => {
    setSelectedImage(null);
    setResult(null);
  };

  const handleAnalyze = async () => {
    if (!selectedImage) return;
    
    setIsAnalyzing(true);
    
    // Simulate AI analysis with random result
    await new Promise(resolve => setTimeout(resolve, 2500));
    
    const isHealthy = Math.random() > 0.6;
    const randomDisease = diseases[Math.floor(Math.random() * diseases.length)];
    
    setResult({
      disease: isHealthy ? null : randomDisease,
      confidence: 0.75 + Math.random() * 0.24,
      isHealthy,
    });
    
    setIsAnalyzing(false);
  };

  const handleScanAgain = () => {
    setSelectedImage(null);
    setResult(null);
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
          <h1 className="text-xl font-bold text-foreground">{t('scan.title')}</h1>
        </div>

        {/* Show result or upload interface */}
        {result ? (
          <>
            <ResultCard 
              disease={result.disease}
              confidence={result.confidence}
              isHealthy={result.isHealthy}
              imageUrl={selectedImage!}
            />
            
            <div className="flex gap-3">
              <Button 
                variant="outline" 
                className="flex-1"
                onClick={handleScanAgain}
              >
                {t('result.scanAgain')}
              </Button>
              <Button 
                variant="default" 
                className="flex-1"
                onClick={() => navigate('/')}
              >
                {t('result.saveResult')}
              </Button>
            </div>
          </>
        ) : (
          <>
            <ImageUploader 
              onImageSelect={handleImageSelect}
              selectedImage={selectedImage}
              onClear={handleClear}
            />
            
            {selectedImage ? (
              <Button 
                variant="scan" 
                size="xl"
                className="w-full"
                onClick={handleAnalyze}
                disabled={isAnalyzing}
              >
                {isAnalyzing ? (
                  <>
                    <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                    {t('scan.analyzing')}
                  </>
                ) : (
                  <>Analyze Leaf</>
                )}
              </Button>
            ) : (
              <ScanTips />
            )}
          </>
        )}
      </div>
    </Layout>
  );
}
