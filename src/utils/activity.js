export const ACTIVITY_TYPES = {
  ROUTINE: "routine",
  RECOVERY: "recovery",
  EYE: "eye",
};

export function normalizeRoutineCompletions(completions) {
  return completions.map((c) => ({
    id: c.id,
    type: ACTIVITY_TYPES.ROUTINE,
    title: c.routineTitle,
    duration: c.duration,
    dateKey: c.dateKey,
    timestamp: c.timestamp,
  }));
}

export function normalizeRecoveryCompletions(completions) {
  return completions.map((c) => ({
    id: c.id,
    type: ACTIVITY_TYPES.RECOVERY,
    title: c.sessionTitle,
    duration: c.duration,
    dateKey: c.dateKey,
    timestamp: c.timestamp,
  }));
}

export function normalizeEyeCompletions(completions) {
  return completions.map((c) => ({
    id: c.id,
    type: ACTIVITY_TYPES.EYE,
    title: c.sessionTitle,
    duration: c.duration,
    dateKey: c.dateKey,
    timestamp: c.timestamp,
  }));
}

export function groupActivitiesByDate(activities) {
  const groups = {};
  activities.forEach((activity) => {
    if (!groups[activity.dateKey]) groups[activity.dateKey] = [];
    groups[activity.dateKey].push(activity);
  });

  return Object.entries(groups)
    .sort((a, b) => b[0].localeCompare(a[0]))
    .map(([dateKey, items]) => ({ dateKey, items }));
}
