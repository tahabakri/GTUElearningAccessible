import { Header } from "@/components/Header";
import { Sidebar } from "@/components/Sidebar";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Bell, AlertTriangle, Info, CheckCircle2, X } from "lucide-react";
import { useAccessibility } from "@/contexts/AccessibilityContext";
import { useLocation } from "wouter";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { t } from "@/lib/translations";
import { useState } from "react";

interface Notification {
  id: string;
  type: "system" | "course" | "success";
  priority: "high" | "low";
  title: { en: string; ka: string };
  message: { en: string; ka: string };
  timestamp: Date;
  read: boolean;
}

// Mock notifications data
const mockNotifications: Notification[] = [
  {
    id: "1",
    type: "system",
    priority: "high",
    title: {
      en: "System Maintenance Scheduled",
      ka: "დაგეგმილია სისტემის მოვლა",
    },
    message: {
      en: "The system will be down for maintenance on December 5th from 2:00 AM to 4:00 AM.",
      ka: "სისტემა იქნება გამორთული მოვლისთვის 5 დეკემბერს 02:00-დან 04:00-მდე.",
    },
    timestamp: new Date(Date.now() - 1000 * 60 * 30), // 30 minutes ago
    read: false,
  },
  {
    id: "2",
    type: "course",
    priority: "high",
    title: { en: "New Assignment Posted", ka: "დაემატა ახალი დავალება" },
    message: {
      en: "A new assignment has been posted in Human-Computer Interaction. Due date: December 10th.",
      ka: 'ახალი დავალება დაემატა კურსში "ადამიანი-კომპიუტერის ინტერაქცია". ბოლო ვადა: 10 დეკემბერი.',
    },
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 2), // 2 hours ago
    read: false,
  },
  {
    id: "3",
    type: "success",
    priority: "low",
    title: { en: "Assignment Graded", ka: "დავალება შეფასებულია" },
    message: {
      en: "Your Week 8 assignment in Python Programming has been graded. Score: 95/100",
      ka: "თქვენი მე-8 კვირის დავალება პითონზე პროგრამირებაში შეფასებულია. ქულა: 95/100",
    },
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24), // 1 day ago
    read: true,
  },
  {
    id: "4",
    type: "course",
    priority: "low",
    title: { en: "Course Material Updated", ka: "კურსის მასალა განახლდა" },
    message: {
      en: "New lecture slides have been uploaded to Computer Networks course.",
      ka: "ახალი ლექციის სლაიდები აიტვირთა კომპიუტერული ქსელების კურსში.",
    },
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 48), // 2 days ago
    read: true,
  },
];

export default function NotificationsPage() {
  const { language } = useAccessibility();
  const [, setLocation] = useLocation();
  const [notifications, setNotifications] = useState(mockNotifications);

  const unreadCount = notifications.filter((n) => !n.read).length;

  const markAsRead = (id: string) => {
    setNotifications((prev) =>
      prev.map((n) => (n.id === id ? { ...n, read: true } : n))
    );
  };

  const markAllAsRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
  };

  const deleteNotification = (id: string) => {
    setNotifications((prev) => prev.filter((n) => n.id !== id));
  };

  const getNotificationIcon = (type: Notification["type"]) => {
    switch (type) {
      case "system":
        return (
          <AlertTriangle className="h-5 w-5 text-orange-600 dark:text-orange-400" />
        );
      case "success":
        return (
          <CheckCircle2 className="h-5 w-5 text-green-600 dark:text-green-400" />
        );
      default:
        return <Info className="h-5 w-5 text-blue-600 dark:text-blue-400" />;
    }
  };

  const formatTimestamp = (date: Date) => {
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffMins = Math.floor(diffMs / (1000 * 60));
    const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
    const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));

    if (diffMins < 60) {
      return language === "ka"
        ? `${diffMins} წუთის წინ`
        : `${diffMins} minutes ago`;
    } else if (diffHours < 24) {
      return language === "ka"
        ? `${diffHours} საათის წინ`
        : `${diffHours} hours ago`;
    } else {
      return language === "ka"
        ? `${diffDays} დღის წინ`
        : `${diffDays} days ago`;
    }
  };

  const highPriorityNotifications = notifications.filter(
    (n) => n.priority === "high"
  );
  const lowPriorityNotifications = notifications.filter(
    (n) => n.priority === "low"
  );

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
          <div className="max-w-4xl mx-auto p-4 md:p-6 space-y-6">
            <Breadcrumbs
              items={[
                { label: t("dashboard", language), href: "/dashboard" },
                {
                  label: language === "ka" ? "შეტყობინებები" : "Notifications",
                },
              ]}
            />

            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-3xl font-bold text-foreground flex items-center gap-2">
                  <Bell className="h-8 w-8" />
                  {language === "ka" ? "შეტყობინებები" : "Notifications"}
                </h1>
                <p className="text-muted-foreground mt-1">
                  {unreadCount > 0
                    ? language === "ka"
                      ? `${unreadCount} წაუკითხავი შეტყობინება`
                      : `${unreadCount} unread notifications`
                    : language === "ka"
                    ? "ყველა შეტყობინება წაკითხულია"
                    : "All notifications read"}
                </p>
              </div>

              {unreadCount > 0 && (
                <Button onClick={markAllAsRead} variant="outline">
                  {language === "ka"
                    ? "ყველას მონიშვნა როგორც წაკითხული"
                    : "Mark all as read"}
                </Button>
              )}
            </div>

            {/* High Priority Notifications */}
            {highPriorityNotifications.length > 0 && (
              <div className="space-y-3">
                <h2 className="text-lg font-semibold text-foreground flex items-center gap-2">
                  <AlertTriangle className="h-5 w-5 text-orange-600" />
                  {language === "ka" ? "მაღალი პრიორიტეტი" : "High Priority"}
                </h2>

                {highPriorityNotifications.map((notification) => (
                  <Card
                    key={notification.id}
                    className={`${
                      !notification.read
                        ? "border-l-4 border-l-orange-500 bg-orange-50/30 dark:bg-orange-950/20"
                        : ""
                    }`}
                  >
                    <CardContent className="p-4">
                      <div className="flex items-start gap-3">
                        <div className="mt-0.5">
                          {getNotificationIcon(notification.type)}
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-start justify-between gap-2">
                            <h3 className="font-semibold text-foreground">
                              {language === "ka"
                                ? notification.title.ka
                                : notification.title.en}
                            </h3>
                            <div className="flex items-center gap-2 flex-shrink-0">
                              {!notification.read && (
                                <Badge
                                  variant="destructive"
                                  className="text-xs"
                                >
                                  {language === "ka" ? "ახალი" : "New"}
                                </Badge>
                              )}
                              <Button
                                variant="ghost"
                                size="icon"
                                className="h-6 w-6"
                                onClick={() =>
                                  deleteNotification(notification.id)
                                }
                                aria-label="Delete notification"
                              >
                                <X className="h-4 w-4" />
                              </Button>
                            </div>
                          </div>
                          <p className="text-sm text-muted-foreground mt-1">
                            {language === "ka"
                              ? notification.message.ka
                              : notification.message.en}
                          </p>
                          <div className="flex items-center justify-between mt-2">
                            <span className="text-xs text-muted-foreground">
                              {formatTimestamp(notification.timestamp)}
                            </span>
                            {!notification.read && (
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => markAsRead(notification.id)}
                                className="text-xs h-7"
                              >
                                {language === "ka"
                                  ? "მონიშვნა როგორც წაკითხული"
                                  : "Mark as read"}
                              </Button>
                            )}
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}

            {/* Low Priority Notifications */}
            {lowPriorityNotifications.length > 0 && (
              <div className="space-y-3">
                <h2 className="text-lg font-semibold text-foreground flex items-center gap-2">
                  <Info className="h-5 w-5 text-blue-600" />
                  {language === "ka" ? "კურსის განახლებები" : "Course Updates"}
                </h2>

                {lowPriorityNotifications.map((notification) => (
                  <Card
                    key={notification.id}
                    className={`${
                      !notification.read
                        ? "border-l-4 border-l-blue-500 bg-blue-50/30 dark:bg-blue-950/20"
                        : ""
                    }`}
                  >
                    <CardContent className="p-4">
                      <div className="flex items-start gap-3">
                        <div className="mt-0.5">
                          {getNotificationIcon(notification.type)}
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-start justify-between gap-2">
                            <h3 className="font-semibold text-foreground">
                              {language === "ka"
                                ? notification.title.ka
                                : notification.title.en}
                            </h3>
                            <Button
                              variant="ghost"
                              size="icon"
                              className="h-6 w-6 flex-shrink-0"
                              onClick={() =>
                                deleteNotification(notification.id)
                              }
                              aria-label="Delete notification"
                            >
                              <X className="h-4 w-4" />
                            </Button>
                          </div>
                          <p className="text-sm text-muted-foreground mt-1">
                            {language === "ka"
                              ? notification.message.ka
                              : notification.message.en}
                          </p>
                          <div className="flex items-center justify-between mt-2">
                            <span className="text-xs text-muted-foreground">
                              {formatTimestamp(notification.timestamp)}
                            </span>
                            {!notification.read && (
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => markAsRead(notification.id)}
                                className="text-xs h-7"
                              >
                                {language === "ka"
                                  ? "მონიშვნა როგორც წაკითხული"
                                  : "Mark as read"}
                              </Button>
                            )}
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}

            {notifications.length === 0 && (
              <Card>
                <CardContent className="text-center py-12">
                  <Bell className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                  <p className="text-muted-foreground">
                    {language === "ka"
                      ? "შეტყობინებები არ არის"
                      : "No notifications"}
                  </p>
                </CardContent>
              </Card>
            )}
          </div>
        </main>

        <Sidebar />
      </div>
    </div>
  );
}
