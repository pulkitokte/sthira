// src/hooks/useLaunchManager.js
// The "launch manager" — pure decision logic for what a fresh app load
// should show, before any normal routing takes over.
//
// First Breath is now the universal entry experience: it plays on
// every app launch (not just first-time users), so there is no longer
// a "returning user" branch here. The only question this hook answers
// is: has First Breath completed for this session yet?
//
// Returns a path to redirect to, or null if no redirect is needed.

import { PATHS } from "../constants/navigation";

export function useLaunchManager({ pathname, hasCompletedFirstBreath }) {
  const isFirstBreathRoute = pathname === PATHS.FIRST_BREATH;

  // Every launch, for every user, sees First Breath before anything
  // else — until it completes for this session.
  if (!hasCompletedFirstBreath && !isFirstBreathRoute) {
    return PATHS.FIRST_BREATH;
  }

  return null;
}
