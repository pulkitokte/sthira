// src/utils/calmSoundsStorage.js
// Pure localStorage utilities for Calm Sounds Sanctuary.
// No UI. Testable. Supports future preferences and analytics.

const STORAGE_KEY = "sthira_calm_sounds";

/**
 * Load saved calm sounds preferences.
 * Returns { lastSoundId, volume, isMuted }
 */
export function loadCalmSoundsPrefs() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw
      ? JSON.parse(raw)
      : { lastSoundId: null, volume: 0.8, isMuted: false };
  } catch (_) {
    return { lastSoundId: null, volume: 0.8, isMuted: false };
  }
}

/**
 * Save calm sounds preferences.
 */
export function saveCalmSoundsPrefs({ lastSoundId, volume, isMuted }) {
  try {
    const existing = loadCalmSoundsPrefs();
    localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify({
        ...existing,
        ...(lastSoundId !== undefined && { lastSoundId }),
        ...(volume !== undefined && { volume }),
        ...(isMuted !== undefined && { isMuted }),
      }),
    );
  } catch (_) {
    // Fail silently
  }
}

/**
 * Clear all calm sounds preferences.
 */
export function clearCalmSoundsPrefs() {
  try {
    localStorage.removeItem(STORAGE_KEY);
  } catch (_) {
    // Fail silently
  }
}
