import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { useAuth } from "@/contexts/AuthContext";
import { useLanguage, availableLanguages } from "@/contexts/LanguageContext";
import { Layout } from "@/components/layout/Layout";
import { ArrowLeft, LogOut, Bell, Moon, Copy, Check, Loader2 } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { Tables } from "@/integrations/supabase/types";

type ScanRecord = Tables<"scans">;

export default function ProfilePage() {
  const navigate = useNavigate();
  const { deviceId, signOut } = useAuth();
  const { language, setLanguage, t } = useLanguage();
  const [loading, setLoading] = useState(false);
  const [profile, setProfile] = useState<Tables<"profiles"> | null>(null);
  const [error, setError] = useState("");
  const [copied, setCopied] = useState(false);
  const [notifications, setNotifications] = useState(true);
  const [darkMode, setDarkMode] = useState(false);
  const [stats, setStats] = useState({
    totalScans: 0,
    healthyPlants: 0,
    diseasesFound: 0,
    avgConfidence: 0,
  });
  const [statsLoading, setStatsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      if (!deviceId) return;

      try {
        // Fetch stats
        const { data: scanData, error: scanError } = await supabase
          .from("scans")
          .select("*")
          .eq("device_id", deviceId);

        if (scanError) throw scanError;

        if (scanData) {
          const scans = scanData as ScanRecord[];
          const total = scans.length;
          const healthy = scans.filter((s) => s.is_healthy).length;
          const diseases = total - healthy;
          const avgConf = total > 0 
            ? Math.round((scans.reduce((acc, s) => acc + (s.confidence || 0), 0) / total) * 100)
            : 0;

          setStats({
            totalScans: total,
            healthyPlants: healthy,
            diseasesFound: diseases,
            avgConfidence: avgConf,
          });
        }

        // Fetch profile
        const { data: profileData, error: profileError } = await supabase
          .from("profiles")
          .select("*")
          .eq("device_id", deviceId)
          .maybeSingle();

        if (profileError) throw profileError;
        if (profileData) setProfile(profileData);

      } catch (err) {
        console.error("Error fetching data:", err);
      } finally {
        setStatsLoading(false);
      }
    };

    fetchData();
  }, [deviceId]);

  if (!deviceId) {
    return (
      <Layout>
        <div className="px-4 py-8 flex items-center justify-center min-h-[60vh]">
          <Loader2 className="w-8 h-8 animate-spin text-primary" />
        </div>
      </Layout>
    );
  }

  const handleSignOut = async () => {
    setError("");
    setLoading(true);

    try {
      await signOut();
      navigate("/");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Reset failed");
    } finally {
      setLoading(false);
    }
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(deviceId);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <Layout>
      <div className="px-4 py-6 space-y-6 max-w-lg mx-auto">
        {/* Header */}
        <div className="flex items-center gap-3">
          <Button variant="ghost" size="icon" onClick={() => navigate(-1)}>
            <ArrowLeft className="w-5 h-5" />
          </Button>
          <h1 className="text-xl font-bold text-foreground">
            {t('profile.title')}
          </h1>
        </div>

        {error && (
          <div className="p-3 bg-destructive/10 text-destructive rounded-md text-sm">
            {error}
          </div>
        )}

        {/* Profile Info */}
        <Card className="p-6 space-y-4">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-3xl bg-primary flex items-center justify-center shadow-lg shadow-primary/20 rotate-12">
              <span className="text-2xl font-black text-white -rotate-12">
                Ai
              </span>
            </div>
            <div className="space-y-1">
              <p className="text-lg font-black text-foreground tracking-tight">
                {profile?.full_name || "Device Identity"}
              </p>
              <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest leading-none">
                {profile?.location || "Anonymous User"}
              </p>
            </div>
          </div>

          <div className="space-y-2 pt-2">
            <label className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest leading-none">
              Active Since
            </label>
            <p className="text-sm font-bold">
              {profile?.created_at 
                ? new Date(profile.created_at).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })
                : "Initial Scan"}
            </p>
          </div>

          <div className="space-y-2 pt-2">
            <label className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest leading-none">
              Identity Key
            </label>
            <div className="flex items-center gap-2">
              <p className="text-xs font-mono bg-muted p-3 rounded-xl flex-1 truncate text-muted-foreground">
                {deviceId}
              </p>
              <Button
                variant="glass"
                size="icon"
                onClick={copyToClipboard}
                className="w-10 h-10 rounded-xl"
              >
                {copied ? (
                  <Check className="w-4 h-4 text-success" />
                ) : (
                  <Copy className="w-4 h-4" />
                )}
              </Button>
            </div>
          </div>
        </Card>

        {/* Scan Statistics */}
        <Card className="p-6 space-y-4">
          <h2 className="font-bold text-lg">{t('profile.stats')}</h2>
          {statsLoading ? (
            <div className="flex justify-center py-8">
              <Loader2 className="w-6 h-6 animate-spin text-primary" />
            </div>
          ) : (
            <>
              <div className="grid grid-cols-2 gap-4">
                <div className="text-center p-4 bg-muted rounded-lg border border-border/50">
                  <p className="text-3xl font-bold text-primary">{stats.totalScans}</p>
                  <p className="text-sm text-muted-foreground">{t('home.totalScans')}</p>
                </div>
                <div className="text-center p-4 bg-muted rounded-lg border border-border/50">
                  <p className="text-3xl font-bold text-success">{stats.healthyPlants}</p>
                  <p className="text-sm text-muted-foreground">{t('home.healthyPlants')}</p>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4 pt-2">
                <div className="text-center p-4 bg-muted rounded-lg border border-border/50">
                  <p className="text-3xl font-bold text-warning">{stats.diseasesFound}</p>
                  <p className="text-sm text-muted-foreground">{t('home.diseasesFound')}</p>
                </div>
                <div className="text-center p-4 bg-muted rounded-lg border border-border/50">
                  <p className="text-3xl font-bold text-accent">{stats.avgConfidence}%</p>
                  <p className="text-sm text-muted-foreground">{t('result.confidence')}</p>
                </div>
              </div>
            </>
          )}
        </Card>

        {/* Settings */}
        <Card className="p-6 space-y-4">
          <h2 className="font-bold text-lg">{t('profile.settings')}</h2>

          {/* Notifications */}
          <div className="flex items-center justify-between pb-3 border-b border-border">
            <div className="flex items-center gap-3">
              <Bell className="w-5 h-5 text-primary" />
              <div>
                <p className="text-sm font-medium">{t('profile.notifications')}</p>
                <p className="text-xs text-muted-foreground">
                  Get alerts for disease detection
                </p>
              </div>
            </div>
            <Switch
              checked={notifications}
              onCheckedChange={setNotifications}
            />
          </div>

          {/* Language */}
          <div className="flex items-center justify-between pb-3 border-b border-border">
            <div>
              <p className="text-sm font-medium">Language</p>
              <p className="text-xs text-muted-foreground">
                Current:{" "}
                {(() => {
                  return availableLanguages.find(l => l.code === language)?.label || language;
                })()}
              </p>
            </div>
            <Button
              variant="outline"
              size="sm"
              onClick={() => {
                const idx = availableLanguages.findIndex(
                  (l) => l.code === language,
                );
                const next =
                  availableLanguages[(idx + 1) % availableLanguages.length];
                setLanguage(next.code);
              }}
            >
              {(() => {
                const current = availableLanguages.find(
                  (l) => l.code === language,
                );
                return current?.label || language;
              })()}
            </Button>
          </div>

          {/* Theme (Future) */}
          <div className="flex items-center justify-between pb-3 border-b border-border">
            <div className="flex items-center gap-3">
              <Moon className="w-5 h-5 text-primary" />
              <div>
                <p className="text-sm font-medium">{t('profile.darkMode')}</p>
                <p className="text-xs text-muted-foreground">Coming soon</p>
              </div>
            </div>
            <Switch checked={darkMode} disabled />
          </div>
        </Card>

        {/* Sign Out */}
        <Button
          onClick={handleSignOut}
          disabled={loading}
          className="w-full gap-2 rounded-[1.5rem]"
          variant="destructive"
        >
          <LogOut className="w-4 h-4" />
          {loading ? "Resetting..." : t('profile.reset')}
        </Button>
      </div>
    </Layout>
  );
}
