import { EYE_RECOVERY_SESSIONS } from "../data/eyeRecoverySessions";

export function getEyeSessionsByCategory(categoryId) {
  return EYE_RECOVERY_SESSIONS.filter(
    (session) => session.categoryId === categoryId,
  );
}

export function getEyeSessionById(sessionId) {
  return (
    EYE_RECOVERY_SESSIONS.find((session) => session.id === sessionId) ?? null
  );
}

export function getAllEyeSessions() {
  return EYE_RECOVERY_SESSIONS;
}

/**
 * Deterministic daily rotation, offset from the recovery-session rotation
 * so the two recommendations don't always land on the same index together.
 */
export function getRecommendedEyeSession(date = new Date()) {
  const startOfYear = new Date(date.getFullYear(), 0, 0);
  const dayOfYear = Math.floor((date - startOfYear) / 86400000);
  const index = (dayOfYear + 3) % EYE_RECOVERY_SESSIONS.length;
  return EYE_RECOVERY_SESSIONS[index];
}
