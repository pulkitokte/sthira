// src/constants/firstBreath.js
// The First Breath — rebuilt from scratch. One flat timeline, no
// interactive stage systems, no multi-hook architecture.

export const FIRST_BREATH_STORAGE_KEY = "sthira_first_breath_complete";

export const SPLASH_DURATION_MS = 900;

// Each entry's atMs is the absolute time (ms since mount) the stage
// begins. This is the single source of timing truth for the entire
// intro — nothing else in the app schedules anything related to it.
export const INTRO_TIMELINE = [
  { id: "seed", atMs: 200 },
  { id: "root", atMs: 1100 },
  { id: "sprout", atMs: 2000 },
  { id: "leaves", atMs: 2800 },
  { id: "logo", atMs: 3700 },
];

export const INTRO_TOTAL_MS = 4500;
