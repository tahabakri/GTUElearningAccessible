import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Calendar as CalendarIcon,
  FileText,
  Award,
  Clock,
  Mail,
  BookOpen,
  AlertCircle,
  ArrowRight,
  Send,
} from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import type { CalendarEvent } from "@shared/schema";
import { format } from "date-fns";
import { useAccessibility } from "@/contexts/AccessibilityContext";
import { useScreenReader } from "@/hooks/use-screen-reader";
import { useState } from "react";
import { useLocation } from "wouter";
import { DailySchedule } from "./DailySchedule";

interface SidebarProps {
  showOnMobile?: boolean;
}

// Upcoming assignments/deadlines mock data with navigation links
const upcomingDeadlines = [
  {
    id: 1,
    title: { en: "HCI Assignment Deadline", ka: "HCI დავალების ვადა" },
    date: "2025-12-05",
    course: {
      en: "Human-Computer Interaction",
      ka: "ადამიანი-კომპიუტერის ინტერაქცია",
    },
    type: "assignment",
    color: "bg-orange-500",
    courseId: "2025-2026(F)-10769",
    weekNum: 4,
  },
  {
    id: 2,
    title: { en: "Networks Midterm Exam", ka: "ქსელების შუალედური გამოცდა" },
    date: "2025-12-08",
    course: { en: "Computer Networks", ka: "კომპიუტერული ქსელები" },
    type: "exam",
    color: "bg-red-500",
    courseId: null,
    weekNum: null,
  },
  {
    id: 3,
    title: { en: "Python Project Submission", ka: "Python პროექტის ჩაბარება" },
    date: "2025-12-10",
    course: { en: "Python Programming", ka: "პითონზე პროგრამირება" },
    type: "project",
    color: "bg-purple-500",
    courseId: "2025-2026(F)-10765",
    weekNum: 3,
  },
  {
    id: 4,
    title: { en: "Security Quiz", ka: "უსაფრთხოების ქვიზი" },
    date: "2025-12-12",
    course: { en: "Information Security", ka: "ინფორმაციული უსაფრთხოება" },
    type: "quiz",
    color: "bg-blue-500",
    courseId: null,
    weekNum: null,
  },
  {
    id: 5,
    title: {
      en: "Web Tech Final Project",
      ka: "ვებ ტექნოლოგიების ფინალური პროექტი",
    },
    date: "2025-12-15",
    course: { en: "Web Technologies", ka: "ვებ ტექნოლოგიები" },
    type: "project",
    color: "bg-green-500",
    courseId: "2025-2026(F)-10770",
    weekNum: 5,
  },
];

export function Sidebar({ showOnMobile = false }: SidebarProps) {
  const { data: events = [] } = useQuery<CalendarEvent[]>({
    queryKey: ["/api/calendar/events"],
  });
  const { screenReaderEnabled, language } = useAccessibility();
  const { speak, cancel } = useScreenReader();
  const [playingCard, setPlayingCard] = useState<string | null>(null);
  const [, setLocation] = useLocation();

  const handleCardInteraction = (cardId: string, text: string) => {
    if (screenReaderEnabled) {
      if (playingCard === cardId) {
        cancel();
        setPlayingCard(null);
      } else {
        speak(text);
        setPlayingCard(cardId);
        setTimeout(() => setPlayingCard(null), 3000);
      }
    }
  };

  // Calculate days until deadline
  const getDaysUntil = (dateStr: string) => {
    const today = new Date();
    const deadline = new Date(dateStr);
    const diffTime = deadline.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  return (
    <aside
      className={`${
        showOnMobile ? "block" : "hidden md:block"
      } w-80 border-l border-border bg-background overflow-y-auto md:overflow-y-auto`}
      role="complementary"
      aria-label="Sidebar widgets"
    >
      <div className="p-6 space-y-6">
        {/* ========================================== */}
        {/* SMART CLASS SCHEDULE - TOP PRIORITY */}
        {/* ========================================== */}
        <DailySchedule />

        {/* ========================================== */}
        {/* ASSIGNMENTS & DEADLINES */}
        {/* ========================================== */}
        <Card
          data-testid="card-deadlines"
          className="cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600"
          tabIndex={0}
          onClick={() => setLocation("/calendar")}
          onKeyDown={(e) => {
            if (e.key === "Enter" || e.key === " ") {
              e.preventDefault();
              setLocation("/calendar");
            }
          }}
        >
          <CardHeader className="pb-3">
            <CardTitle className="text-lg flex items-center gap-2">
              <AlertCircle className="h-5 w-5 text-orange-500" />
              {language === "ka"
                ? "დავალებები და ვადები"
                : "Assignments & Deadlines"}
            </CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            <div className="divide-y divide-border">
              {upcomingDeadlines.map((deadline) => {
                const daysUntil = getDaysUntil(deadline.date);
                const title =
                  language === "ka" ? deadline.title.ka : deadline.title.en;
                const isUrgent = daysUntil <= 3;

                return (
                  <div
                    key={deadline.id}
                    className={`p-3 hover:bg-muted/50 transition-colors ${isUrgent ? "bg-red-50 dark:bg-red-950/20" : ""}`}
                  >
                    <div className="flex items-start gap-3">
                      <div
                        className={`w-1 h-full min-h-[40px] rounded-full ${deadline.color}`}
                      />
                      <div className="flex-1 min-w-0">
                        <p className="font-medium text-sm truncate">{title}</p>
                        <p className="text-xs text-muted-foreground">
                          {format(
                            new Date(deadline.date),
                            language === "ka" ? "d MMMM, yyyy" : "MMM d, yyyy",
                          )}
                        </p>
                      </div>
                      <Badge
                        variant={isUrgent ? "destructive" : "secondary"}
                        className="text-xs shrink-0"
                      >
                        {daysUntil === 0
                          ? language === "ka"
                            ? "დღეს!"
                            : "Today!"
                          : daysUntil === 1
                            ? language === "ka"
                              ? "ხვალ"
                              : "Tomorrow"
                            : language === "ka"
                              ? `${daysUntil} დღე`
                              : `${daysUntil} days`}
                      </Badge>
                    </div>
                    {/* Submit Now Button - Recognition Rather than Recall Heuristic */}
                    {deadline.courseId && deadline.weekNum && (
                      <Button
                        variant="ghost"
                        size="sm"
                        className="mt-2 w-full gap-2 text-primary hover:text-primary/80 hover:bg-primary/10"
                        onClick={(e) => {
                          e.stopPropagation();
                          setLocation(
                            `/course/${deadline.courseId}/assignment/${deadline.weekNum}`,
                          );
                        }}
                      >
                        <Send className="h-4 w-4" />
                        {language === "ka" ? "გაგზავნა" : "Submit Now"}
                        <ArrowRight className="h-4 w-4 ml-auto" />
                      </Button>
                    )}
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>

        {/* ========================================== */}
        {/* PROFESSORS - Quick Contact */}
        {/* ========================================== */}
        <Card data-testid="card-faculty-contacts" className="cursor-default">
          <CardHeader className="pb-3">
            <CardTitle className="text-lg flex items-center gap-2">
              <Mail className="h-5 w-5 text-primary" />
              {language === "ka" ? "პროფესორები" : "Professors"}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {[
                {
                  name: { en: "G. Dalakishvili", ka: "გ. დალაქიშვილი" },
                  email: "g.dalakishvili@gtu.ge",
                  course: { en: "HCI", ka: "HCI" },
                },
                {
                  name: { en: "E. Hakan", ka: "ე. ჰაქან" },
                  email: "e.hakan@gtu.ge",
                  course: { en: "Networks", ka: "ქსელები" },
                },
                {
                  name: { en: "T. Jafaridze", ka: "თ. ჯაფარიძე" },
                  email: "t.jafaridze@gtu.ge",
                  course: { en: "Python", ka: "Python" },
                },
              ].map((faculty, index) => {
                const lastName =
                  (language === "ka" ? faculty.name.ka : faculty.name.en)
                    .split(" ")
                    .pop() || "";
                const courseName =
                  language === "ka" ? faculty.course.ka : faculty.course.en;
                const subject = encodeURIComponent(
                  `Student Question: ${courseName}`,
                );
                const body = encodeURIComponent(
                  `Dear Professor ${lastName},\n\nI hope you are doing well.\n\nI am writing to ask about ${courseName}.\n\n[Please write your question here]\n\nThank you for your time.\n\nBest regards`,
                );
                const gmailLink = `https://mail.google.com/mail/?view=cm&fs=1&to=${faculty.email}&su=${subject}&body=${body}`;

                return (
                  <div
                    key={index}
                    className="flex items-center justify-between p-2 bg-muted/30 rounded hover:bg-muted/50 transition-colors"
                  >
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium truncate">
                        {language === "ka" ? faculty.name.ka : faculty.name.en}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {courseName}
                      </p>
                    </div>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="h-8 px-2"
                      onClick={() => window.open(gmailLink, "_blank")}
                      aria-label={`Send email to Professor ${
                        language === "ka" ? faculty.name.ka : faculty.name.en
                      } via Gmail`}
                    >
                      <Mail className="h-4 w-4" />
                    </Button>
                  </div>
                );
              })}
            </div>
            <p className="text-xs text-muted-foreground mt-3">
              {language === "ka" ? "💡 Gmail-ში გახსნა" : "💡 Opens in Gmail"}
            </p>
          </CardContent>
        </Card>
      </div>
    </aside>
  );
}
