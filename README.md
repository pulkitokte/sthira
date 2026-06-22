<div align="center">
  <h1>🌿 Sthira</h1>
  <p><strong>A calm wellness and movement companion for students and focused individuals.</strong></p>
  <p>
    <a href="https://sthira.vercel.app">Live Demo</a> ·
    <a href="#features">Features</a> ·
    <a href="#setup">Setup</a> ·
    <a href="#deployment">Deployment</a>
  </p>
</div>

---

Sthira (Sanskrit: *steady, comfortable*) is a wellness companion built for
students, UPSC and competitive exam aspirants, and anyone who spends long
hours sitting and studying. It's built around one core habit — a few
minutes of morning movement — with gentle support for the body and mind
through the rest of the day.

This is **not** a fitness tracker. No calorie counts, no leaderboards, no
streak guilt. Just calm, consistent, low-friction daily wellness.

---

## ✨ Features

| Feature | Description |
|---|---|
| **Smart Onboarding** | Short, conversational setup capturing schedule, study habits, and wellness goals |
| **Morning Routine Library** | 12 guided routines across 5 categories with a timed, step-by-step player |
| **Study Break Recovery** | 12 self-paced sessions across 6 categories for posture, breathing, and focus resets |
| **Eye Recovery** | 12 timed sessions across 5 categories to ease digital eye strain |
| **Hydration Tracker** | Quick-log interface with daily goal, progress ring, and history |
| **Wellness Hub** | Daily 4-dimension check-in (energy, focus, stress, mood) with deterministic daily insight |
| **Progress Tracking** | Gentle streak system computed from completion history, never stored separately |
| **Completion History** | Unified, date-grouped timeline across all three activity types |
| **First-time Hints** | Dismissible contextual guidance on first use, stored per-hint in localStorage |
| **About Page** | Product philosophy, core pillars, and version information |

---

## 📸 Screenshots

> _Add screenshots before publishing. Suggested order:_

| | | |
|---|---|---|
| ![Onboarding](screenshots/01-onboarding.png) | ![Home](screenshots/02-home.png) | ![Morning Library](screenshots/03-library.png) |
| Onboarding | Home | Morning Library |
| ![Routine Player](screenshots/04-routine-player.png) | ![Study Break](screenshots/05-study-break.png) | ![Hydration](screenshots/06-hydration.png) |
| Routine Player | Study Break Recovery | Hydration |
| ![Eye Recovery](screenshots/07-eye-recovery.png) | ![Wellness](screenshots/08-wellness.png) | ![Desktop Frame](screenshots/09-desktop.png) |
| Eye Recovery | Wellness Hub | Desktop View |

---

## 🛠 Tech Stack

- **React 18** — UI framework
- **Vite** — build tool and dev server
- **Tailwind CSS** — utility-first styling
- **React Router v6** — client-side routing
- **lucide-react** — icon library
- **localStorage** — all persistence, no backend

> No backend. No database. No authentication. No API keys.
> Everything lives on the user's device.

---

## 🏗 Architecture Overview

Sthira follows a **content-driven, data-first** architecture. All
routines, recovery sessions, and eye sessions are structured data files
rendered by a small set of generic components — adding new content means
adding a data entry, never writing new components.

State is managed with React Context + `useLocalStorage`, scoped to each
feature domain (onboarding, progress, hydration, wellness, etc.) with
a shared storage-key convention (`sthira:*`). No external state library
was needed.

---

## 📁 Folder Structure