// src/utils/gratitudeGarden.js
// Pure persistence and data utilities for the Gratitude Garden.
// No UI. Fully testable. Supports future insights, export, and search.

const STORAGE_KEY = "sthira_gratitude_garden";

/**
 * Load all gratitude entries from localStorage.
 * Returns newest-first array.
 * Each entry: { id, date, timestamp, text, category }
 */
export function loadGratitudeEntries() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch (_) {
    return [];
  }
}

/**
 * Persist the full entries array to localStorage.
 */
function saveEntries(entries) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(entries));
  } catch (_) {
    // Fail silently
  }
}

/**
 * Create and save a new gratitude entry.
 * Returns the saved entry.
 */
export function createGratitudeEntry({ text, category }) {
  const now = new Date();
  const entry = {
    id: `gratitude-${Date.now()}`,
    date: now.toISOString().slice(0, 10),
    timestamp: now.toISOString(),
    text: text.trim(),
    category: category ?? "other",
  };
  const existing = loadGratitudeEntries();
  existing.unshift(entry);
  saveEntries(existing);
  return entry;
}

/**
 * Delete a gratitude entry by id.
 */
export function deleteGratitudeEntry(id) {
  const existing = loadGratitudeEntries();
  saveEntries(existing.filter((e) => e.id !== id));
}

/**
 * Group entries by date for timeline display.
 * Returns array of { date, entries[] }, newest date first.
 */
export function groupGratitudeByDate(entries) {
  const map = new Map();
  for (const entry of entries) {
    if (!map.has(entry.date)) map.set(entry.date, []);
    map.get(entry.date).push(entry);
  }
  return Array.from(map.entries()).map(([date, items]) => ({
    date,
    entries: items,
  }));
}

/**
 * Format a YYYY-MM-DD date key to a readable label.
 */
export function formatGratitudeDate(dateKey) {
  const today = new Date().toISOString().slice(0, 10);
  const yesterday = new Date(Date.now() - 86400000).toISOString().slice(0, 10);
  if (dateKey === today) return "Today";
  if (dateKey === yesterday) return "Yesterday";
  const d = new Date(dateKey + "T12:00:00");
  return d.toLocaleDateString("en-IN", { day: "numeric", month: "long" });
}

/**
 * Format ISO timestamp to "9:32 AM" style.
 */
export function formatGratitudeTime(timestamp) {
  return new Date(timestamp).toLocaleTimeString("en-IN", {
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  });
}

// ── Future support utilities ──────────────────────────────────────────────────

/**
 * Total entry count — for garden display and future achievements.
 */
export function getTotalGratitudeCount() {
  return loadGratitudeEntries().length;
}

/**
 * Entries grouped by category — for future insights/analytics.
 */
export function getEntriesByCategory() {
  const entries = loadGratitudeEntries();
  const map = {};
  for (const e of entries) {
    map[e.category] = (map[e.category] ?? 0) + 1;
  }
  return map;
}

/**
 * Returns all entries for a specific date — for future date filter.
 */
export function getEntriesForDate(dateKey) {
  return loadGratitudeEntries().filter((e) => e.date === dateKey);
}

/**
 * Simple text search across all entries — for future search feature.
 */
export function searchGratitudeEntries(query) {
  if (!query || query.trim().length === 0) return loadGratitudeEntries();
  const q = query.toLowerCase();
  return loadGratitudeEntries().filter(
    (e) =>
      e.text.toLowerCase().includes(q) || e.category.toLowerCase().includes(q),
  );
}

/**
 * Export all entries as plain text — for future export functionality.
 */
export function exportGratitudeAsText() {
  const entries = loadGratitudeEntries();
  if (entries.length === 0) return "No gratitude entries recorded yet.";
  return entries
    .map((e) => `[${e.date}] [${e.category}]\n${e.text}`)
    .join("\n\n─────────────\n\n");
}

/**
 * Gratitude streak — consecutive days with at least one entry.
 * Supports future streak display and achievements.
 */
export function getGratitudeStreak() {
  const entries = loadGratitudeEntries();
  if (entries.length === 0) return 0;

  const today = new Date().toISOString().slice(0, 10);
  const yesterday = new Date(Date.now() - 86400000).toISOString().slice(0, 10);
  const dates = [...new Set(entries.map((e) => e.date))].sort().reverse();

  if (dates[0] !== today && dates[0] !== yesterday) return 0;

  let streak = 0;
  let cursor = new Date(dates[0]);
  for (const date of dates) {
    const expected = cursor.toISOString().slice(0, 10);
    if (date === expected) {
      streak++;
      cursor.setDate(cursor.getDate() - 1);
    } else {
      break;
    }
  }
  return streak;
}
