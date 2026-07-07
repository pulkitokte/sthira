// src/utils/gentleStreaks.js
// Reads existing app data to compute gentle, compassionate consistency stats.
// Does NOT write to any existing storage. Read-only across all sources.
// No guilt language. No "broken streak" framing. Ever.
// Batch 51: null-guarded all array entry field accesses; hardened date sorts
//           and string operations against null/undefined values.

// ── 60+ handcrafted compassionate messages ────────────────────────────────────

export const GENTLE_MESSAGES = [
  "Thank you for showing up today.",
  "Consistency can be quiet.",
  "Every return matters.",
  "You do not need perfection to begin again.",
  "Small moments of reflection add up quietly.",
  "There is no wrong pace for this.",
  "Coming back counts just as much as starting.",
  "You are allowed to show up imperfectly.",
  "This space holds no judgment — only welcome.",
  "Returning is its own kind of consistency.",
  "Some weeks are quiet. That is still part of the rhythm.",
  "You do not owe this space daily perfection.",
  "Even a single moment of reflection is meaningful.",
  "Gentleness with yourself is also a practice.",
  "The fact that you returned says something good about you.",
  "Reflection does not need to be frequent to be real.",
  "There is no streak to protect — only a practice to return to.",
  "You are building a relationship with yourself, slowly.",
  "Every time you check in, you are choosing yourself.",
  "This is a place without pressure. Come whenever you can.",
  "Some days call for reflection. Some days call for rest. Both are valid.",
  "You have not fallen behind. There is nothing to fall behind on.",
  "Each entry is a small act of self-attention.",
  "Consistency, here, means returning — not never leaving.",
  "Whatever pace feels right for you is the right pace.",
  "Your presence here, even occasionally, is enough.",
  "There is no scoreboard. Just you and your own reflection.",
  "Showing up today, after any gap, is still showing up.",
  "You are not behind a version of yourself that reflects more often.",
  "Quiet weeks are not failures. They are simply quiet.",
  "Reflection is not a task to complete. It is a habit to nurture gently.",
  "You get to define what consistency means for you.",
  "Coming back after time away is an act of self-care, not catching up.",
  "This space was built to be patient with you.",
  "There is real value in returning, no matter how much time has passed.",
  "Some of the most meaningful reflections come after a pause.",
  "You are not required to feel a certain way about how often you show up.",
  "Self-reflection works on its own timeline — yours.",
  "What matters most is that the door stays open for you.",
  "A gap in reflection is not a gap in worth.",
  "You are allowed to return without explaining where you have been.",
  "Each reflection, however small, is a thread woven into who you are.",
  "Rest from reflecting is not the same as giving up on yourself.",
  "There is no version of this that punishes you for living your life.",
  "However often you arrive here, you arrive as you are.",
  "The fact that this matters to you at all is worth noticing.",
  "You do not need to justify a quiet stretch. It happened. That is fine.",
  "Reflection is a relationship, not a requirement.",
  "Every entry, new or returning, is part of the same ongoing story.",
  "You are not starting over. You are simply continuing.",
  "This practice bends to fit your life — not the other way around.",
  "Whatever brought you back today, it was enough to bring you.",
  "There is no ideal frequency. There is only your frequency.",
  "Noticing yourself, even occasionally, is a meaningful act.",
  "You are not measured by absence. You are met by presence.",
  "Some seasons of life leave less room for reflection. That is human.",
  "This space does not keep score. It simply keeps the door open.",
  "However long it has been, the welcome here has not changed.",
  "You showing up at all, in any rhythm, is the practice itself.",
  "Reflection grows in its own time, like most meaningful things.",
  "Today's return is enough reason to be here.",
];

/**
 * Returns today's compassionate message.
 * Deterministic — same date always returns the same message.
 */
export function getTodayGentleMessage() {
  const today = new Date().toISOString().slice(0, 10);
  const hash  = today
    .split("")
    .reduce((acc, ch) => acc + ch.charCodeAt(0), 0);
  return GENTLE_MESSAGES[hash % GENTLE_MESSAGES.length];
}

// ── Safe localStorage reader ──────────────────────────────────────────────────

function safeRead(key) {
  try {
    const raw = localStorage.getItem(key);
    return raw ? JSON.parse(raw) : null;
  } catch (_) {
    return null;
  }
}

// ── Date extraction per source (read-only, null-guarded) ─────────────────────

function getGratitudeDates() {
  const data = safeRead("sthira_gratitude_garden");
  if (!Array.isArray(data)) return [];
  return data
    .map((e) => e?.date)
    .filter((d) => typeof d === "string" && d.length === 10);
}

function getLetterDates() {
  const data = safeRead("sthira_letters");
  if (!Array.isArray(data)) return [];
  return data
    .map((e) => {
      // createdAt may be missing; date is the fallback
      const raw = e?.createdAt ?? e?.date ?? "";
      return typeof raw === "string" ? raw.slice(0, 10) : "";
    })
    .filter((d) => d.length === 10);
}

function getWeatherDates() {
  const data = safeRead("sthira_emotional_weather");
  if (!Array.isArray(data)) return [];
  return data
    .map((e) => e?.date)
    .filter((d) => typeof d === "string" && d.length === 10);
}

function getMoodDates() {
  const data = safeRead("sthira_mood_journal");
  if (!Array.isArray(data)) return [];
  return data
    .map((e) => e?.date)
    .filter((d) => typeof d === "string" && d.length === 10);
}

function getReflectionDates() {
  const data = safeRead("sthira_evening_reflections");
  if (!Array.isArray(data)) return [];
  return data
    .map((e) => e?.date)
    .filter((d) => typeof d === "string" && d.length === 10);
}

/**
 * Get all reflection-related dates across every tracked activity.
 * Returns a deduplicated array of YYYY-MM-DD strings.
 */
export function getAllReflectionDates() {
  const all = [
    ...getGratitudeDates(),
    ...getLetterDates(),
    ...getWeatherDates(),
    ...getMoodDates(),
    ...getReflectionDates(),
  ];
  return [...new Set(all)];
}

// ── Derived stats ──────────────────────────────────────────────────────────────

/**
 * Total number of unique days across all tracked reflection activities.
 */
export function getTotalReflectionDays() {
  return getAllReflectionDates().length;
}

/**
 * Number of unique reflection days within the last 7 days (including today).
 */
export function getReflectionsThisWeek() {
  const dates  = getAllReflectionDates();
  const cutoff = new Date();
  cutoff.setDate(cutoff.getDate() - 6);
  cutoff.setHours(0, 0, 0, 0);

  return dates.filter((d) => {
    const dt = new Date(d + "T00:00:00");
    return !isNaN(dt.getTime()) && dt >= cutoff;
  }).length;
}

/**
 * Whether the user has reflected today (any tracked activity).
 */
export function hasReflectedToday() {
  const today = new Date().toISOString().slice(0, 10);
  return getAllReflectionDates().includes(today);
}

/**
 * Days since the most recent reflection (any tracked activity).
 * Returns null if there is no reflection history at all.
 * Returns 0 if the most recent reflection was today.
 */
export function getDaysSinceLastReflection() {
  const dates = getAllReflectionDates();
  if (dates.length === 0) return null;

  // Sort descending — guard against any non-string values slipping through
  const sorted = [...dates]
    .filter((d) => typeof d === "string" && d.length === 10)
    .sort()
    .reverse();

  if (sorted.length === 0) return null;

  const mostRecent = sorted[0];
  const today      = new Date();
  today.setHours(0, 0, 0, 0);
  const last = new Date(mostRecent + "T00:00:00");

  if (isNaN(last.getTime())) return null;

  const diffMs = today - last;
  return Math.max(0, Math.round(diffMs / 86400000));
}

// ── State classification ──────────────────────────────────────────────────────

export const CONSISTENCY_STATE = {
  FIRST_TIME:      "first-time",
  REFLECTED_TODAY: "today",
  RETURNING:       "returning",
  ONGOING:         "ongoing",
};

export function getConsistencyState() {
  const total = getTotalReflectionDays();
  if (total === 0) return CONSISTENCY_STATE.FIRST_TIME;
  if (hasReflectedToday()) return CONSISTENCY_STATE.REFLECTED_TODAY;
  const daysSince = getDaysSinceLastReflection();
  if (daysSince !== null && daysSince >= 7) return CONSISTENCY_STATE.RETURNING;
  return CONSISTENCY_STATE.ONGOING;
}

export function getStateHeadline(state) {
  switch (state) {
    case CONSISTENCY_STATE.FIRST_TIME:
      return "Your first reflection can begin today.";
    case CONSISTENCY_STATE.REFLECTED_TODAY:
      return "Thank you for showing up today.";
    case CONSISTENCY_STATE.RETURNING:
      return "Welcome back. Your space has been waiting.";
    case CONSISTENCY_STATE.ONGOING:
    default:
      return getTodayGentleMessage();
  }
}

export function buildGentleConsistencySummary() {
  const totalDays    = getTotalReflectionDays();
  const weekCount    = getReflectionsThisWeek();
  const state        = getConsistencyState();
  const headline     = getStateHeadline(state);
  const dailyMessage = getTodayGentleMessage();

  return {
    totalDays,
    weekCount,
    state,
    headline,
    secondaryMessage:
      state === CONSISTENCY_STATE.ONGOING ? null : dailyMessage,
  };
}