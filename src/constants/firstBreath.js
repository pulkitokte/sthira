// src/constants/firstBreath.js
// Phase 4: added AWAKENING_STAGES, consumed by useAwakening +
// SproutIllustration. FIRST_BREATH_STEPS and BREATH_PHASES unchanged
// from Phase 3.

export const FIRST_BREATH_STORAGE_KEY = "sthira_first_breath_complete";

export const SPLASH_DURATION_MS = 900;

export const FIRST_BREATH_STEPS = [
  {
    id: "arrive",
    text: "Everything begins...\nwith one small step.",
    revealDelayMs: 1800,
  },
];

export const BREATH_PHASES = [
  { id: "inhale", label: "Breathe in...", durationMs: 4000, scale: 1.18 },
  { id: "hold", label: "Just be here.", durationMs: 2200, scale: 1.18 },
  { id: "exhale", label: "Let go.", durationMs: 5000, scale: 1 },
];

// The Awakening: a brief silent rest, then the seed softens, cracks,
// sprouts, and unfurls two small leaves. Stops there — no further
// growth in this phase. "resting" has no visible change of its own;
// it exists purely to hold a quiet pause before anything happens, per
// "no movement, silence, then...".
export const AWAKENING_STAGES = [
  { id: "resting", durationMs: 1400 },
  { id: "softening", durationMs: 1200 },
  { id: "cracking", durationMs: 900 },
  { id: "sprouting", durationMs: 1800 },
  { id: "leaves", durationMs: 1400 },
];

export const AWAKENING_MESSAGE_DELAY_MS = 900;