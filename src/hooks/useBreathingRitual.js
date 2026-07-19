// src/hooks/useBreathingRitual.js
// Owns only the breathing phase clock — inhale, hold, exhale, once.
// No navigation, no text, no seed rendering — BreathingRitual.jsx is the
// only consumer, and everything else about The First Breath is
// unaffected by this hook's existence.

import { useState, useEffect, useRef } from "react";
import { BREATH_PHASES } from "../constants/firstBreath";

export function useBreathingRitual({ isActive }) {
  const [phaseIndex, setPhaseIndex] = useState(0);
  const [isComplete, setIsComplete] = useState(false);
  const timeoutRef = useRef(null);

  useEffect(() => {
    if (!isActive) return undefined;

    setPhaseIndex(0);
    setIsComplete(false);

    function scheduleNext(index) {
      const phase = BREATH_PHASES[index];
      timeoutRef.current = setTimeout(() => {
        const nextIndex = index + 1;
        if (nextIndex >= BREATH_PHASES.length) {
          setIsComplete(true);
          return;
        }
        setPhaseIndex(nextIndex);
        scheduleNext(nextIndex);
      }, phase.durationMs);
    }

    scheduleNext(0);

    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, [isActive]);

  return {
    phase: BREATH_PHASES[phaseIndex],
    phaseIndex,
    isComplete,
  };
}