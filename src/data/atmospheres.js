// src/data/atmospheres.js
// Handcrafted atmosphere presets for Sthira.
// Each preset is keyed by phase-season (e.g. "morning-spring").
// Colours are purposely muted and warm — never vivid or energetic.

// ── Time phases ───────────────────────────────────────────────────────────────

export const TIME_PHASES = {
  EARLY_MORNING: "early-morning", // 04:00–06:59
  MORNING: "morning", // 07:00–11:59
  AFTERNOON: "afternoon", // 12:00–16:59
  EVENING: "evening", // 17:00–20:59
  LATE_EVENING: "late-evening", // 21:00–22:59
  NIGHT: "night", // 23:00–03:59
};

export const TIME_PHASE_LABELS = {
  [TIME_PHASES.EARLY_MORNING]: "Early Morning",
  [TIME_PHASES.MORNING]: "Morning",
  [TIME_PHASES.AFTERNOON]: "Afternoon",
  [TIME_PHASES.EVENING]: "Evening",
  [TIME_PHASES.LATE_EVENING]: "Late Evening",
  [TIME_PHASES.NIGHT]: "Night",
};

// ── Seasons ───────────────────────────────────────────────────────────────────

export const SEASONS = {
  SPRING: "spring",
  SUMMER: "summer",
  AUTUMN: "autumn",
  WINTER: "winter",
};

export const SEASON_LABELS = {
  [SEASONS.SPRING]: "Spring",
  [SEASONS.SUMMER]: "Summer",
  [SEASONS.AUTUMN]: "Autumn",
  [SEASONS.WINTER]: "Winter",
};

export const SEASON_EMOJIS = {
  [SEASONS.SPRING]: "🌱",
  [SEASONS.SUMMER]: "☀️",
  [SEASONS.AUTUMN]: "🍂",
  [SEASONS.WINTER]: "❄️",
};

// ── Preset map ────────────────────────────────────────────────────────────────
// Keys: "${phase}-${season}"
// gradient: CSS gradient for the banner background
// accentColor: subtle tint for borders, text accents
// orbColor: colour for the ambient orb (always very low opacity)
// pillBg: background for the phase/season pill labels

export const ATMOSPHERE_PRESETS = {
  // ── Early Morning ─────────────────────────────────────────────────────────
  "early-morning-spring": {
    gradient:
      "linear-gradient(160deg, rgba(200,215,200,0.18) 0%, rgba(215,220,195,0.12) 100%)",
    accentColor: "rgba(130,160,130,0.6)",
    orbColor: "rgba(160,200,155,0.06)",
    pillBg: "rgba(130,160,130,0.1)",
    pillBorder: "rgba(130,160,130,0.22)",
  },
  "early-morning-summer": {
    gradient:
      "linear-gradient(160deg, rgba(220,210,185,0.16) 0%, rgba(210,200,170,0.1) 100%)",
    accentColor: "rgba(185,160,100,0.55)",
    orbColor: "rgba(220,200,150,0.06)",
    pillBg: "rgba(185,160,100,0.1)",
    pillBorder: "rgba(185,160,100,0.22)",
  },
  "early-morning-autumn": {
    gradient:
      "linear-gradient(160deg, rgba(210,195,175,0.18) 0%, rgba(200,185,165,0.12) 100%)",
    accentColor: "rgba(175,130,90,0.55)",
    orbColor: "rgba(200,165,120,0.06)",
    pillBg: "rgba(175,130,90,0.1)",
    pillBorder: "rgba(175,130,90,0.22)",
  },
  "early-morning-winter": {
    gradient:
      "linear-gradient(160deg, rgba(195,205,220,0.18) 0%, rgba(185,195,215,0.12) 100%)",
    accentColor: "rgba(110,135,175,0.55)",
    orbColor: "rgba(160,185,215,0.06)",
    pillBg: "rgba(110,135,175,0.1)",
    pillBorder: "rgba(110,135,175,0.22)",
  },

  // ── Morning ───────────────────────────────────────────────────────────────
  "morning-spring": {
    gradient:
      "linear-gradient(160deg, rgba(195,220,195,0.18) 0%, rgba(210,225,185,0.11) 100%)",
    accentColor: "rgba(110,165,110,0.6)",
    orbColor: "rgba(140,195,135,0.07)",
    pillBg: "rgba(110,165,110,0.1)",
    pillBorder: "rgba(110,165,110,0.25)",
  },
  "morning-summer": {
    gradient:
      "linear-gradient(160deg, rgba(230,220,185,0.18) 0%, rgba(220,205,165,0.11) 100%)",
    accentColor: "rgba(195,160,80,0.6)",
    orbColor: "rgba(230,205,145,0.07)",
    pillBg: "rgba(195,160,80,0.1)",
    pillBorder: "rgba(195,160,80,0.25)",
  },
  "morning-autumn": {
    gradient:
      "linear-gradient(160deg, rgba(220,200,175,0.18) 0%, rgba(210,185,155,0.11) 100%)",
    accentColor: "rgba(185,130,75,0.6)",
    orbColor: "rgba(215,170,115,0.07)",
    pillBg: "rgba(185,130,75,0.1)",
    pillBorder: "rgba(185,130,75,0.25)",
  },
  "morning-winter": {
    gradient:
      "linear-gradient(160deg, rgba(200,210,230,0.18) 0%, rgba(185,200,225,0.11) 100%)",
    accentColor: "rgba(100,135,185,0.6)",
    orbColor: "rgba(155,185,220,0.07)",
    pillBg: "rgba(100,135,185,0.1)",
    pillBorder: "rgba(100,135,185,0.25)",
  },

  // ── Afternoon ─────────────────────────────────────────────────────────────
  "afternoon-spring": {
    gradient:
      "linear-gradient(160deg, rgba(185,215,185,0.16) 0%, rgba(200,220,175,0.1) 100%)",
    accentColor: "rgba(100,160,100,0.55)",
    orbColor: "rgba(130,185,125,0.06)",
    pillBg: "rgba(100,160,100,0.09)",
    pillBorder: "rgba(100,160,100,0.22)",
  },
  "afternoon-summer": {
    gradient:
      "linear-gradient(160deg, rgba(235,220,175,0.16) 0%, rgba(225,208,155,0.1) 100%)",
    accentColor: "rgba(200,160,70,0.55)",
    orbColor: "rgba(235,205,135,0.06)",
    pillBg: "rgba(200,160,70,0.09)",
    pillBorder: "rgba(200,160,70,0.22)",
  },
  "afternoon-autumn": {
    gradient:
      "linear-gradient(160deg, rgba(225,200,165,0.16) 0%, rgba(215,185,145,0.1) 100%)",
    accentColor: "rgba(190,125,65,0.55)",
    orbColor: "rgba(220,165,105,0.06)",
    pillBg: "rgba(190,125,65,0.09)",
    pillBorder: "rgba(190,125,65,0.22)",
  },
  "afternoon-winter": {
    gradient:
      "linear-gradient(160deg, rgba(195,208,228,0.16) 0%, rgba(180,198,222,0.1) 100%)",
    accentColor: "rgba(95,130,180,0.55)",
    orbColor: "rgba(148,178,215,0.06)",
    pillBg: "rgba(95,130,180,0.09)",
    pillBorder: "rgba(95,130,180,0.22)",
  },

  // ── Evening ───────────────────────────────────────────────────────────────
  "evening-spring": {
    gradient:
      "linear-gradient(160deg, rgba(195,195,215,0.18) 0%, rgba(205,190,200,0.12) 100%)",
    accentColor: "rgba(130,120,165,0.55)",
    orbColor: "rgba(175,165,205,0.07)",
    pillBg: "rgba(130,120,165,0.1)",
    pillBorder: "rgba(130,120,165,0.22)",
  },
  "evening-summer": {
    gradient:
      "linear-gradient(160deg, rgba(225,195,175,0.18) 0%, rgba(215,180,155,0.12) 100%)",
    accentColor: "rgba(190,130,90,0.6)",
    orbColor: "rgba(220,170,130,0.07)",
    pillBg: "rgba(190,130,90,0.1)",
    pillBorder: "rgba(190,130,90,0.25)",
  },
  "evening-autumn": {
    gradient:
      "linear-gradient(160deg, rgba(210,185,165,0.2) 0%, rgba(195,170,145,0.14) 100%)",
    accentColor: "rgba(180,120,70,0.6)",
    orbColor: "rgba(205,155,105,0.08)",
    pillBg: "rgba(180,120,70,0.1)",
    pillBorder: "rgba(180,120,70,0.25)",
  },
  "evening-winter": {
    gradient:
      "linear-gradient(160deg, rgba(170,180,205,0.2) 0%, rgba(155,168,198,0.14) 100%)",
    accentColor: "rgba(90,115,170,0.6)",
    orbColor: "rgba(140,165,205,0.08)",
    pillBg: "rgba(90,115,170,0.1)",
    pillBorder: "rgba(90,115,170,0.25)",
  },

  // ── Late Evening ──────────────────────────────────────────────────────────
  "late-evening-spring": {
    gradient:
      "linear-gradient(160deg, rgba(175,175,200,0.2) 0%, rgba(185,175,195,0.14) 100%)",
    accentColor: "rgba(110,105,150,0.55)",
    orbColor: "rgba(155,150,190,0.07)",
    pillBg: "rgba(110,105,150,0.1)",
    pillBorder: "rgba(110,105,150,0.22)",
  },
  "late-evening-summer": {
    gradient:
      "linear-gradient(160deg, rgba(205,180,165,0.2) 0%, rgba(195,165,145,0.14) 100%)",
    accentColor: "rgba(175,115,80,0.6)",
    orbColor: "rgba(200,150,115,0.07)",
    pillBg: "rgba(175,115,80,0.1)",
    pillBorder: "rgba(175,115,80,0.22)",
  },
  "late-evening-autumn": {
    gradient:
      "linear-gradient(160deg, rgba(195,170,150,0.22) 0%, rgba(180,155,130,0.16) 100%)",
    accentColor: "rgba(165,105,60,0.6)",
    orbColor: "rgba(190,140,95,0.08)",
    pillBg: "rgba(165,105,60,0.1)",
    pillBorder: "rgba(165,105,60,0.25)",
  },
  "late-evening-winter": {
    gradient:
      "linear-gradient(160deg, rgba(155,165,195,0.22) 0%, rgba(140,153,188,0.16) 100%)",
    accentColor: "rgba(80,105,160,0.6)",
    orbColor: "rgba(130,155,195,0.08)",
    pillBg: "rgba(80,105,160,0.1)",
    pillBorder: "rgba(80,105,160,0.25)",
  },

  // ── Night ─────────────────────────────────────────────────────────────────
  "night-spring": {
    gradient:
      "linear-gradient(160deg, rgba(155,155,185,0.22) 0%, rgba(165,155,180,0.15) 100%)",
    accentColor: "rgba(100,95,140,0.55)",
    orbColor: "rgba(140,135,175,0.07)",
    pillBg: "rgba(100,95,140,0.1)",
    pillBorder: "rgba(100,95,140,0.22)",
  },
  "night-summer": {
    gradient:
      "linear-gradient(160deg, rgba(175,155,140,0.22) 0%, rgba(165,140,120,0.15) 100%)",
    accentColor: "rgba(155,100,65,0.55)",
    orbColor: "rgba(175,135,100,0.07)",
    pillBg: "rgba(155,100,65,0.1)",
    pillBorder: "rgba(155,100,65,0.22)",
  },
  "night-autumn": {
    gradient:
      "linear-gradient(160deg, rgba(170,150,130,0.24) 0%, rgba(155,135,110,0.17) 100%)",
    accentColor: "rgba(145,95,50,0.55)",
    orbColor: "rgba(168,128,88,0.08)",
    pillBg: "rgba(145,95,50,0.1)",
    pillBorder: "rgba(145,95,50,0.22)",
  },
  "night-winter": {
    gradient:
      "linear-gradient(160deg, rgba(130,143,178,0.24) 0%, rgba(115,130,168,0.17) 100%)",
    accentColor: "rgba(70,95,150,0.6)",
    orbColor: "rgba(115,140,185,0.08)",
    pillBg: "rgba(70,95,150,0.1)",
    pillBorder: "rgba(70,95,150,0.25)",
  },
};

// ── Emotional weather tints ───────────────────────────────────────────────────
// Subtle overlay applied on top of the base preset.
// Only adjusts opacity of base gradient — never replaces it.

export const WEATHER_TINTS = {
  sunny: { saturationBoost: 0.08, warmthBoost: 0.06 },
  cloudy: { saturationBoost: -0.05, warmthBoost: -0.03 },
  rainy: { saturationBoost: -0.08, warmthBoost: -0.05 },
  stormy: { saturationBoost: -0.1, warmthBoost: -0.08 },
  foggy: { saturationBoost: -0.06, warmthBoost: -0.04 },
  breezy: { saturationBoost: 0.03, warmthBoost: 0.02 },
  "clear-night": { saturationBoost: -0.04, warmthBoost: -0.06 },
};

// ── Atmospheric feeling phrases (weather → feeling word) ─────────────────────
export const WEATHER_FEELING_PHRASES = {
  sunny: "Today feels warm and open.",
  cloudy: "Today feels muted and soft.",
  rainy: "Today feels reflective.",
  stormy: "Today feels deep and intense.",
  foggy: "Today feels unclear but quiet.",
  breezy: "Today feels light and moving.",
  "clear-night": "Today feels still and quietly awake.",
};

// ── 80 handcrafted atmospheric quotes ────────────────────────────────────────

export const ATMOSPHERIC_QUOTES = [
  "The day does not need to be hurried.",
  "There is still softness available here.",
  "Even quiet progress is progress.",
  "Morning light arrives without asking anything of you.",
  "Some days ask only that we begin gently.",
  "The evening is a good place to soften.",
  "Not every moment needs to be filled.",
  "The light changes slowly when you are not watching.",
  "Something in stillness restores what busyness takes.",
  "Rest is its own form of readiness.",
  "A quiet morning is a gift worth receiving.",
  "The season turns whether or not we are paying attention.",
  "Slowness is not falling behind.",
  "The day is still young and full of small possibilities.",
  "There is nowhere else you are supposed to be right now.",
  "Afternoon has its own kind of quiet.",
  "Something is always growing, even when it is not visible.",
  "The night is not empty — it is simply still.",
  "What if today was enough exactly as it is?",
  "Patience with yourself is a form of wisdom.",
  "Every morning is a new beginning, even for the same person.",
  "The light in late afternoon has a particular gentleness.",
  "Winter asks us to rest. That is not a small thing.",
  "Spring does not hurry. It arrives when it is ready.",
  "Summer holds more light than any single day needs.",
  "Autumn is a reminder that letting go is natural.",
  "The morning mist asks nothing of you.",
  "Some of the most important things happen very slowly.",
  "There is a particular quiet that belongs to early morning.",
  "You do not have to carry the whole day at once.",
  "The evening asks you to soften, not to stop.",
  "Something settles when you simply breathe.",
  "Even uncertain days have their own kind of beauty.",
  "Stillness is not absence. It is presence.",
  "The stars are patient. So can you be.",
  "A gentle beginning is still a beginning.",
  "Not every cloud is a storm.",
  "The rain asks nothing of you but shelter.",
  "What seems ordinary today may be what you miss most later.",
  "Small moments, attended to fully, are not small.",
  "The afternoon light will not last forever. That is what makes it beautiful.",
  "You are allowed to move through today at your own speed.",
  "The season changes and the world adjusts. So do you.",
  "There is something reliable about the return of morning.",
  "Night is not the end — it is the pause.",
  "Even the busiest days have a few seconds of quiet in them.",
  "The day has not decided yet what it will hold.",
  "Something in you knows how to rest. Trust it.",
  "The fog lifts. It always does.",
  "Autumn teaches that beauty and ending can coexist.",
  "Winter light is softer and worth noticing.",
  "Spring keeps its promises, just on its own timeline.",
  "The afternoon is a good time to simply continue.",
  "Late evening is for letting things be what they are.",
  "There is kindness in the fact that today will end.",
  "What you do not rush often turns out better.",
  "Morning is the world before it has been spoken to.",
  "The evening holds whatever the day could not.",
  "Something in the air is different today. Notice it.",
  "You are allowed to feel exactly the way you feel.",
  "The seasons are patient teachers.",
  "Even a small candle changes a room.",
  "Today does not need you to solve everything.",
  "The quiet between things is also full.",
  "A breath taken fully is a small act of care.",
  "There is always more time for gentleness than we think.",
  "The world is softer in the morning before everything wakes.",
  "Night sounds different when you are at peace.",
  "What if rest was the most productive thing right now?",
  "The year turns, and so do you — often without noticing.",
  "Spring arrives in pieces, not all at once.",
  "Summer evenings hold a particular kind of warmth.",
  "There is a moment in every day that asks to be noticed.",
  "Autumn gathers itself slowly before it lets go.",
  "The coldest days also have the clearest light.",
  "You do not have to understand a season to move through it.",
  "Whatever you are carrying, you can set it down for a moment.",
  "The day will find its shape. Give it time.",
  "Even a rainy morning has something worth sitting with.",
];
