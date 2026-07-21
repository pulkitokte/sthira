// src/hooks/useStageClock.js
// Generic stage-sequence timer: given an ordered list of
// { id, durationMs } stages, advances through them automatically once
// isActive is true, and reports completion exactly once.
//
// Extracted because useBreathingRitual, useAwakening, and useArrival
// each contained an identical timer/cleanup implementation — this
// removes that duplication without changing any of their public APIs,
// return shapes, or behavior. Each of those hooks still owns its own
// file and remains fully independent of the others; none of them
// import from one another, only from this shared primitive.

import { useState, useEffect, useRef } from "react";

export function useStageClock(stages, { isActive }) {
  const [stageIndex, setStageIndex] = useState(0);
  const [isComplete, setIsComplete] = useState(false);
  const timeoutRef = useRef(null);

  useEffect(() => {
    if (!isActive) return undefined;

    setStageIndex(0);
    setIsComplete(false);

    function scheduleNext(index) {
      const stage = stages[index];
      timeoutRef.current = setTimeout(() => {
        const nextIndex = index + 1;
        if (nextIndex >= stages.length) {
          setIsComplete(true);
          return;
        }
        setStageIndex(nextIndex);
        scheduleNext(nextIndex);
      }, stage.durationMs);
    }

    scheduleNext(0);

    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
    // stages is a stable, module-level constant array in every current
    // caller (BREATH_PHASES / AWAKENING_STAGES / ARRIVAL_STAGES), so it
    // is intentionally omitted from deps, consistent with how these
    // constants were already treated before this extraction.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isActive]);

  return {
    stage: stages[stageIndex],
    stageIndex,
    isComplete,
  };
}
