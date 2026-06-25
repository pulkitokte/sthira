/**
 * Format a seconds count as MM:SS — used for the large timer display.
 */
export function formatSeconds(totalSeconds) {
  const m = Math.floor(totalSeconds / 60);
  const s = totalSeconds % 60;
  return `${String(m).padStart(2, "0")}:${String(s).padStart(2, "0")}`;
}

/**
 * Human-readable duration for the completion screen.
 */
export function formatActualDuration(seconds) {
  if (seconds < 60) return `${seconds} second${seconds !== 1 ? "s" : ""}`;
  const m = Math.round(seconds / 60);
  return `${m} minute${m !== 1 ? "s" : ""}`;
}

/**
 * Deterministic message rotation — changes every 2 minutes of elapsed time.
 * Stable within each 120-second window, so the message doesn't flicker on
 * every re-render.
 */
export function getCalmMessage(elapsedSeconds, messages) {
  if (!messages || messages.length === 0) return "";
  const index = Math.floor(elapsedSeconds / 120) % messages.length;
  return messages[index];
}

/**
 * Completion reflection text — different for natural vs early-ended sessions.
 */
export function getCompletionText(session, actualSeconds, wasCompleted) {
  if (wasCompleted) {
    const options = [
      "You created space for focused work today.",
      `${session.duration} minutes of presence. That kind of effort adds up quietly.`,
      "A full session completed. Even short periods of focus accumulate over time.",
      "This session is done. Well done for seeing it through.",
    ];
    // Stable per session duration — not random
    return options[session.duration % options.length];
  }
  const minutes = Math.round(actualSeconds / 60);
  if (minutes < 1) {
    return "A beginning is still a beginning. Something is always better than nothing.";
  }
  return `You spent ${minutes} minute${minutes !== 1 ? "s" : ""} in focused work. Every moment of presence counts.`;
}
