import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { AccessibilityToolbar } from "./AccessibilityToolbar";
import { useAuth } from "@/contexts/AuthContext";
import { useAccessibility } from "@/contexts/AccessibilityContext";
import { currentUser } from "@shared/mockData";
import {
  LayoutDashboard,
  User,
  GraduationCap,
  MessageSquare,
  Settings,
  LogOut,
  Bell,
  Mail,
  Globe,
} from "lucide-react";
import gtuLogo from "@/assets/gtu-logo.svg";
import { Badge } from "@/components/ui/badge";
import { useLocation } from "wouter";

interface HeaderProps {
  onAccessibilitySettingsClick?: () => void;
}

export function Header({ onAccessibilitySettingsClick }: HeaderProps) {
  const { user, logout } = useAuth();
  const { language, setLanguage } = useAccessibility();
  const [, setLocation] = useLocation();

  if (!user) return null;

  // Bilingual full name (fictional demo student)
  const fullNameEn = currentUser.name.en;
  const fullNameKa = currentUser.name.ka;
  const currentFullName = language === "ka" ? fullNameKa : fullNameEn;

  // Menu labels
  const menuLabels = {
    dashboardEn: "Dashboard",
    dashboardKa: "დაშბორდი",
    profileEn: "Profile",
    profileKa: "პროფილი",
    gradesEn: "Grades",
    gradesKa: "შეფასებები",
    messagesEn: "Messages",
    messagesKa: "შეტყობინებები",
    preferencesEn: "Preferences",
    preferencesKa: "პარამეტრები",
    logoutEn: "Log out",
    logoutKa: "გასვლა",
  };

  const initials = currentUser.initials;

  return (
    <header
      className="sticky top-0 z-40 w-full border-b border-border shadow-sm transition-colors duration-300"
      style={{ backgroundColor: "var(--header-bg)", color: "var(--header-fg)" }}
    >
      <div className="flex h-16 items-center justify-between px-6 gap-4">
        {/* LEFT SIDE: LOGO & TITLE (Clickable - navigates to Dashboard) */}
        <div
          className="flex items-center gap-3 cursor-pointer hover:opacity-80 transition-opacity"
          onClick={() => setLocation("/dashboard")}
          role="button"
          tabIndex={0}
          onKeyDown={(e) => {
            if (e.key === "Enter" || e.key === " ") {
              e.preventDefault();
              setLocation("/dashboard");
            }
          }}
          aria-label="Go to Dashboard"
        >
          <div className="w-10 h-10 rounded-md flex items-center justify-center overflow-hidden shrink-0">
            <img
              src={gtuLogo}
              alt="GTU Logo"
              className="w-full h-full object-contain"
            />
          </div>
          <div className="hidden md:block">
            <h1 className="text-sm font-semibold text-inherit">
              საქართველოს ტექნიკური უნივერსიტეტი
            </h1>
            <p className="text-xs opacity-80">GEORGIAN TECHNICAL UNIVERSITY</p>
          </div>
          <div className="md:hidden">
            <h1 className="text-lg font-bold text-inherit">GTU</h1>
          </div>
        </div>

        <div className="hidden md:flex">
          <AccessibilityToolbar onSettingsClick={onAccessibilitySettingsClick} />
        </div>

        <div className="flex items-center gap-2 md:gap-3">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setLocation("/notifications")}
            data-testid="button-notifications"
            aria-label="Notifications"
            className="relative h-9 text-inherit hover:bg-white/10"
          >
            <Bell className="h-5 w-5" />
            <Badge
              variant="destructive"
              className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0 text-xs"
            >
              3
            </Badge>
          </Button>

          <Button
            variant="ghost"
            size="icon"
            onClick={() => setLocation("/messages")}
            data-testid="button-messages"
            aria-label="Messages"
            className="relative h-9 text-inherit hover:bg-white/10 hidden sm:flex"
          >
            <Mail className="h-5 w-5" />
          </Button>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                className="gap-2 h-9 px-2 text-inherit hover:bg-white/10"
                data-testid="button-user-menu"
                aria-label="User menu"
              >
                <Avatar className="h-7 w-7 border border-white/20">
                  <AvatarImage src="" alt={currentFullName} />
                  <AvatarFallback className="text-xs bg-white/10 text-inherit">
                    {initials}
                  </AvatarFallback>
                </Avatar>
                <span className="text-sm font-medium hidden lg:inline">{currentFullName}</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56">
              <DropdownMenuLabel>
                <div className="flex flex-col gap-1">
                  <p className="text-sm font-medium">{currentFullName}</p>
                  <p className="text-xs text-muted-foreground">{user.email}</p>
                </div>
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem
                onClick={() => setLocation("/dashboard")}
                data-testid="menu-item-dashboard"
              >
                <LayoutDashboard className="mr-2 h-4 w-4" />
                <span>
                  {language === "ka"
                    ? menuLabels.dashboardKa
                    : menuLabels.dashboardEn}
                </span>
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => setLocation("/profile")}
                data-testid="menu-item-profile"
              >
                <User className="mr-2 h-4 w-4" />
                <span>
                  {language === "ka"
                    ? menuLabels.profileKa
                    : menuLabels.profileEn}
                </span>
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => setLocation("/grades")}
                data-testid="menu-item-grades"
              >
                <GraduationCap className="mr-2 h-4 w-4" />
                <span>
                  {language === "ka"
                    ? menuLabels.gradesKa
                    : menuLabels.gradesEn}
                </span>
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => setLocation("/messages")}
                data-testid="menu-item-messages"
              >
                <MessageSquare className="mr-2 h-4 w-4" />
                <span>
                  {language === "ka"
                    ? menuLabels.messagesKa
                    : menuLabels.messagesEn}
                </span>
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => setLocation("/accessibility")}
                data-testid="menu-item-preferences"
              >
                <Settings className="mr-2 h-4 w-4" />
                <span>
                  {language === "ka"
                    ? menuLabels.preferencesKa
                    : menuLabels.preferencesEn}
                </span>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={logout} data-testid="menu-item-logout">
                <LogOut className="mr-2 h-4 w-4" />
                <span>
                  {language === "ka"
                    ? menuLabels.logoutKa
                    : menuLabels.logoutEn}
                </span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                size="sm"
                className="gap-2 h-9 text-inherit hover:bg-white/10"
                data-testid="button-language-menu"
                aria-label="Language selection"
              >
                <Globe className="h-4 w-4" />
                <span className="text-sm font-medium">
                  {language === "en" ? "ENGLISH" : "ქართული"}
                </span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem
                onClick={() => setLanguage("en")}
                data-testid="menu-item-language-en"
                className={language === "en" ? "bg-accent" : ""}
              >
                <span>English (EN)</span>
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => setLanguage("ka")}
                data-testid="menu-item-language-ka"
                className={language === "ka" ? "bg-accent" : ""}
              >
                <span>ქართული (KA)</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  );
}
