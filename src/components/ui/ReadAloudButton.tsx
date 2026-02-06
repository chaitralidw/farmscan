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
  const { language } = useLanguage();
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
      <Button
        onClick={handleClick}
        variant="glass"
        size="icon"
        className={cn(
          "fixed bottom-24 right-6 w-14 h-14 rounded-full shadow-2xl z-50 transition-all duration-300",
          isSpeaking ? "bg-primary text-white scale-110 shadow-primary/40 animate-pulse" : "bg-background/80",
          className
        )}
      >
        {isSpeaking ? (
          <VolumeX className="w-6 h-6" />
        ) : (
          <Volume2 className="w-6 h-6" />
        )}
      </Button>
    );
  }

  return (
    <Button
      onClick={handleClick}
      variant="ghost"
      size="icon"
      className={cn(
        "rounded-2xl transition-all duration-300",
        isSpeaking ? "text-primary animate-pulse" : "text-muted-foreground",
        className
      )}
    >
      {isSpeaking ? (
        <VolumeX className="w-5 h-5" />
      ) : (
        <Volume2 className="w-5 h-5" />
      )}
    </Button>
  );
};
