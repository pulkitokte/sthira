// src/data/morningFlowTips.js
// Reusable Safety Tips / Common Mistakes / Beginner Notes, defined per
// category with an optional per-exercise override seam — same pattern
// as morningFlowGuidance.js, so future batches can extend either
// independently.

import { MORNING_FLOW_CATEGORY_IDS } from "./morningFlowCategories";

export const CATEGORY_TIPS = {
  [MORNING_FLOW_CATEGORY_IDS.WARM_UP]: {
    safetyTips: [
      "Stop if you feel any sharp or unusual pain",
      "Keep movements small until your body feels warmer",
    ],
    commonMistakes: [
      "Moving too quickly before the body has warmed up",
      "Holding tension in the shoulders throughout the movement",
    ],
    beginnerNotes: [
      "It's normal to feel a little stiff at first — that's exactly what this is for",
      "Smaller movements are perfectly fine when starting out",
    ],
  },
  [MORNING_FLOW_CATEGORY_IDS.MOBILITY]: {
    safetyTips: [
      "Never push a stretch into sharp pain",
      "Keep the supporting joints stable throughout the movement",
    ],
    commonMistakes: [
      "Rushing through the range of motion instead of moving slowly",
      "Holding your breath during the stretch",
    ],
    beginnerNotes: [
      "A smaller range of motion is completely fine when starting out",
      "Flexibility improves gradually — there's no need to force progress",
    ],
  },
  [MORNING_FLOW_CATEGORY_IDS.STRENGTH]: {
    safetyTips: [
      "Keep your core gently engaged to protect your lower back",
      "Stop if you feel joint pain rather than muscle effort",
    ],
    commonMistakes: [
      "Rushing the movement instead of controlling it",
      "Holding your breath instead of exhaling on effort",
    ],
    beginnerNotes: [
      "Quality of movement matters more than how many reps you complete",
      "It's okay to take a short pause between repetitions",
    ],
  },
  [MORNING_FLOW_CATEGORY_IDS.BALANCE]: {
    safetyTips: [
      "Keep a wall or chair nearby for light support if needed",
      "Stop if you feel dizzy or unstable",
    ],
    commonMistakes: [
      "Locking the standing knee instead of keeping it soft",
      "Staring at your feet instead of a fixed point ahead",
    ],
    beginnerNotes: [
      "Wobbling is completely normal — it means the muscles are working",
      "You can always hold onto something stable as you build confidence",
    ],
  },
  [MORNING_FLOW_CATEGORY_IDS.COOL_DOWN]: {
    safetyTips: [
      "Ease out of every stretch slowly, don't spring back suddenly",
      "A gentle pulling sensation is normal — sharp pain is not",
    ],
    commonMistakes: [
      "Bouncing in and out of the stretch instead of holding it steady",
      "Forcing a deeper stretch than feels comfortable",
    ],
    beginnerNotes: [
      "This is a good time to let your mind settle along with your body",
      "Holding a stretch a little less deeply is perfectly fine",
    ],
  },
};

export const EXERCISE_TIPS_OVERRIDES = {};

/**
 * Resolves { safetyTips, commonMistakes, beginnerNotes } for a given
 * exercise: an exercise-specific override if one exists, otherwise its
 * category's defaults.
 */
export function getTipsForExercise(exercise) {
  if (!exercise) return null;
  return (
    EXERCISE_TIPS_OVERRIDES[exercise.id] ??
    CATEGORY_TIPS[exercise.category] ??
    null
  );
}
