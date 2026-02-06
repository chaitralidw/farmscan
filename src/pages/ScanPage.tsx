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
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';

export default function ScanPage() {
  const { t } = useLanguage();
  const { deviceId } = useAuth();
  const navigate = useNavigate();
  const [isSaving, setIsSaving] = useState(false);
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
    
    try {
      // Convert data URL to Blob
      const response = await fetch(selectedImage);
      const blob = await response.blob();
      
      // Prepare form data
      const formData = new FormData();
      formData.append('file', blob, 'image.jpg');
      
      // Send to AI Model Server
      const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:8000';
      const apiResponse = await fetch(`${apiUrl}/predict`, {
        method: 'POST',
        body: formData,
      });
      
      if (!apiResponse.ok) {
        throw new Error('AI analysis failed. Please make sure the model server is running.');
      }
      
      const data = await apiResponse.json();
      
      // Find matching disease from our records
      const foundDisease = diseases.find(d => d.id === data.disease_id);
      
      setResult({
        disease: data.is_healthy ? null : (foundDisease || null),
        confidence: data.confidence,
        isHealthy: data.is_healthy,
      });
      
      if (!data.is_healthy && !foundDisease) {
        toast.info(`Detected: ${data.class_name.replace(/___/g, ' ').replace(/_/g, ' ')}`);
      }
      
    } catch (error) {
      console.error("Analysis error:", error);
      const errorMessage = error instanceof Error ? error.message : "Failed to analyze image";
      toast.error(errorMessage);
      
      // Fallback to random for demo if server is not running (optional, but good for UX)
      // Remove this in production
      /*
      const isHealthy = Math.random() > 0.6;
      const randomDisease = diseases[Math.floor(Math.random() * diseases.length)];
      setResult({
        disease: isHealthy ? null : randomDisease,
        confidence: 0.75 + Math.random() * 0.24,
        isHealthy,
      });
      */
    } finally {
      setIsAnalyzing(false);
    }
  };

  const handleSave = async () => {
    if (!deviceId || !result || !selectedImage) {
      toast.error("Unable to save: Device identification failed");
      return;
    }

    setIsSaving(true);
    try {
      // @ts-expect-error - Supabase table insert type is incorrectly inferred as never
      const { error } = await supabase.from("scans").insert({
        device_id: deviceId,
        image_url: selectedImage,
        disease_id: result.disease?.id || null,
        confidence: result.confidence,
        is_healthy: result.isHealthy,
      });

      if (error) throw error;

      toast.success("Scan result saved successfully");
      navigate("/history");
    } catch (error) {
      console.error("Error saving scan:", error);
      const errorMessage = error instanceof Error ? error.message : "Failed to save result";
      toast.error(errorMessage);
    } finally {
      setIsSaving(false);
    }
  };

  const handleScanAgain = () => {
    setSelectedImage(null);
    setResult(null);
  };

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
            <h1 className="text-2xl font-black text-foreground tracking-tight">{t('scan.title')}</h1>
            <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest leading-none">AI Core Imaging</p>
          </div>
        </div>

        {/* Show result or upload interface */}
        {result ? (
          <div className="space-y-6 animate-fade-in">
            <ResultCard 
              disease={result.disease}
              confidence={result.confidence}
              isHealthy={result.isHealthy}
              imageUrl={selectedImage!}
            />
            
            <div className="grid grid-cols-2 gap-4">
              <Button 
                variant="outline" 
                size="lg"
                onClick={handleScanAgain}
              >
                {t('result.scanAgain')}
              </Button>
              <Button 
                variant="scan" 
                size="lg"
                onClick={handleSave}
                disabled={isSaving}
              >
                {isSaving ? (
                  <>
                    <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                    Saving...
                  </>
                ) : (
                  t('result.saveResult')
                )}
              </Button>
            </div>
          </div>
        ) : (
          <div className="space-y-8 animate-fade-in">
            <ImageUploader 
              onImageSelect={handleImageSelect}
              selectedImage={selectedImage}
              onClear={handleClear}
            />
            
            {selectedImage ? (
              <Button 
                variant="scan" 
                size="xl"
                className="w-full relative group overflow-hidden"
                onClick={handleAnalyze}
                disabled={isAnalyzing}
              >
                {isAnalyzing ? (
                  <>
                    <Loader2 className="w-6 h-6 mr-3 animate-spin" />
                    <span className="text-xl tracking-tight">{t('scan.analyzing')}</span>
                  </>
                ) : (
                  <span className="text-xl tracking-tight">{t('scan.analyzeLeaf')}</span>
                )}
              </Button>
            ) : (
              <div className="animate-slide-up" style={{ animationDelay: '200ms' }}>
                <ScanTips />
              </div>
            )}
          </div>
        )}
      </div>
    </Layout>
  );
}
