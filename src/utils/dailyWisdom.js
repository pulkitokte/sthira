// src/utils/dailyWisdom.js
// Pure persistence and selection utilities for Daily Wisdom.
// No UI. Fully testable. Supports future sharing, collections, recommendations.

import { WISDOM_ENTRIES, getWisdomById } from "../data/wisdomData";

const DAILY_KEY = "sthira_daily_wisdom";
const FAVORITES_KEY = "sthira_wisdom_favorites";

// ── Daily wisdom selection ────────────────────────────────────────────────────

/**
 * Returns today's date as YYYY-MM-DD.
 */
export function getTodayKey() {
  return new Date().toISOString().slice(0, 10);
}

/**
 * Deterministically select a wisdom entry for a given date.
 * Same date always returns same entry.
 * Cycles through all entries before repeating.
 */
export function getWisdomForDate(dateKey) {
  const hash = dateKey.split("").reduce((acc, ch) => acc + ch.charCodeAt(0), 0);
  const index = hash % WISDOM_ENTRIES.length;
  return WISDOM_ENTRIES[index];
}

/**
 * Load the stored daily wisdom record.
 * Returns { date, wisdomId } or null.
 */
export function loadDailyWisdomRecord() {
  try {
    const raw = localStorage.getItem(DAILY_KEY);
    return raw ? JSON.parse(raw) : null;
  } catch (_) {
    return null;
  }
}

/**
 * Get today's wisdom entry.
 * If a record exists for today, uses that (stable across re-opens).
 * Otherwise generates a new record and saves it.
 */
export function getTodayWisdom() {
  const today = getTodayKey();
  const record = loadDailyWisdomRecord();

  if (record && record.date === today) {
    return getWisdomById(record.wisdomId) ?? getWisdomForDate(today);
  }

  // Generate and save today's entry
  const entry = getWisdomForDate(today);
  try {
    localStorage.setItem(
      DAILY_KEY,
      JSON.stringify({ date: today, wisdomId: entry.id }),
    );
  } catch (_) {
    // Fail silently
  }
  return entry;
}

// ── Favorites ─────────────────────────────────────────────────────────────────

/**
 * Load all favorited wisdom IDs.
 * Returns string[].
 */
export function loadFavoriteIds() {
  try {
    const raw = localStorage.getItem(FAVORITES_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch (_) {
    return [];
  }
}

/**
 * Check if a wisdom entry is favorited.
 */
export function isFavorited(wisdomId) {
  return loadFavoriteIds().includes(wisdomId);
}

/**
 * Add a wisdom entry to favorites.
 * Idempotent — safe to call multiple times.
 */
export function addFavorite(wisdomId) {
  try {
    const ids = loadFavoriteIds();
    if (!ids.includes(wisdomId)) {
      ids.unshift(wisdomId);
      localStorage.setItem(FAVORITES_KEY, JSON.stringify(ids));
    }
  } catch (_) {
    // Fail silently
  }
}

/**
 * Remove a wisdom entry from favorites.
 */
export function removeFavorite(wisdomId) {
  try {
    const ids = loadFavoriteIds().filter((id) => id !== wisdomId);
    localStorage.setItem(FAVORITES_KEY, JSON.stringify(ids));
  } catch (_) {
    // Fail silently
  }
}

/**
 * Toggle favorite status.
 * Returns the new favorited state (true = now favorited).
 */
export function toggleFavorite(wisdomId) {
  if (isFavorited(wisdomId)) {
    removeFavorite(wisdomId);
    return false;
  } else {
    addFavorite(wisdomId);
    return true;
  }
}

/**
 * Load all favorited wisdom entries (full objects).
 * Returns WisdomEntry[].
 */
export function loadFavoriteEntries() {
  const ids = loadFavoriteIds();
  return ids.map((id) => getWisdomById(id)).filter(Boolean);
}

// ── Search ────────────────────────────────────────────────────────────────────

/**
 * Search wisdom entries by text query.
 * Searches text and author fields.
 * Returns filtered WisdomEntry[].
 * Supports future search feature.
 */
export function searchWisdom(query, entries = WISDOM_ENTRIES) {
  if (!query || query.trim().length === 0) return entries;
  const q = query.toLowerCase();
  return entries.filter(
    (w) =>
      w.text.toLowerCase().includes(q) ||
      (w.author && w.author.toLowerCase().includes(q)),
  );
}

// ── Future support utilities ──────────────────────────────────────────────────

/**
 * Get total favorites count — for future achievements.
 */
export function getFavoritesCount() {
  return loadFavoriteIds().length;
}

/**
 * Export a wisdom entry as shareable text — for future share feature.
 */
export function formatWisdomForSharing(entry) {
  const lines = [`"${entry.text}"`];
  if (entry.author) lines.push(`— ${entry.author}`);
  lines.push("\nShared from Sthira");
  return lines.join("\n");
}
