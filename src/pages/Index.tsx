import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Camera,
  Scan as ScanIcon,
  CheckCircle,
  AlertTriangle,
  Loader2,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Layout } from "@/components/layout/Layout";
import { StatCard } from "@/components/home/StatCard";
import { RecentScanCard } from "@/components/home/RecentScanCard";
import { useLanguage } from "@/contexts/LanguageContext";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/integrations/supabase/client";
import { ScanResult } from "@/types/disease";
import { diseases } from "@/data/diseases";
import heroBanner from "@/assets/hero-banner.jpg";
import { Tables } from "@/integrations/supabase/types";

type DbScan = Tables<"scans">;
// Mock data removed in favor of real Supabase data

const Index = () => {
  const { t } = useLanguage();
  const { user } = useAuth();
  const navigate = useNavigate();
  const [scans, setScans] = useState<ScanResult[]>([]);
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({
    total: 0,
    healthy: 0,
    diseases: 0,
  });

  useEffect(() => {
    const fetchData = async () => {
      if (!user) return;

      try {
        const { data, error } = await supabase
          .from("scans")
          .select("*")
          .eq("user_id", user.id)
          .order("created_at", { ascending: false });

        if (error) throw error;

        if (data) {
          const dbScans = data as DbScan[];
          
          // Map to ScanResult type
          const mappedScans: ScanResult[] = dbScans.map(s => ({
            id: s.id,
            imageUrl: s.image_url,
            timestamp: new Date(s.created_at),
            disease: diseases.find(d => d.id === s.disease_id) || null,
            confidence: s.confidence || 0,
            isHealthy: s.is_healthy,
            crop: "tomato", // Default or extract from disease if possible
          }));

          setScans(mappedScans.slice(0, 3)); // Only show last 3 on home

          // Calc stats
          const total = dbScans.length;
          const healthy = dbScans.filter(s => s.is_healthy).length;
          setStats({
            total,
            healthy,
            diseases: total - healthy,
          });
        }
      } catch (err) {
        console.error("Error fetching home data:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [user]);

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
              {t("home.title")}
            </h1>
            <p className="text-muted-foreground text-sm mt-1">
              {t("home.subtitle")}
            </p>
          </div>
        </div>

        {/* Scan Button */}
        <Button
          variant="scan"
          size="xl"
          className="w-full"
          onClick={() => navigate("/scan")}
        >
          <Camera className="w-6 h-6 mr-2" />
          {t("home.scanNow")}
        </Button>

        {/* Stats Grid */}
        <div>
          <h2 className="text-lg font-semibold text-foreground mb-3">
            {t("home.quickStats")}
          </h2>
          {loading ? (
            <div className="flex justify-center py-8 bg-muted/30 rounded-2xl">
              <Loader2 className="w-6 h-6 animate-spin text-primary" />
            </div>
          ) : (
            <div className="grid grid-cols-3 gap-3">
              <StatCard
                icon={<ScanIcon className="w-5 h-5 text-primary" />}
                label={t("home.totalScans")}
                value={stats.total}
                color="primary"
              />
              <StatCard
                icon={<CheckCircle className="w-5 h-5 text-success" />}
                label={t("home.healthyPlants")}
                value={stats.healthy}
                color="success"
              />
              <StatCard
                icon={<AlertTriangle className="w-5 h-5 text-warning" />}
                label={t("home.diseasesFound")}
                value={stats.diseases}
                color="warning"
              />
            </div>
          )}
        </div>

        {/* Recent Scans */}
        <div>
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-lg font-semibold text-foreground">
              {t("home.recentScans")}
            </h2>
            <Button 
              variant="link" 
              className="text-primary p-0 h-auto" 
              onClick={() => navigate("/history")}
            >
              See All
            </Button>
          </div>
          
          <div className="space-y-3">
            {loading ? (
              [1, 2, 3].map(i => (
                <div key={i} className="h-20 bg-muted/50 animate-pulse rounded-xl" />
              ))
            ) : scans.length > 0 ? (
              scans.map((scan) => (
                <RecentScanCard
                  key={scan.id}
                  scan={scan}
                  onClick={() => navigate(`/history`)} // Navigate to history to see details or implement ResultPage
                />
              ))
            ) : (
              <div className="text-center py-10 bg-muted/20 rounded-2xl border border-dashed border-border">
                <p className="text-muted-foreground text-sm">No scans yet</p>
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="mt-2"
                  onClick={() => navigate("/scan")}
                >
                  Start Scanning
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Index;
