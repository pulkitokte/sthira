import { RECOVERY_SESSIONS } from "../data/recoverySessions";
import { getDayOfYear } from "./date";

export function getSessionsByCategory(categoryId) {
  return RECOVERY_SESSIONS.filter(
    (session) => session.categoryId === categoryId,
  );
}

export function getSessionById(sessionId) {
  return RECOVERY_SESSIONS.find((session) => session.id === sessionId) ?? null;
}

export function getRecommendedSession(date = new Date()) {
  const index = getDayOfYear(date) % RECOVERY_SESSIONS.length;
  return RECOVERY_SESSIONS[index];
}
