// src/utils/dailyCompanionPlan.js
// Generates a calm, personalized daily companion plan from existing app data.
// Business logic only. No UI. No new storage. Read-only from existing keys.
// Produces 4–6 moment suggestions tailored to energy, time, season, weather,
// hydration, and emotional state — never a task list, always a gentle invitation.
// Batch 51: hardened all division-by-zero guards in getTodayHydrationPercentage;
//           added null guard on getSoundById result (already safe but made explicit).

import { getTimePhase, getCurrentSeason } from "./atmosphereEngine";
import { getTodayEntry as getTodayWeather } from "./emotionalWeather";
import { getTodayEnergyValue, classifyEnergy, ENERGY_STATES } from "./energyGuidance";

// ── Safe localStorage reader ──────────────────────────────────────────────────

function safeRead(key) {
  try {
    const raw = localStorage.getItem(key);
    return raw ? JSON.parse(raw) : null;
  } catch (_) {
    return null;
  }
}

// ── Hydration helper ──────────────────────────────────────────────────────────

function getTodayHydrationPercentage() {
  try {
    const today      = new Date().toISOString().slice(0, 10);
    const candidates = ["sthira_hydration", "sthira_hydration_data"];

    for (const key of candidates) {
      const data = safeRead(key);
      if (!data) continue;

      if (Array.isArray(data)) {
        const entry = data.find((e) => e?.date === today);
        if (entry) {
          const total = Number(entry.total ?? 0);
          const goal  = Number(entry.goal  ?? 0);
          if (goal > 0) return Math.min(100, Math.round((total / goal) * 100));
        }
        continue;
      }

      if (typeof data === "object") {
        // Pattern: { todayTotal, goal }
        const todayTotal = Number(data.todayTotal ?? NaN);
        const goal       = Number(data.goal ?? NaN);
        if (!isNaN(todayTotal) && !isNaN(goal) && goal > 0) {
          return Math.min(100, Math.round((todayTotal / goal) * 100));
        }

        // Pattern: { [YYYY-MM-DD]: { total, goal } }
        const entry = data[today];
        if (entry) {
          const total = Number(entry.total ?? 0);
          const g     = Number(entry.goal  ?? 0);
          if (g > 0) return Math.min(100, Math.round((total / g) * 100));
        }
      }
    }
  } catch (_) {
    // Fall through
  }
  return null;
}

// ── Moment definitions ────────────────────────────────────────────────────────

export const MOMENT_POOL = {
  hydration: {
    id: "hydration",
    emoji: "💧",
    title: "Drink Water",
    pathKey: "HYDRATION",
    duration: "1 min",
    descriptions: [
      "Your body works quietly for you all day. A glass of water is a small thank you.",
      "Hydration often makes everything feel slightly better. Worth trying.",
      "A gentle reminder to sip something before continuing.",
      "Give yourself the simplest form of care right now.",
      "Water before the next thing. Easy and kind.",
    ],
  },
  breathing: {
    id: "breathing",
    emoji: "🌬️",
    title: "Mindful Breathing",
    pathKey: "BREATHING",
    duration: "2–5 min",
    descriptions: [
      "A few calm breaths may help more than you expect.",
      "A quiet pause before continuing.",
      "Your nervous system responds to slow breathing. Even two minutes counts.",
      "Breathe at your own pace for a moment. Nothing else is needed.",
      "Let the next few minutes be just about breathing.",
    ],
  },
  eyeRecovery: {
    id: "eyeRecovery",
    emoji: "👁️",
    title: "Eye Recovery",
    pathKey: "EYE_RELAX",
    duration: "3–7 min",
    descriptions: [
      "Give your eyes a softer moment.",
      "Screens ask a lot of your eyes. A short break is a genuine kindness.",
      "Your eyes have been working. Let them rest for a few minutes.",
      "Eye recovery is one of the most overlooked forms of self-care.",
      "Even a brief pause from focusing can help you feel clearer.",
    ],
  },
  calmSounds: {
    id: "calmSounds",
    emoji: "🎵",
    title: "Calm Sounds",
    pathKey: "CALM_SOUNDS",
    duration: "Any",
    descriptions: [
      "A gentle soundscape can soften whatever the day is holding.",
      "Sometimes what helps most is simply something quiet to accompany you.",
      "Let a natural sound hold the space around you for a while.",
      "Ambient sound can be a quiet form of company.",
      "Choose a sound that feels like where you want to be.",
    ],
  },
  gratitude: {
    id: "gratitude",
    emoji: "🌸",
    title: "Gratitude Garden",
    pathKey: "GRATITUDE_GARDEN",
    duration: "2–3 min",
    descriptions: [
      "Notice one good thing about today — however small.",
      "There is always something worth acknowledging, even on quiet days.",
      "A single entry in the gratitude garden is enough.",
      "What is one thing today that deserves a quiet thank you?",
      "Noticing small things is a habit that changes how days feel over time.",
    ],
  },
  morningRoutine: {
    id: "morningRoutine",
    emoji: "☀️",
    title: "Morning Routine",
    pathKey: "LIBRARY",
    duration: "5–20 min",
    descriptions: [
      "A short movement session can shift how the whole day feels.",
      "Move only as much as feels right today.",
      "The morning routine is always available whenever you are ready for it.",
      "Even a few minutes of gentle movement is worth doing.",
      "A little movement now can make the next few hours feel lighter.",
    ],
  },
  focus: {
    id: "focus",
    emoji: "🎯",
    title: "Focus Session",
    pathKey: "FOCUS_SESSIONS",
    duration: "25–50 min",
    descriptions: [
      "A calm, focused block of time can feel deeply satisfying.",
      "If you have energy available, a focused session might feel good right now.",
      "A structured window of attention — at whatever pace feels comfortable.",
      "Focus sessions are best entered without pressure. Just see what happens.",
      "This is not about achieving everything. Just about giving something your full attention.",
    ],
  },
  studyBreak: {
    id: "studyBreak",
    emoji: "🧘",
    title: "Study Break Recovery",
    pathKey: "RECOVERY_LIBRARY",
    duration: "5–10 min",
    descriptions: [
      "A proper break is as important as the work itself.",
      "Rest between effort is not weakness — it is how the mind recovers.",
      "Give yourself permission to genuinely pause.",
      "A short recovery session now will make the next stretch feel easier.",
      "This is not procrastination. It is maintenance.",
    ],
  },
  letters: {
    id: "letters",
    emoji: "📖",
    title: "Letter to Self",
    pathKey: "LETTERS",
    duration: "5–10 min",
    descriptions: [
      "A quiet note to yourself, whenever you are ready.",
      "Even a short letter can help you understand something about today.",
      "Write to the version of yourself who will read this later.",
      "Letters to yourself are a private, unhurried form of reflection.",
      "There is something worth writing down today, if you look for it.",
    ],
  },
  eveningReflection: {
    id: "eveningReflection",
    emoji: "🌅",
    title: "Evening Reflection",
    pathKey: "EVENING_REFLECTION",
    duration: "5 min",
    descriptions: [
      "The day is settling. A brief reflection can help it close well.",
      "A gentle review of today, before it becomes yesterday.",
      "Three questions. A few minutes. Enough to feel like the day had meaning.",
      "End the day with a small act of attention toward yourself.",
      "Reflection does not need to be long to be valuable.",
    ],
  },
  sleepWindDown: {
    id: "sleepWindDown",
    emoji: "🌙",
    title: "Sleep Wind-Down",
    pathKey: "SLEEP_WIND_DOWN",
    duration: "10–20 min",
    descriptions: [
      "The evening is a good place to begin slowing down.",
      "A wind-down ritual tells your body that rest is coming.",
      "Sleep starts before you close your eyes. A gentle transition helps.",
      "Tonight may benefit from a quieter, slower approach.",
      "The path to good sleep often begins an hour before bed.",
    ],
  },
  companion: {
    id: "companion",
    emoji: "🌿",
    title: "Gentle Companion",
    pathKey: "COMPANION",
    duration: "1 min",
    descriptions: [
      "A gentle message is waiting for you, if you want one.",
      "Sometimes a quiet word of encouragement is what the day needs.",
      "The companion space holds something supportive for right now.",
      "A moment of warmth, offered without conditions.",
      "One small message. No expectations.",
    ],
  },
  selfCompassion: {
    id: "selfCompassion",
    emoji: "💛",
    title: "Self-Compassion",
    pathKey: "SELF_COMPASSION",
    duration: "5 min",
    descriptions: [
      "A gentle space to meet yourself wherever you are today.",
      "If today has been hard, the self-compassion toolkit is here.",
      "Kindness toward yourself is not indulgence. It is maintenance.",
      "There is no wrong time to visit the self-compassion space.",
      "Whatever is weighing on you, you do not have to carry it harshly.",
    ],
  },
  wellnessCheckIn: {
    id: "wellnessCheckIn",
    emoji: "🌱",
    title: "Wellness Check-In",
    pathKey: "WELLNESS_TRACKER",
    duration: "2 min",
    descriptions: [
      "A short check-in helps Sthira understand how today feels for you.",
      "Two minutes to notice how you are arriving today.",
      "A daily check-in is a small act of self-attention.",
      "How are you, really? Take a moment to notice.",
      "Today's check-in helps shape what Sthira offers you.",
    ],
  },
  sanctuary: {
    id: "sanctuary",
    emoji: "🕊️",
    title: "Digital Sanctuary",
    pathKey: "SANCTUARY",
    duration: "Any",
    descriptions: [
      "A place to simply exist, without having to do anything.",
      "The sanctuary is always available as a quiet resting point.",
      "No expectations. No output. Just a gentle space.",
      "Sometimes the most supportive thing is a moment of stillness.",
      "Visit the sanctuary whenever the rest of the day feels like too much.",
    ],
  },
};

// ── Description selector ──────────────────────────────────────────────────────

function pickDescription(momentKey) {
  const moment = MOMENT_POOL[momentKey];
  if (!moment) return "";
  const today = new Date().toISOString().slice(0, 10);
  const hash  = (today + momentKey)
    .split("")
    .reduce((acc, ch) => acc + ch.charCodeAt(0), 0);
  const pool = moment.descriptions;
  if (!Array.isArray(pool) || pool.length === 0) return "";
  return pool[hash % pool.length];
}

function buildMoment(key) {
  const def = MOMENT_POOL[key];
  if (!def) return null;
  return {
    id:          def.id,
    emoji:       def.emoji,
    title:       def.title,
    description: pickDescription(key),
    duration:    def.duration,
    pathKey:     def.pathKey,
  };
}

// ── Plan generation rules ─────────────────────────────────────────────────────

function buildLowEnergyPlan({ phase, weatherId, hydrationPct }) {
  const moments = [];
  if (hydrationPct === null || hydrationPct < 50) moments.push("hydration");
  moments.push("breathing");
  moments.push("calmSounds");
  moments.push("sanctuary");

  if (phase === "evening" || phase === "late-evening" || phase === "night") {
    moments.push("sleepWindDown");
  } else {
    moments.push(
      weatherId === "stormy" || weatherId === "rainy"
        ? "selfCompassion"
        : "companion",
    );
  }

  if (moments.length < 5) moments.push("gratitude");
  return moments.slice(0, 6);
}

function buildMediumEnergyPlan({ phase, season, weatherId, hydrationPct }) {
  const moments = [];
  if (hydrationPct === null || hydrationPct < 60) moments.push("hydration");

  if (phase === "morning" || phase === "early-morning") {
    moments.push("morningRoutine", "eyeRecovery");
  } else if (phase === "afternoon") {
    moments.push("studyBreak", "eyeRecovery");
  } else if (phase === "evening" || phase === "late-evening") {
    moments.push("eveningReflection", "sleepWindDown");
  } else {
    moments.push("sleepWindDown", "calmSounds");
  }

  moments.push(
    season === "spring" || season === "summer" ? "gratitude" : "letters",
  );

  if (
    (weatherId === "rainy" || weatherId === "stormy" || weatherId === "foggy") &&
    !moments.includes("calmSounds")
  ) {
    moments.push("calmSounds");
  }

  if (moments.length < 4) moments.push("companion");
  return moments.slice(0, 6);
}

function buildHighEnergyPlan({ phase, season, weatherId, hydrationPct }) {
  const moments = [];
  if (hydrationPct === null || hydrationPct < 70) moments.push("hydration");

  if (phase === "morning" || phase === "early-morning") {
    moments.push("morningRoutine", "focus", "eyeRecovery", "gratitude");
  } else if (phase === "afternoon") {
    moments.push("focus", "studyBreak", "eyeRecovery", "gratitude");
  } else if (phase === "evening" || phase === "late-evening") {
    moments.push("eveningReflection", "letters", "sleepWindDown");
  } else {
    moments.push("calmSounds", "sleepWindDown", "companion");
  }

  if (moments.length < 4) moments.push("breathing");
  return moments.slice(0, 6);
}

function buildUnknownEnergyPlan({ phase }) {
  const moments = ["wellnessCheckIn", "hydration", "breathing"];

  if (phase === "morning" || phase === "early-morning") {
    moments.push("morningRoutine");
  } else if (phase === "afternoon") {
    moments.push("studyBreak");
  } else if (
    phase === "evening" ||
    phase === "late-evening" ||
    phase === "night"
  ) {
    moments.push("eveningReflection");
  } else {
    moments.push("companion");
  }

  moments.push("calmSounds");
  return moments.slice(0, 6);
}

// ── Subtitle generation ───────────────────────────────────────────────────────

const SUBTITLES = {
  [ENERGY_STATES.LOW]:     "A softer kind of day, gently held.",
  [ENERGY_STATES.MEDIUM]:  "A steady rhythm for what's ahead.",
  [ENERGY_STATES.HIGH]:    "A little more capacity to work with today.",
  [ENERGY_STATES.UNKNOWN]: "Let's start by understanding how you are today.",
};

// ── Main entry point ──────────────────────────────────────────────────────────

export function buildDailyCompanionPlan() {
  const phase        = getTimePhase();
  const season       = getCurrentSeason();
  const weatherEntry = getTodayWeather();
  const weatherId    = weatherEntry?.weather ?? null;
  const energyValue  = getTodayEnergyValue();
  const energyState  = classifyEnergy(energyValue);
  const hydrationPct = getTodayHydrationPercentage();

  const context = { phase, season, weatherId, hydrationPct };

  let keys;
  switch (energyState) {
    case ENERGY_STATES.LOW:    keys = buildLowEnergyPlan(context);     break;
    case ENERGY_STATES.MEDIUM: keys = buildMediumEnergyPlan(context);  break;
    case ENERGY_STATES.HIGH:   keys = buildHighEnergyPlan(context);    break;
    default:                   keys = buildUnknownEnergyPlan(context);
  }

  // Deduplicate while preserving order
  const seen       = new Set();
  const dedupedKeys = keys.filter((k) => {
    if (seen.has(k)) return false;
    seen.add(k);
    return true;
  });

  const moments = dedupedKeys
    .map((k) => buildMoment(k))
    .filter(Boolean)
    .slice(0, 6);

  // Ensure minimum 4
  if (moments.length < 4) {
    const fallbacks = ["breathing", "hydration", "calmSounds", "companion"];
    for (const fb of fallbacks) {
      if (moments.length >= 4) break;
      if (!moments.find((m) => m.id === fb)) {
        const m = buildMoment(fb);
        if (m) moments.push(m);
      }
    }
  }

  return {
    energyState,
    subtitle: SUBTITLES[energyState] ?? SUBTITLES[ENERGY_STATES.UNKNOWN],
    moments,
  };
}