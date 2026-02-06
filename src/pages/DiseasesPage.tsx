import { useState } from 'react';
import { ArrowLeft, Search } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Layout } from '@/components/layout/Layout';
import { DiseaseCard } from '@/components/diseases/DiseaseCard';
import { useLanguage } from '@/contexts/LanguageContext';
import { diseases, crops } from '@/data/diseases';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';

export default function DiseasesPage() {
  const { t, language } = useLanguage();
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCrop, setSelectedCrop] = useState('all');

  const filteredDiseases = diseases.filter(disease => {
    const matchesSearch = 
      disease.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      disease.nameHindi.includes(searchQuery);
    const matchesCrop = selectedCrop === 'all' || disease.crop === selectedCrop;
    return matchesSearch && matchesCrop;
  });

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
            <h1 className="text-2xl font-black text-foreground tracking-tight">{t('nav.diseases')}</h1>
            <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest leading-none">Knowledge Core</p>
          </div>
        </div>

        {/* Search */}
        <div className="relative group">
          <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none">
            <Search className="w-5 h-5 text-muted-foreground group-focus-within:text-primary transition-colors" />
          </div>
          <Input
            placeholder={t("common.search")}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-12 h-14 rounded-2xl bg-muted/30 border-border/50 focus:bg-background transition-all"
          />
        </div>

        {/* Crop Filter Tabs */}
        <Tabs defaultValue="all" onValueChange={setSelectedCrop}>
          <TabsList className="w-full justify-start overflow-x-auto">
            <TabsTrigger value="all">{t("common.all")}</TabsTrigger>
            {crops.map(crop => (
              <TabsTrigger key={crop.id} value={crop.id}>
                {crop.icon} {language === 'hi' ? crop.nameHindi : crop.name}
              </TabsTrigger>
            ))}
          </TabsList>
        </Tabs>

        {/* Disease List */}
        <div className="space-y-3">
          {filteredDiseases.length > 0 ? (
            filteredDiseases.map(disease => (
              <DiseaseCard 
                key={disease.id} 
                disease={disease}
                onClick={() => {/* Navigate to disease detail */}}
              />
            ))
          ) : (
            <div className="text-center py-8">
              <p className="text-muted-foreground">{t("common.noDiseases")}</p>
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
}
