// src/hooks/useIntroTimeline.js
// The single timeline for The First Breath's automatic intro. Schedules
// each visual stage at its fixed offset from mount, then calls
// onComplete once. No interaction, no branching, no other hook in the
// app depends on or extends this.

import { useState, useEffect, useRef } from "react";
import { INTRO_TIMELINE, INTRO_TOTAL_MS } from "../constants/firstBreath";

export function useIntroTimeline({ onComplete }) {
  const [stageId, setStageId] = useState(null);
  const onCompleteRef = useRef(onComplete);

  useEffect(() => {
    onCompleteRef.current = onComplete;
  }, [onComplete]);

  useEffect(() => {
    const timers = INTRO_TIMELINE.map(({ id, atMs }) =>
      setTimeout(() => setStageId(id), atMs),
    );

    const finishTimer = setTimeout(() => {
      onCompleteRef.current?.();
    }, INTRO_TOTAL_MS);

    return () => {
      timers.forEach(clearTimeout);
      clearTimeout(finishTimer);
    };
    // Runs once per mount by design — a refresh/reopen during the
    // animation naturally remounts this component and restarts the
    // timeline from stageId = null, which is the desired "animation
    // restarts correctly" behavior (Scenarios 2 and 4).
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return { stageId };
}
