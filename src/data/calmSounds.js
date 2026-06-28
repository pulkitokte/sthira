// src/data/calmSounds.js
// Ambient sound definitions for the Calm Sounds Sanctuary.
// Audio source paths are placeholders — replace with real mp3 files when available.
// Architecture supports future streaming, favorites, and custom sounds.

export const CALM_SOUNDS = [
  {
    id: "rain",
    title: "Rain",
    subtitle: "Soft rainfall on a quiet evening.",
    emoji: "🌧️",
    description:
      "Gentle rain against glass. The kind that asks you to slow down and stay inside for a while.",
    gradient:
      "linear-gradient(160deg, rgba(100,130,180,0.14) 0%, rgba(80,110,160,0.1) 100%)",
    cardBorder: "rgba(100,130,180,0.22)",
    playerBg:
      "linear-gradient(180deg, rgba(100,130,180,0.1) 0%, rgba(80,100,140,0.06) 100%)",
    accentColor: "rgba(100,130,180,0.6)",
    textColor: "#2a4a70",
    src: "/sounds/rain.mp3",
    durationLabel: "Infinite",
  },
  {
    id: "forest",
    title: "Forest",
    subtitle: "Leaves, birdsong, and the hush of trees.",
    emoji: "🌲",
    description:
      "The layered sounds of a living forest — wind moving through canopy, distant birdsong, the creak of branches.",
    gradient:
      "linear-gradient(160deg, rgba(80,130,90,0.14) 0%, rgba(100,140,80,0.1) 100%)",
    cardBorder: "rgba(80,130,90,0.22)",
    playerBg:
      "linear-gradient(180deg, rgba(80,130,90,0.1) 0%, rgba(60,110,70,0.06) 100%)",
    accentColor: "rgba(80,140,90,0.6)",
    textColor: "#1a4a20",
    src: "/sounds/forest.mp3",
    durationLabel: "Infinite",
  },
  {
    id: "ocean",
    title: "Ocean Waves",
    subtitle: "Waves arriving and retreating from the shore.",
    emoji: "🌊",
    description:
      "The slow, rhythmic breathing of the sea. Waves arrive, pause, and draw back — again and again without end.",
    gradient:
      "linear-gradient(160deg, rgba(60,130,160,0.14) 0%, rgba(40,110,150,0.1) 100%)",
    cardBorder: "rgba(60,130,160,0.22)",
    playerBg:
      "linear-gradient(180deg, rgba(60,130,160,0.1) 0%, rgba(40,100,140,0.06) 100%)",
    accentColor: "rgba(60,140,170,0.6)",
    textColor: "#1a4a60",
    src: "/sounds/ocean.mp3",
    durationLabel: "Infinite",
  },
  {
    id: "fireplace",
    title: "Fireplace",
    subtitle: "The warm crackle of a quiet fire.",
    emoji: "🔥",
    description:
      "A wood fire settling into itself — the occasional pop, the steady low roar, the warmth you can almost feel.",
    gradient:
      "linear-gradient(160deg, rgba(200,130,70,0.14) 0%, rgba(180,100,50,0.1) 100%)",
    cardBorder: "rgba(200,130,70,0.22)",
    playerBg:
      "linear-gradient(180deg, rgba(200,130,70,0.1) 0%, rgba(170,100,50,0.06) 100%)",
    accentColor: "rgba(210,130,60,0.6)",
    textColor: "#6a3010",
    src: "/sounds/fireplace.mp3",
    durationLabel: "Infinite",
  },
  {
    id: "night-crickets",
    title: "Night Crickets",
    subtitle: "The pulse of a warm summer night.",
    emoji: "🌙",
    description:
      "Crickets filling the dark with a steady, patient rhythm. A sound that has accompanied sleep for as long as there have been nights.",
    gradient:
      "linear-gradient(160deg, rgba(60,60,100,0.16) 0%, rgba(40,40,90,0.12) 100%)",
    cardBorder: "rgba(80,80,130,0.22)",
    playerBg:
      "linear-gradient(180deg, rgba(60,60,110,0.12) 0%, rgba(40,40,90,0.07) 100%)",
    accentColor: "rgba(100,100,170,0.6)",
    textColor: "#2a2a60",
    src: "/sounds/night-crickets.mp3",
    durationLabel: "Infinite",
  },
  {
    id: "wind-trees",
    title: "Wind Through Trees",
    subtitle: "A slow, unhurried breeze through branches.",
    emoji: "🍃",
    description:
      "The sound of wind moving through a canopy of leaves — rising and falling, never quite the same twice.",
    gradient:
      "linear-gradient(160deg, rgba(134,159,138,0.14) 0%, rgba(110,145,115,0.1) 100%)",
    cardBorder: "rgba(134,159,138,0.22)",
    playerBg:
      "linear-gradient(180deg, rgba(134,159,138,0.1) 0%, rgba(100,135,105,0.06) 100%)",
    accentColor: "rgba(110,155,115,0.6)",
    textColor: "#1a4a25",
    src: "/sounds/wind-trees.mp3",
    durationLabel: "Infinite",
  },
  {
    id: "cafe",
    title: "Soft Café",
    subtitle: "Gentle murmur of a quiet coffee shop.",
    emoji: "☕",
    description:
      "The low hum of a café — distant conversation, the occasional clink of cups, soft background warmth.",
    gradient:
      "linear-gradient(160deg, rgba(185,155,110,0.14) 0%, rgba(165,135,90,0.1) 100%)",
    cardBorder: "rgba(185,155,110,0.22)",
    playerBg:
      "linear-gradient(180deg, rgba(185,155,110,0.1) 0%, rgba(155,125,80,0.06) 100%)",
    accentColor: "rgba(190,155,100,0.6)",
    textColor: "#5a3a10",
    src: "/sounds/cafe.mp3",
    durationLabel: "Infinite",
  },
  {
    id: "stream",
    title: "Gentle Stream",
    subtitle: "Water finding its way over stones.",
    emoji: "💧",
    description:
      "A small stream moving through a quiet place — clear water over rocks, steady and unhurried.",
    gradient:
      "linear-gradient(160deg, rgba(80,160,180,0.13) 0%, rgba(60,140,165,0.09) 100%)",
    cardBorder: "rgba(80,160,180,0.2)",
    playerBg:
      "linear-gradient(180deg, rgba(80,160,180,0.1) 0%, rgba(55,130,155,0.06) 100%)",
    accentColor: "rgba(80,165,185,0.6)",
    textColor: "#1a5060",
    src: "/sounds/stream.mp3",
    durationLabel: "Infinite",
  },
];

/**
 * Get a sound definition by id.
 */
export function getSoundById(id) {
  return CALM_SOUNDS.find((s) => s.id === id) ?? null;
}

/**
 * Sleep timer options in seconds.
 */
export const SLEEP_TIMER_OPTIONS = [
  { label: "5 min", seconds: 5 * 60 },
  { label: "10 min", seconds: 10 * 60 },
  { label: "15 min", seconds: 15 * 60 },
  { label: "30 min", seconds: 30 * 60 },
  { label: "45 min", seconds: 45 * 60 },
  { label: "60 min", seconds: 60 * 60 },
];
