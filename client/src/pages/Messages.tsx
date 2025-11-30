import { useState, useRef, useEffect } from "react";
import { Header } from "@/components/Header";
import { Sidebar } from "@/components/Sidebar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import {
  Send,
  Paperclip,
  Users,
  User,
  FileText,
  Download,
  ZoomIn,
  ChevronLeft,
} from "lucide-react";
import { useAccessibility } from "@/contexts/AccessibilityContext";
import { useLocation } from "wouter";

interface Message {
  id: number;
  sender: string;
  text: string;
  time: string;
  type: "text" | "image" | "file";
  fileUrl?: string;
  altText?: string;
  fileName?: string;
  fileSize?: string;
}

interface Conversation {
  id: number;
  name: string;
  type: "group" | "direct";
  isOnline: boolean;
  members?: string;
  status?: string;
  messages: Message[];
}

const mockConversations: Conversation[] = [
  {
    id: 1,
    name: "HCI Group Project",
    type: "group",
    isOnline: true,
    members: "Demo Student, Giorgi, Ana, Levan",
    messages: [
      {
        id: 1,
        sender: "Giorgi",
        text: "Did anyone check the new requirements?",
        time: "10:30 AM",
        type: "text",
      },
      {
        id: 2,
        sender: "Demo Student",
        text: "Yes, I uploaded the diagram.",
        time: "10:32 AM",
        type: "text",
      },
      {
        id: 3,
        sender: "Demo Student",
        text: "",
        time: "10:32 AM",
        type: "image",
        fileUrl: "/placeholder-diagram.jpg",
        altText: "UML Diagram showing user flow for login process",
      },
      {
        id: 4,
        sender: "Ana",
        text: "Thanks! Here are my notes.",
        time: "10:45 AM",
        type: "file",
        fileName: "Meeting_Notes.pdf",
        fileSize: "1.2 MB",
      },
      {
        id: 5,
        sender: "Levan",
        text: "I'll review the requirements tonight.",
        time: "11:00 AM",
        type: "text",
      },
      {
        id: 6,
        sender: "Giorgi",
        text: "Great! Let's meet tomorrow to discuss.",
        time: "11:15 AM",
        type: "text",
      },
    ],
  },
  {
    id: 2,
    name: "Gocha Dalakishvili",
    type: "direct",
    isOnline: true,
    status: "Instructor",
    messages: [
      {
        id: 1,
        sender: "Gocha Dalakishvili",
        text: "Please review your submission by Friday.",
        time: "Yesterday",
        type: "text",
      },
      {
        id: 2,
        sender: "Demo Student",
        text: "Thank you, I will review it today.",
        time: "Yesterday",
        type: "text",
      },
    ],
  },
  {
    id: 3,
    name: "Python Study Group",
    type: "group",
    isOnline: false,
    members: "Demo Student, Nino, David",
    messages: [
      {
        id: 1,
        sender: "Nino",
        text: "Anyone free to study tomorrow?",
        time: "2 days ago",
        type: "text",
      },
      {
        id: 2,
        sender: "David",
        text: "I can join at 3 PM",
        time: "2 days ago",
        type: "text",
      },
    ],
  },
];

export default function Messages() {
  const [conversations, setConversations] =
    useState<Conversation[]>(mockConversations);
  const [activeConversationId, setActiveConversationId] = useState<number>(1);
  const [messageInput, setMessageInput] = useState("");
  const [showMobileChat, setShowMobileChat] = useState(false); // New state for mobile view
  const { language } = useAccessibility();
  const [, setLocation] = useLocation();
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const liveRegionRef = useRef<HTMLDivElement>(null);

  const activeConversation = conversations.find(
    (c) => c.id === activeConversationId
  );
  const currentUser = "Demo Student";

  // Auto-scroll to bottom when new messages arrive
  useEffect(() => {
    if (showMobileChat || window.innerWidth >= 768) {
      messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }
  }, [activeConversation?.messages, showMobileChat]);

  // Focus input when conversation changes
  useEffect(() => {
    if (showMobileChat || window.innerWidth >= 768) {
      inputRef.current?.focus();
    }
  }, [activeConversationId, showMobileChat]);

  const handleConversationClick = (id: number) => {
    setActiveConversationId(id);
    setShowMobileChat(true); // Show chat view on mobile
  };

  const handleBackToConversations = () => {
    setShowMobileChat(false); // Go back to list view on mobile
  };

  const handleSendMessage = () => {
    if (!messageInput.trim() || !activeConversation) return;

    const newMessage: Message = {
      id: activeConversation.messages.length + 1,
      sender: currentUser,
      text: messageInput,
      time: new Date().toLocaleTimeString("en-US", {
        hour: "numeric",
        minute: "2-digit",
      }),
      type: "text",
    };

    // Add message to conversation
    setConversations((prev) =>
      prev.map((conv) =>
        conv.id === activeConversationId
          ? { ...conv, messages: [...conv.messages, newMessage] }
          : conv
      )
    );

    // Announce to screen reader
    if (liveRegionRef.current) {
      liveRegionRef.current.textContent = `You sent: ${messageInput}`;
    }

    setMessageInput("");

    // Simulate reply after 3 seconds
    setTimeout(() => {
      const replyMessage: Message = {
        id: activeConversation.messages.length + 2,
        sender:
          activeConversation.type === "group"
            ? "Giorgi"
            : activeConversation.name,
        text: "Got it, thanks!",
        time: new Date().toLocaleTimeString("en-US", {
          hour: "numeric",
          minute: "2-digit",
        }),
        type: "text",
      };

      setConversations((prev) =>
        prev.map((conv) =>
          conv.id === activeConversationId
            ? { ...conv, messages: [...conv.messages, replyMessage] }
            : conv
        )
      );

      // Announce to screen reader
      if (liveRegionRef.current) {
        liveRegionRef.current.textContent = `New message from ${replyMessage.sender}: ${replyMessage.text}`;
      }
    }, 3000);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && e.ctrlKey) {
      handleSendMessage();
    }
  };

  return (
    // FIXED VIEWPORT LAYOUT - No scrolling on body
    <div className="h-screen flex flex-col bg-background overflow-hidden">
      {/* Header - Fixed at top */}
      <Header
        onAccessibilitySettingsClick={() => setLocation("/accessibility")}
      />

      {/* Screen Reader Live Region */}
      <div
        ref={liveRegionRef}
        className="sr-only"
        role="status"
        aria-live="polite"
        aria-atomic="true"
      />

      {/* Main Content Area - Three Column Grid */}
      <div className="flex-1 flex overflow-hidden relative">
        {/* LEFT COLUMN - Conversations List */}
        <aside 
          className={`
            ${showMobileChat ? 'hidden' : 'flex'} 
            md:flex w-full md:w-80 border-r border-border bg-muted/30 flex-col overflow-hidden
          `}
        >
          <div className="p-4 border-b border-border bg-background">
            <h2 className="text-lg font-semibold">
              {language === "ka" ? "საუბრები" : "Conversations"}
            </h2>
          </div>

          {/* Scrollable conversation list */}
          <div className="flex-1 overflow-y-auto p-4 space-y-2">
            {conversations.map((conv) => (
              <Card
                key={conv.id}
                className={`p-3 cursor-pointer transition-colors hover:bg-accent ${
                  activeConversationId === conv.id
                    ? "bg-primary/10 border-primary"
                    : ""
                }`}
                onClick={() => handleConversationClick(conv.id)}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault();
                    handleConversationClick(conv.id);
                  }
                }}
                aria-label={`${
                  conv.type === "group" ? "Group chat" : "Direct message"
                } with ${conv.name}`}
              >
                <div className="flex items-center gap-3">
                  <div className="relative">
                    <Avatar>
                      <AvatarFallback>
                        {conv.type === "group" ? (
                          <Users className="h-5 w-5" />
                        ) : (
                          <User className="h-5 w-5" />
                        )}
                      </AvatarFallback>
                    </Avatar>
                    {conv.isOnline && (
                      <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-background" />
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-semibold text-sm truncate">
                      {conv.name}
                    </p>
                    {conv.type === "group" && (
                      <p className="text-xs text-muted-foreground truncate">
                        {conv.members}
                      </p>
                    )}
                    {conv.status && (
                      <Badge variant="secondary" className="text-xs mt-1">
                        {conv.status}
                      </Badge>
                    )}
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </aside>

        {/* MIDDLE COLUMN - Chat Window */}
        <main
          className={`
            ${showMobileChat ? 'flex' : 'hidden'} 
            md:flex flex-1 flex-col overflow-hidden bg-background w-full
          `}
          role="main"
        >
          {activeConversation ? (
            <>
              {/* Chat Header - Fixed at top of chat */}
              <div className="h-16 px-4 md:px-6 border-b border-border bg-background flex items-center flex-shrink-0 gap-3">
                {/* Back Button (Mobile Only) */}
                <Button 
                  variant="ghost" 
                  size="icon" 
                  className="md:hidden -ml-2"
                  onClick={handleBackToConversations}
                  aria-label="Back to conversations"
                >
                  <ChevronLeft className="h-6 w-6" />
                </Button>

                <div className="flex items-center gap-3 flex-1 min-w-0">
                  <Avatar>
                    <AvatarFallback>
                      {activeConversation.type === "group" ? (
                        <Users className="h-5 w-5" />
                      ) : (
                        <User className="h-5 w-5" />
                      )}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1 min-w-0">
                    <h2 className="font-semibold truncate">{activeConversation.name}</h2>
                    {activeConversation.type === "group" && (
                      <p className="text-sm text-muted-foreground truncate">
                        {activeConversation.members}
                      </p>
                    )}
                    {activeConversation.isOnline && (
                      <p className="text-xs text-green-600 dark:text-green-400">
                        {language === "ka" ? "აქტიური" : "Active now"}
                      </p>
                    )}
                  </div>
                </div>
              </div>

              {/* Messages Area - ONLY THIS SCROLLS */}
              <div className="flex-1 overflow-y-auto p-4 md:p-6 space-y-4 scroll-smooth">
                {activeConversation.messages.map((message) => {
                  const isMyMessage = message.sender === currentUser;

                  return (
                    <div
                      key={message.id}
                      className={`flex ${
                        isMyMessage ? "justify-end" : "justify-start"
                      }`}
                    >
                      <div
                        className={`max-w-[85%] md:max-w-[70%] ${
                          isMyMessage ? "items-end" : "items-start"
                        } flex flex-col gap-1`}
                      >
                        {!isMyMessage && (
                          <span className="text-xs font-medium text-muted-foreground px-2">
                            {message.sender}
                          </span>
                        )}

                        {message.type === "text" && (
                          <div
                            className={`rounded-lg px-4 py-2 ${
                              isMyMessage
                                ? "bg-primary text-primary-foreground"
                                : "bg-muted text-foreground"
                            }`}
                          >
                            <p className="text-sm break-words">{message.text}</p>
                          </div>
                        )}

                        {message.type === "image" && (
                          <Card className="p-2 max-w-sm">
                            <img
                              src={message.fileUrl}
                              alt={message.altText}
                              className="rounded w-full h-auto"
                              onError={(e) => {
                                // Fallback for missing image
                                (e.target as HTMLImageElement).src =
                                  'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="400" height="300"%3E%3Crect fill="%23ddd" width="400" height="300"/%3E%3Ctext x="50%25" y="50%25" text-anchor="middle" fill="%23999" font-size="18"%3EUML Diagram%3C/text%3E%3C/svg%3E';
                              }}
                            />
                            <div className="flex items-center justify-between mt-2">
                              <p className="text-xs text-muted-foreground">
                                {message.altText}
                              </p>
                              <Button
                                variant="ghost"
                                size="sm"
                                aria-label="View full size"
                              >
                                <ZoomIn className="h-4 w-4" />
                              </Button>
                            </div>
                          </Card>
                        )}

                        {message.type === "file" && (
                          <Card className="p-3 flex items-center gap-3 min-w-[200px] md:min-w-[250px]">
                            <div className="p-2 bg-primary/10 rounded">
                              <FileText className="h-6 w-6 text-primary" />
                            </div>
                            <div className="flex-1 min-w-0">
                              <p className="text-sm font-medium truncate">
                                {message.fileName}
                              </p>
                              <p className="text-xs text-muted-foreground">
                                {message.fileSize}
                              </p>
                            </div>
                            <Button
                              variant="ghost"
                              size="sm"
                              aria-label={`Download ${message.fileName}`}
                            >
                              <Download className="h-4 w-4" />
                            </Button>
                          </Card>
                        )}

                        <span className="text-xs text-muted-foreground px-2">
                          {message.time}
                        </span>
                      </div>
                    </div>
                  );
                })}
                <div ref={messagesEndRef} />
              </div>

              {/* Input Area - Fixed at bottom of chat */}
              <div className="h-20 px-4 md:px-6 py-4 border-t border-border bg-background flex-shrink-0">
                <div className="flex items-center gap-2">
                  <Button variant="ghost" size="icon" aria-label="Attach file" className="shrink-0">
                    <Paperclip className="h-5 w-5" />
                  </Button>
                  <Input
                    ref={inputRef}
                    value={messageInput}
                    onChange={(e) => setMessageInput(e.target.value)}
                    onKeyDown={handleKeyPress}
                    placeholder={
                      language === "ka"
                        ? "შეიყვანეთ შეტყობინება..."
                        : "Type a message..."
                    }
                    className="flex-1"
                    aria-label="Message input"
                  />
                  <Button
                    onClick={handleSendMessage}
                    disabled={!messageInput.trim()}
                    aria-label="Send message"
                    className="shrink-0"
                  >
                    <Send className="h-5 w-5" />
                  </Button>
                </div>
              </div>
            </>
          ) : (
            <div className="flex-1 flex items-center justify-center text-muted-foreground">
              <p>
                {language === "ka"
                  ? "აირჩიეთ საუბარი"
                  : "Select a conversation"}
              </p>
            </div>
          )}
        </main>

        {/* RIGHT COLUMN - Sidebar (Hidden on mobile) */}
        <div className="hidden md:block">
          <Sidebar />
        </div>
      </div>
    </div>
  );
}
