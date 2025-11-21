import { useState, useEffect, useRef, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { useAccessibility } from "@/contexts/AccessibilityContext";
import {
  HelpCircle,
  X,
  Send,
  MessageCircle,
  Building2,
  CheckCircle,
  Loader2,
  User,
  Bot,
} from "lucide-react";

// Mock support contacts data
const supportContacts = {
  dean: {
    name: { en: "Prof. Zurab Gasitashvili", ka: "პროფ. ზურაბ გასიტაშვილი" },
    faculty: { en: "Faculty of Informatics", ka: "ინფორმატიკის ფაკულტეტი" },
    email: "dean_info@gtu.ge",
    hours: "09:00 - 18:00",
  },
  it: {
    name: { en: "IT Support Team", ka: "IT მხარდაჭერის გუნდი" },
    email: "support@gtu.ge",
    hours: "24/7",
  },
};

// Subject options for dean's office
const subjectOptions = {
  en: [
    { value: "grade_appeal", label: "Grade Appeal" },
    { value: "schedule_issue", label: "Schedule Issue" },
    { value: "document_request", label: "Document Request" },
    { value: "academic_leave", label: "Academic Leave Request" },
    { value: "other", label: "Other Inquiry" },
  ],
  ka: [
    { value: "grade_appeal", label: "შეფასების გასაჩივრება" },
    { value: "schedule_issue", label: "განრიგის საკითხი" },
    { value: "document_request", label: "დოკუმენტის მოთხოვნა" },
    { value: "academic_leave", label: "აკადემიური შვებულება" },
    { value: "other", label: "სხვა შეკითხვა" },
  ],
};

interface ChatMessage {
  id: string;
  sender: "user" | "bot";
  text: string;
  timestamp: Date;
}

export function SupportWidget() {
  const { language } = useAccessibility();
  const [isOpen, setIsOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("chat");
  
  // Chat state
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([
    {
      id: "welcome",
      sender: "bot",
      text: language === "ka" 
        ? "გამარჯობა! 👋 მე ვარ GTU-ს ვირტუალური ასისტენტი. როგორ შემიძლია დაგეხმაროთ დღეს?"
        : "Hello! 👋 I'm the GTU virtual assistant. How can I help you today?",
      timestamp: new Date(),
    },
  ]);
  const [chatInput, setChatInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  
  // Dean's office form state
  const [deanSubject, setDeanSubject] = useState("");
  const [deanMessage, setDeanMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [ticketCreated, setTicketCreated] = useState<string | null>(null);
  
  // Refs for accessibility
  const panelRef = useRef<HTMLDivElement>(null);
  const chatInputRef = useRef<HTMLInputElement>(null);
  const chatContainerRef = useRef<HTMLDivElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  
  // Check if dean's office is "open" (mock: 9 AM - 6 PM)
  const isOfficeOpen = () => {
    const hour = new Date().getHours();
    return hour >= 9 && hour < 18;
  };

  // Handle opening/closing the widget
  const toggleWidget = useCallback(() => {
    setIsOpen((prev) => !prev);
  }, []);

  // Focus management when panel opens
  useEffect(() => {
    if (isOpen && closeButtonRef.current) {
      closeButtonRef.current.focus();
    }
  }, [isOpen]);

  // Scroll chat to bottom when new messages arrive
  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  }, [chatMessages]);

  // Handle Escape key to close panel
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) {
        setIsOpen(false);
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [isOpen]);

  // Handle sending a chat message
  const handleSendMessage = () => {
    if (!chatInput.trim()) return;

    const userMessage: ChatMessage = {
      id: `user-${Date.now()}`,
      sender: "user",
      text: chatInput,
      timestamp: new Date(),
    };

    setChatMessages((prev) => [...prev, userMessage]);
    setChatInput("");
    setIsTyping(true);

    // Simulate bot response after 2 seconds
    setTimeout(() => {
      setIsTyping(false);
      const botResponse: ChatMessage = {
        id: `bot-${Date.now()}`,
        sender: "bot",
        text: language === "ka"
          ? "გამარჯობა! აგენტი მალე შეგიერთდებათ. საშუალო მოლოდინის დრო: 2-3 წუთი. 🎧"
          : "Hello! An agent will be with you shortly. Average wait time: 2-3 minutes. 🎧",
        timestamp: new Date(),
      };
      setChatMessages((prev) => [...prev, botResponse]);
    }, 2000);
  };

  // Handle dean's office form submission
  const handleDeanSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!deanSubject || !deanMessage.trim()) return;

    setIsSubmitting(true);

    // Simulate form submission
    setTimeout(() => {
      const ticketNumber = Math.floor(9000 + Math.random() * 1000).toString();
      setTicketCreated(ticketNumber);
      setIsSubmitting(false);
      setDeanSubject("");
      setDeanMessage("");
    }, 1500);
  };

  // Reset ticket created state when switching tabs
  const handleTabChange = (value: string) => {
    setActiveTab(value);
    setTicketCreated(null);
  };

  // Labels
  const labels = {
    helpButton: language === "ka" ? "დახმარება და მხარდაჭერა" : "Help and Support",
    liveChat: language === "ka" ? "პირდაპირი ჩატი" : "Live Chat",
    deanOffice: language === "ka" ? "დეკანატი" : "Dean's Office",
    itSupport: language === "ka" ? "IT მხარდაჭერა" : "IT Support",
    typeMessage: language === "ka" ? "შეიყვანეთ შეტყობინება..." : "Type a message...",
    send: language === "ka" ? "გაგზავნა" : "Send",
    subject: language === "ka" ? "საკითხი" : "Subject",
    selectSubject: language === "ka" ? "აირჩიეთ საკითხი" : "Select a subject",
    message: language === "ka" ? "შეტყობინება" : "Message",
    messagePlaceholder: language === "ka" 
      ? "დაწერეთ თქვენი მოთხოვნა აქ..." 
      : "Describe your request here...",
    submit: language === "ka" ? "გაგზავნა" : "Submit Request",
    submitting: language === "ka" ? "იგზავნება..." : "Submitting...",
    ticketCreated: language === "ka" ? "ტიკეტი შეიქმნა" : "Request Ticket Created",
    ticketNumber: language === "ka" ? "ტიკეტის ნომერი" : "Ticket Number",
    officeOpen: language === "ka" ? "ღიაა" : "Open",
    officeClosed: language === "ka" ? "დახურულია" : "Closed",
    workingHours: language === "ka" ? "სამუშაო საათები" : "Working Hours",
    close: language === "ka" ? "დახურვა" : "Close",
    typing: language === "ka" ? "იწერება..." : "Typing...",
  };

  return (
    <>
      {/* Floating Action Button */}
      <Button
        onClick={toggleWidget}
        className={`
          fixed bottom-6 right-6 z-50 
          w-14 h-14 rounded-full 
          bg-primary hover:bg-primary/90 
          text-primary-foreground 
          shadow-lg hover:shadow-xl 
          transition-all duration-300
          ${!isOpen ? "animate-bounce-slow" : ""}
        `}
        aria-label={labels.helpButton}
        aria-expanded={isOpen}
        aria-controls="support-panel"
        data-testid="support-widget-button"
      >
        {isOpen ? (
          <X className="h-6 w-6" />
        ) : (
          <HelpCircle className="h-6 w-6" />
        )}
      </Button>

      {/* Support Panel */}
      {isOpen && (
        <Card
          ref={panelRef}
          id="support-panel"
          className="fixed bottom-24 right-6 z-50 w-[380px] max-h-[500px] shadow-2xl border-2 animate-in slide-in-from-bottom-5 duration-300"
          role="dialog"
          aria-modal="true"
          aria-labelledby="support-panel-title"
        >
          <CardHeader className="pb-2 bg-primary text-primary-foreground rounded-t-lg">
            <div className="flex items-center justify-between">
              <CardTitle id="support-panel-title" className="text-lg flex items-center gap-2">
                <HelpCircle className="h-5 w-5" />
                {labels.helpButton}
              </CardTitle>
              <Button
                ref={closeButtonRef}
                variant="ghost"
                size="icon"
                onClick={() => setIsOpen(false)}
                className="h-8 w-8 text-primary-foreground hover:bg-white/20"
                aria-label={labels.close}
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
          </CardHeader>

          <CardContent className="p-0">
            <Tabs value={activeTab} onValueChange={handleTabChange} className="w-full">
              <TabsList className="w-full grid grid-cols-2 rounded-none border-b">
                <TabsTrigger value="chat" className="gap-2 data-[state=active]:bg-primary/10">
                  <MessageCircle className="h-4 w-4" />
                  {labels.liveChat}
                </TabsTrigger>
                <TabsTrigger value="dean" className="gap-2 data-[state=active]:bg-primary/10">
                  <Building2 className="h-4 w-4" />
                  {labels.deanOffice}
                </TabsTrigger>
              </TabsList>

              {/* Live Chat Tab */}
              <TabsContent value="chat" className="m-0">
                <div className="p-3 border-b bg-muted/30">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                    <span className="text-sm font-medium">{labels.itSupport}</span>
                    <Badge variant="secondary" className="text-xs">24/7</Badge>
                  </div>
                  <p className="text-xs text-muted-foreground mt-1">
                    {supportContacts.it.email}
                  </p>
                </div>

                {/* Chat Messages */}
                <div
                  ref={chatContainerRef}
                  className="h-[220px] overflow-y-auto p-3 space-y-3"
                  role="log"
                  aria-live="polite"
                  aria-label={language === "ka" ? "ჩატის ისტორია" : "Chat history"}
                >
                  {chatMessages.map((msg) => (
                    <div
                      key={msg.id}
                      className={`flex gap-2 ${msg.sender === "user" ? "justify-end" : "justify-start"}`}
                    >
                      {msg.sender === "bot" && (
                        <div className="w-7 h-7 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                          <Bot className="h-4 w-4 text-primary" />
                        </div>
                      )}
                      <div
                        className={`max-w-[80%] rounded-lg px-3 py-2 text-sm ${
                          msg.sender === "user"
                            ? "bg-primary text-primary-foreground"
                            : "bg-muted"
                        }`}
                      >
                        {msg.text}
                      </div>
                      {msg.sender === "user" && (
                        <div className="w-7 h-7 rounded-full bg-secondary flex items-center justify-center flex-shrink-0">
                          <User className="h-4 w-4" />
                        </div>
                      )}
                    </div>
                  ))}

                  {/* Typing indicator */}
                  {isTyping && (
                    <div className="flex gap-2 justify-start" role="status" aria-label={labels.typing}>
                      <div className="w-7 h-7 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                        <Bot className="h-4 w-4 text-primary" />
                      </div>
                      <div className="bg-muted rounded-lg px-3 py-2 text-sm flex items-center gap-1">
                        <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: "0ms" }} />
                        <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: "150ms" }} />
                        <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: "300ms" }} />
                      </div>
                    </div>
                  )}
                </div>

                {/* Chat Input */}
                <div className="p-3 border-t">
                  <form
                    onSubmit={(e) => {
                      e.preventDefault();
                      handleSendMessage();
                    }}
                    className="flex gap-2"
                  >
                    <Input
                      ref={chatInputRef}
                      type="text"
                      value={chatInput}
                      onChange={(e) => setChatInput(e.target.value)}
                      placeholder={labels.typeMessage}
                      className="flex-1"
                      aria-label={labels.typeMessage}
                    />
                    <Button
                      type="submit"
                      size="icon"
                      disabled={!chatInput.trim()}
                      aria-label={labels.send}
                    >
                      <Send className="h-4 w-4" />
                    </Button>
                  </form>
                </div>
              </TabsContent>

              {/* Dean's Office Tab */}
              <TabsContent value="dean" className="m-0">
                {ticketCreated ? (
                  /* Success State */
                  <div className="p-6 text-center space-y-4">
                    <div className="w-16 h-16 mx-auto rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center">
                      <CheckCircle className="h-8 w-8 text-green-600 dark:text-green-400" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-lg text-green-700 dark:text-green-400">
                        {labels.ticketCreated}
                      </h3>
                      <p className="text-sm text-muted-foreground mt-1">
                        {labels.ticketNumber}: <span className="font-mono font-bold">#{ticketCreated}</span>
                      </p>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      {language === "ka"
                        ? "თქვენ მიიღებთ პასუხს ელფოსტაზე 1-2 სამუშაო დღეში."
                        : "You will receive a response via email within 1-2 business days."}
                    </p>
                    <Button
                      variant="outline"
                      onClick={() => setTicketCreated(null)}
                      className="mt-2"
                    >
                      {language === "ka" ? "ახალი მოთხოვნა" : "New Request"}
                    </Button>
                  </div>
                ) : (
                  <>
                    {/* Dean Info Header */}
                    <div className="p-3 border-b bg-muted/30">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-sm font-medium">
                            {language === "ka" ? supportContacts.dean.faculty.ka : supportContacts.dean.faculty.en}
                          </p>
                          <p className="text-xs text-muted-foreground">
                            {language === "ka" ? supportContacts.dean.name.ka : supportContacts.dean.name.en}
                          </p>
                        </div>
                        <Badge
                          variant={isOfficeOpen() ? "default" : "secondary"}
                          className={`${isOfficeOpen() ? "bg-green-600" : "bg-red-500"} text-white`}
                        >
                          {isOfficeOpen() ? `🟢 ${labels.officeOpen}` : `🔴 ${labels.officeClosed}`}
                        </Badge>
                      </div>
                      <p className="text-xs text-muted-foreground mt-1">
                        {labels.workingHours}: {supportContacts.dean.hours}
                      </p>
                    </div>

                    {/* Dean's Office Form */}
                    <form onSubmit={handleDeanSubmit} className="p-3 space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="dean-subject">{labels.subject}</Label>
                        <Select value={deanSubject} onValueChange={setDeanSubject}>
                          <SelectTrigger id="dean-subject">
                            <SelectValue placeholder={labels.selectSubject} />
                          </SelectTrigger>
                          <SelectContent>
                            {(language === "ka" ? subjectOptions.ka : subjectOptions.en).map((opt) => (
                              <SelectItem key={opt.value} value={opt.value}>
                                {opt.label}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="dean-message">{labels.message}</Label>
                        <Textarea
                          id="dean-message"
                          value={deanMessage}
                          onChange={(e) => setDeanMessage(e.target.value)}
                          placeholder={labels.messagePlaceholder}
                          rows={4}
                          className="resize-none"
                        />
                      </div>

                      <Button
                        type="submit"
                        className="w-full"
                        disabled={!deanSubject || !deanMessage.trim() || isSubmitting}
                      >
                        {isSubmitting ? (
                          <>
                            <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                            {labels.submitting}
                          </>
                        ) : (
                          <>
                            <Send className="h-4 w-4 mr-2" />
                            {labels.submit}
                          </>
                        )}
                      </Button>
                    </form>
                  </>
                )}
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      )}

      {/* Custom animation styles */}
      <style>{`
        @keyframes bounce-slow {
          0%, 100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-8px);
          }
        }
        .animate-bounce-slow {
          animation: bounce-slow 2s ease-in-out 3;
        }
      `}</style>
    </>
  );
}
