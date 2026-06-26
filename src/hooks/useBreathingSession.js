// src/hooks/useBreathingSession.js
// Encapsulates all timer and state logic for a breathing session.
// The UI only consumes this hook — no timing logic lives in components.

import { useState, useEffect, useRef, useCallback } from "react";
import {
  cycleDuration,
  resolvePhase,
  circleScale,
  circleTransitionMs,
  saveBreathingCompletion,
  formatTime,
} from "../utils/breathingEngine";
import {
  SUPPORTIVE_MESSAGES,
  COMPLETION_MESSAGES,
} from "../data/breathingSessions";

export const SESSION_STATUS = {
  IDLE: "idle", // Not yet started
  RUNNING: "running", // Actively ticking
  PAUSED: "paused", // Paused by user
  DONE: "done", // Completed or ended early
};

export function useBreathingSession(session) {
  const totalSeconds = session ? session.totalMinutes * 60 : 0;
  const cycleLen = session ? cycleDuration(session) : 1;

  const [status, setStatus] = useState(SESSION_STATUS.IDLE);
  const [elapsed, setElapsed] = useState(0);
  const [messageIndex, setMessageIndex] = useState(0);
  const [completionMsg, setCompletionMsg] = useState(null);
  const [endedEarly, setEndedEarly] = useState(false);

  const intervalRef = useRef(null);
  const lastCycleRef = useRef(-1);

  // Derived values
  const remaining = Math.max(0, totalSeconds - elapsed);
  const elapsedInCycle = session ? elapsed % cycleLen : 0;
  const cycleNumber = session ? Math.floor(elapsed / cycleLen) : 0;

  const phaseInfo = session
    ? resolvePhase(session, elapsedInCycle)
    : { phase: "inhale", phaseRemaining: 0, phaseProgress: 0 };

  const scale = session
    ? circleScale(phaseInfo.phase, phaseInfo.phaseProgress)
    : 0.8;

  const transitionMs = session
    ? circleTransitionMs(phaseInfo.phase, session)
    : 1000;

  const progress = totalSeconds > 0 ? elapsed / totalSeconds : 0;

  // Rotate supportive message on each new cycle
  useEffect(() => {
    if (
      cycleNumber !== lastCycleRef.current &&
      status === SESSION_STATUS.RUNNING
    ) {
      lastCycleRef.current = cycleNumber;
      setMessageIndex((i) => (i + 1) % SUPPORTIVE_MESSAGES.length);
    }
  }, [cycleNumber, status]);

  // Tick every second when running
  useEffect(() => {
    if (status !== SESSION_STATUS.RUNNING) return;

    intervalRef.current = setInterval(() => {
      setElapsed((prev) => {
        const next = prev + 1;
        if (next >= totalSeconds) {
          clearInterval(intervalRef.current);
          return totalSeconds;
        }
        return next;
      });
    }, 1000);

    return () => clearInterval(intervalRef.current);
  }, [status, totalSeconds]);

  // Auto-complete when time is up
  useEffect(() => {
    if (
      elapsed >= totalSeconds &&
      totalSeconds > 0 &&
      status === SESSION_STATUS.RUNNING
    ) {
      handleComplete(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [elapsed, totalSeconds]);

  const handleComplete = useCallback(
    (early = false) => {
      clearInterval(intervalRef.current);
      setStatus(SESSION_STATUS.DONE);
      setEndedEarly(early);
      if (session) {
        const actualDuration = early ? elapsed : totalSeconds;
        saveBreathingCompletion(session.id, session.title, actualDuration);
      }
      const msg =
        COMPLETION_MESSAGES[
          Math.floor(Math.random() * COMPLETION_MESSAGES.length)
        ];
      setCompletionMsg(msg);
    },
    [session, elapsed, totalSeconds],
  );

  const start = useCallback(() => {
    setElapsed(0);
    lastCycleRef.current = -1;
    setMessageIndex(0);
    setEndedEarly(false);
    setCompletionMsg(null);
    setStatus(SESSION_STATUS.RUNNING);
  }, []);

  const pause = useCallback(() => {
    if (status === SESSION_STATUS.RUNNING) {
      clearInterval(intervalRef.current);
      setStatus(SESSION_STATUS.PAUSED);
    }
  }, [status]);

  const resume = useCallback(() => {
    if (status === SESSION_STATUS.PAUSED) {
      setStatus(SESSION_STATUS.RUNNING);
    }
  }, [status]);

  const end = useCallback(() => {
    handleComplete(true);
  }, [handleComplete]);

  const reset = useCallback(() => {
    clearInterval(intervalRef.current);
    setElapsed(0);
    setStatus(SESSION_STATUS.IDLE);
    setCompletionMsg(null);
    setEndedEarly(false);
    lastCycleRef.current = -1;
    setMessageIndex(0);
  }, []);

  return {
    status,
    elapsed,
    remaining,
    progress,
    phase: phaseInfo.phase,
    phaseRemaining: phaseInfo.phaseRemaining,
    scale,
    transitionMs,
    supportiveMessage: SUPPORTIVE_MESSAGES[messageIndex],
    completionMsg,
    endedEarly,
    formattedRemaining: formatTime(remaining),
    start,
    pause,
    resume,
    end,
    reset,
  };
}
