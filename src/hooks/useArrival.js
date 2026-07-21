// src/hooks/useArrival.js
// Owns only the arrival stage clock (settle -> transforming). Same
// isolated shape as useBreathingRitual/useAwakening, deliberately not
// shared with either — Arrival has no dependency on how breathing or
// growth are implemented, only on when it is told to start.

import { useState, useEffect, useRef } from "react";
import { ARRIVAL_STAGES } from "../constants/firstBreath";

export function useArrival({ isActive }) {
  const [stageIndex, setStageIndex] = useState(0);
  const [isComplete, setIsComplete] = useState(false);
  const timeoutRef = useRef(null);

  useEffect(() => {
    if (!isActive) return undefined;

    setStageIndex(0);
    setIsComplete(false);

    function scheduleNext(index) {
      const stage = ARRIVAL_STAGES[index];
      timeoutRef.current = setTimeout(() => {
        const nextIndex = index + 1;
        if (nextIndex >= ARRIVAL_STAGES.length) {
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
  }, [isActive]);

  return {
    stage: ARRIVAL_STAGES[stageIndex],
    stageIndex,
    isComplete,
  };
}