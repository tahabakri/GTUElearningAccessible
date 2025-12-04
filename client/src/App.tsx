import { Switch, Route, Redirect, Router as WouterRouter } from "wouter";
import { useHashLocation } from "wouter/use-hash-location";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { AccessibilityProvider } from "@/contexts/AccessibilityContext";
import { AuthProvider, useAuth } from "@/contexts/AuthContext";
import { SkipToContent } from "@/components/SkipToContent";
import { LiveAnnouncer } from "@/components/LiveAnnouncer";
import { KeyboardShortcutsModal } from "@/components/KeyboardShortcutsModal";
import { MobileAccessibility } from "@/components/MobileAccessibility";
import { ScreenReaderManager } from "@/components/ScreenReaderManager";
import { VoiceCommandManager } from "@/components/VoiceCommandManager";
import { SupportWidget } from "@/components/SupportWidget";
import Landing from "@/pages/Landing";
import Login from "@/pages/Login";
import Dashboard from "@/pages/Dashboard";
import AccessibilitySettingsPage from "@/pages/AccessibilitySettings";
import Grades from "@/pages/Grades";
import Messages from "@/pages/Messages";
import Profile from "@/pages/Profile";
import Help from "@/pages/Help";
import CourseDetail from "@/pages/CourseDetail";
import AssignmentSubmission from "@/pages/AssignmentSubmission";
import CoursesList from "@/pages/CoursesList";
import CalendarPage from "@/pages/CalendarPage";
import NotificationsPage from "@/pages/NotificationsPage";
import CourseResources from "@/pages/CourseResources";
import NotFound from "@/pages/not-found";

function ProtectedRoute({
  component: Component,
}: {
  component: () => JSX.Element | null;
}) {
  const { isAuthenticated } = useAuth();

  if (!isAuthenticated) {
    return <Redirect to="/" />;
  }

  return <Component />;
}

function Router() {
  const { isAuthenticated } = useAuth();

  return (
    <Switch>
      {/* --- Public Routes --- */}
      <Route path="/">
        {isAuthenticated ? <Redirect to="/dashboard" /> : <Landing />}
      </Route>
      <Route path="/login">
        {isAuthenticated ? <Redirect to="/dashboard" /> : <Login />}
      </Route>

      {/* --- Main Student App --- */}
      <Route path="/dashboard">
        <ProtectedRoute component={Dashboard} />
      </Route>

      {/* NEW: Full Course List / Catalog */}
      <Route path="/courses">
        <ProtectedRoute component={CoursesList} />
      </Route>

      {/* NEW: Calendar Page */}
      <Route path="/calendar">
        <ProtectedRoute component={CalendarPage} />
      </Route>

      {/* NEW: Notifications Feed */}
      <Route path="/notifications">
        <ProtectedRoute component={NotificationsPage} />
      </Route>

      <Route path="/grades">
        <ProtectedRoute component={Grades} />
      </Route>
      <Route path="/messages">
        <ProtectedRoute component={Messages} />
      </Route>
      <Route path="/profile">
        <ProtectedRoute component={Profile} />
      </Route>
      <Route path="/accessibility">
        <ProtectedRoute component={AccessibilitySettingsPage} />
      </Route>
      <Route path="/help">
        <ProtectedRoute component={Help} />
      </Route>

      {/* --- Course Specific Routes --- */}
      <Route path="/course/:id">
        <ProtectedRoute component={CourseDetail} />
      </Route>

      {/* NEW: Course Files/Resources */}
      <Route path="/course/:id/resources">
        <ProtectedRoute component={CourseResources} />
      </Route>

      {/* Assignment Flow */}
      <Route path="/course/:courseId/assignment/:weekNum">
        <ProtectedRoute component={AssignmentSubmission} />
      </Route>

      {/* 404 Page */}
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <AccessibilityProvider>
          <AuthProvider>
            <WouterRouter hook={useHashLocation}>
              <LiveAnnouncer />
              <ScreenReaderManager />
              <VoiceCommandManager />
              <KeyboardShortcutsModal />
              <MobileAccessibility />
              <SkipToContent />
              <Router />
              <SupportWidget />
            </WouterRouter>
          </AuthProvider>
        </AccessibilityProvider>
        <Toaster />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
