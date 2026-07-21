// src/hooks/useArrival.js
// Owns the arrival stage sequence (settle, transforming).
// Batch 80: now implemented via the shared useStageClock primitive.
// Return shape ({ stage, stageIndex, isComplete }) is unchanged —
// Arrival.jsx's stage/isComplete usage requires no changes.

import { useStageClock } from "./useStageClock";
import { ARRIVAL_STAGES } from "../constants/firstBreath";

export function useArrival({ isActive }) {
  return useStageClock(ARRIVAL_STAGES, { isActive });
}
