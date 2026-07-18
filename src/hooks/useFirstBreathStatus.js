// src/hooks/useFirstBreathStatus.js
// Persists "has this device ever completed The First Breath," using the
// exact same safe-read/lazy-initializer pattern used by every other
// localStorage-backed piece of state in this app. Reading synchronously
// in the useState initializer (rather than discovering the value later
// in an effect) avoids a first-render flash of the wrong state.

import { useState, useCallback } from "react";
import { FIRST_BREATH_STORAGE_KEY } from "../constants/firstBreath";

function readCompletedSync() {
  try {
    return localStorage.getItem(FIRST_BREATH_STORAGE_KEY) === "true";
  } catch (_) {
    return false;
  }
}

export function useFirstBreathStatus() {
  const [hasCompletedFirstBreath, setHasCompletedFirstBreath] =
    useState(readCompletedSync);

  const completeFirstBreath = useCallback(() => {
    try {
      localStorage.setItem(FIRST_BREATH_STORAGE_KEY, "true");
    } catch (_) {
      // Fail silently — storage may be unavailable
    }
    setHasCompletedFirstBreath(true);
  }, []);

  return { hasCompletedFirstBreath, completeFirstBreath };
}
