// src/data/companionMessages.js
// 60+ handcrafted companion messages for Sthira.
// Warm, human, gentle, quiet. No toxic positivity. No hustle language.

export const COMPANION_CATEGORIES = {
  MORNING: "morning",
  LOW_ENERGY: "low-energy",
  HIGH_STRESS: "high-stress",
  EVENING: "evening",
  CELEBRATION: "celebration",
  REST: "rest",
  STUDY: "study",
  SELF_KINDNESS: "self-kindness",
  BEGINNING_AGAIN: "beginning-again",
  QUIET_JOY: "quiet-joy",
};

export const COMPANION_MESSAGES = [
  // ── Morning ───────────────────────────────────────────────────────────────
  {
    id: "m01",
    category: "morning",
    text: "A new day. You do not need to make it perfect — just show up.",
  },
  {
    id: "m02",
    category: "morning",
    text: "The morning is here, and so are you. That is already something.",
  },
  {
    id: "m03",
    category: "morning",
    text: "Begin slowly if you need to. The day has room for your pace.",
  },
  {
    id: "m04",
    category: "morning",
    text: "How are you arriving today? Whatever the answer — it is welcome here.",
  },
  {
    id: "m05",
    category: "morning",
    text: "You do not have to have it figured out by morning. Just begin.",
  },
  {
    id: "m06",
    category: "morning",
    text: "There is something in the act of beginning again each day that is quietly courageous.",
  },

  // ── Low energy ────────────────────────────────────────────────────────────
  {
    id: "l01",
    category: "low-energy",
    text: "Low energy is not the same as low worth. You still matter today.",
  },
  {
    id: "l02",
    category: "low-energy",
    text: "A slow day is still a day. Something is still happening, even now.",
  },
  {
    id: "l03",
    category: "low-energy",
    text: "Rest without guilt is a skill worth practising. Today might be that practice.",
  },
  {
    id: "l04",
    category: "low-energy",
    text: "When energy is low, the kindest thing is often the smallest next thing.",
  },
  {
    id: "l05",
    category: "low-energy",
    text: "You do not have to produce anything to deserve care today.",
  },
  {
    id: "l06",
    category: "low-energy",
    text: "Tired is information, not failure. What is your body trying to tell you?",
  },

  // ── High stress ───────────────────────────────────────────────────────────
  {
    id: "s01",
    category: "high-stress",
    text: "You do not need to carry everything at once. What can you set down?",
  },
  {
    id: "s02",
    category: "high-stress",
    text: "Stress is a signal, not a sentence. It will not feel like this forever.",
  },
  {
    id: "s03",
    category: "high-stress",
    text: "Three slow breaths will not solve everything. They will help you begin to.",
  },
  {
    id: "s04",
    category: "high-stress",
    text: "When everything feels urgent, almost nothing actually is. One thing at a time.",
  },
  {
    id: "s05",
    category: "high-stress",
    text: "You have navigated difficult days before. This is one more of those.",
  },
  {
    id: "s06",
    category: "high-stress",
    text: "The overwhelm you are feeling is real. And it is also temporary.",
  },

  // ── Evening reflection ────────────────────────────────────────────────────
  {
    id: "e01",
    category: "evening",
    text: "The day is closing. You made it through. That is worth acknowledging.",
  },
  {
    id: "e02",
    category: "evening",
    text: "Rest is coming. You do not have to solve anything more tonight.",
  },
  {
    id: "e03",
    category: "evening",
    text: "Whatever happened today, tomorrow is a different page entirely.",
  },
  {
    id: "e04",
    category: "evening",
    text: "Evening is for letting go — of tasks, of worries, of the need to do more.",
  },
  {
    id: "e05",
    category: "evening",
    text: "You showed up today. In whatever form that took — it counted.",
  },
  {
    id: "e06",
    category: "evening",
    text: "The night ahead is full of rest. Let it do its work on you.",
  },

  // ── Consistency celebration ───────────────────────────────────────────────
  {
    id: "c01",
    category: "celebration",
    text: "You have been showing up. That is not nothing — that is everything.",
  },
  {
    id: "c02",
    category: "celebration",
    text: "Something quiet and consistent is happening. Notice it.",
  },
  {
    id: "c03",
    category: "celebration",
    text: "Returning, again and again, is its own form of strength.",
  },
  {
    id: "c04",
    category: "celebration",
    text: "You are building something — slowly, day by day. Keep going gently.",
  },
  {
    id: "c05",
    category: "celebration",
    text: "The small things you do regularly are compounding quietly in your favour.",
  },
  {
    id: "c06",
    category: "celebration",
    text: "Consistency is not glamorous. But it is where all real change lives.",
  },

  // ── Rest reminders ────────────────────────────────────────────────────────
  {
    id: "r01",
    category: "rest",
    text: "Resting is not falling behind. It is part of the work.",
  },
  {
    id: "r02",
    category: "rest",
    text: "You are allowed to stop. Not because you have earned it — just because you need it.",
  },
  {
    id: "r03",
    category: "rest",
    text: "Rest is productive. The part of you that resists this — notice it gently.",
  },
  {
    id: "r04",
    category: "rest",
    text: "A pause is not a failure. It is a recalibration.",
  },
  {
    id: "r05",
    category: "rest",
    text: "Even the most focused minds need to not-think for a while.",
  },
  {
    id: "r06",
    category: "rest",
    text: "Sleep, rest, stillness — these are not rewards. They are requirements.",
  },

  // ── Study overwhelm ───────────────────────────────────────────────────────
  {
    id: "st01",
    category: "study",
    text: "Small steps still move you forward. One paragraph. One page. One minute.",
  },
  {
    id: "st02",
    category: "study",
    text: "You do not have to finish everything today. You just have to begin.",
  },
  {
    id: "st03",
    category: "study",
    text: "The pressure you feel is real. The mountain is also real. But so is your ability to climb it slowly.",
  },
  {
    id: "st04",
    category: "study",
    text: "A break now is not giving up. It is keeping yourself in the game.",
  },
  {
    id: "st05",
    category: "study",
    text: "You are building knowledge slowly. That is how it actually works — not in a day.",
  },
  {
    id: "st06",
    category: "study",
    text: "Being a student is hard. Not knowing things yet is the whole point.",
  },

  // ── Self-kindness ─────────────────────────────────────────────────────────
  {
    id: "k01",
    category: "self-kindness",
    text: "You are allowed to be imperfect and still worthy of your own care.",
  },
  {
    id: "k02",
    category: "self-kindness",
    text: "What would you say to someone you love who was struggling the way you are?",
  },
  {
    id: "k03",
    category: "self-kindness",
    text: "You deserve the same patience you would give a good friend.",
  },
  {
    id: "k04",
    category: "self-kindness",
    text: "Being hard on yourself rarely helps. Being kind to yourself usually does.",
  },
  {
    id: "k05",
    category: "self-kindness",
    text: "You are not behind. You are where you are, and that is the real starting point.",
  },
  {
    id: "k06",
    category: "self-kindness",
    text: "Speak to yourself the way you would speak to someone whose wellbeing matters to you.",
  },

  // ── Beginning again ───────────────────────────────────────────────────────
  {
    id: "b01",
    category: "beginning-again",
    text: "You are allowed to begin again today. As many times as you need.",
  },
  {
    id: "b02",
    category: "beginning-again",
    text: "Starting over is not failure — it is just a later starting point.",
  },
  {
    id: "b03",
    category: "beginning-again",
    text: "The fact that you are trying again says something important about who you are.",
  },
  {
    id: "b04",
    category: "beginning-again",
    text: "There is no rule that says today cannot be a fresh beginning.",
  },
  {
    id: "b05",
    category: "beginning-again",
    text: "Every time you return is evidence that you have not given up. Notice that.",
  },
  {
    id: "b06",
    category: "beginning-again",
    text: "Beginning again is not weakness. It is the most honest form of progress.",
  },

  // ── Quiet joy ─────────────────────────────────────────────────────────────
  {
    id: "q01",
    category: "quiet-joy",
    text: "There is something small worth noticing today. It is there if you look.",
  },
  {
    id: "q02",
    category: "quiet-joy",
    text: "Not every good thing announces itself. Some arrive quietly.",
  },
  {
    id: "q03",
    category: "quiet-joy",
    text: "Ordinary days, tended with care, become something meaningful over time.",
  },
  {
    id: "q04",
    category: "quiet-joy",
    text: "You are allowed to feel good about small things. They are not small.",
  },
  {
    id: "q05",
    category: "quiet-joy",
    text: "Stillness has its own kind of richness. You can settle into it.",
  },
  {
    id: "q06",
    category: "quiet-joy",
    text: "Something is going quietly right. It might not be visible yet — but it is there.",
  },
  {
    id: "q07",
    category: "quiet-joy",
    text: "A warm drink. A window. A moment that belongs entirely to you.",
  },
  {
    id: "q08",
    category: "quiet-joy",
    text: "The simplest things, attended to fully, carry more meaning than you expect.",
  },
];

/**
 * Get messages for a specific category.
 */
export function getMessagesByCategory(category) {
  return COMPANION_MESSAGES.filter((m) => m.category === category);
}

/**
 * Get a message by id.
 */
export function getMessageById(id) {
  return COMPANION_MESSAGES.find((m) => m.id === id) ?? null;
}
