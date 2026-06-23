import { ROUTINES } from "../data/routines";
import { RECOVERY_SESSIONS } from "../data/recoverySessions";
import { EYE_RECOVERY_SESSIONS } from "../data/eyeRecoverySessions";

// ─────────────────────────────────────────────────────────────────────────────
// Greeting & contextual subheading
// ─────────────────────────────────────────────────────────────────────────────

export function getPersonalizedGreeting(firstName, date = new Date()) {
  const hour = date.getHours();
  const name = (firstName ?? "").trim();
  const suffix = name ? `, ${name}` : "";

  if (hour >= 5 && hour < 12) return `Good morning${suffix}`;
  if (hour >= 12 && hour < 17) return `Good afternoon${suffix}`;
  if (hour >= 17 && hour < 21) return `Good evening${suffix}`;
  return `Rest well tonight${suffix}`;
}

export function getContextualSubheading(date = new Date()) {
  const hour = date.getHours();
  if (hour >= 5 && hour < 12) {
    return "Begin with a little movement — it sets the tone for the day.";
  }
  if (hour >= 12 && hour < 17) {
    return "A short break now will help you focus through the afternoon.";
  }
  if (hour >= 17 && hour < 21) {
    return "Let's unwind and care for your body.";
  }
  return "Wind down gently before you rest.";
}

// ─────────────────────────────────────────────────────────────────────────────
// Internal helpers
// ─────────────────────────────────────────────────────────────────────────────

const STUDY_HOURS_INDEX = { lt2: 0, "2-4": 1, "4-6": 2, "6-8": 3, "8plus": 4 };

function isHeavyStudier(studyHours) {
  return (STUDY_HOURS_INDEX[studyHours] ?? 0) >= 3;
}

function isModerateStudier(studyHours) {
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

// Best single routine per preferred duration
const DURATION_ROUTINE_MAP = {
  5: "wake-and-stretch",
  10: "energize-and-rise",
  15: "reset-and-realign",
  20: "complete-morning-practice",
};

// Best beginner routine per preferred duration
const BEGINNER_DURATION_MAP = {
  5: "first-steps",
  10: "gentle-beginnings",
  15: "deep-stretch-reset",
  20: "deep-stretch-reset",
};

// ─────────────────────────────────────────────────────────────────────────────
// Home "Recommended For You" card
// ─────────────────────────────────────────────────────────────────────────────

/**
 * Returns a single deterministic recommendation for the Home page.
 *
 * Priority order:
 *   1. Today's wellness signals — stress → breathing, energy → movement, focus → eye
 *   2. Primary goal
 *   3. Study load (heavy → eye recovery, moderate → desk stretch)
 *   4. Activity level (beginner → beginner-friendly routine)
 *   5. Preferred routine duration (fallback default)
 */
export function getHomeRecommendation(onboardingData, todayEntry) {
  const { studyHours, activityLevel, primaryGoal, routineDuration } =
    onboardingData ?? {};

  // ── 1. Wellness override ──────────────────────────────────────────────────
  if (
    todayEntry?.stress &&
    ["very-stressed", "overwhelmed"].includes(todayEntry.stress)
  ) {
    const s = findRecovery("box-breathing-pause");
    return {
      type: "recovery",
      id: s.id,
      title: s.title,
      duration: s.duration,
      categoryLabel: "Deep Breathing",
      reason:
        "Your stress level is high today. A short breathing session may help you settle and return to focus.",
    };
  }

  if (todayEntry?.energy && ["very-low", "low"].includes(todayEntry.energy)) {
    const r = findRoutine("energize-and-rise");
    return {
      type: "routine",
      id: r.id,
      title: r.title,
      duration: r.duration,
      categoryLabel: "Daily Energy",
      reason:
        "Your energy is low today. A gentle movement session may help you find your footing.",
    };
  }

  if (
    todayEntry?.focus &&
    ["distracted", "struggling"].includes(todayEntry.focus)
  ) {
    const s = findEyeSession("20-20-20-eye-break");
    return {
      type: "eye",
      id: s.id,
      title: s.title,
      duration: s.duration,
      categoryLabel: "Screen Fatigue Reset",
      reason:
        "Your focus feels scattered today. A short eye break may help you reset before continuing.",
    };
  }

  // ── 2. Primary goal ───────────────────────────────────────────────────────
  if (primaryGoal === "posture") {
    const s = findRecovery("neck-tension-release");
    return {
      type: "recovery",
      id: s.id,
      title: s.title,
      duration: s.duration,
      categoryLabel: "Neck & Shoulder Relief",
      reason:
        "Because your goal is to improve posture, a targeted neck and shoulder session is a great daily habit.",
    };
  }

  if (primaryGoal === "stiffness") {
    const s = findRecovery("seated-stretch-break");
    return {
      type: "recovery",
      id: s.id,
      title: s.title,
      duration: s.duration,
      categoryLabel: "Desk Stretch",
      reason:
        "Because reducing stiffness is your goal, a gentle desk stretch is the perfect fit today.",
    };
  }

  if (primaryGoal === "energy") {
    const r = findRoutine("energize-and-rise");
    return {
      type: "routine",
      id: r.id,
      title: r.title,
      duration: r.duration,
      categoryLabel: "Daily Energy",
      reason:
        "Because increasing energy is your goal, a Daily Energy routine is a great place to start today.",
    };
  }

  // ── 3. Study load ─────────────────────────────────────────────────────────
  if (isHeavyStudier(studyHours)) {
    const s = findEyeSession("20-20-20-eye-break");
    return {
      type: "eye",
      id: s.id,
      title: s.title,
      duration: s.duration,
      categoryLabel: "Screen Fatigue Reset",
      reason:
        "Because you study for long hours, regular eye recovery is one of the most useful habits you can build.",
    };
  }

  if (isModerateStudier(studyHours)) {
    const s = findRecovery("seated-stretch-break");
    return {
      type: "recovery",
      id: s.id,
      title: s.title,
      duration: s.duration,
      categoryLabel: "Desk Stretch",
      reason:
        "With your study schedule, a desk stretch between sessions is a healthy habit to build.",
    };
  }

  // ── 4. Activity level ─────────────────────────────────────────────────────
  if (activityLevel === "beginner") {
    const id = BEGINNER_DURATION_MAP[routineDuration] ?? "first-steps";
    const r = findRoutine(id);
    return {
      type: "routine",
      id: r.id,
      title: r.title,
      duration: r.duration,
      categoryLabel: "Beginner Friendly",
      reason:
        "A gentle, beginner-friendly routine is the perfect way to start building your morning habit.",
    };
  }

  // ── 5. Default: match preferred duration ──────────────────────────────────
  const id = DURATION_ROUTINE_MAP[routineDuration] ?? "wake-and-stretch";
  const r = findRoutine(id);
  return {
    type: "routine",
    id: r.id,
    title: r.title,
    duration: r.duration,
    categoryLabel: "Morning Routine",
    reason: `Tuned to your ${routineDuration ?? 5}-minute morning preference.`,
  };
}

// ─────────────────────────────────────────────────────────────────────────────
// Routine Library personalization
// ─────────────────────────────────────────────────────────────────────────────

/**
 * Scores every routine against the user's preferred duration and activity level,
 * returning the top matches up to `limit`.
 */
export function getPersonalizedRoutines(onboardingData, limit = 3) {
  const { routineDuration, activityLevel } = onboardingData ?? {};
  if (!routineDuration && !activityLevel) return [];

  const scored = ROUTINES.map((routine) => {
    let score = 0;

    if (routineDuration) {
      if (routine.duration === routineDuration) score += 4;
      else if (Math.abs(routine.duration - routineDuration) <= 5) score += 1;
    }

    if (activityLevel === "beginner") {
      if (routine.difficulty === "Beginner") score += 3;
      else if (routine.difficulty === "Easy") score += 1;
    } else if (activityLevel === "slightly-active") {
      if (["Beginner", "Easy"].includes(routine.difficulty)) score += 2;
    } else if (activityLevel === "active") {
      if (["Easy", "Moderate"].includes(routine.difficulty)) score += 2;
    }

    return { routine, score };
  });

  return scored
    .filter((item) => item.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, limit)
    .map((item) => item.routine);
}

export function getRoutinePersonalizationReason(onboardingData) {
  const { routineDuration, activityLevel } = onboardingData ?? {};

  if (activityLevel === "beginner" && routineDuration) {
    return `Beginner-friendly · matched to your ${routineDuration}-minute preference`;
  }
  if (activityLevel === "beginner")
    return "Gentle routines matched to your activity level";
  if (routineDuration)
    return `Matched to your ${routineDuration}-minute morning preference`;
  return "Matched to your preferences";
}

// ─────────────────────────────────────────────────────────────────────────────
// Recovery Library personalization
// ─────────────────────────────────────────────────────────────────────────────

/**
 * Returns up to `limit` recovery sessions suited to the user's current
 * wellness state and onboarding profile.
 */
export function getPersonalizedRecoverySessions(
  onboardingData,
  todayEntry,
  limit = 2,
) {
  const { studyHours, primaryGoal } = onboardingData ?? {};
  let ids = [];

  if (
    todayEntry?.stress &&
    ["very-stressed", "overwhelmed"].includes(todayEntry.stress)
  ) {
    ids = ["box-breathing-pause", "calm-breath", "clarity-break"];
  } else if (
    todayEntry?.energy &&
    ["very-low", "low"].includes(todayEntry.energy)
  ) {
    ids = ["quick-reset-break", "instant-refresh", "mental-reset"];
  } else if (
    todayEntry?.focus &&
    ["distracted", "struggling"].includes(todayEntry.focus)
  ) {
    ids = ["mental-reset", "clarity-break", "quick-reset-break"];
  } else if (primaryGoal === "posture") {
    ids = ["neck-tension-release", "shoulder-unwind", "seated-stretch-break"];
  } else if (primaryGoal === "stiffness") {
    ids = [
      "seated-stretch-break",
      "chair-side-mobility",
      "neck-tension-release",
    ];
  } else if (isHeavyStudier(studyHours)) {
    ids = ["chair-side-mobility", "seated-stretch-break", "quick-reset-break"];
  } else {
    ids = ["quick-reset-break", "mental-reset"];
  }

  return ids
    .map((id) => RECOVERY_SESSIONS.find((s) => s.id === id))
    .filter(Boolean)
    .slice(0, limit);
}

export function getRecoveryPersonalizationReason(onboardingData, todayEntry) {
  if (
    todayEntry?.stress &&
    ["very-stressed", "overwhelmed"].includes(todayEntry.stress)
  ) {
    return "Your stress level is elevated today";
  }
  if (todayEntry?.energy && ["very-low", "low"].includes(todayEntry.energy)) {
    return "Your energy is low — gentle movement may help";
  }
  if (
    todayEntry?.focus &&
    ["distracted", "struggling"].includes(todayEntry.focus)
  ) {
    return "A focus reset may help you get back on track";
  }
  const { primaryGoal, studyHours } = onboardingData ?? {};
  if (primaryGoal === "posture")
    return "Matched to your posture improvement goal";
  if (primaryGoal === "stiffness") return "Chosen to help reduce stiffness";
  if (isHeavyStudier(studyHours)) return "Chosen for your long study sessions";
  return "A good fit for your routine";
}
