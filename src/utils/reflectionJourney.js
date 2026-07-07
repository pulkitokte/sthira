// src/utils/reflectionJourney.js
// Generates one personalized gentle reflection card per day.
// Read-only — uses exclusively existing app data.
// No new storage created. No existing structures modified.
// Batch 51: hardened getTodayHydrationPct against division-by-zero and
//           null/undefined object key access; added guards to all string ops.

import { getTimePhase, getCurrentSeason } from "./atmosphereEngine";
import { getTodayEntry as getTodayWeather } from "./emotionalWeather";
import { getTodayEnergyValue, classifyEnergy, ENERGY_STATES } from "./energyGuidance";
import { getAllReflectionDates, hasReflectedToday } from "./gentleStreaks";

// ── Safe reader ───────────────────────────────────────────────────────────────

function safeRead(key) {
  try {
    const raw = localStorage.getItem(key);
    return raw ? JSON.parse(raw) : null;
  } catch (_) {
    return null;
  }
}

// ── Data accessors ────────────────────────────────────────────────────────────

function getTodayGratitudeCount() {
  const today = new Date().toISOString().slice(0, 10);
  const data  = safeRead("sthira_gratitude_garden");
  if (!Array.isArray(data)) return 0;
  return data.filter((e) => e?.date === today).length;
}

function getTodayLetterCount() {
  const today = new Date().toISOString().slice(0, 10);
  const data  = safeRead("sthira_letters");
  if (!Array.isArray(data)) return 0;
  return data.filter((e) => {
    const raw = e?.createdAt ?? e?.date ?? "";
    return typeof raw === "string" && raw.slice(0, 10) === today;
  }).length;
}

function getTodayHydrationPct() {
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
        const todayTotal = Number(data.todayTotal ?? NaN);
        const goal       = Number(data.goal ?? NaN);
        if (!isNaN(todayTotal) && !isNaN(goal) && goal > 0) {
          return Math.min(100, Math.round((todayTotal / goal) * 100));
        }

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

function getTotalMemoryCount() {
  const keys = [
    "sthira_gratitude_garden",
    "sthira_letters",
    "sthira_emotional_weather",
    "sthira_mood_journal",
    "sthira_evening_reflections",
  ];
  let count = 0;
  for (const key of keys) {
    const d = safeRead(key);
    if (Array.isArray(d)) count += d.length;
  }
  return count;
}

// ── Deterministic hash ────────────────────────────────────────────────────────

function deterministicIndex(seed, total) {
  if (total <= 0) return 0;
  const today = new Date().toISOString().slice(0, 10);
  const hash  = (today + seed)
    .split("")
    .reduce((acc, ch) => acc + ch.charCodeAt(0), 0);
  return hash % total;
}

// ── Message banks ─────────────────────────────────────────────────────────────

const WEATHER_TONE_PHRASES = {
  sunny:         "Today carried a warmth that was worth noticing.",
  cloudy:        "Today had a soft, muted quality to it.",
  rainy:         "Today had the particular stillness that rain tends to bring.",
  stormy:        "Today asked more of you than most days do.",
  foggy:         "Today felt a little unclear — and that is allowed.",
  breezy:        "There was something light and moving about today.",
  "clear-night": "Today ended with a particular kind of quiet clarity.",
};

const FALLBACK_TONE_PHRASES = [
  "Today unfolded at its own pace, as all days do.",
  "Today was simply a day — and that is enough.",
  "Today brought what it brought, and you moved through it.",
  "Today held its own texture, whether you noticed it or not.",
  "Today was yours, whatever shape it took.",
  "Each day leaves its own impression. Today was no different.",
  "Today moved through its hours and you were in it.",
  "Whatever today held, you were present for it.",
];

const OBSERVATIONS = {
  [ENERGY_STATES.LOW]: [
    "You kept going on a day when that genuinely took something.",
    "Low energy days are not empty days — they ask a different kind of presence.",
    "Resting is its own form of doing. You did that today.",
    "You were gentle with yourself today. That is a real accomplishment.",
    "Carrying less today was not giving up — it was being honest about what you had.",
    "Not every day needs to be full. Some are for simply getting through.",
    "Today was a quieter day, and quiet days have their own value.",
  ],
  [ENERGY_STATES.MEDIUM]: [
    "You found a rhythm today, even if it was a gentle one.",
    "A steady day, done with care, is never an ordinary day.",
    "There is something to be said for moving through a day without rushing it.",
    "Today had a real balance to it — effort and ease, side by side.",
    "You navigated today with a kind of steady presence.",
    "Consistency, even on unremarkable days, is how real change happens.",
    "A day of medium pace can hold more meaning than it seems from the outside.",
  ],
  [ENERGY_STATES.HIGH]: [
    "You had more available today, and you used it well.",
    "Something in you showed up with more today. That is worth noticing.",
    "High-energy days are rare enough to be appreciated when they arrive.",
    "You moved through today with a kind of momentum worth acknowledging.",
    "Today felt open. Whether you filled it or let it breathe — both were good choices.",
    "When energy is available, how you choose to spend it matters. You made choices today.",
    "Today gave you something extra. Notice whether you spent it on what mattered to you.",
  ],
  [ENERGY_STATES.UNKNOWN]: [
    "Even without knowing how today felt energetically, you were here for it.",
    "Today happened, and you were in it. That is something.",
    "Some days pass without us having measured them. This was one of those days.",
    "You moved through today in your own way, on your own terms.",
    "Not all days need to be classified. Today was simply today.",
    "Your presence in today — however uncertain — still counts.",
    "Today was yours, whatever energy it held.",
  ],
};

function getAppreciationLine(ctx) {
  if (ctx.todayGratitudeCount > 0) {
    const lines = [
      "You took a moment to notice something good today. That matters.",
      "Adding to the gratitude garden today was a quiet act of attention.",
      "You paused to acknowledge something worth appreciating. That is not small.",
      "Gratitude, noted even once, shifts something in how a day is remembered.",
    ];
    return lines[deterministicIndex("grat-appr", lines.length)];
  }
  if (ctx.todayLetterCount > 0) {
    const lines = [
      "Writing to yourself today was an act of kindness toward your future self.",
      "A letter to yourself is a gift that travels through time.",
      "You gave your future self something to return to. That is a generous thing to do.",
    ];
    return lines[deterministicIndex("letter-appr", lines.length)];
  }
  if (ctx.reflectedToday) {
    const lines = [
      "You took a moment to check in with yourself today. Most people do not.",
      "Reflecting, even briefly, is a form of self-attention that compounds over time.",
      "You noticed yourself today. That is more than it sounds.",
      "Even a single reflection is a thread in the fabric of who you are becoming.",
    ];
    return lines[deterministicIndex("refl-appr", lines.length)];
  }
  if (ctx.hydrationPct !== null && ctx.hydrationPct >= 60) {
    const lines = [
      "You kept yourself hydrated today. A small, foundational act of care.",
      "Drinking water seems simple, but it requires remembering to take care of yourself.",
      "Hydration is one of the quietest forms of self-respect. You practiced it today.",
    ];
    return lines[deterministicIndex("hydration-appr", lines.length)];
  }
  if (ctx.totalReflectionDays > 5) {
    const lines = [
      `You have returned to yourself ${ctx.totalReflectionDays} times. That is a practice worth recognizing.`,
      `Over ${ctx.totalReflectionDays} days of reflection have quietly built something real.`,
      `A journey of ${ctx.totalReflectionDays} days of self-attention is genuinely meaningful.`,
    ];
    return lines[deterministicIndex("journey-appr", lines.length)];
  }
  const lines = [
    "You made it through today. Whatever that required, you did it.",
    "You were here for today. That is always enough.",
    "Something about today is worth acknowledging, even if you are not sure what.",
    "Today happened, and you were present for it. That counts for something.",
    "Showing up, in whatever form it took, was its own small accomplishment.",
    "You existed today with whatever you had. That is the whole of what is asked.",
    "Today had its challenges and its small ordinary moments. You navigated both.",
  ];
  return lines[deterministicIndex("generic-appr", lines.length)];
}

const TOMORROW_SUGGESTIONS = {
  [ENERGY_STATES.LOW]: [
    "Tomorrow, if rest is still needed, let that be the plan without apology.",
    "Tomorrow can start slowly. There is no rule that says otherwise.",
    "If tomorrow has even one small gentle thing in it, that is a good beginning.",
    "Tomorrow, one thing at a time. You do not have to decide everything tonight.",
    "Allow tomorrow to be as quiet as it needs to be.",
    "Tomorrow is simply another chance to be kind to yourself.",
  ],
  [ENERGY_STATES.MEDIUM]: [
    "Tomorrow, a steady beginning is a good one. You do not need momentum to start.",
    "One small intention for tomorrow is enough. Something gentle and specific.",
    "Tomorrow might hold one thing worth looking forward to — let yourself notice it.",
    "A gentle rhythm continued tomorrow is more valuable than a burst of effort.",
    "Tomorrow can be an ordinary good day. Those are more valuable than they seem.",
    "Let tomorrow begin without pressure. See what it wants to be.",
  ],
  [ENERGY_STATES.HIGH]: [
    "Tomorrow, if energy is still available, use it for something that matters to you.",
    "A rested version of today's energy could make tomorrow feel expansive.",
    "Tomorrow has room for something meaningful. Leave a little space for it.",
    "Let tomorrow's first hour be intentional. Everything else can follow from that.",
    "Tomorrow is an opportunity to continue, not to restart. There is a difference.",
    "The momentum from today can carry gently into tomorrow — without forcing it.",
  ],
  [ENERGY_STATES.UNKNOWN]: [
    "Tomorrow, a simple wellness check-in can help Sthira understand how you are.",
    "Start tomorrow with a moment of noticing. Just that.",
    "Tomorrow might begin with one quiet question: how am I arriving today?",
    "Knowing how you feel tomorrow, even roughly, is a kind of self-attention.",
    "Tomorrow, try beginning with a breath before beginning with a task.",
    "Let tomorrow introduce itself before you decide what it is.",
  ],
};

const SEASON_FLAVOURS = {
  spring: { emoji: "🌸" },
  summer: { emoji: "☀️" },
  autumn: { emoji: "🍂" },
  winter: { emoji: "❄️" },
};

const REFLECTION_TITLES = [
  "The shape of today",
  "Looking back, gently",
  "A quiet accounting",
  "What today held",
  "The texture of this day",
  "Before today becomes yesterday",
  "A moment of looking back",
  "Today, in its fullness",
  "The day as it was",
  "A gentle inventory",
  "What this day was",
  "Noticing today",
  "The quiet review",
  "Today, honestly",
  "A soft look at the day",
  "What you carried today",
  "The day settling",
  "This day, as it happened",
  "Today's quiet presence",
  "Before the day closes",
];

// ── Main entry point ──────────────────────────────────────────────────────────

export function buildReflectionJourney() {
  const season       = getCurrentSeason();
  const phase        = getTimePhase();
  const weatherEntry = getTodayWeather();
  const weatherId    = weatherEntry?.weather ?? null;
  const energyValue  = getTodayEnergyValue();
  const energyState  = classifyEnergy(energyValue);

  const ctx = {
    energyState,
    phase,
    season,
    todayGratitudeCount: getTodayGratitudeCount(),
    todayLetterCount:    getTodayLetterCount(),
    reflectedToday:      hasReflectedToday(),
    hydrationPct:        getTodayHydrationPct(),
    totalReflectionDays: getAllReflectionDates().length,
    totalMemories:       getTotalMemoryCount(),
  };

  // Tone line
  const toneLine =
    weatherId && WEATHER_TONE_PHRASES[weatherId]
      ? WEATHER_TONE_PHRASES[weatherId]
      : FALLBACK_TONE_PHRASES[
          deterministicIndex("tone", FALLBACK_TONE_PHRASES.length)
        ];

  // Observation
  const obsPool    = OBSERVATIONS[energyState] ?? OBSERVATIONS[ENERGY_STATES.UNKNOWN];
  const observation = obsPool[deterministicIndex("obs", obsPool.length)];

  // Appreciation
  const appreciationLine = getAppreciationLine(ctx);

  // Tomorrow suggestion
  const tmrPool          = TOMORROW_SUGGESTIONS[energyState] ?? TOMORROW_SUGGESTIONS[ENERGY_STATES.UNKNOWN];
  const tomorrowSuggestion = tmrPool[deterministicIndex("tmr", tmrPool.length)];

  // Title
  const title = REFLECTION_TITLES[deterministicIndex("title", REFLECTION_TITLES.length)];

  // Emoji
  const { emoji } = SEASON_FLAVOURS[season] ?? SEASON_FLAVOURS.spring;

  // Show explore button only in evening / late-evening / night
  const showExploreButton =
    phase === "evening" || phase === "late-evening" || phase === "night";

  return {
    emoji,
    title,
    toneLine,
    observation,
    appreciationLine,
    tomorrowSuggestion,
    showExploreButton,
  };
}