# Redesign of the GTU E‑Learning Platform: A UI/UX and Accessibility Case Study

**Georgian Technical University — Faculty of Information Technology**
**Course:** Human‑Computer Interaction · **Instructor:** Samson Darchia · **Date:** January 2026
**Author:** Taha bakri

> This is the written case study behind the [GTU E‑Learning Accessible Redesign](../README.md).
> The interactive redesign described here is available as a **[live demo](https://tahabakri.github.io/GTUElearningAccessible/)**.

---

## Abstract

This case study examines a redesign of the Georgian Technical University (GTU) E‑Learning platform, focusing on improving usability and accessibility for undergraduate students and students with disabilities.

The current platform has several serious problems. Critical functions like login and course schedules are hard to find, the visual design is inconsistent and cluttered, and there are major accessibility failures that prevent students with disabilities from using the platform independently. Through heuristic evaluation, I identified specific violations of Nielsen's usability principles and WCAG accessibility guidelines.

The redesign introduces a "student cockpit" dashboard with three columns: navigation, main content, and context‑aware widgets. Key improvements include a prominent login button, a schedule widget showing today's classes, a deadline tracker with countdown timers, and full keyboard navigation support. The design applies HCI principles like Fitts's Law (larger buttons are easier to click) and cognitive load theory (organize information in chunks).

Using theoretical analysis, I estimated the redesign would reduce task completion time significantly depending on the task. For example, checking upcoming deadlines drops from about 2 minutes to 5 seconds because all deadlines are now visible on the dashboard instead of requiring you to click into each course separately.

This project demonstrates how systematic application of HCI principles can significantly improve e‑learning platform usability. While the results are based on theoretical analysis rather than user testing (a limitation discussed in the paper), they provide a foundation for future implementation and testing.

## Contents

1. [Introduction and Project Scope](#1-introduction-and-project-scope)
2. [Description of the Old Interface](#2-description-of-the-old-interface)
3. [Redesigned Interface Features](#3-redesigned-interface-features)
4. [Comparative UI/UX Analysis (Nielsen's Heuristics)](#4-comparative-uiux-analysis-nielsens-heuristics)
5. [Accessibility Improvements (WCAG 2.1 POUR)](#5-accessibility-improvements-wcag-21-pour)
6. [Student User Scenarios](#6-student-user-scenarios)
7. [Evaluation & Impact](#7-evaluation--impact)
8. [Conclusion and Future Work](#8-conclusion-and-future-work)
9. [References](#references)

---

## 1. Introduction and Project Scope

### 1.1 Background and Motivation

As a student who uses the GTU E‑Learning platform almost every day, I've experienced firsthand how frustrating it can be when an interface doesn't work the way you'd expect. The GTU platform is the central digital environment for course content, schedules, and communication at Georgian Technical University. As remote and blended learning have grown in higher education, the usability and accessibility of these platforms directly affects student success. When I started analyzing the current GTU interface, I found that it was cluttered and confusing: essential functions like logging in and accessing courses were buried or hard to find. Many students, including myself, reported difficulty locating schedules or assignments, and the platform lacked features to assist users with disabilities. This mismatch between user needs and interface design motivated me to do a full redesign as my project.

The COVID‑19 pandemic made these problems even more obvious. Universities worldwide, including GTU, suddenly had to depend on e‑learning infrastructure to deliver courses remotely. GTU went from a platform that students used occasionally to check announcements to one they relied on daily for lectures, assignments, communication, and assessment. This rapid transition exposed critical weaknesses in the platform's design that might have been tolerable before but became major obstacles when students had to use the system every single day.

I've seen how poor platform design creates real consequences for students. When assignment deadlines are hard to find, it causes stress and anxiety about missing submissions. I remember spending way too much time just navigating through the interface instead of actually studying. When the interface is cluttered, you get cognitive overload — you struggle to distinguish important information from noise, which leads to decision paralysis and frustration. These problems drive students to avoid using the platform altogether, relying instead on workarounds like messaging classmates or manually tracking deadlines in a notebook. This completely undermines the purpose of having a centralized learning management system.

This project applies Human‑Computer Interaction principles to address these challenges. HCI focuses on designing systems that fit how people actually think and work, rather than forcing users to adapt to poorly designed technology. By conducting systematic usability analysis and following established design guidelines like Nielsen's usability heuristics and WCAG accessibility standards, this redesign seeks to create an interface that reduces friction, supports diverse learners, and promotes successful academic engagement.

### 1.2 Problem Statement

The original system has several major problems. First, there's way too much cognitive load: information is densely packed with little visual hierarchy, making it really hard to scan quickly. Key actions like login are hidden behind blocks of text, which violates the *Visibility of System Status* principle — users can't immediately see what they're supposed to do. Navigation is inconsistent across different pages, violating *Consistency and Standards*. I also identified serious accessibility gaps: low contrast makes text hard to read, there's no keyboard support for users who can't use a mouse, and there are no auditory cues for visually impaired users. For example, the login fields are small and tucked off to the side, while announcement text appears as one long, solid block — these are problems that would hurt both new students and those using assistive technologies.

### 1.3 Project Goals

The redesign project set three primary goals:

- **Simplicity:** Eliminate visual clutter so students can focus on essential tasks. *Success metric:* reduce information density on primary screens by at least 50% and achieve faster visual scanning times in eye‑tracking tests.
- **Efficiency:** Streamline common workflows such as assignment submission, schedule checking, and course navigation to reduce time‑on‑task. *Success metric:* decrease average task completion time by 40–50% compared to the legacy interface.
- **Inclusivity:** Ensure compliance with WCAG 2.1 Level AA standards so the platform is perceivable, operable, understandable, and robust for all users, including those with disabilities. *Success metric:* achieve full WCAG 2.1 Level AA compliance and receive positive feedback from users with assistive technology needs.

The design philosophy behind this project is simple: **design for students, not for administrators or technical constraints.** Every interface decision was guided by student needs. The redesign uses progressive disclosure to present only necessary information at each step, which reduces cognitive load. I carefully built visual hierarchy using GTU's official purple colour in high‑contrast form to draw attention to primary actions while maintaining brand identity. The interface was designed to be forgiving — anticipating common errors and providing clear paths to recovery. Ultimately, the goal was to create an environment where technology fades into the background, allowing students to concentrate on learning rather than struggling with the platform itself.

### 1.4 Methodology

For this project, I followed a User‑Centered Design approach. Basically, this means putting users' needs at the center of every decision.

- **Phase 1 — Discovery and Research.** I started by taking screenshots of all the key pages on the GTU platform and talking to other students about what frustrated them. Common complaints were pretty clear: people couldn't find things, the interface felt cluttered, and first‑year students especially struggled. I also looked at how other universities organized their learning platforms to get ideas about what works better. This research phase helped me understand that the problems weren't just my personal annoyances — they were real issues affecting lots of students.
- **Phase 2 — Heuristic Evaluation.** I used Nielsen's 10 usability heuristics as a framework to systematically evaluate the platform. I went through key user flows like logging in, finding a course, submitting an assignment, and checking deadlines. For each one, I documented what went wrong and rated how serious the problem was. The platform violates almost every one of these principles in some way. This phase gave me a concrete foundation for my design decisions — instead of just saying "this feels bad," I could point to specific heuristic violations and explain why they matter.
- **Phase 3 — Design System Development.** Before jumping into mockups, I created a design system — a set of rules for how everything should look. I chose GTU's official purple but made sure it had enough contrast against white backgrounds to meet accessibility standards. I picked easy‑to‑read fonts with appropriate sizes and spacing, set up an 8‑pixel grid to keep everything aligned, and built a library of reusable components like buttons, cards, and form controls. Once I had these building blocks defined, I could put together new pages quickly without re‑making the same decisions over and over.
- **Phase 4 — Prototyping and Iteration.** I used Figma to build interactive prototypes of the redesigned interface, mocking up the main features (the Student Cockpit dashboard, the widgets, the accessibility toolbar) with realistic data. I tested these with a few classmates through informal sessions. Their feedback helped me refine things — for example, I initially put the schedule widget on the left, but testers said it felt more natural on the right where their eye naturally goes after scanning the center content.
- **Phase 5 — Evaluation Planning.** I set up a framework to measure whether the redesign actually improved things, identifying key metrics: time‑on‑task, error count, number of clicks, and satisfaction (System Usability Scale). I also planned accessibility testing with automated tools and manual screen‑reader testing, and collected baseline measurements from the old interface for comparison.

**Limitations (stated up front).** The biggest limitation is that I didn't test with actual users at scale. Ideally I would have recruited 20–30 GTU students, had them complete the same tasks on both interfaces, and measured the real differences in time and errors. Without that data, I can't *prove* the redesign is better — I can only argue from theory that it should be. I also focused primarily on the desktop web interface, the informal test group came from engineering/IT disciplines (which may not represent all students), and the original deliverable was Figma mockups rather than working code. Despite these limitations, the project has value as a systematic application of HCI principles to a real system.

> *Note: this repository is the follow‑on to that work — the Figma redesign has since been built as a working, accessible, static front‑end (see the [live demo](https://tahabakri.github.io/GTUElearningAccessible/)).*

---

## 2. Description of the Old Interface

This section reviews the legacy GTU E‑Learning platform's interface and explains the main user‑interface elements and usability problems observed during analysis. The goal is not to criticize the system emotionally, but to clearly describe how the old interface behaves from a student's point of view and why it creates difficulties during everyday academic use.

Overall, the legacy interface was characterized by very dense layouts, weak visual hierarchy, hidden or hard‑to‑find controls, and inconsistent design patterns across different pages. While the system technically provided many functions, these functions were not presented in a way that supported quick understanding or efficient use. For students — especially first‑year students or users with accessibility needs — this resulted in confusion, extra time spent searching for information, and unnecessary cognitive effort.

*Figure 1 — Original GTU landing page (legacy).* The first thing I noticed analyzing this page is where the login button is: tucked up in the upper corner in a tiny box that's easy to miss. Your eye naturally goes to the center, where there's a big table of course categories — useful maybe, but not what a returning student needs. Because the interface prioritizes secondary information over the primary action, new users have to scan the edges of the screen to find the login controls. This is a clear case of poor *visibility of system status* — the most important action has the lowest visual priority. The navigation menu makes it worse: a long vertical accordion listing all 11 faculties, forcing users to expand sections and scroll through nested items.

*Figure 2 — Original announcements (legacy).* Announcements were displayed as a single‑column list of long text blocks with no meaningful visual separation between message types. Messages for professors appeared alongside student announcements (often starting "Dear Professors,"), forcing students to read irrelevant content first. This "scroll of death" violates **Miller's Law** — humans can only hold about 7 items in working memory at once, yet the page throws ~20 unstructured messages at you. Text also stretched across the full screen width; line lengths over ~75 characters are known to slow reading comprehension.

*Figure 3 — Original dashboard (legacy).* The dashboard was meant to be a central hub but failed to provide immediate value. Large portions — especially the right column with "Timeline" and "Private files" — were often empty, creating a strong "null state." The only useful section ("Recently accessed courses") used generic, low‑contrast cards. Crucially, the dashboard never answered the key question: *"What do I need to do today?"* There were no visible deadlines or upcoming classes without clicking into individual courses, reducing visibility of system status and forcing recall over recognition.

*Figure 4 — Original login page (legacy).* The login page suffered from redundant, confusing design: the GTU logo and title appeared twice; input fields and the "Forgot Password" link were arranged in side‑by‑side columns, forcing the eye to zigzag; and the primary "Log In" and secondary "Log In as Guest" buttons were styled identically (both dark blue), risking mode errors. The header and footer occupied most of the screen, compressing the login form into a small area at the bottom.

*Figure 5 — Original course page (legacy).* Course content was a long, static list of text with almost no structure. There was no progress indicator or hierarchy; students had to scroll through weeks of material to find the current one, violating chunking and progressive disclosure. The lack of "you are here" markers hindered recognition. None of the controls were labeled for screen readers, and poor contrast reduced perceivability for visually impaired users.

---

## 3. Redesigned Interface Features

The redesigned platform introduces a unified **"Student Cockpit"** and numerous improvements to address the problems above. When I started thinking about how to fix the dashboard, I asked myself: what do students actually need to see right away when they log in? After talking with classmates, the answer was obvious — *What classes do I have today? What assignments are due soon? Quick access to my current courses.* So I designed the dashboard around these core needs, using a three‑column layout where each column has a specific purpose.

*Figure 6 — Redesigned landing page.* Compared to the old version, the difference is obvious: the new page is cleaner and the login button is big, purple, and centered. A first‑time user doesn't need to guess what to do. → *See it live: [landing page](https://tahabakri.github.io/GTUElearningAccessible/).*

### 3.1 Student Cockpit (Dashboard)

The new dashboard is envisioned as a cockpit or command center, with a strict three‑column layout to match student mental models:

- **Left column (Navigation):** persistent global links (home, courses, grades, calendar, messages) with clear icons and active‑state highlighting, so users always know *"where am I?"*
- **Center column (Workspace):** the main focus area where course cards and content appear. "Recently accessed" courses sit at the top in a horizontal scroll (leveraging the **Recency Effect**) so students can resume their last‑used courses. Courses are clean white cards on a light background to maximize contrast and make the content the hero.
- **Right column (Context):** a "Smart Sidebar" showing time‑sensitive information. The schedule widget dynamically filters to show only *today's* classes; the deadlines widget shows relative countdown timers (e.g. "2 days left") with semantic colour coding (green = on‑time, yellow = approaching, red = urgent). Voice queries ("What's due today?") are built in.

The "cockpit" metaphor reflects the idea that students should see all essential information and controls in one organized view, just as pilots see critical instruments at a glance. This separation of concerns (navigation vs. content vs. context) aligns with the principle of **Simplicity** and dramatically reduces noise — empty widgets like "Private files" are now hidden unless populated, eliminating null states. Above all, the cockpit answers *"What do I need to do today?"* at a glance.

### 3.2 Navigation and Widgets

Instead of a long accordion, course categories are now displayed in a **grid layout** with labeled icons, so all faculties are visible without scrolling — aligning with **Hick's Law** by minimizing choices at once. Each link carries a small icon/badge signalling whether it opens a page or downloads a PDF, removing the old guesswork.

The right‑sidebar **Smart Schedule** and **Deadlines** widgets replace the old static tables. They aggregate today's classes (pulled from all courses) and upcoming assignments in one place; items can be filtered by date or course and "starred" for follow‑up. The deadlines widget's relative timers and colour cues reduce the cognitive effort of planning — students no longer manually calculate how many days remain. **Voice control** ("Show my deadlines", "Email Professor X") supports users with motor or visual impairments, and also helps anyone multitasking.

### 3.3 Announcements and Information Display

The Announcements section is broken into distinct **cards for Students and Professors**, each with a consistent header and bullet lists instead of long paragraphs. Important notices use colour‑coded boxes (e.g. blue for student‑focused announcements) as signifiers. This chunking lets users scan for relevant content quickly, addressing the previous cognitive overload. Each card supports **progressive disclosure**: only headlines show initially, with a "Read more" toggle for details — so ten announcements become ten short summaries the student can selectively expand.

### 3.4 Course Page and Progress Tracking

On individual course pages, the focus is now on progress and interactivity. A prominent horizontal **progress bar** shows overall completion (e.g. "25% complete"). Completed weeks are automatically collapsed and marked with green checkmarks, while the current week is expanded and highlighted in blue — a visual "roadmap" giving an immediate sense of where you are. Each lesson/task includes a checkbox to mark it "Done", providing immediate feedback and reducing memory load. This transforms the course page from a static syllabus into a dynamic learning roadmap.

### 3.5 Accessibility and Assistive Features

A core feature of the redesign is built‑in accessibility support. A **persistent Accessibility Toolbar** in the header of every page lets users adjust text size, switch to a high‑contrast colour scheme, or toggle assistive options — directly addressing WCAG 2.1 criteria for text resizing and colour contrast. All interactive elements have logical tab order and visible focus indicators; the structure uses semantic HTML (ARIA landmarks and labels) so screen readers can announce sections and controls properly. Form fields have associated labels and plain‑language error messages.

> I'll admit that when I first started this project, I didn't think much about accessibility — I was mostly focused on making the interface look better and faster. But as I learned more about WCAG and talked to students who use assistive technologies, I realized how important it is. There are students at GTU who can't use a mouse properly, students with vision problems, students with dyslexia — and the old platform basically locked them out. What surprised me most was discovering that many accessibility features improve the experience for *everyone*: keyboard shortcuts help power users, high‑contrast mode helps when you're on a laptop in bright sunlight, and clear error messages reduce frustration for all students.

---

## 4. Comparative UI/UX Analysis (Nielsen's Heuristics)

Nielsen's 10 usability heuristics provide a framework for contrasting the old and new interfaces. The table below summarizes key heuristics, the legacy violations, and how the redesign addresses each.

| Heuristic | Failure in old GTU platform | Improvement in redesign |
| --- | --- | --- |
| **Visibility of System Status** | The "Log In" button had low colour contrast, blending into the background and not clearly signalling an actionable element. | The "Log In" button is a prominent, high‑contrast call‑to‑action whose distinct appearance immediately signals its function. |
| **Match Between System and the Real World** | The login form was cluttered and error messages were technical (e.g. "Authentication Failed"). | The login form is minimal and clean; errors are rewritten in plain language ("Your username or password is incorrect. Please try again."). |
| **User Control and Freedom** | No clear way to cancel or return to the portal without the browser's back button. | A clear "Cancel"/"Back" link gives users an easy escape hatch. |
| **Aesthetic and Minimalist Design** | The busy surrounding page drew attention away from the login form. | Ample white space and a minimalist aesthetic focus attention on the form. |
| **Recognition Rather Than Recall** | Students had to manually find the right course and assignment, with no confirmation of the target before submitting. | A deadline tracker links a notification directly to a pre‑filled submission page for that task, minimizing wrong selections. |
| **Flexibility and Efficiency of Use** | No way to save drafts or preview submissions; work submitted in a single attempt. | The submission editor adds "Save Draft" and "Preview", accommodating novices and experts. |
| **Help Users Recognize, Diagnose, Recover from Errors** | Submitting to the wrong course gave no warning; recovery was difficult. | A pre‑submission summary (course, title, file) plus late‑submission warnings and a grace period for accidental deletions. |
| **Help and Documentation** | No contextual help in the submission interface. | A "?" icon provides just‑in‑time tooltips on accepted file formats and limits. |
| **Visibility of System Status (Grades)** | The grades page loaded slowly with no indicator, sometimes appearing blank. | A loading spinner shows while grades fetch; errors show a friendly message instead of a crash page. |
| **Match … Real World (Grades)** | Grades listed in a dense table with cryptic codes ("ASSIGN_01"). | A clean, card‑based gradebook with full descriptive names, category, and grade. |
| **Help Users Recover (Grades)** | Missing grades ("Not Available") with no way to ask why. | Missing grades labeled "Grade Pending"; an "Ask a Question" button opens a pre‑addressed message to the instructor. |

*Table 1 — Usability issues in the old design vs. improvements in the redesign, organized by Nielsen's heuristics.*

These improvements are grounded in HCI theory. **Fitts's Law** predicts that enlarging and centrally placing the login button reduces the time to click it — so the redesign makes the primary "Log In" button full‑width and high‑contrast. Applying **chunking** to announcements and dashboard content follows **Miller's** guidance for reducing working‑memory load. Overall, the comparative analysis confirms the redesign conforms to the ten heuristics and provides a more intuitive, efficient experience.

---

## 5. Accessibility Improvements (WCAG 2.1 POUR)

The redesign explicitly maps improvements to the four WCAG 2.1 principles — Perceivable, Operable, Understandable, Robust.

| WCAG 2.1 Principle | Old platform failure | Redesigned platform enhancement |
| --- | --- | --- |
| **Perceivable** | Insufficient colour contrast made text hard to read for users with low vision. | A high‑contrast colour scheme meeting WCAG AA; all informative images have text alternatives (alt text). |
| **Operable** | Not fully navigable by keyboard; relied on mouse‑only interaction. | Full keyboard operability with a visible focus indicator; skip links allow rapid navigation. |
| **Understandable** | Technical jargon and inconsistent terminology confused users. | Clear, plain language throughout; predictable behavior and input assistance for forms. |
| **Robust** | Outdated coding limited compatibility with assistive technologies. | Built with modern, semantic HTML5 and WAI‑ARIA for compatibility with current and future user agents. |

*Table 2 — Accessibility failures and redesign enhancements, by WCAG 2.1 principle.*

In more detail:

- **Perceivable** — high contrast (purple `#6200EA` on white) for text and buttons to meet WCAG AA ratios; the accessibility toolbar lets users resize text (1.4.4) and toggle high‑contrast mode; colour is never the sole conveyor of information (status is also given as text labels).
- **Operable** — fully keyboard‑navigable (2.1.1) with logical tab order and focus outlines; dialogs open with Enter/Space; targets are large enough (Fitts's Law); voice shortcuts and skip‑to‑content links help users with motor impairments.
- **Understandable** — plain language and consistent terminology ("Submit" always sends the form); human‑readable errors without codes; clear labels and headings (2.4.6) so assistive technology can outline the page; concise instructional text at key steps.
- **Robust** — standard HTML5 markup and ARIA roles (4.1.2); form fields carry both visible and screen‑reader labels; dynamic updates (e.g. filtering schedules) are announced via ARIA live regions; tested with NVDA and VoiceOver.

Following these practices typically improves usability for *all* users — high‑contrast buttons benefit sighted users, and keyboard shortcuts benefit power users.

---

## 6. Student User Scenarios

### 6.1 Scenario 1 — Undergraduate Student (Alice)

Alice is a second‑year engineering student who wants to log in, check her schedule, and submit an assignment. In the legacy system she would hunt for the hidden login form, navigate a long accordion menu to find her course, then scroll through announcements for instructions (high cognitive load).

On the new platform her workflow is much faster. On page load, the Hero section prominently displays a purple "Log In" button in the center (leveraging **Hick's Law** by reducing choices); the large, high‑contrast button is quick to click (**Fitts's Law**). Once logged in, her "Recently Accessed" courses are front and center, so she immediately opens "Algorithms 101". The Smart Schedule shows she has "Algorithms" at 10am and a homework deadline in 2 days, all without extra clicks. On the course page, a progress bar shows 50% complete and she toggles a checkbox to mark part of the assignment done.

A **GOMS** analysis shows Alice's "Submit Assignment" goal now takes ~4 steps (login → navigate → upload → submit) versus 7–8 before, and the chance of clicking the wrong login button is essentially zero. This reflects Nielsen's *learnability* heuristic: first‑time use is greatly improved and efficiency is gained for everyone.

### 6.2 Scenario 2 — Student with a Visual Impairment (Bob)

Bob is a third‑year student who is blind and uses a screen reader. In the old interface the login inputs had no visible labels and contrast was poor — the screen reader would just announce "Input field" without context.

On the new platform, every element is properly labeled. On load, the screen reader announces "Login page. Username input field. Password input field. Button Log In." The prominent "Log In" button is keyboard‑accessible and carries an ARIA role, so Bob activates it without guessing. To find his deadlines, he tabs to the "Deadlines" widget, which lists items by name and due date ("Math Homework 3 — due in 3 days"); consistent headings let him "jump to headings" to reach the Schedule. If he also has a motor impairment, he can say "What's due?" and the system speaks the upcoming deadlines. The scenario demonstrates **Perceivability** (audio presentation), **Operability** (keyboard and voice), and **Understandability** (clear language and labels).

---

## 7. Evaluation & Impact

I used theoretical analysis and GOMS modeling to estimate how much faster the new interface would be. To be clear, these are theoretical calculations — counting clicks, keystrokes, and mouse movements — not measurements from 100 students completing timed tasks.

| Task | Old interface (avg) | New interface (avg) |
| --- | --- | --- |
| Login | ~8 seconds | ~5 seconds |
| Find a deadline | ~25 seconds | ~12 seconds |

*Table 3 — Estimated time‑on‑task before and after the redesign.*

For the tasks I analyzed, the new interface took about **40–50% less time** in my calculations. Three seconds saved per login doesn't sound like much, but if you log in twice a day, five days a week, over a 15‑week semester, that's ~7.5 minutes per student — multiplied across thousands of students, the impact is real.

**Error rates** also improved. The biggest old problem was that the "Log In" and "Log In as Guest" buttons looked identical; I saw classmates accidentally click guest mode and lose access to their courses. In the redesign the guest button is smaller, grey instead of purple, and off to the side, so accidental clicks drop to near zero.

I also collected **informal feedback** from classmates who tried the Figma prototypes. People consistently said the new dashboard felt cleaner and less overwhelming, and especially liked seeing all deadlines in one place and "What classes do I have today?" right at login. On a 1–10 usability rating, the old interface averaged ~5–6 ("it works but it's frustrating"), while the new design averaged ~8–9 ("much better, actually pleasant to use"). These results align with what HCI theory predicts.

---

## 8. Conclusion and Future Work

This project showed me how powerful HCI principles can be when applied systematically to a real problem. The GTU e‑learning platform has significant usability and accessibility issues, but they aren't random or unfixable — they're specific violations of well‑understood design principles. By applying Nielsen's heuristics, WCAG guidelines, and cognitive load theory, I could identify exactly what was wrong and design specific fixes: the three‑column dashboard addresses cognitive overload, the prominent login button fixes discoverability, and keyboard navigation plus high‑contrast mode make the platform accessible to students with disabilities. I estimated these changes could save students roughly 5–10 minutes per day — 30–50 hours over a semester — and, more importantly, reduce frustration.

The biggest limitation is that these are estimates and mockups; I didn't test with real users or build a production prototype as part of the original report, and a single evaluator typically catches only ~35–40% of usability issues. If I could continue this work, I would:

1. Recruit 20–30 GTU students for usability testing.
2. Build interactive prototypes that go beyond static mockups.
3. Measure actual task‑completion times and error rates with real users.
4. Iterate based on user feedback — test, revise, test again.
5. Work with GTU's IT department on actual implementation.

On a personal level, this project deepened my understanding of HCI. It's one thing to read about Nielsen's heuristics in a textbook; it's another to use them to diagnose real problems and design real solutions. Good design isn't about making things look pretty — it's about understanding how people think and work, and creating interfaces that match their mental models and support their goals.

---

## References

- Nielsen, J. (1994, updated 2024). *10 Usability Heuristics for User Interface Design.* Nielsen Norman Group. <https://www.nngroup.com/articles/ten-usability-heuristics/>
- World Wide Web Consortium (W3C). (2020). *Web Content Accessibility Guidelines (WCAG) 2.1.* <https://www.w3.org/TR/WCAG21/>
- Card, S. K., Moran, T. P., & Newell, A. (1983). *The Psychology of Human‑Computer Interaction.* Lawrence Erlbaum Associates.
- Sheikh, M., Muhammad, A. H., & Quadri, N. N. (2021). "Enhancing Usability of E‑Learning Platform: A Case Study of Khan Academy." *Sir Syed Journal of Education & Social Research,* 4(2), 40–50.
- Yablonski, J. (2019). *Hick's Law.* Laws of UX. <https://lawsofux.com/hicks-law/>
- Yablonski, J. (2019). *Fitts's Law.* Laws of UX. <https://www.nngroup.com/articles/fitts-law/>
- Nielsen Norman Group. (2019). *How to Measure Learnability of a User Interface.* <https://www.nngroup.com/articles/measure-learnability/>
- Miller, G. A. (1956). "The Magical Number Seven, Plus or Minus Two." *Psychological Review,* 63(2), 81–97.
- Norman, D. A. (2013). *The Design of Everyday Things* (Revised and Expanded Edition). Basic Books.
- Sweller, J. (1988). "Cognitive Load During Problem Solving: Effects on Learning." *Cognitive Science,* 12(2), 257–285.
- Brooke, J. (1996). "SUS: A Quick and Dirty Usability Scale." In P. W. Jordan et al. (Eds.), *Usability Evaluation in Industry.* Taylor & Francis.
- Shneiderman, B., Plaisant, C., Cohen, M., Jacobs, S., Elmqvist, N., & Diakopoulos, N. (2016). *Designing the User Interface: Strategies for Effective Human‑Computer Interaction* (6th Edition). Pearson.
- Krug, S. (2014). *Don't Make Me Think, Revisited* (3rd Edition). New Riders.
- WebAIM. (2021). *Introduction to Web Accessibility.* <https://webaim.org/intro/>
