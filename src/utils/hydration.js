import { getDateKey } from "./date";
import {
  DEFAULT_GOAL_BY_ACTIVITY,
  FALLBACK_GOAL,
} from "../constants/hydration";

export function getTodayTotal(logs) {
  const today = getDateKey();
  return logs
    .filter((log) => log.dateKey === today)
    .reduce((sum, log) => sum + log.amount, 0);
}

export function getDailyTotals(logs) {
  const totals = {};
  logs.forEach((log) => {
    totals[log.dateKey] = (totals[log.dateKey] ?? 0) + log.amount;
  });
  return Object.entries(totals)
    .map(([dateKey, total]) => ({ dateKey, total }))
    .sort((a, b) => b.dateKey.localeCompare(a.dateKey));
}

export function getDefaultGoalForActivityLevel(activityLevel) {
  return DEFAULT_GOAL_BY_ACTIVITY[activityLevel] ?? FALLBACK_GOAL;
}

export function getEncouragementMessage(percentage) {
  if (percentage >= 100) {
    return "You've reached your goal for today. Well done.";
  }

  if (percentage >= 75) {
    return "Almost there — a little more and you're set.";
  }

  if (percentage >= 50) {
    return "Good pace. Keep sipping through the day.";
  }

  if (percentage >= 25) {
    return "Off to a good start.";
  }

  return "Let's start the day with a glass of water.";
}