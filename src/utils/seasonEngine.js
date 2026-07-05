// src/utils/seasonEngine.js
// Rich seasonal intelligence for the Sthira Seasonal Living Experience.
// Pure functions only. Read-only. No storage. No side effects.
// Deterministic — same date always produces same output.
//
// Five seasons are supported:
// Spring, Summer, Monsoon, Autumn, Winter
//
// Monsoon is treated as a distinct season occupying the peak-summer
// months (July–September in South/South-East Asia, broadly the Indian
// subcontinent context for which Sthira is designed). Callers may fall
// back to SUMMER if the user's locale does not experience a distinct
// monsoon. The engine exposes both and lets consumers decide.

// ═══════════════════════════════════════════════════════════════════════════════
// SEASON CONSTANTS
// ═══════════════════════════════════════════════════════════════════════════════

export const SEASONS = {
  SPRING: "spring",
  SUMMER: "summer",
  MONSOON: "monsoon",
  AUTUMN: "autumn",
  WINTER: "winter",
};

// ── Month-to-season mapping (Northern Hemisphere + Indian-subcontinent monsoon)
// Month is 0-indexed (0 = January).
//   Jan–Feb:  Winter
//   Mar–May:  Spring
//   Jun:      Summer (pre-monsoon)
//   Jul–Sep:  Monsoon
//   Oct–Nov:  Autumn
//   Dec:      Winter

const MONTH_TO_SEASON = {
  0: SEASONS.WINTER,
  1: SEASONS.WINTER,
  2: SEASONS.SPRING,
  3: SEASONS.SPRING,
  4: SEASONS.SPRING,
  5: SEASONS.SUMMER,
  6: SEASONS.MONSOON,
  7: SEASONS.MONSOON,
  8: SEASONS.MONSOON,
  9: SEASONS.AUTUMN,
  10: SEASONS.AUTUMN,
  11: SEASONS.WINTER,
};

// ═══════════════════════════════════════════════════════════════════════════════
// SEASON DETECTION
// ═══════════════════════════════════════════════════════════════════════════════

/**
 * Detect the current season from today's date.
 * Returns one of SEASONS.*.
 */
export function detectSeason() {
  const month = new Date().getMonth();
  return MONTH_TO_SEASON[month] ?? SEASONS.SUMMER;
}

/**
 * Returns the standard 4-season equivalent for downstream utilities
 * that only understand spring/summer/autumn/winter
 * (e.g. atmosphereEngine presets).
 * Monsoon maps to "summer" for palette purposes.
 */
export function detectStandardSeason() {
  const season = detectSeason();
  if (season === SEASONS.MONSOON) return "summer";
  return season;
}

// ═══════════════════════════════════════════════════════════════════════════════
// SEASON CONFIGURATIONS
// ═══════════════════════════════════════════════════════════════════════════════

const SEASON_CONFIGS = {
  [SEASONS.SPRING]: {
    name: "Spring",
    emoji: "🌸",
    description:
      "The world is brightening quietly. Small things are beginning again.",
    accentColor: "rgba(140,185,140,0.8)",
    accentColorSoft: "rgba(140,185,140,0.18)",
    backgroundGradient:
      "linear-gradient(160deg, rgba(195,220,195,0.15) 0%, rgba(210,225,185,0.1) 100%)",
    borderColor: "rgba(140,185,140,0.22)",
    morningFeeling: "gentle renewal",
    eveningFeeling: "soft settling",
    recommendedSoundId: "forest",
    recommendedRitual:
      "A gentle stretch followed by a few slow, deliberate breaths.",
    reflectionTone: "What is quietly beginning for you this season?",
    hydrationEmphasis: false,
    movementSuggestion: "A short walk outside, if the air is welcoming.",
  },

  [SEASONS.SUMMER]: {
    name: "Summer",
    emoji: "☀️",
    description:
      "The days are long. There is more light than any single hour needs.",
    accentColor: "rgba(205,165,80,0.8)",
    accentColorSoft: "rgba(205,165,80,0.15)",
    backgroundGradient:
      "linear-gradient(160deg, rgba(235,220,180,0.15) 0%, rgba(225,208,165,0.1) 100%)",
    borderColor: "rgba(205,165,80,0.22)",
    morningFeeling: "early warmth",
    eveningFeeling: "cooling down",
    recommendedSoundId: "night-crickets",
    recommendedRitual:
      "Begin early if you can, before the heat of the day settles in.",
    reflectionTone:
      "What is the quality of your days in this long-light season?",
    hydrationEmphasis: true,
    movementSuggestion:
      "Move in the cooler hours — early morning or after sunset.",
  },

  [SEASONS.MONSOON]: {
    name: "Monsoon",
    emoji: "🌧️",
    description:
      "The rain is asking you to slow down. This is its particular gift.",
    accentColor: "rgba(90,130,175,0.8)",
    accentColorSoft: "rgba(90,130,175,0.14)",
    backgroundGradient:
      "linear-gradient(160deg, rgba(175,195,220,0.15) 0%, rgba(160,185,215,0.1) 100%)",
    borderColor: "rgba(90,130,175,0.22)",
    morningFeeling: "soft and slow",
    eveningFeeling: "cozy inwardness",
    recommendedSoundId: "rain",
    recommendedRitual: "A warm drink. A quiet moment before the day begins.",
    reflectionTone:
      "What does this slower, rainier season make possible for you?",
    hydrationEmphasis: false,
    movementSuggestion:
      "Gentle indoor movement — stretching, or a slow indoor walk.",
  },

  [SEASONS.AUTUMN]: {
    name: "Autumn",
    emoji: "🍂",
    description:
      "The season is showing you what graceful letting-go looks like.",
    accentColor: "rgba(185,120,60,0.8)",
    accentColorSoft: "rgba(185,120,60,0.14)",
    backgroundGradient:
      "linear-gradient(160deg, rgba(225,200,165,0.15) 0%, rgba(215,185,145,0.1) 100%)",
    borderColor: "rgba(185,120,60,0.22)",
    morningFeeling: "crisp and reflective",
    eveningFeeling: "deeper settling",
    recommendedSoundId: "wind-trees",
    recommendedRitual:
      "A short walk as the light changes. Notice what the season is releasing.",
    reflectionTone: "What is ready to be released this autumn?",
    hydrationEmphasis: false,
    movementSuggestion:
      "Walking outdoors while the leaves are still there to be noticed.",
  },

  [SEASONS.WINTER]: {
    name: "Winter",
    emoji: "❄️",
    description:
      "Winter asks for rest in a way no other season does. Listen to that.",
    accentColor: "rgba(100,135,185,0.8)",
    accentColorSoft: "rgba(100,135,185,0.14)",
    backgroundGradient:
      "linear-gradient(160deg, rgba(200,210,232,0.15) 0%, rgba(185,200,225,0.1) 100%)",
    borderColor: "rgba(100,135,185,0.22)",
    morningFeeling: "quiet and slow",
    eveningFeeling: "warm retreat",
    recommendedSoundId: "fireplace",
    recommendedRitual:
      "Warm hands around a warm drink. Slow down before anything else.",
    reflectionTone: "What does this quieter season make room for?",
    hydrationEmphasis: false,
    movementSuggestion:
      "Gentle indoor stretching. The body benefits from warmth first.",
  },
};

// ═══════════════════════════════════════════════════════════════════════════════
// SEASONAL MICROCOPY — 120+ lines
// ═══════════════════════════════════════════════════════════════════════════════

const SEASON_MICROCOPY = {
  [SEASONS.SPRING]: [
    "The mornings feel a little lighter this season.",
    "Something is quietly beginning again.",
    "Fresh air may feel especially welcome right now.",
    "This season tends to invite gentler starts.",
    "There is a particular brightness to this time of year.",
    "Spring asks for small beginnings, not grand ones.",
    "The world is coming back slowly. So can you.",
    "This season is good for trying something small and new.",
    "Lighter mornings tend to make lighter days.",
    "Something in the air right now feels like possibility.",
    "Short walks often feel different this time of year.",
    "The season is brightening, slowly and honestly.",
    "Spring does not rush. Neither do you have to.",
    "This time of year has a particular kind of openness.",
    "Something small is growing — in the world and probably in you.",
    "The season is asking for fresh attention.",
    "Spring mornings have a quality that other seasons rarely match.",
    "There is room for something new in this season.",
    "This is a good season for gentle beginnings.",
    "The days are lengthening. There is a little more light to work with.",
    "Something about this season naturally slows the pace in a good way.",
    "Fresh starts feel more available in spring than at almost any other time.",
    "The season is opening up. You can open up with it.",
    "Something about the air in spring invites a different kind of attention.",
    "This time of year makes small acts of care feel more meaningful.",
  ],

  [SEASONS.SUMMER]: [
    "Water matters a little more these days.",
    "The heat is asking you to slow down and drink something cool.",
    "Early routines matter more when the afternoon will be warm.",
    "Long days can feel generous. Let them.",
    "Summer evenings often carry a particular kind of ease.",
    "The light stays late — use that for gentle things.",
    "Shade is its own form of self-care in this season.",
    "Hydration is not a small thing right now.",
    "Move in the cooler hours if you can.",
    "Summer asks you to pace yourself more carefully than usual.",
    "The long light of summer days has its own quality.",
    "Drink water before you think you need it.",
    "Summer mornings, begun early, have a distinct quality.",
    "The heat of this season makes the simple things matter more.",
    "Something about this long-light season invites more outdoor moments.",
    "This is a season for early starts and slow evenings.",
    "Warmth has a way of changing the texture of every hour.",
    "The body needs more care in heat. Give it what it asks for.",
    "Summer light, even in the afternoon, has an abundance to it.",
    "This season is generous with time. Use it gently.",
    "Long summer days can hold more than their hours suggest.",
    "Rest matters in this season — heat takes something from you quietly.",
    "The warmth of summer asks for a different kind of pace.",
    "Something in this season invites more water, more shade, more ease.",
    "Summer asks for gentle early mornings more than any other season.",
  ],

  [SEASONS.MONSOON]: [
    "The rain is asking you to slow down. That is a gift.",
    "Monsoon mornings have a particular kind of softness.",
    "Something about this season naturally invites journaling.",
    "Rain sounds can be company when things feel quieter.",
    "Slow mornings feel more honest in this season.",
    "This time of year is for cosy, unhurried things.",
    "The rain has its own kind of rhythm. You can borrow it.",
    "Monsoon evenings have a warmth that is worth staying inside for.",
    "The season is asking for a slower, more inward pace.",
    "Something about rain makes the interior of a day more visible.",
    "This is a season for warm drinks and unrushed hours.",
    "The world is wetter and quieter right now. So can you be.",
    "A slow monsoon morning is not a wasted one.",
    "Rain tends to make everything just slightly more reflective.",
    "This season has its own kind of coziness. Lean into it.",
    "Something about the monsoon naturally invites looking inward.",
    "The grey of this season is not emptiness — it is softness.",
    "Rainy seasons are for steady things, not urgent ones.",
    "This is a season that rewards stillness more than others.",
    "The sound of rain has a particular way of making space.",
    "Monsoon days are good for the kind of reflection that rain encourages.",
    "Something about this season makes indoor moments feel more complete.",
    "The rhythm of rain is one of the most reliable forms of calm.",
    "A cosy, slow monsoon evening is its own kind of nourishment.",
    "This season asks you to trade speed for depth.",
  ],

  [SEASONS.AUTUMN]: [
    "This season naturally invites slower evenings.",
    "Autumn light has a warmth that summer light does not.",
    "Something about this time of year is good for reflection.",
    "The season is practicing the art of letting go. So can you.",
    "Gratitude comes more easily in autumn.",
    "This season has a texture that rewards slowing down.",
    "Short walks feel especially meaningful when the leaves are changing.",
    "Autumn is asking what you are ready to release.",
    "The world is gathering itself quietly this season.",
    "Something about the autumn air invites a different kind of presence.",
    "This is a season for noticing endings with grace.",
    "The quality of autumn light is worth paying attention to.",
    "Cooler mornings this season have their own kind of invitation.",
    "Something in this time of year is asking for honest reflection.",
    "Autumn evenings carry a depth that summer evenings rarely do.",
    "The season is showing you that letting go can be beautiful.",
    "This is one of the best seasons for walking and simply noticing.",
    "The pace of autumn naturally slows things that needed slowing.",
    "Something about the crispness of autumn air changes how days feel.",
    "This season rewards those who are willing to reflect.",
    "Autumn's particular light is worth going outside to find.",
    "The world is releasing things quietly. You are allowed to as well.",
    "This season has a quality of completion that is worth honoring.",
    "Autumn evenings have a particular richness this time of year.",
    "Something about this season makes the small things feel more significant.",
  ],

  [SEASONS.WINTER]: [
    "Slower mornings are more honest in winter.",
    "Warm drinks are one of the simplest forms of winter self-care.",
    "The quiet of winter has its own kind of richness.",
    "Something about this season invites more inward attention.",
    "Winter is asking for rest that summer would have called laziness.",
    "Gentle stretching matters more when the cold has settled in.",
    "The cold outside makes warmth inside feel more meaningful.",
    "Something about winter makes the evenings feel more private.",
    "This season is for slower, quieter versions of your usual things.",
    "Winter mornings have a quality worth easing into rather than rushing.",
    "The short days of winter are worth noticing for what they hold.",
    "Something in this season is asking for more gentleness.",
    "Warm hands, warm drinks, warm moments — winter's small gifts.",
    "This is a season for things that sustain rather than things that excite.",
    "The quietness of winter is not emptiness. It is preparation.",
    "Something about the cold invites a more deliberate kind of warmth.",
    "Winter evenings are for closing things gently, not urgently.",
    "This season naturally asks for more layers of care.",
    "The pace of winter is a gift if you are willing to receive it.",
    "Something about this time of year makes stillness feel more natural.",
    "Winter light is softer and worth noticing when it appears.",
    "The long dark evenings of winter can be for the quieter things.",
    "This is a season for tending to what needs warmth.",
    "Something about winter asks you to be kinder to yourself.",
    "The cold of this season and the warmth you create within it — both matter.",
  ],
};

// ═══════════════════════════════════════════════════════════════════════════════
// SEASONAL RECOMMENDATIONS
// ═══════════════════════════════════════════════════════════════════════════════

const SEASON_RECOMMENDATIONS = {
  [SEASONS.SPRING]: {
    morningRoutineTip:
      "Spring mornings benefit from a gentle outdoor component, however brief.",
    hydrationNote: "Hydration is steady in spring. Keep it consistent.",
    movementNote:
      "Light, outdoor movement suits this season particularly well.",
    reflectionFocus: "What is new for you this season, however small?",
    eveningNote:
      "Spring evenings are a good time to notice what has changed in the last day.",
    companionTone: "gentle, curious, lightly hopeful",
    bestTimeForRoutine: "morning",
    bestTimeForReflection: "evening",
    avoidNote:
      "Overloading beginnings — spring asks for small starts, not big restarts.",
  },

  [SEASONS.SUMMER]: {
    morningRoutineTip:
      "Move early, before the day heats up. The cooler hours are the better hours.",
    hydrationNote:
      "Drink water more deliberately in summer. Heat depletes quietly.",
    movementNote: "Prioritise early movement and shade-based activity.",
    reflectionFocus:
      "How are you pacing yourself through the heat of this season?",
    eveningNote:
      "Summer evenings, when cooler, are often the most valuable part of the day.",
    companionTone: "warm, easy, unhurried",
    bestTimeForRoutine: "early-morning",
    bestTimeForReflection: "evening",
    avoidNote:
      "Midday intensity — the heat makes effort more costly than it appears.",
  },

  [SEASONS.MONSOON]: {
    morningRoutineTip:
      "A slow monsoon morning is not a wasted one. Begin gently.",
    hydrationNote:
      "Warm water or herbal drinks suit this season particularly well.",
    movementNote:
      "Indoor movement — stretching, yoga, slow walks in covered areas.",
    reflectionFocus: "The rain creates space for reflection. Use it.",
    eveningNote:
      "Monsoon evenings are especially good for journaling and quiet music.",
    companionTone: "cosy, reflective, patient",
    bestTimeForRoutine: "morning",
    bestTimeForReflection: "evening",
    avoidNote:
      "Rushing through monsoon days — the season itself asks for a slower pace.",
  },

  [SEASONS.AUTUMN]: {
    morningRoutineTip:
      "Crisp autumn mornings reward those who get up for them.",
    hydrationNote: "Hydration matters in autumn's dryness. Warm drinks count.",
    movementNote:
      "Walking outdoors while the leaves are still there to be noticed.",
    reflectionFocus: "What are you ready to release this season?",
    eveningNote:
      "Autumn evenings deepen naturally. Let them be for reflection.",
    companionTone: "warm, grounded, reflective",
    bestTimeForRoutine: "morning",
    bestTimeForReflection: "late-afternoon",
    avoidNote:
      "Treating the season as a deadline — autumn is for releasing, not rushing.",
  },

  [SEASONS.WINTER]: {
    morningRoutineTip:
      "Warm up slowly in winter. The body needs more time to find its pace.",
    hydrationNote:
      "Warm water and herbal drinks help maintain hydration in dry winter air.",
    movementNote:
      "Gentle stretching before anything else. Cold muscles need warmth first.",
    reflectionFocus:
      "What does the quietness of this season make possible for you?",
    eveningNote:
      "Winter evenings are for the warmest, most restful versions of your habits.",
    companionTone: "warm, quiet, deeply restful",
    bestTimeForRoutine: "mid-morning",
    bestTimeForReflection: "evening",
    avoidNote: "Cold starts — winter bodies benefit from warmth before effort.",
  },
};

// ═══════════════════════════════════════════════════════════════════════════════
// DETERMINISTIC SELECTOR
// ═══════════════════════════════════════════════════════════════════════════════

function deterministicIndex(seed, total) {
  if (total <= 0) return 0;
  const today = new Date().toISOString().slice(0, 10);
  const hash = (today + seed)
    .split("")
    .reduce((acc, ch) => acc + ch.charCodeAt(0), 0);
  return hash % total;
}

// ═══════════════════════════════════════════════════════════════════════════════
// PUBLIC API
// ═══════════════════════════════════════════════════════════════════════════════

/**
 * Detect the current season.
 * Returns one of SEASONS.* (including MONSOON).
 */
// Already exported above as detectSeason()

/**
 * Get the full configuration object for the current (or given) season.
 * @param {string} [season] — optional override; defaults to detectSeason()
 */
export function getSeasonConfig(season = null) {
  const s = season ?? detectSeason();
  return SEASON_CONFIGS[s] ?? SEASON_CONFIGS[SEASONS.SPRING];
}

/**
 * Get the recommendations object for the current (or given) season.
 * @param {string} [season]
 */
export function getSeasonRecommendations(season = null) {
  const s = season ?? detectSeason();
  return SEASON_RECOMMENDATIONS[s] ?? SEASON_RECOMMENDATIONS[SEASONS.SPRING];
}

/**
 * Get one deterministic microcopy line for today.
 * Same date always returns the same line for the same season.
 * @param {string} [season]
 */
export function getSeasonMicrocopy(season = null) {
  const s = season ?? detectSeason();
  const pool = SEASON_MICROCOPY[s] ?? SEASON_MICROCOPY[SEASONS.SPRING];
  return pool[deterministicIndex(`microcopy-${s}`, pool.length)];
}

/**
 * Get up to N deterministic microcopy lines for today.
 * Each line is different (uses offset indices).
 * @param {number} count — how many lines to return (default 3)
 * @param {string} [season]
 */
export function getSeasonMicrocopyLines(count = 3, season = null) {
  const s = season ?? detectSeason();
  const pool = SEASON_MICROCOPY[s] ?? SEASON_MICROCOPY[SEASONS.SPRING];
  const today = new Date().toISOString().slice(0, 10);
  const base = today.split("").reduce((acc, ch) => acc + ch.charCodeAt(0), 0);

  const lines = [];
  const used = new Set();
  for (let offset = 0; lines.length < count && offset < pool.length; offset++) {
    const idx = (base + offset * 11) % pool.length;
    if (!used.has(idx)) {
      used.add(idx);
      lines.push(pool[idx]);
    }
  }
  return lines;
}

/**
 * Get the season label for UI display.
 * @param {string} [season]
 */
export function getSeasonLabel(season = null) {
  const s = season ?? detectSeason();
  return SEASON_CONFIGS[s]?.name ?? "Spring";
}

/**
 * Get the season emoji for UI display.
 * @param {string} [season]
 */
export function getSeasonEmoji(season = null) {
  const s = season ?? detectSeason();
  return SEASON_CONFIGS[s]?.emoji ?? "🌸";
}

/**
 * Get the recommended nature sound ID for the current season.
 * Maps to an existing sound ID in src/data/calmSounds.js.
 * @param {string} [season]
 */
export function getSeasonRecommendedSoundId(season = null) {
  const s = season ?? detectSeason();
  return SEASON_CONFIGS[s]?.recommendedSoundId ?? "stream";
}

/**
 * Whether the season emphasises extra hydration attention.
 * @param {string} [season]
 */
export function isHydrationSeason(season = null) {
  const s = season ?? detectSeason();
  return SEASON_CONFIGS[s]?.hydrationEmphasis ?? false;
}

/**
 * Comprehensive seasonal context bundle — one call for all consumers.
 * Equivalent to calling getSeasonConfig + getSeasonRecommendations +
 * getSeasonMicrocopy together.
 * @param {string} [season]
 */
export function getFullSeasonContext(season = null) {
  const s = season ?? detectSeason();
  const config = getSeasonConfig(s);
  const recommendations = getSeasonRecommendations(s);
  const microcopy = getSeasonMicrocopy(s);
  const microcopyLines = getSeasonMicrocopyLines(3, s);

  return {
    season: s,
    label: config.name,
    emoji: config.emoji,
    description: config.description,
    config,
    recommendations,
    microcopy, // single line for today
    microcopyLines, // 3 lines for today (distinct)
  };
}
