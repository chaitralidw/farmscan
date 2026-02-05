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
  const { user } = useAuth();
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
      const apiResponse = await fetch('http://localhost:8000/predict', {
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
    if (!user || !result || !selectedImage) {
      toast.error("Please log in to save results");
      return;
    }

    setIsSaving(true);
    try {
      // In a real app, you'd upload the image to Supabase Storage first
      // For now, we'll save the data URL or mock URL
      // @ts-expect-error - Supabase table insert type is incorrectly inferred as never
      const { error } = await supabase.from("scans").insert({
        user_id: user.id,
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
                onClick={handleSave}
                disabled={isSaving}
              >
                {isSaving ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    Saving...
                  </>
                ) : (
                  t('result.saveResult')
                )}
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
                  <>{t('scan.analyzeLeaf')}</>
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
