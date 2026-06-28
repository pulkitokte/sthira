// src/data/lettersData.js
// Constants and data definitions for the Letters to Self feature.

export const LETTER_MOODS = [
  {
    id: "hopeful",
    label: "Hopeful",
    color: "rgba(134, 159, 138, 1)",
    bg: "rgba(134, 159, 138, 0.12)",
    border: "rgba(134, 159, 138, 0.3)",
  },
  {
    id: "calm",
    label: "Calm",
    color: "rgba(120, 150, 175, 1)",
    bg: "rgba(120, 150, 175, 0.12)",
    border: "rgba(120, 150, 175, 0.3)",
  },
  {
    id: "grateful",
    label: "Grateful",
    color: "rgba(185, 155, 90, 1)",
    bg: "rgba(185, 155, 90, 0.12)",
    border: "rgba(185, 155, 90, 0.3)",
  },
  {
    id: "tired",
    label: "Tired",
    color: "rgba(150, 130, 110, 1)",
    bg: "rgba(150, 130, 110, 0.12)",
    border: "rgba(150, 130, 110, 0.3)",
  },
  {
    id: "courageous",
    label: "Courageous",
    color: "rgba(170, 120, 80, 1)",
    bg: "rgba(170, 120, 80, 0.12)",
    border: "rgba(170, 120, 80, 0.3)",
  },
  {
    id: "unsure",
    label: "Unsure",
    color: "rgba(140, 130, 155, 1)",
    bg: "rgba(140, 130, 155, 0.12)",
    border: "rgba(140, 130, 155, 0.3)",
  },
];

export const DELIVERY_TYPES = {
  ANYTIME: "anytime",
  LATER: "later",
};

/**
 * Get a mood object by id. Falls back to null if not found.
 */
export function getLetterMoodById(id) {
  return LETTER_MOODS.find((m) => m.id === id) ?? null;
}

/**
 * Gentle placeholder prompts shown in the letter body textarea.
 * Rotated by day so the experience feels fresh.
 */
export const LETTER_PROMPTS = [
  "Dear future me, I want you to know…",
  "To myself, on a difficult day…",
  "I am writing this because I want to remember…",
  "Something I hope you have not forgotten…",
  "Right now, I am feeling…",
  "A reminder for when things feel heavy…",
  "I want to tell you something kind…",
  "Here is what I hope for you…",
];

export function getLetterPromptForDate(dateKey) {
  const hash = dateKey.split("").reduce((acc, ch) => acc + ch.charCodeAt(0), 0);
  return LETTER_PROMPTS[hash % LETTER_PROMPTS.length];
}
