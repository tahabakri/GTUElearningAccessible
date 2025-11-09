import { Header } from "@/components/Header";
import { Sidebar } from "@/components/Sidebar";
import { Footer } from "@/components/Footer";
import { CourseCard } from "@/components/CourseCard";
import { Button } from "@/components/ui/button";
import {
  ChevronLeft,
  ChevronRight,
  LayoutGrid,
  List,
  Menu,
  Mail,
} from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetTitle,
} from "@/components/ui/sheet";
import { useQuery } from "@tanstack/react-query";
import type { Course } from "@shared/schema";
import { useState } from "react";
import { Skeleton } from "@/components/ui/skeleton";
import { useAccessibility } from "@/contexts/AccessibilityContext";
import { t } from "@/lib/translations";
import { useLocation } from "wouter";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Announcements } from "@/components/dashboard/Announcements";

export default function Dashboard() {
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState<"name" | "date">("name");
  const { language } = useAccessibility();
  const [, setLocation] = useLocation();
  const { data: courses = [], isLoading } = useQuery<Course[]>({
    queryKey: ["/api/courses"],
  });

  const recentCourses = courses.slice(0, 3);

  const filteredCourses = courses
    .filter((course) => {
      const searchLower = searchQuery.toLowerCase();
      return (
        course.titleEn.toLowerCase().includes(searchLower) ||
        course.titleKa.toLowerCase().includes(searchLower) ||
        course.id.toLowerCase().includes(searchLower)
      );
    })
    .sort((a, b) => {
      if (sortBy === "name") {
        const titleA = language === "ka" ? a.titleKa : a.titleEn;
        const titleB = language === "ka" ? b.titleKa : b.titleEn;
        return titleA.localeCompare(titleB);
      }
      return 0; // Date sorting not implemented in mock data yet
    });

  // Faculty Contacts with Smart Gmail Actions
  const facultyContacts = [
    {
      name: { en: "Gocha Dalakishvili", ka: "გოჩა დალაქიშვილი" },
      email: "g.dalakishvili@gtu.ge",
      course: {
        en: "Human-Computer Interaction",
        ka: "ადამიანი-კომპიუტერის ინტერაქცია",
      },
    },
    {
      name: { en: "Ergun Hakan", ka: "ერგუნ ჰაქან" },
      email: "e.hakan@gtu.ge",
      course: { en: "Computer Networks", ka: "კომპიუტერული ქსელები" },
    },
    {
      name: { en: "Tornike Jafaridze", ka: "თორნიკე ჯაფარიძე" },
      email: "t.jafaridze@gtu.ge",
      course: { en: "Python Programming", ka: "პითონზე პროგრამირება" },
    },
    {
      name: { en: "Guram Acharadze", ka: "გურამ აჭარაძე" },
      email: "g.acharadze@gtu.ge",
      course: { en: "Computer Architecture", ka: "კომპიუტერული არქიტექტურა" },
    },
  ];

  const getGmailLink = (email: string, name: string, courseName: string) => {
    const lastName = name.split(" ").pop() || name;
    const subject = encodeURIComponent(`Student Question: ${courseName}`);
    const body = encodeURIComponent(
      `Dear Professor ${lastName},\n\nI hope you are doing well.\n\nI am writing to ask about ${courseName}.\n\n[Please write your question here]\n\nThank you for your time.\n\nBest regards`,
    );
    return `https://mail.google.com/mail/?view=cm&fs=1&to=${email}&su=${subject}&body=${body}`;
  };

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
          <div className="max-w-7xl mx-auto p-4 md:p-6 space-y-6 md:space-y-8">
            <Breadcrumbs items={[{ label: t("dashboard", language) }]} />

            {/* Mobile Sidebar Toggle */}
            <div className="md:hidden flex items-center gap-2 mb-4">
              <Sheet>
                <SheetTrigger asChild>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="hover-elevate"
                    data-testid="button-mobile-sidebar-toggle"
                    aria-label="Open sidebar"
                  >
                    <Menu className="h-5 w-5" />
                  </Button>
                </SheetTrigger>
                <SheetContent side="right" className="w-80 p-0 flex flex-col">
                  <SheetTitle className="sr-only">
                    Course information sidebar
                  </SheetTitle>
                  <div className="overflow-y-auto h-full">
                    <Sidebar showOnMobile={true} />
                  </div>
                </SheetContent>
              </Sheet>
              <span className="text-sm text-muted-foreground">
                Quick Access
              </span>
            </div>

            <Announcements />

            <section
              aria-labelledby="recently-accessed-heading"
              className="bg-blue-50/50 dark:bg-zinc-900/50 border border-blue-100/50 dark:border-zinc-800 rounded-xl p-4 md:p-6 -mx-4 md:-mx-6 px-4 md:px-6 shadow-sm"
            >
              <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-4 gap-2">
                <h2
                  id="recently-accessed-heading"
                  className="text-xl md:text-2xl font-semibold text-foreground flex items-center gap-2"
                >
                  <span
                    className="w-1 h-6 bg-blue-500 rounded-full inline-block"
                    aria-hidden="true"
                  ></span>
                  {t("recentlyAccessedCourses", language)}
                </h2>
                <div className="flex gap-2">
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => {
                      document
                        .getElementById("recent-courses-scroll")
                        ?.scrollBy({ left: -300, behavior: "smooth" });
                    }}
                    aria-label="Scroll left"
                  >
                    <ChevronLeft className="h-5 w-5" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => {
                      document
                        .getElementById("recent-courses-scroll")
                        ?.scrollBy({ left: 300, behavior: "smooth" });
                    }}
                    aria-label="Scroll right"
                  >
                    <ChevronRight className="h-5 w-5" />
                  </Button>
                </div>
              </div>

              {isLoading ? (
                <div className="flex overflow-x-auto pb-4 gap-6 scrollbar-hide">
                  {[1, 2, 3].map((i) => (
                    <div key={i} className="min-w-[300px] md:min-w-[350px]">
                      <div className="space-y-3">
                        <Skeleton className="aspect-video w-full" />
                        <Skeleton className="h-4 w-3/4" />
                        <Skeleton className="h-4 w-1/2" />
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div
                  id="recent-courses-scroll"
                  className="flex overflow-x-auto pb-4 gap-6 snap-x snap-mandatory scrollbar-thin scrollbar-thumb-rounded scrollbar-thumb-muted"
                  style={{ scrollPaddingLeft: "1rem" }}
                >
                  {recentCourses.map((course) => (
                    <div
                      key={course.id}
                      className="min-w-[300px] md:min-w-[350px] snap-start"
                    >
                      <CourseCard course={course} />
                    </div>
                  ))}
                </div>
              )}
            </section>

            <section aria-labelledby="course-overview-heading">
              <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-4 gap-2">
                <h2
                  id="course-overview-heading"
                  className="text-xl md:text-2xl font-semibold text-foreground"
                >
                  {t("courseOverview", language)}
                </h2>

                <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2 sm:gap-3 w-full md:w-auto">
                  <div className="w-full sm:w-[250px]">
                    <Input
                      type="search"
                      placeholder="Search courses..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="w-full"
                    />
                  </div>

                  <Select defaultValue="all">
                    <SelectTrigger
                      className="w-full sm:w-[200px]"
                      data-testid="select-filter"
                    >
                      <SelectValue placeholder="Filter courses" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">
                        ALL (EXCEPT REMOVED FROM VIEW)
                      </SelectItem>
                      <SelectItem value="inprogress">In progress</SelectItem>
                      <SelectItem value="completed">Completed</SelectItem>
                    </SelectContent>
                  </Select>

                  <Select
                    value={sortBy}
                    onValueChange={(v) => setSortBy(v as "name" | "date")}
                  >
                    <SelectTrigger
                      className="w-full sm:w-[150px]"
                      data-testid="select-sort"
                    >
                      <SelectValue placeholder="Sort by" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="name">COURSE NAME</SelectItem>
                      <SelectItem value="date">Last accessed</SelectItem>
                    </SelectContent>
                  </Select>

                  <div className="flex gap-1 border border-border rounded-md p-1">
                    <Button
                      variant={viewMode === "grid" ? "secondary" : "ghost"}
                      size="icon"
                      className="h-8 w-8"
                      onClick={() => setViewMode("grid")}
                      data-testid="button-view-grid"
                      aria-label="Grid view"
                    >
                      <LayoutGrid className="h-4 w-4" />
                    </Button>
                    <Button
                      variant={viewMode === "list" ? "secondary" : "ghost"}
                      size="icon"
                      className="h-8 w-8"
                      onClick={() => setViewMode("list")}
                      data-testid="button-view-list"
                      aria-label="List view"
                    >
                      <List className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </div>

              {isLoading ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {[1, 2, 3, 4, 5, 6].map((i) => (
                    <div key={i} className="space-y-3">
                      <Skeleton className="aspect-video w-full" />
                      <Skeleton className="h-4 w-3/4" />
                      <Skeleton className="h-4 w-1/2" />
                    </div>
                  ))}
                </div>
              ) : (
                <div
                  className={
                    viewMode === "grid"
                      ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
                      : "space-y-4"
                  }
                >
                  {filteredCourses.map((course) => (
                    <CourseCard key={course.id} course={course} />
                  ))}
                  {filteredCourses.length === 0 && (
                    <div className="col-span-full text-center py-12 text-muted-foreground">
                      No courses found matching "{searchQuery}"
                    </div>
                  )}
                </div>
              )}
            </section>
          </div>
        </main>

        <Sidebar />
      </div>

      <Footer />
    </div>
  );
}
