import { useState } from "react";
import { Header } from "@/components/Header";
import { Sidebar } from "@/components/Sidebar";
import { CourseCard } from "@/components/CourseCard";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Search, Grid3x3, List } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import type { Course } from "@shared/schema";
import { useAccessibility } from "@/contexts/AccessibilityContext";
import { useLocation } from "wouter";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { t } from "@/lib/translations";

export default function CoursesList() {
  const [searchQuery, setSearchQuery] = useState("");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const { language } = useAccessibility();
  const [, setLocation] = useLocation();

  const { data: courses = [], isLoading } = useQuery<Course[]>({
    queryKey: ["/api/courses"],
  });

  const filteredCourses = courses.filter((course) => {
    const searchLower = searchQuery.toLowerCase();
    return (
      course.titleEn.toLowerCase().includes(searchLower) ||
      course.titleKa.toLowerCase().includes(searchLower) ||
      course.id.toLowerCase().includes(searchLower)
    );
  });

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
                { label: language === "ka" ? "ყველა კურსი" : "All Courses" },
              ]}
            />

            <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
              <div>
                <h1 className="text-3xl font-bold text-foreground">
                  {language === "ka" ? "კურსები" : "Courses"}
                </h1>
                <p className="text-muted-foreground mt-1">
                  {language === "ka"
                    ? "იხილეთ და მართეთ თქვენი კურსები"
                    : "View and manage your courses"}
                </p>
              </div>

              <div className="flex items-center gap-2">
                <Button
                  variant={viewMode === "grid" ? "default" : "outline"}
                  size="icon"
                  onClick={() => setViewMode("grid")}
                  aria-label="Grid view"
                >
                  <Grid3x3 className="h-4 w-4" />
                </Button>
                <Button
                  variant={viewMode === "list" ? "default" : "outline"}
                  size="icon"
                  onClick={() => setViewMode("list")}
                  aria-label="List view"
                >
                  <List className="h-4 w-4" />
                </Button>
              </div>
            </div>

            <Tabs defaultValue="enrolled" className="w-full">
              <TabsList className="grid w-full max-w-md grid-cols-2">
                <TabsTrigger value="enrolled">
                  {language === "ka" ? "ჩემი კურსები" : "My Courses"} (
                  {courses.length})
                </TabsTrigger>
                <TabsTrigger value="catalog">
                  {language === "ka" ? "კურსების კატალოგი" : "Course Catalog"}
                </TabsTrigger>
              </TabsList>

              <TabsContent value="enrolled" className="space-y-4 mt-6">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    type="search"
                    placeholder={
                      language === "ka"
                        ? "ძებნა კურსების..."
                        : "Search courses..."
                    }
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10"
                  />
                </div>

                {isLoading ? (
                  <div className="text-center py-12">
                    <p className="text-muted-foreground">
                      {language === "ka" ? "იტვირთება..." : "Loading..."}
                    </p>
                  </div>
                ) : filteredCourses.length === 0 ? (
                  <div className="text-center py-12">
                    <p className="text-muted-foreground">
                      {searchQuery
                        ? language === "ka"
                          ? `კურსები ვერ მოიძებნა "${searchQuery}"`
                          : `No courses found matching "${searchQuery}"`
                        : language === "ka"
                        ? "კურსები არ არის"
                        : "No courses available"}
                    </p>
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
                  </div>
                )}
              </TabsContent>

              <TabsContent value="catalog" className="space-y-4 mt-6">
                <div className="text-center py-12 bg-muted/30 rounded-lg">
                  <h3 className="text-xl font-semibold mb-2">
                    {language === "ka" ? "კურსების კატალოგი" : "Course Catalog"}
                  </h3>
                  <p className="text-muted-foreground mb-4">
                    {language === "ka"
                      ? "დაათვალიერეთ ხელმისაწვდომი კურსები და დარეგისტრირდით ახალ კურსებზე"
                      : "Browse available courses and enroll in new classes"}
                  </p>
                  <Button variant="outline">
                    {language === "ka"
                      ? "იხილეთ ხელმისაწვდომი კურსები"
                      : "View Available Courses"}
                  </Button>
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </main>

        <Sidebar />
      </div>
    </div>
  );
}
