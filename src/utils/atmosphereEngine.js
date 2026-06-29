// src/utils/atmosphereEngine.js
// Pure utility — derives atmosphere from current time, season, and emotional weather.
// No side effects. No UI. Fully testable.

import {
  TIME_PHASES,
  TIME_PHASE_LABELS,
  SEASONS,
  SEASON_LABELS,
  SEASON_EMOJIS,
  ATMOSPHERE_PRESETS,
  WEATHER_FEELING_PHRASES,
  ATMOSPHERIC_QUOTES,
} from "../data/atmospheres";

// ── Time phase ────────────────────────────────────────────────────────────────

export function getTimePhase(hour = new Date().getHours()) {
  if (hour >= 4 && hour < 7) return TIME_PHASES.EARLY_MORNING;
  if (hour >= 7 && hour < 12) return TIME_PHASES.MORNING;
  if (hour >= 12 && hour < 17) return TIME_PHASES.AFTERNOON;
  if (hour >= 17 && hour < 21) return TIME_PHASES.EVENING;
  if (hour >= 21 && hour < 23) return TIME_PHASES.LATE_EVENING;
  return TIME_PHASES.NIGHT;
}

export function getTimePhaseLabel(phase) {
  return TIME_PHASE_LABELS[phase] ?? "Now";
}

// ── Season ────────────────────────────────────────────────────────────────────

export function getCurrentSeason() {
  const month = new Date().getMonth(); // 0–11
  if (month >= 2 && month <= 4) return SEASONS.SPRING;
  if (month >= 5 && month <= 7) return SEASONS.SUMMER;
  if (month >= 8 && month <= 10) return SEASONS.AUTUMN;
  return SEASONS.WINTER;
}

export function getSeasonLabel(season) {
  return SEASON_LABELS[season] ?? "";
}

export function getSeasonEmoji(season) {
  return SEASON_EMOJIS[season] ?? "";
}

// ── Preset lookup ─────────────────────────────────────────────────────────────

export function getAtmospherePreset(phase, season) {
  const key = `${phase}-${season}`;
  return (
    ATMOSPHERE_PRESETS[key] ?? ATMOSPHERE_PRESETS["morning-spring"] // safe fallback
  );
}

// ── Emotional weather ─────────────────────────────────────────────────────────

export function getWeatherFeelingPhrase(weatherId) {
  return WEATHER_FEELING_PHRASES[weatherId] ?? null;
}

// ── Quote selection ───────────────────────────────────────────────────────────

/**
 * Returns today's atmospheric quote.
 * Deterministic — same date always returns same quote.
 */
export function getTodayAtmosphericQuote() {
  const today = new Date().toISOString().slice(0, 10);
  const hash = today.split("").reduce((acc, ch) => acc + ch.charCodeAt(0), 0);
  return ATMOSPHERIC_QUOTES[hash % ATMOSPHERIC_QUOTES.length];
}

// ── Full atmosphere derivation ────────────────────────────────────────────────

/**
 * Derive the complete atmosphere context for the current moment.
 * Accepts an optional weatherId from today's emotional weather check-in.
 *
 * Returns:
 * {
 *   phase, phaseLabel,
 *   season, seasonLabel, seasonEmoji,
 *   preset,
 *   weatherFeelingPhrase,
 *   quote,
 * }
 */
export function deriveAtmosphere(weatherId = null) {
  const phase = getTimePhase();
  const season = getCurrentSeason();
  const preset = getAtmospherePreset(phase, season);

  return {
    phase,
    phaseLabel: getTimePhaseLabel(phase),
    season,
    seasonLabel: getSeasonLabel(season),
    seasonEmoji: getSeasonEmoji(season),
    preset,
    weatherFeelingPhrase: getWeatherFeelingPhrase(weatherId),
    quote: getTodayAtmosphericQuote(),
  };
}

