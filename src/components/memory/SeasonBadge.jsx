// src/components/memory/SeasonBadge.jsx
// A seasonal section header for the timeline grouping.

import { SEASON_META } from "../../utils/memoryTimeline";

export default function SeasonBadge({ season, label, entryCount }) {
  const meta = SEASON_META[season] ?? SEASON_META.spring;

  return (
    <div className="flex items-center gap-3 py-2">
      {/* Left rule */}
      <div className="flex-1 h-px" style={{ background: meta.border }} />

      {/* Season pill */}
      <div
        className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-full shrink-0"
        style={{
          background: meta.bg,
          border: `1px solid ${meta.border}`,
        }}
      >
        <span className="text-sm leading-none">{meta.emoji}</span>
        <span
          className="font-display text-xs font-semibold tracking-wide"
          style={{ color: meta.color }}
        >
          {label}
        </span>
        {entryCount > 0 && (
          <span
            className="text-xs font-light opacity-60"
            style={{ color: meta.color }}
          >
            · {entryCount}
          </span>
        )}
      </div>

      {/* Right rule */}
      <div className="flex-1 h-px" style={{ background: meta.border }} />
    </div>
  );
}
