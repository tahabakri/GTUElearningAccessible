import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  ChevronDown,
  ChevronUp,
  Bell,
  GraduationCap,
  Users,
} from "lucide-react";
import { useAccessibility } from "@/contexts/AccessibilityContext";
import { t } from "@/lib/translations";
import { useState } from "react";

interface Announcement {
  id: string;
  target: "student" | "professor";
  title: { en: string; ka: string };
  content: { en: string[]; ka: string[] }; // Bullet points
  date: Date;
  isImportant?: boolean;
}

const mockAnnouncements: Announcement[] = [
  {
    id: "s1",
    target: "student",
    title: {
      en: "Registration for Spring Semester 2026",
      ka: "რეგისტრაცია 2026 წლის გაზაფხულის სემესტრისთვის",
    },
    content: {
      en: [
        "Registration starts on January 25th at 10:00 AM.",
        "Please check your academic standing before registering.",
        "Ensure all tuition fees are paid.",
      ],
      ka: [
        "რეგისტრაცია იწყება 25 იანვარს დილის 10:00 საათზე.",
        "გთხოვთ შეამოწმოთ თქვენი აკადემიური სტატუსი რეგისტრაციამდე.",
        "დარწმუნდით, რომ სწავლის საფასური გადახდილია.",
      ],
    },
    date: new Date(),
    isImportant: true,
  },
  {
    id: "s2",
    target: "student",
    title: {
      en: "Library Hours Update",
      ka: "ბიბლიოთეკის სამუშაო საათების განახლება",
    },
    content: {
      en: [
        "Main library will be open 24/7 during exam week.",
        "Quiet zones have been expanded to the 3rd floor.",
      ],
      ka: [
        "მთავარი ბიბლიოთეკა გამოცდების კვირაში 24/7 იმუშავებს.",
        "წყნარი ზონები გაფართოვდა მე-3 სართულზე.",
      ],
    },
    date: new Date(Date.now() - 86400000),
  },
  {
    id: "p1",
    target: "professor",
    title: {
      en: "Grade Submission Deadline",
      ka: "ნიშნების შეტანის ბოლო ვადა",
    },
    content: {
      en: [
        "Final grades must be submitted by February 5th.",
        "Please use the new grading portal.",
        "Contact IT support for any access issues.",
      ],
      ka: [
        "საბოლოო ნიშნები უნდა იყოს შეტანილი 5 თებერვლამდე.",
        "გთხოვთ გამოიყენოთ ახალი შეფასების პორტალი.",
        "წვდომის პრობლემების შემთხვევაში დაუკავშირდით IT მხარდაჭერას.",
      ],
    },
    date: new Date(),
    isImportant: true,
  },
];

export function Announcements() {
  const { language } = useAccessibility();
  const [expandedIds, setExpandedIds] = useState<Set<string>>(new Set());

  const toggleExpand = (id: string) => {
    const newExpanded = new Set(expandedIds);
    if (newExpanded.has(id)) {
      newExpanded.delete(id);
    } else {
      newExpanded.add(id);
    }
    setExpandedIds(newExpanded);
  };

  const AnnouncementList = ({
    items,
    type,
  }: {
    items: Announcement[];
    type: "student" | "professor";
  }) => {
    const bgColor =
      type === "student"
        ? "bg-blue-50/50 dark:bg-blue-950/20 border-blue-100/50 dark:border-blue-900/50"
        : "bg-purple-50/50 dark:bg-purple-950/20 border-purple-100/50 dark:border-purple-900/50";

    const highlightColor =
      type === "student"
        ? "bg-blue-100 dark:bg-blue-900/40 text-blue-900 dark:text-blue-100"
        : "bg-purple-100 dark:bg-purple-900/40 text-purple-900 dark:text-purple-100";

    return (
      <div className="space-y-4">
        {items.map((item) => (
          <div
            key={item.id}
            className={`
              rounded-lg p-4 border transition-all duration-200
              ${item.isImportant ? bgColor : "bg-card border-border hover:bg-accent/5"}
            `}
          >
            <div className="flex items-start justify-between gap-3">
              <div className="flex-1 space-y-2">
                <div className="flex items-center gap-2">
                  {item.isImportant && (
                    <Badge
                      variant="outline"
                      className={`${highlightColor} border-0 font-medium`}
                    >
                      Important
                    </Badge>
                  )}
                  <h4 className="font-semibold text-lg leading-tight">
                    {language === "ka" ? item.title.ka : item.title.en}
                  </h4>
                </div>

                {expandedIds.has(item.id) && (
                  <ul className="list-disc pl-5 space-y-1.5 mt-2 text-muted-foreground animate-in fade-in slide-in-from-top-1 duration-200">
                    {(language === "ka"
                      ? item.content.ka
                      : item.content.en
                    ).map((line, idx) => (
                      <li key={idx} className="leading-snug">
                        {line}
                      </li>
                    ))}
                  </ul>
                )}
              </div>

              <Button
                variant="ghost"
                size="sm"
                onClick={() => toggleExpand(item.id)}
                className="shrink-0 text-muted-foreground hover:text-foreground"
                aria-expanded={expandedIds.has(item.id)}
                aria-label={
                  expandedIds.has(item.id)
                    ? t("readLess", language)
                    : t("readMore", language)
                }
              >
                <span className="sr-only">
                  {expandedIds.has(item.id)
                    ? t("readLess", language)
                    : t("readMore", language)}
                </span>
                {expandedIds.has(item.id) ? (
                  <ChevronUp className="h-4 w-4" />
                ) : (
                  <ChevronDown className="h-4 w-4" />
                )}
              </Button>
            </div>
          </div>
        ))}
      </div>
    );
  };

  const studentAnnouncements = mockAnnouncements.filter(
    (a) => a.target === "student",
  );
  const professorAnnouncements = mockAnnouncements.filter(
    (a) => a.target === "professor",
  );

  return (
    <section aria-labelledby="announcements-heading" className="space-y-4">
      <h2
        id="announcements-heading"
        className="text-xl md:text-2xl font-semibold flex items-center gap-2"
      >
        <Bell className="h-6 w-6 text-primary" />
        {t("announcements", language)}
      </h2>

      <div className="grid md:grid-cols-2 gap-6">
        {/* Student Card */}
        <Card className="border-t-4 border-t-blue-500 shadow-sm">
          <CardHeader className="pb-3 border-b bg-muted/30">
            <CardTitle className="text-lg flex items-center gap-2 text-blue-700 dark:text-blue-400">
              <GraduationCap className="h-5 w-5" />
              {t("studentAnnouncements", language)}
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-4">
            <AnnouncementList items={studentAnnouncements} type="student" />
          </CardContent>
        </Card>

        {/* Professor Card */}
        <Card className="border-t-4 border-t-purple-500 shadow-sm">
          <CardHeader className="pb-3 border-b bg-muted/30">
            <CardTitle className="text-lg flex items-center gap-2 text-purple-700 dark:text-purple-400">
              <Users className="h-5 w-5" />
              {t("professorAnnouncements", language)}
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-4">
            <AnnouncementList items={professorAnnouncements} type="professor" />
          </CardContent>
        </Card>
      </div>
    </section>
  );
}
