// src/data/breathingSessions.js
// Breathing session definitions for Sthira
// All durations in seconds

export const BREATHING_PHASES = {
  INHALE: "inhale",
  HOLD: "hold",
  EXHALE: "exhale",
  REST: "rest",
};

export const breathingSessions = [
  {
    id: "quick-calm",
    title: "Quick Calm",
    subtitle: "1 minute · Anytime reset",
    description:
      "A fast, gentle reset for moments when you need to pause and recenter. Works well between tasks or when attention starts to drift.",
    totalMinutes: 1,
    inhale: 4,
    hold: 0,
    exhale: 4,
    rest: 0,
    color: "sage",
  },
  {
    id: "box-breathing",
    title: "Box Breathing",
    subtitle: "3 minutes · Steady focus",
    description:
      "Equal counts of inhale, hold, exhale, and rest create a balanced rhythm. Used by many people to stabilize attention before important work.",
    totalMinutes: 3,
    inhale: 4,
    hold: 4,
    exhale: 4,
    rest: 4,
    color: "warm",
  },
  {
    id: "deep-reset",
    title: "Deep Reset",
    subtitle: "5 minutes · Full reset",
    description:
      "A longer exhale than inhale signals safety to your nervous system. Helpful when you feel wound up or have been working intensely for a while.",
    totalMinutes: 5,
    inhale: 4,
    hold: 2,
    exhale: 6,
    rest: 2,
    color: "blue",
  },
  {
    id: "study-stress",
    title: "Study Stress Reset",
    subtitle: "5 minutes · Exam pressure relief",
    description:
      "Designed for moments of exam pressure or mental overload. The extended exhale and gentle rest help release tension that builds during long study sessions.",
    totalMinutes: 5,
    inhale: 4,
    hold: 4,
    exhale: 8,
    rest: 0,
    color: "sage",
  },
  {
    id: "evening-unwind",
    title: "Evening Unwind",
    subtitle: "7 minutes · End of day",
    description:
      "A slow, spacious pattern to close out the day. Longer exhales and restful pauses ease the transition from thinking mode to rest.",
    totalMinutes: 7,
    inhale: 4,
    hold: 2,
    exhale: 8,
    rest: 4,
    color: "warm",
  },
];

export const SUPPORTIVE_MESSAGES = [
  "Return gently to your breath.",
  "Nothing else is required right now.",
  "A few calm breaths can change the moment.",
  "There is nowhere else you need to be.",
  "Let each breath arrive in its own time.",
  "You are doing enough.",
  "This moment is complete as it is.",
  "Breathe. Everything else can wait.",
  "Softness is a form of strength.",
  "Each exhale is a small release.",
];

export const COMPLETION_MESSAGES = [
  {
    heading: "Well done.",
    body: "Thank you for taking a moment for yourself.",
  },
  {
    heading: "That was enough.",
    body: "Small pauses restore energy in ways we often underestimate.",
  },
  {
    heading: "Nicely done.",
    body: "A few minutes of calm is a generous gift to give yourself.",
  },
  {
    heading: "You paused. That matters.",
    body: "Rest is not a break from progress — it is part of it.",
  },
];
