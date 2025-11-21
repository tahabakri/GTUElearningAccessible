import { useState, useEffect, useRef } from "react";
import { useAccessibility } from "@/contexts/AccessibilityContext";

export function LiveAnnouncer() {
  const [announcement, setAnnouncement] = useState("");
  const { theme, language, fontSize, contrast, colorblindMode } =
    useAccessibility();

  // Use refs to track previous values so we only announce changes
  const prevTheme = useRef(theme);
  const prevFontSize = useRef(fontSize);
  const prevContrast = useRef(contrast);
  const prevColorblindMode = useRef(colorblindMode);
  const prevLanguage = useRef(language);
  const isFirstRender = useRef(true);

  useEffect(() => {
    // Skip announcement on first render
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }

    let message = "";

    // Theme changes
    if (prevTheme.current !== theme) {
      if (theme === "dark") {
        message =
          language === "ka" ? "მუქი რეჟიმი ჩართულია" : "Dark mode enabled";
      } else {
        message =
          language === "ka" ? "ღია რეჟიმი ჩართულია" : "Light mode enabled";
      }
      prevTheme.current = theme;
    }

    // Font size changes
    if (prevFontSize.current !== fontSize) {
      if (fontSize === "large") {
        message =
          language === "ka" ? "შრიფტის ზომა გაიზარდა" : "Font size increased";
      } else if (fontSize === "small") {
        message =
          language === "ka" ? "შრიფტის ზომა შემცირდა" : "Font size decreased";
      } else {
        message =
          language === "ka" ? "შრიფტის ზომა ნორმალურია" : "Font size normal";
      }
      prevFontSize.current = fontSize;
    }

    // Contrast changes
    if (prevContrast.current !== contrast) {
      if (contrast === "high") {
        message =
          language === "ka"
            ? "მაღალი კონტრასტი ჩართულია"
            : "High contrast enabled";
      } else {
        message =
          language === "ka"
            ? "მაღალი კონტრასტი გამორთულია"
            : "High contrast disabled";
      }
      prevContrast.current = contrast;
    }

    // Colorblind mode changes
    if (prevColorblindMode.current !== colorblindMode) {
      if (colorblindMode !== "off") {
        message =
          language === "ka"
            ? "დალტონიზმის რეჟიმი ჩართულია"
            : `Colorblind mode: ${colorblindMode}`;
      } else {
        message =
          language === "ka"
            ? "დალტონიზმის რეჟიმი გამორთულია"
            : "Colorblind mode disabled";
      }
      prevColorblindMode.current = colorblindMode;
    }

    // Language changes
    if (prevLanguage.current !== language) {
      message =
        language === "ka"
          ? "ენა შეიცვალა ქართულზე"
          : "Language changed to English";
      prevLanguage.current = language;
    }

    if (message) {
      setAnnouncement(message);
      // Clear announcement after a short delay so screen readers don't get stuck on it
      const timer = setTimeout(() => setAnnouncement(""), 1000);
      return () => clearTimeout(timer);
    }
  }, [theme, fontSize, contrast, colorblindMode, language]);

  return (
    <div
      role="status"
      aria-live="polite"
      aria-atomic="true"
      className="sr-only"
      data-testid="live-announcer"
    >
      {announcement}
    </div>
  );
}
