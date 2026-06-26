// src/data/dailyCheckInQuestions.js
// Question bank for the Daily Check-In feature.
// Each question has a set of options and per-option affirmations.
// Architecture supports future analytics, streaks, and insights.

export const dailyCheckInQuestions = [
  {
    id: "energy-today",
    question: "How is your energy today?",
    options: [
      {
        label: "Energized",
        affirmation: "Wonderful. Channel that energy gently.",
      },
      {
        label: "Steady",
        affirmation: "Steady is a great place to work from.",
      },
      {
        label: "Tired",
        affirmation: "A slower pace is still progress.",
      },
      {
        label: "Overwhelmed",
        affirmation: "One small thing at a time. That is enough.",
      },
    ],
  },
  {
    id: "arriving-today",
    question: "How are you arriving today?",
    options: [
      {
        label: "Calm",
        affirmation: "That calm is worth protecting today.",
      },
      {
        label: "Distracted",
        affirmation: "Noticing distraction is the first step through it.",
      },
      {
        label: "Anxious",
        affirmation:
          "You have navigated difficult days before. You will today too.",
      },
      {
        label: "Motivated",
        affirmation: "Let that motivation carry you — without rushing.",
      },
    ],
  },
  {
    id: "intention-today",
    question: "What is one intention for today?",
    options: [
      {
        label: "Stay focused",
        affirmation: "Focus comes in waves. Ride each one.",
      },
      {
        label: "Be gentle with myself",
        affirmation: "Gentleness is not weakness. It is wisdom.",
      },
      {
        label: "Make steady progress",
        affirmation: "Small steps compound quietly into big things.",
      },
      {
        label: "Rest and restore",
        affirmation: "Rest is part of the work, not a break from it.",
      },
    ],
  },
  {
    id: "supportive-today",
    question: "What would feel supportive today?",
    options: [
      {
        label: "A clear plan",
        affirmation: "Clarity makes everything feel more manageable.",
      },
      {
        label: "More breaks",
        affirmation: "Pausing is how you stay in the game longer.",
      },
      {
        label: "Some encouragement",
        affirmation: "You are doing more than you give yourself credit for.",
      },
      {
        label: "Quiet focus time",
        affirmation: "Protect that quiet. It is where your best work happens.",
      },
    ],
  },
  {
    id: "morning-feeling",
    question: "How does this morning feel?",
    options: [
      {
        label: "Fresh start",
        affirmation: "Every morning is a small gift. Use it well.",
      },
      {
        label: "Slow to begin",
        affirmation: "Slow mornings are allowed. Begin when you are ready.",
      },
      {
        label: "Already busy",
        affirmation: "A brief pause now will serve the rest of your day.",
      },
      {
        label: "Uncertain",
        affirmation:
          "Uncertainty is not a problem to solve — just a feeling to hold.",
      },
    ],
  },
  {
    id: "mind-state",
    question: "Where is your mind right now?",
    options: [
      {
        label: "Clear and ready",
        affirmation: "That clarity is a good foundation. Build on it.",
      },
      {
        label: "A little scattered",
        affirmation: "One breath, one task. That is all you need.",
      },
      {
        label: "Preoccupied",
        affirmation:
          "It is okay to carry things. Just try not to let them lead.",
      },
      {
        label: "Peaceful",
        affirmation: "Peaceful mornings are worth noticing. Notice this one.",
      },
    ],
  },
  {
    id: "body-today",
    question: "How does your body feel today?",
    options: [
      {
        label: "Light and good",
        affirmation: "Take care of what is working well.",
      },
      {
        label: "A bit tense",
        affirmation: "A few gentle stretches could help soften the day.",
      },
      {
        label: "Tired and heavy",
        affirmation: "Your body is asking for kindness today. Listen to it.",
      },
      {
        label: "Restless",
        affirmation: "A short walk or stretch might help settle the energy.",
      },
    ],
  },
  {
    id: "study-readiness",
    question: "How ready do you feel to study today?",
    options: [
      {
        label: "Very ready",
        affirmation:
          "Start with your most meaningful task while that readiness is fresh.",
      },
      {
        label: "Somewhat ready",
        affirmation: "Begin small. Momentum will follow.",
      },
      {
        label: "Not quite ready",
        affirmation:
          "A short routine can bridge the gap between here and ready.",
      },
      {
        label: "Dreading it",
        affirmation: "Even five minutes counts. Start there.",
      },
    ],
  },
  {
    id: "mood-check",
    question: "How would you describe your mood?",
    options: [
      {
        label: "Good",
        affirmation: "Carry that goodness into the day.",
      },
      {
        label: "Neutral",
        affirmation: "Neutral is steady. Steady is enough.",
      },
      {
        label: "Low",
        affirmation: "Low days pass. Be patient with yourself.",
      },
      {
        label: "Mixed",
        affirmation:
          "Mixed feelings are honest. You don't need to resolve them all.",
      },
    ],
  },
  {
    id: "one-word",
    question: "If today had a word, what would it be?",
    options: [
      {
        label: "Growth",
        affirmation: "Growth often feels quiet from the inside.",
      },
      {
        label: "Rest",
        affirmation: "Rest is productive. Let yourself have it.",
      },
      {
        label: "Effort",
        affirmation: "Effort, applied gently, moves mountains over time.",
      },
      {
        label: "Hope",
        affirmation: "Hope is a good compass for any day.",
      },
    ],
  },
];

/**
 * Total number of questions available.
 * Exported for use in streak/insights logic.
 */
export const TOTAL_CHECK_IN_QUESTIONS = dailyCheckInQuestions.length;
