import { useAccessibility } from '@/contexts/AccessibilityContext';
import { useCallback } from 'react';

export function useScreenReader() {
  const { language } = useAccessibility();

  const speak = useCallback((text: string) => {
    if (!('speechSynthesis' in window)) {
      console.log('Speech synthesis not available');
      return;
    }

    try {
      // Cancel any currently playing speech first
      window.speechSynthesis.cancel();
      
      // Small delay to ensure cancel completes
      setTimeout(() => {
        const utterance = new SpeechSynthesisUtterance(text);
        utterance.rate = 0.95;
        utterance.pitch = 1;
        utterance.volume = 1;
        utterance.lang = language === 'ka' ? 'ka-GE' : 'en-US';

        console.log('Speaking:', text, 'Language:', language);
        window.speechSynthesis.speak(utterance);
      }, 100);
    } catch (error) {
      console.log('Screen reader error:', error);
    }
  }, [language]);

  const cancel = useCallback(() => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
    }
  }, []);

  return { speak, cancel };
}
