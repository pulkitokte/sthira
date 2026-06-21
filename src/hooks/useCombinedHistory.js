import { useMemo } from "react";
import { useProgress } from "../context/ProgressContext";
import { useRecoveryProgress } from "../context/RecoveryProgressContext";
import { useEyeRecoveryProgress } from "../context/EyeRecoveryProgressContext";
import {
  normalizeRoutineCompletions,
  normalizeRecoveryCompletions,
  normalizeEyeCompletions,
  groupActivitiesByDate,
} from "../utils/activity";

/**
 * Reads from the three existing progress contexts and merges them into
 * one chronological, date-grouped list. No new storage, no logic moved —
 * purely a presentational combination of data that already exists.
 */
export function useCombinedHistory(limit) {
  const { completions: routineCompletions } = useProgress();
  const { completions: recoveryCompletions } = useRecoveryProgress();
  const { completions: eyeCompletions } = useEyeRecoveryProgress();

  return useMemo(() => {
    const combined = [
      ...normalizeRoutineCompletions(routineCompletions),
      ...normalizeRecoveryCompletions(recoveryCompletions),
      ...normalizeEyeCompletions(eyeCompletions),
    ].sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));

    const limited = limit ? combined.slice(0, limit) : combined;
    return groupActivitiesByDate(limited);
  }, [routineCompletions, recoveryCompletions, eyeCompletions, limit]);
}
