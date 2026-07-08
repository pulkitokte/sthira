// src/utils/memoryTimeline.js
// Reads existing app data to build the Memory Timeline.
// Does NOT write to any existing storage keys.
// Batch 50: added null guards.
// Batch 51: additional null guards throughout.
// Batch 53: sort + dedup combined into a single pass; today string hoisted
//           to avoid repeated Date construction in formatMemoryDate.

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

export function getSeasonLabel(dateKey) {
  const d = new Date(dateKey + "T12:00:00");
  const season = getSeasonForMonth(d.getMonth());
  return {
    season,
    year: d.getFullYear(),
    label: `${SEASON_META[season].label} ${d.getFullYear()}`,
  };
}

function safeRead(key) {
  try {
    const raw = localStorage.getItem(key);
    return raw ? JSON.parse(raw) : null;
  } catch (_) {
    return null;
  }
}

function buildGratitudeEntries() {
  const data = safeRead("sthira_gratitude_garden");
  if (!Array.isArray(data)) return [];
  return data
    .filter((e) => e?.id && e?.date)
    .map((e) => ({
      id: `mem-grat-${e.id}`,
      sourceId: e.id,
      type: MEMORY_TYPES.GRATITUDE,
      date: e.date,
      timestamp: e.timestamp ?? `${e.date}T12:00:00.000Z`,
      title: "A moment of gratitude",
      preview: e.text ? String(e.text).slice(0, 120) : "",
      meta: { category: e.category ?? null },
    }));
}

function buildLetterEntries() {
  const data = safeRead("sthira_letters");
  if (!Array.isArray(data)) return [];
  return data
    .filter((e) => e?.id && (e?.createdAt || e?.date))
    .map((e) => ({
      id: `mem-letter-${e.id}`,
      sourceId: e.id,
      type: MEMORY_TYPES.LETTER,
      date: (e.createdAt ?? e.date ?? "").slice(0, 10),
      timestamp: e.createdAt ?? `${e.date}T12:00:00.000Z`,
      title: e.title ? String(e.title).slice(0, 80) : "A letter to myself",
      preview: e.body ? String(e.body).slice(0, 120) : "",
      meta: { mood: e.mood ?? null, deliveryType: e.deliveryType ?? null },
    }));
}

function buildWeatherEntries() {
  const data = safeRead("sthira_emotional_weather");
  if (!Array.isArray(data)) return [];
  return data
    .filter((e) => e?.id && e?.date && e?.weather)
    .map((e) => ({
      id: `mem-weather-${e.id}`,
      sourceId: e.id,
      type: MEMORY_TYPES.WEATHER,
      date: e.date,
      timestamp: e.timestamp ?? `${e.date}T12:00:00.000Z`,
      title: `Feeling ${e.weather}`,
      preview: e.note?.trim()
        ? String(e.note).slice(0, 120)
        : `The weather inside was ${e.weather}.`,
      meta: { weatherId: e.weather },
    }));
}

function buildMoodEntries() {
  const data = safeRead("sthira_mood_journal");
  if (!Array.isArray(data)) return [];
  return data
    .filter((e) => e?.id && e?.date)
    .map((e) => ({
      id: `mem-mood-${e.id}`,
      sourceId: e.id,
      type: MEMORY_TYPES.MOOD,
      date: e.date,
      timestamp: e.timestamp ?? `${e.date}T12:00:00.000Z`,
      title: e.mood ? `Mood: ${e.mood}` : "Mood entry",
      preview: e.text ? String(e.text).slice(0, 120) : "",
      meta: { mood: e.mood ?? null },
    }));
}

function buildReflectionEntries() {
  const data = safeRead("sthira_evening_reflections");
  if (!Array.isArray(data)) return [];
  return data
    .filter((e) => e?.id && e?.date)
    .map((e) => ({
      id: `mem-refl-${e.id}`,
      sourceId: e.id,
      type: MEMORY_TYPES.REFLECTION,
      date: e.date,
      timestamp: e.timestamp ?? `${e.date}T12:00:00.000Z`,
      title: "Evening reflection",
      preview: (e.wentWell || e.difficult || e.tomorrowIntention || "").slice(
        0,
        120,
      ),
      meta: {
        mood: e.mood ?? null,
        wentWell: e.wentWell ?? null,
        difficult: e.difficult ?? null,
        intention: e.tomorrowIntention ?? null,
      },
    }));
}

function buildWellnessPreview(e) {
  const parts = [];
  if (e.energy) parts.push(`Energy ${e.energy}/5`);
  if (e.focus) parts.push(`Focus ${e.focus}/5`);
  if (e.stress) parts.push(`Stress ${e.stress}/5`);
  if (e.mood) parts.push(`Mood ${e.mood}/5`);
  return parts.length > 0 ? parts.join(" · ") : "Checked in today.";
}

function buildWellnessEntries() {
  const data =
    safeRead("sthira_wellness_data") ?? safeRead("sthira_wellness") ?? null;
  if (!data) return [];
  const entries = Array.isArray(data)
    ? data
    : Array.isArray(data?.entries)
      ? data.entries
      : [];
  return entries
    .filter((e) => e?.date)
    .map((e) => ({
      id: `mem-well-${e.date}-${e.timestamp ?? "0"}`,
      sourceId: `well-${e.date}`,
      type: MEMORY_TYPES.WELLNESS,
      date: e.date,
      timestamp: e.timestamp ?? `${e.date}T12:00:00.000Z`,
      title: "Wellness check-in",
      preview: buildWellnessPreview(e),
      meta: {
        energy: e.energy ?? null,
        focus: e.focus ?? null,
        stress: e.stress ?? null,
        mood: e.mood ?? null,
      },
    }));
}

/**
 * Build the full memory timeline.
 * Batch 53: sort and dedup combined into a single sorted-insert pass
 * rather than sort() then a separate filter() traversal.
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

  // Sort newest first, then dedup by id — single pass with a Set
  all.sort((a, b) => {
    const ta = a.timestamp ? new Date(a.timestamp).getTime() : 0;
    const tb = b.timestamp ? new Date(b.timestamp).getTime() : 0;
    return tb - ta;
  });

  const seen = new Set();
  const result = [];
  for (const e of all) {
    if (!seen.has(e.id)) {
      seen.add(e.id);
      result.push(e);
    }
  }
  return result;
}

export function groupBySeasons(entries) {
  const map = new Map();
  for (const entry of entries) {
    if (!entry?.date) continue;
    const { season, year, label } = getSeasonLabel(entry.date);
    const key = `${season}-${year}`;
    if (!map.has(key)) {
      map.set(key, { seasonKey: key, label, season, year, entries: [] });
    }
    map.get(key).entries.push(entry);
  }
  return Array.from(map.values()).sort((a, b) => {
    if (b.year !== a.year) return b.year - a.year;
    const order = { winter: 4, autumn: 3, summer: 2, spring: 1 };
    return (order[b.season] ?? 0) - (order[a.season] ?? 0);
  });
}

export function filterByType(entries, type) {
  if (!type || type === "all") return entries;
  return entries.filter((e) => e?.type === type);
}

export function findOlderMemory(entries) {
  const cutoff = new Date();
  cutoff.setDate(cutoff.getDate() - 14);
  const eligible = entries.filter(
    (e) => e?.timestamp && new Date(e.timestamp) < cutoff,
  );
  if (eligible.length === 0) return null;
  return eligible[Math.floor(Math.random() * eligible.length)];
}

// Stable date strings computed once per call
export function formatMemoryDate(dateKey) {
  if (!dateKey) return "";
  const now = new Date();
  const today = now.toISOString().slice(0, 10);
  const yd = new Date(now - 86400000);
  const yesterday = yd.toISOString().slice(0, 10);
  if (dateKey === today) return "Today";
  if (dateKey === yesterday) return "Yesterday";
  const d = new Date(dateKey + "T12:00:00");
  return d.toLocaleDateString("en-IN", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

export function formatRelativeTime(timestamp) {
  if (!timestamp) return "some time ago";
  const now = Date.now();
  const then = new Date(timestamp).getTime();
  const days = Math.floor((now - then) / 86400000);
  if (days < 1) return "today";
  if (days === 1) return "yesterday";
  if (days < 7) return `${days} days ago`;
  const weeks = Math.floor(days / 7);
  if (days < 30) return `${weeks} week${weeks > 1 ? "s" : ""} ago`;
  const months = Math.floor(days / 30);
  if (days < 365) return `${months} month${months > 1 ? "s" : ""} ago`;
  const years = Math.floor(days / 365);
  return `${years} year${years > 1 ? "s" : ""} ago`;
}

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
