// Static in-memory API for the server-less demo build.
//
// The original project used an Express server (server/storage.ts) to serve
// /api/courses, /api/calendar/events and /api/auth/login from in-memory mock
// data. For the public, server-less GitHub Pages demo we keep the exact same
// data and response shapes here and resolve them on the client — no backend or
// database is required. All data below is mock/fabricated for demonstration.

import type { Course, CalendarEvent, User } from "@shared/schema";
import { currentUser } from "@shared/mockData";

// The single demo account. Credentials are fake.
const demoUser: User = {
  id: currentUser.id,
  username: currentUser.username,
  password: "password",
  fullName: currentUser.name.en,
  email: currentUser.email,
};

const mockCourses: Course[] = [
  {
    id: "2025-2026(F)-10769",
    titleEn: "Human–Computer Interaction",
    titleKa: "ადამიანი–კომპიუტერის ინტერაქცია",
    teacherEn: "Gocha Dalakishvili",
    teacherKa: "დალაქიშვილი გოჩა",
    colorClass: "blue",
    imagePattern: "gradient",
    category: "08-ბაკალავრი 2025-2026",
    sections: JSON.stringify([
      { titleEn: "General", titleKa: "ზოგადი", contentEn: "General course information and announcements.", contentKa: "ზოგადი კურსის ინფორმაცია და განცხადებები." },
      { titleEn: "Syllabus and Literature", titleKa: "სილაბუსი და ლიტერატურა", contentEn: "Syllabus and Course Materials (PDFs).", contentKa: "სილაბუსი და კურსის მასალები (PDFs)." },
      { titleEn: "Week 1", titleKa: "სასწავლო კვირა 1", contentEn: "Introduction to HCI. Lecture: HCI Fundamentals. Assignment: Read Chapter 1.", contentKa: "HCI-ის შესავალი. ლექცია: HCI საფუძვლები. დავალება: წაიკითხეთ თავი 1." },
      { titleEn: "Week 2", titleKa: "სასწავლო კვირა 2", contentEn: "User Research Methods. Lecture: Usability Testing. Assignment: Design user persona.", contentKa: "მომხმარებლის კვლევის მეთოდები. ლექცია: გამოსაყენებლობის ტესტირება. დავალება: შექმენით მომხმარებლის პერსონა." },
    ]),
  },
  {
    id: "2025-2026(F)-10785",
    titleEn: "Organization of Computer Networks",
    titleKa: "კომპიუტერული ქსელების ორგანიზაცია",
    teacherEn: "Ergun Hakan",
    teacherKa: "ერგუნ ჰაქან",
    colorClass: "purple",
    imagePattern: "gradient",
    category: "08-ბაკალავრი 2025-2026",
    sections: JSON.stringify([
      { titleEn: "General", titleKa: "ზოგადი", contentEn: "General course information and announcements.", contentKa: "ზოგადი კურსის ინფორმაცია და განცხადებები." },
      { titleEn: "Syllabus and Literature", titleKa: "სილაბუსი და ლიტერატურა", contentEn: "Syllabus and Course Materials (PDFs).", contentKa: "სილაბუსი და კურსის მასალები (PDFs)." },
      { titleEn: "Week 1", titleKa: "სასწავლო კვირა 1", contentEn: "Network Basics. Lecture: ISO/OSI Model. Assignment: Week 1 Assignment", contentKa: "ქსელის საფუძვლები. ლექცია: ISO/OSI მოდელი. დავალება: კვირა 1 დავალება" },
      { titleEn: "Week 2", titleKa: "სასწავლო კვირა 2", contentEn: "Network Topology. Lecture: LAN and WAN. Assignment: Week 2 Assignment", contentKa: "ქსელის ტოპოლოგია. ლექცია: LAN და WAN. დავალება: კვირა 2 დავალება" },
    ]),
  },
  {
    id: "2025-2026(F)-10780",
    titleEn: "Python Programming",
    titleKa: "პითონზე პროგრამირება",
    teacherEn: "Tornike Jafaridze",
    teacherKa: "ჯაფარიძე თორნიკე",
    colorClass: "green",
    imagePattern: "gradient",
    category: "08-ბაკალავრი 2025-2026",
    sections: JSON.stringify([
      { titleEn: "General", titleKa: "ზოგადი", contentEn: "General course information and announcements.", contentKa: "ზოგადი კურსის ინფორმაცია და განცხადებები." },
      { titleEn: "Syllabus and Literature", titleKa: "სილაბუსი და ლიტერატურა", contentEn: "Syllabus and Course Materials (PDFs).", contentKa: "სილაბუსი და კურსის მასალები (PDFs)." },
      { titleEn: "Week 1", titleKa: "სასწავლო კვირა 1", contentEn: "Python Basics. Lecture: Variables and Data Types. Assignment: Hello World Program", contentKa: "Python საფუძვლები. ლექცია: ცვლადები და მონაცემის ტიპები. დავალება: Hello World პროგრამა" },
      { titleEn: "Week 2", titleKa: "სასწავლო კვირა 2", contentEn: "Control Flow. Lecture: If-Else and Loops. Assignment: Write a calculator program", contentKa: "კონტროლის ნაკადი. ლექცია: If-Else და ციკლები. დავალება: დაწერეთ კალკულატორის პროგრამა" },
    ]),
  },
  {
    id: "2025-2026(F)-10768",
    titleEn: "Computer Architecture",
    titleKa: "კომპიუტერული არქიტექტურა",
    teacherEn: "Guram Acharadze",
    teacherKa: "აჭარაძე გურამ",
    colorClass: "orange",
    imagePattern: "gradient",
    category: "08-ბაკალავრი 2025-2026",
    sections: JSON.stringify([
      { titleEn: "General", titleKa: "ზოგადი", contentEn: "General course information and announcements.", contentKa: "ზოგადი კურსის ინფორმაცია და განცხადებები." },
      { titleEn: "Syllabus and Literature", titleKa: "სილაბუსი და ლიტერატურა", contentEn: "Syllabus and Course Materials (PDFs).", contentKa: "სილაბუსი და კურსის მასალები (PDFs)." },
      { titleEn: "Week 1", titleKa: "სასწავლო კვირა 1", contentEn: "Computer Organization. Lecture: CPU Design. Assignment: Study processor architecture", contentKa: "კომპიუტერის ორგანიზაცია. ლექცია: CPU დიზაინი. დავალება: შეისწავლეთ პროცესორის არქიტექტურა" },
    ]),
  },
  {
    id: "2025-2026(F)-10783",
    titleEn: "Introduction to Information Security",
    titleKa: "შესავალი ინფორმაციული უსაფრთხოებაში",
    teacherEn: "Avtandil Bichnigauri",
    teacherKa: "ბიჩნიგაური ავთანდილი",
    colorClass: "pink",
    imagePattern: "gradient",
    category: "08-ბაკალავრი 2025-2026",
    sections: JSON.stringify([
      { titleEn: "General", titleKa: "ზოგადი", contentEn: "General course information and announcements.", contentKa: "ზოგადი კურსის ინფორმაცია და განცხადებები." },
      { titleEn: "Syllabus and Literature", titleKa: "სილაბუსი და ლიტერატურა", contentEn: "Syllabus and Course Materials (PDFs).", contentKa: "სილაბუსი და კურსის მასალები (PDFs)." },
      { titleEn: "Week 1", titleKa: "სასწავლო კვირა 1", contentEn: "Security Basics. Lecture: Threats and Vulnerabilities. Assignment: Identify security risks", contentKa: "უსაფრთხოების საფუძვლები. ლექცია: სახიფათო და სისუსტეები. დავალება: გამოიცნოთ უსაფრთხოების რისკები" },
    ]),
  },
  {
    id: "2025-2026(F)-10799",
    titleEn: "Society, Ethics and Technology",
    titleKa: "საზოგადოება, ეთიკა და ტექნოლოგიები",
    teacherEn: "Ketevan Mdzebluri",
    teacherKa: "მძელური ქეთევან",
    colorClass: "teal",
    imagePattern: "gradient",
    category: "08-ბაკალავრი 2025-2026",
    sections: JSON.stringify([
      { titleEn: "General", titleKa: "ზოგადი", contentEn: "General course information and announcements.", contentKa: "ზოგადი კურსის ინფორმაცია და განცხადებები." },
      { titleEn: "Syllabus and Literature", titleKa: "სილაბუსი და ლიტერატურა", contentEn: "Syllabus and Course Materials (PDFs).", contentKa: "სილაბუსი და კურსის მასალები (PDFs)." },
    ]),
  },
  {
    id: "26-10553",
    titleEn: "Introduction to Computer Networks",
    titleKa: "შესავალი კომპიუტერულ ქსელებში",
    teacherEn: "Guram Acharadze",
    teacherKa: "აჭარაძე გურამ",
    colorClass: "cyan",
    imagePattern: "gradient",
    category: "08-ბაკალავრი 2025-2026",
    sections: JSON.stringify([
      { titleEn: "General", titleKa: "ზოგადი", contentEn: "General course information and announcements.", contentKa: "ზოგადი კურსის ინფორმაცია და განცხადებები." },
      { titleEn: "Syllabus and Literature", titleKa: "სილაბუსი და ლიტერატურა", contentEn: "Syllabus and Course Materials (PDFs).", contentKa: "სილაბუსი და კურსის მასალები (PDFs)." },
    ]),
  },
  {
    id: "26-10781",
    titleEn: "Fundamentals of Web Technologies",
    titleKa: "ვებ ტექნოლოგიების საფუძვლები",
    teacherEn: "Aleksandre Khandolishvili",
    teacherKa: "ხანდოლიშვილი ალექსანდრე",
    colorClass: "blue",
    imagePattern: "gradient",
    category: "08-ბაკალავრი 2025-2026",
    sections: JSON.stringify([
      { titleEn: "General", titleKa: "ზოგადი", contentEn: "General course information and announcements.", contentKa: "ზოგადი კურსის ინფორმაცია და განცხადებები." },
      { titleEn: "Syllabus and Literature", titleKa: "სილაბუსი და ლიტერატურა", contentEn: "Syllabus and Course Materials (PDFs).", contentKa: "სილაბუსი და კურსის მასალები (PDFs)." },
      { titleEn: "Week 1", titleKa: "სასწავლო კვირა 1", contentEn: "Web Basics. Lecture: HTML and CSS. Assignment: Create a simple webpage", contentKa: "ვების საფუძვლები. ლექცია: HTML და CSS. დავალება: შექმენით მარტივი ვებ-გვერდი" },
    ]),
  },
  {
    id: "26-10782",
    titleEn: "Statistical Models and Simulation (SPSS)",
    titleKa: "სტატისტიკური მოდელები და იმიტაცია (SPSS)",
    teacherEn: "Vazha Tarieladze",
    teacherKa: "ტარიელაძე ვაჟა",
    colorClass: "purple",
    imagePattern: "gradient",
    category: "08-ბაკალავრი 2025-2026",
    sections: JSON.stringify([
      { titleEn: "General", titleKa: "ზოგადი", contentEn: "General course information and announcements.", contentKa: "ზოგადი კურსის ინფორმაცია და განცხადებები." },
      { titleEn: "Syllabus and Literature", titleKa: "სილაბუსი და ლიტერატურა", contentEn: "Syllabus and Course Materials (PDFs).", contentKa: "სილაბუსი და კურსის მასალები (PDFs)." },
    ]),
  },
  {
    id: "26-10786",
    titleEn: "Distributed Database Systems",
    titleKa: "განაწილებული მონაცემთა ბაზების სისტემები",
    teacherEn: "Badri Mepharishvili",
    teacherKa: "მეფარიშვილი ბადრი",
    colorClass: "green",
    imagePattern: "gradient",
    category: "08-ბაკალავრი 2025-2026",
    sections: JSON.stringify([
      { titleEn: "General", titleKa: "ზოგადი", contentEn: "General course information and announcements.", contentKa: "ზოგადი კურსის ინფორმაცია და განცხადებები." },
      { titleEn: "Syllabus and Literature", titleKa: "სილაბუსი და ლიტერატურა", contentEn: "Syllabus and Course Materials (PDFs).", contentKa: "სილაბუსი და კურსის მასალები (PDFs)." },
    ]),
  },
  {
    id: "26-5737",
    titleEn: "Discrete Mathematics",
    titleKa: "დისკრეტული მათემატიკა",
    teacherEn: "Aleksandre Klimiashvili",
    teacherKa: "კლიმიაშვილი ალექსანდრე",
    colorClass: "orange",
    imagePattern: "gradient",
    category: "08-ბაკალავრი 2025-2026",
    sections: JSON.stringify([
      { titleEn: "General", titleKa: "ზოგადი", contentEn: "General course information and announcements.", contentKa: "ზოგადი კურსის ინფორმაცია და განცხადებები." },
      { titleEn: "Syllabus and Literature", titleKa: "სილაბუსი და ლიტერატურა", contentEn: "Syllabus and Course Materials (PDFs).", contentKa: "სილაბუსი და კურსის მასალები (PDFs)." },
    ]),
  },
];

// Calendar events use ISO date strings (the demo build has no server to
// JSON-serialize Date objects).
const mockCalendarEvents: CalendarEvent[] = [
  { id: "evt-1", title: "HCI Assignment Deadline", date: "2025-11-28", courseId: "2025-2026(F)-10769" },
  { id: "evt-2", title: "Networks Midterm Exam", date: "2025-11-30", courseId: "2025-2026(F)-10785" },
  { id: "evt-3", title: "Python Project Submission", date: "2025-12-05", courseId: "2025-2026(F)-10780" },
  { id: "evt-4", title: "Security Quiz", date: "2025-12-10", courseId: "2025-2026(F)-10783" },
  { id: "evt-5", title: "Web Tech Final Project", date: "2025-12-15", courseId: "26-10781" },
];

/**
 * Demo login. This is a static front-end demo, so any non-empty username and
 * password are accepted and resolve to the single demo account.
 */
export async function loginUser(
  username: string,
  password: string,
): Promise<Omit<User, "password">> {
  if (!username || !password) {
    throw new Error("401: Invalid credentials");
  }
  const { password: _password, ...userWithoutPassword } = demoUser;
  return userWithoutPassword;
}

const routes: Record<string, () => unknown> = {
  "/api/courses": () => mockCourses,
  "/api/calendar/events": () => mockCalendarEvents,
};

/**
 * Resolve a former "/api/..." query key against the in-memory mock data.
 * Returns a deep clone so callers cannot mutate the source (mirrors how a real
 * JSON HTTP response would behave).
 */
export async function resolveApi<T = unknown>(path: string): Promise<T> {
  const handler = routes[path];
  if (!handler) {
    throw new Error(`404: No mock data registered for "${path}"`);
  }
  return JSON.parse(JSON.stringify(handler())) as T;
}
