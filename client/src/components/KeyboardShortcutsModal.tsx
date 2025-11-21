import { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { useAccessibility } from "@/contexts/AccessibilityContext";

interface Shortcut {
  keyLabel: string;
  descriptionEn: string;
  descriptionKa: string;
}

const shortcuts: Shortcut[] = [
  {
    keyLabel: "Tab",
    descriptionEn: "Navigate between elements",
    descriptionKa: "ელემენტებს შორის ნავიგაცია",
  },
  {
    keyLabel: "Shift + Tab",
    descriptionEn: "Navigate backwards",
    descriptionKa: "უკან ნავიგაცია",
  },
  {
    keyLabel: "D",
    descriptionEn: "Toggle dark mode",
    descriptionKa: "მუქი რეჟიმის ჩართვა/გამორთვა",
  },
  {
    keyLabel: "+",
    descriptionEn: "Increase font size",
    descriptionKa: "შრიფტის ზომის გაზრდა",
  },
  {
    keyLabel: "-",
    descriptionEn: "Decrease font size",
    descriptionKa: "შრიფტის ზომის შემცირება",
  },
  {
    keyLabel: "?",
    descriptionEn: "Show keyboard shortcuts",
    descriptionKa: "კლავიატურის მალსახელების ჩვენება",
  },
];

export function KeyboardShortcutsModal() {
  const [isOpen, setIsOpen] = useState(false);
  const { language, toggleTheme, setFontSize, fontSize } = useAccessibility();

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Ignore if user is typing in an input, textarea, or contenteditable
      const target = e.target as HTMLElement;
      if (
        target.tagName === "INPUT" ||
        target.tagName === "TEXTAREA" ||
        target.isContentEditable
      ) {
        return;
      }

      if (e.key === "?" || (e.shiftKey && e.key === "/")) {
        e.preventDefault();
        setIsOpen(true);
      }

      // Keyboard shortcuts for actions
      if (e.key === "d" || e.key === "D") {
        e.preventDefault();
        toggleTheme();
      }

      if (e.key === "+" || e.key === "=") {
        e.preventDefault();
        // Cycle: small -> medium -> large -> large
        if (fontSize === "small") setFontSize("medium");
        else if (fontSize === "medium") setFontSize("large");
        // If already large, stay large
      }

      if (e.key === "-" || e.key === "_") {
        e.preventDefault();
        // Cycle: large -> medium -> small -> small
        if (fontSize === "large") setFontSize("medium");
        else if (fontSize === "medium") setFontSize("small");
        // If already small, stay small
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [toggleTheme, setFontSize, fontSize]);

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>
            {language === "ka"
              ? "კლავიატურის მალსახელები"
              : "Keyboard Shortcuts"}
          </DialogTitle>
          <DialogDescription>
            {language === "ka"
              ? "სისტემის გართობის জন্য საკლავიატურო კომბინაციები"
              : "Quick keys to navigate and control the system"}
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-3">
          {shortcuts.map((shortcut, index) => (
            <div key={index} className="flex items-start justify-between gap-4">
              <div className="bg-muted px-3 py-1 rounded text-sm font-mono font-semibold text-foreground min-w-fit">
                {shortcut.keyLabel}
              </div>
              <p className="text-sm text-muted-foreground flex-1">
                {language === "ka"
                  ? shortcut.descriptionKa
                  : shortcut.descriptionEn}
              </p>
            </div>
          ))}
        </div>
      </DialogContent>
    </Dialog>
  );
}
