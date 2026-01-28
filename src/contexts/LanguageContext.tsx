import React, { createContext, useContext, useState, ReactNode } from 'react';
import { Language } from '@/types/disease';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const translations: Record<string, Record<Language, string>> = {
  // Navigation
  'nav.home': { en: 'Home', hi: 'होम' },
  'nav.scan': { en: 'Scan', hi: 'स्कैन' },
  'nav.history': { en: 'History', hi: 'इतिहास' },
  'nav.diseases': { en: 'Diseases', hi: 'रोग' },
  'nav.alerts': { en: 'Alerts', hi: 'अलर्ट' },
  
  // Home
  'home.title': { en: 'Crop Disease Detection', hi: 'फसल रोग पहचान' },
  'home.subtitle': { en: 'Protect your crops with AI-powered disease detection', hi: 'AI-संचालित रोग पहचान से अपनी फसलों की रक्षा करें' },
  'home.scanNow': { en: 'Scan Now', hi: 'अभी स्कैन करें' },
  'home.recentScans': { en: 'Recent Scans', hi: 'हाल के स्कैन' },
  'home.quickStats': { en: 'Quick Stats', hi: 'त्वरित आंकड़े' },
  'home.totalScans': { en: 'Total Scans', hi: 'कुल स्कैन' },
  'home.healthyPlants': { en: 'Healthy Plants', hi: 'स्वस्थ पौधे' },
  'home.diseasesFound': { en: 'Diseases Found', hi: 'रोग पाए गए' },
  
  // Scan
  'scan.title': { en: 'Scan Leaf', hi: 'पत्ता स्कैन करें' },
  'scan.upload': { en: 'Upload Photo', hi: 'फोटो अपलोड करें' },
  'scan.camera': { en: 'Take Photo', hi: 'फोटो लें' },
  'scan.analyzing': { en: 'Analyzing...', hi: 'विश्लेषण हो रहा है...' },
  'scan.instructions': { en: 'Take a clear photo of the affected leaf', hi: 'प्रभावित पत्ते की स्पष्ट फोटो लें' },
  'scan.tips': { en: 'Tips for best results', hi: 'सर्वोत्तम परिणामों के लिए सुझाव' },
  'scan.tip1': { en: 'Ensure good lighting', hi: 'अच्छी रोशनी सुनिश्चित करें' },
  'scan.tip2': { en: 'Focus on the affected area', hi: 'प्रभावित क्षेत्र पर ध्यान दें' },
  'scan.tip3': { en: 'Hold camera steady', hi: 'कैमरा स्थिर रखें' },
  
  // Results
  'result.title': { en: 'Scan Result', hi: 'स्कैन परिणाम' },
  'result.confidence': { en: 'Confidence', hi: 'विश्वास' },
  'result.symptoms': { en: 'Symptoms', hi: 'लक्षण' },
  'result.treatment': { en: 'Treatment', hi: 'उपचार' },
  'result.prevention': { en: 'Prevention', hi: 'रोकथाम' },
  'result.healthy': { en: 'Healthy Plant', hi: 'स्वस्थ पौधा' },
  'result.scanAgain': { en: 'Scan Again', hi: 'फिर से स्कैन करें' },
  'result.saveResult': { en: 'Save Result', hi: 'परिणाम सहेजें' },
  
  // Severity
  'severity.low': { en: 'Low', hi: 'कम' },
  'severity.medium': { en: 'Medium', hi: 'मध्यम' },
  'severity.high': { en: 'High', hi: 'उच्च' },
  
  // Common
  'common.loading': { en: 'Loading...', hi: 'लोड हो रहा है...' },
  'common.error': { en: 'Error', hi: 'त्रुटि' },
  'common.success': { en: 'Success', hi: 'सफलता' },
  'common.back': { en: 'Back', hi: 'वापस' },
  'common.next': { en: 'Next', hi: 'आगे' },
  'common.close': { en: 'Close', hi: 'बंद करें' },
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguage] = useState<Language>('en');

  const t = (key: string): string => {
    return translations[key]?.[language] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}
