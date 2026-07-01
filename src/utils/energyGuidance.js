// src/utils/energyGuidance.js
// Derives energy state from today's existing wellness check-in.
// All business logic lives here. No new storage created.
// Reads sthira_wellness (or equivalent) in the same read-only pattern
// used by gentleStreaks.js and memoryTimeline.js.

// ── Energy state constants ────────────────────────────────────────────────────

export const ENERGY_STATES = {
  LOW: "low",
  MEDIUM: "medium",
  HIGH: "high",
  UNKNOWN: "unknown", // No check-in today
};

// ── Message banks (handcrafted, warm, pressure-free) ─────────────────────────

const MESSAGES = {
  [ENERGY_STATES.LOW]: [
    "Your body may be asking for gentleness today.",
    "Today does not need to be a big day.",
    "Rest can also be meaningful.",
    "Even small and slow counts.",
    "It is okay to simply be here without doing much.",
  ],
  [ENERGY_STATES.MEDIUM]: [
    "A gentle rhythm may feel supportive today.",
    "Small intentional moments are enough.",
    "A steady pace is its own kind of strength.",
    "Today has room for a few quiet moments.",
    "You do not need to push — just continue.",
  ],
  [ENERGY_STATES.HIGH]: [
    "You seem to have a little more energy available today.",
    "If it feels right, this could be a good moment to move.",
    "A little energy goes further than you think.",
    "Something satisfying might be waiting for you today.",
    "This kind of day can hold real progress — gently.",
  ],
  [ENERGY_STATES.UNKNOWN]: [
    "How are you arriving today?",
    "A quick check-in can help Sthira offer something supportive.",
    "Your day will shape itself more gently once you check in.",
  ],
};

// ── Recommended activities per state ─────────────────────────────────────────
// Each action maps to an existing PATHS key and display metadata.
// "pathKey" corresponds to the key name in PATHS (imported in the component).

export const ENERGY_ACTIONS = {
  [ENERGY_STATES.LOW]: [
    { label: "Mindful Breathing", pathKey: "BREATHING", emoji: "🌬️" },
    { label: "Calm Sounds", pathKey: "CALM_SOUNDS", emoji: "🎵" },
    { label: "Hydration", pathKey: "HYDRATION", emoji: "💧" },
    { label: "Sleep Wind-Down", pathKey: "SLEEP_WIND_DOWN", emoji: "🌙" },
  ],
  [ENERGY_STATES.MEDIUM]: [
    { label: "Study Break", pathKey: "RECOVERY_LIBRARY", emoji: "🧘" },
    { label: "Eye Recovery", pathKey: "EYE_RELAX", emoji: "👁️" },
    { label: "Gratitude Garden", pathKey: "GRATITUDE_GARDEN", emoji: "🌱" },
    { label: "Evening Reflection", pathKey: "EVENING_REFLECTION", emoji: "🌅" },
  ],
  [ENERGY_STATES.HIGH]: [
    { label: "Morning Routine", pathKey: "LIBRARY", emoji: "☀️" },
    { label: "Focus Session", pathKey: "FOCUS_SESSIONS", emoji: "🎯" },
    { label: "Gratitude Garden", pathKey: "GRATITUDE_GARDEN", emoji: "🌱" },
  ],
  [ENERGY_STATES.UNKNOWN]: [], // CTA handled separately in component
};

// ── Visual accent per state ───────────────────────────────────────────────────

export const ENERGY_ACCENTS = {
  [ENERGY_STATES.LOW]: {
    gradient:
      "linear-gradient(160deg, rgba(134,159,138,0.1) 0%, rgba(134,159,138,0.06) 100%)",
    border: "rgba(134,159,138,0.22)",
    pillBg: "rgba(134,159,138,0.12)",
    pillBorder: "rgba(134,159,138,0.28)",
    pillText: "#2a5a30",
    icon: "🌿",
    label: "Low energy today",
  },
  [ENERGY_STATES.MEDIUM]: {
    gradient:
      "linear-gradient(160deg, rgba(185,170,140,0.1) 0%, rgba(185,170,140,0.06) 100%)",
    border: "rgba(185,170,140,0.22)",
    pillBg: "rgba(185,170,140,0.12)",
    pillBorder: "rgba(185,170,140,0.28)",
    pillText: "#5a4a20",
    icon: "🌤️",
    label: "Steady energy today",
  },
  [ENERGY_STATES.HIGH]: {
    gradient:
      "linear-gradient(160deg, rgba(210,175,100,0.1) 0%, rgba(210,175,100,0.06) 100%)",
    border: "rgba(210,175,100,0.22)",
    pillBg: "rgba(210,175,100,0.12)",
    pillBorder: "rgba(210,175,100,0.28)",
    pillText: "#6a4a10",
    icon: "✨",
    label: "Good energy today",
  },
  [ENERGY_STATES.UNKNOWN]: {
    gradient:
      "linear-gradient(160deg, rgba(185,175,160,0.08) 0%, rgba(185,175,160,0.05) 100%)",
    border: "rgba(185,175,160,0.2)",
    pillBg: "rgba(185,175,160,0.1)",
    pillBorder: "rgba(185,175,160,0.22)",
    pillText: "#5a5040",
    icon: "🌱",
    label: "Check in to begin",
  },
};

// ── Safe localStorage reader ──────────────────────────────────────────────────

function safeRead(key) {
  try {
    const raw = localStorage.getItem(key);
    return raw ? JSON.parse(raw) : null;
  } catch (_) {
    return null;
  }
}

// ── Energy value extraction ───────────────────────────────────────────────────

/**
 * Read today's energy value from the existing wellness check-in data.
 * Tries the known wellness storage keys used by the app.
 * Returns a number 1–5 or null if no check-in exists for today.
 */
export function getTodayEnergyValue() {
  const today = new Date().toISOString().slice(0, 10);

  // Try all known key patterns used by the wellness context
  const candidates = ["sthira_wellness_data", "sthira_wellness"];

  for (const key of candidates) {
    const data = safeRead(key);
    if (!data) continue;

    // Handle array of entries
    if (Array.isArray(data)) {
      const entry = data.find((e) => e.date === today);
      if (entry?.energy != null) return Number(entry.energy);
    }

    // Handle object with entries array
    if (Array.isArray(data?.entries)) {
      const entry = data.entries.find((e) => e.date === today);
      if (entry?.energy != null) return Number(entry.energy);
    }

    // Handle object with today's date directly as a key
    if (data?.[today]?.energy != null) {
      return Number(data[today].energy);
    }
  }

  return null; // No check-in found for today
}

// ── State classification ──────────────────────────────────────────────────────

/**
 * Classify energy value (1–5) into ENERGY_STATES.
 * 1–2 → LOW, 3 → MEDIUM, 4–5 → HIGH, null → UNKNOWN
 */
export function classifyEnergy(energyValue) {
  if (energyValue === null || energyValue === undefined)
    return ENERGY_STATES.UNKNOWN;
  const val = Number(energyValue);
  if (val <= 2) return ENERGY_STATES.LOW;
  if (val === 3) return ENERGY_STATES.MEDIUM;
  return ENERGY_STATES.HIGH;
}

// ── Message selection ─────────────────────────────────────────────────────────

/**
 * Get today's message for a given energy state.
 * Deterministic — same date always returns same message.
 */
export function getEnergyMessage(state) {
  const pool = MESSAGES[state] ?? MESSAGES[ENERGY_STATES.UNKNOWN];
  const today = new Date().toISOString().slice(0, 10);
  const hash = today.split("").reduce((acc, ch) => acc + ch.charCodeAt(0), 0);
  return pool[hash % pool.length];
}

// ── Main entry point ──────────────────────────────────────────────────────────

/**
 * Build the complete energy guidance summary for the Home card.
 * Single entry point — Home.jsx calls only this.
 *
 * Returns:
 * {
 *   state:    ENERGY_STATES.*,
 *   message:  string,
 *   actions:  [{ label, pathKey, emoji }],
 *   accent:   { gradient, border, pillBg, pillBorder, pillText, icon, label },
 * }
 */
export function buildEnergyGuidance() {
  const energyValue = getTodayEnergyValue();
  const state = classifyEnergy(energyValue);
  const message = getEnergyMessage(state);
  const actions = ENERGY_ACTIONS[state] ?? [];
  const accent = ENERGY_ACCENTS[state];

  return { state, message, actions, accent };
}
