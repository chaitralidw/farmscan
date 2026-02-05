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
  const { user, signOut } = useAuth();
  const { language, setLanguage } = useLanguage();
  const [loading, setLoading] = useState(false);
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
    const fetchStats = async () => {
      if (!user) return;
      try {
        const { data, error } = await supabase
          .from("scans")
          .select("*")
          .eq("user_id", user.id);

        if (error) throw error;

        if (data) {
          const scans = data as ScanRecord[];
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
      } catch (err) {
        console.error("Error fetching stats:", err);
      } finally {
        setStatsLoading(false);
      }
    };

    fetchStats();
  }, [user]);

  if (!user) {
    return (
      <Layout>
        <div className="px-4 py-6 space-y-6 max-w-lg mx-auto">
          <Card className="p-6 text-center">
            <p className="text-muted-foreground mb-4">
              Please sign in to view your profile
            </p>
            <Button onClick={() => navigate("/login")}>Sign In</Button>
          </Card>
        </div>
      </Layout>
    );
  }

  const handleSignOut = async () => {
    setError("");
    setLoading(true);

    try {
      await signOut();
      navigate("/login");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Sign out failed");
    } finally {
      setLoading(false);
    }
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(user.id);
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
            Profile & Settings
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
            <div className="w-16 h-16 rounded-full bg-gradient-to-br from-primary to-success flex items-center justify-center">
              <span className="text-2xl font-bold text-white">
                {user.email?.[0].toUpperCase()}
              </span>
            </div>
            <div className="space-y-1">
              <p className="text-lg font-semibold text-foreground">
                Account Info
              </p>
              <p className="text-sm text-muted-foreground">{user.email}</p>
            </div>
          </div>

          <div className="space-y-2 pt-2">
            <label className="text-sm font-medium text-muted-foreground">
              Member Since
            </label>
            <p className="text-sm">
              {new Date(user.created_at).toLocaleDateString("en-US", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </p>
          </div>

          <div className="space-y-2 pt-2">
            <label className="text-sm font-medium text-muted-foreground">
              User ID
            </label>
            <div className="flex items-center gap-2">
              <p className="text-sm font-mono bg-muted px-3 py-2 rounded flex-1 truncate">
                {user.id}
              </p>
              <Button
                variant="ghost"
                size="icon"
                onClick={copyToClipboard}
                className="w-9 h-9"
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
          <h2 className="font-bold text-lg">Statistics</h2>
          {statsLoading ? (
            <div className="flex justify-center py-8">
              <Loader2 className="w-6 h-6 animate-spin text-primary" />
            </div>
          ) : (
            <>
              <div className="grid grid-cols-2 gap-4">
                <div className="text-center p-4 bg-muted rounded-lg border border-border/50">
                  <p className="text-3xl font-bold text-primary">{stats.totalScans}</p>
                  <p className="text-sm text-muted-foreground">Total Scans</p>
                </div>
                <div className="text-center p-4 bg-muted rounded-lg border border-border/50">
                  <p className="text-3xl font-bold text-success">{stats.healthyPlants}</p>
                  <p className="text-sm text-muted-foreground">Healthy Plants</p>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4 pt-2">
                <div className="text-center p-4 bg-muted rounded-lg border border-border/50">
                  <p className="text-3xl font-bold text-warning">{stats.diseasesFound}</p>
                  <p className="text-sm text-muted-foreground">Diseases Found</p>
                </div>
                <div className="text-center p-4 bg-muted rounded-lg border border-border/50">
                  <p className="text-3xl font-bold text-accent">{stats.avgConfidence}%</p>
                  <p className="text-sm text-muted-foreground">Avg Confidence</p>
                </div>
              </div>
            </>
          )}
        </Card>

        {/* Settings */}
        <Card className="p-6 space-y-4">
          <h2 className="font-bold text-lg">Settings</h2>

          {/* Notifications */}
          <div className="flex items-center justify-between pb-3 border-b border-border">
            <div className="flex items-center gap-3">
              <Bell className="w-5 h-5 text-primary" />
              <div>
                <p className="text-sm font-medium">Notifications</p>
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
                  const map: Record<string, string> = {
                    en: "English",
                    hi: "हिन्दी",
                    bn: "বাংলা",
                    te: "తెలుగు",
                    mr: "मराठी",
                    ta: "தமிழ்",
                  };
                  return map[language] || language;
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
                <p className="text-sm font-medium">Dark Mode</p>
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
          className="w-full gap-2"
          variant="destructive"
        >
          <LogOut className="w-4 h-4" />
          {loading ? "Signing out..." : "Sign Out"}
        </Button>
      </div>
    </Layout>
  );
}
