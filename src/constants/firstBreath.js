// src/constants/firstBreath.js
// Phase 5: added ARRIVAL_STAGES + ARRIVAL_MESSAGE_DELAY_MS, consumed by
// useArrival + Arrival.jsx. Everything else unchanged from Phase 4.

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

export const AWAKENING_STAGES = [
  { id: "resting", durationMs: 1400 },
  { id: "softening", durationMs: 1200 },
  { id: "cracking", durationMs: 900 },
  { id: "sprouting", durationMs: 1800 },
  { id: "leaves", durationMs: 1400 },
];

export const AWAKENING_MESSAGE_DELAY_MS = 900;

// Arrival: a brief pause with the finished sprout still visible, then a
// slow crossfade into the real Sthira logo. "settle" holds the pause;
// "transforming" is the crossfade window itself.
export const ARRIVAL_STAGES = [
  { id: "settle", durationMs: 1600 },
  { id: "transforming", durationMs: 1800 },
];

export const ARRIVAL_MESSAGE_DELAY_MS = 700;