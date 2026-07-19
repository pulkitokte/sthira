// src/constants/firstBreath.js
// Phase 2: step content and reveal timing updated per "The Living Seed"
// experience. revealDelayMs is new — the pause before each step's
// message fades in, matching "allow a short pause before anything else
// happens." Shape otherwise unchanged from Phase 1; no component needed
// to change to support this field, since FirstBreath.jsx (also updated
// this batch) is the only consumer.

export const FIRST_BREATH_STORAGE_KEY = "sthira_first_breath_complete";

export const SPLASH_DURATION_MS = 900;

export const FIRST_BREATH_STEPS = [
  {
    id: "arrive",
    text: "Everything begins...\nwith one small step.",
    revealDelayMs: 1800,
  },
  {
    id: "pause",
    text: "Take a moment before you begin.",
    revealDelayMs: 400,
  },
  {
    id: "enter",
    text: "Let's begin.",
    revealDelayMs: 400,
  },
];
