// src/utils/eveningReflection.js
// Pure persistence and data utilities for Evening Reflection.
// No UI. Fully testable. Architecture supports future insights and export.

const STORAGE_KEY = "sthira_evening_reflections";

/**
 * Load all reflection entries from localStorage.
 * Returns newest-first array.
 * Each entry: { id, date, timestamp, mood, wentWell, difficult, tomorrowIntention }
 */
export function loadReflections() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch (_) {
    return [];
  }
}

/**
 * Persist the full reflections array to localStorage.
 */
function saveReflections(reflections) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(reflections));
  } catch (_) {
    // Fail silently
  }
}

/**
 * Create and save a new reflection entry.
 * Returns the saved entry.
 */
export function createReflection({
  mood,
  wentWell,
  difficult,
  tomorrowIntention,
}) {
  const now = new Date();
  const entry = {
    id: `reflection-${Date.now()}`,
    date: now.toISOString().slice(0, 10),
    timestamp: now.toISOString(),
    mood: mood ?? null,
    wentWell: wentWell?.trim() ?? "",
    difficult: difficult?.trim() ?? "",
    tomorrowIntention: tomorrowIntention?.trim() ?? "",
  };
  const existing = loadReflections();
  existing.unshift(entry);
  saveReflections(existing);
  return entry;
}

/**
 * Delete a reflection entry by id.
 */
export function deleteReflection(id) {
  const existing = loadReflections();
  saveReflections(existing.filter((e) => e.id !== id));
}

/**
 * Check if a reflection has already been saved for today.
 */
export function hasTodayReflection() {
  const today = new Date().toISOString().slice(0, 10);
  return loadReflections().some((e) => e.date === today);
}

/**
 * Get today's reflection if it exists, or null.
 */
export function getTodayReflection() {
  const today = new Date().toISOString().slice(0, 10);
  return loadReflections().find((e) => e.date === today) ?? null;
}

/**
 * Group reflections by date for timeline display.
 * Returns array of { date, entries[] }, newest date first.
 */
export function groupReflectionsByDate(reflections) {
  const map = new Map();
  for (const entry of reflections) {
    if (!map.has(entry.date)) map.set(entry.date, []);
    map.get(entry.date).push(entry);
  }
  return Array.from(map.entries()).map(([date, entries]) => ({
    date,
    entries,
  }));
}

/**
 * Format a YYYY-MM-DD date key to a readable label.
 * Returns "Today", "Yesterday", or "12 June" style.
 */
export function formatReflectionDate(dateKey) {
  const today = new Date().toISOString().slice(0, 10);
  const yesterday = new Date(Date.now() - 86400000).toISOString().slice(0, 10);
  if (dateKey === today) return "Today";
  if (dateKey === yesterday) return "Yesterday";
  const d = new Date(dateKey + "T12:00:00");
  return d.toLocaleDateString("en-IN", { day: "numeric", month: "long" });
}

/**
 * Format ISO timestamp to "9:32 PM" style.
 */
export function formatReflectionTime(timestamp) {
  return new Date(timestamp).toLocaleTimeString("en-IN", {
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  });
}

/**
 * Build a short preview string from an entry for timeline cards.
 */
export function buildReflectionPreview(entry) {
  const source = entry.wentWell || entry.difficult || entry.tomorrowIntention;
  if (!source) return null;
  return source.length > 100 ? source.slice(0, 100).trimEnd() + "…" : source;
}

// ── Future support utilities ─────────────────────────────────────────────────

/**
 * Returns total count of all reflections.
 * Useful for future achievements and insights.
 */
export function getTotalReflectionCount() {
  return loadReflections().length;
}

/**
 * Returns mood history array for future trend analysis.
 * Format: [{ date, mood }]
 */
export function getReflectionMoodHistory() {
  return loadReflections()
    .filter((e) => e.mood)
    .map((e) => ({ date: e.date, mood: e.mood }));
}

/**
 * Returns the current reflection streak (consecutive days).
 * Supports future streak display and achievements.
 */
export function getReflectionStreak() {
  const reflections = loadReflections();
  if (reflections.length === 0) return 0;

  const today = new Date().toISOString().slice(0, 10);
  const yesterday = new Date(Date.now() - 86400000).toISOString().slice(0, 10);

  const dates = [...new Set(reflections.map((e) => e.date))].sort().reverse();
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

/**
 * Export all reflections as a plain text string.
 * Supports future export functionality.
 */
export function exportReflectionsAsText() {
  const reflections = loadReflections();
  if (reflections.length === 0) return "No reflections recorded yet.";

  return reflections
    .map((e) => {
      const lines = [
        `Date: ${e.date}`,
        `Time: ${formatReflectionTime(e.timestamp)}`,
      ];
      if (e.mood) lines.push(`Mood: ${e.mood}`);
      if (e.wentWell) lines.push(`\nWhat went well:\n${e.wentWell}`);
      if (e.difficult) lines.push(`\nWhat felt difficult:\n${e.difficult}`);
      if (e.tomorrowIntention)
        lines.push(`\nCarrying forward:\n${e.tomorrowIntention}`);
      return lines.join("\n");
    })
    .join("\n\n─────────────\n\n");
}
