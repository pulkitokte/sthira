export const FOCUS_SESSIONS = [
  {
    id: "gentle-focus-15",
    title: "Gentle Focus",
    duration: 15,
    description: "A short, easy session to ease into focused work.",
  },
  {
    id: "deep-focus-25",
    title: "Deep Focus",
    duration: 25,
    description: "A steady block for reading, revision, or writing.",
  },
  {
    id: "study-block-45",
    title: "Study Block",
    duration: 45,
    description: "A fuller session for topics that need sustained attention.",
  },
  {
    id: "long-session-60",
    title: "Long Session",
    duration: 60,
    description: "Space for deep work, practice problems, or extended reading.",
  },
];

export const FOCUS_INTENTIONS = [
  { id: "revision", label: "Revision" },
  { id: "reading", label: "Reading" },
  { id: "writing", label: "Writing" },
  { id: "practice", label: "Practice Questions" },
  { id: "reflection", label: "Reflection" },
];

export const CALM_MESSAGES = [
  "One page at a time.",
  "Return gently to the task.",
  "Presence matters more than perfection.",
  "You are doing enough.",
  "Each moment of focus adds up.",
  "Breathe, then continue.",
  "This session belongs only to you.",
  "Slow is still progress.",
  "Notice, then return.",
  "You showed up. That is the hardest part.",
  "Deep work begins with stillness.",
  "There is no rush inside this session.",
];

export function getFocusSessionById(id) {
  return FOCUS_SESSIONS.find((s) => s.id === id) ?? null;
}
