// src/hooks/useBreathingRitual.js
// Owns the breathing phase sequence (inhale, hold, exhale).
// Batch 80: now implemented via the shared useStageClock primitive
// instead of its own duplicate timer logic. Public return shape
// ({ phase, phaseIndex, isComplete }) is unchanged — BreathingRitual.jsx
// requires no changes.

import { useStageClock } from "./useStageClock";
import { BREATH_PHASES } from "../constants/firstBreath";

export function useBreathingRitual({ isActive }) {
  const { stage, stageIndex, isComplete } = useStageClock(BREATH_PHASES, {
    isActive,
  });

  return {
    phase: stage,
    phaseIndex: stageIndex,
    isComplete,
  };
}
