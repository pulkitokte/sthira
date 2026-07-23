// src/constants/firstBreath.js
// Redesigned: The First Breath is now a fully automatic, non-interactive
// growth animation. FIRST_BREATH_STEPS, BREATH_PHASES, AWAKENING_STAGES,
// and ARRIVAL_STAGES (all tied to the previous interactive flow) are
// removed, replaced by a single timeline.

export const FIRST_BREATH_STORAGE_KEY = "sthira_first_breath_complete";

export const SPLASH_DURATION_MS = 900;

// Single automatic timeline. Each entry's atMs is the absolute time (ms
// since mount) at which that visual stage begins. No user input affects
// this in any way.
export const FIRST_BREATH_TIMELINE = [
  { id: "seed", atMs: 300 },
  { id: "root", atMs: 1200 },
  { id: "sprout", atMs: 2200 },
  { id: "leaves", atMs: 3000 },
  { id: "logo", atMs: 4000 },
];

// Total experience length before automatically navigating Home.
export const FIRST_BREATH_TOTAL_MS = 4800;