import { useEffect } from 'react';
import { useAccessibility } from '@/contexts/AccessibilityContext';
import { useScreenReader } from '@/hooks/use-screen-reader';

/**
 * Mobile Accessibility Component
 * Adds phone/mobile support for screen reader with touch gestures
 * - Double-tap anywhere to toggle screen reader
 * - Accessible on iOS and Android devices
 */
export function MobileAccessibility() {
  const { screenReaderEnabled } = useAccessibility();
  const { speak, cancel } = useScreenReader();
  let lastTap = 0;

  useEffect(() => {
    const handleDoubleTap = (e: TouchEvent) => {
      const now = Date.now();
      const timeSinceLastTap = now - lastTap;
      lastTap = now;

      if (timeSinceLastTap < 300 && timeSinceLastTap > 0) {
        // Double tap detected
        e.preventDefault();
        if (screenReaderEnabled) {
          // Read the tapped element
          const element = e.target as HTMLElement;
          if (element.innerText) {
            speak(element.innerText);
          }
        }
      }
    };

    document.addEventListener('touchstart', handleDoubleTap);
    return () => document.removeEventListener('touchstart', handleDoubleTap);
  }, [screenReaderEnabled]);

  return null;
}
