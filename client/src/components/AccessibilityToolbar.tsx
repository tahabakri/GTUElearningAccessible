import { Button } from '@/components/ui/button';
import { useAccessibility } from '@/contexts/AccessibilityContext';
import { Moon, Sun, Palette, Mic, MicOff, TypeIcon, Settings, Volume2, Eye, Check } from 'lucide-react';
import { useVoiceCommands } from '@/hooks/use-voice-commands';
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { useLocation } from 'wouter';
import { t } from '@/lib/translations';

interface AccessibilityToolbarProps {
  onSettingsClick?: () => void;
}

// Colorblind mode options with descriptions
const colorblindOptions = {
  en: [
    { value: 'off', label: 'Normal Vision', description: 'No simulation' },
    { value: 'deuteranopia', label: 'Deuteranopia', description: 'Green-blind (~6% males)' },
    { value: 'protanopia', label: 'Protanopia', description: 'Red-blind (~2% males)' },
    { value: 'tritanopia', label: 'Tritanopia', description: 'Blue-blind (rare)' },
    { value: 'monochrome', label: 'Monochrome', description: 'Grayscale (no color)' },
  ],
  ka: [
    { value: 'off', label: 'ნორმალური მხედველობა', description: 'სიმულაციის გარეშე' },
    { value: 'deuteranopia', label: 'დეიტერანოპია', description: 'მწვანე-ბრმა (~6% მამაკაცები)' },
    { value: 'protanopia', label: 'პროტანოპია', description: 'წითელი-ბრმა (~2% მამაკაცები)' },
    { value: 'tritanopia', label: 'ტრიტანოპია', description: 'ლურჯი-ბრმა (იშვიათი)' },
    { value: 'monochrome', label: 'მონოქრომი', description: 'შავ-თეთრი' },
  ],
};

export function AccessibilityToolbar({ onSettingsClick }: AccessibilityToolbarProps) {
  const {
    fontSize,
    setFontSize,
    theme,
    toggleTheme,
    colorblindMode,
    setColorblindMode,
    contrast,
    language,
    voiceCommandsActive,
    screenReaderEnabled,
    setScreenReaderEnabled,
  } = useAccessibility();

  const { startListening, stopListening } = useVoiceCommands();
  const [, setLocation] = useLocation();

  const currentOptions = language === 'ka' ? colorblindOptions.ka : colorblindOptions.en;
  const currentModeLabel = currentOptions.find(opt => opt.value === colorblindMode)?.label || 'Normal';

  return (
    <div className="flex items-center gap-2" role="toolbar" aria-label="Accessibility controls">
      <div className="flex items-center gap-1 border border-border rounded-md p-1">
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              variant={fontSize === 'small' ? 'secondary' : 'ghost'}
              size="sm"
              onClick={() => setFontSize('small')}
              data-testid="button-font-size-small"
              aria-label="Decrease font size"
              className="h-8 px-2"
            >
              <TypeIcon className="h-3 w-3 mr-1" />
              <span className="text-xs">A-</span>
            </Button>
          </TooltipTrigger>
          <TooltipContent>
            <p>{t('fontSizeSmall', language)}</p>
          </TooltipContent>
        </Tooltip>

        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              variant={fontSize === 'medium' ? 'secondary' : 'ghost'}
              size="sm"
              onClick={() => setFontSize('medium')}
              data-testid="button-font-size-medium"
              aria-label="Default font size"
              className="h-8 px-2"
            >
              <TypeIcon className="h-4 w-4 mr-1" />
              <span className="text-sm">A</span>
            </Button>
          </TooltipTrigger>
          <TooltipContent>
            <p>{t('fontSizeDefault', language)}</p>
          </TooltipContent>
        </Tooltip>

        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              variant={fontSize === 'large' ? 'secondary' : 'ghost'}
              size="sm"
              onClick={() => setFontSize('large')}
              data-testid="button-font-size-large"
              aria-label="Increase font size"
              className="h-8 px-2"
            >
              <TypeIcon className="h-5 w-5 mr-1" />
              <span className="text-base">A+</span>
            </Button>
          </TooltipTrigger>
          <TooltipContent>
            <p>{t('fontSizeLarge', language)}</p>
          </TooltipContent>
        </Tooltip>
      </div>

      <Tooltip>
        <TooltipTrigger asChild>
          <Button
            variant={theme === 'dark' ? 'secondary' : 'ghost'}
            size="icon"
            onClick={toggleTheme}
            data-testid="button-theme-toggle"
            aria-label={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
            className="h-9"
          >
            {theme === 'dark' ? (
              <Sun className="h-5 w-5" />
            ) : (
              <Moon className="h-5 w-5" />
            )}
          </Button>
        </TooltipTrigger>
        <TooltipContent>
          <p>{theme === 'dark' ? t('lightMode', language) : t('darkMode', language)}</p>
        </TooltipContent>
      </Tooltip>

      {/* Colorblind Simulation Dropdown */}
      <DropdownMenu>
        <Tooltip>
          <TooltipTrigger asChild>
            <DropdownMenuTrigger asChild>
              <Button
                variant={colorblindMode !== 'off' ? 'secondary' : 'ghost'}
                size="icon"
                data-testid="button-colorblind-menu"
                aria-label={language === 'ka' ? 'ფერთა სიმულაცია' : 'Simulate Colorblindness'}
                className="h-9"
              >
                <Eye className="h-5 w-5" />
              </Button>
            </DropdownMenuTrigger>
          </TooltipTrigger>
          <TooltipContent>
            <p>{language === 'ka' ? 'ფერთა სიმულაცია' : 'Colorblind Simulation'}</p>
          </TooltipContent>
        </Tooltip>
        <DropdownMenuContent align="center" className="w-56">
          <DropdownMenuLabel className="flex items-center gap-2">
            <Palette className="h-4 w-4" />
            {language === 'ka' ? 'ფერთა სიმულაცია' : 'Color Vision Simulation'}
          </DropdownMenuLabel>
          <DropdownMenuSeparator />
          {currentOptions.map((option) => (
            <DropdownMenuItem
              key={option.value}
              onClick={() => setColorblindMode(option.value as any)}
              className={`flex items-center justify-between cursor-pointer ${
                colorblindMode === option.value ? 'bg-accent' : ''
              }`}
              data-testid={`colorblind-option-${option.value}`}
            >
              <div className="flex flex-col">
                <span className="font-medium">{option.label}</span>
                <span className="text-xs text-muted-foreground">{option.description}</span>
              </div>
              {colorblindMode === option.value && (
                <Check className="h-4 w-4 text-primary" />
              )}
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>

      <Tooltip>
        <TooltipTrigger asChild>
          <Button
            variant={voiceCommandsActive ? 'secondary' : 'ghost'}
            size="icon"
            onClick={() => {
              if (voiceCommandsActive) {
                stopListening();
              } else {
                startListening();
              }
            }}
            data-testid="button-voice-commands"
            aria-label={voiceCommandsActive ? 'Stop voice commands' : 'Start voice commands'}
            className="h-9"
          >
            {voiceCommandsActive ? (
              <Mic className="h-5 w-5 text-primary" />
            ) : (
              <MicOff className="h-5 w-5" />
            )}
          </Button>
        </TooltipTrigger>
        <TooltipContent>
          <p>{voiceCommandsActive ? t('voiceCommands', language) + ' active' : 'Enable ' + t('voiceCommands', language)}</p>
        </TooltipContent>
      </Tooltip>

      <Tooltip>
        <TooltipTrigger asChild>
          <Button
            variant={screenReaderEnabled ? 'secondary' : 'ghost'}
            size="icon"
            onClick={() => setScreenReaderEnabled(!screenReaderEnabled)}
            data-testid="button-screen-reader-toggle"
            aria-label={screenReaderEnabled ? 'Disable screen reader' : 'Enable screen reader'}
            className="h-9"
          >
            {screenReaderEnabled ? (
              <Volume2 className="h-5 w-5 text-primary" />
            ) : (
              <Volume2 className="h-5 w-5 opacity-50" />
            )}
          </Button>
        </TooltipTrigger>
        <TooltipContent>
          <p>{screenReaderEnabled ? 'Screen reader' : 'Enable screen'} {screenReaderEnabled ? 'enabled' : 'reader'}</p>
        </TooltipContent>
      </Tooltip>

      <Tooltip>
        <TooltipTrigger asChild>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => onSettingsClick?.()}
            data-testid="button-accessibility-settings"
            aria-label="Accessibility settings"
            className="h-9"
          >
            <Settings className="h-5 w-5" />
          </Button>
        </TooltipTrigger>
        <TooltipContent>
          <p>{t('accessibility', language)} settings</p>
        </TooltipContent>
      </Tooltip>
    </div>
  );
}
