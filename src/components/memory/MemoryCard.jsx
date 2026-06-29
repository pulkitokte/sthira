// src/components/memory/MemoryCard.jsx
// A single memory card in the timeline.

import {
  MEMORY_TYPE_LABELS,
  MEMORY_TYPE_EMOJIS,
  formatMemoryDate,
} from "../../utils/memoryTimeline";

export default function MemoryCard({ entry }) {
  const typeLabel = MEMORY_TYPE_LABELS[entry.type] ?? "Memory";
  const emoji = MEMORY_TYPE_EMOJIS[entry.type] ?? "📝";
  const hasPreview = entry.preview && entry.preview.trim().length > 0;

  return (
    <div
      className="rounded-2xl p-5 space-y-3 transition-all duration-150"
      style={{
        background:
          "linear-gradient(160deg, rgba(255,252,248,1) 0%, rgba(250,246,240,1) 100%)",
        border: "1px solid rgba(185,175,160,0.22)",
        boxShadow: "0 1px 6px rgba(0,0,0,0.03)",
      }}
    >
      {/* Header row */}
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-center gap-2">
          <span className="text-base leading-none">{emoji}</span>
          <span
            className="font-display text-xs font-semibold uppercase tracking-[0.12em]"
            style={{ color: "#8a7a68" }}
          >
            {typeLabel}
          </span>
        </div>
        <span className="text-xs text-stone font-light tabular-nums shrink-0 opacity-70">
          {formatMemoryDate(entry.date)}
        </span>
      </div>

      {/* Title */}
      <p className="font-display text-sm font-medium text-ink leading-snug">
        {entry.title}
      </p>

      {/* Preview */}
      {hasPreview && (
        <p className="text-sm text-stone font-light leading-relaxed line-clamp-3">
          {entry.preview}
        </p>
      )}

      {/* No text note */}
      {!hasPreview && (
        <p className="text-xs text-stone font-light italic opacity-50">
          No text recorded.
        </p>
      )}
    </div>
  );
}
