// src/utils/morningFlowMilestones.js
// Pure, presentation-only helper. Given the exercise index/total that
// the player already tracks (no new state), returns a tiny encouraging
// message at a handful of checkpoints, or null most of the time.

const MILESTONE_CHECKPOINTS = [
  { fraction: 0, message: "Nice beginning." },
  { fraction: 0.2, message: "You're warming up." },
  { fraction: 0.35, message: "Great rhythm." },
  { fraction: 0.5, message: "Halfway there." },
  { fraction: 0.7, message: "Keep going." },
  { fraction: 0.85, message: "Final stretch." },
];

export function getMilestoneMessage(currentIndex, totalExercises) {
  if (!totalExercises || totalExercises <= 1) return null;
  if (currentIndex === totalExercises - 1) return "Beautiful work.";

  for (const checkpoint of MILESTONE_CHECKPOINTS) {
    const targetIndex = Math.round(checkpoint.fraction * (totalExercises - 1));
    if (currentIndex === targetIndex) return checkpoint.message;
  }
  return null;
}
