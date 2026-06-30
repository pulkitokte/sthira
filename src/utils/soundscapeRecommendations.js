// src/utils/soundscapeRecommendations.js
// Derives a single gentle soundscape suggestion based on time, season, and
// today's emotional weather. NEVER auto-plays audio — recommendation only.
// Maps directly onto existing Calm Sounds sound ids (no new sounds created).

import { getTimePhase, getCurrentSeason } from "./atmosphereEngine";
import { getTodayEntry } from "./emotionalWeather";
import { getSoundById } from "../data/calmSounds";

// ── Recommendation rule set (20+) ────────────────────────────────────────────
// Each rule has a test function and a result if it matches.
// Rules are evaluated in order — first match wins.
// "soundId" must correspond to an id in src/data/calmSounds.js.

const RECOMMENDATION_RULES = [
  // ── Emotional weather takes priority when present ──────────────────────────
  {
    id: "weather-stormy",
    test: ({ weatherId }) => weatherId === "stormy",
    soundId: "ocean",
    reason:
      "Ocean waves can offer something steady to hold onto on an intense day.",
  },
  {
    id: "weather-rainy",
    test: ({ weatherId }) => weatherId === "rainy",
    soundId: "rain",
    reason: "Rain sounds may help you settle into reflection.",
  },
  {
    id: "weather-foggy",
    test: ({ weatherId }) => weatherId === "foggy",
    soundId: "wind-trees",
    reason: "A gentle breeze can offer clarity when things feel unclear.",
  },
  {
    id: "weather-cloudy",
    test: ({ weatherId }) => weatherId === "cloudy",
    soundId: "stream",
    reason: "A soft stream can offer quiet company on a muted day.",
  },
  {
    id: "weather-sunny",
    test: ({ weatherId, phase }) => weatherId === "sunny" && phase !== "night",
    soundId: "forest",
    reason: "Forest sounds can echo the warmth and openness you noted today.",
  },
  {
    id: "weather-breezy",
    test: ({ weatherId }) => weatherId === "breezy",
    soundId: "wind-trees",
    reason: "Something light and moving may match how today feels.",
  },
  {
    id: "weather-clear-night",
    test: ({ weatherId }) => weatherId === "clear-night",
    soundId: "night-crickets",
    reason: "A quiet night calls for a quiet, familiar sound.",
  },

  // ── Time + season combinations ───────────────────────────────────────────────
  {
    id: "morning-spring",
    test: ({ phase, season }) => phase === "morning" && season === "spring",
    soundId: "forest",
    reason: "Soft birdsong and forest air can accompany a slow beginning.",
  },
  {
    id: "morning-summer",
    test: ({ phase, season }) => phase === "morning" && season === "summer",
    soundId: "cafe",
    reason: "A gentle café hum can ease you into a warm summer morning.",
  },
  {
    id: "morning-autumn",
    test: ({ phase, season }) => phase === "morning" && season === "autumn",
    soundId: "wind-trees",
    reason: "A light autumn breeze can settle a slightly cooler morning.",
  },
  {
    id: "morning-winter",
    test: ({ phase, season }) => phase === "morning" && season === "winter",
    soundId: "fireplace",
    reason: "Warmth can be a good companion on a cold morning.",
  },
  {
    id: "early-morning-any",
    test: ({ phase }) => phase === "early-morning",
    soundId: "night-crickets",
    reason:
      "The world is still quiet — a soft, familiar sound can ease you into the day.",
  },
  {
    id: "afternoon-spring",
    test: ({ phase, season }) => phase === "afternoon" && season === "spring",
    soundId: "stream",
    reason:
      "A gentle stream can offer a clear-headed pause in the middle of the day.",
  },
  {
    id: "afternoon-summer",
    test: ({ phase, season }) => phase === "afternoon" && season === "summer",
    soundId: "ocean",
    reason:
      "Ocean waves can mirror the open, unhurried feeling of a summer afternoon.",
  },
  {
    id: "afternoon-autumn",
    test: ({ phase, season }) => phase === "afternoon" && season === "autumn",
    soundId: "forest",
    reason: "Rustling leaves can suit a reflective autumn afternoon.",
  },
  {
    id: "afternoon-winter",
    test: ({ phase, season }) => phase === "afternoon" && season === "winter",
    soundId: "cafe",
    reason: "A soft café ambience can bring some warmth to a winter afternoon.",
  },
  {
    id: "evening-spring",
    test: ({ phase, season }) => phase === "evening" && season === "spring",
    soundId: "wind-trees",
    reason: "A gentle breeze can help the day soften into evening.",
  },
  {
    id: "evening-summer",
    test: ({ phase, season }) => phase === "evening" && season === "summer",
    soundId: "night-crickets",
    reason: "Crickets arriving with the evening can mark a gentle slowdown.",
  },
  {
    id: "evening-autumn",
    test: ({ phase, season }) => phase === "evening" && season === "autumn",
    soundId: "forest",
    reason: "A forest evening can hold the quiet turning of the season.",
  },
  {
    id: "evening-winter",
    test: ({ phase, season }) => phase === "evening" && season === "winter",
    soundId: "fireplace",
    reason:
      "A fireplace can be a fitting companion as winter evenings draw in.",
  },
  {
    id: "late-evening-any",
    test: ({ phase }) => phase === "late-evening",
    soundId: "rain",
    reason: "Soft rain can help ease the transition toward rest.",
  },
  {
    id: "night-winter",
    test: ({ phase, season }) => phase === "night" && season === "winter",
    soundId: "fireplace",
    reason: "Tonight may benefit from a quieter, warmer atmosphere.",
  },
  {
    id: "night-summer",
    test: ({ phase, season }) => phase === "night" && season === "summer",
    soundId: "night-crickets",
    reason:
      "A summer night has its own familiar quiet — crickets can hold that.",
  },
  {
    id: "night-any",
    test: ({ phase }) => phase === "night",
    soundId: "night-crickets",
    reason: "Tonight may benefit from a quieter atmosphere.",
  },

  // ── Fallback ────────────────────────────────────────────────────────────────
  {
    id: "default-fallback",
    test: () => true,
    soundId: "stream",
    reason: "A gentle stream is a calm companion for any moment.",
  },
];

/**
 * Build the full context used for recommendation matching.
 */
function buildContext() {
  const phase = getTimePhase();
  const season = getCurrentSeason();
  const weatherEntry = getTodayEntry();
  const weatherId = weatherEntry?.weather ?? null;
  return { phase, season, weatherId };
}

/**
 * Get today's nature soundscape recommendation.
 * Returns { sound, reason } or null if no matching sound is available
 * (e.g. the recommended sound id no longer exists in calmSounds.js).
 */
export function getSoundscapeRecommendation() {
  const context = buildContext();
  const rule = RECOMMENDATION_RULES.find((r) => r.test(context));

  if (!rule) return null;

  const sound = getSoundById(rule.soundId);
  if (!sound) return null;

  return {
    sound,
    reason: rule.reason,
    ruleId: rule.id,
  };
}
