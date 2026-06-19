import { useEffect, useRef, useState } from "react";

/**
 * A simple second-by-second countdown.
 * Pausing stops the tick without losing the remaining time.
 * Calls onComplete exactly once, when secondsLeft reaches 0.
 */
export function useTimer(duration, { isPaused = false, onComplete } = {}) {
  const [secondsLeft, setSecondsLeft] = useState(duration);
  const onCompleteRef = useRef(onComplete);
  onCompleteRef.current = onComplete;

  useEffect(() => {
    if (isPaused || secondsLeft <= 0) return undefined;
    const id = setTimeout(() => setSecondsLeft((s) => s - 1), 1000);
    return () => clearTimeout(id);
  }, [secondsLeft, isPaused]);

  useEffect(() => {
    if (secondsLeft === 0) {
      onCompleteRef.current?.();
    }
  }, [secondsLeft]);

  return secondsLeft;
}
