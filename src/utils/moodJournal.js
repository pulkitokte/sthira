// src/utils/moodJournal.js
// Pure persistence utilities for the Mood Journal.
// No UI. Fully testable. Supports future insights and search.

const STORAGE_KEY = "sthira_mood_journal";

/**
 * Load the full journal entries array from localStorage.
 * Entries are stored newest-first.
 * Each entry: { id, date, timestamp, mood, text }
 */
export function loadJournalEntries() {
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
    // Fail silently — storage may be full or unavailable
  }
}

/**
 * Create and save a new journal entry.
 * Returns the saved entry.
 */
export function createJournalEntry({ mood, text }) {
  const now = new Date();
  const entry = {
    id: `journal-${Date.now()}`,
    date: now.toISOString().slice(0, 10),
    timestamp: now.toISOString(),
    mood,
    text: text.trim(),
  };
  const entries = loadJournalEntries();
  entries.unshift(entry);
  saveEntries(entries);
  return entry;
}

/**
 * Update an existing journal entry by id.
 * Returns the updated entry, or null if not found.
 */
export function updateJournalEntry(id, { mood, text }) {
  const entries = loadJournalEntries();
  const index = entries.findIndex((e) => e.id === id);
  if (index === -1) return null;

  const updated = {
    ...entries[index],
    mood,
    text: text.trim(),
    editedAt: new Date().toISOString(),
  };
  entries[index] = updated;
  saveEntries(entries);
  return updated;
}

/**
 * Delete a journal entry by id.
 */
export function deleteJournalEntry(id) {
  const entries = loadJournalEntries();
  saveEntries(entries.filter((e) => e.id !== id));
}

/**
 * Group entries by date for timeline display.
 * Returns an array of { date, entries[] } objects, newest date first.
 */
export function groupEntriesByDate(entries) {
  const map = new Map();
  for (const entry of entries) {
    if (!map.has(entry.date)) {
      map.set(entry.date, []);
    }
    map.get(entry.date).push(entry);
  }
  // Convert to array, already newest-first since entries are sorted that way
  return Array.from(map.entries()).map(([date, items]) => ({
    date,
    entries: items,
  }));
}

/**
 * Format a date string (YYYY-MM-DD) into a human-readable label.
 * Returns "Today", "Yesterday", or a formatted date like "12 June".
 */
export function formatEntryDate(dateKey) {
  const today = new Date().toISOString().slice(0, 10);
  const yesterday = new Date(Date.now() - 86400000).toISOString().slice(0, 10);

  if (dateKey === today) return "Today";
  if (dateKey === yesterday) return "Yesterday";

  const date = new Date(dateKey + "T12:00:00");
  return date.toLocaleDateString("en-IN", { day: "numeric", month: "long" });
}

/**
 * Format a full ISO timestamp to a readable time like "9:32 AM".
 */
export function formatEntryTime(timestamp) {
  return new Date(timestamp).toLocaleTimeString("en-IN", {
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  });
}

/**
 * Returns total entry count — useful for future insights/achievements.
 */
export function getTotalEntryCount() {
  return loadJournalEntries().length;
}

/**
 * Returns entries for a specific date key — useful for future date filtering.
 */
export function getEntriesForDate(dateKey) {
  return loadJournalEntries().filter((e) => e.date === dateKey);
}

/**
 * Returns all unique moods recorded — useful for future mood trend analysis.
 */
export function getMoodHistory() {
  return loadJournalEntries().map((e) => ({ date: e.date, mood: e.mood }));
}
