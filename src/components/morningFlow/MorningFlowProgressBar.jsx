// src/components/morningFlow/MorningFlowProgressBar.jsx
// Top progress display: current category name, segmented progress within
// that category, and global "Exercise X of Y" position.

export default function MorningFlowProgressBar({
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
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <p className="font-display text-xs font-semibold uppercase tracking-[0.12em] text-stone">
          {categoryLabel}
        </p>
        <p className="text-xs text-stone font-light">
          Exercise {currentIndexGlobal + 1} of {totalGlobal}
        </p>
      </div>
      <div className="flex gap-1.5">
        {segments.map((filled, i) => (
          <div
            key={i}
            className={`h-1.5 flex-1 rounded-full ${
              filled ? "bg-moss" : "bg-border"
            }`}
          />
        ))}
      </div>
    </div>
  );
}
