import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { useAccessibility } from '@/contexts/AccessibilityContext';
import { t } from '@/lib/translations';
import { X, RotateCcw } from 'lucide-react';
import type { Language } from '@/lib/translations';
import type { FontSize } from '@/contexts/AccessibilityContext';

interface AccessibilitySettingsProps {
  onClose?: () => void;
}

export function AccessibilitySettings({ onClose }: AccessibilitySettingsProps) {
  const {
    fontSize,
    setFontSize,
    theme,
    setTheme,
    colorblindMode,
    setColorblindMode,
    contrast,
    setContrast,
    language,
    setLanguage,
  } = useAccessibility();

  const handleReset = () => {
    setFontSize('medium' as FontSize);
    setTheme('light');
    setColorblindMode('off');
    setContrast('normal');
    setLanguage('en' as Language);
  };

  return (
    <div className="w-full max-w-2xl mx-auto space-y-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-semibold">{t('accessibility', language)}</h2>
        {onClose && (
          <Button variant="ghost" size="icon" onClick={onClose}>
            <X className="h-5 w-5" />
          </Button>
        )}
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="text-lg">{t('fontSizeSmall', language).slice(0, -5)}</CardTitle>
          <CardDescription>Adjust text size for readability</CardDescription>
        </CardHeader>
        <CardContent>
          <Select value={fontSize} onValueChange={(v) => setFontSize(v as FontSize)}>
            <SelectTrigger data-testid="select-font-size">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="small">{t('fontSizeSmall', language)}</SelectItem>
              <SelectItem value="medium">{t('fontSizeDefault', language)}</SelectItem>
              <SelectItem value="large">{t('fontSizeLarge', language)}</SelectItem>
            </SelectContent>
          </Select>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-lg">{t('contrast', language)}</CardTitle>
          <CardDescription>Adjust text and background contrast</CardDescription>
        </CardHeader>
        <CardContent>
          <Select value={contrast} onValueChange={(v) => setContrast(v as any)}>
            <SelectTrigger data-testid="select-contrast">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="normal">{t('normal', language)}</SelectItem>
              <SelectItem value="high">{t('highContrast', language)}</SelectItem>
            </SelectContent>
          </Select>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-lg">{t('colorblindSimulation', language)}</CardTitle>
          <CardDescription>Simulate color vision deficiencies</CardDescription>
        </CardHeader>
        <CardContent>
          <Select value={colorblindMode} onValueChange={(v) => setColorblindMode(v as any)}>
            <SelectTrigger data-testid="select-colorblind">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="off">{t('off', language)}</SelectItem>
              <SelectItem value="deuteranopia">{t('deuteranopia', language)}</SelectItem>
              <SelectItem value="protanopia">{t('protanopia', language)}</SelectItem>
              <SelectItem value="tritanopia">{t('tritanopia', language)}</SelectItem>
              <SelectItem value="monochrome">{t('monochrome', language)}</SelectItem>
            </SelectContent>
          </Select>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-lg">{t('theme', language)}</CardTitle>
          <CardDescription>Choose light or dark theme</CardDescription>
        </CardHeader>
        <CardContent>
          <Select value={theme} onValueChange={(v) => setTheme(v as any)}>
            <SelectTrigger data-testid="select-theme">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="light">{t('lightMode', language)}</SelectItem>
              <SelectItem value="dark">{t('darkMode', language)}</SelectItem>
            </SelectContent>
          </Select>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-lg">{t('language', language)}</CardTitle>
          <CardDescription>Select your preferred language</CardDescription>
        </CardHeader>
        <CardContent>
          <Select value={language} onValueChange={(v) => setLanguage(v as Language)}>
            <SelectTrigger data-testid="select-language">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="en">{t('english', language)}</SelectItem>
              <SelectItem value="ka">{t('georgian', language)}</SelectItem>
            </SelectContent>
          </Select>
        </CardContent>
      </Card>

      <Button
        variant="outline"
        onClick={handleReset}
        className="w-full"
        data-testid="button-reset-accessibility"
      >
        <RotateCcw className="mr-2 h-4 w-4" />
        Reset to defaults
      </Button>
    </div>
  );
}
