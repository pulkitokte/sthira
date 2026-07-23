// src/hooks/useFirstBreathTimeline.js
// Single automatic timeline for The First Breath. Schedules every
// visual stage as an absolute offset from mount and fires onComplete
// once at the end. There is no user input anywhere in this hook — it
// always runs to completion unconditionally, replacing the previous
// interactive stage controllers (breathing/awakening/arrival) entirely.

import { useState, useEffect, useRef } from "react";
import {
  FIRST_BREATH_TIMELINE,
  FIRST_BREATH_TOTAL_MS,
} from "../constants/firstBreath";

export function useFirstBreathTimeline({ onComplete }) {
  const [stageId, setStageId] = useState(null);
  const onCompleteRef = useRef(onComplete);

  useEffect(() => {
    onCompleteRef.current = onComplete;
  }, [onComplete]);

  useEffect(() => {
    const timers = FIRST_BREATH_TIMELINE.map(({ id, atMs }) =>
      setTimeout(() => setStageId(id), atMs),
    );

    const completeTimer = setTimeout(() => {
      onCompleteRef.current?.();
    }, FIRST_BREATH_TOTAL_MS);
    timers.push(completeTimer);

    return () => timers.forEach(clearTimeout);
  }, []);

  return { stageId };
}