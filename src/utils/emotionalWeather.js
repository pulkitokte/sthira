// src/utils/emotionalWeather.js
// Pure persistence and data utilities for Emotional Weather.
// No UI. Fully testable. Supports future insights, exports, and correlations.

const STORAGE_KEY = "sthira_emotional_weather";

/**
 * Load all emotional weather entries from localStorage.
 * Returns newest-first array.
 * Each entry: { id, date, timestamp, weather, note }
 */
export function loadWeatherEntries() {
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
 * Returns today's date as YYYY-MM-DD.
 */
export function getTodayKey() {
  return new Date().toISOString().slice(0, 10);
}

/**
 * Get today's entry, or null if none exists.
 */
export function getTodayEntry() {
  const today = getTodayKey();
  return loadWeatherEntries().find((e) => e.date === today) ?? null;
}

/**
 * Create a new weather entry for today.
 * Returns the saved entry.
 */
export function createWeatherEntry({ weather, note }) {
  const now = new Date();
  const entry = {
    id: `weather-${Date.now()}`,
    date: now.toISOString().slice(0, 10),
    timestamp: now.toISOString(),
    weather,
    note: note?.trim() ?? "",
  };
  const existing = loadWeatherEntries().filter((e) => e.date !== entry.date);
  existing.unshift(entry);
  saveEntries(existing);
  return entry;
}

/**
 * Update today's weather entry.
 * Replaces the existing entry for today.
 */
export function updateWeatherEntry(id, { weather, note }) {
  const entries = loadWeatherEntries();
  const index = entries.findIndex((e) => e.id === id);
  if (index === -1) return null;

  const updated = {
    ...entries[index],
    weather,
    note: note?.trim() ?? "",
    editedAt: new Date().toISOString(),
  };
  entries[index] = updated;
  saveEntries(entries);
  return updated;
}

/**
 * Delete a weather entry by id.
 */
export function deleteWeatherEntry(id) {
  const entries = loadWeatherEntries().filter((e) => e.id !== id);
  saveEntries(entries);
}

/**
 * Group entries by month for timeline display.
 * Returns array of { monthKey, label, entries[] }, newest month first.
 */
export function groupEntriesByMonth(entries) {
  const map = new Map();
  for (const entry of entries) {
    const monthKey = entry.date.slice(0, 7); // YYYY-MM
    if (!map.has(monthKey)) map.set(monthKey, []);
    map.get(monthKey).push(entry);
  }
  return Array.from(map.entries()).map(([monthKey, items]) => ({
    monthKey,
    label: formatMonthLabel(monthKey),
    entries: items,
  }));
}

/**
 * Format YYYY-MM to "June 2025".
 */
export function formatMonthLabel(monthKey) {
  const [year, month] = monthKey.split("-");
  const date = new Date(parseInt(year), parseInt(month) - 1, 1);
  return date.toLocaleDateString("en-IN", { month: "long", year: "numeric" });
}

/**
 * Format YYYY-MM-DD to "12 June".
 */
export function formatWeatherDate(dateKey) {
  const today = getTodayKey();
  const yesterday = new Date(Date.now() - 86400000).toISOString().slice(0, 10);
  if (dateKey === today) return "Today";
  if (dateKey === yesterday) return "Yesterday";
  const d = new Date(dateKey + "T12:00:00");
  return d.toLocaleDateString("en-IN", { day: "numeric", month: "short" });
}

/**
 * Format ISO timestamp to "9:32 AM".
 */
export function formatWeatherTime(timestamp) {
  return new Date(timestamp).toLocaleTimeString("en-IN", {
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  });
}

/**
 * Get the N most recent weather IDs for landscape and reflection.
 */
export function getRecentWeatherIds(n = 7) {
  return loadWeatherEntries()
    .slice(0, n)
    .map((e) => e.weather);
}

// ── Future support utilities ──────────────────────────────────────────────────

/**
 * Get weather frequency map — for future insights/trends.
 * Returns { weatherId: count }
 */
export function getWeatherFrequency() {
  const entries = loadWeatherEntries();
  const map = {};
  for (const e of entries) {
    map[e.weather] = (map[e.weather] ?? 0) + 1;
  }
  return map;
}

/**
 * Get most common weather — for future insights.
 */
export function getMostCommonWeather() {
  const freq = getWeatherFrequency();
  if (Object.keys(freq).length === 0) return null;
  return Object.entries(freq).sort((a, b) => b[1] - a[1])[0][0];
}

/**
 * Get total entry count.
 */
export function getTotalWeatherCount() {
  return loadWeatherEntries().length;
}

/**
 * Export as plain text — for future export feature.
 */
export function exportWeatherAsText() {
  const entries = loadWeatherEntries();
  if (entries.length === 0) return "No emotional weather entries yet.";
  return entries
    .map((e) => {
      const lines = [`${e.date} — ${e.weather}`];
      if (e.note) lines.push(e.note);
      return lines.join("\n");
    })
    .join("\n\n─────────────\n\n");
}

/**
 * Get entries within a date range — for future correlations with wellness data.
 */
export function getEntriesInRange(startDate, endDate) {
  return loadWeatherEntries().filter(
    (e) => e.date >= startDate && e.date <= endDate,
  );
}
