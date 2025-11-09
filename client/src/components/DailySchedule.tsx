import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
  Clock, 
  MapPin, 
  ChevronLeft,
  ChevronRight,
  Coffee,
  CalendarDays
} from "lucide-react";
import { useAccessibility } from "@/contexts/AccessibilityContext";
import { weeklySchedule, getDayName, getDayNameKa, type ClassSession } from "@shared/mockData";
import { format, addDays, subDays, isToday } from "date-fns";
import { useLocation } from "wouter";

type ClassStatus = 'done' | 'active' | 'upcoming' | 'future';

interface ClassWithStatus extends ClassSession {
  status: ClassStatus;
  minutesUntilStart?: number;
}

// Compact type labels
const typeLabels: Record<string, { en: string; ka: string }> = {
  Lecture: { en: "Lec", ka: "ლექ" },
  Lab: { en: "Lab", ka: "ლაბ" },
  Practice: { en: "Prac", ka: "პრქ" },
  Seminar: { en: "Sem", ka: "სემ" },
};

// Type colors  
const typeColors: Record<string, string> = {
  Lecture: "bg-purple-100 text-purple-700 dark:bg-purple-900/40 dark:text-purple-300",
  Lab: "bg-blue-100 text-blue-700 dark:bg-blue-900/40 dark:text-blue-300",
  Practice: "bg-green-100 text-green-700 dark:bg-green-900/40 dark:text-green-300",
  Seminar: "bg-orange-100 text-orange-700 dark:bg-orange-900/40 dark:text-orange-300",
};

export function DailySchedule() {
  const { language } = useAccessibility();
  const [currentTime, setCurrentTime] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [, setLocation] = useLocation();

  // Update time every minute
  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 60000);
    return () => clearInterval(timer);
  }, []);

  const isTodaySelected = isToday(selectedDate);
  const dayName = getDayName(selectedDate);
  const classes = weeklySchedule[dayName] || [];

  // Navigation
  const goToPrevDay = () => setSelectedDate(subDays(selectedDate, 1));
  const goToNextDay = () => setSelectedDate(addDays(selectedDate, 1));
  const goToToday = () => setSelectedDate(new Date());

  // Calculate class statuses
  const getClassesWithStatus = (): ClassWithStatus[] => {
    if (!isTodaySelected) {
      return classes.map(cls => ({ ...cls, status: 'future' as ClassStatus }));
    }

    const currentHour = currentTime.getHours();
    const currentMinute = currentTime.getMinutes();
    const currentTimeInMinutes = currentHour * 60 + currentMinute;

    return classes.map((cls) => {
      const [startHour, startMinute] = cls.startTime.split(':').map(Number);
      const [endHour, endMinute] = cls.endTime.split(':').map(Number);
      const startTimeInMinutes = startHour * 60 + startMinute;
      const endTimeInMinutes = endHour * 60 + endMinute;

      let status: ClassStatus;
      let minutesUntilStart: number | undefined;

      if (currentTimeInMinutes >= endTimeInMinutes) {
        status = 'done';
      } else if (currentTimeInMinutes >= startTimeInMinutes && currentTimeInMinutes < endTimeInMinutes) {
        status = 'active';
      } else if (startTimeInMinutes - currentTimeInMinutes <= 60 && startTimeInMinutes > currentTimeInMinutes) {
        status = 'upcoming';
        minutesUntilStart = startTimeInMinutes - currentTimeInMinutes;
      } else {
        status = 'future';
        minutesUntilStart = startTimeInMinutes - currentTimeInMinutes;
      }

      return { ...cls, status, minutesUntilStart };
    });
  };

  const classesWithStatus = getClassesWithStatus();
  const currentTimeStr = format(currentTime, 'HH:mm');
  const dayDisplayName = language === 'ka' ? getDayNameKa(selectedDate) : format(selectedDate, 'EEE');

  return (
    <Card className="overflow-hidden">
      {/* Compact Header with Day Navigation */}
      <CardHeader className="p-3 pb-2 bg-gradient-to-r from-primary/5 to-transparent">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <CalendarDays className="h-4 w-4 text-primary" />
            <CardTitle className="text-base">
              {language === 'ka' ? 'განრიგი' : 'Schedule'}
            </CardTitle>
          </div>
          <Badge variant="outline" className="text-[10px] h-5 px-1.5">
            <Clock className="h-3 w-3 mr-0.5" />
            {currentTimeStr}
          </Badge>
        </div>
        
        {/* Day Navigation */}
        <div className="flex items-center justify-between mt-2">
          <Button variant="ghost" size="icon" className="h-7 w-7" onClick={goToPrevDay}>
            <ChevronLeft className="h-4 w-4" />
          </Button>
          
          <button onClick={goToToday} className="text-sm font-medium hover:text-primary transition-colors">
            {isTodaySelected ? (
              <span>
                {language === 'ka' ? 'დღეს' : 'Today'} 
                <span className="text-muted-foreground ml-1 font-normal">{dayDisplayName}</span>
              </span>
            ) : (
              <span>{format(selectedDate, 'MMM d')} · {dayDisplayName}</span>
            )}
          </button>
          
          <Button variant="ghost" size="icon" className="h-7 w-7" onClick={goToNextDay}>
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      </CardHeader>
      
      <CardContent className="p-2 pt-0">
        {classesWithStatus.length === 0 ? (
          <div className="text-center py-6 text-muted-foreground">
            <Coffee className="h-8 w-8 mx-auto mb-2 opacity-50" />
            <p className="text-sm">
              {language === 'ka' ? 'ლექციები არ არის 🎉' : 'No classes 🎉'}
            </p>
          </div>
        ) : (
          <div className="space-y-1 max-h-[300px] overflow-y-auto">
            {classesWithStatus.map((cls) => (
              <CompactClassCard 
                key={cls.id} 
                classData={cls} 
                language={language}
                onClick={() => setLocation('/calendar')}
              />
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
}

interface CompactClassCardProps {
  classData: ClassWithStatus;
  language: string;
  onClick: () => void;
}

function CompactClassCard({ classData, language, onClick }: CompactClassCardProps) {
  const { status, minutesUntilStart } = classData;
  const subjectName = language === 'ka' ? classData.subject.ka : classData.subject.en;
  const typeLabel = typeLabels[classData.type]?.[language as 'en' | 'ka'] || classData.type;

  // Status-based styles
  const getStyles = () => {
    switch (status) {
      case 'done':
        return { 
          card: 'opacity-50 bg-muted/20 border-l-gray-300 dark:border-l-gray-600',
          text: 'line-through text-muted-foreground'
        };
      case 'active':
        return { 
          card: 'bg-green-50 dark:bg-green-950/40 border-l-green-500 shadow-sm',
          text: ''
        };
      case 'upcoming':
        return { 
          card: 'bg-blue-50 dark:bg-blue-950/40 border-l-blue-500',
          text: ''
        };
      default:
        return { 
          card: 'bg-background border-l-gray-200 dark:border-l-gray-700',
          text: ''
        };
    }
  };

  const styles = getStyles();

  return (
    <div 
      className={`p-2 rounded-md border-l-[3px] cursor-pointer hover:shadow-sm transition-shadow ${styles.card}`}
      onClick={onClick}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          onClick();
        }
      }}
      role="button"
      tabIndex={0}
    >
      {/* Row 1: Subject + Type */}
      <div className="flex items-center justify-between gap-2 mb-1">
        <span className={`font-medium text-sm truncate ${styles.text}`} title={subjectName}>
          {subjectName}
        </span>
        <Badge className={`text-[10px] px-1.5 py-0 h-5 shrink-0 ${typeColors[classData.type]}`}>
          {typeLabel}
        </Badge>
      </div>
      
      {/* Row 2: Time, Room, Status */}
      <div className="flex items-center justify-between text-xs text-muted-foreground">
        <div className="flex items-center gap-2">
          <span className="flex items-center gap-0.5">
            <Clock className="h-3 w-3" />
            {classData.startTime}-{classData.endTime}
          </span>
          <span className="flex items-center gap-0.5 font-medium text-foreground">
            <MapPin className="h-3 w-3" />
            {classData.room}
          </span>
        </div>
        
        {/* Status indicator */}
        {status === 'active' && (
          <Badge className="bg-green-500 text-white text-[10px] px-1.5 py-0 h-5 animate-pulse">
            ● {language === 'ka' ? 'ახლა' : 'Now'}
          </Badge>
        )}
        {status === 'upcoming' && minutesUntilStart && (
          <Badge className="bg-blue-500 text-white text-[10px] px-1.5 py-0 h-5">
            {minutesUntilStart}m
          </Badge>
        )}
        {status === 'done' && (
          <span className="text-[10px]">✓</span>
        )}
      </div>
    </div>
  );
}
