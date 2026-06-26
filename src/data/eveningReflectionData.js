// src/data/eveningReflectionData.js
// Constants and data definitions for the Evening Reflection feature.

export const REFLECTION_MOODS = [
  {
    id: "peaceful",
    label: "Peaceful",
    color: "rgba(120, 160, 140, 1)",
    bg: "rgba(120, 160, 140, 0.12)",
    border: "rgba(120, 160, 140, 0.35)",
  },
  {
    id: "grateful",
    label: "Grateful",
    color: "rgba(134, 159, 138, 1)",
    bg: "rgba(134, 159, 138, 0.12)",
    border: "rgba(134, 159, 138, 0.35)",
  },
  {
    id: "tired",
    label: "Tired",
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
  {
    id: "hopeful",
    label: "Hopeful",
    color: "rgba(120, 140, 175, 1)",
    bg: "rgba(120, 140, 175, 0.12)",
    border: "rgba(120, 140, 175, 0.35)",
  },
];

export const REFLECTION_QUESTIONS = [
  {
    id: "wentWell",
    question: "What went well today?",
    placeholder: "Even small things count…",
  },
  {
    id: "difficult",
    question: "What felt difficult today?",
    placeholder: "There is no wrong answer here…",
  },
  {
    id: "tomorrowIntention",
    question: "What is one thing you want to carry into tomorrow?",
    placeholder: "A feeling, a thought, an intention…",
  },
];

// Gentle closing messages shown on the completion screen.
// Rotated randomly.
export const CLOSING_MESSAGES = [
  {
    heading: "Rest well.",
    body: "You showed up today. That is always enough.",
  },
  {
    heading: "A good day's end.",
    body: "Whatever today held, you made it through.",
  },
  {
    heading: "Well done.",
    body: "Pausing to reflect is a quiet act of care for yourself.",
  },
  {
    heading: "Gently done.",
    body: "Tomorrow is a fresh beginning. Rest into that.",
  },
  {
    heading: "Thank you.",
    body: "Taking a few moments for yourself matters more than it seems.",
  },
];

/**
 * Returns a mood object by id, or null if not found.
 */
export function getReflectionMoodById(id) {
  return REFLECTION_MOODS.find((m) => m.id === id) ?? null;
}
