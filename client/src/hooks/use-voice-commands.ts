import { useAccessibility } from '@/contexts/AccessibilityContext';

/**
 * Hook to control voice commands state.
 * The actual voice recognition logic is handled by VoiceCommandManager component.
 */
export function useVoiceCommands() {
  const { voiceCommandsActive, setVoiceCommandsActive } = useAccessibility();

  const startListening = () => {
    setVoiceCommandsActive(true);
  };

  const stopListening = () => {
    setVoiceCommandsActive(false);
  };

  const toggleListening = () => {
    setVoiceCommandsActive(!voiceCommandsActive);
  };

  return { 
    startListening, 
    stopListening, 
    toggleListening,
    isListening: voiceCommandsActive 
  };
}
