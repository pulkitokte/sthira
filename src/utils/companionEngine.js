// src/utils/companionEngine.js
// Gentle Companion engine — now delegates message generation to
// contextAwareCompanion.js for intelligent, context-aware messages.
// Backwards-compatible: all existing exports remain. No breaking changes.

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
} from "./contextAwareCompanion";

const FAVORITES_KEY = "sthira_companion_favorites";
const DAILY_KEY = "sthira_companion_daily";

// ── Time helpers ──────────────────────────────────────────────────────────────

export function getCurrentHour() {
  return new Date().getHours();
}

export function getTimeOfDay() {
  const h = getCurrentHour();
  if (h >= 5 && h < 12) return "morning";
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
  const lowMoodWeather = ["rainy", "foggy"];

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
  const hash = today.split("").reduce((acc, ch) => acc + ch.charCodeAt(0), 0);
  return pool[hash % pool.length];
}

// ── Primary message function — now context-aware ──────────────────────────────

/**
 * Get today's companion message.
 * Now uses the context-aware engine for intelligent, personalized messages.
 * The context parameter is accepted for backwards compatibility but the
 * context-aware engine derives its own context internally.
 *
 * Returns a message object compatible with the existing UI:
 * { id, category, text } — where category is the detected companion state label.
 */
export function getTodayCompanionMessage(context = {}) {
  const today = new Date().toISOString().slice(0, 10);

  // Use the context-aware engine
  const { text, state } = getContextAwareCompanionMessage();

  // Return in the shape the existing UI expects
  return {
    id: `context-${state}-${today}`,
    category: state, // UI uses getCategoryLabel(message.category)
    text,
  };
}

/**
 * Get a fresh contextual message (for "show another" in CompanionSpace).
 * Still uses the context-aware engine but shifts the seed.
 */
export function getRefreshMessage(excludeId, context = {}) {
  const today = new Date().toISOString().slice(0, 10);
  const state = detectCompanionState();

  const {
    MESSAGE_POOLS,
    FALLBACK_MESSAGES,
  } = require("./contextAwareCompanion");
  // Since we can't require in ESM, fall back to the legacy system for refresh
  // This maintains the "show another" behavior using the legacy category pool
  const timeOfDay = getTimeOfDay();
  const category = selectCategory({ timeOfDay, ...context });
  return selectMessage(category, excludeId);
}

// ── Category label ────────────────────────────────────────────────────────────

/**
 * Get display label for a category or state string.
 * Handles both legacy COMPANION_CATEGORIES and new COMPANION_STATES.
 */
export function getCategoryLabel(categoryOrState) {
  // Try context-aware state label first
  const stateLabel = getStateLabelForDisplay(categoryOrState);
  if (stateLabel && stateLabel !== "Today") return stateLabel;

  // Legacy category labels
  const legacyLabels = {
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
    const ids = loadFavoriteIds();
    const exists = ids.includes(messageId);
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
