// src/utils/lettersToSelf.js
// Pure utility functions for the Letters to Self feature.
// Manages persistence for letter entries in localStorage.
//
// Batch 54: added null guards, safe reader, ensureArray throughout.
// Regression fix (round 1): restored createLetter() export.
// Regression fix (round 2): added groupLetters, isLetterUnlocked, getTomorrowKey.
// Regression fix (round 3 — full audit): added formatLetterDate,
// formatUnlockDate, daysUntilUnlock.
// Bug fix (delete not working): createLetter() never assigned an `id` to
// new letters. deleteLetter(id) has an `if (!id) return;` guard, so every
// delete attempt silently no-op'd — the confirmation modal closed and
// state "refreshed," but storage was never touched, so the letter always
// reappeared. createLetter now generates an id (and createdAt, also
// expected elsewhere but previously unset) if not already present.
// loadLetters() also backfills id/createdAt for any letters already saved
// before this fix, so existing stuck letters become deletable too.

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

function safeParseDate(value) {
  if (!value) return null;
  const d = new Date(value);
  return Number.isNaN(d.getTime()) ? null : d;
}

function generateLetterId() {
  return `letter-${Date.now()}-${Math.random().toString(36).slice(2, 9)}`;
}

// ── Public API ────────────────────────────────────────────────────────────────

/**
 * Load all letters from storage.
 * Always returns an array, never null or undefined.
 * Backfills `id`/`createdAt` on any letter missing them (e.g. letters saved
 * before this fix), persisting the repair so it only happens once.
 */
export function loadLetters() {
  const letters = ensureArray(safeRead());
  let needsWrite = false;

  const backfilled = letters.map((l) => {
    if (l && typeof l === "object" && !l.id) {
      needsWrite = true;
      return {
        ...l,
        id: generateLetterId(),
        createdAt: l.createdAt ?? new Date().toISOString(),
      };
    }
    return l;
  });

  if (needsWrite) safeWrite(backfilled);
  return backfilled;
}

/**
 * Create and save a new letter entry.
 * Assigns `id` and `createdAt` if not already present on the given object —
 * every other function in this file (delete, update, lookup, unlock checks)
 * depends on `id` existing.
 */
export function createLetter(letter) {
  if (!letter || typeof letter !== "object") return;
  const existing = loadLetters();
  const complete = {
    ...letter,
    id: letter.id ?? generateLetterId(),
    createdAt: letter.createdAt ?? new Date().toISOString(),
  };
  safeWrite([complete, ...existing]);
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
 */
export function isLetterUnlocked(letter) {
  if (!letter || typeof letter !== "object") return true;
  if (letter.deliveryType === DELIVERY_TYPES?.ANYTIME) return true;
  if (!letter.unlockDate) return true;
  return letter.unlockDate <= todayKey();
}

/**
 * Splits letters into { available, future } based on isLetterUnlocked.
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
 * Formats a letter's createdAt timestamp into a friendly display date.
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
 * Formats a letter's unlockDate into a friendly display date.
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
