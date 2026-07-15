// src/components/morningFlow/MorningFlowProgressBar.jsx
// Top progress display. Segments now transition color smoothly instead
// of snapping, and the "Exercise X of Y" label fades in on change via a
// key-based remount — no new state, no logic change.

import { memo } from "react";

function MorningFlowProgressBar({
  categoryLabel,
  filledCount,
  totalInCategory,
  currentIndexGlobal,
  totalGlobal,
}) {
  const segments = Array.from(
    { length: totalInCategory },
    (_, i) => i < filledCount,
  );

  return (
    <div className="space-y-2" role="group" aria-label="Workout progress">
      <div className="flex items-center justify-between">
        <p className="font-display text-xs font-semibold uppercase tracking-[0.12em] text-stone">
          {categoryLabel}
        </p>
        <p
          key={currentIndexGlobal}
          className="mf-fade-in text-xs text-stone font-light tabular-nums"
        >
          Exercise {currentIndexGlobal + 1} of {totalGlobal}
        </p>
      </div>
      <div className="flex gap-1.5">
        {segments.map((filled, i) => (
          <div
            key={i}
            className={`h-1.5 flex-1 rounded-full transition-colors duration-300 ease-out ${
              filled ? "bg-moss" : "bg-border"
            }`}
          />
        ))}
      </div>
    </div>
  );
}

export default memo(MorningFlowProgressBar);
