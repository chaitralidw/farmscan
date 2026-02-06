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
      <div className="px-4 py-8 space-y-8 max-w-lg mx-auto pb-32">
        {/* Hero Section with Banner */}
        <div className="relative rounded-[2.5rem] overflow-hidden shadow-2xl group">
          <img
            src={heroBanner}
            alt="Healthy crops"
            className="w-full h-64 object-cover transition-transform duration-700 group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-background/20" />
          <div className="absolute bottom-6 left-6 right-6 glass p-6 rounded-3xl border-white/20 animate-fade-in">
            <h1 className="text-3xl font-extrabold text-foreground leading-tight tracking-tight">
              {t("home.title")}
            </h1>
            <p className="text-muted-foreground text-sm mt-2 font-medium">
              {t("home.subtitle")}
            </p>
          </div>
        </div>

        {/* Scan Action Card */}
        <div className="relative group">
          <div className="absolute -inset-1 bg-primary rounded-[2rem] blur opacity-10 group-hover:opacity-20 transition duration-1000 group-hover:duration-200"></div>
          <Button
            variant="scan"
            size="xl"
            className="w-full relative"
            onClick={() => navigate("/scan")}
          >
            <Camera className="w-8 h-8 mr-3" />
            <span className="text-xl tracking-tight">{t("home.scanNow")}</span>
          </Button>
        </div>

        {/* Stats Grid */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-bold tracking-tight text-foreground">
              {t("home.quickStats")}
            </h2>
          </div>
          {loading ? (
            <div className="grid grid-cols-3 gap-4">
              {[1, 2, 3].map(i => (
                <div key={i} className="h-32 bg-muted/30 rounded-[2rem] animate-pulse" />
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-3 gap-4">
              <StatCard
                icon={<ScanIcon className="w-6 h-6 text-primary" />}
                label={t("home.totalScans")}
                value={stats.total}
                color="primary"
              />
              <StatCard
                icon={<CheckCircle className="w-6 h-6 text-success" />}
                label={t("home.healthyPlants")}
                value={stats.healthy}
                color="success"
              />
              <StatCard
                icon={<AlertTriangle className="w-6 h-6 text-warning" />}
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
