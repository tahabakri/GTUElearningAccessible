import { useEffect, useRef, useState, useCallback } from "react";
import { useLocation } from "wouter";
import { useAccessibility } from "@/contexts/AccessibilityContext";
import { useAuth } from "@/contexts/AuthContext";
import { useToast } from "@/hooks/use-toast";
import { Mic, MicOff } from "lucide-react";
import { courses, weeklySchedule, getDayName } from "@shared/mockData";

// TypeScript declarations for Web Speech API
interface SpeechRecognitionEvent extends Event {
  results: SpeechRecognitionResultList;
  resultIndex: number;
}

interface SpeechRecognitionResultList {
  length: number;
  item(index: number): SpeechRecognitionResult;
  [index: number]: SpeechRecognitionResult;
}

interface SpeechRecognitionResult {
  isFinal: boolean;
  length: number;
  item(index: number): SpeechRecognitionAlternative;
  [index: number]: SpeechRecognitionAlternative;
}

interface SpeechRecognitionAlternative {
  transcript: string;
  confidence: number;
}

interface SpeechRecognitionErrorEvent extends Event {
  error: string;
  message: string;
}

interface SpeechRecognition extends EventTarget {
  continuous: boolean;
  interimResults: boolean;
  lang: string;
  start(): void;
  stop(): void;
  abort(): void;
  onresult: ((event: SpeechRecognitionEvent) => void) | null;
  onerror: ((event: SpeechRecognitionErrorEvent) => void) | null;
  onend: (() => void) | null;
  onstart: (() => void) | null;
}

declare global {
  interface Window {
    SpeechRecognition: new () => SpeechRecognition;
    webkitSpeechRecognition: new () => SpeechRecognition;
  }
}

export function VoiceCommandManager() {
  const { 
    voiceCommandsActive, 
    setTheme, 
    language, 
    setLanguage,
    setFontSize,
    fontSize,
    contrast,
    setContrast,
    screenReaderEnabled,
    setScreenReaderEnabled,
    setColorblindMode
  } = useAccessibility();
  const { logout } = useAuth();
  const [location, setLocation] = useLocation();
  const { toast } = useToast();
  const [isListening, setIsListening] = useState(false);
  const [lastCommand, setLastCommand] = useState<string | null>(null);
  const recognitionRef = useRef<SpeechRecognition | null>(null);
  const isInitializedRef = useRef(false);

  // Store refs for callbacks to avoid stale closures
  const voiceCommandsActiveRef = useRef(voiceCommandsActive);
  const languageRef = useRef(language);
  const locationRef = useRef(location);
  const fontSizeRef = useRef(fontSize);
  const contrastRef = useRef(contrast);
  const screenReaderRef = useRef(screenReaderEnabled);
  
  useEffect(() => {
    voiceCommandsActiveRef.current = voiceCommandsActive;
  }, [voiceCommandsActive]);
  
  useEffect(() => {
    languageRef.current = language;
  }, [language]);

  useEffect(() => {
    locationRef.current = location;
  }, [location]);

  useEffect(() => {
    fontSizeRef.current = fontSize;
  }, [fontSize]);

  useEffect(() => {
    contrastRef.current = contrast;
  }, [contrast]);

  useEffect(() => {
    screenReaderRef.current = screenReaderEnabled;
  }, [screenReaderEnabled]);

  // Helper function to speak text using Web Speech API
  const speak = useCallback((text: string) => {
    if ('speechSynthesis' in window) {
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = languageRef.current === 'ka' ? 'ka-GE' : 'en-US';
      utterance.rate = 0.9;
      window.speechSynthesis.speak(utterance);
    }
  }, []);

  // Font size cycle helper
  const cycleFontSize = useCallback((direction: 'up' | 'down') => {
    const sizes: Array<'small' | 'medium' | 'large'> = ['small', 'medium', 'large'];
    const currentIndex = sizes.indexOf(fontSizeRef.current);
    if (direction === 'up' && currentIndex < sizes.length - 1) {
      const newSize = sizes[currentIndex + 1];
      setFontSize(newSize);
      speak(`Font size set to ${newSize}`);
    } else if (direction === 'down' && currentIndex > 0) {
      const newSize = sizes[currentIndex - 1];
      setFontSize(newSize);
      speak(`Font size set to ${newSize}`);
    }
  }, [setFontSize, speak]);

  const processCommand = useCallback((transcript: string) => {
    const normalizedTranscript = transcript.toLowerCase().trim();
    setLastCommand(normalizedTranscript);

    // ============================================
    // COMPREHENSIVE VOICE COMMAND DICTIONARY
    // ============================================
    
    const commands: Record<string, () => void> = {
      // ========== NAVIGATION COMMANDS ==========
      
      // Dashboard
      "go to dashboard": () => setLocation("/dashboard"),
      "dashboard": () => setLocation("/dashboard"),
      "open dashboard": () => setLocation("/dashboard"),
      "show dashboard": () => setLocation("/dashboard"),
      "main page": () => setLocation("/dashboard"),
      "დაფა": () => setLocation("/dashboard"),
      
      // Grades
      "go to grades": () => setLocation("/grades"),
      "grades": () => setLocation("/grades"),
      "open grades": () => setLocation("/grades"),
      "show grades": () => setLocation("/grades"),
      "my grades": () => setLocation("/grades"),
      "view grades": () => setLocation("/grades"),
      "შეფასებები": () => setLocation("/grades"),
      
      // Messages
      "go to messages": () => setLocation("/messages"),
      "messages": () => setLocation("/messages"),
      "open messages": () => setLocation("/messages"),
      "show messages": () => setLocation("/messages"),
      "inbox": () => setLocation("/messages"),
      "შეტყობინებები": () => setLocation("/messages"),
      
      // Profile
      "go to profile": () => setLocation("/profile"),
      "profile": () => setLocation("/profile"),
      "open profile": () => setLocation("/profile"),
      "my profile": () => setLocation("/profile"),
      "account": () => setLocation("/profile"),
      "პროფილი": () => setLocation("/profile"),
      
      // Courses List
      "go to courses": () => setLocation("/courses"),
      "courses": () => setLocation("/courses"),
      "open courses": () => setLocation("/courses"),
      "my courses": () => setLocation("/courses"),
      "all courses": () => setLocation("/courses"),
      "course list": () => setLocation("/courses"),
      "კურსები": () => setLocation("/courses"),
      
      // Calendar
      "go to calendar": () => setLocation("/calendar"),
      "calendar": () => setLocation("/calendar"),
      "open calendar": () => setLocation("/calendar"),
      "schedule": () => setLocation("/calendar"),
      "კალენდარი": () => setLocation("/calendar"),
      
      // Notifications
      "go to notifications": () => setLocation("/notifications"),
      "notifications": () => setLocation("/notifications"),
      "open notifications": () => setLocation("/notifications"),
      "alerts": () => setLocation("/notifications"),
      "გაფრთხილებები": () => setLocation("/notifications"),
      
      // Help
      "go to help": () => setLocation("/help"),
      "help": () => {
        setLocation("/help");
        speak(languageRef.current === 'ka' 
          ? 'დახმარების გვერდი გაიხსნა' 
          : 'Opening help page');
      },
      "open help": () => setLocation("/help"),
      "support": () => setLocation("/help"),
      "დახმარება": () => setLocation("/help"),
      
      // Accessibility Settings
      "go to accessibility": () => setLocation("/accessibility"),
      "accessibility": () => setLocation("/accessibility"),
      "accessibility settings": () => setLocation("/accessibility"),
      "open accessibility": () => setLocation("/accessibility"),
      "ხელმისაწვდომობა": () => setLocation("/accessibility"),
      
      // Home / Landing
      "go home": () => setLocation("/"),
      "home": () => setLocation("/"),
      "home page": () => setLocation("/"),
      "landing": () => setLocation("/"),
      "მთავარი": () => setLocation("/"),
      
      // Login
      "login": () => setLocation("/login"),
      "sign in": () => setLocation("/login"),
      "log in": () => setLocation("/login"),
      "შესვლა": () => setLocation("/login"),
      
      // Logout
      "logout": () => { logout(); setLocation("/"); },
      "sign out": () => { logout(); setLocation("/"); },
      "log out": () => { logout(); setLocation("/"); },
      "გამოსვლა": () => { logout(); setLocation("/"); },

      // ========== COURSE NAVIGATION (NUMBERED 1-10) ==========
      // All courses with their GTU course codes (matching mockData.ts)
      
      // === COURSE 1: Human–Computer Interaction (2025-2026(F)-10769) ===
      "course 1": () => { setLocation("/course/2025-2026(F)-10769"); speak("Opening Human Computer Interaction"); },
      "course one": () => { setLocation("/course/2025-2026(F)-10769"); speak("Opening Human Computer Interaction"); },
      "first course": () => { setLocation("/course/2025-2026(F)-10769"); speak("Opening Human Computer Interaction"); },
      "open hci": () => setLocation("/course/2025-2026(F)-10769"),
      "human computer interaction": () => setLocation("/course/2025-2026(F)-10769"),
      "hci": () => setLocation("/course/2025-2026(F)-10769"),
      "ადამიანი კომპიუტერი": () => setLocation("/course/2025-2026(F)-10769"),
      "კურსი 1": () => setLocation("/course/2025-2026(F)-10769"),
      "პირველი კურსი": () => setLocation("/course/2025-2026(F)-10769"),
      
      // === COURSE 2: Organization of Computer Networks (2025-2026(F)-10785) ===
      "course 2": () => { setLocation("/course/2025-2026(F)-10785"); speak("Opening Computer Networks"); },
      "course two": () => { setLocation("/course/2025-2026(F)-10785"); speak("Opening Computer Networks"); },
      "second course": () => { setLocation("/course/2025-2026(F)-10785"); speak("Opening Computer Networks"); },
      "open networks": () => setLocation("/course/2025-2026(F)-10785"),
      "computer networks": () => setLocation("/course/2025-2026(F)-10785"),
      "organization of computer networks": () => setLocation("/course/2025-2026(F)-10785"),
      "networks": () => setLocation("/course/2025-2026(F)-10785"),
      "ქსელები": () => setLocation("/course/2025-2026(F)-10785"),
      "კურსი 2": () => setLocation("/course/2025-2026(F)-10785"),
      "მეორე კურსი": () => setLocation("/course/2025-2026(F)-10785"),
      
      // === COURSE 3: Python Programming (2025-2026(F)-10780) ===
      "course 3": () => { setLocation("/course/2025-2026(F)-10780"); speak("Opening Python Programming"); },
      "course three": () => { setLocation("/course/2025-2026(F)-10780"); speak("Opening Python Programming"); },
      "third course": () => { setLocation("/course/2025-2026(F)-10780"); speak("Opening Python Programming"); },
      "open python": () => setLocation("/course/2025-2026(F)-10780"),
      "python programming": () => setLocation("/course/2025-2026(F)-10780"),
      "python course": () => setLocation("/course/2025-2026(F)-10780"),
      "python": () => setLocation("/course/2025-2026(F)-10780"),
      "პითონი": () => setLocation("/course/2025-2026(F)-10780"),
      "კურსი 3": () => setLocation("/course/2025-2026(F)-10780"),
      "მესამე კურსი": () => setLocation("/course/2025-2026(F)-10780"),
      
      // === COURSE 4: Computer Architecture (2025-2026(F)-10768) ===
      "course 4": () => { setLocation("/course/2025-2026(F)-10768"); speak("Opening Computer Architecture"); },
      "course four": () => { setLocation("/course/2025-2026(F)-10768"); speak("Opening Computer Architecture"); },
      "fourth course": () => { setLocation("/course/2025-2026(F)-10768"); speak("Opening Computer Architecture"); },
      "open architecture": () => setLocation("/course/2025-2026(F)-10768"),
      "computer architecture": () => setLocation("/course/2025-2026(F)-10768"),
      "architecture": () => setLocation("/course/2025-2026(F)-10768"),
      "არქიტექტურა": () => setLocation("/course/2025-2026(F)-10768"),
      "კურსი 4": () => setLocation("/course/2025-2026(F)-10768"),
      "მეოთხე კურსი": () => setLocation("/course/2025-2026(F)-10768"),
      
      // === COURSE 5: Introduction to Information Security (2025-2026(F)-10783) ===
      "course 5": () => { setLocation("/course/2025-2026(F)-10783"); speak("Opening Information Security"); },
      "course five": () => { setLocation("/course/2025-2026(F)-10783"); speak("Opening Information Security"); },
      "fifth course": () => { setLocation("/course/2025-2026(F)-10783"); speak("Opening Information Security"); },
      "open security": () => setLocation("/course/2025-2026(F)-10783"),
      "information security": () => setLocation("/course/2025-2026(F)-10783"),
      "intro security": () => setLocation("/course/2025-2026(F)-10783"),
      "security": () => setLocation("/course/2025-2026(F)-10783"),
      "უსაფრთხოება": () => setLocation("/course/2025-2026(F)-10783"),
      "კურსი 5": () => setLocation("/course/2025-2026(F)-10783"),
      "მეხუთე კურსი": () => setLocation("/course/2025-2026(F)-10783"),
      
      // === COURSE 6: Society, Ethics and Technology (2025-2026(F)-10799) ===
      "course 6": () => { setLocation("/course/2025-2026(F)-10799"); speak("Opening Society Ethics and Technology"); },
      "course six": () => { setLocation("/course/2025-2026(F)-10799"); speak("Opening Society Ethics and Technology"); },
      "sixth course": () => { setLocation("/course/2025-2026(F)-10799"); speak("Opening Society Ethics and Technology"); },
      "open ethics": () => setLocation("/course/2025-2026(F)-10799"),
      "society ethics": () => setLocation("/course/2025-2026(F)-10799"),
      "society ethics and technology": () => setLocation("/course/2025-2026(F)-10799"),
      "ethics": () => setLocation("/course/2025-2026(F)-10799"),
      "ეთიკა": () => setLocation("/course/2025-2026(F)-10799"),
      "კურსი 6": () => setLocation("/course/2025-2026(F)-10799"),
      "მეექვსე კურსი": () => setLocation("/course/2025-2026(F)-10799"),
      
      // === COURSE 7: Fundamentals of Web Technologies (26-10781) ===
      "course 7": () => { setLocation("/course/26-10781"); speak("Opening Web Technologies"); },
      "course seven": () => { setLocation("/course/26-10781"); speak("Opening Web Technologies"); },
      "seventh course": () => { setLocation("/course/26-10781"); speak("Opening Web Technologies"); },
      "open web": () => setLocation("/course/26-10781"),
      "web technologies": () => setLocation("/course/26-10781"),
      "fundamentals of web": () => setLocation("/course/26-10781"),
      "web fundamentals": () => setLocation("/course/26-10781"),
      "ვები": () => setLocation("/course/26-10781"),
      "კურსი 7": () => setLocation("/course/26-10781"),
      "მეშვიდე კურსი": () => setLocation("/course/26-10781"),
      
      // === COURSE 8: Statistical Models and Simulation SPSS (26-10782) ===
      "course 8": () => { setLocation("/course/26-10782"); speak("Opening Statistical Models and Simulation"); },
      "course eight": () => { setLocation("/course/26-10782"); speak("Opening Statistical Models and Simulation"); },
      "eighth course": () => { setLocation("/course/26-10782"); speak("Opening Statistical Models and Simulation"); },
      "open statistics": () => setLocation("/course/26-10782"),
      "statistical models": () => setLocation("/course/26-10782"),
      "spss": () => setLocation("/course/26-10782"),
      "statistics": () => setLocation("/course/26-10782"),
      "simulation": () => setLocation("/course/26-10782"),
      "სტატისტიკა": () => setLocation("/course/26-10782"),
      "კურსი 8": () => setLocation("/course/26-10782"),
      "მერვე კურსი": () => setLocation("/course/26-10782"),
      
      // === COURSE 9: Distributed Database Systems (26-10786) ===
      "course 9": () => { setLocation("/course/26-10786"); speak("Opening Distributed Database Systems"); },
      "course nine": () => { setLocation("/course/26-10786"); speak("Opening Distributed Database Systems"); },
      "ninth course": () => { setLocation("/course/26-10786"); speak("Opening Distributed Database Systems"); },
      "open database": () => setLocation("/course/26-10786"),
      "distributed database": () => setLocation("/course/26-10786"),
      "distributed database systems": () => setLocation("/course/26-10786"),
      "database systems": () => setLocation("/course/26-10786"),
      "მონაცემთა ბაზები": () => setLocation("/course/26-10786"),
      "კურსი 9": () => setLocation("/course/26-10786"),
      "მეცხრე კურსი": () => setLocation("/course/26-10786"),
      
      // === COURSE 10: Discrete Mathematics (26-5737) ===
      "course 10": () => { setLocation("/course/26-5737"); speak("Opening Discrete Mathematics"); },
      "course ten": () => { setLocation("/course/26-5737"); speak("Opening Discrete Mathematics"); },
      "tenth course": () => { setLocation("/course/26-5737"); speak("Opening Discrete Mathematics"); },
      "open discrete": () => setLocation("/course/26-5737"),
      "discrete mathematics": () => setLocation("/course/26-5737"),
      "discrete math": () => setLocation("/course/26-5737"),
      "discrete": () => setLocation("/course/26-5737"),
      "დისკრეტული": () => setLocation("/course/26-5737"),
      "კურსი 10": () => setLocation("/course/26-5737"),
      "მეათე კურსი": () => setLocation("/course/26-5737"),

      // ========== THEME COMMANDS ==========
      
      "dark mode": () => { setTheme("dark"); speak("Dark mode enabled"); },
      "enable dark mode": () => { setTheme("dark"); speak("Dark mode enabled"); },
      "turn on dark mode": () => { setTheme("dark"); speak("Dark mode enabled"); },
      "switch to dark": () => { setTheme("dark"); speak("Dark mode enabled"); },
      "night mode": () => { setTheme("dark"); speak("Dark mode enabled"); },
      "მუქი რეჟიმი": () => setTheme("dark"),
      
      "light mode": () => { setTheme("light"); speak("Light mode enabled"); },
      "disable dark mode": () => { setTheme("light"); speak("Light mode enabled"); },
      "turn off dark mode": () => { setTheme("light"); speak("Light mode enabled"); },
      "switch to light": () => { setTheme("light"); speak("Light mode enabled"); },
      "day mode": () => { setTheme("light"); speak("Light mode enabled"); },
      "ნათელი რეჟიმი": () => setTheme("light"),

      // ========== ACCESSIBILITY COMMANDS ==========
      
      // Font Size (using cycling through small/medium/large)
      "increase font": () => cycleFontSize('up'),
      "bigger font": () => cycleFontSize('up'),
      "larger text": () => cycleFontSize('up'),
      "large font": () => { setFontSize('large'); speak("Large font enabled"); },
      "decrease font": () => cycleFontSize('down'),
      "smaller font": () => cycleFontSize('down'),
      "smaller text": () => cycleFontSize('down'),
      "small font": () => { setFontSize('small'); speak("Small font enabled"); },
      "reset font": () => { setFontSize('medium'); speak("Font size reset to medium"); },
      "normal font": () => { setFontSize('medium'); speak("Font size reset to medium"); },
      "medium font": () => { setFontSize('medium'); speak("Medium font enabled"); },
      
      // High Contrast
      "high contrast": () => { 
        const newContrast = contrastRef.current === 'high' ? 'normal' : 'high';
        setContrast(newContrast); 
        speak(newContrast === 'high' ? "High contrast enabled" : "Normal contrast restored"); 
      },
      "enable high contrast": () => { setContrast('high'); speak("High contrast enabled"); },
      "disable high contrast": () => { setContrast('normal'); speak("Normal contrast restored"); },
      "toggle contrast": () => { 
        const newContrast = contrastRef.current === 'high' ? 'normal' : 'high';
        setContrast(newContrast); 
      },
      "normal contrast": () => { setContrast('normal'); speak("Normal contrast restored"); },
      
      // Screen Reader
      "screen reader mode": () => { setScreenReaderEnabled(!screenReaderRef.current); },
      "enable screen reader": () => { setScreenReaderEnabled(true); speak("Screen reader mode enabled"); },
      "disable screen reader": () => { setScreenReaderEnabled(false); speak("Screen reader mode disabled"); },
      
      // Colorblind modes
      "colorblind off": () => { setColorblindMode('off'); speak("Colorblind mode disabled"); },
      "normal colors": () => { setColorblindMode('off'); speak("Normal colors restored"); },
      "deuteranopia": () => { setColorblindMode('deuteranopia'); speak("Deuteranopia mode enabled"); },
      "red green colorblind": () => { setColorblindMode('deuteranopia'); speak("Red-green colorblind mode enabled"); },
      "protanopia": () => { setColorblindMode('protanopia'); speak("Protanopia mode enabled"); },
      "tritanopia": () => { setColorblindMode('tritanopia'); speak("Tritanopia mode enabled"); },
      "blue yellow colorblind": () => { setColorblindMode('tritanopia'); speak("Blue-yellow colorblind mode enabled"); },
      "monochrome": () => { setColorblindMode('monochrome'); speak("Monochrome mode enabled"); },
      "grayscale": () => { setColorblindMode('monochrome'); speak("Grayscale mode enabled"); },
      "black and white": () => { setColorblindMode('monochrome'); speak("Black and white mode enabled"); },
      
      // Language
      "switch to english": () => { setLanguage('en'); speak("Language switched to English"); },
      "english": () => { setLanguage('en'); speak("English"); },
      "switch to georgian": () => { setLanguage('ka'); },
      "georgian": () => { setLanguage('ka'); },
      "ქართული": () => { setLanguage('ka'); },
      "ინგლისური": () => { setLanguage('en'); },

      // ========== PROFESSORS / EMAIL QUICK ACTIONS ==========
      "email dalakishvili": () => {
        const gmailLink = `https://mail.google.com/mail/?view=cm&fs=1&to=g.dalakishvili@gtu.ge&su=${encodeURIComponent("Student Question: HCI")}&body=${encodeURIComponent("Dear Professor Dalakishvili,\n\n")}`;
        window.open(gmailLink, "_blank", "noopener,noreferrer");
        speak(languageRef.current === 'ka' ? 'Gmail-ის ფანჯარა მოიძებნა გ. დალაქიშვილისთვის' : 'Opening Gmail compose to Professor Dalakishvili');
      },
      "email gocha": () => {
        const gmailLink = `https://mail.google.com/mail/?view=cm&fs=1&to=g.dalakishvili@gtu.ge&su=${encodeURIComponent("Student Question: HCI")}&body=${encodeURIComponent("Dear Professor Dalakishvili,\n\n")}`;
        window.open(gmailLink, "_blank", "noopener,noreferrer");
        speak(languageRef.current === 'ka' ? 'Gmail-ის ფანჯარა მოიძებნა' : 'Opening Gmail compose');
      },
      "email hakan": () => {
        const gmailLink = `https://mail.google.com/mail/?view=cm&fs=1&to=e.hakan@gtu.ge&su=${encodeURIComponent("Student Question: Networks")}&body=${encodeURIComponent("Dear Professor Hakan,\n\n")}`;
        window.open(gmailLink, "_blank", "noopener,noreferrer");
        speak(languageRef.current === 'ka' ? 'Gmail-ის ფანჯარა მოიძებნა ე. ჰაკანისთვის' : 'Opening Gmail compose to Professor Hakan');
      },
      "email jafaridze": () => {
        const gmailLink = `https://mail.google.com/mail/?view=cm&fs=1&to=t.jafaridze@gtu.ge&su=${encodeURIComponent("Student Question: Python")}&body=${encodeURIComponent("Dear Professor Jafaridze,\n\n")}`;
        window.open(gmailLink, "_blank", "noopener,noreferrer");
        speak(languageRef.current === 'ka' ? 'Gmail-ის ფანჯარა მოიძებნა ტ. ჯაფარიძეისთვის' : 'Opening Gmail compose to Professor Jafaridze');
      },

      // ========== SCHEDULE & DEADLINES Q&A ==========
      "what's my next class": () => {
        const dayName = getDayName(new Date());
        const classesToday = weeklySchedule[dayName] || [];
        const now = new Date();
        const nowMinutes = now.getHours() * 60 + now.getMinutes();
        let next = classesToday.find(c => {
          const [h, m] = c.startTime.split(':').map(Number);
          return h * 60 + m > nowMinutes;
        });
        // If none today, find next day's first class
        if (!next) {
          const days = ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'];
          for (let i = 1; i <= 7; i++) {
            const d = new Date();
            d.setDate(d.getDate() + i);
            const dn = days[d.getDay()];
            const list = weeklySchedule[dn] || [];
            if (list.length) { next = list[0]; break; }
          }
        }
        if (next) {
          speak(`${next.subject.en} at ${next.startTime} in ${next.room} with ${next.instructor.en}`);
        } else {
          speak(languageRef.current === 'ka' ? 'დღეს კლასები არ არის' : 'No upcoming classes found');
        }
      },
      "next class": () => {
        // alias
        const handler = commands["what's my next class"];
        if (handler) handler();
      },
      "what classes today": () => {
        const dayName = getDayName(new Date());
        const classesToday = weeklySchedule[dayName] || [];
        if (!classesToday.length) {
          speak(languageRef.current === 'ka' ? 'დღეს კლასი არ არის' : 'There are no classes today');
          return;
        }
        const summary = classesToday.map(c => `${c.subject.en} ${c.startTime}-${c.endTime} in ${c.room}`).join('; ');
        speak(summary);
      },
      "what's due": () => {
        // small local deadlines list (kept in sync with Sidebar upcomingDeadlines)
        const deadlines = [
          { title: 'HCI Assignment Deadline', date: '2025-12-05' },
          { title: 'Networks Midterm Exam', date: '2025-12-08' },
          { title: 'Python Project Submission', date: '2025-12-10' },
          { title: 'Security Quiz', date: '2025-12-12' },
          { title: 'Web Tech Final Project', date: '2025-12-15' }
        ];
        const today = new Date();
        const lines = deadlines.map(d => {
          const dt = new Date(d.date);
          const diff = Math.ceil((dt.getTime() - today.getTime()) / (1000*60*60*24));
          return `${d.title} on ${dt.toDateString()} (${diff} days)`;
        }).join('; ');
        speak(lines);
      },
      "upcoming deadlines": () => {
        const handler = commands["what's due"];
        if (handler) handler();
      },
      "when is the hci assignment": () => {
        speak('The HCI assignment deadline was December 5, 2025');
      },
      // ========== SCROLL COMMANDS ==========
      
      "scroll down": () => window.scrollBy({ top: 500, behavior: "smooth" }),
      "scroll up": () => window.scrollBy({ top: -500, behavior: "smooth" }),
      "scroll to top": () => window.scrollTo({ top: 0, behavior: "smooth" }),
      "go to top": () => window.scrollTo({ top: 0, behavior: "smooth" }),
      "top of page": () => window.scrollTo({ top: 0, behavior: "smooth" }),
      "scroll to bottom": () => window.scrollTo({ top: document.body.scrollHeight, behavior: "smooth" }),
      "go to bottom": () => window.scrollTo({ top: document.body.scrollHeight, behavior: "smooth" }),
      "bottom of page": () => window.scrollTo({ top: document.body.scrollHeight, behavior: "smooth" }),
      "go down": () => window.scrollBy({ top: 500, behavior: "smooth" }),
      "go up": () => window.scrollBy({ top: -500, behavior: "smooth" }),
      "page down": () => window.scrollBy({ top: window.innerHeight, behavior: "smooth" }),
      "page up": () => window.scrollBy({ top: -window.innerHeight, behavior: "smooth" }),

      // ========== PAGE ACTIONS ==========
      
      "go back": () => window.history.back(),
      "back": () => window.history.back(),
      "previous page": () => window.history.back(),
      "go forward": () => window.history.forward(),
      "forward": () => window.history.forward(),
      "next page": () => window.history.forward(),
      "refresh": () => window.location.reload(),
      "reload": () => window.location.reload(),
      "reload page": () => window.location.reload(),

      // ========== UI INTERACTIONS ==========
      
      // Click actions
      "click submit": () => {
        const btn = document.querySelector('[type="submit"], [data-testid*="submit"]') as HTMLElement;
        btn?.click();
      },
      "submit form": () => {
        const btn = document.querySelector('[type="submit"]') as HTMLElement;
        btn?.click();
      },
      "click save": () => {
        const btn = document.querySelector('[data-testid*="save"], button:contains("Save")') as HTMLElement;
        btn?.click();
      },
      "click cancel": () => {
        const btn = document.querySelector('[data-testid*="cancel"], button:contains("Cancel")') as HTMLElement;
        btn?.click();
      },
      
      // Focus actions
      "focus search": () => {
        const input = document.querySelector('input[type="search"], input[placeholder*="Search"]') as HTMLElement;
        input?.focus();
      },
      "search": () => {
        const input = document.querySelector('input[type="search"], input[placeholder*="Search"]') as HTMLElement;
        input?.focus();
      },

      // ========== INFORMATION COMMANDS ==========
      
      "what page am i on": () => {
        const pageName = locationRef.current.split('/').pop() || 'home';
        speak(`You are on the ${pageName} page`);
      },
      "where am i": () => {
        const pageName = locationRef.current.split('/').pop() || 'home';
        speak(`You are on the ${pageName} page`);
      },
      "read page": () => {
        const main = document.querySelector('main') || document.body;
        const text = main.textContent?.slice(0, 500) || '';
        speak(text);
      },
      "stop reading": () => {
        window.speechSynthesis.cancel();
      },
      "stop": () => {
        window.speechSynthesis.cancel();
      },
      "read hci messages": () => {
        speak("HCI Group Project conversation: Giorgi asked about new requirements, the student replied they uploaded the diagram and shared a UML image, Ana shared meeting notes PDF, Levan will review tonight, and Giorgi wants to meet tomorrow.");
      },
      "summarize hci thread": () => {
        const handler = commands["read hci messages"];
        if (handler) handler();
      },
      
      // ========== HELP COMMANDS ==========
      
      "list commands": () => {
        speak("Available commands: Dashboard, Grades, Messages, Profile, Courses, Calendar, Help, Dark mode, Light mode, Scroll up, Scroll down, Go back");
      },
      "what can i say": () => {
        speak("Try saying: Go to dashboard, open grades, dark mode, scroll down, or help");
      },
      "voice commands help": () => {
        setLocation("/help");
        speak("Opening help page with voice command documentation");
      },
    };

    // Find matching command (check for partial matches)
    for (const [command, action] of Object.entries(commands)) {
      if (normalizedTranscript.includes(command)) {
        // Execute the action
        action();
        
        // Show success toast
        toast({
          title: languageRef.current === "ka" ? "🎤 ბრძანება აღიარებულია" : "🎤 Command Recognized",
          description: languageRef.current === "ka" 
            ? `ბრძანება: "${command}"` 
            : `Executing: "${command}"`,
          duration: 2000,
        });
        
        return true;
      }
    }

    // No matching command found
    toast({
      title: languageRef.current === "ka" ? "ბრძანება ვერ მოიძებნა" : "Command Not Found",
      description: languageRef.current === "ka"
        ? `"${normalizedTranscript}" - სცადეთ "დახმარება" ბრძანებების სანახავად`
        : `"${normalizedTranscript}" - Try saying "list commands" for help`,
      variant: "destructive",
      duration: 3000,
    });
    
    return false;
  }, [setLocation, setTheme, setLanguage, setFontSize, setContrast, setScreenReaderEnabled, setColorblindMode, logout, toast, speak, cycleFontSize]);

  // Start/stop listening based on voiceCommandsActive
  useEffect(() => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    
    if (!SpeechRecognition) {
      if (voiceCommandsActive) {
        console.warn("Voice commands: Web Speech API not supported in this browser");
        toast({
          title: language === "ka" ? "არ არის მხარდაჭერილი" : "Not Supported",
          description: language === "ka"
            ? "თქვენი ბრაუზერი არ უჭერს მხარს ხმოვან ბრძანებებს. გამოიყენეთ Chrome ან Edge."
            : "Your browser doesn't support voice commands. Please use Chrome or Edge.",
          variant: "destructive",
          duration: 5000,
        });
      }
      return;
    }

    if (voiceCommandsActive) {
      // Stop any existing recognition first
      if (recognitionRef.current) {
        try {
          recognitionRef.current.stop();
        } catch (e) {
          // Ignore errors when stopping
        }
        recognitionRef.current = null;
      }

      const recognition = new SpeechRecognition();
      recognition.continuous = true;
      recognition.interimResults = false;
      recognition.lang = language === "ka" ? "ka-GE" : "en-US";

      recognition.onstart = () => {
        setIsListening(true);
      };

      recognition.onresult = (event: SpeechRecognitionEvent) => {
        const last = event.results.length - 1;
        const transcript = event.results[last][0].transcript;
        processCommand(transcript);
      };

      recognition.onerror = (event: SpeechRecognitionErrorEvent) => {
        console.warn("Voice recognition error:", event.error);
        
        // Don't show error toast for "no-speech" or "aborted" - these are normal
        if (event.error !== "no-speech" && event.error !== "aborted") {
          toast({
            title: language === "ka" ? "ხმის შეცდომა" : "Voice Error",
            description: event.error,
            variant: "destructive",
            duration: 3000,
          });
        }
      };

      recognition.onend = () => {
        setIsListening(false);
        
        // Auto-restart if voice commands are still enabled
        if (voiceCommandsActiveRef.current && recognitionRef.current) {
          setTimeout(() => {
            if (voiceCommandsActiveRef.current && recognitionRef.current) {
              try {
                recognitionRef.current.start();
              } catch (e) {
                console.warn("Failed to restart recognition:", e);
              }
            }
          }, 100);
        }
      };

      recognitionRef.current = recognition;
      
      try {
        recognition.start();
        
        // Only show the toast once when first enabled
        if (!isInitializedRef.current) {
          isInitializedRef.current = true;
          toast({
            title: language === "ka" ? "🎤 ხმოვანი ბრძანებები აქტიურია" : "🎤 Voice Commands Active",
            description: language === "ka"
              ? "თქვით ბრძანება, მაგ: 'დაფა', 'შეფასებები', 'მუქი რეჟიმი'"
              : "Say a command like 'Dashboard', 'Grades', 'Dark Mode'",
            duration: 3000,
          });
        }
      } catch (error) {
        console.error("Failed to start speech recognition:", error);
      }
    } else {
      // Stop listening
      isInitializedRef.current = false;
      if (recognitionRef.current) {
        try {
          recognitionRef.current.stop();
        } catch (e) {
          // Ignore errors when stopping
        }
        recognitionRef.current = null;
      }
      setIsListening(false);
    }

    // Cleanup on unmount
    return () => {
      if (recognitionRef.current) {
        try {
          recognitionRef.current.stop();
        } catch (e) {
          // Ignore errors when stopping
        }
        recognitionRef.current = null;
      }
    };
  }, [voiceCommandsActive, language, processCommand, toast]);

  // Don't render anything if voice commands are not active
  if (!voiceCommandsActive) {
    return null;
  }

  // Visual indicator when listening - positioned to avoid overlap with SupportWidget
  return (
    <div
      className="fixed bottom-6 right-24 z-50 flex items-center gap-2 px-4 py-2 rounded-full shadow-lg transition-all duration-300"
      style={{
        backgroundColor: isListening ? "rgba(239, 68, 68, 0.95)" : "rgba(107, 114, 128, 0.95)",
        color: "white",
      }}
      role="status"
      aria-live="polite"
      aria-label={isListening 
        ? (language === "ka" ? "ხმოვანი ბრძანებები აქტიურია" : "Voice commands listening") 
        : (language === "ka" ? "ხმოვანი ბრძანებები გამორთულია" : "Voice commands inactive")
      }
    >
      {isListening ? (
        <>
          <div className="relative">
            <Mic className="h-5 w-5 animate-pulse" />
            <span className="absolute -top-1 -right-1 w-3 h-3 bg-white rounded-full animate-ping" />
          </div>
          <span className="text-sm font-medium">
            {language === "ka" ? "მოსმენა..." : "Listening..."}
          </span>
        </>
      ) : (
        <>
          <MicOff className="h-5 w-5" />
          <span className="text-sm font-medium">
            {language === "ka" ? "გამორთულია" : "Inactive"}
          </span>
        </>
      )}
      
      {/* Last command display */}
      {lastCommand && isListening && (
        <div className="absolute bottom-full left-0 mb-2 px-3 py-1 bg-black/80 text-white text-xs rounded-lg whitespace-nowrap">
          {language === "ka" ? "ბოლო: " : "Last: "}{lastCommand}
        </div>
      )}
    </div>
  );
}
