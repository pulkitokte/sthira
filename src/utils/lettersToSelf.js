// src/utils/lettersToSelf.js
// Pure utility functions for the Letters to Self feature.
// Manages persistence for letter entries in localStorage.
//
// Batch 54: added null guards, safe reader, ensureArray throughout.
// Regression fix (round 1): restored createLetter() export.
// Regression fix (round 2): added groupLetters, isLetterUnlocked, getTomorrowKey.
// Regression fix (round 3 — full audit): added formatLetterDate,
// formatUnlockDate, daysUntilUnlock, which LetterCard.jsx and
// LetterOpenView.jsx depend on. This file has now been reconciled against
// every known importer in the project:
//   - useLettersToSelf.js
//   - LetterCard.jsx
//   - LetterComposer.jsx
//   - LetterOpenView.jsx
//   - Home.jsx

import { DELIVERY_TYPES } from "../data/lettersData";

const STORAGE_KEY = "sthira_letters";

// ── Safe reader ───────────────────────────────────────────────────────────────

function safeRead() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch (_) {
    return [];
  }
}

function safeWrite(letters) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(letters));
  } catch (_) {
    // Fail silently — storage may be full
  }
}

// ── Helpers ───────────────────────────────────────────────────────────────────

function ensureArray(data) {
  return Array.isArray(data) ? data : [];
}

function todayKey() {
  return new Date().toISOString().slice(0, 10);
}

/**
 * Safely parses a date-like value (ISO string or YYYY-MM-DD key) into a
 * Date object. Returns null if the value is missing or unparseable —
 * callers must null-guard on the result.
 */
function safeParseDate(value) {
  if (!value) return null;
  const d = new Date(value);
  return Number.isNaN(d.getTime()) ? null : d;
}

// ── Public API ────────────────────────────────────────────────────────────────

/**
 * Load all letters from storage.
 * Always returns an array, never null or undefined.
 */
export function loadLetters() {
  return ensureArray(safeRead());
}

/**
 * Create and save a new letter entry.
 * This is the primary export name — matches the original Batch 32 API
 * and what useLettersToSelf.js imports.
 */
export function createLetter(letter) {
  if (!letter || typeof letter !== "object") return;
  const existing = loadLetters();
  safeWrite([letter, ...existing]);
}

/**
 * Alias for createLetter — provided for forward compatibility.
 */
export const saveLetter = createLetter;

/**
 * Delete a letter by id.
 */
export function deleteLetter(id) {
  if (!id) return;
  const existing = loadLetters();
  safeWrite(existing.filter((l) => l?.id !== id));
}

/**
 * Update an existing letter by id.
 */
export function updateLetter(id, updates) {
  if (!id || !updates) return;
  const existing = loadLetters();
  safeWrite(existing.map((l) => (l?.id === id ? { ...l, ...updates } : l)));
}

/**
 * Get a single letter by id.
 * Returns null if not found.
 */
export function getLetterById(id) {
  if (!id) return null;
  const letters = loadLetters();
  return letters.find((l) => l?.id === id) ?? null;
}

/**
 * Get the total number of letters.
 * Safe against corrupted storage — always returns a non-negative integer.
 */
export function getTotalLetterCount() {
  return loadLetters().length;
}

/**
 * Legacy openAfter/deliveryType("now"/"later") based check.
 * Preserved from Batch 54 for any existing callers relying on it.
 */
export function getOpenableLetters() {
  const now = new Date().toISOString();
  const letters = loadLetters();
  return letters.filter((l) => {
    if (!l || typeof l !== "object") return false;
    if (l.deliveryType === "now") return true;
    if (l.deliveryType === "later") {
      return l.openAfter && l.openAfter <= now;
    }
    return true; // default: openable
  });
}

/**
 * Legacy sealed-letters check (openAfter based). Preserved as-is.
 */
export function getSealedLetters() {
  const now = new Date().toISOString();
  const letters = loadLetters();
  return letters.filter((l) => {
    if (!l || typeof l !== "object") return false;
    return l.deliveryType === "later" && l.openAfter && l.openAfter > now;
  });
}

/**
 * Returns tomorrow's date as a YYYY-MM-DD key, used by the compose form
 * as the default unlockDate value.
 */
export function getTomorrowKey() {
  const d = new Date();
  d.setDate(d.getDate() + 1);
  return d.toISOString().slice(0, 10);
}

/**
 * Determines whether a given letter (compose-form shape: deliveryType +
 * unlockDate) is currently unlocked/readable.
 * - Malformed entries default to unlocked (fail open, never hide content
 *   behind a broken guard).
 * - DELIVERY_TYPES.ANYTIME letters are always unlocked regardless of any
 *   stored unlockDate.
 * - Any other delivery type is unlocked once today's date key is on or
 *   after the letter's unlockDate.
 */
export function isLetterUnlocked(letter) {
  if (!letter || typeof letter !== "object") return true;
  if (letter.deliveryType === DELIVERY_TYPES?.ANYTIME) return true;
  if (!letter.unlockDate) return true;
  return letter.unlockDate <= todayKey();
}

/**
 * Splits letters into { available, future } based on isLetterUnlocked.
 * Used by useLettersToSelf.js to drive the timeline view.
 */
export function groupLetters(letters) {
  const list = ensureArray(letters);
  const available = [];
  const future = [];
  list.forEach((l) => {
    if (isLetterUnlocked(l)) {
      available.push(l);
    } else {
      future.push(l);
    }
  });
  return { available, future };
}

/**
 * Formats a letter's createdAt timestamp (ISO string) into a friendly
 * display date, e.g. "Jul 10, 2026".
 * Null/unparseable input returns an empty string rather than throwing,
 * so LetterCard/LetterOpenView never crash on malformed data.
 */
export function formatLetterDate(createdAt) {
  const d = safeParseDate(createdAt);
  if (!d) return "";
  return d.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

/**
 * Formats a letter's unlockDate (YYYY-MM-DD key) into a friendly display
 * date, e.g. "Jul 15, 2026". Same fail-safe behavior as formatLetterDate.
 */
export function formatUnlockDate(unlockDate) {
  const d = safeParseDate(unlockDate);
  if (!d) return "";
  return d.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

/**
 * Number of whole days between today and the given unlockDate key.
 * Returns 0 for missing/unparseable dates or dates that are today/past,
 * so LetterCard's "{days} days away" text never shows a negative number.
 */
export function daysUntilUnlock(unlockDate) {
  const target = safeParseDate(unlockDate);
  if (!target) return 0;
  const today = safeParseDate(todayKey());
  const diffMs = target.getTime() - today.getTime();
  const diffDays = Math.round(diffMs / (1000 * 60 * 60 * 24));
  return diffDays > 0 ? diffDays : 0;
}

/**
 * Clear all letters from storage.
 * Used only by Settings reset — does not touch other storage keys.
 */
export function clearAllLetters() {
  safeWrite([]);
}
