// src/utils/breathingEngine.js
// Pure breathing timing logic — no UI, fully testable
// All durations in seconds

import { BREATHING_PHASES } from "../data/breathingSessions";

/**
 * Build an ordered array of phase objects for one breathing cycle.
 * Phases with duration 0 are omitted.
 */
export function buildCycle(session) {
  const phases = [];

  if (session.inhale > 0) {
    phases.push({ phase: BREATHING_PHASES.INHALE, duration: session.inhale });
  }
  if (session.hold > 0) {
    phases.push({ phase: BREATHING_PHASES.HOLD, duration: session.hold });
  }
  if (session.exhale > 0) {
    phases.push({ phase: BREATHING_PHASES.EXHALE, duration: session.exhale });
  }
  if (session.rest > 0) {
    phases.push({ phase: BREATHING_PHASES.REST, duration: session.rest });
  }

  return phases;
}

/**
 * Total duration of one cycle in seconds.
 */
export function cycleDuration(session) {
  return session.inhale + session.hold + session.exhale + session.rest;
}

/**
 * Given elapsed seconds within a single cycle, return the current phase
 * and how many seconds remain in that phase.
 */
export function resolvePhase(session, elapsedInCycle) {
  const cycle = buildCycle(session);
  let cursor = 0;

  for (const entry of cycle) {
    if (elapsedInCycle < cursor + entry.duration) {
      return {
        phase: entry.phase,
        phaseRemaining: entry.duration - (elapsedInCycle - cursor),
        phaseProgress: (elapsedInCycle - cursor) / entry.duration,
      };
    }
    cursor += entry.duration;
  }

  // Fallback — should not happen in normal operation
  const last = cycle[cycle.length - 1];
  return { phase: last.phase, phaseRemaining: 0, phaseProgress: 1 };
}

/**
 * Human-readable label for a phase.
 */
export function phaseLabel(phase) {
  const labels = {
    [BREATHING_PHASES.INHALE]: "Inhale",
    [BREATHING_PHASES.HOLD]: "Hold",
    [BREATHING_PHASES.EXHALE]: "Exhale",
    [BREATHING_PHASES.REST]: "Rest",
  };
  return labels[phase] ?? "Breathe";
}

/**
 * Format seconds as m:ss.
 */
export function formatTime(totalSeconds) {
  const s = Math.max(0, Math.ceil(totalSeconds));
  const m = Math.floor(s / 60);
  const sec = s % 60;
  return `${m}:${sec.toString().padStart(2, "0")}`;
}

/**
 * Determine circle scale for the breathing animation.
 * Returns a value between 0.6 (fully exhaled) and 1.0 (fully inhaled).
 */
export function circleScale(phase, phaseProgress) {
  switch (phase) {
    case BREATHING_PHASES.INHALE:
      return 0.6 + phaseProgress * 0.4;
    case BREATHING_PHASES.HOLD:
      return 1.0;
    case BREATHING_PHASES.EXHALE:
      return 1.0 - phaseProgress * 0.4;
    case BREATHING_PHASES.REST:
      return 0.6;
    default:
      return 0.8;
  }
}

/**
 * Determine CSS transition duration (ms) based on phase.
 * Inhale/exhale get smooth long transitions; hold/rest get short snaps.
 */
export function circleTransitionMs(phase, session) {
  switch (phase) {
    case BREATHING_PHASES.INHALE:
      return session.inhale * 1000;
    case BREATHING_PHASES.EXHALE:
      return session.exhale * 1000;
    case BREATHING_PHASES.HOLD:
    case BREATHING_PHASES.REST:
    default:
      return 300;
  }
}

/**
 * Save a completed breathing session to localStorage.
 */
export function saveBreathingCompletion(
  sessionId,
  sessionTitle,
  durationSeconds,
) {
  const STORAGE_KEY = "sthira_breathing_history";
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    const history = raw ? JSON.parse(raw) : [];
    history.unshift({
      id: `${sessionId}-${Date.now()}`,
      sessionId,
      sessionTitle,
      durationSeconds,
      completedAt: new Date().toISOString(),
    });
    // Keep last 100 entries
    localStorage.setItem(STORAGE_KEY, JSON.stringify(history.slice(0, 100)));
  } catch (_) {
    // localStorage may be unavailable — fail silently
  }
}

/**
 * Load breathing history from localStorage.
 */
export function loadBreathingHistory() {
  const STORAGE_KEY = "sthira_breathing_history";
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch (_) {
    return [];
  }
}
