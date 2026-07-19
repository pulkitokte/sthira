// src/constants/firstBreath.js
// Phase 3: FIRST_BREATH_STEPS trimmed to a single opening-message step —
// the old "pause"/"enter" text steps are now replaced by the actual
// Breathing Ritual, which follows the opening message. Added
// BREATH_PHASES, consumed by useBreathingRitual + SeedIllustration +
// BreathCircle.

export const FIRST_BREATH_STORAGE_KEY = "sthira_first_breath_complete";

export const SPLASH_DURATION_MS = 900;

export const FIRST_BREATH_STEPS = [
  {
    id: "arrive",
    text: "Everything begins...\nwith one small step.",
    revealDelayMs: 1800,
  },
];

// One full breath: inhale, a brief hold, a longer exhale (exhale is
// intentionally the longest phase — this is the natural shape of a
// physiologically calming breath, not an arbitrary choice). Runs
// exactly once, ~11 seconds total, never repeats.
export const BREATH_PHASES = [
  { id: "inhale", label: "Breathe in...", durationMs: 4000, scale: 1.18 },
  { id: "hold", label: "Just be here.", durationMs: 2200, scale: 1.18 },
  { id: "exhale", label: "Let go.", durationMs: 5000, scale: 1 },
];