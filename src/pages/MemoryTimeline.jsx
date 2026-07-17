import { useState, useMemo, useCallback } from "react";
import { RefreshCw } from "lucide-react";
import { useDocumentTitle } from "../hooks/useDocumentTitle";
import FeatureHeader from "../components/layout/FeatureHeader";
import SeasonBadge from "../components/memory/SeasonBadge";
import MemoryCard from "../components/memory/MemoryCard";
import {
  buildMemoryTimeline,
  groupBySeasons,
  filterByType,
  findOlderMemory,
  formatRelativeTime,
  formatMemoryDate,
  loadFilterPreference,
  saveFilterPreference,
  MEMORY_TYPES,
  MEMORY_TYPE_EMOJIS,
} from "../utils/memoryTimeline";
import { REFLECTION_PROMPTS } from "../data/reflectionPrompts";

const FILTER_OPTIONS = [
  { id: "all", label: "All", emoji: "✨" },
  {
    id: MEMORY_TYPES.GRATITUDE,
    label: "Gratitude",
    emoji: MEMORY_TYPE_EMOJIS[MEMORY_TYPES.GRATITUDE],
  },
  {
    id: MEMORY_TYPES.LETTER,
    label: "Letters",
    emoji: MEMORY_TYPE_EMOJIS[MEMORY_TYPES.LETTER],
  },
  {
    id: MEMORY_TYPES.WEATHER,
    label: "Weather",
    emoji: MEMORY_TYPE_EMOJIS[MEMORY_TYPES.WEATHER],
  },
  {
    id: MEMORY_TYPES.MOOD,
    label: "Mood",
    emoji: MEMORY_TYPE_EMOJIS[MEMORY_TYPES.MOOD],
  },
  {
    id: MEMORY_TYPES.REFLECTION,
    label: "Reflections",
    emoji: MEMORY_TYPE_EMOJIS[MEMORY_TYPES.REFLECTION],
  },
];

function EmptyState() {
  return (
    <div className="flex flex-col items-center justify-center text-center py-16 gap-5 px-6">
      <div
        className="w-16 h-16 rounded-full flex items-center justify-center"
        style={{
          background: "rgba(185,175,160,0.1)",
          border: "1.5px solid rgba(185,175,160,0.25)",
        }}
      >
        <span className="text-2xl">📖</span>
      </div>
      <div className="space-y-2 max-w-xs">
        <p className="font-display text-base font-light text-ink">
          Your timeline is waiting.
        </p>
        <p className="text-sm text-stone font-light leading-relaxed">
          As you use Sthira — journalling, reflecting, logging gratitude — your
          moments will begin to collect here.
        </p>
      </div>
    </div>
  );
}

function FilterEmptyState({ onClear }) {
  return (
    <div className="flex flex-col items-center justify-center text-center py-12 gap-4 px-6">
      <p className="font-display text-base font-light text-ink">
        No entries of this type yet.
      </p>
      <button
        onClick={onClear}
        className="text-sm text-stone font-light hover:text-ink transition-colors min-h-[44px]"
      >
        Show all memories
      </button>
    </div>
  );
}

function OlderMemoryCard({ entry }) {
  const emoji = MEMORY_TYPE_EMOJIS[entry.type] ?? "📝";
  const relTime = formatRelativeTime(entry.timestamp);

  return (
    <div
      className="rounded-3xl p-6 space-y-4"
      style={{
        background:
          "linear-gradient(160deg, rgba(255,252,248,1) 0%, rgba(248,244,238,1) 100%)",
        border: "1px solid rgba(185,175,160,0.28)",
        boxShadow: "0 2px 12px rgba(0,0,0,0.04)",
      }}
    >
      <div className="space-y-1">
        <p className="font-display text-xs font-semibold uppercase tracking-[0.14em] text-stone opacity-60">
          On this journey
        </p>
        <p className="text-xs text-stone font-light opacity-60">
          {relTime}, you{" "}
          {entry.type === MEMORY_TYPES.LETTER ? "wrote" : "noted"}…
        </p>
      </div>

      <div className="flex items-start gap-3">
        <span className="text-xl leading-none mt-0.5 shrink-0">{emoji}</span>
        <div className="flex-1 space-y-1.5">
          <p className="font-display text-sm font-medium text-ink leading-snug">
            {entry.title}
          </p>
          {entry.preview && entry.preview.trim() && (
            <p className="text-sm text-stone font-light leading-relaxed line-clamp-3">
              {entry.preview}
            </p>
          )}
          <p className="text-xs text-stone font-light opacity-50">
            {formatMemoryDate(entry.date)}
          </p>
        </div>
      </div>
    </div>
  );
}

function ReflectionPromptCard({ prompt, onRefresh }) {
  return (
    <div
      className="rounded-3xl p-6 space-y-4"
      style={{
        background:
          "linear-gradient(160deg, rgba(134,159,138,0.07) 0%, rgba(185,175,160,0.07) 100%)",
        border: "1px solid rgba(134,159,138,0.18)",
      }}
    >
      <p className="font-display text-xs font-semibold uppercase tracking-[0.14em] text-stone opacity-70">
        A gentle question
      </p>
      <p
        className="font-display font-light text-ink leading-[1.75]"
        style={{ fontSize: "1rem" }}
      >
        {prompt}
      </p>
      <button
        onClick={onRefresh}
        className="flex items-center gap-1.5 text-xs text-stone font-light hover:text-ink transition-colors min-h-[36px]"
        aria-label="Show another question"
      >
        <RefreshCw size={11} strokeWidth={1.5} />
        Another question
      </button>
    </div>
  );
}

export default function MemoryTimeline() {
  useDocumentTitle("Memory Timeline");

  const allEntries = useMemo(() => buildMemoryTimeline(), []);

  const [activeFilter, setActiveFilter] = useState(() =>
    loadFilterPreference(),
  );
  const [promptIndex, setPromptIndex] = useState(() => {
    const today = new Date().toISOString().slice(0, 10);
    const hash = today.split("").reduce((a, c) => a + c.charCodeAt(0), 0);
    return hash % REFLECTION_PROMPTS.length;
  });

  const filtered = useMemo(
    () => filterByType(allEntries, activeFilter),
    [allEntries, activeFilter],
  );
  const grouped = useMemo(() => groupBySeasons(filtered), [filtered]);
  const olderMemory = useMemo(() => findOlderMemory(allEntries), [allEntries]);

  const isEmpty = allEntries.length === 0;
  const hasItems = filtered.length > 0;

  const handleFilterChange = useCallback((id) => {
    setActiveFilter(id);
    saveFilterPreference(id);
  }, []);

  const refreshPrompt = useCallback(() => {
    setPromptIndex((prev) => {
      let next;
      do {
        next = Math.floor(Math.random() * REFLECTION_PROMPTS.length);
      } while (next === prev && REFLECTION_PROMPTS.length > 1);
      return next;
    });
  }, []);

  const currentPrompt = REFLECTION_PROMPTS[promptIndex];

  return (
    <div className="min-h-screen sthira-warm-surface-bg">
      <div
        className="fixed inset-0 pointer-events-none overflow-hidden"
        aria-hidden="true"
      >
        <div
          className="absolute rounded-full"
          style={{
            width: 340,
            height: 340,
            top: "-8%",
            right: "-12%",
            background:
              "radial-gradient(circle, rgba(185,175,160,0.07) 0%, transparent 70%)",
          }}
        />
      </div>

      <FeatureHeader
        title="Memory Timeline"
        rightAction={
          allEntries.length > 0 ? (
            <span className="text-xs text-stone font-light opacity-60 pr-1">
              {allEntries.length}{" "}
              {allEntries.length === 1 ? "memory" : "memories"}
            </span>
          ) : null
        }
      />

      {!isEmpty && (
        <div
          className="sticky z-10 px-4 pb-4"
          style={{
            top: "var(--feature-header-height)",
            background: "rgba(250,248,244,0.92)",
            backdropFilter: "blur(12px)",
            WebkitBackdropFilter: "blur(12px)",
            borderBottom: "1px solid rgba(185,175,160,0.12)",
          }}
        >
          <div className="max-w-lg mx-auto flex gap-2 overflow-x-auto pb-1 scrollbar-hide">
            {FILTER_OPTIONS.map((opt) => {
              const isActive = activeFilter === opt.id;
              return (
                <button
                  key={opt.id}
                  onClick={() => handleFilterChange(opt.id)}
                  className="shrink-0 flex items-center gap-1.5 rounded-full font-display text-xs font-medium px-3 py-1.5 transition-all duration-200 focus:outline-none min-h-[36px]"
                  style={{
                    background: isActive
                      ? "rgba(185,175,160,0.2)"
                      : "rgba(185,175,160,0.07)",
                    border: `1.5px solid ${isActive ? "rgba(185,175,160,0.45)" : "rgba(185,175,160,0.18)"}`,
                    color: isActive ? "#5a5040" : "#8a8070",
                  }}
                  aria-pressed={isActive}
                >
                  <span>{opt.emoji}</span>
                  <span>{opt.label}</span>
                </button>
              );
            })}
          </div>
        </div>
      )}

      <div className="relative max-w-lg mx-auto px-4 py-8 space-y-8 pb-20">
        {isEmpty && <EmptyState />}

        {!isEmpty && (
          <>
            {olderMemory && activeFilter === "all" && (
              <section>
                <OlderMemoryCard entry={olderMemory} />
              </section>
            )}

            {activeFilter === "all" && (
              <section>
                <ReflectionPromptCard
                  prompt={currentPrompt}
                  onRefresh={refreshPrompt}
                />
              </section>
            )}

            {activeFilter === "all" && (
              <div
                className="h-px"
                style={{ background: "rgba(185,175,160,0.18)" }}
              />
            )}

            {hasItems ? (
              <div className="space-y-6">
                {grouped.map(({ seasonKey, label, season, entries }) => (
                  <div key={seasonKey} className="space-y-3">
                    <SeasonBadge
                      season={season}
                      label={label}
                      entryCount={entries.length}
                    />
                    <div className="flex flex-col gap-3">
                      {entries.map((entry) => (
                        <MemoryCard key={entry.id} entry={entry} />
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <FilterEmptyState onClear={() => handleFilterChange("all")} />
            )}

            {hasItems && (
              <p className="text-center text-xs text-stone font-light italic opacity-40 pt-2">
                {filtered.length}{" "}
                {filtered.length === 1 ? "memory" : "memories"} in this view
              </p>
            )}
          </>
        )}
      </div>
    </div>
  );
}
