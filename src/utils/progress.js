import { getDateKey, parseDateKey } from "./date";

/**
 * Streaks are derived from completion history, never stored separately,
 * so they can't drift out of sync with the actual record of completions.
 */
export function computeStreaks(completions) {
  const dateKeys = new Set(completions.map((c) => c.dateKey));

  if (dateKeys.size === 0) {
    return { currentStreak: 0, longestStreak: 0 };
  }

  // Current streak: walk backward from today. If today has no completion yet,
  // start from yesterday instead — the day isn't over, so it shouldn't reset yet.
  let currentStreak = 0;
  const cursor = new Date();
  if (!dateKeys.has(getDateKey(cursor))) {
    cursor.setDate(cursor.getDate() - 1);
  }
  while (dateKeys.has(getDateKey(cursor))) {
    currentStreak += 1;
    cursor.setDate(cursor.getDate() - 1);
  }

  // Longest streak: scan all unique dates in order for the longest consecutive run.
  const sortedKeys = [...dateKeys].sort();
  let longestStreak = 0;
  let run = 0;
  let prevDate = null;

  for (const key of sortedKeys) {
    const date = parseDateKey(key);
    if (prevDate) {
      const diffDays = Math.round((date - prevDate) / 86400000);
      run = diffDays === 1 ? run + 1 : 1;
    } else {
      run = 1;
    }
    longestStreak = Math.max(longestStreak, run);
    prevDate = date;
  }

  return {
    currentStreak,
    longestStreak: Math.max(longestStreak, currentStreak),
  };
}
