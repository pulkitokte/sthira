// src/data/morningFlowGuidance.js
// Reusable coaching cue data for Morning Flow's Guidance System.
// Cues are defined per category (shared across every exercise in that
// category) with an optional per-exercise override map, so a future
// batch can give any specific exercise its own custom cues without
// touching this file's structure or the components that read it.
//
// Shape per exercise/category:
//   { preparation, movement, breathing, completion, encouragement }

import { MORNING_FLOW_CATEGORY_IDS } from "./morningFlowCategories";

export const CATEGORY_GUIDANCE = {
  [MORNING_FLOW_CATEGORY_IDS.WARM_UP]: {
    preparation: "Stand comfortably and let your shoulders soften.",
    movement: "Move slowly — there's no need to rush this.",
    breathing: "Breathe naturally as you move.",
    encouragement: "Halfway there. You're doing well.",
    completion: "Almost done — nice and easy to the end.",
  },
  [MORNING_FLOW_CATEGORY_IDS.MOBILITY]: {
    preparation: "Find a stable position before you begin.",
    movement: "Move within a range that feels comfortable.",
    breathing: "Let your breath guide the pace of the movement.",
    encouragement: "Halfway done. Keep it gentle.",
    completion: "Almost there — ease out slowly.",
  },
  [MORNING_FLOW_CATEGORY_IDS.STRENGTH]: {
    preparation: "Get into position and engage your core gently.",
    movement: "Keep your movements controlled, not rushed.",
    breathing: "Exhale on the effort, inhale as you release.",
    encouragement: "Halfway through — great job so far.",
    completion: "Almost there. Finish with control.",
  },
  [MORNING_FLOW_CATEGORY_IDS.BALANCE]: {
    preparation: "Find a fixed point ahead to help you steady yourself.",
    movement: "Small adjustments are normal — stay relaxed.",
    breathing: "Keep your breathing slow and even.",
    encouragement: "Halfway there. You're more stable than you think.",
    completion: "Almost done — stay steady to the end.",
  },
  [MORNING_FLOW_CATEGORY_IDS.COOL_DOWN]: {
    preparation: "Settle into the position without forcing anything.",
    movement: "Don't force the stretch — ease into it gently.",
    breathing: "Slow, deep breaths. Let your body soften.",
    encouragement: "Halfway there. Let go a little more.",
    completion: "Great job. Almost time to rest.",
  },
};

/**
 * Per-exercise cue overrides. Empty for now — this is the seam a future
 * batch would use to give a specific exercise (by id) its own cues
 * instead of the category default, without changing any component.
 */
export const EXERCISE_GUIDANCE_OVERRIDES = {};

/**
 * Resolves the full cue set for a given exercise: an exercise-specific
 * override if one exists, otherwise falling back to its category's cues.
 */
export function getGuidanceForExercise(exercise) {
  if (!exercise) return null;
  return (
    EXERCISE_GUIDANCE_OVERRIDES[exercise.id] ??
    CATEGORY_GUIDANCE[exercise.category] ??
    null
  );
}
