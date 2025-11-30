import { Header } from '@/components/Header';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useLocation } from 'wouter';
import { HelpCircle, BookOpen, Zap, Accessibility } from 'lucide-react';
import { useState } from 'react';

export default function Help() {
  const [, setLocation] = useLocation();
  const [liveMessage, setLiveMessage] = useState('');

  return (
    <div className="min-h-screen bg-background">
      <Header onAccessibilitySettingsClick={() => setLocation('/accessibility')} />
      <main id="main-content" className="flex-1 p-6 max-w-7xl mx-auto">
        <div className="space-y-6">
          <div>
            <h1 className="text-3xl font-bold text-foreground mb-2">Help & Support</h1>
            <p className="text-muted-foreground">Learn about features and accessibility options</p>
          </div>

            <div className="grid gap-4">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Accessibility className="w-5 h-5" />
                  Accessibility Features
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <p className="text-sm">This platform includes comprehensive accessibility features:</p>
                <ul className="text-sm space-y-1 ml-4 list-disc">
                  <li>Font size controls (A-/A/A+)</li>
                  <li>Dark mode and light mode toggle</li>
                  <li>Colorblind mode simulations</li>
                  <li>Voice command recognition</li>
                  <li>Screen reader support</li>
                  <li>Full keyboard navigation</li>
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Zap className="w-5 h-5" />
                  Voice Commands
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <p className="text-sm font-medium mb-2">Navigation Commands:</p>
                  <ul className="text-sm space-y-1 ml-4 list-disc">
                    <li>"Dashboard" - Go to main dashboard</li>
                    <li>"Grades" - View your grades</li>
                    <li>"Messages" - Check messages</li>
                    <li>"Courses" - View all courses</li>
                    <li>"Calendar" - Open calendar</li>
                    <li>"Profile" - Open your profile</li>
                    <li>"Help" - Open this help page</li>
                  </ul>
                </div>
                
                <div>
                  <p className="text-sm font-medium mb-2">Course Navigation (by number):</p>
                  <ul className="text-sm space-y-1 ml-4 list-disc">
                    <li>"Course 1" - Human–Computer Interaction</li>
                    <li>"Course 2" - Organization of Computer Networks</li>
                    <li>"Course 3" - Python Programming</li>
                    <li>"Course 4" - Computer Architecture</li>
                    <li>"Course 5" - Introduction to Information Security</li>
                    <li>"Course 6" - Society, Ethics and Technology</li>
                    <li>"Course 7" - Fundamentals of Web Technologies</li>
                    <li>"Course 8" - Statistical Models (SPSS)</li>
                    <li>"Course 9" - Distributed Database Systems</li>
                    <li>"Course 10" - Discrete Mathematics</li>
                  </ul>
                </div>
                
                <div>
                  <p className="text-sm font-medium mb-2">Accessibility Commands:</p>
                  <ul className="text-sm space-y-1 ml-4 list-disc">
                    <li>"Dark mode" / "Light mode" - Toggle theme</li>
                    <li>"Increase font" / "Decrease font" - Adjust text size</li>
                    <li>"High contrast" - Toggle high contrast mode</li>
                    <li>"Scroll up" / "Scroll down" - Navigate page</li>
                  </ul>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <BookOpen className="w-5 h-5" />
                  Getting Started
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <p className="text-sm">First time here? Check these out:</p>
                <ul className="text-sm space-y-1 ml-4 list-disc">
                  <li>Visit the Dashboard to see your courses</li>
                  <li>Click on a course to view details</li>
                  <li>Use the accessibility toolbar to customize your experience</li>
                  <li>Check Grades to track your performance</li>
                  <li>Review Messages for course announcements</li>
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <HelpCircle className="w-5 h-5" />
                  Support
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm">For additional help, contact:</p>
                <p className="text-sm font-medium mt-2">GTU Learning Support</p>
                <p className="text-sm text-muted-foreground flex items-center gap-2">
                  <a
                    href="mailto:support@gtu.ge"
                    className="underline text-primary"
                    aria-label="Email GTU Learning Support"
                  >
                    support@gtu.ge
                  </a>
                  <button
                    type="button"
                    className="ml-2 px-2 py-1 text-sm rounded-md bg-muted text-muted-foreground"
                    onClick={async () => {
                      try {
                        await navigator.clipboard.writeText('support@gtu.ge');
                        setLiveMessage('Support email copied to clipboard.');
                        setTimeout(() => setLiveMessage(''), 4000);
                      } catch (e) {
                        setLiveMessage('Could not copy email to clipboard.');
                        setTimeout(() => setLiveMessage(''), 4000);
                      }
                    }}
                  >
                    Copy email
                  </button>
                </p>
                <p className="text-sm text-muted-foreground">Available Monday-Friday, 9AM-5PM</p>
                <div aria-live="polite" aria-atomic="true" className="sr-only" role="status">
                  {liveMessage}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
}
