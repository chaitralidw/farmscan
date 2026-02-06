import React, {
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect,
  useRef,
} from "react";
import { Language } from "@/types/disease";

export const availableLanguages: { code: Language; label: string }[] = [
  { code: "en", label: "English" },
  { code: "hi", label: "हिन्दी" },
  { code: "bn", label: "বাংলা" },
  { code: "te", label: "తెలుగు" },
  { code: "mr", label: "मराठी" },
  { code: "ta", label: "தமிழ்" },
];

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const initialTranslations: Record<string, Record<Language, string>> = {
  // Navigation
  "nav.home": {
    en: "Home",
    hi: "होम",
    bn: "হোম",
    te: "హోమ్",
    mr: "होम",
    ta: "ஹோம்",
  },
  "nav.scan": {
    en: "Scan",
    hi: "स्कैन",
    bn: "স্ক্যান",
    te: "స్కాన్",
    mr: "स्कॅन",
    ta: "ஸ்கேன்",
  },
  "nav.history": {
    en: "History",
    hi: "इतिहास",
    bn: "ইতিহাস",
    te: "చరిత్ర",
    mr: "इतिहास",
    ta: "வரலாறு",
  },
  "nav.diseases": {
    en: "Diseases",
    hi: "रोग",
    bn: "রোগ",
    te: "రోగాలు",
    mr: "रोग",
    ta: "நோய்கள்",
  },
  "nav.alerts": {
    en: "Alerts",
    hi: "अलर्ट",
    bn: "সতর্কতাসমূহ",
    te: "అలెర్ట్స్",
    mr: "सूचना",
    ta: "எச்சரிக்கைகள்",
  },

  // Home
  "home.title": {
    en: "Crop Disease Detection",
    hi: "फसल रोग पहचान",
    bn: "ফসল রোগ শনাক্তকরণ",
    te: "పంట రోగ గుర్తింపు",
    mr: "पिक रोग ओळख",
    ta: "பயிர் நோய் கண்டறிதல்",
  },
  "home.subtitle": {
    en: "Protect your crops with AI-powered disease detection",
    hi: "AI-संचालित रोग पहचान से अपनी फसलों की रक्षा करें",
    bn: "AI-চালিত রোগ শনাক্তকরণ দিয়ে আপনার ফসল সুরক্ষিত করুন",
    te: "AI ఆధారిత రోగ గుర్తింపుతో మీ పంటలను రక్షించండి",
    mr: "AI-आधारित रोग ओळखद्वारे आपल्या पिकांचे संरक्षण करा",
    ta: "AI மூலம் நோய் கண்டறிதலால் உங்கள் பயிருகளை பாதுகாக்கவும்",
  },
  "home.scanNow": {
    en: "Scan Now",
    hi: "अभी स्कैन करें",
    bn: "এখন স্ক্যান করুন",
    te: "ఇప్పుడే స్కాన్ చేయండి",
    mr: "आता स्कॅन करा",
    ta: "இப்போது ஸ்கேன் செய்யவும்",
  },
  "home.recentScans": {
    en: "Recent Scans",
    hi: "हाल के स्कैन",
    bn: "সাম্প্রতিক স্ক্যান",
    te: "సাম্প్రత శకన్లు",
    mr: "अलीकडील स्कॅन",
    ta: "சமீபத்திய ஸ்கேன்கள்",
  },
  "home.quickStats": {
    en: "Quick Stats",
    hi: "त्वरित आंकड़े",
    bn: "দ্রুত পরিসংখ্যান",
    te: "త్వరిత గణాంకాలు",
    mr: "त्वरीत आकडेवारी",
    ta: "ட்விட் பரிமாணங்கள்",
  },
  "home.totalScans": {
    en: "Total Scans",
    hi: "कुल स्कैन",
    bn: "মোট স্ক্যান",
    te: "మొత్తం స్కాన్లు",
    mr: "एकूण स्कॅन",
    ta: "மொத்த ஸ்கேன்கள்",
  },
  "home.healthyPlants": {
    en: "Healthy Plants",
    hi: "स्वस्थ पौधे",
    bn: "স্বাস্থ্যকর গাছ",
    te: "ఆరోగ్యవంతమైన మొక్కలు",
    mr: "आरोग्यदायी वनस्पती",
    ta: "ஆரோக்கிய செடிகள்",
  },
  "home.diseasesFound": {
    en: "Diseases Found",
    hi: "रोग पाए गए",
    bn: "রোগ সনাক্ত হয়েছে",
    te: "రోగాలు కనుగొనబడ్డాయి",
    mr: "रोग आढळले",
    ta: "நோய்கள் கண்டறியப்பட்டன",
  },

  // Scan
  "scan.title": {
    en: "Scan Leaf",
    hi: "पत्ता स्कैन करें",
    bn: "পাতা স্ক্যান করুন",
    te: "ఎలీ ఫలం స్కాన్ చేయండి",
    mr: "पान स्कॅन करा",
    ta: "இலை ஸ்கேன் செய்",
  },
  "scan.upload": {
    en: "Upload Photo",
    hi: "फोटो अपलोड करें",
    bn: "ছবি আপলোড করুন",
    te: "ఫొటో అప్‌లోడ్ చేయండి",
    mr: "छायाचित्र अपलोड करा",
    ta: "புகைப்படத்தை பதிவேற்றவும்",
  },
  "scan.camera": {
    en: "Take Photo",
    hi: "फोटो लें",
    bn: "ছবি নিন",
    te: "ఫొటో తీసుకోండి",
    mr: "फोटो घ्या",
    ta: "புகைப்படம் எடு",
  },
  "scan.analyzing": {
    en: "Analyzing...",
    hi: "विश्लेषण हो रहा है...",
    bn: "বিশ্লেষণ করা হচ্ছে...",
    te: "విశ్లేషణ చేయబడుతోంది...",
    mr: "विश्लेषण सुरू आहे...",
    ta: "விசாரணை நடைபெற்று வருகிறது...",
  },
  "scan.instructions": {
    en: "Take a clear photo of the affected leaf",
    hi: "प्रभावित पत्ते की स्पष्ट फोटो लें",
    bn: "ক্ষতিগ্রস্ত পাতার একটি পরিষ্কার ছবি তুলুন",
    te: "భాగప్రాప్తి పత్రి యొక్క స్పష్టమైన ఫోటో తీసుకోండి",
    mr: "प्रभावित पानाची स्पष्ट छायाचित्रे घ्या",
    ta: "பலனடைந்த இலையின் தெளிவான புகைப்படம் எடுங்கள்",
  },
  "scan.tips": {
    en: "Tips for best results",
    hi: "सर्वोत्तम परिणामों के लिए सुझाव",
    bn: "সেরা ফলাফলের জন্য টিপস",
    te: "ఉత్తమ ఫలితాల కోసం సూచనలు",
    mr: "सर्वोत्तम परिणामांसाठी टिप्स",
    ta: "சிறந்த முடிவுகளுக்கான குறிப்புகள்",
  },
  "scan.tip1": {
    en: "Ensure good lighting",
    hi: "अच्छी रोशनी सुनिश्चित करें",
    bn: "ভাল আলো নিশ্চিত করুন",
    te: "మంచి లైటింగ్ నిర్ధారించండి",
    mr: "चांगल्या प्रकाशयोजनेची खात्री करा",
    ta: "சிரப்பு ஒளியை உறுதி செய்",
  },
  "scan.tip2": {
    en: "Focus on the affected area",
    hi: "प्रभावित क्षेत्र पर ध्यान दें",
    bn: "প্রভাবিত অংশে ফোকাস করুন",
    te: "ప్రభావిత ప్రాంతంపై దృష్టి పెట్టండి",
    mr: "प्रभावित भागावर लक्ष केंद्रित करा",
    ta: "பாதிக்கப்பட்ட பகுதியை கவனமாக எடுத்துக்கொள்ளுங்கள்",
  },
  "scan.tip3": {
    en: "Hold camera steady",
    hi: "कैमरा स्थिर रखें",
    bn: "ক্যামেরাটি স্থির রাখুন",
    te: "కెమెరాను స్థిరంగా ఉంచండి",
    mr: "कॅमेरा स्थिर ठेवा",
    ta: "கேமராவை நின்று பிடிக்கவும்",
  },
  "scan.dragDrop": {
    en: "Drag & drop or tap to select",
    hi: "खींचें और छोड़ें या चुनने के लिए टैप करें",
    bn: "টেনে আনুন এবং ছেড়ে দিন বা নির্বাচন করতে ট্যাপ করুন",
    te: "లాగి వదలండి లేదా ఎంచుకోవడానికి ట్యాప్ చేయండి",
    mr: "ड्रॅग आणि ड्रॉप करा किंवा निवडण्यासाठी टॅप करा",
    ta: "இழுத்து விடவும் அல்லது தேர்ந்தெடுக்க தட்டவும்",
  },
  "scan.analyzeLeaf": {
    en: "Analyze Leaf",
    hi: "पत्ते का विश्लेषण करें",
    bn: "পাতা বিশ্লেষণ করুন",
    te: "ఆకును విశ్లేషించండి",
    mr: "पानाचे विश्लेषण करा",
    ta: "இலையை பகுப்பாய்வு செய்யவும்",
  },
  "scan.retake": {
    en: "Retake",
    hi: "फिर से लें",
    bn: "পুনরায় নিন",
    te: "మళ్లీ తీసుకోండి",
    mr: "पुन्हा घ्या",
    ta: "மீண்டும் எடுக்கவும்",
  },
  "scan.usePhoto": {
    en: "Use Photo",
    hi: "फोटो उपयोग करें",
    bn: "ছবি ব্যবহার করুন",
    te: "ఫోటోను ఉపయోగించండి",
    mr: "फोटो वापरा",
    ta: "புகைப்படத்தை பயன்படுத்தவும்",
  },
  "scan.capture": {
    en: "Capture",
    hi: "कैप्चर करें",
    bn: "ক্যাপচার করুন",
    te: "క్యాప్చర్ చేయండి",
    mr: "कॅप्चर करा",
    ta: "படம் பிடிக்கவும்",
  },
  "scan.switchCamera": {
    en: "Switch Camera",
    hi: "कैमरा बदलें",
    bn: "ক্যামেরা পরিবর্তন করুন",
    te: "కెమెరాను మార్చండి",
    mr: "कॅमेरा बदला",
    ta: "கேமராவை மாற்றவும்",
  },

  // Results
  "result.title": {
    en: "Scan Result",
    hi: "स्कैन परिणाम",
    bn: "স্ক্যান ফলাফল",
    te: "స్కాన్ ఫలితం",
    mr: "स्कॅन निकाल",
    ta: "ஸ்கேன் முடிவு",
  },
  "result.confidence": {
    en: "Confidence",
    hi: "विश्वास",
    bn: "আত্মবিশ্বাস",
    te: "నమ్మకం",
    mr: "विश्वास",
    ta: "நம்பிக்கை",
  },
  "result.symptoms": {
    en: "Symptoms",
    hi: "लक्षण",
    bn: "লক্ষণ",
    te: "లక్షణాలు",
    mr: "लक्षणे",
    ta: "குறியீடுகள்",
  },
  "result.treatment": {
    en: "Treatment",
    hi: "उपचार",
    bn: "চিকিৎসা",
    te: "చికిత్స",
    mr: "उपचार",
    ta: "சிகிச்சை",
  },
  "result.prevention": {
    en: "Prevention",
    hi: "रोकथाम",
    bn: "প্রতিরোধ",
    te: "తిరుగుబాటు",
    mr: " प्रतिबंध",
    ta: "தடை",
  },
  "result.healthy": {
    en: "Healthy Plant",
    hi: "स्वस्थ पौधा",
    bn: "স্বাস্থ্যকর উদ্ভিদ",
    te: "ఆరోగ్యవంతమైన మొక్క",
    mr: "आरोग्यदायी वनस्पती",
    ta: "ஆரோக்கிய செடியை",
  },
  "result.scanAgain": {
    en: "Scan Again",
    hi: "फिर से स्कैन करें",
    bn: "আবার স্ক্যান করুন",
    te: "మరలా స్కాన్ చేయండి",
    mr: "पुन्हा स्कॅन करा",
    ta: "மீண்டும் ஸ்கேன் செய்யவும்",
  },
  "result.saveResult": {
    en: "Save Result",
    hi: "परिणाम सहेजें",
    bn: "ফলাফল সংরক্ষণ করুন",
    te: "ఫలితాన్ని సేవ్ చేయండి",
    mr: "निष्कर्ष जतन करा",
    ta: "முடிவை சேமிக்கவும்",
  },

  // Severity
  "severity.low": {
    en: "Low",
    hi: "कम",
    bn: "কম",
    te: "తక్కువ",
    mr: "कमी",
    ta: "குறைவு",
  },
  "severity.medium": {
    en: "Medium",
    hi: "मध्यम",
    bn: "মধ্যম",
    te: "మధ్యమం",
    mr: "मध्यम",
    ta: "நடுத்தரம்",
  },
  "severity.high": {
    en: "High",
    hi: "उच्च",
    bn: "উচ্চ",
    te: "అధిక",
    mr: "उच्च",
    ta: "உயரமான",
  },

  // Common
  "common.loading": {
    en: "Loading...",
    hi: "लोड हो रहा है...",
    bn: "লোড হচ্ছে...",
    te: "లోడ్ అవుతుంది...",
    mr: "लोड होत आहे...",
    ta: "ஏற்றுகிறது...",
  },
  "common.error": {
    en: "Error",
    hi: "त्रुटि",
    bn: "ত্রুটি",
    te: "ఎర్రర్",
    mr: "त्रुटी",
    ta: "பிழை",
  },
  "common.success": {
    en: "Success",
    hi: "सफलता",
    bn: "সাফল্য",
    te: "విజయం",
    mr: "यश",
    ta: "வெற்றி",
  },
  "common.back": {
    en: "Back",
    hi: "वापस",
    bn: "ফিরে যান",
    te: "వెనుక",
    mr: "परत",
    ta: "வென்பக்கம்",
  },
  "common.next": {
    en: "Next",
    hi: "आगे",
    bn: "পরবর্তী",
    te: "తరువాత",
    mr: "पुढे",
    ta: "அடுத்தது",
  },
  "common.close": {
    en: "Close",
    hi: "बंद करें",
    bn: "বন্ধ করুন",
    te: "మూసివేయండి",
    mr: "बंद करा",
    ta: "மூடு",
  },
  "common.search": {
    en: "Search diseases...",
    hi: "रोग खोजें...",
    bn: "রোগ অনুসন্ধান করুন...",
    te: "రోగాలను శోధించండి...",
    mr: "रोग शोधा...",
    ta: "நோய்களை தேடுங்கள்...",
  },
  "common.all": {
    en: "All",
    hi: "सभी",
    bn: "সব",
    te: "అన్నీ",
    mr: "सर्व",
    ta: "அனைத்தும்",
  },
  "common.noDiseases": {
    en: "No diseases found",
    hi: "कोई रोग नहीं मिला",
    bn: "কোনো রোগ পাওয়া যায়নি",
    te: "రోగాలు కనుగొనబడలేదు",
    mr: "कोणतेही रोग आढळले नाहीत",
    ta: "நோய்கள் எதுவும் கிடைக்கவில்லை",
  },
  "common.noHistory": {
    en: "No scan history yet",
    hi: "अभी तक कोई स्कैन इतिहास नहीं",
    bn: "এখনও কোনো স্ক্যান ইতিহাস নেই",
    te: "ఇంకా స్కాన్ చరిత్ర లేదు",
    mr: "अद्याप कोणताही स्कॅन इतिहास नाही",
    ta: "இன்னும் ஸ்கேன் வரலாறு இல்லை",
  },
  "common.startFirstScan": {
    en: "Start Your First Scan",
    hi: "अपना पहला स्कैन शुरू करें",
    bn: "আপনার প্রথম স্ক্যান শুরু करें",
    te: "మీ మొదటి స్కాన్ ప్రారంభించండి",
    mr: "आपले पहिले स्कॅन सुरू करा",
    ta: "உங்கள் முதல் ஸ்கேனைத் தொடங்குங்கள்",
  },
  "profile.title": {
    en: "Profile & Settings",
    hi: "प्रोफ़ाइल और सेटिंग्स",
    bn: "প্রোফাইল এবং সেটিংস",
    te: "ప్రొఫైల్ మరియు సెట్టింగ్‌లు",
    mr: "प्रोफाइल आणि सेटिंग्ज",
    ta: "சுயவிவரம் மற்றும் அமைப்புகள்",
  },
  "profile.stats": {
    en: "Statistics",
    hi: "आंकड़े",
    bn: "পরিসংখ্যান",
    te: "గణాంకాలు",
    mr: "आकडेवारी",
    ta: "புள்ளிவிவரங்கள்",
  },
  "profile.settings": {
    en: "Settings",
    hi: "सेटिंग्स",
    bn: "সেটিংস",
    te: "సెట్టింగ్‌లు",
    mr: "सेटिंग्ज",
    ta: "அமைப்புகள்",
  },
  "profile.reset": {
    en: "Reset Device Identity",
    hi: "डिवाइस आईडी रीसेट करें",
    bn: "ডিভাইস আইডি রিসেট করুন",
    te: "డివైస్ గుర్తింపును రీసెట్ చేయండి",
    mr: "डिव्हाइस ओळख रीसेट करा",
    ta: "சாதன அடையாளத்தை மீட்டமைக்கவும்",
  },
  "profile.notifications": {
    en: "Notifications",
    hi: "सूचनाएं",
    bn: "বিজ্ঞপ্তি",
    te: "నోటిఫికేషన్‌లు",
    mr: "सूचना",
    ta: "அறிவிப்புகள்",
  },
  "profile.darkMode": {
    en: "Dark Mode",
    hi: "डार्क मोड",
    bn: "ডার্ক মোড",
    te: "డార్క్ మోడ్",
    mr: "डार्क मोड",
    ta: "இருண்ட பயன்முறை",
  },
  "history.seeAll": {
    en: "See All",
    hi: "सभी देखें",
    bn: "সব দেখুন",
    te: "అన్నీ చూడండి",
    mr: "सर्व पहा",
    ta: "அனைத்தையும் பார்",
  },
};

const AUTO_TRANSLATIONS_STORAGE_KEY = "cg_auto_translations_v1";

const LanguageContext = createContext<LanguageContextType | undefined>(
  undefined,
);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguage] = useState<Language>("en");

  // Keep translations in state so updates (from auto-translate) re-render consumers
  const [translationsState, setTranslationsState] =
    useState<Record<string, Record<Language, string>>>(initialTranslations);

  // Track in-flight fetches to avoid duplicate requests
  const fetchingRef = useRef<Record<string, Set<Language>>>({});

  // Read Google API key from env (optional)
  const GOOGLE_API_KEY =
    (import.meta.env.VITE_GOOGLE_TRANSLATE_API_KEY as string) || "";

  // Load cached auto-translations from localStorage on mount
  useEffect(() => {
    try {
      const raw = localStorage.getItem(AUTO_TRANSLATIONS_STORAGE_KEY);
      if (raw) {
        const cached = JSON.parse(raw) as Record<
          string,
          Record<Language, string>
        >;
        setTranslationsState((prev) => ({ ...prev, ...cached }));
      }
    } catch (e) {
      // ignore parse errors
    }
  }, []);

  // Persist auto-translations when they change (debounced could be added later)
  useEffect(() => {
    try {
      // Only persist keys that are not in our original initialTranslations
      const auto: Record<string, Partial<Record<Language, string>>> = {};
      for (const k of Object.keys(translationsState)) {
        if (!initialTranslations[k]) {
          auto[k] = translationsState[k];
        } else {
          // include language entries that differ from initialTranslations (auto-filled)
          const diffs: Partial<Record<Language, string>> = {};
          for (const langKey of Object.keys(
            translationsState[k],
          ) as Language[]) {
            if (
              translationsState[k][langKey] &&
              initialTranslations[k]?.[langKey] !==
                translationsState[k][langKey]
            ) {
              diffs[langKey] = translationsState[k][langKey];
            }
          }
          if (Object.keys(diffs).length) auto[k] = diffs;
        }
      }
      localStorage.setItem(AUTO_TRANSLATIONS_STORAGE_KEY, JSON.stringify(auto));
    } catch (e) {
      // ignore storage errors
    }
  }, [translationsState]);

  // Helper: request Google Translate for a single key+language
  async function fetchAndStoreTranslation(key: string, target: Language) {
    if (!GOOGLE_API_KEY) return;
    const baseText =
      translationsState[key]?.["en"] || initialTranslations[key]?.["en"];
    if (!baseText) return;

    fetchingRef.current[key] = fetchingRef.current[key] || new Set();
    if (fetchingRef.current[key].has(target)) return; // already fetching
    fetchingRef.current[key].add(target);

    try {
      const url = `https://translation.googleapis.com/language/translate/v2?key=${GOOGLE_API_KEY}`;
      const res = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          q: baseText,
          target,
          source: "en",
          format: "text",
        }),
      });
      if (!res.ok) throw new Error(`translate API ${res.status}`);
      const data = await res.json();
      const translated = data?.data?.translations?.[0]?.translatedText;
      if (translated) {
        setTranslationsState((prev) => ({
          ...prev,
          [key]: { ...(prev[key] || {}), [target]: translated } as Record<
            Language,
            string
          >,
        }));
      }
    } catch (e) {
      // fail silently
      // console.error("translate error", e);
    } finally {
      fetchingRef.current[key]?.delete(target);
    }
  }

  const t = (key: string): string => {
    const val = translationsState[key]?.[language];
    if (val) return val;

    // If we don't have a translation for this language, trigger an async fetch
    // and return the English fallback immediately so the UI remains responsive.
    if (
      language !== "en" &&
      initialTranslations[key]?.["en"] &&
      GOOGLE_API_KEY
    ) {
      // fire-and-forget
      void fetchAndStoreTranslation(key, language);
    }

    return (
      translationsState[key]?.["en"] || initialTranslations[key]?.["en"] || key
    );
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
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
}
