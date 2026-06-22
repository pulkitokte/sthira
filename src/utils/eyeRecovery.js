import { EYE_RECOVERY_SESSIONS } from "../data/eyeRecoverySessions";
import { getDayOfYear } from "./date";

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

export function getRecommendedEyeSession(date = new Date()) {
  const index = (getDayOfYear(date) + 3) % EYE_RECOVERY_SESSIONS.length;
  return EYE_RECOVERY_SESSIONS[index];
}
