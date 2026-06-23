import { getDateKey, parseDateKey } from './date'

// ─────────────────────────────────────────────────────────────────────────────
// Private helpers
// ─────────────────────────────────────────────────────────────────────────────

const WEEKDAY_NAMES = [
  'Sunday', 'Monday', 'Tuesday', 'Wednesday',
  'Thursday', 'Friday', 'Saturday',
]

function getWeekDateKeys(referenceDate = new Date()) {
  const keys = []
  for (let i = 6; i >= 0; i--) {
    const d = new Date(referenceDate)
    d.setDate(d.getDate() - i)
    keys.push(getDateKey(d))
  }
  return keys
}

function getWeekdayName(dateKey) {
  return WEEKDAY_NAMES[parseDateKey(dateKey).getDay()]
}

function filterToWeek(items, weekKeys) {
  return items.filter((item) => weekKeys.includes(item.dateKey))
}

function uniqueDayKeys(items) {
  return [...new Set(items.map((item) => item.dateKey))]
}

const STUDY_HOURS_INDEX = { 'lt2': 0, '2-4': 1, '4-6': 2, '6-8': 3, '8plus': 4 }
function isHeavyStudier(studyHours) {
  return (STUDY_HOURS_INDEX[studyHours] ?? 0) >= 3
}

// ─────────────────────────────────────────────────────────────────────────────
// Exported utilities
// ─────────────────────────────────────────────────────────────────────────────

/**
 * Returns a human-readable date range string for the current 7-day window.
 * Example: "Mon 16 Dec – Sun 22 Dec"
 */
export function getWeekDateRange(referenceDate = new Date()) {
  const keys = getWeekDateKeys(referenceDate)
  const first = parseDateKey(keys[0])
  const last = parseDateKey(keys[6])
  const fmt = { month: 'short', day: 'numeric' }
  return `${first.toLocaleDateString(undefined, fmt)} – ${last.toLocaleDateString(undefined, fmt)}`
}

/**
 * Checks whether there is at least one data point in any category for this week.
 * The page shows an empty state below this threshold to avoid generating
 * reflection sections that are entirely empty.
 */
export function hasEnoughDataForReflection(weekData, referenceDate = new Date()) {
  const weekKeys = getWeekDateKeys(referenceDate)
  const hasRoutines = filterToWeek(weekData.routineCompletions ?? [], weekKeys).length > 0
  const hasRecovery =
    filterToWeek(weekData.recoveryCompletions ?? [], weekKeys).length > 0 ||
    filterToWeek(weekData.eyeCompletions ?? [], weekKeys).length > 0
  const hasHydration = (weekData.hydrationDailyTotals ?? []).some(
    (d) => weekKeys.includes(d.dateKey) && d.total > 0,
  )
  const hasWellness = filterToWeek(weekData.wellnessEntries ?? [], weekKeys).length > 0
  return hasRoutines || hasRecovery || hasHydration || hasWellness
}

/**
 * Simple at-a-glance counts.
 * Returns an array of { label, value, context } objects.
 */
export function getGlanceStats(weekData, referenceDate = new Date()) {
  const weekKeys = getWeekDateKeys(referenceDate)

  const routinesThisWeek = filterToWeek(weekData.routineCompletions ?? [], weekKeys)
  const recoveryThisWeek = filterToWeek(weekData.recoveryCompletions ?? [], weekKeys)
  const eyeThisWeek = filterToWeek(weekData.eyeCompletions ?? [], weekKeys)
  const hydrationThisWeek = (weekData.hydrationDailyTotals ?? []).filter(
    (d) => weekKeys.includes(d.dateKey) && d.total > 0,
  )
  const wellnessThisWeek = filterToWeek(weekData.wellnessEntries ?? [], weekKeys)

  const routineDays = uniqueDayKeys(routinesThisWeek).length
  const totalRecovery = recoveryThisWeek.length + eyeThisWeek.length

  return [
    {
      id: 'routines',
      label: 'Morning routines',
      value: routinesThisWeek.length,
      context:
        routineDays > 0
          ? `across ${routineDays} day${routineDays !== 1 ? 's' : ''}`
          : 'none this week',
    },
    {
      id: 'recovery',
      label: 'Recovery sessions',
      value: totalRecovery,
      context:
        totalRecovery > 0 ? 'study break and eye recovery combined' : 'none this week',
    },
    {
      id: 'hydration',
      label: 'Days with water logged',
      value: hydrationThisWeek.length,
      context: `out of 7 days`,
    },
    {
      id: 'wellness',
      label: 'Daily check-ins completed',
      value: wellnessThisWeek.length,
      context: `out of 7 days`,
    },
  ]
}

/**
 * Derives gentle observations from this week's wellness check-in entries.
 * Returns an array of { id, text } insight objects.
 */
export function getWellnessPatterns(weekData, referenceDate = new Date()) {
  const weekKeys = getWeekDateKeys(referenceDate)
  const thisWeek = filterToWeek(weekData.wellnessEntries ?? [], weekKeys)
  const patterns = []

  if (thisWeek.length === 0) return patterns

  // Energy
  const energyValues = thisWeek.map((e) => e.energy).filter(Boolean)
  if (energyValues.length > 0) {
    const lowCount = energyValues.filter((v) => ['very-low', 'low'].includes(v)).length
    const highCount = energyValues.filter((v) => ['high', 'excellent'].includes(v)).length

    if (lowCount >= 2) {
      patterns.push({
        id: 'energy-low',
        text: `You noticed low energy on ${lowCount} day${lowCount !== 1 ? 's' : ''} this week. That's useful to know about yourself — it's a signal, not a setback.`,
      })
    } else if (highCount >= 3) {
      patterns.push({
        id: 'energy-high',
        text: `You reported high energy on ${highCount} days this week. Something is working in your favour.`,
      })
    } else if (highCount >= 1 && lowCount >= 1) {
      patterns.push({
        id: 'energy-mixed',
        text: 'Your energy varied through the week — some strong days, some quieter ones. That's a normal rhythm.',
      })
    }
  }

  // Stress
  const stressValues = thisWeek.map((e) => e.stress).filter(Boolean)
  if (stressValues.length > 0) {
    const highStressCount = stressValues.filter((v) =>
      ['very-stressed', 'overwhelmed'].includes(v),
    ).length
    const calmCount = stressValues.filter((v) => v === 'calm').length

    if (highStressCount >= 3) {
      patterns.push({
        id: 'stress-elevated',
        text: `You experienced elevated stress on ${highStressCount} days this week. Breathing breaks and short resets can help on days like these.`,
      })
    } else if (highStressCount >= 1) {
      patterns.push({
        id: 'stress-some',
        text: 'There were some stressful moments this week. You noticed them — that's already a form of self-awareness.',
      })
    } else if (calmCount >= 4) {
      patterns.push({
        id: 'stress-calm',
        text: `You reported feeling calm on ${calmCount} days this week. That kind of steadiness is worth noticing.`,
      })
    }
  }

  // Focus
  const focusValues = thisWeek.map((e) => e.focus).filter(Boolean)
  if (focusValues.length > 0) {
    const deepFocusCount = focusValues.filter((v) => ['focused', 'deep-focus'].includes(v)).length
    const scatteredCount = focusValues.filter((v) =>
      ['distracted', 'struggling'].includes(v),
    ).length

    if (deepFocusCount >= 3) {
      patterns.push({
        id: 'focus-strong',
        text: `You explored strong focus on ${deepFocusCount} days this week.`,
      })
    } else if (scatteredCount >= 3) {
      patterns.push({
        id: 'focus-scattered',
        text: 'Focus was harder to find on several days this week. Short eye recovery and movement breaks often help with this.',
      })
    }
  }

  // Mood
  const moodValues = thisWeek.map((e) => e.mood).filter(Boolean)
  if (moodValues.length > 0) {
    const positiveCount = moodValues.filter((v) =>
      ['good', 'great', 'motivated'].includes(v),
    ).length
    const tiredCount = moodValues.filter((v) => v === 'tired').length

    if (positiveCount >= 4) {
      patterns.push({
        id: 'mood-positive',
        text: `You recorded a good or motivated mood on ${positiveCount} days this week.`,
      })
    } else if (tiredCount >= 3) {
      patterns.push({
        id: 'mood-tired',
        text: `You noted feeling tired on ${tiredCount} days this week. Rest is part of the practice, not a gap in it.`,
      })
    }
  }

  return patterns
}

/**
 * Derives movement and consistency observations from activity completions.
 * Returns an array of { id, text } insight objects.
 */
export function getMovementReflection(weekData, referenceDate = new Date()) {
  const weekKeys = getWeekDateKeys(referenceDate)

  const routinesThisWeek = filterToWeek(weekData.routineCompletions ?? [], weekKeys)
  const recoveryThisWeek = filterToWeek(weekData.recoveryCompletions ?? [], weekKeys)
  const eyeThisWeek = filterToWeek(weekData.eyeCompletions ?? [], weekKeys)

  const allActivities = [...routinesThisWeek, ...recoveryThisWeek, ...eyeThisWeek]
  const insights = []

  if (allActivities.length === 0) {
    insights.push({
      id: 'no-movement',
      text: 'This week is still unfolding. Any movement you add — even a two-minute stretch — counts.',
    })
    return insights
  }

  // Consistency
  const activeDayKeys = uniqueDayKeys(allActivities)
  const activeDayCount = activeDayKeys.length

  if (activeDayCount >= 5) {
    insights.push({
      id: 'consistency-strong',
      text: `You showed up for movement on ${activeDayCount} days this week. That's a strong habit taking shape.`,
    })
  } else if (activeDayCount >= 3) {
    insights.push({
      id: 'consistency-building',
      text: `You moved on ${activeDayCount} days this week. A consistent rhythm is building.`,
    })
  } else {
    insights.push({
      id: 'consistency-starting',
      text: `You explored movement on ${activeDayCount} day${activeDayCount !== 1 ? 's' : ''} this week. Each day you show up adds another thread to the habit.`,
    })
  }

  // Balance between morning routines and recovery
  const totalRecovery = recoveryThisWeek.length + eyeThisWeek.length
  if (routinesThisWeek.length > 0 && totalRecovery > 0) {
    insights.push({
      id: 'balance',
      text: `You combined morning movement with ${totalRecovery} recovery session${totalRecovery !== 1 ? 's' : ''} — a well-rounded approach to the week.`,
    })
  } else if (eyeThisWeek.length > 0) {
    insights.push({
      id: 'eye-recovery',
      text: `You explored eye recovery ${eyeThisWeek.length} time${eyeThisWeek.length !== 1 ? 's' : ''} this week. A small habit that protects a lot.`,
    })
  }

  // Most active day
  if (activeDayKeys.length > 1) {
    const dayCounts = {}
    allActivities.forEach((a) => {
      dayCounts[a.dateKey] = (dayCounts[a.dateKey] ?? 0) + 1
    })
    const mostActiveKey = Object.entries(dayCounts).sort((a, b) => b[1] - a[1])[0][0]
    insights.push({
      id: 'most-active-day',
      text: `${getWeekdayName(mostActiveKey)} was your most active day this week.`,
    })
  }

  // Weekday vs weekend pattern (only if 5+ active days to have signal)
  if (activeDayKeys.length >= 5) {
    const weekdayActivity = activeDayKeys.filter((key) => {
      const day = parseDateKey(key).getDay()
      return day >= 1 && day <= 5
    }).length
    if (weekdayActivity >= 4) {
      insights.push({
        id: 'weekday-pattern',
        text: 'You tend to move more consistently on weekdays. Worth carrying that into the weekend too.',
      })
    }
  }

  return insights
}

/**
 * Generates 1–3 gentle, forward-looking suggestions based on gaps and patterns.
 * Language is always encouraging — never prescriptive or guilt-inducing.
 */
export function getGentleSuggestions(weekData, onboardingData, referenceDate = new Date()) {
  const weekKeys = getWeekDateKeys(referenceDate)
  const { studyHours, routineDuration, primaryGoal } = onboardingData ?? {}
  const suggestions = []

  const routinesThisWeek = filterToWeek(weekData.routineCompletions ?? [], weekKeys)
  const eyeThisWeek = filterToWeek(weekData.eyeCompletions ?? [], weekKeys)
  const hydrationThisWeek = (weekData.hydrationDailyTotals ?? []).filter(
    (d) => weekKeys.includes(d.dateKey) && d.total > 0,
  )
  const wellnessThisWeek = filterToWeek(weekData.wellnessEntries ?? [], weekKeys)
  const stressValues = wellnessThisWeek.map((e) => e.stress).filter(Boolean)
  const highStressDays = stressValues.filter((v) =>
    ['very-stressed', 'overwhelmed'].includes(v),
  ).length

  // Eye recovery for heavy studiers who haven't tried it
  if (isHeavyStudier(studyHours) && eyeThisWeek.length === 0) {
    suggestions.push({
      id: 'try-eye-recovery',
      text: 'Consider adding a short eye recovery break during your longer study sessions. Even two minutes helps reduce the strain of screen time.',
    })
  }

  // Shorter routines for consistency
  if (
    routineDuration &&
    routineDuration > 10 &&
    routinesThisWeek.length < 3
  ) {
    suggestions.push({
      id: 'shorter-routines',
      text: `Shorter routines — even five minutes — can fit into a busy schedule more consistently. On harder days, a quick reset is always enough.`,
    })
  }

  // Breathing for recurring stress
  if (highStressDays >= 2) {
    suggestions.push({
      id: 'breathing-practice',
      text: 'On high-stress days, a two-minute breathing session before returning to study can settle the mind more than you might expect.',
    })
  }

  // Hydration encouragement
  if (hydrationThisWeek.length >= 5) {
    suggestions.push({
      id: 'hydration-consistent',
      text: 'Your hydration habit is becoming more regular this week. Small daily logs add up to something meaningful.',
    })
  } else if (hydrationThisWeek.length <= 2) {
    suggestions.push({
      id: 'hydration-start',
      text: 'Logging water a few times a day is one of the smallest habits with one of the largest returns.',
    })
  }

  // Wellness check-in encouragement
  if (wellnessThisWeek.length < 3) {
    suggestions.push({
      id: 'wellness-habit',
      text: 'A daily check-in — even just noticing your energy and mood — helps you spot patterns that are otherwise easy to miss.',
    })
  }

  // Posture goal with no recovery sessions
  const recoveryThisWeek = filterToWeek(weekData.recoveryCompletions ?? [], weekKeys)
  if (
    (primaryGoal === 'posture' || primaryGoal === 'stiffness') &&
    recoveryThisWeek.length === 0
  ) {
    suggestions.push({
      id: 'posture-recovery',
      text: 'A short neck or shoulder relief session takes three minutes and can make a real difference on days when your body feels tight.',
    })
  }

  // Cap at 3
  return suggestions.slice(0, 3)
}