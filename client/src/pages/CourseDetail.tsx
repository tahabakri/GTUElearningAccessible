import { useRoute, useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Header } from "@/components/Header";
import { Sidebar } from "@/components/Sidebar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { CheckCircle2, Circle, FileText, Calendar } from "lucide-react";
import { useState } from "react";
import { useAccessibility } from "@/contexts/AccessibilityContext";
import { getCourseContent } from "@shared/mockData";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { t } from "@/lib/translations";

interface WeekItem {
  id: string;
  type: "lecture" | "assignment";
  title: { en: string; ka: string };
  content?: { en: string; ka: string };
  due?: { en: string; ka: string };
  isCompleted: boolean;
}

interface Week {
  weekNumber: number;
  title: { en: string; ka: string };
  items: WeekItem[];
  isCompleted: boolean;
  isCurrent: boolean;
}

export default function CourseDetail() {
  const [, params] = useRoute("/course/:id");
  const [, setLocation] = useLocation();
  const { language } = useAccessibility();

  const courseId = params?.id as string;
  const courseData = getCourseContent(courseId);

  // Initialize weeks with completion status from mockData
  const [weeks, setWeeks] = useState<Week[]>(() => {
    if (!courseData || !courseData.weeks) return [];

    return courseData.weeks.map((week: any) => ({
      weekNumber: week.id,
      title: week.title,
      items: [
        // Lecture Item
        {
          id: `w${week.id}-l1`,
          type: "lecture" as const,
          title: { en: "Lecture Topic", ka: "ლექციის თემა" },
          content: week.title,
          isCompleted: week.isCompleted,
        },
        // Assignment Item (if exists)
        ...(week.assignment
          ? [
              {
                id: `w${week.id}-a1`,
                type: "assignment" as const,
                title: { en: "Assignment", ka: "დავალება" },
                content: { en: week.assignment, ka: week.assignment }, // Using same text for now, ideally mockData has translations
                due: { en: "Due next week", ka: "მომდევნო კვირას" },
                isCompleted: week.isCompleted,
              },
            ]
          : []),
        // Exam Item (if exists)
        ...(week.type === "exam"
          ? [
              {
                id: `w${week.id}-e1`,
                type: "assignment" as const, // Reusing assignment type for icon
                title: { en: "Exam", ka: "გამოცდა" },
                content: { en: "Midterm Examination", ka: "შუალედური გამოცდა" },
                due: { en: "Scheduled", ka: "დაგეგმილია" },
                isCompleted: week.isCompleted,
              },
            ] // Added closing bracket here which was missing in original replacement block context but needed for syntactic correctness if replacing widespread
          : []),
      ],
      isCompleted: week.isCompleted,
      isCurrent: week.isCurrent || false,
    }));
  });

  // Calculate progress
  const totalItems = weeks.reduce((sum, week) => sum + week.items.length, 0);
  const completedItems = weeks.reduce(
    (sum, week) => sum + week.items.filter((item) => item.isCompleted).length,
    0,
  );
  const progressPercentage = Math.round((completedItems / totalItems) * 100);

  const toggleItemCompletion = (weekNumber: number, itemId: string) => {
    setWeeks((prev) =>
      prev.map((week) => {
        if (week.weekNumber === weekNumber) {
          const updatedItems = week.items.map((item) =>
            item.id === itemId
              ? { ...item, isCompleted: !item.isCompleted }
              : item,
          );
          const allItemsCompleted = updatedItems.every(
            (item) => item.isCompleted,
          );
          return {
            ...week,
            items: updatedItems,
            isCompleted: allItemsCompleted,
          };
        }
        return week;
      }),
    );
  };

  const course = {
    id: courseData.id,
    title: courseData.title,
    instructor: courseData.instructor,
  };

  const title = language === "ka" ? course.title.ka : course.title.en;
  const teacher =
    language === "ka" ? course.instructor.ka : course.instructor.en;

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header
        onAccessibilitySettingsClick={() => setLocation("/accessibility")}
      />

      <div className="flex flex-1 overflow-hidden">
        <main
          id="main-content"
          className="flex-1 overflow-y-auto w-full md:w-auto"
          role="main"
        >
          <div className="max-w-7xl mx-auto p-4 md:p-6 space-y-6">
            <Breadcrumbs
              items={[
                { label: t("dashboard", language), href: "/dashboard" },
                { label: title },
              ]}
            />

            {/* Course Header */}
            <div>
              <h1 className="text-3xl font-bold text-foreground">{title}</h1>
              <p className="text-muted-foreground mt-1">
                {language === "ka" ? "ინსტრუქტორი: " : "Instructor: "}
                {teacher}
              </p>
            </div>

            {/* PROGRESS BAR - Sticky */}
            <Card className="sticky top-16 z-30 border-2 border-primary/20 shadow-lg">
              <CardContent className="p-4">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-semibold">
                    {language === "ka" ? "კურსის პროგრესი" : "Course Progress"}
                  </h3>
                  <Badge variant="secondary" className="text-lg font-bold">
                    {progressPercentage}%
                  </Badge>
                </div>
                <Progress
                  value={progressPercentage}
                  className="h-3"
                  aria-valuenow={progressPercentage}
                  aria-valuemin={0}
                  aria-valuemax={100}
                  aria-label="Course completion progress"
                />
                <p className="text-xs text-muted-foreground mt-2">
                  {completedItems} {language === "ka" ? "დასრულებული" : "of"}{" "}
                  {totalItems}{" "}
                  {language === "ka" ? "ელემენტიდან" : "items completed"}
                </p>
              </CardContent>
            </Card>

            {/* Course Curriculum with Visual Hierarchy */}
            <div className="space-y-4">
              <h2 className="text-2xl font-bold">
                {language === "ka"
                  ? "კურსის სასწავლო გეგმა"
                  : "Course Curriculum"}
              </h2>

              <Accordion
                type="multiple"
                defaultValue={weeks
                  .filter((w) => w.isCurrent)
                  .map((w) => `week-${w.weekNumber}`)}
                className="space-y-3"
              >
                {weeks.map((week) => (
                  <AccordionItem
                    key={week.weekNumber}
                    value={`week-${week.weekNumber}`}
                    className={`border rounded-lg ${
                      week.isCurrent
                        ? "border-blue-500 border-2 bg-blue-50/50 dark:bg-blue-950/20"
                        : week.isCompleted
                          ? "opacity-75 bg-muted/30"
                          : "bg-background"
                    }`}
                  >
                    <AccordionTrigger className="px-4 hover:no-underline">
                      <div className="flex items-center gap-3 flex-1">
                        {/* Completion Icon */}
                        {week.isCompleted ? (
                          <CheckCircle2 className="h-6 w-6 text-green-600 dark:text-green-400 flex-shrink-0" />
                        ) : (
                          <Circle className="h-6 w-6 text-muted-foreground flex-shrink-0" />
                        )}

                        {/* Week Title */}
                        <div className="flex-1 text-left">
                          <div className="flex items-center gap-2 flex-wrap">
                            <h3 className="font-semibold text-base">
                              {language === "ka"
                                ? week.title.ka
                                : week.title.en}
                            </h3>
                            {week.isCurrent && (
                              <Badge className="bg-blue-600 hover:bg-blue-700">
                                {language === "ka" ? "მიმდინარე" : "Current"}
                              </Badge>
                            )}
                            {week.isCompleted && (
                              <Badge
                                variant="secondary"
                                className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100"
                              >
                                {language === "ka"
                                  ? "დასრულებული"
                                  : "Completed"}
                              </Badge>
                            )}
                          </div>
                          <p className="text-sm text-muted-foreground mt-1">
                            {week.items.filter((i) => i.isCompleted).length} /{" "}
                            {week.items.length}{" "}
                            {language === "ka" ? "დასრულებული" : "completed"}
                          </p>
                        </div>
                      </div>
                    </AccordionTrigger>

                    <AccordionContent className="px-4 pb-4">
                      <div className="space-y-3 mt-2">
                        {week.items.map((item) => (
                          <div
                            key={item.id}
                            className="flex items-start gap-3 p-3 bg-background rounded-lg border hover:bg-accent/50 transition-colors"
                          >
                            {/* Checkbox */}
                            <Checkbox
                              id={item.id}
                              checked={item.isCompleted}
                              onCheckedChange={() =>
                                toggleItemCompletion(week.weekNumber, item.id)
                              }
                              className="mt-1"
                              aria-label={`Mark ${
                                language === "ka"
                                  ? item.title.ka
                                  : item.title.en
                              } as complete`}
                            />

                            {/* Icon */}
                            <div className="mt-0.5">
                              {item.type === "lecture" ? (
                                <FileText className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                              ) : (
                                <Calendar className="h-5 w-5 text-orange-600 dark:text-orange-400" />
                              )}
                            </div>

                            {/* Content */}
                            <div className="flex-1">
                              <label
                                htmlFor={item.id}
                                className={`font-medium cursor-pointer ${
                                  item.isCompleted
                                    ? "line-through text-muted-foreground"
                                    : ""
                                }`}
                              >
                                {language === "ka"
                                  ? item.title.ka
                                  : item.title.en}
                              </label>
                              {item.content && (
                                <p className="text-sm text-muted-foreground mt-1">
                                  {language === "ka"
                                    ? item.content.ka
                                    : item.content.en}
                                </p>
                              )}
                              {item.due && (
                                <p className="text-xs text-orange-600 dark:text-orange-400 mt-1">
                                  {language === "ka" ? "ბოლო ვადა: " : "Due: "}
                                  {language === "ka"
                                    ? item.due.ka
                                    : item.due.en}
                                </p>
                              )}
                            </div>

                            {/* Submit Button for Assignments */}
                            {item.type === "assignment" &&
                              !item.isCompleted && (
                                <Button
                                  size="sm"
                                  onClick={() =>
                                    setLocation(
                                      `/course/${courseId}/assignment/${week.weekNumber}`,
                                    )
                                  }
                                >
                                  {language === "ka" ? "გაგზავნა" : "Submit"}
                                </Button>
                              )}
                          </div>
                        ))}
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </div>
          </div>
        </main>

        <Sidebar />
      </div>
    </div>
  );
}
