// Plain TypeScript data shapes shared between the (former) API layer and the UI.
//
// The project was originally generated with Drizzle/Postgres table definitions,
// but the public demo is a static front-end with no database. These are simple
// interfaces describing the same mock data served by client/src/lib/mockApi.ts.

export interface User {
  id: string;
  username: string;
  password: string;
  fullName: string;
  email: string;
}
export type InsertUser = Omit<User, "id">;

export interface Course {
  id: string;
  titleEn: string;
  titleKa: string;
  teacherEn: string;
  teacherKa: string;
  colorClass: string;
  imagePattern: string;
  sections: string;
  category: string;
}
export type InsertCourse = Omit<Course, "id">;

export interface CalendarEvent {
  id: string;
  title: string;
  /** ISO date string (e.g. "2025-11-28"). */
  date: string;
  courseId: string | null;
}
export type InsertCalendarEvent = Omit<CalendarEvent, "id">;
