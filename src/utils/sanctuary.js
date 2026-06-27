// src/utils/sanctuary.js
// Pure utility functions for the Digital Sanctuary.
// No UI. Fully testable. Supports future audio and analytics.

import {
  SANCTUARY_MESSAGES,
  QUIET_EXERCISES,
  AMBIENCE_OPTIONS,
} from "../data/sanctuaryData";

const STORAGE_KEY = "sthira_sanctuary";

// ── localStorage helpers ──────────────────────────────────────────────────────

function loadSanctuaryData() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : {};
  } catch (_) {
    return {};
  }
}

function saveSanctuaryData(data) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  } catch (_) {
    // Fail silently
  }
}

// ── Ambience ──────────────────────────────────────────────────────────────────

/**
 * Load the user's saved ambience preference.
 * Defaults to "silence".
 */
export function loadAmbiencePreference() {
  const data = loadSanctuaryData();
  return data.ambience ?? "silence";
}

/**
 * Save the user's ambience preference.
 */
export function saveAmbiencePreference(ambienceId) {
  const data = loadSanctuaryData();
  saveSanctuaryData({ ...data, ambience: ambienceId });
}

/**
 * Get an ambience option object by id.
 */
export function getAmbienceById(id) {
  return (
    AMBIENCE_OPTIONS.find((a) => a.id === id) ??
    AMBIENCE_OPTIONS[AMBIENCE_OPTIONS.length - 1]
  );
}

// ── Messages ──────────────────────────────────────────────────────────────────

/**
 * Returns a random sanctuary message.
 * Avoids repeating the last shown message.
 */
export function getRandomSanctuaryMessage(excludeMessage = null) {
  const pool = excludeMessage
    ? SANCTUARY_MESSAGES.filter((m) => m !== excludeMessage)
    : SANCTUARY_MESSAGES;
  return pool[Math.floor(Math.random() * pool.length)];
}

// ── Quiet exercises ───────────────────────────────────────────────────────────

/**
 * Returns a random quiet exercise.
 * Avoids repeating the last shown exercise.
 */
export function getRandomQuietExercise(excludeExercise = null) {
  const pool = excludeExercise
    ? QUIET_EXERCISES.filter((e) => e !== excludeExercise)
    : QUIET_EXERCISES;
  return pool[Math.floor(Math.random() * pool.length)];
}

// ── Visit tracking (future analytics support) ────────────────────────────────

/**
 * Record a sanctuary visit timestamp.
 * Supports future insights and usage analytics.
 */
export function recordSanctuaryVisit() {
  const data = loadSanctuaryData();
  const visits = data.visits ?? [];
  visits.unshift(new Date().toISOString());
  // Keep last 100 visits
  saveSanctuaryData({ ...data, visits: visits.slice(0, 100) });
}

/**
 * Get total sanctuary visit count.
 */
export function getSanctuaryVisitCount() {
  const data = loadSanctuaryData();
  return (data.visits ?? []).length;
}

/**
 * Get the last visit timestamp, or null.
 */
export function getLastSanctuaryVisit() {
  const data = loadSanctuaryData();
  return (data.visits ?? [])[0] ?? null;
}
