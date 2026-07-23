// src/hooks/useFirstBreathStatus.js
// Persists "has this device ever completed The First Breath."
//
// Bug fix: App.jsx previously called this hook and cached the result in
// its own local useState. Since useFirstBreathStatus() creates a fresh,
// independent useState per component instance, App.jsx's copy never
// updated after FirstBreath.jsx called completeFirstBreath() (a
// different instance's state) — App's copy of hasCompletedFirstBreath
// stayed stale at `false` for the rest of the page's lifetime, causing
// useLaunchManager to incorrectly redirect back to /first-breath
// immediately after the real completion. hasCompletedFirstBreathSync is
// now exported as a plain, uncached synchronous reader for consumers
// (like App.jsx) that only need the current truth on each render rather
// than a subscribed, cached value.

import { useState, useCallback } from "react";
import { FIRST_BREATH_STORAGE_KEY } from "../constants/firstBreath";

function readCompletedSync() {
  try {
    return localStorage.getItem(FIRST_BREATH_STORAGE_KEY) === "true";
  } catch (_) {
    return false;
  }
}

// Plain, uncached synchronous read — always reflects the current
// localStorage value at the moment it's called. Use this (not the hook)
// anywhere that only needs "what does storage say right now on this
// render" rather than a subscribed value that persists across renders.
export function hasCompletedFirstBreathSync() {
  return readCompletedSync();
}

export function useFirstBreathStatus() {
  const [hasCompletedFirstBreath, setHasCompletedFirstBreath] = useState(
    readCompletedSync,
  );

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