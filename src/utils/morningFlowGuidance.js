// src/utils/morningFlowGuidance.js
// Pure helper that derives which guidance phase is active from the
// exercise's existing countdown values. No new timer, no new state —
// this only reads secondsLeft/durationSeconds that the player already
// computes, and returns a stable phase label.

export const GUIDANCE_PHASES = {
  PREPARATION: "preparation",
  MOVEMENT: "movement",
  BREATHING: "breathing",
  ENCOURAGEMENT: "encouragement",
  COMPLETION: "completion",
};

/**
 * Determines the current guidance phase from elapsed progress.
 * - First ~12% of the exercise: preparation cue
 * - Middle band around 45–58%: encouragement cue
 * - Final ~15%: completion cue
 * - Everything else alternates movement/breathing in quarter-duration
 *   segments, so the message changes a few times per exercise rather
 *   than every single second.
 */
export function getGuidancePhase(secondsLeft, totalSeconds) {
  if (!totalSeconds || totalSeconds <= 0) return GUIDANCE_PHASES.MOVEMENT;

  const elapsedFraction = 1 - secondsLeft / totalSeconds;

  if (elapsedFraction < 0.12) return GUIDANCE_PHASES.PREPARATION;
  if (elapsedFraction > 0.85) return GUIDANCE_PHASES.COMPLETION;
  if (elapsedFraction >= 0.45 && elapsedFraction <= 0.58) {
    return GUIDANCE_PHASES.ENCOURAGEMENT;
  }

  const segment = Math.floor(elapsedFraction * 4);
  return segment % 2 === 0
    ? GUIDANCE_PHASES.MOVEMENT
    : GUIDANCE_PHASES.BREATHING;
}
