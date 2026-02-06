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
        <Tabs defaultValue="all" onValueChange={setSelectedCrop} className="w-full">
          <div className="relative">
            <div className="absolute left-0 top-0 bottom-0 w-8 bg-gradient-to-r from-background to-transparent z-10 pointer-events-none" />
            <TabsList className="w-full justify-start overflow-x-auto overflow-y-hidden flex-nowrap scrollbar-none px-4 bg-transparent border-0 gap-2 h-12">
              <TabsTrigger 
                value="all" 
                className="rounded-full px-6 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground border-border/50 border shrink-0"
              >
                {t("common.all")}
              </TabsTrigger>
              {crops.map(crop => (
                <TabsTrigger 
                  key={crop.id} 
                  value={crop.id}
                  className="rounded-full px-6 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground border-border/50 border shrink-0 gap-2"
                >
                  <span className="text-lg">{crop.icon}</span> 
                  <span>{language === 'hi' ? crop.nameHindi : crop.name}</span>
                </TabsTrigger>
              ))}
            </TabsList>
            <div className="absolute right-0 top-0 bottom-0 w-8 bg-gradient-to-l from-background to-transparent z-10 pointer-events-none" />
          </div>
        </Tabs>

        {/* Disease List */}
        <div className="space-y-4 animate-in fade-in slide-in-from-bottom-2 duration-500">
          {filteredDiseases.length > 0 ? (
            filteredDiseases.map(disease => (
              <DiseaseCard 
                key={disease.id} 
                disease={disease}
                onClick={() => navigate(`/diseases/${disease.id}`)}
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
