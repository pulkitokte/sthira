// src/utils/lettersToSelf.js
// Pure utility functions for the Letters to Self feature.
// Manages persistence for letter entries in localStorage.
// Batch 54: added null guard to getTotalLetterCount() and all array operations
//           to prevent runtime errors from corrupted or missing storage.

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

// ── Public API ────────────────────────────────────────────────────────────────

/**
 * Load all letters from storage.
 * Always returns an array, never null or undefined.
 */
export function loadLetters() {
  return ensureArray(safeRead());
}

/**
 * Save a new letter entry.
 * Does not overwrite unrelated storage keys.
 */
export function saveLetter(letter) {
  if (!letter || typeof letter !== "object") return;
  const existing = loadLetters();
  safeWrite([letter, ...existing]);
}

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
  safeWrite(
    existing.map((l) =>
      l?.id === id ? { ...l, ...updates } : l,
    ),
  );
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
 * Get letters that are ready to open (deliveryType === "later" with past openAfter date,
 * or deliveryType === "now").
 */
export function getOpenableLetters() {
  const now     = new Date().toISOString();
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
 * Get sealed letters (not yet openable).
 */
export function getSealedLetters() {
  const now     = new Date().toISOString();
  const letters = loadLetters();
  return letters.filter((l) => {
    if (!l || typeof l !== "object") return false;
    return l.deliveryType === "later" && l.openAfter && l.openAfter > now;
  });
}

/**
 * Clear all letters from storage.
 * Used only by Settings reset — does not touch other storage keys.
 */
export function clearAllLetters() {
  safeWrite([]);
}