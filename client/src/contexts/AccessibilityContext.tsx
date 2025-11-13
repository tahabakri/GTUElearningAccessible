import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import type { Language } from '@/lib/translations';

export type FontSize = 'small' | 'medium' | 'large';
type Theme = 'light' | 'dark';
type Contrast = 'normal' | 'high';
type ColorblindMode = 'off' | 'deuteranopia' | 'protanopia' | 'tritanopia' | 'monochrome';

interface AccessibilityContextType {
  fontSize: FontSize;
  setFontSize: (size: FontSize) => void;
  theme: Theme;
  setTheme: (theme: Theme) => void;
  toggleTheme: () => void;
  colorblindMode: ColorblindMode;
  setColorblindMode: (mode: ColorblindMode) => void;
  contrast: Contrast;
  setContrast: (contrast: Contrast) => void;
  language: Language;
  setLanguage: (lang: Language) => void;
  voiceCommandsActive: boolean;
  setVoiceCommandsActive: (active: boolean) => void;
  screenReaderEnabled: boolean;
  setScreenReaderEnabled: (enabled: boolean) => void;
}

const AccessibilityContext = createContext<AccessibilityContextType | undefined>(undefined);

const fontSizeMultipliers = {
  small: 0.875,
  medium: 1,
  large: 1.125,
};

const STORAGE_KEY = 'gtu-accessibility-preferences';

export function AccessibilityProvider({ children }: { children: ReactNode }) {
  const [fontSize, setFontSizeState] = useState<FontSize>('medium');
  const [theme, setThemeState] = useState<Theme>('light');
  const [colorblindMode, setColorblindModeState] = useState<ColorblindMode>('off');
  const [contrast, setContrastState] = useState<Contrast>('normal');
  const [language, setLanguageState] = useState<Language>('en');
  const [voiceCommandsActive, setVoiceCommandsActive] = useState(false);
  const [screenReaderEnabled, setScreenReaderEnabledState] = useState(true);

  // Load preferences from localStorage on mount
  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      try {
        const prefs = JSON.parse(stored);
        if (prefs.fontSize) setFontSizeState(prefs.fontSize);
        if (prefs.theme) setThemeState(prefs.theme);
        if (prefs.colorblindMode) setColorblindModeState(prefs.colorblindMode);
        if (prefs.contrast) setContrastState(prefs.contrast);
        if (prefs.language) setLanguageState(prefs.language);
        if (prefs.screenReaderEnabled !== undefined) setScreenReaderEnabledState(prefs.screenReaderEnabled);
      } catch (e) {
        console.error('Failed to load accessibility preferences:', e);
      }
    }
  }, []);

  // Save preferences to localStorage whenever they change
  useEffect(() => {
    const prefs = {
      fontSize,
      theme,
      colorblindMode,
      contrast,
      language,
      screenReaderEnabled,
    };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(prefs));
  }, [fontSize, theme, colorblindMode, contrast, language, screenReaderEnabled]);

  const setFontSize = (size: FontSize) => setFontSizeState(size);
  const setTheme = (t: Theme) => setThemeState(t);
  const setColorblindMode = (mode: ColorblindMode) => setColorblindModeState(mode);
  const setContrast = (c: Contrast) => setContrastState(c);
  const setLanguage = (lang: Language) => setLanguageState(lang);
  const setScreenReaderEnabled = (enabled: boolean) => setScreenReaderEnabledState(enabled);

  useEffect(() => {
    // Create SVG filters for colorblind simulation
    // These are scientifically accurate color matrix transformations
    const svgFilter = document.createElement('div');
    svgFilter.id = 'colorblind-filter-container';
    svgFilter.style.position = 'absolute';
    svgFilter.style.width = '0';
    svgFilter.style.height = '0';
    svgFilter.style.overflow = 'hidden';
    svgFilter.innerHTML = `
      <svg xmlns="http://www.w3.org/2000/svg" style="display:none">
        <defs>
          <!-- Deuteranopia (Green-Blind) - Most common form (~6% of males) -->
          <filter id="deuteranopia-filter">
            <feColorMatrix type="matrix" values="
              0.625  0.375  0      0  0
              0.7    0.3    0      0  0
              0      0.3    0.7    0  0
              0      0      0      1  0
            "/>
          </filter>
          
          <!-- Protanopia (Red-Blind) - ~2% of males -->
          <filter id="protanopia-filter">
            <feColorMatrix type="matrix" values="
              0.567  0.433  0      0  0
              0.558  0.442  0      0  0
              0      0.242  0.758  0  0
              0      0      0      1  0
            "/>
          </filter>
          
          <!-- Tritanopia (Blue-Blind) - Rare ~0.01% -->
          <filter id="tritanopia-filter">
            <feColorMatrix type="matrix" values="
              0.95   0.05   0      0  0
              0      0.433  0.567  0  0
              0      0.475  0.525  0  0
              0      0      0      1  0
            "/>
          </filter>
        </defs>
      </svg>
    `;
    document.body.appendChild(svgFilter);

    return () => {
      const container = document.getElementById('colorblind-filter-container');
      if (container) {
        document.body.removeChild(container);
      }
    };
  }, []);

  useEffect(() => {
    const root = document.documentElement;
    const multiplier = fontSizeMultipliers[fontSize];
    root.style.fontSize = `${multiplier * 16}px`;
  }, [fontSize]);

  useEffect(() => {
    const root = document.documentElement;
    if (theme === 'dark') {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
  }, [theme]);

  useEffect(() => {
    const root = document.documentElement;
    root.classList.remove('colorblind-deuteranopia', 'colorblind-protanopia', 'colorblind-tritanopia', 'colorblind-monochrome');
    if (colorblindMode && colorblindMode !== 'off') {
      root.classList.add(`colorblind-${colorblindMode}`);
    }
  }, [colorblindMode]);

  useEffect(() => {
    const root = document.documentElement;
    if (contrast === 'high') {
      root.classList.add('high-contrast');
    } else {
      root.classList.remove('high-contrast');
    }
  }, [contrast]);

  const toggleTheme = () => {
    setTheme(theme === 'light' ? 'dark' : 'light');
  };

  return (
    <AccessibilityContext.Provider value={{
      fontSize,
      setFontSize,
      theme,
      setTheme,
      toggleTheme,
      colorblindMode,
      setColorblindMode,
      contrast,
      setContrast,
      language,
      setLanguage,
      voiceCommandsActive,
      setVoiceCommandsActive,
      screenReaderEnabled,
      setScreenReaderEnabled,
    }}>
      {children}
    </AccessibilityContext.Provider>
  );
}

export function useAccessibility() {
  const context = useContext(AccessibilityContext);
  if (context === undefined) {
    throw new Error('useAccessibility must be used within AccessibilityProvider');
  }
  return context;
}
