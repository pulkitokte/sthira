import { WELLNESS_DIMENSIONS } from "../constants/wellness";
import { getDateKey, parseDateKey } from "./date";

function getDimension(dimensionId) {
  return WELLNESS_DIMENSIONS.find((d) => d.id === dimensionId);
}

export function getDimensionOptionLabel(dimensionId, value) {
  const dimension = getDimension(dimensionId);
  if (!dimension || !value) return "—";
  return dimension.options.find((opt) => opt.value === value)?.label ?? "—";
}

function getOptionIndex(dimensionId, value) {
  const dimension = getDimension(dimensionId);
  if (!dimension || !value) return -1;
  return dimension.options.findIndex((opt) => opt.value === value);
}

export function getTodayEntry(entries) {
  const todayKey = getDateKey();
  return entries.find((entry) => entry.dateKey === todayKey) ?? null;
}

/**
 * Merges a partial update into today's (or any given day's) entry,
 * creating it if it doesn't exist yet — so each tap on the check-in
 * screen overwrites only the field that changed.
 */
export function upsertEntry(entries, dateKey, partialUpdate) {
  const existing = entries.find((entry) => entry.dateKey === dateKey);
  const timestamp = new Date().toISOString();

  if (existing) {
    return entries.map((entry) =>
      entry.dateKey === dateKey
        ? { ...entry, ...partialUpdate, timestamp }
        : entry,
    );
  }

  return [
    ...entries,
    {
      dateKey,
      energy: null,
      focus: null,
      stress: null,
      mood: null,
      ...partialUpdate,
      timestamp,
    },
  ];
}

export function getRecentEntries(entries, days = 7) {
  const cutoff = new Date();
  cutoff.setDate(cutoff.getDate() - (days - 1));
  cutoff.setHours(0, 0, 0, 0);

  return entries
    .filter((entry) => parseDateKey(entry.dateKey) >= cutoff)
    .sort((a, b) => b.dateKey.localeCompare(a.dateKey));
}

/**
 * Deterministic, ordered checks — no AI, no scoring shown to the user.
 * Assumes a complete entry; callers should gate on that themselves.
 */
export function getWellnessInsight(entry) {
  if (!entry) return null;

  const stressIndex = getOptionIndex("stress", entry.stress);
  const energyIndex = getOptionIndex("energy", entry.energy);
  const focusIndex = getOptionIndex("focus", entry.focus);
  const moodIndex = getOptionIndex("mood", entry.mood);

  if (stressIndex >= 3) {
    return {
      message:
        "You seem stressed today. A short breathing break may help you settle.",
      actionType: "recovery",
    };
  }

  if (energyIndex !== -1 && energyIndex <= 1) {
    return {
      message: "Your energy is low today. Consider a short recovery session.",
      actionType: "recovery",
    };
  }

  if (focusIndex !== -1 && focusIndex <= 1) {
    return {
      message:
        "Your focus feels scattered today. A short eye break may help you reset.",
      actionType: "eye",
    };
  }

  if (moodIndex === 0) {
    return {
      message:
        "You're feeling tired today. Be gentle with yourself, and stay hydrated.",
      actionType: "hydration",
    };
  }

  if (focusIndex >= 3 && stressIndex <= 1) {
    return {
      message: "Your focus is strong today. Nice work staying steady.",
      actionType: null,
    };
  }

  if (energyIndex >= 3 && moodIndex >= 3) {
    return {
      message: "You're feeling energized today — a good day to build on.",
      actionType: null,
    };
  }

  return {
    message: "Your wellness balance looks good today.",
    actionType: null,
  };
}
