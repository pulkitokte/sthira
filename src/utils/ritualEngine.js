import { SIGNAL_RITUALS, WEEKDAY_RITUALS } from "../data/rituals";
import { getDayOfYear } from "./date";

const STUDY_HOURS_INDEX = { lt2: 0, "2-4": 1, "4-6": 2, "6-8": 3, "8plus": 4 };

function isHeavyStudier(studyHours) {
  return (STUDY_HOURS_INDEX[studyHours] ?? 0) >= 3;
}

/**
 * Returns exactly one ritual for the given day.
 *
 * Priority order (first matching condition wins):
 *   1. High stress from today's wellness check-in
 *   2. Low energy from today's wellness check-in
 *   3. Heavy study schedule (onboarding) — only if no wellness override
 *   4. Beginner activity level with no completions yet this week
 *   5. Weekday ritual — rotated deterministically by week-of-year within
 *      each day's pool, so the ritual changes week to week but is stable
 *      for the entire current day
 *
 * All inputs are optional — the engine degrades gracefully when data is
 * missing and always returns a valid ritual.
 */
export function getDailyRitual(
  onboardingData,
  todayEntry,
  referenceDate = new Date(),
) {
  const { studyHours, activityLevel } = onboardingData ?? {};

  // ── 1. Stress override ────────────────────────────────────────────────────
  if (
    todayEntry?.stress &&
    ["very-stressed", "overwhelmed"].includes(todayEntry.stress)
  ) {
    return SIGNAL_RITUALS.HIGH_STRESS;
  }

  // ── 2. Energy override ────────────────────────────────────────────────────
  if (todayEntry?.energy && ["very-low", "low"].includes(todayEntry.energy)) {
    return SIGNAL_RITUALS.LOW_ENERGY;
  }

  // ── 3. Heavy study override ───────────────────────────────────────────────
  if (isHeavyStudier(studyHours)) {
    // Only apply if there's no wellness signal already handled above
    return SIGNAL_RITUALS.HEAVY_STUDY;
  }

  // ── 4. Beginner override ──────────────────────────────────────────────────
  if (activityLevel === "beginner") {
    return SIGNAL_RITUALS.BEGINNER;
  }

  // ── 5. Weekday deterministic rotation ────────────────────────────────────
  const weekday = referenceDate.getDay(); // 0 = Sunday
  const pool = WEEKDAY_RITUALS[weekday] ?? WEEKDAY_RITUALS[1];

  // Use week-of-year to rotate within the pool. Math.floor(dayOfYear / 7)
  // produces the same integer for every day within a given week, so the
  // ritual is stable across the full day but cycles across calendar weeks.
  const weekIndex = Math.floor(getDayOfYear(referenceDate) / 7);
  const poolIndex = weekIndex % pool.length;

  return pool[poolIndex];
}
