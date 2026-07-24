// src/hooks/useFirstBreathStatus.js
// In-memory (not persisted) session flag for The First Breath.
// First Breath is now a universal per-launch experience rather than a
// one-time onboarding step, so completion is tracked only for the
// current session — same pattern as launchSession.js's splash flag.
// A full page reload naturally resets this, which is exactly the
// desired behavior: every fresh app launch shows First Breath again.

let firstBreathCompletedThisSession = false;

export function hasCompletedFirstBreath() {
  return firstBreathCompletedThisSession;
}

export function markFirstBreathComplete() {
  firstBreathCompletedThisSession = true;
}
