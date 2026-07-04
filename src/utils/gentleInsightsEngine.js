// src/utils/gentleInsightsEngine.js
// Generates 3 gentle, warm observations from existing app data.
// Read-only. No new storage. No new contexts. No new hooks.
// Deterministic — same date always produces same 3 insights.
// Emotionally observational, never analytical or motivational.

import { getCurrentSeason } from "./atmosphereEngine";
import { getAllReflectionDates, hasReflectedToday } from "./gentleStreaks";
import {
  getTodayEnergyValue,
  classifyEnergy,
  ENERGY_STATES,
} from "./energyGuidance";

// ── Safe reader ───────────────────────────────────────────────────────────────

function safeRead(key) {
  try {
    const raw = localStorage.getItem(key);
    return raw ? JSON.parse(raw) : null;
  } catch (_) {
    return null;
  }
}

// ── Deterministic selector ────────────────────────────────────────────────────

function deterministicIndex(seed, total) {
  if (total <= 0) return 0;
  const today = new Date().toISOString().slice(0, 10);
  const hash = (today + seed)
    .split("")
    .reduce((acc, ch) => acc + ch.charCodeAt(0), 0);
  return hash % total;
}

function pick(pool, seed) {
  if (!pool || pool.length === 0) return null;
  return pool[deterministicIndex(seed, pool.length)];
}

// ── Data aggregators (all read-only) ─────────────────────────────────────────

function getRecentDates(days = 14) {
  const today = new Date();
  const result = [];
  for (let i = 0; i < days; i++) {
    const d = new Date(today);
    d.setDate(today.getDate() - i);
    result.push(d.toISOString().slice(0, 10));
  }
  return result;
}

// Hydration
function getHydrationHistory() {
  const candidates = ["sthira_hydration", "sthira_hydration_data"];
  for (const key of candidates) {
    const data = safeRead(key);
    if (!data) continue;
    if (Array.isArray(data)) return data;
    if (data?.entries && Array.isArray(data.entries)) return data.entries;
  }
  return [];
}

function getHydrationDaysAbove(pct = 60, within = 14) {
  const hist = getHydrationHistory();
  const dates = getRecentDates(within);
  return hist.filter((e) => {
    if (!dates.includes(e.date)) return false;
    if (!e.goal || e.goal === 0) return false;
    return (e.total / e.goal) * 100 >= pct;
  }).length;
}

// Gratitude
function getGratitudeEntries() {
  const data = safeRead("sthira_gratitude_garden");
  return Array.isArray(data) ? data : [];
}

function getGratitudeDaysInPeriod(within = 14) {
  const entries = getGratitudeEntries();
  const dates = getRecentDates(within);
  const days = new Set(
    entries.map((e) => e.date).filter((d) => dates.includes(d)),
  );
  return days.size;
}

function getTotalGratitude() {
  return getGratitudeEntries().length;
}

// Letters
function getLetterEntries() {
  const data = safeRead("sthira_letters");
  return Array.isArray(data) ? data : [];
}

function getTotalLetters() {
  return getLetterEntries().length;
}

function getLettersInPeriod(within = 14) {
  const entries = getLetterEntries();
  const dates = getRecentDates(within);
  return entries.filter((e) => dates.includes((e.createdAt ?? "").slice(0, 10)))
    .length;
}

// Weather
function getWeatherEntries() {
  const data = safeRead("sthira_emotional_weather");
  return Array.isArray(data) ? data : [];
}

function getWeatherDaysInPeriod(within = 14) {
  const entries = getWeatherEntries();
  const dates = getRecentDates(within);
  return entries.filter((e) => dates.includes(e.date)).length;
}

function getMostCommonWeather(within = 14) {
  const entries = getWeatherEntries();
  const dates = getRecentDates(within);
  const recent = entries.filter((e) => dates.includes(e.date));
  if (recent.length === 0) return null;
  const counts = {};
  recent.forEach((e) => {
    counts[e.weather] = (counts[e.weather] ?? 0) + 1;
  });
  return Object.entries(counts).sort((a, b) => b[1] - a[1])[0]?.[0] ?? null;
}

// Evening reflections
function getReflectionEntries() {
  const data = safeRead("sthira_evening_reflections");
  return Array.isArray(data) ? data : [];
}

function getReflectionDaysInPeriod(within = 14) {
  const entries = getReflectionEntries();
  const dates = getRecentDates(within);
  return entries.filter((e) => dates.includes(e.date)).length;
}

// Mood journal
function getMoodEntries() {
  const data = safeRead("sthira_mood_journal");
  return Array.isArray(data) ? data : [];
}

function getMoodDaysInPeriod(within = 14) {
  const entries = getMoodEntries();
  const dates = getRecentDates(within);
  return entries.filter((e) => dates.includes(e.date)).length;
}

// Wellness
function getWellnessEntries() {
  const candidates = ["sthira_wellness_data", "sthira_wellness"];
  for (const key of candidates) {
    const data = safeRead(key);
    if (!data) continue;
    if (Array.isArray(data)) return data;
    if (Array.isArray(data?.entries)) return data.entries;
  }
  return [];
}

function getWellnessDaysInPeriod(within = 14) {
  const entries = getWellnessEntries();
  const dates = getRecentDates(within);
  return entries.filter((e) => dates.includes(e.date)).length;
}

// ── Insight candidate builders ────────────────────────────────────────────────
// Each builder returns { category, text } or null if there is not enough
// data to support the observation. Only eligible insights enter the pool.

function hydrationInsight() {
  const days = getHydrationDaysAbove(60, 14);

  if (days >= 8) {
    const lines = [
      "You've been remembering water more often lately.",
      "Staying hydrated has quietly become a more regular part of your days.",
      "Small acts of hydration have been showing up more consistently.",
      "Your body has been receiving a little more care in the form of water.",
    ];
    return { category: "hydration", text: pick(lines, "hyd-high") };
  }
  if (days >= 4) {
    const lines = [
      "Water has appeared in your day more than usual lately.",
      "A gentle rhythm around hydration seems to be forming.",
      "Hydration has been part of your recent days more than before.",
    ];
    return { category: "hydration", text: pick(lines, "hyd-med") };
  }
  return null;
}

function gratitudeInsight() {
  const days = getGratitudeDaysInPeriod(14);
  const total = getTotalGratitude();

  if (total >= 20 && days >= 5) {
    const lines = [
      "Your gratitude garden has grown into something real.",
      "You've been noticing small good things with some regularity.",
      "The habit of finding something worth appreciating seems to be taking root.",
      "Quiet moments of gratitude have been gathering in your garden.",
    ];
    return { category: "gratitude", text: pick(lines, "grat-deep") };
  }
  if (days >= 3) {
    const lines = [
      "You've been pausing to notice something good a few times recently.",
      "Small moments of gratitude have been appearing more in your days.",
      "Something in you has been looking for the quiet good things.",
    ];
    return { category: "gratitude", text: pick(lines, "grat-light") };
  }
  return null;
}

function lettersInsight() {
  const total = getTotalLetters();
  const recent = getLettersInPeriod(14);

  if (total >= 5) {
    const lines = [
      "You've written ${total} letters to yourself — a quiet archive of who you have been.",
      "The letters you've written are becoming a small history of your inner life.",
      "Each letter you've written is a moment of honest attention to yourself.",
      "You have been leaving things behind for your future self — that is a generous habit.",
    ];
    // Template substitution for total
    const raw = pick(lines, "letter-deep");
    return {
      category: "letters",
      text: raw?.replace("${total}", String(total)) ?? raw,
    };
  }
  if (recent >= 1) {
    const lines = [
      "You wrote something to yourself recently. That kind of honesty is not small.",
      "A letter to yourself arrived recently. It will be there when you need it.",
      "Something you wrote to yourself is waiting, quietly.",
    ];
    return { category: "letters", text: pick(lines, "letter-light") };
  }
  return null;
}

function weatherInsight() {
  const days = getWeatherDaysInPeriod(14);
  const common = getMostCommonWeather(14);

  if (days >= 7 && common) {
    const phraseMap = {
      sunny: "Your days have carried a warmer quality recently.",
      cloudy: "Your recent days have had a softer, quieter quality.",
      rainy: "Your recent days have been more reflective and turned inward.",
      stormy:
        "You've been carrying something heavier lately — and you are still here.",
      foggy:
        "Uncertainty has been part of your recent days, and you have moved through it.",
      breezy: "There has been a lightness in how your recent days have felt.",
      "clear-night": "Your evenings have carried a particular clarity lately.",
    };
    const text = phraseMap[common];
    if (text) return { category: "weather", text };
  }
  if (days >= 4) {
    const lines = [
      "You've been noticing how your days feel from the inside. That is a real practice.",
      "Paying attention to your emotional weather is becoming more regular.",
      "The habit of noticing how you feel has been showing up in your days.",
    ];
    return { category: "weather", text: pick(lines, "weather-partial") };
  }
  return null;
}

function reflectionInsight() {
  const eveningDays = getReflectionDaysInPeriod(14);
  const moodDays = getMoodDaysInPeriod(14);
  const totalDays = getAllReflectionDates().length;

  if (eveningDays >= 5) {
    const lines = [
      "Your evenings have become quieter and more deliberate.",
      "You've been closing your days with a little more intention.",
      "Evening reflection has been showing up in your days more regularly.",
      "A gentle end-of-day practice seems to be taking shape.",
    ];
    return { category: "reflection", text: pick(lines, "refl-eve") };
  }
  if (moodDays >= 5) {
    const lines = [
      "You've been checking in with how you feel more often.",
      "Mood journaling has appeared in your days with some regularity.",
      "Something in you has been making space to notice how today actually felt.",
    ];
    return { category: "reflection", text: pick(lines, "refl-mood") };
  }
  if (totalDays >= 10) {
    const lines = [
      "You've quietly built a rhythm of returning to yourself.",
      "Small moments of reflection have accumulated into something meaningful.",
      "You've been here for yourself more days than you may have counted.",
    ];
    return { category: "reflection", text: pick(lines, "refl-general") };
  }
  return null;
}

function wellnessInsight() {
  const days = getWellnessDaysInPeriod(14);
  const total = getWellnessEntries().length;

  if (days >= 7) {
    const lines = [
      "You've been checking in with your wellness regularly — a small act that matters.",
      "The habit of noticing how you are doing seems to be settling in.",
      "Regular wellness check-ins have become a quiet part of your days.",
      "You've been giving yourself the small gift of self-attention most days.",
    ];
    return { category: "wellness", text: pick(lines, "well-high") };
  }
  if (days >= 3) {
    const lines = [
      "Your wellness check-ins have been appearing more consistently.",
      "You've been taking a few moments to notice how you are feeling.",
      "Something small and steady is forming around your wellness attention.",
    ];
    return { category: "wellness", text: pick(lines, "well-med") };
  }
  return null;
}

function consistencyInsight() {
  const dates = getAllReflectionDates();
  const total = dates.length;
  const recentCount = dates.filter((d) => {
    const cutoff = new Date();
    cutoff.setDate(cutoff.getDate() - 7);
    return new Date(d + "T12:00:00") >= cutoff;
  }).length;

  if (recentCount >= 5) {
    const lines = [
      "This week has had a quiet kind of consistency to it.",
      "You've been showing up for yourself with some regularity this week.",
      "Your presence in your own life has been steady lately.",
      "Something in this week's pattern is worth noticing.",
    ];
    return { category: "consistency", text: pick(lines, "cons-week") };
  }
  if (total >= 20) {
    const lines = [
      "You've quietly built a real practice of returning to yourself.",
      "The accumulation of small moments of attention to yourself is becoming something meaningful.",
      "Small routines seem to be becoming familiar over time.",
      "You've been consistent with yourself over a long stretch — that is not nothing.",
    ];
    return { category: "consistency", text: pick(lines, "cons-long") };
  }
  if (total >= 5) {
    const lines = [
      "You are building something, slowly and without pressure.",
      "Small moments are beginning to accumulate.",
      "A pattern of returning to yourself is taking shape.",
    ];
    return { category: "consistency", text: pick(lines, "cons-early") };
  }
  return null;
}

function seasonInsight() {
  const season = getCurrentSeason();
  const insightMap = {
    spring: [
      "Spring tends to invite a quiet kind of beginning — your recent days reflect that.",
      "Something about this season seems to be making space for new things.",
      "Spring is in the background of your recent days, offering its particular kind of light.",
    ],
    summer: [
      "The length of summer days tends to change the texture of life — your days reflect that.",
      "Summer has a quality of openness that seems to be present in how you've been moving.",
      "There is a particular warmth in the backdrop of your recent days.",
    ],
    autumn: [
      "Autumn's tendency toward reflection seems to be present in your recent days.",
      "Something about this season encourages turning inward — you have been doing that.",
      "The quiet slowing of autumn seems to be part of your recent rhythm.",
    ],
    winter: [
      "Winter asks for rest, and your days seem to have some of that quality lately.",
      "The inward quality of winter is present in how your days have been shaped recently.",
      "There is something quieter and more deliberate about your days in this season.",
    ],
  };
  const lines = insightMap[season] ?? insightMap.spring;
  return { category: "season", text: pick(lines, `season-${season}`) };
}

function energyInsight() {
  const energyValue = getTodayEnergyValue();
  const state = classifyEnergy(energyValue);

  if (state === ENERGY_STATES.LOW) {
    const lines = [
      "Your body seems to be asking for something slower today — and you have noticed.",
      "Low energy days have their own wisdom. You seem to be listening.",
      "Gentleness with yourself on quieter days is its own kind of awareness.",
    ];
    return { category: "wellness", text: pick(lines, "energy-low") };
  }
  if (state === ENERGY_STATES.HIGH) {
    const lines = [
      "There is a little more available today. You seem to have noticed that too.",
      "More energy tends to open doors. The question is always which ones matter.",
      "Today has a different quality to it — you have picked up on that.",
    ];
    return { category: "wellness", text: pick(lines, "energy-high") };
  }
  return null;
}

// ── Pool assembly ─────────────────────────────────────────────────────────────

/**
 * Builds the full pool of eligible insights from all categories.
 * Returns only insights where data supports the observation.
 */
function buildInsightPool() {
  const candidates = [
    hydrationInsight(),
    gratitudeInsight(),
    lettersInsight(),
    weatherInsight(),
    reflectionInsight(),
    wellnessInsight(),
    consistencyInsight(),
    energyInsight(),
    seasonInsight(), // season always returns something — guaranteed minimum
  ];

  return candidates.filter(Boolean);
}

// ── 3-insight selection ───────────────────────────────────────────────────────

/**
 * Select 3 insights deterministically from the eligible pool.
 * Uses category diversity to avoid showing 3 of the same type.
 * Falls back gracefully if fewer than 3 eligible insights exist.
 */
function selectThreeInsights(pool) {
  if (pool.length === 0) return [];
  if (pool.length <= 3) return pool;

  // Use date-based offsets to pick 3 non-repeating entries with category diversity
  const today = new Date().toISOString().slice(0, 10);
  const baseHash = today
    .split("")
    .reduce((acc, ch) => acc + ch.charCodeAt(0), 0);

  const picked = [];
  const usedCategories = new Set();
  const usedIndices = new Set();

  // Three passes, each with a different seed offset
  for (let pass = 0; pass < pool.length && picked.length < 3; pass++) {
    const idx = (baseHash + pass * 7) % pool.length;
    const candidate = pool[idx];
    if (!usedIndices.has(idx) && !usedCategories.has(candidate.category)) {
      picked.push(candidate);
      usedIndices.add(idx);
      usedCategories.add(candidate.category);
    }
  }

  // If we still need more (rare — all remaining have same category), just fill
  for (let i = 0; i < pool.length && picked.length < 3; i++) {
    if (!usedIndices.has(i)) {
      picked.push(pool[i]);
      usedIndices.add(i);
    }
  }

  return picked.slice(0, 3);
}

// ── Main entry point ──────────────────────────────────────────────────────────

/**
 * Build today's gentle wellness insights.
 * Returns an array of 0–3 insight objects: [{ category, text }]
 */
export function buildGentleInsights() {
  const pool = buildInsightPool();
  const insights = selectThreeInsights(pool);
  return insights;
}
