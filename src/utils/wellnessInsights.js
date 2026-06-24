import { getDateKey, parseDateKey } from "./date";

// ─────────────────────────────────────────────────────────────────────────────
// Internal helpers
// ─────────────────────────────────────────────────────────────────────────────

const WEEKDAY_NAMES = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

function getWeekdayName(dateKey) {
  return WEEKDAY_NAMES[parseDateKey(dateKey).getDay()];
}

function uniqueDayKeys(items) {
  return [...new Set(items.map((item) => item.dateKey))];
}

function mostFrequent(arr) {
  if (!arr || arr.length === 0) return null;
  const counts = {};
  for (const val of arr) {
    counts[val] = (counts[val] ?? 0) + 1;
  }
  return Object.entries(counts).sort((a, b) => b[1] - a[1])[0][0];
}

function formatDate(isoString) {
  if (!isoString) return null;
  return new Date(isoString).toLocaleDateString(undefined, {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

// ─────────────────────────────────────────────────────────────────────────────
// Section 1 — Movement Overview
// ─────────────────────────────────────────────────────────────────────────────

/**
 * Returns stats about morning routine completion history.
 * @param {object} insightData
 * @returns {Array<{ id, label, value, sub }>}
 */
export function getMovementOverview(insightData) {
  const {
    routineCompletions = [],
    currentStreak = 0,
    longestStreak = 0,
  } = insightData;

  const stats = [];

  stats.push({
    id: "total-routines",
    label: "Total routines completed",
    value: routineCompletions.length,
    sub: routineCompletions.length === 1 ? "session" : "sessions",
  });

  stats.push({
    id: "current-streak",
    label: "Current streak",
    value: currentStreak,
    sub: currentStreak === 1 ? "day" : "days",
  });

  stats.push({
    id: "longest-streak",
    label: "Longest streak",
    value: longestStreak,
    sub: longestStreak === 1 ? "day" : "days",
  });

  // Favourite category by completion count
  if (routineCompletions.length > 0) {
    const catCounts = {};
    for (const c of routineCompletions) {
      if (c.routineId) {
        // Derive category from the static routine data via insightData
        const categoryId = insightData.routineCategoryMap?.[c.routineId];
        if (categoryId) {
          catCounts[categoryId] = (catCounts[categoryId] ?? 0) + 1;
        }
      }
    }
    const topCategory = Object.entries(catCounts).sort(
      (a, b) => b[1] - a[1],
    )[0];
    if (topCategory) {
      stats.push({
        id: "favourite-category",
        label: "Most-visited category",
        value:
          insightData.categoryLabels?.[topCategory[0]] ?? "Morning Routines",
        sub: `${topCategory[1]} time${topCategory[1] !== 1 ? "s" : ""}`,
      });
    }
  }

  // Most active weekday
  if (routineCompletions.length >= 3) {
    const dayFreq = {};
    for (const c of routineCompletions) {
      const day = getWeekdayName(c.dateKey);
      dayFreq[day] = (dayFreq[day] ?? 0) + 1;
    }
    const topDay = Object.entries(dayFreq).sort((a, b) => b[1] - a[1])[0];
    if (topDay) {
      stats.push({
        id: "active-day",
        label: "Most active day",
        value: topDay[0],
        sub: `${topDay[1]} routine${topDay[1] !== 1 ? "s" : ""} completed`,
      });
    }
  }

  return stats;
}

// ─────────────────────────────────────────────────────────────────────────────
// Section 2 — Hydration Patterns
// ─────────────────────────────────────────────────────────────────────────────

export function getHydrationPatterns(insightData) {
  const { hydrationDailyTotals = [], hydrationGoal = 2500 } = insightData;

  const stats = [];

  const daysWithData = hydrationDailyTotals.filter((d) => d.total > 0);

  if (daysWithData.length === 0) return stats;

  const totalMl = daysWithData.reduce((sum, d) => sum + d.total, 0);
  const avgMl = Math.round(totalMl / daysWithData.length);

  stats.push({
    id: "avg-hydration",
    label: "Average daily intake",
    value: `${avgMl} ml`,
    sub: `across ${daysWithData.length} logged day${daysWithData.length !== 1 ? "s" : ""}`,
  });

  const best = daysWithData.reduce(
    (top, d) => (d.total > top.total ? d : top),
    daysWithData[0],
  );
  stats.push({
    id: "best-day",
    label: "Best hydration day",
    value: `${best.total} ml`,
    sub: parseDateKey(best.dateKey).toLocaleDateString(undefined, {
      weekday: "short",
      month: "short",
      day: "numeric",
    }),
  });

  const daysGoalReached = daysWithData.filter(
    (d) => d.total >= hydrationGoal,
  ).length;
  stats.push({
    id: "goals-reached",
    label: "Daily goal reached",
    value: daysGoalReached,
    sub: `out of ${daysWithData.length} logged day${daysWithData.length !== 1 ? "s" : ""}`,
  });

  return stats;
}

// ─────────────────────────────────────────────────────────────────────────────
// Section 3 — Wellness Trends
// ─────────────────────────────────────────────────────────────────────────────

const WELLNESS_LABELS = {
  // energy
  "very-low": "Very Low",
  low: "Low",
  balanced: "Balanced",
  high: "High",
  excellent: "Excellent",
  // focus
  distracted: "Distracted",
  struggling: "Struggling",
  average: "Average",
  focused: "Focused",
  "deep-focus": "Deep Focus",
  // stress
  calm: "Calm",
  "slightly-stressed": "Slightly Stressed",
  "moderately-stressed": "Moderately Stressed",
  "very-stressed": "Very Stressed",
  overwhelmed: "Overwhelmed",
  // mood
  tired: "Tired",
  neutral: "Neutral",
  good: "Good",
  great: "Great",
  motivated: "Motivated",
};

function labelOf(value) {
  return WELLNESS_LABELS[value] ?? value ?? "—";
}

export function getWellnessTrends(insightData) {
  const { wellnessEntries = [] } = insightData;
  const stats = [];

  if (wellnessEntries.length === 0) return stats;

  stats.push({
    id: "checkins",
    label: "Total check-ins",
    value: wellnessEntries.length,
    sub: `day${wellnessEntries.length !== 1 ? "s" : ""} reflected on`,
  });

  const moods = wellnessEntries.map((e) => e.mood).filter(Boolean);
  if (moods.length > 0) {
    stats.push({
      id: "common-mood",
      label: "Most common mood",
      value: labelOf(mostFrequent(moods)),
      sub: null,
    });
  }

  const energyValues = wellnessEntries.map((e) => e.energy).filter(Boolean);
  if (energyValues.length > 0) {
    stats.push({
      id: "common-energy",
      label: "Most common energy level",
      value: labelOf(mostFrequent(energyValues)),
      sub: null,
    });
  }

  const stressValues = wellnessEntries.map((e) => e.stress).filter(Boolean);
  if (stressValues.length > 0) {
    const calmCount = stressValues.filter((v) => v === "calm").length;
    const highCount = stressValues.filter((v) =>
      ["very-stressed", "overwhelmed"].includes(v),
    ).length;
    let stressSummary;
    if (calmCount > stressValues.length / 2) {
      stressSummary = "Mostly calm";
    } else if (highCount > stressValues.length / 3) {
      stressSummary = "Often elevated";
    } else {
      stressSummary = labelOf(mostFrequent(stressValues));
    }
    stats.push({
      id: "stress-pattern",
      label: "Stress pattern",
      value: stressSummary,
      sub: null,
    });
  }

  const focusValues = wellnessEntries.map((e) => e.focus).filter(Boolean);
  if (focusValues.length > 0) {
    stats.push({
      id: "common-focus",
      label: "Most common focus level",
      value: labelOf(mostFrequent(focusValues)),
      sub: null,
    });
  }

  return stats;
}

// ─────────────────────────────────────────────────────────────────────────────
// Section 4 — Recovery Habits
// ─────────────────────────────────────────────────────────────────────────────

export function getRecoveryHabits(insightData) {
  const { recoveryCompletions = [], eyeCompletions = [] } = insightData;

  const stats = [];

  stats.push({
    id: "study-break-sessions",
    label: "Study break sessions",
    value: recoveryCompletions.length,
    sub: "completed",
  });

  stats.push({
    id: "eye-recovery-sessions",
    label: "Eye recovery sessions",
    value: eyeCompletions.length,
    sub: "completed",
  });

  const totalRecovery = recoveryCompletions.length + eyeCompletions.length;
  if (totalRecovery > 0) {
    stats.push({
      id: "total-recovery",
      label: "Total recovery sessions",
      value: totalRecovery,
      sub: "across all types",
    });
  }

  // Most active recovery weekday
  const allRecovery = [...recoveryCompletions, ...eyeCompletions];
  if (allRecovery.length >= 3) {
    const dayFreq = {};
    for (const c of allRecovery) {
      const day = getWeekdayName(c.dateKey);
      dayFreq[day] = (dayFreq[day] ?? 0) + 1;
    }
    const topDay = Object.entries(dayFreq).sort((a, b) => b[1] - a[1])[0];
    if (topDay) {
      stats.push({
        id: "recovery-active-day",
        label: "Most active recovery day",
        value: topDay[0],
        sub: `${topDay[1]} session${topDay[1] !== 1 ? "s" : ""}`,
      });
    }
  }

  return stats;
}

// ─────────────────────────────────────────────────────────────────────────────
// Section 5 — Gentle Reflections
// ─────────────────────────────────────────────────────────────────────────────

/**
 * Returns 2–4 supportive reflection strings derived from usage patterns.
 * Language is always first-person "you", observational, never prescriptive.
 */
export function getGentleReflections(insightData) {
  const {
    routineCompletions = [],
    recoveryCompletions = [],
    eyeCompletions = [],
    hydrationDailyTotals = [],
    hydrationGoal = 2500,
    wellnessEntries = [],
    longestStreak = 0,
    unlockedAchievementsCount = 0,
  } = insightData;

  const reflections = [];
  const today = new Date();

  // Consistency pattern
  const activeDayKeys = uniqueDayKeys(routineCompletions);
  if (activeDayKeys.length >= 5) {
    const weekdayActivity = activeDayKeys.filter((key) => {
      const day = parseDateKey(key).getDay();
      return day >= 1 && day <= 5;
    }).length;
    if (weekdayActivity / activeDayKeys.length >= 0.7) {
      reflections.push(
        "You tend to care for yourself most consistently during weekdays — a rhythm that adds up quietly.",
      );
    } else {
      reflections.push(
        "Your movement habit spans across the week, not just weekdays. That kind of flexibility is sustainable.",
      );
    }
  } else if (routineCompletions.length > 0) {
    reflections.push(
      "Every routine completed is a small act of care. The habit is beginning to take shape.",
    );
  }

  // Routine duration preference
  if (insightData.preferredRoutineDuration) {
    const dur = insightData.preferredRoutineDuration;
    if (dur <= 5) {
      reflections.push(
        "Short routines seem to fit naturally into your schedule. Consistency matters far more than duration.",
      );
    } else if (dur >= 15) {
      reflections.push(
        `You give yourself ${dur} minutes of movement each morning. That kind of commitment shapes the day.`,
      );
    }
  }

  // Eye recovery habit
  if (eyeCompletions.length >= 5) {
    reflections.push(
      "Eye recovery has become part of your study rhythm — a small habit protecting a lot.",
    );
  } else if (eyeCompletions.length >= 1) {
    reflections.push(
      "You have already started caring for your eyes. Regular short breaks make a quiet difference over time.",
    );
  }

  // Hydration
  const daysGoalReached = hydrationDailyTotals.filter(
    (d) => d.total >= hydrationGoal,
  ).length;
  if (daysGoalReached >= 5) {
    reflections.push(
      "Your hydration habit is one of the most consistent things in your Sthira practice.",
    );
  } else if (hydrationDailyTotals.filter((d) => d.total > 0).length >= 3) {
    reflections.push(
      "Logging water regularly — even imperfectly — is a habit worth building on.",
    );
  }

  // Wellness check-ins
  if (wellnessEntries.length >= 10) {
    reflections.push(
      "Checking in with yourself regularly is a form of self-awareness that quietly compounds.",
    );
  }

  // Recovery sessions
  const totalRecovery = recoveryCompletions.length + eyeCompletions.length;
  if (totalRecovery >= 10) {
    reflections.push(
      "Recovery is not a gap in your practice — it is part of it. You have shown that consistently.",
    );
  }

  // Streak recognition
  if (longestStreak >= 7) {
    reflections.push(
      `A ${longestStreak}-day streak is something to notice. Not as a score — just as evidence that the habit is real.`,
    );
  }

  // Achievements
  if (unlockedAchievementsCount >= 5) {
    reflections.push(
      "Across multiple areas — movement, hydration, wellness — you have shown up. That breadth matters.",
    );
  }

  // Cap at 4
  return reflections.slice(0, 4);
}
