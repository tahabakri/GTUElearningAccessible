# GTU E‑Learning — Accessible Redesign

An **accessibility‑first redesign concept** of the [Georgian Technical University e‑learning platform](https://elearning.gtu.ge/), built as a **Human‑Computer Interaction (HCI)** course project.

The goal: take a dense, dated university LMS and rebuild it around **usability, inclusive design, and WCAG‑oriented accessibility** — then make every accessibility feature something you can actually *try*, not just read about.

**▶ Live demo: https://tahabakri.github.io/GTUElearningAccessible/**

> **Note on data:** This is a static front‑end demo. There is no backend, no database, and no real accounts. Everything you see — the student, the grades, the schedule, the messages — is **mock/fabricated data** for demonstration only.

---

## Try it in 30 seconds

1. Open the [live demo](https://tahabakri.github.io/GTUElearningAccessible/).
2. Click **Log In** and sign in with the demo credentials shown on the screen (`demo.student` / `password`). It's a demo — any username and password will work.
3. Explore the dashboard, then open the **Accessibility** toolbar (top of the header) and toggle features on/off as you browse.

---

## Accessibility features (and how to try each)

| Feature | What it does | How to try it |
| --- | --- | --- |
| **Text scaling** (A‑ / A / A+) | Scales the whole UI via a root font‑size multiplier | Use the A‑/A/A+ buttons in the header toolbar |
| **Dark mode** | Full light/dark theme with WCAG‑AA contrast in both | Click the moon/sun toggle |
| **High contrast** | Boosts text/background separation | Accessibility settings → Contrast → High |
| **Colour‑vision simulation** | Simulates Deuteranopia, Protanopia, Tritanopia & Monochrome via SVG colour matrices | Accessibility settings → Colourblind simulation |
| **Screen‑reader simulation** | Hover/focus a course card (or press its speaker icon) to hear it announced via the Web Speech API | Hover a course card on the dashboard |
| **Voice commands** | Navigate hands‑free ("Dashboard", "Grades", "Course 1"…) using the Web Speech API | Click the microphone in the toolbar and speak |
| **Keyboard shortcuts** | Tab order, focus rings, and a shortcuts cheat‑sheet | Press **Shift + ?** anywhere |
| **Skip to content** | Jumps keyboard users past the header to the main region | Press **Tab** once on any page |
| **Bilingual UI (EN / ქართული)** | Full English ⇄ Georgian language switch, persisted | Use the language menu in the header |
| **ARIA live announcements** | Setting changes are announced to assistive tech | Toggle any setting with a screen reader on |
| **Persisted preferences** | All accessibility choices are saved to `localStorage` | Change settings, refresh the page |

> Voice commands and screen‑reader simulation use the browser's **Web Speech API**, which works best in Chrome/Edge and requires microphone permission for voice input.

---

## HCI principles applied

This project was an exercise in applying HCI theory to a real interface:

- **Pareto (80/20) layout** — the 20% of features students use most (today's schedule, active courses) are front‑and‑centre; secondary tools move to the sidebar.
- **Context awareness / reduced memory load** — the "Smart Schedule" shows only *today's* classes and highlights the current one, instead of a full weekly grid.
- **Error prevention & recovery** — a simplified login with clear, friendly error messaging.
- **Fitts's Law** — large, easily‑targeted navigation controls.
- **Design for all** — accessibility is a first‑class, always‑visible control surface, not a buried setting.

The full written case study — heuristic evaluation, WCAG analysis, user scenarios, and impact estimates — is in [`docs/CASE_STUDY.md`](docs/CASE_STUDY.md), and the visual/UX system is documented in [`docs/design_guidelines.md`](docs/design_guidelines.md).

---

## Tech stack

- **React 18 + TypeScript**
- **Vite** (build & dev server)
- **Tailwind CSS** + **shadcn/ui** (Radix primitives)
- **wouter** for routing (hash‑based, so deep links work on static hosting)
- **TanStack Query** for data fetching (resolved against in‑memory mock data)
- Deployed as a **static site** to **GitHub Pages** via GitHub Actions

There is intentionally **no server or database** — the original project was generated as a full‑stack app, then refactored into a pure front‑end so anyone can run it (or just open the live link) with zero setup.

---

## Run it locally

```bash
# Requires Node.js 20+
npm install
npm run dev      # start the dev server (printed URL)
```

Other scripts:

```bash
npm run build    # production build to ./dist
npm run preview  # preview the production build
npm run check    # TypeScript type-check
```

---

## Project structure

```
client/
  index.html
  src/
    components/        # UI + accessibility components
                       #   (ScreenReaderManager, VoiceCommandManager,
                       #    KeyboardShortcutsModal, LiveAnnouncer, …)
    contexts/          # AccessibilityContext, AuthContext
    hooks/             # use-voice-commands, use-screen-reader, …
    lib/
      mockApi.ts       # static, in-memory "API" (no server)
      queryClient.ts   # routes /api/* query keys to mockApi
      translations.ts  # EN / KA strings
    pages/             # Landing, Dashboard, Grades, Messages, …
shared/
  schema.ts            # plain TypeScript data types
  mockData.ts          # courses, schedule, grades (all fabricated)
docs/                  # presentation script + design guidelines
```

---

## A note on the data

The demo user is a **fictional "Demo Student"** with **fabricated grades and a sample timetable**. Course names and instructor names reflect the public GTU informatics catalogue and are used purely to make the demo feel realistic — no real student records, IDs, or personal information are included.

---

## Author

Built by **Taha bakri** as a Human‑Computer Interaction course project.
Released under the [MIT License](LICENSE) — feel free to learn from it, fork it, or build on it.
