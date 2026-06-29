// src/utils/companionEngine.js
// Deterministic context engine for the Gentle Companion.
// Selects appropriate messages based on time, wellness data, weather, and streak.
// No AI. No randomness in category selection — only in message selection within category.
// Persistence for favorites.

import {
  COMPANION_MESSAGES,
  COMPANION_CATEGORIES,
  getMessagesByCategory,
} from "../data/companionMessages";

const FAVORITES_KEY = "sthira_companion_favorites";
const DAILY_KEY = "sthira_companion_daily";

// ── Time helpers ─────────────────────────────────────────────────────────────

/**
 * Returns the current hour (0–23).
 */
export function getCurrentHour() {
  return new Date().getHours();
}

/**
 * Returns "morning" | "afternoon" | "evening" | "night"
 */
export function getTimeOfDay() {
  const h = getCurrentHour();
  if (h >= 5 && h < 12) return "morning";
  if (h >= 12 && h < 17) return "afternoon";
  if (h >= 17 && h < 21) return "evening";
  return "night";
}

// ── Category selection (deterministic rules) ─────────────────────────────────

/**
 * Determine the most appropriate message category given context.
 *
 * Priority order:
 * 1. High stress from emotional weather or wellness → high-stress / self-kindness
 * 2. Low energy from wellness check-in             → low-energy / rest
 * 3. Evening time                                  → evening
 * 4. Morning time                                  → morning
 * 5. Long streak (≥7 days)                         → celebration
 * 6. Stormy / rainy emotional weather              → self-kindness
 * 7. Foggy weather                                 → beginning-again
 * 8. Afternoon with study data                     → study
 * 9. Default                                       → quiet-joy
 */
export function selectCategory({
  timeOfDay,
  streak = 0,
  weatherId = null,
  wellnessStress = null, // 1–5 scale
  wellnessEnergy = null, // 1–5 scale
}) {
  const highStressWeather = ["stormy"];
  const lowMoodWeather = ["rainy", "foggy"];
  const eveningWeather = ["clear-night"];

  // Explicit stress signal
  if (wellnessStress !== null && wellnessStress >= 4) {
    return COMPANION_CATEGORIES.HIGH_STRESS;
  }

  // Stormy weather → stress
  if (weatherId && highStressWeather.includes(weatherId)) {
    return COMPANION_CATEGORIES.HIGH_STRESS;
  }

  // Very low energy
  if (wellnessEnergy !== null && wellnessEnergy <= 2) {
    return COMPANION_CATEGORIES.LOW_ENERGY;
  }

  // Evening / night
  if (timeOfDay === "evening" || timeOfDay === "night") {
    return COMPANION_CATEGORIES.EVENING;
  }

  // Morning
  if (timeOfDay === "morning") {
    return COMPANION_CATEGORIES.MORNING;
  }

  // Consistent streak celebration
  if (streak >= 7) {
    return COMPANION_CATEGORIES.CELEBRATION;
  }

  // Low mood weather
  if (weatherId && lowMoodWeather.includes(weatherId)) {
    return COMPANION_CATEGORIES.SELF_KINDNESS;
  }

  // Foggy → beginning-again (uncertainty)
  if (weatherId === "foggy") {
    return COMPANION_CATEGORIES.BEGINNING_AGAIN;
  }

  // Afternoon without other signals → study encouragement
  if (timeOfDay === "afternoon") {
    return COMPANION_CATEGORIES.STUDY;
  }

  // Default
  return COMPANION_CATEGORIES.QUIET_JOY;
}

/**
 * Select a message from a category using a date-seeded deterministic index.
 * Same date always returns same message for that category.
 * Excludes a specific message id (for "show another").
 */
export function selectMessage(category, excludeId = null) {
  const pool = getMessagesByCategory(category).filter(
    (m) => m.id !== excludeId,
  );
  if (pool.length === 0) {
    // Fallback to any message
    const fallback = COMPANION_MESSAGES.filter((m) => m.id !== excludeId);
    if (fallback.length === 0) return COMPANION_MESSAGES[0];
    return fallback[Math.floor(Math.random() * fallback.length)];
  }

  const today = new Date().toISOString().slice(0, 10);
  const hash = today.split("").reduce((acc, ch) => acc + ch.charCodeAt(0), 0);
  return pool[hash % pool.length];
}

/**
 * Get today's contextual companion message.
 * Uses saved daily record if already generated today.
 */
export function getTodayCompanionMessage(context = {}) {
  const today = new Date().toISOString().slice(0, 10);

  // Check if we already generated today's message
  try {
    const raw = localStorage.getItem(DAILY_KEY);
    if (raw) {
      const record = JSON.parse(raw);
      if (record.date === today && record.messageId) {
        const { getMessageById } = require("../data/companionMessages");
        const saved = getMessageById(record.messageId);
        if (saved) return saved;
      }
    }
  } catch (_) {}

  // Generate new
  const timeOfDay = getTimeOfDay();
  const category = selectCategory({ timeOfDay, ...context });
  const message = selectMessage(category);

  try {
    localStorage.setItem(
      DAILY_KEY,
      JSON.stringify({ date: today, messageId: message.id, category }),
    );
  } catch (_) {}

  return message;
}

/**
 * Get a fresh contextual message (for "show another").
 * Avoids repeating the currently shown message.
 */
export function getRefreshMessage(excludeId, context = {}) {
  const timeOfDay = getTimeOfDay();
  const category = selectCategory({ timeOfDay, ...context });
  return selectMessage(category, excludeId);
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
    const ids = loadFavoriteIds();
    const exists = ids.includes(messageId);
    const updated = exists
      ? ids.filter((id) => id !== messageId)
      : [messageId, ...ids];
    localStorage.setItem(FAVORITES_KEY, JSON.stringify(updated));
    return !exists; // returns new favorited state
  } catch (_) {
    return false;
  }
}

export function loadFavoriteMessages() {
  const ids = loadFavoriteIds();
  const { getMessageById } = require("../data/companionMessages");
  return ids.map((id) => getMessageById(id)).filter(Boolean);
}

/**
 * Get category label for display.
 */
export function getCategoryLabel(category) {
  const labels = {
    [COMPANION_CATEGORIES.MORNING]: "Morning",
    [COMPANION_CATEGORIES.LOW_ENERGY]: "Low Energy",
    [COMPANION_CATEGORIES.HIGH_STRESS]: "Stress",
    [COMPANION_CATEGORIES.EVENING]: "Evening",
    [COMPANION_CATEGORIES.CELEBRATION]: "Consistency",
    [COMPANION_CATEGORIES.REST]: "Rest",
    [COMPANION_CATEGORIES.STUDY]: "Study",
    [COMPANION_CATEGORIES.SELF_KINDNESS]: "Self-Kindness",
    [COMPANION_CATEGORIES.BEGINNING_AGAIN]: "Beginning Again",
    [COMPANION_CATEGORIES.QUIET_JOY]: "Quiet Joy",
  };
  return labels[category] ?? "Today";
}
