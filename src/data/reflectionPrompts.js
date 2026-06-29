// src/data/reflectionPrompts.js
// 40+ handcrafted gentle reflection prompts for the Memory Timeline.
// Warm, introspective, non-clinical. No pressure. No productivity language.

export const REFLECTION_PROMPTS = [
  "What has changed quietly within you recently?",
  "What would you like to thank your past self for?",
  "Which moment from your recent journey are you most glad you captured?",
  "What did a difficult day teach you that a good day could not?",
  "What would you want to remember about this season of your life?",
  "What have you been gentler about with yourself lately?",
  "Is there something you started recently that deserves more credit than you have given it?",
  "What has grown slowly and steadily without you always noticing?",
  "What small thing has brought you unexpected comfort?",
  "Looking back, what do you know now that you did not know then?",
  "What has stayed constant for you, even when everything else felt uncertain?",
  "Is there a moment from the past few months you would want to revisit?",
  "What has been harder than you expected — and what does that say about your courage in facing it?",
  "What would you tell yourself from three months ago?",
  "Which ordinary day turned out to be more meaningful than it seemed at the time?",
  "What has this season asked of you that you did not know you had?",
  "What are you carrying now that you did not carry before?",
  "What have you let go of — even a little — that made space for something better?",
  "Where do you see patience in yourself that was not there before?",
  "What have you learned about what you actually need versus what you thought you needed?",
  "Which difficult feeling, looking back, turned out to be useful information?",
  "What is one thing you kept showing up for even when it was hard?",
  "What moments of quiet joy have you collected recently?",
  "Is there something you forgave yourself for, even quietly?",
  "What has surprised you most about yourself recently?",
  "Looking at your entries, what patterns do you notice — and what do they mean?",
  "What does your past self deserve to hear from who you are now?",
  "Which entry, reading it again, feels most like the real you?",
  "What have you been braver about than you usually give yourself credit for?",
  "What would you want to tell someone going through what you went through?",
  "What have you started caring less about — and is that a loss or a relief?",
  "What has this year been quietly teaching you?",
  "What have you nurtured in yourself recently?",
  "Where do you see the most growth — and does it feel like growth from the inside?",
  "What has been waiting patiently for your attention?",
  "What small habit or practice has meant more than its size suggests?",
  "What does the arc of your entries tell you about where you have been?",
  "What are you most at peace with, right now, that once troubled you?",
  "What does this collection of moments say about who you are becoming?",
  "What do you want to carry forward into the next season?",
  "What have you learned about rest that you could not have learned any other way?",
  "Is there a version of yourself from the past few months that you are proud of?",
];

/**
 * Get a deterministic prompt for a given date key (YYYY-MM-DD).
 * Same date always returns same prompt.
 */
export function getPromptForDate(dateKey) {
  const hash = dateKey.split("").reduce((acc, ch) => acc + ch.charCodeAt(0), 0);
  return REFLECTION_PROMPTS[hash % REFLECTION_PROMPTS.length];
}

/**
 * Get a random prompt, avoiding the last shown one.
 */
export function getRandomPrompt(excludeIndex = -1) {
  const pool = REFLECTION_PROMPTS.filter((_, i) => i !== excludeIndex);
  return {
    text: pool[Math.floor(Math.random() * pool.length)],
    index: REFLECTION_PROMPTS.indexOf(
      pool[Math.floor(Math.random() * pool.length)],
    ),
  };
}
