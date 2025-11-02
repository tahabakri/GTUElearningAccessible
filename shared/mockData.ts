
export interface Translation {
  en: string;
  ka: string;
}

export interface Week {
  id: number;
  isCompleted: boolean;
  isCurrent?: boolean;
  title: Translation;
  assignment?: string;
  type?: string;
}

export interface Course {
  id: string;
  category: string;
  title: Translation;
  instructor: Translation;
  progress: number;
  weeks: Week[];
}

// Fictional demo student. All data in this project is mock/fabricated —
// it does not represent any real student account.
export const currentUser = {
  name: {
    en: "Demo Student",
    ka: "დემო სტუდენტი"
  },
  id: "DEMO-001",
  username: "demo.student",
  email: "demo.student@elearning.example",
  initials: "DS",
  avatar: "/images/avatar-placeholder.png"
};

export const courses: Course[] = [
  // --- 1. Human-Computer Interaction ---
  {
    id: "2025-2026(F)-10769",
    category: "08-ბაკალავრი 2025-2026",
    title: { en: "Human–Computer Interaction", ka: "ადამიანი–კომპიუტერის ინტერაქცია" },
    instructor: { en: "Gocha Dalakishvili", ka: "გოჩა დალაქიშვილი" },
    progress: 35, // Percentage for the progress bar
    weeks: [
      { id: 1, isCompleted: true, title: { en: "Introduction to HCI", ka: "შესავალი HCI-ში" } },
      { id: 2, isCompleted: true, title: { en: "Usability Principles", ka: "გამოყენებადობის პრინციპები" } },
      { id: 3, isCompleted: true, title: { en: "User Research Methods", ka: "მომხმარებლის კვლევა" } },
      { id: 4, isCompleted: false, isCurrent: true, title: { en: "Design Prototyping", ka: "დიზაინის პროტოტიპირება" }, assignment: "Wireframe Task" },
      { id: 5, isCompleted: false, title: { en: "Cognitive Psychology", ka: "კოგნიტური ფსიქოლოგია" } },
      { id: 6, isCompleted: false, title: { en: "Evaluation Techniques", ka: "შეფასების ტექნიკა" } },
      { id: 7, isCompleted: false, title: { en: "Universal Design", ka: "უნივერსალური დიზაინი" } },
      { id: 8, isCompleted: false, title: { en: "Midterm Exam", ka: "შუალედური გამოცდა" }, type: "exam" },
      { id: 9, isCompleted: false, title: { en: "Mobile HCI", ka: "მობილური HCI" } },
      { id: 10, isCompleted: false, title: { en: "Voice & Gestures", ka: "ხმა და ჟესტები" } }
    ]
  },

  // --- 2. Organization of Computer Networks ---
  {
    id: "2025-2026(F)-10785",
    category: "08-ბაკალავრი 2025-2026",
    title: { en: "Organization of Computer Networks", ka: "კომპიუტერული ქსელების ორგანიზაცია" },
    instructor: { en: "Ergun Hakan", ka: "ერგუნ ჰაქან" },
    progress: 40,
    weeks: [
      { id: 1, isCompleted: true, title: { en: "Intro to Networks & OSI", ka: "ქსელების შესავალი და OSI" } },
      { id: 2, isCompleted: true, title: { en: "Physical Layer", ka: "ფიზიკური დონე" } },
      { id: 3, isCompleted: true, title: { en: "Data Link Layer", ka: "მონაცემთა არხის დონე" } },
      { id: 4, isCompleted: true, title: { en: "IP Addressing", ka: "IP მისამართები" } },
      { id: 5, isCompleted: false, isCurrent: true, title: { en: "Subnetting", ka: "ქვექსელები" }, assignment: "Subnet Calc" },
      { id: 6, isCompleted: false, title: { en: "Routing Protocols", ka: "მარშრუტიზაციის პროტოკოლები" } },
      { id: 7, isCompleted: false, title: { en: "Transport Layer (TCP/UDP)", ka: "სატრანსპორტო დონე" } },
      { id: 8, isCompleted: false, title: { en: "Midterm Exam", ka: "შუალედური გამოცდა" }, type: "exam" },
      { id: 9, isCompleted: false, title: { en: "Application Layer", ka: "გამოყენებითი დონე" } },
      { id: 10, isCompleted: false, title: { en: "Network Security", ka: "ქსელის უსაფრთხოება" } }
    ]
  },

  // --- 3. Python Programming ---
  {
    id: "2025-2026(F)-10780",
    category: "08-ბაკალავრი 2025-2026",
    title: { en: "Python Programming", ka: "პითონზე პროგრამირება" },
    instructor: { en: "Tornike Jafaridze", ka: "თორნიკე ჯაფარიძე" },
    progress: 20,
    weeks: [
      { id: 1, isCompleted: true, title: { en: "Variables & Data Types", ka: "ცვლადები და მონაცემთა ტიპები" } },
      { id: 2, isCompleted: true, title: { en: "Control Flow (If/Else)", ka: "მართვის სტრუქტურები" } },
      { id: 3, isCompleted: false, isCurrent: true, title: { en: "Loops & Iterations", ka: "ციკლები" }, assignment: "Loop Lab" },
      { id: 4, isCompleted: false, title: { en: "Functions", ka: "ფუნქციები" } },
      { id: 5, isCompleted: false, title: { en: "Lists & Dictionaries", ka: "სიები და ლექსიკონები" } },
      { id: 6, isCompleted: false, title: { en: "File Handling", ka: "ფაილებთან მუშაობა" } },
      { id: 7, isCompleted: false, title: { en: "OOP Basics", ka: "OOP საფუძვლები" } },
      { id: 8, isCompleted: false, title: { en: "Midterm Exam", ka: "შუალედური გამოცდა" }, type: "exam" },
      { id: 9, isCompleted: false, title: { en: "Modules & Packages", ka: "მოდულები და პაკეტები" } },
      { id: 10, isCompleted: false, title: { en: "Data Visualization", ka: "მონაცემთა ვიზუალიზაცია" } }
    ]
  },

  // --- 4. Computer Architecture ---
  {
    id: "2025-2026(F)-10768",
    category: "08-ბაკალავრი 2025-2026",
    title: { en: "Computer Architecture", ka: "კომპიუტერული არქიტექტურა" },
    instructor: { en: "Guram Acharadze", ka: "გურამ აჭარაძე" },
    progress: 30,
    weeks: [
      { id: 1, isCompleted: true, title: { en: "Digital Logic", ka: "ციფრული ლოგიკა" } },
      { id: 2, isCompleted: true, title: { en: "Boolean Algebra", ka: "ბულის ალგებრა" } },
      { id: 3, isCompleted: true, title: { en: "Instruction Sets", ka: "ბრძანებათა სისტემები" } },
      { id: 4, isCompleted: false, isCurrent: true, title: { en: "CPU Design", ka: "CPU დიზაინი" } },
      { id: 5, isCompleted: false, title: { en: "Memory Hierarchy", ka: "მეხსიერების იერარქია" } },
      { id: 6, isCompleted: false, title: { en: "Assembly Language", ka: "ასემბლერი" } },
      { id: 7, isCompleted: false, title: { en: "I/O Systems", ka: "I/O სისტემები" } },
      { id: 8, isCompleted: false, title: { en: "Midterm Exam", ka: "შუალედური გამოცდა" }, type: "exam" },
      { id: 9, isCompleted: false, title: { en: "Pipelining", ka: "კონვეიერიზაცია" } },
      { id: 10, isCompleted: false, title: { en: "Parallel Processing", ka: "პარალელური დამუშავება" } }
    ]
  },

  // --- 5. Introduction to Information Security ---
  {
    id: "2025-2026(F)-10783",
    category: "08-ბაკალავრი 2025-2026",
    title: { en: "Introduction to Information Security", ka: "შესავალი ინფორმაციული უსაფრთხოებაში" },
    instructor: { en: "Avtandil Bichnigauri", ka: "ავთანდილ ბიჩნიგაური" },
    progress: 10,
    weeks: [
      { id: 1, isCompleted: true, title: { en: "CIA Triad", ka: "CIA ტრიადა" } },
      { id: 2, isCompleted: false, isCurrent: true, title: { en: "Cryptography Basics", ka: "კრიპტოგრაფიის საფუძვლები" } },
      { id: 3, isCompleted: false, title: { en: "Authentication Methods", ka: "ავთენტიფიკაციის მეთოდები" } },
      { id: 4, isCompleted: false, title: { en: "Access Control", ka: "წვდომის კონტროლი" } },
      { id: 5, isCompleted: false, title: { en: "Network Security", ka: "ქსელის უსაფრთხოება" } },
      { id: 6, isCompleted: false, title: { en: "Malware & Threats", ka: "მავნე პროგრამები" } },
      { id: 7, isCompleted: false, title: { en: "Risk Management", ka: "რისკების მართვა" } },
      { id: 8, isCompleted: false, title: { en: "Midterm Exam", ka: "შუალედური გამოცდა" }, type: "exam" },
      { id: 9, isCompleted: false, title: { en: "Web Security", ka: "ვებ უსაფრთხოება" } },
      { id: 10, isCompleted: false, title: { en: "Ethical Hacking Intro", ka: "ეთიკური ჰაკინგის შესავალი" } }
    ]
  },

  // --- 6. Society, Ethics and Technology ---
  {
    id: "2025-2026(F)-10799",
    category: "08-ბაკალავრი 2025-2026",
    title: { en: "Society, Ethics and Technology", ka: "საზოგადოება, ეთიკა და ტექნოლოგიები" },
    instructor: { en: "Ketevan Mdzebluri", ka: "ქეთევან ძებნიაური" },
    progress: 60,
    weeks: [
      { id: 1, isCompleted: true, title: { en: "Intro to Cyber Ethics", ka: "კიბერ ეთიკის შესავალი" } },
      { id: 2, isCompleted: true, title: { en: "Privacy in Digital Age", ka: "კონფიდენციალურობა" } },
      { id: 3, isCompleted: true, title: { en: "Intellectual Property", ka: "ინტელექტუალური საკუთრება" } },
      { id: 4, isCompleted: true, title: { en: "Cybercrime Laws", ka: "კიბერდანაშაულის კანონები" } },
      { id: 5, isCompleted: true, title: { en: "AI Ethics", ka: "ხელოვნური ინტელექტის ეთიკა" } },
      { id: 6, isCompleted: true, title: { en: "Social Media Impact", ka: "სოციალური მედიის გავლენა" } },
      { id: 7, isCompleted: false, isCurrent: true, title: { en: "Professional Responsibility", ka: "პროფესიული პასუხისმგებლობა" } },
      { id: 8, isCompleted: false, title: { en: "Midterm Exam", ka: "შუალედური გამოცდა" }, type: "exam" },
      { id: 9, isCompleted: false, title: { en: "Globalization & Tech", ka: "გლობალიზაცია და ტექნოლოგია" } },
      { id: 10, isCompleted: false, title: { en: "Future Trends", ka: "მომავლის ტენდენციები" } }
    ]
  },

  // --- 7. Fundamentals of Web Technologies ---
  {
    id: "26-10781",
    category: "08-ბაკალავრი 2025",
    title: { en: "Fundamentals of Web Technologies", ka: "ვებ ტექნოლოგიების საფუძვლები" },
    instructor: { en: "Aleksandre Khandolishvili", ka: "ალექსანდრე ხანდოლიშვილი" },
    progress: 25,
    weeks: [
      { id: 1, isCompleted: true, title: { en: "How the Web Works", ka: "როგორ მუშაობს ვები" } },
      { id: 2, isCompleted: true, title: { en: "HTML Basics", ka: "HTML საფუძვლები" } },
      { id: 3, isCompleted: false, isCurrent: true, title: { en: "CSS Styling", ka: "CSS სტილები" } },
      { id: 4, isCompleted: false, title: { en: "CSS Flexbox & Grid", ka: "CSS Flexbox და Grid" } },
      { id: 5, isCompleted: false, title: { en: "Responsive Design", ka: "რესპონსიული დიზაინი" } },
      { id: 6, isCompleted: false, title: { en: "JavaScript Basics", ka: "JavaScript საფუძვლები" } },
      { id: 7, isCompleted: false, title: { en: "DOM Manipulation", ka: "DOM მანიპულაცია" } },
      { id: 8, isCompleted: false, title: { en: "Midterm Exam", ka: "შუალედური გამოცდა" }, type: "exam" },
      { id: 9, isCompleted: false, title: { en: "Web APIs", ka: "Web API-ები" } },
      { id: 10, isCompleted: false, title: { en: "Intro to React", ka: "შესავალი React-ში" } }
    ]
  },

  // --- 8. Statistical Models (SPSS) ---
  {
    id: "26-10782",
    category: "08-ბაკალავრი 2025",
    title: { en: "Statistical Models and Simulation (SPSS)", ka: "სტატისტიკური მოდელები და იმიტაცია (SPSS)" },
    instructor: { en: "Vazha Tarieladze", ka: "ვაჟა ტარიელაძე" },
    progress: 15,
    weeks: [
      { id: 1, isCompleted: true, title: { en: "Intro to SPSS", ka: "შესავალი SPSS-ში" } },
      { id: 2, isCompleted: false, isCurrent: true, title: { en: "Data Entry & Cleaning", ka: "მონაცემთა შეყვანა და გასუფთავება" } },
      { id: 3, isCompleted: false, title: { en: "Descriptive Statistics", ka: "აღწერილობითი სტატისტიკა" } },
      { id: 4, isCompleted: false, title: { en: "Graphs & Charts", ka: "გრაფიკები და დიაგრამები" } },
      { id: 5, isCompleted: false, title: { en: "T-Tests", ka: "T-ტესტები" } },
      { id: 6, isCompleted: false, title: { en: "ANOVA", ka: "დისპერსიული ანალიზი (ANOVA)" } },
      { id: 7, isCompleted: false, title: { en: "Correlation", ka: "კორელაცია" } },
      { id: 8, isCompleted: false, title: { en: "Midterm Exam", ka: "შუალედური გამოცდა" }, type: "exam" },
      { id: 9, isCompleted: false, title: { en: "Linear Regression", ka: "წრფივი რეგრესია" } },
      { id: 10, isCompleted: false, title: { en: "Reporting Results", ka: "შედეგების რეპორტინგი" } }
    ]
  },

  // --- 9. Distributed Database Systems ---
  {
    id: "26-10786",
    category: "08-ბაკალავრი 2025",
    title: { en: "Distributed Database Systems", ka: "განაწილებული მონაცემთა ბაზების სისტემები" },
    instructor: { en: "Badri Mepharishvili", ka: "ბადრი მეფარიშვილი" },
    progress: 20,
    weeks: [
      { id: 1, isCompleted: true, title: { en: "Intro to Distributed DB", ka: "შესავალი განაწილებულ ბაზებში" } },
      { id: 2, isCompleted: true, title: { en: "Database Architecture", ka: "მონაცემთა ბაზის არქიტექტურა" } },
      { id: 3, isCompleted: false, isCurrent: true, title: { en: "Data Replication", ka: "მონაცემთა რეპლიკაცია" } },
      { id: 4, isCompleted: false, title: { en: "Data Fragmentation", ka: "მონაცემთა ფრაგმენტაცია" } },
      { id: 5, isCompleted: false, title: { en: "Query Optimization", ka: "მოთხოვნების ოპტიმიზაცია" } },
      { id: 6, isCompleted: false, title: { en: "Concurrency Control", ka: "თანხვედრის კონტროლი" } },
      { id: 7, isCompleted: false, title: { en: "Transaction Management", ka: "ტრანზაქციების მართვა" } },
      { id: 8, isCompleted: false, title: { en: "Midterm Exam", ka: "შუალედური გამოცდა" }, type: "exam" },
      { id: 9, isCompleted: false, title: { en: "NoSQL Databases", ka: "NoSQL ბაზები" } },
      { id: 10, isCompleted: false, title: { en: "Cloud Databases", ka: "ღრუბლოვანი ბაზები" } }
    ]
  },

  // --- 10. Discrete Mathematics ---
  {
    id: "26-5737",
    category: "08-ბაკალავრი 2025",
    title: { en: "Discrete Mathematics", ka: "დისკრეტული მათემატიკა" },
    instructor: { en: "Aleksandre Klimiashvili", ka: "ალექსანდრე კლიმიაშვილი" },
    progress: 50,
    weeks: [
      { id: 1, isCompleted: true, title: { en: "Logic and Proofs", ka: "ლოგიკა და მტკიცებულებები" } },
      { id: 2, isCompleted: true, title: { en: "Set Theory", ka: "სიმრავლეთა თეორია" } },
      { id: 3, isCompleted: true, title: { en: "Functions", ka: "ფუნქციები" } },
      { id: 4, isCompleted: true, title: { en: "Algorithms", ka: "ალგორითმები" } },
      { id: 5, isCompleted: true, title: { en: "Number Theory", ka: "რიცხვთა თეორია" } },
      { id: 6, isCompleted: false, isCurrent: true, title: { en: "Induction", ka: "ინდუქცია" } },
      { id: 7, isCompleted: false, title: { en: "Counting Principles", ka: "დათვლის პრინციპები" } },
      { id: 8, isCompleted: false, title: { en: "Midterm Exam", ka: "შუალედური გამოცდა" }, type: "exam" },
      { id: 9, isCompleted: false, title: { en: "Graph Theory", ka: "გრაფთა თეორია" } },
      { id: 10, isCompleted: false, title: { en: "Trees", ka: "ხეები" } }
    ]
  }
];

export const getCourseContent = (id: string) => {
  return courses.find(c => c.id === id) || courses[0];
};

// ============================================
// WEEKLY CLASS SCHEDULE - Time-Aware Smart Widget
// ============================================
export interface ClassSession {
  id: number;
  subject: { en: string; ka: string };
  type: 'Lecture' | 'Lab' | 'Practice' | 'Seminar';
  startTime: string; // "HH:MM" format
  endTime: string;   // "HH:MM" format
  room: string;
  instructor: { en: string; ka: string };
}

export interface DaySchedule {
  [key: string]: ClassSession[];
}

// =============================================
// SAMPLE WEEKLY SCHEDULE (mock timetable)
// =============================================
export const weeklySchedule: DaySchedule = {
  Monday: [],
  Tuesday: [
    {
      id: 1,
      subject: { en: "Business Intelligence", ka: "ბიზნეს ინტელექტი" },
      type: "Lecture",
      startTime: "14:00",
      endTime: "15:00",
      room: "06-404a",
      instructor: { en: "Tevdoradze Medea", ka: "თევდორაძე მედეა" }
    },
    {
      id: 2,
      subject: { en: "Distributed DB Systems", ka: "განაწილებული DB" },
      type: "Lab",
      startTime: "16:00",
      endTime: "17:00",
      room: "09-208",
      instructor: { en: "Bichinashvili Avtandil", ka: "ბიჭინაშვილი ა." }
    },
    {
      id: 3,
      subject: { en: "Distributed DB Systems", ka: "განაწილებული DB" },
      type: "Lecture",
      startTime: "17:00",
      endTime: "18:00",
      room: "06-407b",
      instructor: { en: "Bichinashvili Avtandil", ka: "ბიჭინაშვილი ა." }
    }
  ],
  Wednesday: [],
  Thursday: [
    {
      id: 4,
      subject: { en: "Human-Computer Interaction", ka: "HCI" },
      type: "Lecture",
      startTime: "11:00",
      endTime: "12:00",
      room: "06-312a",
      instructor: { en: "Darchia Samson", ka: "დარჩია სამსონ" }
    },
    {
      id: 5,
      subject: { en: "HCI - Course Paper", ka: "HCI - საკურსო" },
      type: "Practice",
      startTime: "12:00",
      endTime: "13:00",
      room: "09-102",
      instructor: { en: "Darchia Samson", ka: "დარჩია სამსონ" }
    },
    {
      id: 6,
      subject: { en: "Computer Networks", ka: "კომპ. ქსელები" },
      type: "Lecture",
      startTime: "15:00",
      endTime: "16:00",
      room: "06-404a",
      instructor: { en: "Ergun Hakan", ka: "ერგუნ ჰაქან" }
    },
    {
      id: 7,
      subject: { en: "Info Security", ka: "ინფო უსაფრთხოება" },
      type: "Lecture",
      startTime: "17:00",
      endTime: "18:00",
      room: "06-503b",
      instructor: { en: "Bichinashvili Avtandil", ka: "ბიჭინაშვილი ა." }
    }
  ],
  Friday: [
    {
      id: 8,
      subject: { en: "Human-Computer Interaction", ka: "HCI" },
      type: "Lecture",
      startTime: "11:00",
      endTime: "12:00",
      room: "06-312a",
      instructor: { en: "Darchia Samson", ka: "დარჩია სამსონ" }
    },
    {
      id: 9,
      subject: { en: "HCI - Course Paper", ka: "HCI - საკურსო" },
      type: "Practice",
      startTime: "12:00",
      endTime: "13:00",
      room: "09-102",
      instructor: { en: "Darchia Samson", ka: "დარჩია სამსონ" }
    },
    {
      id: 10,
      subject: { en: "AI Fundamentals", ka: "AI საფუძვლები" },
      type: "Lecture",
      startTime: "14:00",
      endTime: "15:00",
      room: "06-503a",
      instructor: { en: "Chkhaidze Mariam", ka: "ჩხაიძე მარიამ" }
    },
    {
      id: 11,
      subject: { en: "Computer Networks", ka: "კომპ. ქსელები" },
      type: "Lecture",
      startTime: "15:00",
      endTime: "16:00",
      room: "06-404a",
      instructor: { en: "Ergun Hakan", ka: "ერგუნ ჰაქან" }
    },
    {
      id: 12,
      subject: { en: "Networks - Practice", ka: "ქსელები პრაქტ." },
      type: "Practice",
      startTime: "18:00",
      endTime: "19:00",
      room: "09-404",
      instructor: { en: "Ergun Hakan", ka: "ერგუნ ჰაქან" }
    }
  ],
  Saturday: [
    {
      id: 13,
      subject: { en: "Comp. Architecture", ka: "კომპ. არქიტ." },
      type: "Practice",
      startTime: "11:00",
      endTime: "12:00",
      room: "06-321q",
      instructor: { en: "Acharadze Gurami", ka: "აჭარაძე გურამი" }
    },
    {
      id: 14,
      subject: { en: "Networks - Lab", ka: "ქსელები ლაბ." },
      type: "Lab",
      startTime: "12:00",
      endTime: "13:00",
      room: "09-404",
      instructor: { en: "Ergun Hakan", ka: "ერგუნ ჰაქან" }
    },
    {
      id: 15,
      subject: { en: "Comp. Architecture", ka: "კომპ. არქიტ." },
      type: "Lecture",
      startTime: "14:00",
      endTime: "15:00",
      room: "06-312q",
      instructor: { en: "Acharadze Gurami", ka: "აჭარაძე გურამი" }
    },
    {
      id: 16,
      subject: { en: "HCI - Practice", ka: "HCI პრაქტ." },
      type: "Practice",
      startTime: "15:00",
      endTime: "16:00",
      room: "09-102",
      instructor: { en: "Darchia Samson", ka: "დარჩია სამსონ" }
    },
    {
      id: 17,
      subject: { en: "AI - Practice", ka: "AI პრაქტ." },
      type: "Practice",
      startTime: "16:00",
      endTime: "17:00",
      room: "09-210",
      instructor: { en: "Chkhaidze Mariam", ka: "ჩხაიძე მარიამ" }
    },
    {
      id: 18,
      subject: { en: "Info Security - Lab", ka: "უსაფრთხ. ლაბ." },
      type: "Lab",
      startTime: "17:00",
      endTime: "18:00",
      room: "09-208",
      instructor: { en: "Bichinashvili Avtandil", ka: "ბიჭინაშვილი ა." }
    }
  ],
  Sunday: []
};

// Helper to get day name
export const getDayName = (date: Date): string => {
  const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  return days[date.getDay()];
};

// Helper to get Georgian day name
export const getDayNameKa = (date: Date): string => {
  const days = ['კვირა', 'ორშაბათი', 'სამშაბათი', 'ოთხშაბათი', 'ხუთშაბათი', 'პარასკევი', 'შაბათი'];
  return days[date.getDay()];
};

// Academic Data for Grades Page.
// NOTE: all scores and the GPA below are FABRICATED sample data for the demo
// student — they are not a real transcript. Course and instructor names are
// kept for realism only.
export const academicData = {
  summary: {
    gpa: "3.40",
    totalCredits: 120,
    totalRequired: 240,
    currentSemester: "Autumn 2025-2026"
  },
  semesters: [
    {
      id: "sem_5",
      term: { en: "Autumn 2025-2026", ka: "შემოდგომა 2025-2026" },
      isCurrent: true,
      courses: [
        { name: { en: "Fundamentals of Information Security", ka: "ინფორმაციული უსაფრთხოების საფუძვლები" }, teacher: "Bichnigauri Avtandili", credits: 6, score: 88, grade: "B" },
        { name: { en: "Computer Architecture", ka: "კომპიუტერული არქიტექტურა" }, teacher: "Guram Acharadze", credits: 4, score: 75, grade: "C" },
        { name: { en: "Human-Computer Interaction", ka: "ადამიანი-კომპიუტერის ინტერაქცია" }, teacher: "Samson Darchia", credits: 4, score: 95, grade: "A" },
        { name: { en: "Computer Network Organization", ka: "კომპიუტერული ქსელების ორგანიზაცია" }, teacher: "Ergun Hakan", credits: 6, score: 84, grade: "B" },
        { name: { en: "Society Ethics and Technology", ka: "საზოგადოება, ეთიკა და ტექნოლოგიები" }, teacher: "Ketevan Mdzebluri", credits: 5, score: 90, grade: "B" },
        { name: { en: "Programming on Python", ka: "პითონზე პროგრამირება" }, teacher: "Tornike Jafaridze", credits: 5, score: 87, grade: "B" }
      ]
    },
    {
      id: "sem_4",
      term: { en: "Spring 2024-2025", ka: "გაზაფხული 2024-2025" },
      isCurrent: false,
      courses: [
        { name: { en: "Basics of Web Technologies", ka: "ვებ ტექნოლოგიების საფუძვლები" }, teacher: "Alexandre Khandolishvili", credits: 5, score: 82, grade: "B" },
        { name: { en: "Introduction to Computer Network", ka: "შესავალი კომპიუტერულ ქსელებში" }, teacher: "Guram Acharadze", credits: 6, score: 89, grade: "B" },
        { name: { en: "Statistical Models (SPSS)", ka: "სტატისტიკური მოდელები (SPSS)" }, teacher: "Vazha Tarieladze", credits: 5, score: 93, grade: "A" },
        { name: { en: "Discrete Mathematics", ka: "დისკრეტული მათემატიკა" }, teacher: "Sandro Klimiashvili", credits: 6, score: 78, grade: "C" },
        { name: { en: "Distributed Database Systems", ka: "განაწილებული მონაცემთა ბაზების სისტემები" }, teacher: "Badri Meparishvili", credits: 6, score: 91, grade: "A" }
      ]
    },
    {
      id: "sem_3",
      term: { en: "Autumn 2024-2025", ka: "შემოდგომა 2024-2025" },
      isCurrent: false,
      courses: [
        { name: { en: "Engineering Mathematics 3.1", ka: "საინჟინრო მათემატიკა 3.1" }, teacher: "Sandro Klimiashvili", credits: 5, score: 85, grade: "B" },
        { name: { en: "Object-oriented Programming – 2", ka: "ობიექტზე ორიენტირებული პროგრამირება – 2" }, teacher: "Nika Kakauridze", credits: 5, score: 72, grade: "C" },
        { name: { en: "Database Management System", ka: "მონაცემთა ბაზის მართვის სისტემა" }, teacher: "Ana Kobiashvili", credits: 6, score: 80, grade: "C" },
        { name: { en: "Probability Theory", ka: "ალბათობის თეორია" }, teacher: "Vazha Tarieladze", credits: 5, score: 96, grade: "A" },
        { name: { en: "Optimization Methods", ka: "ოპტიმიზაციის მეთოდები" }, teacher: "Akaki Gabelaia", credits: 5, score: 83, grade: "B" },
        { name: { en: "General Physics C2", ka: "ზოგადი ფიზიკა C2" }, teacher: "Mikheil Chikhradze", credits: 4, score: 90, grade: "B" }
      ]
    },
    {
      id: "sem_2",
      term: { en: "Spring 2023-2024", ka: "გაზაფხული 2023-2024" },
      isCurrent: false,
      courses: [
        { name: { en: "Engineering Mathematics 2.1", ka: "საინჟინრო მათემატიკა 2.1" }, teacher: "Davit Natroshvili", credits: 5, score: 69, grade: "D" },
        { name: { en: "General Physics B2", ka: "ზოგადი ფიზიკა B2" }, teacher: "Mikheil Chikhradze", credits: 4, score: 74, grade: "C" },
        { name: { en: "Operating Systems Fundamentals", ka: "ოპერაციული სისტემების საფუძვლები" }, teacher: "Irakli Rodonaia", credits: 5, score: 92, grade: "A" },
        { name: { en: "OOP – 1 (C++/C#)", ka: "OOP – 1 (C++/C#)" }, teacher: "Romani Samkharadze", credits: 5, score: 71, grade: "C" },
        { name: { en: "Foreign Language (English)", ka: "უცხო ენა (ინგლისური)" }, teacher: "Nana Matiashvili", credits: 5, score: 88, grade: "B" },
        { name: { en: "Fundamentals of Database Systems", ka: "მონაცემთა ბაზების საფუძვლები" }, teacher: "Avtandil Bichnigauri", credits: 6, score: 95, grade: "A" }
      ]
    },
    {
      id: "sem_1",
      term: { en: "Autumn 2023-2024", ka: "შემოდგომა 2023-2024" },
      isCurrent: false,
      courses: [
        { name: { en: "Foreign Language (English)", ka: "უცხო ენა (ინგლისური)" }, teacher: "Irina Natadze", credits: 5, score: 84, grade: "B" },
        { name: { en: "Engineering Mathematics 1.1", ka: "საინჟინრო მათემატიკა 1.1" }, teacher: "Davit Natroshvili", credits: 5, score: 77, grade: "C" },
        { name: { en: "General Physics A2", ka: "ზოგადი ფიზიკა A2" }, teacher: "Mikheil Chikhradze", credits: 4, score: 85, grade: "B" },
        { name: { en: "Computer Architecture Fundamentals", ka: "კომპიუტერული არქიტექტურის საფუძვლები" }, teacher: "Irakli Rodonaia", credits: 5, score: 90, grade: "B" },
        { name: { en: "Algorithmization Fundamentals", ka: "ალგორითმიზაციის საფუძვლები" }, teacher: "Tornike Jafaridze", credits: 6, score: 82, grade: "B" },
        { name: { en: "Academic Writing", ka: "აკადემიური წერა" }, teacher: "Ana Kobiashvili", credits: 3, score: 94, grade: "A" }
      ]
    }
  ]
};

export const landingPageContent = {
  // 1. Hero Section
  hero: {
    title: {
      en: "Welcome to GTU E-Learning Platform",
      ka: "კეთილი იყოს თქვენი მობრძანება სტუ-ს ელ-სწავლების პლატფორმაზე"
    },
    subtitle: {
      en: "Access course materials, assignments, and resources anytime, anywhere",
      ka: "წვდომა სასწავლო მასალებზე, დავალებებსა და რესურსებზე ნებისმიერ დროს"
    },
    scheduleButton: {
      text: { en: "Academic Schedules Table", ka: "სასწავლო ცხრილები Table" },
      link: "https://leqtori.gtu.ge/"
    }
  },

  // 2. Announcements (The text from the middle of the old page)
  announcements: [
    {
      id: 1,
      type: "important", // Red/Orange border
      title: {
        en: "Attention Professors!",
        ka: "პროფესორ-მასწავლებლების საყურადღებოდ!"
      },
      text: {
        en: "Educational courses for the I semester of 2025-26 have been created on elearning.gtu.ge (2025-2026(F)). To log in, you must enter your e-mail (given by the University) in the username, and your personal number in the password.",
        ka: "შექმნილია 2025-26 წლის I სემესტრის სასწავლო კურსები (2025-2026(F)) elearning.gtu.ge-ზე. შესასვლელად, მომხმარებლის სახელში უნდა შეიყვანოთ თქვენი ელ.ფოსტა, ხოლო პაროლში პირადი ნომერი."
      }
    },
    {
      id: 2,
      type: "info", // Blue border
      title: {
        en: "Dear Students,",
        ka: "ძვირფასო სტუდენტებო და პროფესორ-მასწავლებლებო"
      },
      text: {
        en: "Check if all the courses are available on the site you provided for the study contract. If any of the courses do not appear on your page, or you cannot log in, follow the link and fill out the Forms or contact the faculty person.",
        ka: "გადაამოწმეთ, ხედავთ თუ არა ყველა სასწავლო კურსს. თუ რომელიმე სასწავლო კურსი არ ჩანს თქვენ გვერდზე, ან ვერ შედიხართ სისტემაში, გადადით ბმულზე და შეავსეთ ფორმა ან დაუკავშირდით ფაკულტეტის საკონტაქტო პირს."
      }
    }
  ],

  // 3. Resources Sidebar (The "Main Menu" links)
  resources: [
    {
      title: { en: "Student Guides", ka: "ინსტრუქციები სტუდენტებისათვის" },
      items: [
        { label: { en: "Login and Profile Editing Guide", ka: "პლატფორმაზე შესვლა და პროფილის რედაქტირება" }, type: "PDF" },
        { label: { en: "Guidelines for Using Educational Materials", ka: "სასწავლო მასალასთან მუშაობის ინსტრუქცია" }, type: "PDF" }
      ]
    },
    {
      title: { en: "Professor Guides", ka: "პედაგოგებისათვის" },
      items: [
        { label: { en: "Instructions for Professors", ka: "ინსტრუქცია პროფესორ-მასწავლებლებისათვის" }, type: "PDF" }
      ]
    },
    {
      title: { en: "Contact Info", ka: "საკონტაქტო ინფორმაცია" },
      items: [
        { label: { en: "Faculty Contact Persons List", ka: "საკონტაქტო პირები ფაკულტეტების მიხედვით" }, type: "PDF" }
      ]
    }
  ],

  // 4. Faculties List (The "Course Categories")
  faculties: [
    { en: "01-Civil Engineering", ka: "01-სამშენებლო" },
    { en: "02-Power Engineering", ka: "02-ენერგეტიკის" },
    { en: "03-Mining and Geology", ka: "03-სამთო-გეოლოგიური" },
    { en: "04-Chemical Technology and Metallurgy", ka: "04-ქიმია-მეტალურგია" },
    { en: "05-Transportation and Mechanical Engineering", ka: "05-სატრანსპორტო სისტემებისა და მექანიკის ინჟინერიის" },
    { en: "06-Architecture, Urban Planning and Design", ka: "06-არქიტექტურის" },
    { en: "07-Law and International Relations", ka: "07-სამართლისა და საერთაშორისო ურთიერთობების" },
    { en: "08-Informatics and Control Systems", ka: "08-ინფორმატიკისა და მართვის სისტემების" },
    { en: "09-International Design School", ka: "09-დიზაინის" },
    { en: "10-Agricultural Science", ka: "10-აგრარული" },
    { en: "11-Business Technology", ka: "11-ბიზნეს ტექნოლოგიების" }
  ],
  footer: {
    address: {
      en: "77 Kostava Str., 0160 Tbilisi, Georgia",
      ka: "კოსტავას 77, 0160 თბილისი, საქართველო"
    },
    email: "info@gtu.ge",
    phone: "+995 32 2 77 11 11",
    copyright: {
      en: "© 2025 Georgian Technical University. All rights reserved.",
      ka: "© 2025 საქართველოს ტექნიკური უნივერსიტეტი. ყველა უფლება დაცულია."
    }
  }
};
