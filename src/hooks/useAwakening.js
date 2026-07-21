// src/hooks/useAwakening.js
// Owns the awakening/growth stage sequence.
// Batch 80: now implemented via the shared useStageClock primitive.
// Return shape ({ stage, stageIndex, isComplete }) is unchanged —
// Awakening.jsx requires no changes.

import { useStageClock } from "./useStageClock";
import { AWAKENING_STAGES } from "../constants/firstBreath";

export function useAwakening({ isActive }) {
  return useStageClock(AWAKENING_STAGES, { isActive });
}
