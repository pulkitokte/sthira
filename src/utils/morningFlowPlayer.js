// src/utils/morningFlowPlayer.js
// Pure helpers for the Morning Flow player. No state, no side effects.

import { MORNING_FLOW_CATEGORIES } from "../data/morningFlowCategories";
import { getExercisesByCategory } from "../data/morningFlowExercises";

/**
 * Flattens every category's exercises into one ordered list, in category
 * order, with each exercise annotated with its category's display label.
 * This is the single source of truth for exercise ordering in the player.
 */
export function buildFlatExerciseList() {
  return MORNING_FLOW_CATEGORIES.flatMap((category) =>
    getExercisesByCategory(category.id).map((exercise) => ({
      ...exercise,
      categoryLabel: category.label,
    })),
  );
}

/**
 * Best-effort parse of a duration label (e.g. "30 sec", "1 min",
 * "30 sec per side") into a number of seconds. Falls back to 30s for any
 * unrecognized format — this is only used for a display estimate, never
 * for real timing.
 */
export function parseDurationToSeconds(durationLabel) {
  if (!durationLabel) return 30;
  const match = durationLabel.match(/(\d+)\s*(sec|min)/i);
  if (!match) return 30;
  const value = parseInt(match[1], 10);
  const unit = match[2].toLowerCase();
  return unit === "min" ? value * 60 : value;
}

/**
 * Formats a total seconds count into a friendly display string.
 */
export function formatEstimatedTime(totalSeconds) {
  const minutes = Math.round(totalSeconds / 60);
  if (minutes < 1) return "Under 1 min";
  return `${minutes} min`;
}
