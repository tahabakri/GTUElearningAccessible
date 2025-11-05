import { useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { useToast } from "@/hooks/use-toast";
import { useLocation } from "wouter";
import gtuLogo from "@/assets/gtu-logo.svg";

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { login } = useAuth();
  const { toast } = useToast();
  const [, setLocation] = useLocation();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      await login(username, password);
      toast({
        title: "Login successful",
        description: "Welcome to GTU eLearning",
      });
      setLocation("/dashboard");
    } catch (error) {
      toast({
        title: "Login failed",
        description:
          "Your username or password is incorrect. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/10 via-background to-accent/10 flex items-center justify-center p-4">
      <div className="w-full max-w-6xl">
        <div className="mb-8 text-center flex flex-col items-center">
          <div className="w-20 h-20 mb-4 bg-white rounded-xl shadow-sm flex items-center justify-center p-2">
            <img
              src={gtuLogo}
              alt="GTU Logo"
              className="w-full h-full object-contain"
            />
          </div>
          <h1 className="text-2xl font-bold text-foreground mb-2">
            საქართველოს ტექნიკური უნივერსიტეტი
          </h1>
          <p className="text-sm text-muted-foreground">
            GEORGIAN TECHNICAL UNIVERSITY
          </p>
          <p className="text-lg font-semibold text-primary mt-2">
            უმაღლესი სასწავლო სისტემა / LMS
          </p>
        </div>

        {/* Back to Portal Link - User Control and Freedom */}
        <div className="max-w-md mx-auto mb-4">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setLocation("/")}
            className="gap-2 text-muted-foreground hover:text-foreground"
            data-testid="button-back-to-portal"
          >
            ← {/* Back arrow */}
            Back to Portal
          </Button>
        </div>

        <Card className="max-w-md mx-auto">
          <CardHeader className="text-center bg-primary/5 border-b">
            <CardTitle>საქართველოს ტექნიკური უნივერსიტეტი</CardTitle>
            <CardDescription>GEORGIAN TECHNICAL UNIVERSITY</CardDescription>
          </CardHeader>

          <CardContent className="pt-6">
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="username">Username</Label>
                <Input
                  id="username"
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="demo.student"
                  required
                  data-testid="input-username"
                  aria-label="Username"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="password"
                  required
                  data-testid="input-password"
                  aria-label="Password"
                />
              </div>

              <div className="bg-blue-50 dark:bg-blue-950 border border-blue-200 dark:border-blue-800 rounded p-3 text-sm">
                <p className="font-semibold text-blue-900 dark:text-blue-100 mb-2">
                  Demo Credentials:
                </p>
                <p className="text-blue-800 dark:text-blue-200">
                  <span className="font-mono bg-white dark:bg-slate-900 px-2 py-1 rounded">
                    demo.student
                  </span>{" "}
                  /{" "}
                  <span className="font-mono bg-white dark:bg-slate-900 px-2 py-1 rounded">
                    password
                  </span>
                </p>
              </div>

              <div className="flex items-center space-x-2">
                <Checkbox
                  id="remember"
                  checked={rememberMe}
                  onCheckedChange={(checked) =>
                    setRememberMe(checked as boolean)
                  }
                  data-testid="checkbox-remember"
                />
                <Label
                  htmlFor="remember"
                  className="text-sm font-normal cursor-pointer"
                >
                  Remember username
                </Label>
              </div>

              <Button
                type="submit"
                className="w-full h-12 text-lg font-bold bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary/70 shadow-lg hover:shadow-xl transition-all duration-200 hover:scale-[1.02]"
                disabled={isLoading}
                data-testid="button-login"
              >
                {isLoading ? "Logging in..." : "Log In to E-Learning"}
              </Button>

              <div className="text-center space-y-2">
                <Button
                  type="button"
                  variant="link"
                  className="text-sm"
                  data-testid="button-forgot-password"
                >
                  Forgotten your username or password?
                </Button>
              </div>
            </form>

            <div className="mt-6 pt-6 border-t">
              <p className="text-sm text-muted-foreground mb-3">
                Cookies must be enabled in your browser
              </p>
              <p className="text-sm text-muted-foreground mb-3">
                Some courses may allow guest access
              </p>
              <Button
                variant="outline"
                className="w-full"
                data-testid="button-guest-login"
              >
                Log in as a guest
              </Button>
            </div>
          </CardContent>
        </Card>

        <footer className="mt-8 text-center text-sm text-muted-foreground">
          <p>
            საქართველოს ტექნიკური უნივერსიტეტი © 2023. ყველა უფლება დაცულია.
          </p>
        </footer>
      </div>
    </div>
  );
}
