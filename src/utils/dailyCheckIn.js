// src/utils/dailyCheckIn.js
// Pure utility functions for the Daily Check-In feature.
// No UI. Fully testable.

import { dailyCheckInQuestions } from "../data/dailyCheckInQuestions";

const STORAGE_KEY = "sthira_daily_checkin";

/**
 * Returns today's date as a YYYY-MM-DD string.
 */
export function getTodayKey() {
  return new Date().toISOString().slice(0, 10);
}

/**
 * Deterministically select a question for a given date string.
 * Uses a simple day-of-year index so each calendar day gets a different question
 * and the same date always returns the same question.
 */
export function getQuestionForDate(dateKey) {
  // Sum char codes for a stable hash of the date string
  const hash = dateKey.split("").reduce((acc, ch) => acc + ch.charCodeAt(0), 0);
  const index = hash % dailyCheckInQuestions.length;
  return dailyCheckInQuestions[index];
}

/**
 * Load the full check-in history array from localStorage.
 * Each entry: { date, questionId, selectedOption, timestamp }
 */
export function loadCheckInHistory() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch (_) {
    return [];
  }
}

/**
 * Load only today's check-in entry, or null if not yet completed.
 */
export function loadTodayCheckIn() {
  const today = getTodayKey();
  const history = loadCheckInHistory();
  return history.find((entry) => entry.date === today) ?? null;
}

/**
 * Save a completed check-in to localStorage.
 * Prepends the new entry so history is newest-first.
 */
export function saveCheckIn(questionId, selectedOption) {
  try {
    const history = loadCheckInHistory();
    const entry = {
      date: getTodayKey(),
      questionId,
      selectedOption,
      timestamp: new Date().toISOString(),
    };
    // Replace today's entry if it already exists, otherwise prepend
    const filtered = history.filter((e) => e.date !== entry.date);
    filtered.unshift(entry);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(filtered));
    return entry;
  } catch (_) {
    return null;
  }
}

/**
 * Calculate the current daily check-in streak.
 * A streak is consecutive calendar days with a completed check-in,
 * ending today or yesterday (to not break streak overnight before first open).
 */
export function getCheckInStreak() {
  const history = loadCheckInHistory();
  if (history.length === 0) return 0;

  const today = getTodayKey();
  const sortedDates = history
    .map((e) => e.date)
    .sort()
    .reverse();

  // Streak must include today or yesterday to be active
  const mostRecent = sortedDates[0];
  const yesterday = new Date();
  yesterday.setDate(yesterday.getDate() - 1);
  const yesterdayKey = yesterday.toISOString().slice(0, 10);

  if (mostRecent !== today && mostRecent !== yesterdayKey) return 0;

  let streak = 0;
  let cursor = new Date(mostRecent);

  for (const date of sortedDates) {
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
 * Returns the total number of completed check-ins across all time.
 * Useful for future insights and achievements.
 */
export function getTotalCheckIns() {
  return loadCheckInHistory().length;
}
