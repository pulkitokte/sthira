// src/hooks/useLaunchManager.js
// The "launch manager" — pure decision logic for what a fresh app load
// should show, before any normal routing takes over. Implemented as a
// hook (not a wrapping component) so it can be called directly inside
// App.jsx's existing early-return pattern, preserving exact control
// over which redirect (First Breath vs. the pre-existing Onboarding
// check) takes priority when more than one condition is true at once.
//
// Returns a path to redirect to, or null if no redirect is needed.

import { useRef } from "react";
import { PATHS } from "../constants/navigation";
import { hasCompletedSplashThisSession } from "../utils/launchSession";

export function useLaunchManager({
  pathname,
  hasCompletedFirstBreath,
  isOnboardingComplete,
}) {
  // Captured once, on mount, rather than read live every render. This is
  // what prevents a first-time user finishing Onboarding mid-session
  // from suddenly looking like a "returning user" and getting a Splash
  // wedged between Onboarding finishing and Home appearing — only a
  // genuinely new session (new mount) re-evaluates this.
  const wasReturningUserAtSessionStart = useRef(
    hasCompletedFirstBreath && isOnboardingComplete,
  ).current;

  const isFirstBreathRoute = pathname === PATHS.FIRST_BREATH;
  const isSplashRoute = pathname === PATHS.SPLASH;
  const isOnboardingRoute = pathname === PATHS.ONBOARDING;

  // First-time users see The First Breath exactly once, before anything
  // else — this check does not depend on onboarding status at all, so
  // it can't be bypassed by a direct link into onboarding.
  if (!hasCompletedFirstBreath && !isFirstBreathRoute) {
    return PATHS.FIRST_BREATH;
  }

  // Returning users (both First Breath and Onboarding already complete
  // *before this session started*) see a brief splash once per launch.
  if (
    wasReturningUserAtSessionStart &&
    !hasCompletedSplashThisSession() &&
    !isSplashRoute &&
    !isFirstBreathRoute &&
    !isOnboardingRoute
  ) {
    return PATHS.SPLASH;
  }

  return null;
}
