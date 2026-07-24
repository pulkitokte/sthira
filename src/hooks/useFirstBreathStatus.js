// src/hooks/useFirstBreathStatus.js
// Plain, stateless localStorage helpers for first-breath completion.
// Deliberately NOT a React hook with cached state — the previous
// version's useState-backed value went stale across separate component
// instances (App.jsx vs. the intro page), causing a real routing bug.
// Since nothing in the app needs a subscribed/reactive value here (only
// a fresh read at render time, and a one-time write), plain functions
// remove that entire class of bug by construction.

import { FIRST_BREATH_STORAGE_KEY } from "../constants/firstBreath";

export function hasCompletedFirstBreath() {
  try {
    return localStorage.getItem(FIRST_BREATH_STORAGE_KEY) === "true";
  } catch (_) {
    return false;
  }
}

export function markFirstBreathComplete() {
  try {
    localStorage.setItem(FIRST_BREATH_STORAGE_KEY, "true");
  } catch (_) {
    // Fail silently — storage may be unavailable
  }
}
