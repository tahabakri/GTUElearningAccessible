import { Header } from "@/components/Header";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useLocation } from "wouter";
import { useAccessibility } from "@/contexts/AccessibilityContext";
import { academicData } from "@shared/mockData";
import {
  GraduationCap,
  TrendingUp,
  Award,
  BookOpen,
  Loader2,
  MessageCircle,
  HelpCircle,
} from "lucide-react";
import { useState, useEffect } from "react";

// Helper function to get grade color
const getGradeColor = (grade: string) => {
  switch (grade) {
    case "A":
      return "text-emerald-600 dark:text-emerald-400 bg-emerald-100 dark:bg-emerald-900/30";
    case "B":
      return "text-blue-600 dark:text-blue-400 bg-blue-100 dark:bg-blue-900/30";
    case "C":
      return "text-amber-600 dark:text-amber-400 bg-amber-100 dark:bg-amber-900/30";
    case "D":
      return "text-orange-600 dark:text-orange-400 bg-orange-100 dark:bg-orange-900/30";
    case "F":
      return "text-red-600 dark:text-red-400 bg-red-100 dark:bg-red-900/30";
    default:
      return "text-gray-600 dark:text-gray-400 bg-gray-100 dark:bg-gray-900/30";
  }
};

// Helper function to calculate semester GPA
const calculateSemesterGPA = (
  courses: { credits: number; grade: string }[],
) => {
  const gradePoints: Record<string, number> = {
    A: 4.0,
    B: 3.0,
    C: 2.0,
    D: 1.0,
    F: 0.0,
  };
  let totalPoints = 0;
  let totalCredits = 0;
  courses.forEach((course) => {
    totalPoints += gradePoints[course.grade] * course.credits;
    totalCredits += course.credits;
  });
  return totalCredits > 0 ? (totalPoints / totalCredits).toFixed(2) : "0.00";
};

// Helper function to determine course category based on name
const getCourseCategory = (
  courseName: string,
): { en: string; ka: string; color: string } => {
  const nameLower = courseName.toLowerCase();
  if (nameLower.includes("exam") || nameLower.includes("გამოცდა")) {
    return {
      en: "Exam",
      ka: "გამოცდა",
      color: "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400",
    };
  }
  if (nameLower.includes("lab") || nameLower.includes("ლაბ")) {
    return {
      en: "Lab",
      ka: "ლაბ",
      color:
        "bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-400",
    };
  }
  if (
    nameLower.includes("project") ||
    nameLower.includes("პროექტ") ||
    nameLower.includes("course paper") ||
    nameLower.includes("საკურსო")
  ) {
    return {
      en: "Project",
      ka: "პროექტი",
      color:
        "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400",
    };
  }
  return {
    en: "Course",
    ka: "კურსი",
    color: "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400",
  };
};

export default function Grades() {
  const [, setLocation] = useLocation();
  const { language } = useAccessibility();
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

  // Simulate loading state for visibility of system status
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 800);
    return () => clearTimeout(timer);
  }, []);

  const progressPercentage = Math.round(
    (academicData.summary.totalCredits / academicData.summary.totalRequired) *
      100,
  );

  // Helper to generate Ask a Question mailto link
  const getAskQuestionLink = (teacherName: string, courseName: string) => {
    const lastName = teacherName.split(" ").pop() || teacherName;
    const subject = encodeURIComponent(`Question about grade: ${courseName}`);
    const body = encodeURIComponent(
      `Dear Professor ${lastName},\n\nI am writing to inquire about my grade in ${courseName}.\n\n[Please write your question here]\n\nThank you for your time.\n\nBest regards`,
    );
    // Use a generic email pattern
    const email = `${lastName.toLowerCase().replace(/[^a-z]/g, "")}@gtu.ge`;
    return `mailto:${email}?subject=${subject}&body=${body}`;
  };

  // Loading state - Visibility of System Status
  if (isLoading) {
    return (
      <div className="min-h-screen bg-background">
        <Header
          onAccessibilitySettingsClick={() => setLocation("/accessibility")}
        />
        <main id="main-content" className="flex-1 p-4 md:p-6 max-w-7xl mx-auto">
          <div className="flex flex-col items-center justify-center py-20 space-y-4">
            <Loader2 className="h-12 w-12 text-primary animate-spin" />
            <p className="text-lg text-muted-foreground">
              {language === "ka"
                ? "იტვირთება შეფასებები..."
                : "Loading your grades..."}
            </p>
          </div>
        </main>
      </div>
    );
  }

  // Error state
  if (hasError) {
    return (
      <div className="min-h-screen bg-background">
        <Header
          onAccessibilitySettingsClick={() => setLocation("/accessibility")}
        />
        <main id="main-content" className="flex-1 p-4 md:p-6 max-w-7xl mx-auto">
          <div className="flex flex-col items-center justify-center py-20 space-y-4 text-center">
            <HelpCircle className="h-12 w-12 text-orange-500" />
            <h2 className="text-xl font-semibold">
              {language === "ka"
                ? "შეფასებები ვერ ჩაიტვირთა"
                : "Could not load grades"}
            </h2>
            <p className="text-muted-foreground max-w-md">
              {language === "ka"
                ? "გთხოვთ სცადოთ მოგვიანებით ან დაუკავშირდით მხარდაჭერას."
                : "Please try again later or contact support if the problem persists."}
            </p>
            <Button onClick={() => window.location.reload()}>
              {language === "ka" ? "ხელახლა ცდა" : "Try Again"}
            </Button>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Header
        onAccessibilitySettingsClick={() => setLocation("/accessibility")}
      />
      <main id="main-content" className="flex-1 p-4 md:p-6 max-w-7xl mx-auto">
        <div className="space-y-6">
          {/* Page Header */}
          <div className="flex items-center gap-3">
            <div className="p-3 bg-primary/10 rounded-xl">
              <GraduationCap className="h-8 w-8 text-primary" />
            </div>
            <div>
              <h1 className="text-2xl md:text-3xl font-bold text-foreground">
                {language === "ka"
                  ? "აკადემიური მოსწრება"
                  : "Academic Transcript"}
              </h1>
              <p className="text-muted-foreground">
                {language === "ka"
                  ? "თქვენი სრული აკადემიური ისტორია"
                  : "Your complete academic history"}
              </p>
            </div>
          </div>

          {/* Summary Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* GPA Card */}
            <Card className="border-2 border-primary/20 bg-gradient-to-br from-primary/5 to-primary/10">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground uppercase tracking-wide">
                      {language === "ka"
                        ? "საშუალო ქულა (GPA)"
                        : "Cumulative GPA"}
                    </p>
                    <p className="text-4xl font-bold text-primary mt-1">
                      {academicData.summary.gpa}
                    </p>
                    <p className="text-sm text-muted-foreground mt-1">
                      {language === "ka" ? "4.0 სკალიდან" : "out of 4.0"}
                    </p>
                  </div>
                  <div className="p-4 bg-primary/10 rounded-full">
                    <Award className="h-8 w-8 text-primary" />
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Credits Card */}
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground uppercase tracking-wide">
                      {language === "ka"
                        ? "მოპოვებული კრედიტები"
                        : "Credits Earned"}
                    </p>
                    <p className="text-4xl font-bold text-foreground mt-1">
                      {academicData.summary.totalCredits}
                    </p>
                    <p className="text-sm text-muted-foreground mt-1">
                      {language === "ka"
                        ? `${academicData.summary.totalRequired} საჭირო`
                        : `of ${academicData.summary.totalRequired} required`}
                    </p>
                  </div>
                  <div className="p-4 bg-blue-100 dark:bg-blue-900/30 rounded-full">
                    <BookOpen className="h-8 w-8 text-blue-600 dark:text-blue-400" />
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Progress Card */}
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-3">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground uppercase tracking-wide">
                      {language === "ka"
                        ? "ბაკალავრის პროგრესი"
                        : "Bachelor's Progress"}
                    </p>
                    <p className="text-4xl font-bold text-foreground mt-1">
                      {progressPercentage}%
                    </p>
                  </div>
                  <div className="p-4 bg-emerald-100 dark:bg-emerald-900/30 rounded-full">
                    <TrendingUp className="h-8 w-8 text-emerald-600 dark:text-emerald-400" />
                  </div>
                </div>
                {/* Progress Bar */}
                <div
                  className="w-full h-4 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden"
                  role="progressbar"
                  aria-valuenow={progressPercentage}
                  aria-valuemin={0}
                  aria-valuemax={100}
                  aria-label={
                    language === "ka"
                      ? `ხარისხის პროგრესი: ${progressPercentage}%`
                      : `Degree progress: ${progressPercentage}%`
                  }
                >
                  <div
                    className="h-full bg-gradient-to-r from-primary to-emerald-500 rounded-full transition-all duration-500"
                    style={{ width: `${progressPercentage}%` }}
                  />
                </div>
                <p className="text-xs text-muted-foreground mt-2 text-center">
                  {language === "ka"
                    ? `${academicData.summary.totalCredits} / ${academicData.summary.totalRequired} კრედიტი`
                    : `${academicData.summary.totalCredits} / ${academicData.summary.totalRequired} credits`}
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Semester History Accordion */}
          <Card>
            <CardHeader className="border-b">
              <CardTitle className="flex items-center gap-2">
                <BookOpen className="h-5 w-5" />
                {language === "ka" ? "სემესტრების ისტორია" : "Semester History"}
              </CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              <Accordion
                type="multiple"
                defaultValue={["sem_5"]}
                className="w-full"
              >
                {academicData.semesters.map((semester) => (
                  <AccordionItem
                    key={semester.id}
                    value={semester.id}
                    className="border-b last:border-b-0"
                  >
                    <AccordionTrigger className="px-6 py-4 hover:bg-muted/30 transition-colors">
                      <div className="flex items-center justify-between w-full pr-4">
                        <div className="flex items-center gap-3">
                          {semester.isCurrent && (
                            <span className="px-2 py-1 text-xs font-bold bg-primary text-primary-foreground rounded-full">
                              {language === "ka" ? "მიმდინარე" : "Current"}
                            </span>
                          )}
                          <span className="font-semibold text-lg">
                            {language === "ka"
                              ? semester.term.ka
                              : semester.term.en}
                          </span>
                        </div>
                        <div className="flex items-center gap-4 text-sm">
                          <span className="text-muted-foreground">
                            {language === "ka"
                              ? "სემესტრის GPA:"
                              : "Semester GPA:"}
                          </span>
                          <span className="font-bold text-primary">
                            {calculateSemesterGPA(semester.courses)}
                          </span>
                        </div>
                      </div>
                    </AccordionTrigger>
                    <AccordionContent className="px-0 pb-0">
                      <div className="overflow-x-auto">
                        <table className="w-full" role="table">
                          <thead>
                            <tr className="bg-muted/50">
                              <th
                                className="text-left px-6 py-3 text-sm font-semibold text-muted-foreground"
                                scope="col"
                              >
                                {language === "ka"
                                  ? "კურსის დასახელება"
                                  : "Course Name"}
                              </th>
                              <th
                                className="text-left px-4 py-3 text-sm font-semibold text-muted-foreground hidden md:table-cell"
                                scope="col"
                              >
                                {language === "ka" ? "ლექტორი" : "Instructor"}
                              </th>
                              <th
                                className="text-center px-4 py-3 text-sm font-semibold text-muted-foreground"
                                scope="col"
                              >
                                {language === "ka" ? "კრედიტები" : "Credits"}
                              </th>
                              <th
                                className="text-center px-4 py-3 text-sm font-semibold text-muted-foreground"
                                scope="col"
                              >
                                {language === "ka" ? "ქულა" : "Score"}
                              </th>
                              <th
                                className="text-center px-6 py-3 text-sm font-semibold text-muted-foreground"
                                scope="col"
                              >
                                {language === "ka" ? "შეფასება" : "Grade"}
                              </th>
                              <th
                                className="text-center px-4 py-3 text-sm font-semibold text-muted-foreground hidden md:table-cell"
                                scope="col"
                              >
                                {language === "ka" ? "კითხვა" : "Action"}
                              </th>
                            </tr>
                          </thead>
                          <tbody>
                            {semester.courses.map((course, idx) => (
                              <tr
                                key={idx}
                                className="border-t hover:bg-muted/30 transition-colors"
                              >
                                <td className="px-6 py-4">
                                  <div className="flex flex-col gap-1">
                                    <p className="font-medium text-foreground">
                                      {language === "ka"
                                        ? course.name.ka
                                        : course.name.en}
                                    </p>
                                    <Badge
                                      className={`w-fit text-xs ${getCourseCategory(course.name.en).color}`}
                                    >
                                      {language === "ka"
                                        ? getCourseCategory(course.name.en).ka
                                        : getCourseCategory(course.name.en).en}
                                    </Badge>
                                    <p className="text-sm text-muted-foreground md:hidden">
                                      {course.teacher}
                                    </p>
                                  </div>
                                </td>
                                <td className="px-4 py-4 text-muted-foreground hidden md:table-cell">
                                  {course.teacher}
                                </td>
                                <td className="px-4 py-4 text-center font-medium">
                                  {course.credits}
                                </td>
                                <td className="px-4 py-4 text-center">
                                  <span className="font-semibold">
                                    {course.score}%
                                  </span>
                                </td>
                                <td className="px-6 py-4 text-center">
                                  <span
                                    className={`inline-flex items-center justify-center w-10 h-10 rounded-full font-bold text-lg ${getGradeColor(
                                      course.grade,
                                    )}`}
                                  >
                                    {course.grade}
                                  </span>
                                </td>
                                <td className="px-4 py-4 text-center hidden md:table-cell">
                                  <Button
                                    variant="ghost"
                                    size="sm"
                                    className="gap-1 text-primary hover:text-primary/80"
                                    onClick={() =>
                                      window.open(
                                        getAskQuestionLink(
                                          course.teacher,
                                          course.name.en,
                                        ),
                                        "_blank",
                                      )
                                    }
                                    aria-label={
                                      language === "ka"
                                        ? `კითხვა ${course.teacher}-ს`
                                        : `Ask a question to ${course.teacher}`
                                    }
                                  >
                                    <MessageCircle className="h-4 w-4" />
                                    <span className="hidden lg:inline">
                                      {language === "ka" ? "კითხვა" : "Ask"}
                                    </span>
                                  </Button>
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </CardContent>
          </Card>

          {/* Grade Legend */}
          <Card>
            <CardContent className="p-4">
              <div className="flex flex-wrap items-center justify-center gap-4 text-sm">
                <span className="text-muted-foreground font-medium">
                  {language === "ka" ? "შეფასების სკალა:" : "Grade Scale:"}
                </span>
                <div className="flex items-center gap-2">
                  <span className="inline-flex items-center justify-center w-8 h-8 rounded-full font-bold text-emerald-600 dark:text-emerald-400 bg-emerald-100 dark:bg-emerald-900/30">
                    A
                  </span>
                  <span className="text-muted-foreground">91-100</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="inline-flex items-center justify-center w-8 h-8 rounded-full font-bold text-blue-600 dark:text-blue-400 bg-blue-100 dark:bg-blue-900/30">
                    B
                  </span>
                  <span className="text-muted-foreground">81-90</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="inline-flex items-center justify-center w-8 h-8 rounded-full font-bold text-amber-600 dark:text-amber-400 bg-amber-100 dark:bg-amber-900/30">
                    C
                  </span>
                  <span className="text-muted-foreground">71-80</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="inline-flex items-center justify-center w-8 h-8 rounded-full font-bold text-orange-600 dark:text-orange-400 bg-orange-100 dark:bg-orange-900/30">
                    D
                  </span>
                  <span className="text-muted-foreground">61-70</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="inline-flex items-center justify-center w-8 h-8 rounded-full font-bold text-red-600 dark:text-red-400 bg-red-100 dark:bg-red-900/30">
                    F
                  </span>
                  <span className="text-muted-foreground">&lt;61</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
}
