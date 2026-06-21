import { RECOVERY_SESSIONS } from "../data/recoverySessions";

export function getSessionsByCategory(categoryId) {
  return RECOVERY_SESSIONS.filter(
    (session) => session.categoryId === categoryId,
  );
}

export function getSessionById(sessionId) {
  return RECOVERY_SESSIONS.find((session) => session.id === sessionId) ?? null;
}

/**
 * Deterministic daily rotation — no backend needed for the recommendation
 * to feel fresh from one day to the next.
 */
export function getRecommendedSession(date = new Date()) {
  const startOfYear = new Date(date.getFullYear(), 0, 0);
  const dayOfYear = Math.floor((date - startOfYear) / 86400000);
  const index = dayOfYear % RECOVERY_SESSIONS.length;
  return RECOVERY_SESSIONS[index];
}
