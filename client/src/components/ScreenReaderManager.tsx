import { useEffect, useRef } from "react";
import { useAccessibility } from "@/contexts/AccessibilityContext";

export function ScreenReaderManager() {
  const { screenReaderEnabled } = useAccessibility();
  const lastReadElement = useRef<HTMLElement | null>(null);

  // Helper: Determine what text to speak based on the element type
  const getSpeakableText = (element: HTMLElement): string => {
    // 1. Don't read hidden elements
    if (element.offsetParent === null) return "";

    // 2. Check for Accessibility Labels first (Highest Priority)
    const ariaLabel = element.getAttribute("aria-label");
    if (ariaLabel) return ariaLabel;

    const ariaLabelledBy = element.getAttribute("aria-labelledby");
    if (ariaLabelledBy) {
      const labelElement = document.getElementById(ariaLabelledBy);
      if (labelElement?.innerText) return labelElement.innerText;
    }

    // 3. Check for Images
    if (element.tagName === "IMG") {
      return (element as HTMLImageElement).alt || "Image";
    }

    // 4. Check for Inputs
    if (element.tagName === "INPUT" || element.tagName === "TEXTAREA") {
      const placeholder = (element as HTMLInputElement).placeholder;
      const value = (element as HTMLInputElement).value;
      // Read label if exists, otherwise placeholder, otherwise value
      const id = element.id;
      if (id) {
        const label = document.querySelector(`label[for="${id}"]`);
        if (label instanceof HTMLElement) {
          return value ? `${label.innerText}, ${value}` : label.innerText;
        }
      }
      return placeholder || value || "Input field";
    }

    // 5. Check for Buttons - get text content
    if (element.tagName === "BUTTON") {
      return element.innerText || element.textContent || "Button";
    }

    // 6. Check for Links
    if (element.tagName === "A") {
      const text = element.innerText || element.textContent;
      return text ? `Link: ${text}` : "Link";
    }

    // 7. Standard Text Content
    // We use innerText to respect CSS display:none, unlike textContent
    const text = element.innerText || element.textContent || "";

    // Limit length to avoid reading entire paragraphs
    if (text.length > 200) {
      return text.substring(0, 200) + "...";
    }

    return text;
  };

  // Helper: Trigger the browser voice
  const speak = (text: string) => {
    if (!text || text.trim().length === 0) return;

    // STOP previous voice immediately
    window.speechSynthesis.cancel();

    const utterance = new SpeechSynthesisUtterance(text);

    // Adjust voice settings for better clarity
    utterance.rate = 1.0; // Normal speed
    utterance.pitch = 1.0; // Normal pitch
    utterance.volume = 1.0; // Full volume

    // Optional: Adjust voice based on language
    const htmlLang = document.documentElement.lang;
    if (htmlLang) {
      utterance.lang = htmlLang;
    }

    window.speechSynthesis.speak(utterance);
  };

  useEffect(() => {
    // If the feature is turned off in settings, do nothing & stop speaking
    if (!screenReaderEnabled) {
      window.speechSynthesis.cancel();
      return;
    }

    // --- MOUSE HANDLERS ---
    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;

      // Optimization: Only read specific interactive or text-heavy elements
      // to avoid reading container divs repeatedly
      const relevantTags = [
        "P",
        "H1",
        "H2",
        "H3",
        "H4",
        "H5",
        "H6",
        "BUTTON",
        "A",
        "IMG",
        "INPUT",
        "TEXTAREA",
        "LABEL",
        "LI",
        "SPAN",
        "TD",
        "TH",
      ];

      const isRelevant =
        relevantTags.includes(target.tagName) ||
        target.getAttribute("role") !== null ||
        target.hasAttribute("aria-label");

      if (target !== lastReadElement.current && isRelevant) {
        const text = getSpeakableText(target);
        if (text) {
          speak(text);
          lastReadElement.current = target;
        }
      }
    };

    const handleMouseOut = () => {
      // Stop speaking when leaving an element
      window.speechSynthesis.cancel();
      lastReadElement.current = null;
    };

    // --- KEYBOARD (TAB) HANDLERS ---
    const handleFocusIn = (e: FocusEvent) => {
      const target = e.target as HTMLElement;
      const text = getSpeakableText(target);
      if (text) {
        speak(text);
        lastReadElement.current = target;
      }
    };

    const handleFocusOut = () => {
      // Stop speaking when focus leaves
      window.speechSynthesis.cancel();
      lastReadElement.current = null;
    };

    // Attach Listeners Globally
    document.addEventListener("mouseover", handleMouseOver);
    document.addEventListener("mouseout", handleMouseOut);
    document.addEventListener("focusin", handleFocusIn); // 'focusin' bubbles, 'focus' does not
    document.addEventListener("focusout", handleFocusOut);

    // Cleanup
    return () => {
      window.speechSynthesis.cancel();
      document.removeEventListener("mouseover", handleMouseOver);
      document.removeEventListener("mouseout", handleMouseOut);
      document.removeEventListener("focusin", handleFocusIn);
      document.removeEventListener("focusout", handleFocusOut);
    };
  }, [screenReaderEnabled]);

  return null; // This component renders nothing visual
}
