/**
 * Format a seconds value as "X min" or "X sec" for the suggested duration label.
 */
export function formatSuggestedDuration(seconds) {
  if (!seconds) return null
  if (seconds >= 60) {
    const m = Math.round(seconds / 60)
    return `~${m} min`
  }
  return `~${seconds} sec`
}