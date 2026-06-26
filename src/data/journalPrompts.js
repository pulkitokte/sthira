// src/data/journalPrompts.js
// Optional reflection prompts shown in the journal editor.
// Rotated daily so the experience feels fresh each time.

export const MOOD_OPTIONS = [
  {
    id: "peaceful",
    label: "Peaceful",
    color: "rgba(120, 160, 140, 1)",
    bg: "rgba(120, 160, 140, 0.12)",
    border: "rgba(120, 160, 140, 0.35)",
  },
  {
    id: "good",
    label: "Good",
    color: "rgba(134, 159, 138, 1)",
    bg: "rgba(134, 159, 138, 0.12)",
    border: "rgba(134, 159, 138, 0.35)",
  },
  {
    id: "neutral",
    label: "Neutral",
    color: "rgba(160, 150, 130, 1)",
    bg: "rgba(160, 150, 130, 0.12)",
    border: "rgba(160, 150, 130, 0.35)",
  },
  {
    id: "low",
    label: "Low",
    color: "rgba(150, 130, 110, 1)",
    bg: "rgba(150, 130, 110, 0.12)",
    border: "rgba(150, 130, 110, 0.35)",
  },
  {
    id: "stressed",
    label: "Stressed",
    color: "rgba(170, 120, 100, 1)",
    bg: "rgba(170, 120, 100, 0.12)",
    border: "rgba(170, 120, 100, 0.35)",
  },
];

export const JOURNAL_PROMPTS = [
  "What felt meaningful today?",
  "What challenged you today?",
  "What are you grateful for?",
  "What would you like to remember?",
  "What did you learn about yourself today?",
  "What felt heavy, and what felt light?",
  "What is one thing you did well today?",
  "What do you need more of right now?",
  "What are you looking forward to?",
  "What would you tell yourself from this morning?",
];

/**
 * Returns a prompt for a given date string.
 * Deterministic — same date always returns the same prompt.
 */
export function getPromptForDate(dateKey) {
  const hash = dateKey.split("").reduce((acc, ch) => acc + ch.charCodeAt(0), 0);
  return JOURNAL_PROMPTS[hash % JOURNAL_PROMPTS.length];
}

/**
 * Find a mood option by id.
 */
export function getMoodById(id) {
  return MOOD_OPTIONS.find((m) => m.id === id) ?? MOOD_OPTIONS[2];
}
