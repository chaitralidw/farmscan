import { Volume2, VolumeX, Loader2 } from "lucide-react";
import { Button } from "./button";
import { useSpeech } from "@/hooks/useSpeech";
import { useLanguage } from "@/contexts/LanguageContext";
import { cn } from "@/lib/utils";

interface ReadAloudButtonProps {
  className?: string;
  variant?: "floating" | "inline";
}

export const ReadAloudButton = ({ className, variant = "inline" }: ReadAloudButtonProps) => {
  const { language, t } = useLanguage();
  const { isSpeaking, readPage, stop } = useSpeech(language);

  const handleClick = () => {
    if (isSpeaking) {
      stop();
    } else {
      readPage();
    }
  };

  if (variant === "floating") {
    return (
      <div className={cn(
        "fixed bottom-24 right-4 sm:right-8 flex flex-col items-end gap-2 group z-50 transition-all duration-500",
        isSpeaking ? "scale-100" : "scale-95"
      )}>
        {isSpeaking && (
          <div className="bg-primary/90 backdrop-blur-md text-white px-4 py-2 rounded-2xl text-xs font-bold shadow-xl border border-white/20 animate-in fade-in slide-in-from-bottom-2 duration-300 mr-2 flex items-center gap-2">
            <span className="w-1.5 h-1.5 bg-white rounded-full animate-pulse" />
            {t("common.readingAloud") !== "common.readingAloud" ? t("common.readingAloud") : "Reading Aloud..."}
          </div>
        )}
        <Button
          onClick={handleClick}
          variant="glass"
          size="icon"
          className={cn(
            "w-14 h-14 rounded-full shadow-2xl transition-all duration-500",
            isSpeaking 
              ? "bg-primary text-white scale-110 shadow-primary/40 ring-4 ring-primary/20" 
              : "bg-background/80 hover:bg-background border-border",
            className
          )}
        >
          {isSpeaking ? (
            <VolumeX className="w-6 h-6" />
          ) : (
            <Volume2 className="w-6 h-6" />
          )}
        </Button>
      </div>
    );
  }

  return (
    <Button
      onClick={handleClick}
      variant="ghost"
      size="sm"
      className={cn(
        "rounded-2xl transition-all duration-500 h-10 px-3",
        isSpeaking 
          ? "bg-primary/10 text-primary ring-1 ring-primary/20 shadow-sm" 
          : "text-muted-foreground",
        className
      )}
    >
      <div className="flex items-center gap-2">
        {isSpeaking ? (
          <>
            <VolumeX className="w-4 h-4" />
            <span className="text-[10px] font-bold uppercase tracking-wider hidden sm:inline">
              {t("common.readingAloud") !== "common.readingAloud" ? t("common.readingAloud") : "Reading..."}
            </span>
          </>
        ) : (
          <Volume2 className="w-4 h-4" />
        )}
      </div>
    </Button>
  );
};
