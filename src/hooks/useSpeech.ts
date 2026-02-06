import { useState, useCallback, useEffect } from 'react';
import { Language } from '@/types/disease';

export const useSpeech = (language: Language) => {
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [synth, setSynth] = useState<SpeechSynthesis | null>(null);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      setSynth(window.speechSynthesis);
    }
  }, []);

  const stop = useCallback(() => {
    if (synth) {
      synth.cancel();
      setIsSpeaking(false);
    }
  }, [synth]);

  const speak = useCallback((text: string) => {
    if (!synth) return;

    stop();

    const utterance = new SpeechSynthesisUtterance(text);
    
    // Map our language codes to browser BCP 47 tags
    const langMap: Record<string, string> = {
      en: 'en-US',
      hi: 'hi-IN',
      bn: 'bn-IN',
      te: 'te-IN',
      mr: 'mr-IN',
      ta: 'ta-IN',
    };

    utterance.lang = langMap[language] || 'en-US';
    
    utterance.onend = () => setIsSpeaking(false);
    utterance.onerror = () => setIsSpeaking(false);
    utterance.onstart = () => setIsSpeaking(true);

    synth.speak(utterance);
  }, [synth, language, stop]);

  const readPage = useCallback(() => {
    if (!synth) return;

    // Find all readable content
    const elements = document.querySelectorAll('h1, h2, h3, h4, p, span.readable');
    const textToRead = Array.from(elements)
      .map(el => (el as HTMLElement).innerText)
      .filter(text => text.length > 2)
      .join('. ');

    if (textToRead) {
      speak(textToRead);
    }
  }, [synth, speak]);

  // Clean up on unmount
  useEffect(() => {
    return () => {
      if (synth) synth.cancel();
    };
  }, [synth]);

  return { speak, stop, isSpeaking, readPage };
};
