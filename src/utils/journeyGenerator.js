import { ROUTINES } from "../data/routines";
import { RECOVERY_SESSIONS } from "../data/recoverySessions";
import { EYE_RECOVERY_SESSIONS } from "../data/eyeRecoverySessions";
import { PATHS } from "../constants/navigation";

// ─────────────────────────────────────────────────────────────────────────────
// Internal helpers (mirrors personalization.js intentionally — kept local so
// journeyGenerator stays self-contained and testable in isolation)
// ─────────────────────────────────────────────────────────────────────────────

const STUDY_HOURS_INDEX = { lt2: 0, "2-4": 1, "4-6": 2, "6-8": 3, "8plus": 4 };

function isHeavyStudier(studyHours) {
  return (STUDY_HOURS_INDEX[studyHours] ?? 0) >= 3;
}

function isModerateOrMoreStudier(studyHours) {
  return (STUDY_HOURS_INDEX[studyHours] ?? 0) >= 2;
}

function findRoutine(id) {
  return ROUTINES.find((r) => r.id === id) ?? ROUTINES[0];
}

function findRecovery(id) {
  return RECOVERY_SESSIONS.find((s) => s.id === id) ?? RECOVERY_SESSIONS[0];
}

function findEyeSession(id) {
  return (
    EYE_RECOVERY_SESSIONS.find((s) => s.id === id) ?? EYE_RECOVERY_SESSIONS[0]
  );
}

const DURATION_ROUTINE_MAP = {
  5: "wake-and-stretch",
  10: "energize-and-rise",
  15: "reset-and-realign",
  20: "complete-morning-practice",
};

const BEGINNER_DURATION_MAP = {
  5: "first-steps",
  10: "gentle-beginnings",
  15: "deep-stretch-reset",
  20: "deep-stretch-reset",
};

const REQUIRED_WELLNESS_FIELDS = ["energy", "focus", "stress", "mood"];

function isWellnessComplete(todayEntry) {
  return (
    Boolean(todayEntry) && REQUIRED_WELLNESS_FIELDS.every((f) => todayEntry[f])
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// Journey generator
//
// Always produces 3–5 activities.
// Priority order per slot is documented below so future contributors
// can extend the logic without introducing surprises.
// ─────────────────────────────────────────────────────────────────────────────

/**
 * @param {object} onboardingData   — from OnboardingContext
 * @param {object|null} todayEntry  — from WellnessContext (may be null)
 * @param {number} hydrationPct     — 0–100, today's hydration percentage
 * @returns {Array}                 — 3–5 activity objects, stable for the day
 */
export function generateDailyJourney(
  onboardingData,
  todayEntry,
  hydrationPct = 0,
) {
  const { studyHours, activityLevel, primaryGoal, routineDuration } =
    onboardingData ?? {};
  const activities = [];

  // ── Slot 1: Morning Routine (always present) ──────────────────────────────
  // Low energy → energize. Beginner → beginner map. Otherwise duration map.
  let routineId;
  if (activityLevel === "beginner") {
    routineId = BEGINNER_DURATION_MAP[routineDuration] ?? "first-steps";
  } else if (
    todayEntry?.energy &&
    ["very-low", "low"].includes(todayEntry.energy)
  ) {
    routineId = "energize-and-rise";
  } else {
    routineId = DURATION_ROUTINE_MAP[routineDuration] ?? "wake-and-stretch";
  }
  const morningRoutine = findRoutine(routineId);
  activities.push({
    id: "journey:morning-routine",
    type: "routine",
    title: morningRoutine.title,
    subtitle: `${morningRoutine.duration} min · ${morningRoutine.difficulty}`,
    description: "Begin the day with gentle movement.",
    navigation: {
      path: PATHS.ROUTINE_PLAYER,
      state: { routineId: morningRoutine.id },
    },
  });

  // ── Slot 2: Eye Recovery or Desk Stretch ──────────────────────────────────
  // Heavy studier OR scattered focus → eye recovery.
  // Moderate studier → desk stretch.
  if (
    isHeavyStudier(studyHours) ||
    (todayEntry?.focus &&
      ["distracted", "struggling"].includes(todayEntry.focus))
  ) {
    const session = findEyeSession("20-20-20-eye-break");
    activities.push({
      id: "journey:eye-recovery",
      type: "eye",
      title: session.title,
      subtitle: `${session.duration} min · Eye Recovery`,
      description: "Rest your eyes after time on the screen.",
      navigation: {
        path: PATHS.EYE_RECOVERY_PLAYER,
        state: { sessionId: session.id },
      },
    });
  } else if (isModerateOrMoreStudier(studyHours)) {
    const session = findRecovery("seated-stretch-break");
    activities.push({
      id: "journey:desk-stretch",
      type: "recovery",
      title: session.title,
      subtitle: `${session.duration} min · Desk Stretch`,
      description: "A short stretch between study blocks.",
      navigation: {
        path: PATHS.RECOVERY_PLAYER,
        state: { sessionId: session.id },
      },
    });
  }

  // ── Slot 3: Stress / Goal / General Recovery ──────────────────────────────
  // High stress → breathing. Posture/stiffness goal → neck relief.
  // Otherwise nothing in this slot (keeps the journey lean for lighter users).
  if (
    todayEntry?.stress &&
    ["very-stressed", "overwhelmed"].includes(todayEntry.stress)
  ) {
    const session = findRecovery("box-breathing-pause");
    activities.push({
      id: "journey:breathing",
      type: "recovery",
      title: session.title,
      subtitle: `${session.duration} min · Deep Breathing`,
      description: "Settle a busy mind with a short breathing session.",
      navigation: {
        path: PATHS.RECOVERY_PLAYER,
        state: { sessionId: session.id },
      },
    });
  } else if (primaryGoal === "posture" || primaryGoal === "stiffness") {
    const session = findRecovery("neck-tension-release");
    activities.push({
      id: "journey:posture-recovery",
      type: "recovery",
      title: session.title,
      subtitle: `${session.duration} min · Neck & Shoulder Relief`,
      description: "Release tension and reset your posture.",
      navigation: {
        path: PATHS.RECOVERY_PLAYER,
        state: { sessionId: session.id },
      },
    });
  }

  // ── Slot 4: Hydration (always present) ────────────────────────────────────
  const hydrationSubtitle =
    hydrationPct >= 100
      ? "Goal reached — well done"
      : `${Math.round(hydrationPct)}% of today's goal`;
  const hydrationDescription =
    hydrationPct >= 100
      ? "Keep up the good work with your water intake."
      : "Stay hydrated through your study session.";
  activities.push({
    id: "journey:hydration",
    type: "hydration",
    title: "Log Water",
    subtitle: hydrationSubtitle,
    description: hydrationDescription,
    navigation: { path: PATHS.HYDRATION, state: null },
  });

  // ── Slot 5: Wellness check-in (only if not yet completed today) ───────────
  if (!isWellnessComplete(todayEntry)) {
    activities.push({
      id: "journey:wellness",
      type: "wellness",
      title: "Today's Wellness Check-In",
      subtitle: "Energy · Focus · Stress · Mood",
      description: "A quiet moment to notice how you're doing.",
      navigation: { path: PATHS.WELLNESS_TRACKER, state: null },
    });
  }

  // Cap at 5 and return
  return activities.slice(0, 5);
}
