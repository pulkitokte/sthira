// src/utils/adaptiveHomeEngine.js
// Generates one adaptive home banner per session tick (time + context).
// Purely derived from existing utilities — no new storage, no new logic.
// 120+ handcrafted message components assembled deterministically.

import { getTimePhase, getCurrentSeason } from "./atmosphereEngine";
import { getTodayEntry as getTodayWeather } from "./emotionalWeather";
import {
  getTodayEnergyValue,
  classifyEnergy,
  ENERGY_STATES,
} from "./energyGuidance";
import { hasReflectedToday, getAllReflectionDates } from "./gentleStreaks";

// ── Safe reader ───────────────────────────────────────────────────────────────

function safeRead(key) {
  try {
    const raw = localStorage.getItem(key);
    return raw ? JSON.parse(raw) : null;
  } catch (_) {
    return null;
  }
}

// ── Hydration helper ──────────────────────────────────────────────────────────

function getTodayHydrationPct() {
  const today = new Date().toISOString().slice(0, 10);
  const candidates = ["sthira_hydration", "sthira_hydration_data"];
  for (const key of candidates) {
    const data = safeRead(key);
    if (!data) continue;
    if (Array.isArray(data)) {
      const e = data.find((x) => x.date === today);
      if (e?.goal > 0)
        return Math.min(100, Math.round((e.total / e.goal) * 100));
    }
    if (data?.todayTotal != null && data?.goal > 0)
      return Math.min(100, Math.round((data.todayTotal / data.goal) * 100));
    if (data?.[today]?.total != null && data?.[today]?.goal > 0)
      return Math.min(
        100,
        Math.round((data[today].total / data[today].goal) * 100),
      );
  }
  return null;
}

// ── Deterministic selector ────────────────────────────────────────────────────

function pick(pool, seed) {
  if (!pool || pool.length === 0) return "";
  const today = new Date().toISOString().slice(0, 10);
  const hash = (today + seed)
    .split("")
    .reduce((acc, ch) => acc + ch.charCodeAt(0), 0);
  return pool[hash % pool.length];
}

// ═══════════════════════════════════════════════════════════════════════════════
// MESSAGE BANKS — 120+ handcrafted lines
// ═══════════════════════════════════════════════════════════════════════════════

// ── Greetings ─────────────────────────────────────────────────────────────────

const GREETINGS = {
  "early-morning": [
    "The day hasn't fully arrived yet. Neither do you have to.",
    "Early mornings are quiet for a reason. There is no hurry here.",
    "Something about this hour belongs only to you.",
    "The world is still coming awake. You have a moment before it does.",
    "This early hour is unhurried. Let it stay that way a little longer.",
  ],
  morning: [
    "Good morning. Let's begin gently.",
    "The morning is here and so are you.",
    "A new morning — begin at whatever pace feels right.",
    "This morning is yours to shape however slowly you need.",
    "Good morning. There is no rush in this space.",
  ],
  afternoon: [
    "You've already carried part of today. Let's continue with softness.",
    "The afternoon is here. You have done something already.",
    "You are partway through. That is real progress, quiet as it may be.",
    "The middle of the day often asks for steadiness. That is enough.",
    "Afternoon. You have been in today for a while now.",
  ],
  evening: [
    "The day is settling. Nothing needs to be rushed.",
    "Evening. The best part of today may have been quiet.",
    "The light is changing. Let the pace change with it.",
    "Evening has arrived — gently, as it always does.",
    "Things are slowing down. You are allowed to slow down with them.",
  ],
  "late-evening": [
    "The day has mostly run its course. You can begin to release it.",
    "Late evening. The heaviest parts of today can be set down.",
    "This hour belongs to the in-between — the day is not gone yet, but rest is near.",
    "The quieter hours are here. Let them hold you.",
    "Late evening is a good time to let today become what it was.",
  ],
  night: [
    "Rest is becoming part of today's journey.",
    "The night is here. Everything can wait until morning.",
    "Tonight is for rest — real, unhurried rest.",
    "The day has done what it could. So have you.",
    "Night. The gentlest part of any day.",
  ],
};

// ── Calm observations — vary by phase ────────────────────────────────────────

const OBSERVATIONS = {
  "early-morning": [
    "What you do in the first quiet hour often shapes the whole day — gently.",
    "Early mornings have a texture that later hours do not.",
    "The stillness here is worth noticing before it passes.",
    "Not much is needed of you right now. Just presence.",
    "Before the day has opinions about itself, there is this.",
  ],
  morning: [
    "The morning does not ask anything particular of you. It simply begins.",
    "Whatever you carry into today, you do not have to carry all of it.",
    "Small choices made slowly in the morning compound quietly.",
    "Today will find its own shape. You can let it.",
    "A morning begun without urgency tends to unfold better.",
  ],
  afternoon: [
    "Afternoons often feel heavier. That is not failure — it is midday.",
    "You are still in it, and that is something worth noting.",
    "The afternoon stretch requires a different kind of patience than the morning.",
    "Energy in the afternoon is sometimes quieter. Meet it where it is.",
    "A steady afternoon is its own accomplishment — unhurried and honest.",
  ],
  evening: [
    "The shift toward evening is a natural signal to soften.",
    "What got done today, got done. What did not, waited.",
    "Evening brings a different kind of clarity than morning.",
    "The day has been happening to you all day. You have been in it.",
    "Now is a good time to simply notice how today felt.",
  ],
  "late-evening": [
    "The late evening asks very little. Let it ask very little.",
    "Most of what seemed urgent earlier has settled.",
    "There is something calming about being near the end of a day.",
    "The day is almost done. You nearly are too — and that is good.",
    "Late evenings can be for yourself, quietly.",
  ],
  night: [
    "Night shifts the scale of everything. Problems look smaller. Rest looks better.",
    "The day is behind you. Sleep is ahead. This moment is between.",
    "Nights are for letting the body catch up with the mind.",
    "There is very little that needs to be decided in the dark.",
    "Nighttime asks nothing except that you allow yourself to rest.",
  ],
};

// ── Tiny encouragements — never motivational, always warm ────────────────────

const ENCOURAGEMENTS = [
  "You are allowed to move through today at your own pace.",
  "Whatever today holds, you do not need to solve it all at once.",
  "Showing up, in any form, is the beginning of everything.",
  "Something in you knows how to handle this. Trust it quietly.",
  "You do not need to perform anything today.",
  "Gentleness is always available, especially from yourself.",
  "There is no version of today that requires you to be perfect.",
  "Whatever you need to carry today, you do not have to carry it harshly.",
  "Small things, done with care, are always enough.",
  "Today is yours — not to conquer, just to live through.",
  "Being here, being present, is never nothing.",
  "You are already doing something — even if it is simply resting.",
  "Every moment of care you give yourself compounds quietly.",
  "It is always okay to go more slowly than expected.",
  "Whatever you bring to today is enough.",
];

// ── Seasonal sentences ────────────────────────────────────────────────────────

const SEASONAL_SENTENCES = {
  spring: [
    "Spring is returning things to life gradually. So can today.",
    "There is something growing quietly in the background this season.",
    "Spring moves slowly. So can you.",
    "The world is brightening. You do not have to match its pace.",
  ],
  summer: [
    "Summer days hold more light than any single person needs.",
    "The length of a summer day is itself a kind of abundance.",
    "Summer asks you to slow down enough to notice its warmth.",
    "Somewhere in today is the particular quality of a summer hour.",
  ],
  autumn: [
    "Autumn is practicing the art of letting things go.",
    "This season is showing you what graceful release looks like.",
    "Autumn's pace is unhurried and beautiful. It has something to teach.",
    "The world is gathering itself quietly as the season turns.",
  ],
  winter: [
    "Winter asks for rest in a way no other season does.",
    "The cold outside makes the warmth inside more meaningful.",
    "Winter is honest about the fact that not everything blooms right now.",
    "There is a kind of peace that only winter knows how to make.",
  ],
};

// ── Weather sentences ─────────────────────────────────────────────────────────

const WEATHER_SENTENCES = {
  sunny: "The sun is out — a simple, uncomplicated kind of good.",
  cloudy: "Cloudy days have a soft quality that clear days rarely do.",
  rainy: "The rain outside is asking you to stay inside yourself for a while.",
  stormy:
    "On stormy days, the most important thing you can do is be kind to yourself.",
  foggy: "Fog makes everything a little uncertain. That is allowed.",
  breezy: "There is something light in the air today. Let it be.",
  "clear-night": "Clear nights have their own particular stillness. Notice it.",
};

// ── Hydration reminders — only when low ──────────────────────────────────────

const HYDRATION_REMINDERS = [
  "A glass of water, whenever you remember, is one of the simplest forms of care.",
  "Before anything else — a sip of water.",
  "Your body has been working quietly all day. Water helps.",
  "One small act: drink something before continuing.",
];

// ── Energy modifiers — adjust tone without changing meaning ──────────────────

const ENERGY_TONE_NOTES = {
  [ENERGY_STATES.LOW]:
    "There is no expectation here today. Move only as much as feels right.",
  [ENERGY_STATES.MEDIUM]: "A steady pace is all today needs.",
  [ENERGY_STATES.HIGH]:
    "You have a little more available today. Use it for what actually matters to you.",
  [ENERGY_STATES.UNKNOWN]: null,
};

// ── Palette per phase+season ──────────────────────────────────────────────────
// All extremely soft — paper, warm beige, never vivid.

const BANNER_PALETTES = {
  "early-morning-spring": {
    gradient:
      "linear-gradient(155deg, rgba(205,215,200,0.14) 0%, rgba(215,220,195,0.09) 100%)",
    border: "rgba(175,195,165,0.2)",
    orbA: "rgba(175,205,165,0.07)",
    orbB: "rgba(195,215,180,0.05)",
  },
  "early-morning-summer": {
    gradient:
      "linear-gradient(155deg, rgba(225,215,185,0.14) 0%, rgba(215,205,170,0.09) 100%)",
    border: "rgba(200,175,130,0.2)",
    orbA: "rgba(225,200,150,0.07)",
    orbB: "rgba(210,190,140,0.05)",
  },
  "early-morning-autumn": {
    gradient:
      "linear-gradient(155deg, rgba(215,200,180,0.14) 0%, rgba(205,190,165,0.09) 100%)",
    border: "rgba(185,155,120,0.2)",
    orbA: "rgba(210,180,140,0.07)",
    orbB: "rgba(195,168,128,0.05)",
  },
  "early-morning-winter": {
    gradient:
      "linear-gradient(155deg, rgba(200,210,225,0.14) 0%, rgba(190,202,220,0.09) 100%)",
    border: "rgba(155,175,205,0.2)",
    orbA: "rgba(165,190,220,0.07)",
    orbB: "rgba(150,175,210,0.05)",
  },
  "morning-spring": {
    gradient:
      "linear-gradient(155deg, rgba(195,220,195,0.15) 0%, rgba(210,225,185,0.1) 100%)",
    border: "rgba(150,190,145,0.22)",
    orbA: "rgba(155,200,150,0.08)",
    orbB: "rgba(180,210,165,0.05)",
  },
  "morning-summer": {
    gradient:
      "linear-gradient(155deg, rgba(235,220,180,0.15) 0%, rgba(225,208,165,0.1) 100%)",
    border: "rgba(205,165,95,0.22)",
    orbA: "rgba(235,205,145,0.08)",
    orbB: "rgba(220,195,130,0.05)",
  },
  "morning-autumn": {
    gradient:
      "linear-gradient(155deg, rgba(225,205,178,0.15) 0%, rgba(215,190,158,0.1) 100%)",
    border: "rgba(190,145,95,0.22)",
    orbA: "rgba(220,175,125,0.08)",
    orbB: "rgba(200,160,110,0.05)",
  },
  "morning-winter": {
    gradient:
      "linear-gradient(155deg, rgba(205,215,232,0.15) 0%, rgba(192,205,228,0.1) 100%)",
    border: "rgba(130,155,195,0.22)",
    orbA: "rgba(155,185,222,0.08)",
    orbB: "rgba(140,170,210,0.05)",
  },
  "afternoon-spring": {
    gradient:
      "linear-gradient(155deg, rgba(188,215,188,0.14) 0%, rgba(200,220,178,0.09) 100%)",
    border: "rgba(140,185,138,0.2)",
    orbA: "rgba(148,195,142,0.07)",
    orbB: "rgba(168,205,158,0.05)",
  },
  "afternoon-summer": {
    gradient:
      "linear-gradient(155deg, rgba(238,222,172,0.14) 0%, rgba(228,210,152,0.09) 100%)",
    border: "rgba(210,165,82,0.2)",
    orbA: "rgba(238,208,138,0.07)",
    orbB: "rgba(222,195,122,0.05)",
  },
  "afternoon-autumn": {
    gradient:
      "linear-gradient(155deg, rgba(228,202,168,0.14) 0%, rgba(218,188,148,0.09) 100%)",
    border: "rgba(195,142,88,0.2)",
    orbA: "rgba(222,172,118,0.07)",
    orbB: "rgba(205,158,102,0.05)",
  },
  "afternoon-winter": {
    gradient:
      "linear-gradient(155deg, rgba(198,210,232,0.14) 0%, rgba(185,200,225,0.09) 100%)",
    border: "rgba(118,148,192,0.2)",
    orbA: "rgba(148,178,218,0.07)",
    orbB: "rgba(132,162,205,0.05)",
  },
  "evening-spring": {
    gradient:
      "linear-gradient(155deg, rgba(198,195,218,0.16) 0%, rgba(208,192,208,0.11) 100%)",
    border: "rgba(152,142,182,0.22)",
    orbA: "rgba(175,168,210,0.08)",
    orbB: "rgba(162,155,198,0.05)",
  },
  "evening-summer": {
    gradient:
      "linear-gradient(155deg, rgba(228,198,172,0.16) 0%, rgba(218,182,152,0.11) 100%)",
    border: "rgba(195,142,102,0.22)",
    orbA: "rgba(222,175,132,0.08)",
    orbB: "rgba(208,160,118,0.05)",
  },
  "evening-autumn": {
    gradient:
      "linear-gradient(155deg, rgba(215,188,162,0.18) 0%, rgba(202,172,142,0.13) 100%)",
    border: "rgba(185,132,88,0.25)",
    orbA: "rgba(210,165,118,0.09)",
    orbB: "rgba(195,150,102,0.06)",
  },
  "evening-winter": {
    gradient:
      "linear-gradient(155deg, rgba(175,185,212,0.18) 0%, rgba(162,175,205,0.13) 100%)",
    border: "rgba(108,132,182,0.25)",
    orbA: "rgba(142,168,208,0.09)",
    orbB: "rgba(128,155,195,0.06)",
  },
  "late-evening-spring": {
    gradient:
      "linear-gradient(155deg, rgba(178,178,202,0.2) 0%, rgba(188,178,198,0.15) 100%)",
    border: "rgba(132,128,168,0.25)",
    orbA: "rgba(158,155,195,0.08)",
    orbB: "rgba(145,142,182,0.05)",
  },
  "late-evening-summer": {
    gradient:
      "linear-gradient(155deg, rgba(208,178,158,0.2) 0%, rgba(198,162,138,0.15) 100%)",
    border: "rgba(178,128,95,0.25)",
    orbA: "rgba(202,158,122,0.08)",
    orbB: "rgba(188,142,108,0.05)",
  },
  "late-evening-autumn": {
    gradient:
      "linear-gradient(155deg, rgba(198,172,148,0.22) 0%, rgba(182,155,128,0.17) 100%)",
    border: "rgba(168,118,75,0.28)",
    orbA: "rgba(192,152,112,0.09)",
    orbB: "rgba(175,135,95,0.06)",
  },
  "late-evening-winter": {
    gradient:
      "linear-gradient(155deg, rgba(158,170,200,0.22) 0%, rgba(145,158,192,0.17) 100%)",
    border: "rgba(95,122,172,0.28)",
    orbA: "rgba(135,158,198,0.09)",
    orbB: "rgba(120,145,185,0.06)",
  },
  "night-spring": {
    gradient:
      "linear-gradient(155deg, rgba(158,158,188,0.22) 0%, rgba(168,158,182,0.17) 100%)",
    border: "rgba(112,108,158,0.28)",
    orbA: "rgba(142,138,182,0.09)",
    orbB: "rgba(128,125,168,0.06)",
  },
  "night-summer": {
    gradient:
      "linear-gradient(155deg, rgba(178,155,138,0.22) 0%, rgba(168,142,120,0.17) 100%)",
    border: "rgba(158,112,78,0.28)",
    orbA: "rgba(175,142,112,0.09)",
    orbB: "rgba(158,128,98,0.06)",
  },
  "night-autumn": {
    gradient:
      "linear-gradient(155deg, rgba(172,150,128,0.24) 0%, rgba(155,132,108,0.18) 100%)",
    border: "rgba(148,105,62,0.3)",
    orbA: "rgba(168,138,98,0.1)",
    orbB: "rgba(152,122,82,0.06)",
  },
  "night-winter": {
    gradient:
      "linear-gradient(155deg, rgba(132,148,182,0.24) 0%, rgba(118,135,172,0.18) 100%)",
    border: "rgba(78,108,162,0.3)",
    orbA: "rgba(118,142,185,0.1)",
    orbB: "rgba(105,128,172,0.06)",
  },
};

const FALLBACK_PALETTE = {
  gradient:
    "linear-gradient(155deg, rgba(205,198,185,0.14) 0%, rgba(198,190,175,0.09) 100%)",
  border: "rgba(185,175,160,0.2)",
  orbA: "rgba(190,182,165,0.07)",
  orbB: "rgba(175,168,152,0.05)",
};

// ── Main entry point ──────────────────────────────────────────────────────────

/**
 * Build the complete adaptive home banner data.
 * Returns:
 * {
 *   greeting, observation, encouragement,
 *   seasonalSentence | null,
 *   weatherSentence | null,
 *   hydrationReminder | null,
 *   energyNote | null,
 *   palette,
 *   phase, season,
 * }
 */
export function buildAdaptiveBanner() {
  const phase = getTimePhase();
  const season = getCurrentSeason();
  const weatherEntry = getTodayWeather();
  const weatherId = weatherEntry?.weather ?? null;
  const energyValue = getTodayEnergyValue();
  const energyState = classifyEnergy(energyValue);
  const hydrationPct = getTodayHydrationPct();
  const totalDays = getAllReflectionDates().length;

  // Greeting
  const greetingPool = GREETINGS[phase] ?? GREETINGS.morning;
  const greeting = pick(greetingPool, `greeting-${phase}`);

  // Observation
  const obsPool = OBSERVATIONS[phase] ?? OBSERVATIONS.morning;
  const observation = pick(obsPool, `obs-${phase}`);

  // Encouragement
  const encouragement = pick(ENCOURAGEMENTS, `enc-${phase}-${season}`);

  // Seasonal sentence — include for all phases except late-evening/night
  // (keeps banner light at end-of-day)
  const seasonalSentence =
    phase !== "late-evening" && phase !== "night"
      ? pick(
          SEASONAL_SENTENCES[season] ?? SEASONAL_SENTENCES.spring,
          `season-${season}-${phase}`,
        )
      : null;

  // Weather sentence
  const weatherSentence =
    weatherId && WEATHER_SENTENCES[weatherId]
      ? WEATHER_SENTENCES[weatherId]
      : null;

  // Hydration reminder — only when below 40% and before late evening
  const hydrationReminder =
    hydrationPct !== null &&
    hydrationPct < 40 &&
    phase !== "night" &&
    phase !== "late-evening"
      ? pick(HYDRATION_REMINDERS, `hyd-${phase}`)
      : null;

  // Energy note — only when known and not UNKNOWN
  const energyNote =
    energyState !== ENERGY_STATES.UNKNOWN
      ? (ENERGY_TONE_NOTES[energyState] ?? null)
      : null;

  // Palette
  const paletteKey = `${phase}-${season}`;
  const palette = BANNER_PALETTES[paletteKey] ?? FALLBACK_PALETTE;

  return {
    greeting,
    observation,
    encouragement,
    seasonalSentence,
    weatherSentence,
    hydrationReminder,
    energyNote,
    palette,
    phase,
    season,
  };
}
