import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Volume2, MoreVertical, Mic } from "lucide-react";
import { useState, useRef } from "react";
import { useLocation } from "wouter";
import { useAccessibility } from "@/contexts/AccessibilityContext";
import { useScreenReader } from "@/hooks/use-screen-reader";
import type { Course } from "@shared/schema";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface CourseCardProps {
  course: Course;
  courseNumber?: number;
}

// Map course IDs to voice command numbers (matches mockData.ts)
const courseNumberMap: Record<string, number> = {
  "2025-2026(F)-10769": 1,  // Human–Computer Interaction
  "2025-2026(F)-10785": 2,  // Organization of Computer Networks
  "2025-2026(F)-10780": 3,  // Python Programming
  "2025-2026(F)-10768": 4,  // Computer Architecture
  "2025-2026(F)-10783": 5,  // Introduction to Information Security
  "2025-2026(F)-10799": 6,  // Society, Ethics and Technology
  "26-10781": 7,            // Fundamentals of Web Technologies
  "26-10782": 8,            // Statistical Models and Simulation (SPSS)
  "26-10786": 9,            // Distributed Database Systems
  "26-5737": 10,            // Discrete Mathematics
};

const colorBorders = {
  blue: "border-t-blue-600 dark:border-t-blue-500",
  purple: "border-t-purple-600 dark:border-t-purple-500",
  green: "border-t-green-600 dark:border-t-green-500",
  orange: "border-t-orange-600 dark:border-t-orange-500",
  pink: "border-t-pink-600 dark:border-t-pink-500",
  teal: "border-t-teal-600 dark:border-t-teal-500",
  cyan: "border-t-cyan-600 dark:border-t-cyan-500",
  gray: "border-t-gray-600 dark:border-t-gray-500",
};

export function CourseCard({ course, courseNumber }: CourseCardProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [showText, setShowText] = useState(false);
  const [, setLocation] = useLocation();
  const { language, screenReaderEnabled, voiceCommandsActive } = useAccessibility();
  const { speak, cancel } = useScreenReader();
  const cardRef = useRef<HTMLDivElement>(null);

  // Get course number from prop or map
  const voiceNumber = courseNumber || courseNumberMap[course.id];

  const title = language === "ka" ? course.titleKa : course.titleEn;
  const teacher = language === "ka" ? course.teacherKa : course.teacherEn;
  const courseDescription = `${
    language === "ka" ? "კურსი" : "Course"
  }: ${title}. ${language === "ka" ? "მასწავლებელი" : "Teacher"}: ${teacher}.`;

  const handleScreenReaderSimulation = () => {
    if (isPlaying) {
      cancel();
      setIsPlaying(false);
      setShowText(false);
    } else {
      setIsPlaying(true);
      setShowText(true);
      speak(courseDescription);
      setTimeout(() => {
        setIsPlaying(false);
        setShowText(false);
      }, 3000);
    }
  };

  const handleMouseEnter = () => {
    if (screenReaderEnabled && !isPlaying) {
      setIsPlaying(true);
      speak(courseDescription);
      setTimeout(() => {
        setIsPlaying(false);
      }, 3000);
    }
  };

  const handleMouseLeave = () => {
    cancel();
    setIsPlaying(false);
  };

  const handleFocus = () => {
    if (screenReaderEnabled && !isPlaying) {
      setIsPlaying(true);
      speak(courseDescription);
      setTimeout(() => {
        setIsPlaying(false);
      }, 3000);
    }
  };

  const handleBlur = () => {
    cancel();
    setIsPlaying(false);
  };

  const borderClass =
    colorBorders[course.colorClass as keyof typeof colorBorders] ||
    colorBorders.blue;

  return (
    <Card
      ref={cardRef}
      className={`group hover-elevate transition-all duration-200 overflow-hidden cursor-pointer border-t-4 ${borderClass} bg-white dark:bg-slate-900 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-blue-600 dark:focus-visible:ring-blue-400`}
      data-testid={`card-course-${course.id}`}
      tabIndex={0}
      onClick={() => setLocation(`/course/${course.id}`)}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          setLocation(`/course/${course.id}`);
        }
      }}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onFocus={handleFocus}
      onBlur={handleBlur}
    >
      <CardHeader className="p-0 relative">
        <div className="w-full h-40 bg-gradient-to-br from-slate-100 to-slate-200 dark:from-slate-800 dark:to-slate-700 relative flex items-center justify-center">
          <div className="text-slate-500 dark:text-slate-400 text-sm font-medium">
            {course.id}
          </div>

          {/* Voice Command Number Badge */}
          {voiceNumber && (
            <Tooltip>
              <TooltipTrigger asChild>
                <div 
                  className="absolute top-3 left-3 flex items-center gap-1 bg-primary text-primary-foreground text-xs font-bold px-2 py-1 rounded-full shadow-md"
                  aria-label={language === "ka" 
                    ? `ხმოვანი ბრძანება: კურსი ${voiceNumber}` 
                    : `Voice command: Course ${voiceNumber}`}
                >
                  <Mic className="h-3 w-3" />
                  <span>{voiceNumber}</span>
                </div>
              </TooltipTrigger>
              <TooltipContent side="bottom">
                <p className="text-xs">
                  {language === "ka" 
                    ? `თქვით "კურსი ${voiceNumber}" გასახსნელად` 
                    : `Say "Course ${voiceNumber}" to open`}
                </p>
              </TooltipContent>
            </Tooltip>
          )}

          <Button
            variant="secondary"
            size="icon"
            className="absolute top-3 right-3 h-9 w-9 opacity-100 md:opacity-0 md:group-hover:opacity-100 transition-opacity duration-200 hover-elevate"
            onClick={(e) => {
              e.stopPropagation();
              handleScreenReaderSimulation();
            }}
            onTouchStart={(e) => {
              e.stopPropagation();
              handleScreenReaderSimulation();
            }}
            data-testid={`button-screen-reader-${course.id}`}
            aria-label={
              isPlaying
                ? "Stop screen reader simulation"
                : "Play screen reader simulation"
            }
            title={isPlaying ? "Stop reading" : "Read course info"}
          >
            <Volume2 className={`h-5 w-5 ${isPlaying ? "text-primary" : ""}`} />
          </Button>
        </div>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="ghost"
              size="icon"
              className="absolute top-3 right-3 h-8 w-8 opacity-0 group-hover:opacity-100 transition-opacity"
              data-testid={`button-course-menu-${course.id}`}
              aria-label="Course options"
            >
              <MoreVertical className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem
              onClick={(e) => {
                e.stopPropagation();
                setLocation(`/course/${course.id}`);
              }}
            >
              View course
            </DropdownMenuItem>
            <DropdownMenuItem onClick={(e) => e.stopPropagation()}>
              Unenroll
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </CardHeader>

      <CardContent className="p-5">
        {course.category && (
          <div className="mb-2">
            <span className="inline-block bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 text-xs px-2 py-1 rounded-sm font-medium">
              {course.category}
            </span>
          </div>
        )}
        <h3
          className="font-bold text-base mb-2 line-clamp-2 text-blue-900 dark:text-blue-100"
          data-testid={`text-course-title-${course.id}`}
        >
          {title}
        </h3>

        <p className="text-xs text-slate-500 dark:text-slate-400 mb-3 line-clamp-1 font-medium">
          {language === "ka" ? course.titleEn : course.titleKa}
        </p>

        <p className="text-sm text-slate-700 dark:text-slate-300 border-t border-slate-200 dark:border-slate-700 pt-3">
          <span className="font-semibold">
            {language === "ka" ? "მასწავლებელი" : "Instructor"}:
          </span>{" "}
          {teacher}
        </p>
      </CardContent>
    </Card>
  );
}
