// src/hooks/useAwakening.js
// Owns only the awakening/growth stage clock. Deliberately not shared
// with useBreathingRitual despite the similar shape — the spec calls
// for strict separation between breathing and growth, and the two
// having no dependency on each other (even a shared abstraction) is
// what keeps future changes to one from ever risking the other.

import { useState, useEffect, useRef } from "react";
import { AWAKENING_STAGES } from "../constants/firstBreath";

export function useAwakening({ isActive }) {
  const [stageIndex, setStageIndex] = useState(0);
  const [isComplete, setIsComplete] = useState(false);
  const timeoutRef = useRef(null);

  useEffect(() => {
    if (!isActive) return undefined;

    setStageIndex(0);
    setIsComplete(false);

    function scheduleNext(index) {
      const stage = AWAKENING_STAGES[index];
      timeoutRef.current = setTimeout(() => {
        const nextIndex = index + 1;
        if (nextIndex >= AWAKENING_STAGES.length) {
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
    stage: AWAKENING_STAGES[stageIndex],
    stageIndex,
    isComplete,
  };
}