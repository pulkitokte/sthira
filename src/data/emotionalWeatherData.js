// src/data/emotionalWeatherData.js
// Weather types, reflections, and constants for the Emotional Weather feature.
// Poetic, non-clinical, emotionally safe language throughout.

export const WEATHER_TYPES = [
  {
    id: "sunny",
    label: "Sunny",
    emoji: "☀️",
    description: "Warm and open.",
    gradient:
      "linear-gradient(160deg, rgba(255,210,100,0.15) 0%, rgba(255,180,60,0.1) 100%)",
    accentColor: "rgba(220,160,40,0.7)",
    bgColor: "rgba(255,210,100,0.1)",
    borderColor: "rgba(220,160,40,0.25)",
    textColor: "#7a5a10",
  },
  {
    id: "cloudy",
    label: "Cloudy",
    emoji: "☁️",
    description: "Overcast, a little muted.",
    gradient:
      "linear-gradient(160deg, rgba(180,185,200,0.15) 0%, rgba(160,165,180,0.12) 100%)",
    accentColor: "rgba(140,148,170,0.6)",
    bgColor: "rgba(180,185,200,0.1)",
    borderColor: "rgba(140,148,170,0.25)",
    textColor: "#4a5060",
  },
  {
    id: "rainy",
    label: "Rainy",
    emoji: "🌧️",
    description: "Something is falling through.",
    gradient:
      "linear-gradient(160deg, rgba(100,130,180,0.15) 0%, rgba(80,110,160,0.12) 100%)",
    accentColor: "rgba(80,120,170,0.6)",
    bgColor: "rgba(100,130,180,0.1)",
    borderColor: "rgba(80,120,170,0.25)",
    textColor: "#2a4a70",
  },
  {
    id: "stormy",
    label: "Stormy",
    emoji: "⛈️",
    description: "Intense and unsettled.",
    gradient:
      "linear-gradient(160deg, rgba(80,70,120,0.18) 0%, rgba(60,55,100,0.15) 100%)",
    accentColor: "rgba(90,80,140,0.6)",
    bgColor: "rgba(80,70,120,0.1)",
    borderColor: "rgba(90,80,140,0.25)",
    textColor: "#3a2a60",
  },
  {
    id: "foggy",
    label: "Foggy",
    emoji: "🌫️",
    description: "Unclear, hard to see ahead.",
    gradient:
      "linear-gradient(160deg, rgba(190,185,175,0.15) 0%, rgba(170,165,158,0.12) 100%)",
    accentColor: "rgba(160,155,148,0.55)",
    bgColor: "rgba(190,185,175,0.1)",
    borderColor: "rgba(160,155,148,0.25)",
    textColor: "#5a5550",
  },
  {
    id: "breezy",
    label: "Breezy",
    emoji: "🍃",
    description: "Light and moving.",
    gradient:
      "linear-gradient(160deg, rgba(134,159,138,0.15) 0%, rgba(110,145,115,0.12) 100%)",
    accentColor: "rgba(110,150,115,0.6)",
    bgColor: "rgba(134,159,138,0.1)",
    borderColor: "rgba(110,150,115,0.25)",
    textColor: "#2a5a30",
  },
  {
    id: "clear-night",
    label: "Clear Night",
    emoji: "🌙",
    description: "Still and quietly awake.",
    gradient:
      "linear-gradient(160deg, rgba(70,75,130,0.18) 0%, rgba(50,55,110,0.15) 100%)",
    accentColor: "rgba(100,108,175,0.6)",
    bgColor: "rgba(70,75,130,0.12)",
    borderColor: "rgba(100,108,175,0.25)",
    textColor: "#2a2a60",
  },
];

/**
 * Get a weather type by id.
 */
export function getWeatherById(id) {
  return WEATHER_TYPES.find((w) => w.id === id) ?? WEATHER_TYPES[0];
}

// ── Gentle reflection rules ───────────────────────────────────────────────────
// Deterministic. Non-diagnostic. Purely poetic observation.
// Rules are evaluated in order; first match wins.

export const REFLECTION_RULES = [
  {
    id: "all-stormy",
    test: (recent) => recent.every((w) => w === "stormy"),
    message:
      "Storms are among the most powerful things in nature. They also always pass.",
  },
  {
    id: "mostly-stormy",
    test: (recent) =>
      recent.filter((w) => w === "stormy").length >= recent.length * 0.5,
    message:
      "It has been an intense stretch. The weather inside needs just as much attention as the weather outside.",
  },
  {
    id: "all-sunny",
    test: (recent) => recent.every((w) => w === "sunny"),
    message:
      "A long stretch of sun. Notice what is making this possible — it is worth remembering.",
  },
  {
    id: "clearing",
    test: (recent) => {
      if (recent.length < 3) return false;
      const heavy = ["stormy", "rainy", "foggy"];
      const wasHeavy = heavy.includes(recent[recent.length - 1]);
      const isLighter = !heavy.includes(recent[0]);
      return wasHeavy && isLighter;
    },
    message:
      "Something seems to be lifting. The sky has been opening up recently.",
  },
  {
    id: "getting-heavier",
    test: (recent) => {
      if (recent.length < 3) return false;
      const heavy = ["stormy", "rainy", "foggy"];
      const wasLight = !heavy.includes(recent[recent.length - 1]);
      const isHeavy = heavy.includes(recent[0]);
      return wasLight && isHeavy;
    },
    message:
      "Your recent skies have grown heavier. That is worth sitting with — and worth being gentle about.",
  },
  {
    id: "varied",
    test: (recent) => new Set(recent).size >= Math.min(4, recent.length),
    message:
      "You have experienced many changing skies recently. That is simply what weather does.",
  },
  {
    id: "rainy-or-foggy",
    test: (recent) =>
      recent.filter((w) => w === "rainy" || w === "foggy").length >=
      recent.length * 0.5,
    message:
      "Clouds and uncertainty ask us to slow down. They are not permanent, even when they feel that way.",
  },
  {
    id: "mostly-breezy-sunny",
    test: (recent) =>
      recent.filter((w) => w === "breezy" || w === "sunny").length >=
      recent.length * 0.6,
    message:
      "There has been a lightness to your recent days. That is a good thing to notice.",
  },
  {
    id: "clear-night-heavy",
    test: (recent) =>
      recent.includes("clear-night") && recent.includes("stormy"),
    message:
      "Quiet nights and difficult days can coexist. Stillness after a storm is its own kind of rest.",
  },
  {
    id: "default",
    test: () => true,
    message:
      "Every kind of weather has its place. Observing what passes through you is itself a form of care.",
  },
];

/**
 * Get a reflection message for a list of recent weather IDs.
 */
export function getReflectionForWeather(recentWeatherIds) {
  if (!recentWeatherIds || recentWeatherIds.length === 0) return null;
  const rule = REFLECTION_RULES.find((r) => r.test(recentWeatherIds));
  return rule
    ? rule.message
    : REFLECTION_RULES[REFLECTION_RULES.length - 1].message;
}
