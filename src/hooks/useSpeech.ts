import { useState, useCallback, useEffect, useRef } from 'react';
import { Language } from '@/types/disease';

export const useSpeech = (language: Language) => {
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [synth, setSynth] = useState<SpeechSynthesis | null>(null);
  const currentElementRef = useRef<HTMLElement | null>(null);
  const elementsToReadRef = useRef<HTMLElement[]>([]);
  const currentIndexRef = useRef(0);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      setSynth(window.speechSynthesis);
    }
  }, []);

  const clearHighlight = useCallback(() => {
    if (currentElementRef.current) {
      currentElementRef.current.classList.remove('speech-highlight');
      currentElementRef.current = null;
    }
  }, []);

  const stop = useCallback(() => {
    if (synth) {
      synth.cancel();
      clearHighlight();
      setIsSpeaking(false);
      currentIndexRef.current = 0;
      elementsToReadRef.current = [];
    }
  }, [synth, clearHighlight]);

  const speakSequentially = useCallback((index: number) => {
    if (!synth || index >= elementsToReadRef.current.length) {
      setIsSpeaking(false);
      clearHighlight();
      return;
    }

    clearHighlight();
    const el = elementsToReadRef.current[index];
    currentElementRef.current = el;
    el.classList.add('speech-highlight');
    el.scrollIntoView({ behavior: 'smooth', block: 'center' });

    const text = el.innerText;
    const utterance = new SpeechSynthesisUtterance(text);
    
    const langMap: Record<string, string> = {
      en: 'en-US',
      hi: 'hi-IN',
      bn: 'bn-IN',
      te: 'te-IN',
      mr: 'mr-IN',
      ta: 'ta-IN',
    };

    utterance.lang = langMap[language] || 'en-US';
    
    utterance.onend = () => {
      currentIndexRef.current = index + 1;
      speakSequentially(index + 1);
    };

    utterance.onerror = () => {
      setIsSpeaking(false);
      clearHighlight();
    };

    synth.speak(utterance);
  }, [synth, language, clearHighlight]);

  const readPage = useCallback(() => {
    if (!synth) return;

    stop();

    // Find all readable content
    const elements = document.querySelectorAll('h1, h2, h3, h4, p, label, .stat-value, .scan-label, span.readable');
    const validElements = Array.from(elements).filter(el => 
      (el as HTMLElement).innerText.trim().length > 1 && 
      !(el as HTMLElement).closest('button') &&
      !(el as HTMLElement).closest('nav')
    ) as HTMLElement[];

    if (validElements.length > 0) {
      elementsToReadRef.current = validElements;
      currentIndexRef.current = 0;
      setIsSpeaking(true);
      speakSequentially(0);
    }
  }, [synth, stop, speakSequentially]);

  useEffect(() => {
    return () => {
      if (synth) synth.cancel();
    };
  }, [synth]);

  return { stop, isSpeaking, readPage };
};
