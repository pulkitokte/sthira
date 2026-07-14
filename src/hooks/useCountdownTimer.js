// src/hooks/useCountdownTimer.js
// Generic, reusable countdown timer engine — not tied to any specific
// feature, so it can be reused anywhere a "count down from N seconds"
// behavior is needed.
//
// Design notes:
// - Ticks once per second while not paused.
// - Pausing stops the interval entirely — no drift, no background
//   ticking, no scheduled callbacks firing while paused.
// - Resuming continues from the exact secondsLeft value, since React
//   state is preserved across pause toggles (the component doesn't
//   unmount when isPaused flips).
// - Fires onComplete exactly once when the countdown reaches zero,
//   guarded against double-firing from re-renders.
// - Fires onTick (optional) after each tick with the new secondsLeft —
//   a hook point for future voice guidance, haptics, or music sync
//   without ever needing to modify this engine.
// - Does NOT reset itself when `durationSeconds` changes — resetting
//   for a new item is handled by letting the consuming component
//   remount (e.g. via key={currentIndex}), which resets all local
//   state for free. This mirrors the existing remount-per-step pattern
//   already used by EyeRecoveryStepPlayer/useTimer elsewhere in the app.

import { useState, useEffect, useRef } from "react";

export function useCountdownTimer(
  durationSeconds,
  { isPaused = false, onComplete, onTick } = {},
) {
  const [secondsLeft, setSecondsLeft] = useState(durationSeconds);

  // Refs for the latest callbacks so the interval effect never closes
  // over a stale onComplete/onTick from an earlier render.
  const onCompleteRef = useRef(onComplete);
  const onTickRef = useRef(onTick);
  const hasCompletedRef = useRef(false);

  useEffect(() => {
    onCompleteRef.current = onComplete;
  }, [onComplete]);

  useEffect(() => {
    onTickRef.current = onTick;
  }, [onTick]);

  const isFinished = secondsLeft <= 0;

  // One interval per (isPaused, isFinished) combination — not recreated
  // on every single tick, avoiding unnecessary churn/rerenders.
  useEffect(() => {
    if (isPaused || isFinished) return undefined;

    const intervalId = setInterval(() => {
      setSecondsLeft((prev) => {
        const next = Math.max(prev - 1, 0);
        onTickRef.current?.(next);
        return next;
      });
    }, 1000);

    return () => clearInterval(intervalId);
  }, [isPaused, isFinished]);

  // Fire onComplete exactly once when the countdown reaches zero.
  useEffect(() => {
    if (secondsLeft === 0 && !hasCompletedRef.current) {
      hasCompletedRef.current = true;
      onCompleteRef.current?.();
    }
  }, [secondsLeft]);

  return { secondsLeft, isFinished };
}
