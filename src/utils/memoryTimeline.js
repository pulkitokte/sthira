// src/utils/memoryTimeline.js
// Reads existing app data to build the Memory Timeline.
// Does NOT write to any existing storage keys.
// Derives all timeline entries from read-only access to existing localStorage.

// ── Memory types ─────────────────────────────────────────────────────────────

export const MEMORY_TYPES = {
  GRATITUDE: "gratitude",
  LETTER: "letter",
  WEATHER: "weather",
  MOOD: "mood",
  REFLECTION: "reflection",
  WELLNESS: "wellness",
};

export const MEMORY_TYPE_LABELS = {
  [MEMORY_TYPES.GRATITUDE]: "Gratitude",
  [MEMORY_TYPES.LETTER]: "Letter to Self",
  [MEMORY_TYPES.WEATHER]: "Emotional Weather",
  [MEMORY_TYPES.MOOD]: "Mood Journal",
  [MEMORY_TYPES.REFLECTION]: "Evening Reflection",
  [MEMORY_TYPES.WELLNESS]: "Wellness Check-In",
};

export const MEMORY_TYPE_EMOJIS = {
  [MEMORY_TYPES.GRATITUDE]: "🌿",
  [MEMORY_TYPES.LETTER]: "✉️",
  [MEMORY_TYPES.WEATHER]: "🌤️",
  [MEMORY_TYPES.MOOD]: "🌙",
  [MEMORY_TYPES.REFLECTION]: "🌅",
  [MEMORY_TYPES.WELLNESS]: "🌱",
};

// ── Season detection ──────────────────────────────────────────────────────────

/**
 * Returns the season for a given month number (0–11).
 * Uses Northern Hemisphere seasons. Adjust for Southern if needed.
 */
export function getSeasonForMonth(month) {
  if (month >= 2 && month <= 4) return "spring";
  if (month >= 5 && month <= 7) return "summer";
  if (month >= 8 && month <= 10) return "autumn";
  return "winter";
}

export const SEASON_META = {
  spring: {
    label: "Spring",
    emoji: "🌱",
    color: "rgba(100,160,110,1)",
    bg: "rgba(100,160,110,0.08)",
    border: "rgba(100,160,110,0.2)",
  },
  summer: {
    label: "Summer",
    emoji: "☀️",
    color: "rgba(210,160,50,1)",
    bg: "rgba(210,160,50,0.08)",
    border: "rgba(210,160,50,0.2)",
  },
  autumn: {
    label: "Autumn",
    emoji: "🍂",
    color: "rgba(185,120,60,1)",
    bg: "rgba(185,120,60,0.08)",
    border: "rgba(185,120,60,0.2)",
  },
  winter: {
    label: "Winter",
    emoji: "❄️",
    color: "rgba(100,140,190,1)",
    bg: "rgba(100,140,190,0.08)",
    border: "rgba(100,140,190,0.2)",
  },
};

/**
 * Returns YYYY season label for display grouping, e.g. "Spring 2025".
 */
export function getSeasonLabel(dateKey) {
  const d = new Date(dateKey + "T12:00:00");
  const season = getSeasonForMonth(d.getMonth());
  return {
    season,
    year: d.getFullYear(),
    label: `${SEASON_META[season].label} ${d.getFullYear()}`,
  };
}

// ── Safe localStorage reader ──────────────────────────────────────────────────

function safeRead(key) {
  try {
    const raw = localStorage.getItem(key);
    return raw ? JSON.parse(raw) : null;
  } catch (_) {
    return null;
  }
}

// ── Entry builders (read-only) ────────────────────────────────────────────────

function buildGratitudeEntries() {
  const data = safeRead("sthira_gratitude_garden");
  if (!Array.isArray(data)) return [];
  return data.map((e) => ({
    id: `mem-grat-${e.id}`,
    sourceId: e.id,
    type: MEMORY_TYPES.GRATITUDE,
    date: e.date,
    timestamp: e.timestamp,
    title: "A moment of gratitude",
    preview: e.text?.slice(0, 120) ?? "",
    meta: { category: e.category },
  }));
}

function buildLetterEntries() {
  const data = safeRead("sthira_letters");
  if (!Array.isArray(data)) return [];
  return data.map((e) => ({
    id: `mem-letter-${e.id}`,
    sourceId: e.id,
    type: MEMORY_TYPES.LETTER,
    date: e.createdAt?.slice(0, 10) ?? e.date,
    timestamp: e.createdAt,
    title: e.title ?? "A letter to myself",
    preview: e.body?.slice(0, 120) ?? "",
    meta: { mood: e.mood, deliveryType: e.deliveryType },
  }));
}

function buildWeatherEntries() {
  const data = safeRead("sthira_emotional_weather");
  if (!Array.isArray(data)) return [];
  return data.map((e) => ({
    id: `mem-weather-${e.id}`,
    sourceId: e.id,
    type: MEMORY_TYPES.WEATHER,
    date: e.date,
    timestamp: e.timestamp,
    title: `Feeling ${e.weather}`,
    preview: e.note?.trim()
      ? e.note.slice(0, 120)
      : `The weather inside was ${e.weather}.`,
    meta: { weatherId: e.weather },
  }));
}

function buildMoodEntries() {
  const data = safeRead("sthira_mood_journal");
  if (!Array.isArray(data)) return [];
  return data.map((e) => ({
    id: `mem-mood-${e.id}`,
    sourceId: e.id,
    type: MEMORY_TYPES.MOOD,
    date: e.date,
    timestamp: e.timestamp,
    title: `Mood: ${e.mood}`,
    preview: e.text?.slice(0, 120) ?? "",
    meta: { mood: e.mood },
  }));
}

function buildReflectionEntries() {
  const data = safeRead("sthira_evening_reflections");
  if (!Array.isArray(data)) return [];
  return data.map((e) => ({
    id: `mem-refl-${e.id}`,
    sourceId: e.id,
    type: MEMORY_TYPES.REFLECTION,
    date: e.date,
    timestamp: e.timestamp,
    title: "Evening reflection",
    preview: (e.wentWell || e.difficult || e.tomorrowIntention || "").slice(
      0,
      120,
    ),
    meta: {
      mood: e.mood,
      wentWell: e.wentWell,
      difficult: e.difficult,
      intention: e.tomorrowIntention,
    },
  }));
}

function buildWellnessEntries() {
  // Read from the wellness context storage (sthira_wellness or similar)
  // Try common key patterns used by the wellness context
  const data =
    safeRead("sthira_wellness_data") ?? safeRead("sthira_wellness") ?? null;

  if (!data) return [];

  // Handle array or object with entries property
  const entries = Array.isArray(data)
    ? data
    : Array.isArray(data?.entries)
      ? data.entries
      : [];

  return entries
    .filter((e) => e && e.date)
    .map((e) => ({
      id: `mem-well-${e.date}-${e.timestamp ?? "0"}`,
      sourceId: `well-${e.date}`,
      type: MEMORY_TYPES.WELLNESS,
      date: e.date,
      timestamp: e.timestamp ?? e.date + "T12:00:00.000Z",
      title: "Wellness check-in",
      preview: buildWellnessPreview(e),
      meta: {
        energy: e.energy,
        focus: e.focus,
        stress: e.stress,
        mood: e.mood,
      },
    }));
}

function buildWellnessPreview(e) {
  const parts = [];
  if (e.energy) parts.push(`Energy ${e.energy}/5`);
  if (e.focus) parts.push(`Focus ${e.focus}/5`);
  if (e.stress) parts.push(`Stress ${e.stress}/5`);
  if (e.mood) parts.push(`Mood ${e.mood}/5`);
  return parts.join(" · ") || "Checked in today.";
}

// ── Main timeline builder ─────────────────────────────────────────────────────

/**
 * Build the full memory timeline from all available data sources.
 * Sorted newest first. Deduplicates by id.
 */
export function buildMemoryTimeline() {
  const all = [
    ...buildGratitudeEntries(),
    ...buildLetterEntries(),
    ...buildWeatherEntries(),
    ...buildMoodEntries(),
    ...buildReflectionEntries(),
    ...buildWellnessEntries(),
  ];

  // Sort newest first
  all.sort((a, b) => {
    const ta = a.timestamp ? new Date(a.timestamp).getTime() : 0;
    const tb = b.timestamp ? new Date(b.timestamp).getTime() : 0;
    return tb - ta;
  });

  // Deduplicate by id
  const seen = new Set();
  return all.filter((e) => {
    if (seen.has(e.id)) return false;
    seen.add(e.id);
    return true;
  });
}

/**
 * Group a timeline array by season+year.
 * Returns [{ seasonKey, label, season, year, entries[] }] newest first.
 */
export function groupBySeasons(entries) {
  const map = new Map();
  for (const entry of entries) {
    const { season, year, label } = getSeasonLabel(entry.date);
    const key = `${season}-${year}`;
    if (!map.has(key)) {
      map.set(key, { seasonKey: key, label, season, year, entries: [] });
    }
    map.get(key).entries.push(entry);
  }
  // Sort groups newest first
  return Array.from(map.values()).sort((a, b) => {
    if (b.year !== a.year) return b.year - a.year;
    const order = { winter: 4, autumn: 3, summer: 2, spring: 1 };
    return (order[b.season] ?? 0) - (order[a.season] ?? 0);
  });
}

/**
 * Filter entries by type. Passes all if type is "all".
 */
export function filterByType(entries, type) {
  if (!type || type === "all") return entries;
  return entries.filter((e) => e.type === type);
}

/**
 * Find an older memory (at least 14 days ago) to surface in "On this journey".
 * Returns a random entry from eligible ones, or null.
 */
export function findOlderMemory(entries) {
  const cutoff = new Date();
  cutoff.setDate(cutoff.getDate() - 14);
  const eligible = entries.filter((e) => new Date(e.timestamp) < cutoff);
  if (eligible.length === 0) return null;
  return eligible[Math.floor(Math.random() * eligible.length)];
}

/**
 * Format a date key for display.
 */
export function formatMemoryDate(dateKey) {
  const today = new Date().toISOString().slice(0, 10);
  const yesterday = new Date(Date.now() - 86400000).toISOString().slice(0, 10);
  if (dateKey === today) return "Today";
  if (dateKey === yesterday) return "Yesterday";
  const d = new Date(dateKey + "T12:00:00");
  return d.toLocaleDateString("en-IN", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

/**
 * Format a relative time label like "2 months ago", "3 weeks ago".
 */
export function formatRelativeTime(timestamp) {
  const now = Date.now();
  const then = new Date(timestamp).getTime();
  const days = Math.floor((now - then) / 86400000);
  if (days < 1) return "today";
  if (days === 1) return "yesterday";
  if (days < 7) return `${days} days ago`;
  if (days < 30)
    return `${Math.floor(days / 7)} week${Math.floor(days / 7) > 1 ? "s" : ""} ago`;
  if (days < 365)
    return `${Math.floor(days / 30)} month${Math.floor(days / 30) > 1 ? "s" : ""} ago`;
  return `${Math.floor(days / 365)} year${Math.floor(days / 365) > 1 ? "s" : ""} ago`;
}

// ── Persistence for filter preference ────────────────────────────────────────

const FILTER_KEY = "sthira_memory_filter";

export function loadFilterPreference() {
  try {
    return localStorage.getItem(FILTER_KEY) ?? "all";
  } catch (_) {
    return "all";
  }
}

export function saveFilterPreference(type) {
  try {
    localStorage.setItem(FILTER_KEY, type);
  } catch (_) {}
}
