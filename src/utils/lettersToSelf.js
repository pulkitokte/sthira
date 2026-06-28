// src/utils/lettersToSelf.js
// Pure persistence and data utilities for Letters to Self.
// No UI. Fully testable.
// Architecture supports future notifications, export, encryption, search.

import { DELIVERY_TYPES } from "../data/lettersData";

const STORAGE_KEY = "sthira_letters";

/**
 * Load all letters from localStorage.
 * Returns newest-first array.
 * Each letter: { id, title, body, mood, createdAt, deliveryType, unlockDate, isUnlocked }
 */
export function loadLetters() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch (_) {
    return [];
  }
}

/**
 * Persist the full letters array.
 */
function saveLetters(letters) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(letters));
  } catch (_) {
    // Fail silently
  }
}

/**
 * Check if a letter is currently unlocked.
 * "anytime" letters are always unlocked.
 * "later" letters unlock once unlockDate <= today.
 */
export function isLetterUnlocked(letter) {
  if (letter.deliveryType === DELIVERY_TYPES.ANYTIME) return true;
  if (!letter.unlockDate) return false;
  const today = new Date().toISOString().slice(0, 10);
  return letter.unlockDate <= today;
}

/**
 * Create and save a new letter.
 * Returns the saved letter.
 */
export function createLetter({ title, body, mood, deliveryType, unlockDate }) {
  const now = new Date();
  const letter = {
    id: `letter-${Date.now()}`,
    title: title.trim(),
    body: body.trim(),
    mood: mood ?? null,
    createdAt: now.toISOString(),
    deliveryType: deliveryType ?? DELIVERY_TYPES.ANYTIME,
    unlockDate: deliveryType === DELIVERY_TYPES.LATER ? unlockDate : null,
    isUnlocked: deliveryType === DELIVERY_TYPES.ANYTIME,
  };
  const existing = loadLetters();
  existing.unshift(letter);
  saveLetters(existing);
  return letter;
}

/**
 * Delete a letter by id.
 */
export function deleteLetter(id) {
  saveLetters(loadLetters().filter((l) => l.id !== id));
}

/**
 * Mark a letter as unlocked (called when user opens a "later" letter whose date has arrived).
 */
export function markLetterUnlocked(id) {
  const letters = loadLetters();
  const index = letters.findIndex((l) => l.id === id);
  if (index !== -1) {
    letters[index] = { ...letters[index], isUnlocked: true };
    saveLetters(letters);
    return letters[index];
  }
  return null;
}

/**
 * Split letters into available and future groups.
 * Returns { available: Letter[], future: Letter[] }
 */
export function groupLetters(letters) {
  const available = [];
  const future = [];
  for (const letter of letters) {
    if (isLetterUnlocked(letter)) {
      available.push(letter);
    } else {
      future.push(letter);
    }
  }
  return { available, future };
}

/**
 * Format ISO timestamp to "12 June 2025" style.
 */
export function formatLetterDate(isoString) {
  const d = new Date(isoString);
  return d.toLocaleDateString("en-IN", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

/**
 * Format a YYYY-MM-DD unlock date to "12 June 2025".
 */
export function formatUnlockDate(dateKey) {
  if (!dateKey) return "";
  const d = new Date(dateKey + "T12:00:00");
  return d.toLocaleDateString("en-IN", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

/**
 * Returns days remaining until a letter unlocks.
 * Returns 0 if already unlocked or no unlock date.
 */
export function daysUntilUnlock(unlockDate) {
  if (!unlockDate) return 0;
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const unlock = new Date(unlockDate + "T00:00:00");
  const diff = unlock - today;
  return Math.max(0, Math.ceil(diff / 86400000));
}

/**
 * Get minimum date string for the unlock date picker (tomorrow).
 */
export function getTomorrowKey() {
  const d = new Date();
  d.setDate(d.getDate() + 1);
  return d.toISOString().slice(0, 10);
}

// ── Future support utilities ──────────────────────────────────────────────────

/**
 * Total letter count — for future achievements.
 */
export function getTotalLetterCount() {
  return loadLetters().length;
}

/**
 * Search letters by title or body — for future search.
 */
export function searchLetters(query) {
  if (!query || !query.trim()) return loadLetters();
  const q = query.toLowerCase();
  return loadLetters().filter(
    (l) =>
      l.title.toLowerCase().includes(q) || l.body.toLowerCase().includes(q),
  );
}

/**
 * Export all letters as plain text — for future export feature.
 */
export function exportLettersAsText() {
  const letters = loadLetters();
  if (letters.length === 0) return "No letters written yet.";
  return letters
    .map((l) => {
      const lines = [
        `Title: ${l.title}`,
        `Written: ${formatLetterDate(l.createdAt)}`,
      ];
      if (l.mood) lines.push(`Mood: ${l.mood}`);
      lines.push("", l.body);
      return lines.join("\n");
    })
    .join("\n\n─────────────\n\n");
}
