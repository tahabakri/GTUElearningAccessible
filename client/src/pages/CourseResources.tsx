import { useRoute, useLocation } from "wouter";
import { Header } from "@/components/Header";
import { Sidebar } from "@/components/Sidebar";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  FileText,
  Video,
  FileImage,
  Download,
  Folder,
  ChevronRight,
} from "lucide-react";
import { useAccessibility } from "@/contexts/AccessibilityContext";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { t } from "@/lib/translations";
import { Badge } from "@/components/ui/badge";

interface Resource {
  id: string;
  name: { en: string; ka: string };
  type: "pdf" | "video" | "ppt" | "image";
  size: string;
  uploadDate: string;
  category: { en: string; ka: string };
}

// Mock resources data
const mockResources: Resource[] = [
  {
    id: "1",
    name: { en: "Course Syllabus", ka: "კურსის სილაბუსი" },
    type: "pdf",
    size: "2.5 MB",
    uploadDate: "2025-09-01",
    category: { en: "General", ka: "ზოგადი" },
  },
  {
    id: "2",
    name: {
      en: "Week 1 - Introduction to HCI",
      ka: "კვირა 1 - HCI-ის შესავალი",
    },
    type: "pdf",
    size: "5.2 MB",
    uploadDate: "2025-09-05",
    category: { en: "Lecture Slides", ka: "ლექციის სლაიდები" },
  },
  {
    id: "3",
    name: {
      en: "Usability Testing Demo",
      ka: "გამოსაყენებლობის ტესტირების დემო",
    },
    type: "video",
    size: "125 MB",
    uploadDate: "2025-09-12",
    category: { en: "Videos", ka: "ვიდეოები" },
  },
  {
    id: "4",
    name: {
      en: "Week 2 - User Research Methods",
      ka: "კვირა 2 - მომხმარებლის კვლევის მეთოდები",
    },
    type: "ppt",
    size: "8.1 MB",
    uploadDate: "2025-09-12",
    category: { en: "Lecture Slides", ka: "ლექციის სლაიდები" },
  },
  {
    id: "5",
    name: {
      en: "Interface Design Examples",
      ka: "ინტერფეისის დიზაინის მაგალითები",
    },
    type: "image",
    size: "3.4 MB",
    uploadDate: "2025-09-19",
    category: { en: "Resources", ka: "რესურსები" },
  },
  {
    id: "6",
    name: { en: "Assignment Guidelines", ka: "დავალების ინსტრუქციები" },
    type: "pdf",
    size: "1.8 MB",
    uploadDate: "2025-09-20",
    category: { en: "Assignments", ka: "დავალებები" },
  },
];

export default function CourseResources() {
  const [, params] = useRoute("/course/:id/resources");
  const [, setLocation] = useLocation();
  const { language } = useAccessibility();

  const courseId = params?.id as string;

  const getFileIcon = (type: Resource["type"]) => {
    switch (type) {
      case "pdf":
        return <FileText className="h-8 w-8 text-red-600 dark:text-red-400" />;
      case "video":
        return (
          <Video className="h-8 w-8 text-purple-600 dark:text-purple-400" />
        );
      case "ppt":
        return (
          <FileImage className="h-8 w-8 text-orange-600 dark:text-orange-400" />
        );
      case "image":
        return (
          <FileImage className="h-8 w-8 text-blue-600 dark:text-blue-400" />
        );
      default:
        return (
          <FileText className="h-8 w-8 text-gray-600 dark:text-gray-400" />
        );
    }
  };

  const getFileTypeLabel = (type: Resource["type"]) => {
    switch (type) {
      case "pdf":
        return "PDF";
      case "video":
        return language === "ka" ? "ვიდეო" : "Video";
      case "ppt":
        return "PPT";
      case "image":
        return language === "ka" ? "სურათი" : "Image";
      default:
        return "File";
    }
  };

  // Group resources by category
  const groupedResources = mockResources.reduce((acc, resource) => {
    const categoryKey =
      language === "ka" ? resource.category.ka : resource.category.en;
    if (!acc[categoryKey]) {
      acc[categoryKey] = [];
    }
    acc[categoryKey].push(resource);
    return acc;
  }, {} as Record<string, Resource[]>);

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
                {
                  label: language === "ka" ? "კურსი" : "Course",
                  href: `/course/${courseId}`,
                },
                { label: language === "ka" ? "რესურსები" : "Resources" },
              ]}
            />

            <div>
              <h1 className="text-3xl font-bold text-foreground flex items-center gap-2">
                <Folder className="h-8 w-8" />
                {language === "ka" ? "კურსის რესურსები" : "Course Resources"}
              </h1>
              <p className="text-muted-foreground mt-1">
                {language === "ka"
                  ? "ჩამოტვირთეთ ლექციის მასალები, ვიდეოები და დამატებითი რესურსები"
                  : "Download lecture materials, videos, and additional resources"}
              </p>
            </div>

            {/* Resources by Category */}
            <div className="space-y-6">
              {Object.entries(groupedResources).map(([category, resources]) => (
                <div key={category}>
                  <h2 className="text-xl font-semibold mb-3 flex items-center gap-2">
                    <Folder className="h-5 w-5" />
                    {category}
                    <Badge variant="secondary">{resources.length}</Badge>
                  </h2>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {resources.map((resource) => (
                      <Card
                        key={resource.id}
                        className="hover:shadow-md transition-shadow"
                      >
                        <CardContent className="p-4">
                          <div className="flex items-start gap-4">
                            <div className="flex-shrink-0">
                              {getFileIcon(resource.type)}
                            </div>
                            <div className="flex-1 min-w-0">
                              <h3 className="font-semibold text-foreground truncate">
                                {language === "ka"
                                  ? resource.name.ka
                                  : resource.name.en}
                              </h3>
                              <div className="flex items-center gap-2 mt-1">
                                <Badge variant="outline" className="text-xs">
                                  {getFileTypeLabel(resource.type)}
                                </Badge>
                                <span className="text-xs text-muted-foreground">
                                  {resource.size}
                                </span>
                              </div>
                              <p className="text-xs text-muted-foreground mt-1">
                                {language === "ka"
                                  ? "აიტვირთა: "
                                  : "Uploaded: "}
                                {new Date(
                                  resource.uploadDate
                                ).toLocaleDateString(
                                  language === "ka" ? "ka-GE" : "en-US",
                                  {
                                    year: "numeric",
                                    month: "long",
                                    day: "numeric",
                                  }
                                )}
                              </p>
                            </div>
                            <Button
                              size="sm"
                              variant="outline"
                              className="flex-shrink-0"
                              aria-label={`Download ${
                                language === "ka"
                                  ? resource.name.ka
                                  : resource.name.en
                              }`}
                            >
                              <Download className="h-4 w-4 mr-1" />
                              {language === "ka" ? "ჩამოტვირთვა" : "Download"}
                            </Button>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            {/* Quick Actions */}
            <Card className="bg-muted/30">
              <CardContent className="p-6">
                <h3 className="font-semibold mb-3">
                  {language === "ka" ? "სწრაფი მოქმედებები" : "Quick Actions"}
                </h3>
                <div className="flex flex-wrap gap-3">
                  <Button
                    variant="outline"
                    onClick={() => setLocation(`/course/${courseId}`)}
                  >
                    <ChevronRight className="h-4 w-4 mr-1 rotate-180" />
                    {language === "ka" ? "უკან კურსზე" : "Back to Course"}
                  </Button>
                  <Button variant="outline">
                    <Download className="h-4 w-4 mr-1" />
                    {language === "ka" ? "ყველას ჩამოტვირთვა" : "Download All"}
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </main>

        <Sidebar />
      </div>
    </div>
  );
}
