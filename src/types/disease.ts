export interface Disease {
  id: string;
  name: string;
  nameHindi: string;
  crop: string;
  severity: "low" | "medium" | "high";
  description: string;
  symptoms: string[];
  treatment: string[];
  prevention: string[];
  imageUrl?: string;
}

export interface ScanResult {
  id: string;
  imageUrl: string;
  timestamp: Date;
  disease: Disease | null;
  confidence: number;
  isHealthy: boolean;
  crop: string;
}

export interface Crop {
  id: string;
  name: string;
  nameHindi: string;
  icon: string;
  diseases: Disease[];
}

export type Language = "en" | "hi" | "bn" | "te" | "mr" | "ta";

export interface Translation {
  [key: string]: {
    en: string;
    hi: string;
    bn?: string;
    te?: string;
    mr?: string;
    ta?: string;
  };
}
