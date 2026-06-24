import { ROUTINES } from "../data/routines";

function getRoutineCategoryId(routineId) {
  return ROUTINES.find((r) => r.id === routineId)?.categoryId ?? null;
}

/**
 * Evaluates a single achievement against current app data.
 * Returns { unlocked: boolean, progress: { current, target } | null }
 *
 * Pure function — no side effects, no React dependencies.
 */
export function evaluateAchievement(achievementId, appData) {
  const {
    routineCompletions = [],
    recoveryCompletions = [],
    eyeCompletions = [],
    wellnessEntries = [],
    hydrationDailyTotals = [],
    hydrationGoal = 2500,
    longestStreak = 0,
  } = appData;

  switch (achievementId) {
    case "first-routine":
      return { unlocked: routineCompletions.length >= 1, progress: null };

    case "first-hydration-goal": {
      const reached = hydrationDailyTotals.some(
        (d) => d.total >= hydrationGoal,
      );
      return { unlocked: reached, progress: null };
    }

    case "first-wellness-checkin":
      return { unlocked: wellnessEntries.length >= 1, progress: null };

    case "streak-3":
      return {
        unlocked: longestStreak >= 3,
        progress: { current: Math.min(longestStreak, 3), target: 3 },
      };

    case "streak-7":
      return {
        unlocked: longestStreak >= 7,
        progress: { current: Math.min(longestStreak, 7), target: 7 },
      };

    case "streak-14":
      return {
        unlocked: longestStreak >= 14,
        progress: { current: Math.min(longestStreak, 14), target: 14 },
      };

    case "streak-30":
      return {
        unlocked: longestStreak >= 30,
        progress: { current: Math.min(longestStreak, 30), target: 30 },
      };

    case "explore-3-categories": {
      const categoryIds = new Set(
        routineCompletions
          .map((c) => getRoutineCategoryId(c.routineId))
          .filter(Boolean),
      );
      const count = categoryIds.size;
      return {
        unlocked: count >= 3,
        progress: { current: Math.min(count, 3), target: 3 },
      };
    }

    case "try-eye-recovery":
      return { unlocked: eyeCompletions.length >= 1, progress: null };

    case "try-study-break":
      return { unlocked: recoveryCompletions.length >= 1, progress: null };

    case "wellness-5": {
      const count = wellnessEntries.length;
      return {
        unlocked: count >= 5,
        progress: { current: Math.min(count, 5), target: 5 },
      };
    }

    case "hydration-goal-3": {
      const daysReached = hydrationDailyTotals.filter(
        (d) => d.total >= hydrationGoal,
      ).length;
      return {
        unlocked: daysReached >= 3,
        progress: { current: Math.min(daysReached, 3), target: 3 },
      };
    }

    default:
      return { unlocked: false, progress: null };
  }
}

/**
 * Evaluates every achievement in the provided id array.
 * Returns { [id]: { unlocked, progress } }
 */
export function evaluateAllAchievements(achievementIds, appData) {
  const results = {};
  for (const id of achievementIds) {
    results[id] = evaluateAchievement(id, appData);
  }
  return results;
}
