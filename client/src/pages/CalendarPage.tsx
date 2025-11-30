import { Header } from "@/components/Header";
import { Sidebar } from "@/components/Sidebar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Calendar, Clock, AlertCircle } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import type { CalendarEvent } from "@shared/schema";
import { useAccessibility } from "@/contexts/AccessibilityContext";
import { useLocation } from "wouter";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { t } from "@/lib/translations";

export default function CalendarPage() {
  const { language } = useAccessibility();
  const [, setLocation] = useLocation();

  const { data: events = [], isLoading } = useQuery<CalendarEvent[]>({
    queryKey: ["/api/calendar/events"],
  });

  // Group events by date
  const groupedEvents = events.reduce((acc, event) => {
    const dateKey = new Date(event.date).toLocaleDateString();
    if (!acc[dateKey]) {
      acc[dateKey] = [];
    }
    acc[dateKey].push(event);
    return acc;
  }, {} as Record<string, CalendarEvent[]>);

  const sortedDates = Object.keys(groupedEvents).sort(
    (a, b) => new Date(a).getTime() - new Date(b).getTime()
  );

  const getEventColor = (event: CalendarEvent) => {
    const daysUntil = Math.ceil(
      (new Date(event.date).getTime() - Date.now()) / (1000 * 60 * 60 * 24)
    );

    if (daysUntil < 0) return "default"; // Past event
    if (daysUntil <= 3) return "destructive"; // Urgent (Red)
    if (daysUntil <= 7) return "warning"; // Soon (Orange)
    return "default"; // Future (Green)
  };

  const getEventIcon = (event: CalendarEvent) => {
    const daysUntil = Math.ceil(
      (new Date(event.date).getTime() - Date.now()) / (1000 * 60 * 60 * 24)
    );
    if (daysUntil <= 3) return <AlertCircle className="h-4 w-4" />;
    return <Calendar className="h-4 w-4" />;
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
          <div className="max-w-7xl mx-auto p-4 md:p-6 space-y-6">
            <Breadcrumbs
              items={[
                { label: t("dashboard", language), href: "/dashboard" },
                { label: language === "ka" ? "კალენდარი" : "Calendar" },
              ]}
            />

            <div>
              <h1 className="text-3xl font-bold text-foreground flex items-center gap-2">
                <Calendar className="h-8 w-8" />
                {language === "ka" ? "კალენდარი" : "Calendar"}
              </h1>
              <p className="text-muted-foreground mt-1">
                {language === "ka"
                  ? "იხილეთ თქვენი დავალებები და ღონისძიებები"
                  : "View your assignments and events"}
              </p>
            </div>

            {/* Legend */}
            <Card>
              <CardHeader>
                <CardTitle className="text-base">
                  {language === "ka" ? "ლეგენდა" : "Legend"}
                </CardTitle>
              </CardHeader>
              <CardContent className="flex flex-wrap gap-4">
                <div className="flex items-center gap-2">
                  <Badge variant="destructive">
                    {language === "ka" ? "გადაუდებელი" : "Urgent"}
                  </Badge>
                  <span className="text-sm text-muted-foreground">
                    {language === "ka" ? "(3 დღეში)" : "(Within 3 days)"}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <Badge className="bg-orange-500 hover:bg-orange-600">
                    {language === "ka" ? "მალე" : "Soon"}
                  </Badge>
                  <span className="text-sm text-muted-foreground">
                    {language === "ka" ? "(კვირაში)" : "(Within a week)"}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <Badge variant="default">
                    {language === "ka" ? "მომავალი" : "Upcoming"}
                  </Badge>
                  <span className="text-sm text-muted-foreground">
                    {language === "ka"
                      ? "(კვირაზე მეტი)"
                      : "(More than a week)"}
                  </span>
                </div>
              </CardContent>
            </Card>

            {/* Events Timeline */}
            {isLoading ? (
              <div className="text-center py-12">
                <p className="text-muted-foreground">
                  {language === "ka" ? "იტვირთება..." : "Loading..."}
                </p>
              </div>
            ) : events.length === 0 ? (
              <Card>
                <CardContent className="text-center py-12">
                  <Calendar className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                  <p className="text-muted-foreground">
                    {language === "ka"
                      ? "ღონისძიებები არ არის"
                      : "No events scheduled"}
                  </p>
                </CardContent>
              </Card>
            ) : (
              <div className="space-y-6">
                {sortedDates.map((dateKey) => {
                  const date = new Date(dateKey);
                  const dayEvents = groupedEvents[dateKey];

                  return (
                    <div key={dateKey}>
                      <h2 className="text-xl font-semibold mb-3 flex items-center gap-2">
                        <Clock className="h-5 w-5" />
                        {date.toLocaleDateString(
                          language === "ka" ? "ka-GE" : "en-US",
                          {
                            weekday: "long",
                            year: "numeric",
                            month: "long",
                            day: "numeric",
                          }
                        )}
                      </h2>

                      <div className="space-y-3">
                        {dayEvents.map((event) => (
                          <Card
                            key={event.id}
                            className="hover:shadow-md transition-shadow cursor-pointer"
                            onClick={() =>
                              event.courseId &&
                              setLocation(`/course/${event.courseId}`)
                            }
                            tabIndex={0}
                            role="button"
                            aria-label={`${
                              event.title
                            }, ${date.toLocaleDateString()}`}
                          >
                            <CardContent className="p-4">
                              <div className="flex items-start justify-between gap-4">
                                <div className="flex items-start gap-3 flex-1">
                                  <div className="mt-1">
                                    {getEventIcon(event)}
                                  </div>
                                  <div className="flex-1">
                                    <h3 className="font-semibold text-foreground">
                                      {event.title}
                                    </h3>
                                    {event.courseId && (
                                      <p className="text-sm text-muted-foreground mt-1">
                                        {language === "ka"
                                          ? "კურსი: "
                                          : "Course: "}
                                        {event.courseId}
                                      </p>
                                    )}
                                  </div>
                                </div>
                                <Badge variant={getEventColor(event)}>
                                  {date.toLocaleDateString(
                                    language === "ka" ? "ka-GE" : "en-US",
                                    {
                                      month: "short",
                                      day: "numeric",
                                    }
                                  )}
                                </Badge>
                              </div>
                            </CardContent>
                          </Card>
                        ))}
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </main>

        <Sidebar />
      </div>
    </div>
  );
}
