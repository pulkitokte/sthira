// src/utils/companionEngine.js
// Gentle Companion engine.
// Delegates intelligent message generation to contextAwareCompanion.js.
// Batch 49: removed require() anti-pattern — all imports at module top-level.
// Batch 54: removed dead unreachable code in getRefreshMessage that produced
//           an ESLint no-unused-vars warning (const available was assigned
//           but never read before the function fell through to the legacy path).

import {
  COMPANION_MESSAGES,
  COMPANION_CATEGORIES,
  getMessagesByCategory,
  getMessageById,
} from "../data/companionMessages";

import {
  getContextAwareCompanionMessage,
  getStateLabelForDisplay,
  detectCompanionState,
  MESSAGE_POOLS,
} from "./contextAwareCompanion";

const FAVORITES_KEY = "sthira_companion_favorites";

// ── Time helpers ──────────────────────────────────────────────────────────────

export function getCurrentHour() {
  return new Date().getHours();
}

export function getTimeOfDay() {
  const h = getCurrentHour();
  if (h >= 5  && h < 12) return "morning";
  if (h >= 12 && h < 17) return "afternoon";
  if (h >= 17 && h < 21) return "evening";
  return "night";
}

// ── Category selection (legacy — kept for backwards compatibility) ─────────────

export function selectCategory({
  timeOfDay,
  streak = 0,
  weatherId = null,
  wellnessStress = null,
  wellnessEnergy = null,
}) {
  const highStressWeather = ["stormy"];
  const lowMoodWeather    = ["rainy", "foggy"];

  if (wellnessStress !== null && wellnessStress >= 4) {
    return COMPANION_CATEGORIES.HIGH_STRESS;
  }
  if (weatherId && highStressWeather.includes(weatherId)) {
    return COMPANION_CATEGORIES.HIGH_STRESS;
  }
  if (wellnessEnergy !== null && wellnessEnergy <= 2) {
    return COMPANION_CATEGORIES.LOW_ENERGY;
  }
  if (timeOfDay === "evening" || timeOfDay === "night") {
    return COMPANION_CATEGORIES.EVENING;
  }
  if (timeOfDay === "morning") {
    return COMPANION_CATEGORIES.MORNING;
  }
  if (streak >= 7) {
    return COMPANION_CATEGORIES.CELEBRATION;
  }
  if (weatherId && lowMoodWeather.includes(weatherId)) {
    return COMPANION_CATEGORIES.SELF_KINDNESS;
  }
  if (weatherId === "foggy") {
    return COMPANION_CATEGORIES.BEGINNING_AGAIN;
  }
  if (timeOfDay === "afternoon") {
    return COMPANION_CATEGORIES.STUDY;
  }
  return COMPANION_CATEGORIES.QUIET_JOY;
}

export function selectMessage(category, excludeId = null) {
  const pool = getMessagesByCategory(category).filter(
    (m) => m.id !== excludeId,
  );
  if (pool.length === 0) {
    const fallback = COMPANION_MESSAGES.filter((m) => m.id !== excludeId);
    if (fallback.length === 0) return COMPANION_MESSAGES[0];
    return fallback[Math.floor(Math.random() * fallback.length)];
  }
  const today = new Date().toISOString().slice(0, 10);
  const hash  = today
    .split("")
    .reduce((acc, ch) => acc + ch.charCodeAt(0), 0);
  return pool[hash % pool.length];
}

// ── Primary message function — context-aware ──────────────────────────────────

/**
 * Get today's companion message using the context-aware engine.
 * Returns { id, category, text } compatible with the existing UI.
 */
export function getTodayCompanionMessage(context = {}) {
  const today           = new Date().toISOString().slice(0, 10);
  const { text, state } = getContextAwareCompanionMessage();
  return {
    id:       `context-${state}-${today}`,
    category: state,
    text,
  };
}

/**
 * Get a fresh contextual message for "show another" in CompanionSpace.
 * Uses the legacy category pool for rotation variety.
 */
export function getRefreshMessage(excludeId, context = {}) {
  // Use legacy category pool for the refresh rotation so that
  // "show another" feels genuinely different from the context-aware message.
  const timeOfDay = getTimeOfDay();
  const category  = selectCategory({ timeOfDay, ...context });
  return selectMessage(category, excludeId);
}

// ── Category label ────────────────────────────────────────────────────────────

/**
 * Returns a display label for a category or state string.
 * Handles both legacy COMPANION_CATEGORIES and new COMPANION_STATES.
 */
export function getCategoryLabel(categoryOrState) {
  const stateLabel = getStateLabelForDisplay(categoryOrState);
  if (stateLabel && stateLabel !== "Today") return stateLabel;

  const legacyLabels = {
    [COMPANION_CATEGORIES.MORNING]:         "Morning",
    [COMPANION_CATEGORIES.LOW_ENERGY]:      "Low Energy",
    [COMPANION_CATEGORIES.HIGH_STRESS]:     "Stress",
    [COMPANION_CATEGORIES.EVENING]:         "Evening",
    [COMPANION_CATEGORIES.CELEBRATION]:     "Consistency",
    [COMPANION_CATEGORIES.REST]:            "Rest",
    [COMPANION_CATEGORIES.STUDY]:           "Study",
    [COMPANION_CATEGORIES.SELF_KINDNESS]:   "Self-Kindness",
    [COMPANION_CATEGORIES.BEGINNING_AGAIN]: "Beginning Again",
    [COMPANION_CATEGORIES.QUIET_JOY]:       "Quiet Joy",
  };
  return legacyLabels[categoryOrState] ?? "Today";
}

// ── Favorites ─────────────────────────────────────────────────────────────────

export function loadFavoriteIds() {
  try {
    const raw = localStorage.getItem(FAVORITES_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch (_) {
    return [];
  }
}

export function isFavorited(messageId) {
  return loadFavoriteIds().includes(messageId);
}

export function toggleFavorite(messageId) {
  try {
    const ids     = loadFavoriteIds();
    const exists  = ids.includes(messageId);
    const updated = exists
      ? ids.filter((id) => id !== messageId)
      : [messageId, ...ids];
    localStorage.setItem(FAVORITES_KEY, JSON.stringify(updated));
    return !exists;
  } catch (_) {
    return false;
  }
}

export function loadFavoriteMessages() {
  const ids = loadFavoriteIds();
  return ids.map((id) => getMessageById(id)).filter(Boolean);
}