// src/components/garden/GratitudeEntryCard.jsx
// A single gratitude entry card for the timeline view.

import GratitudeCategoryBadge from "./GratitudeCategoryBadge";
import { formatGratitudeTime } from "../../utils/gratitudeGarden";

export default function GratitudeEntryCard({ entry, onDelete }) {
  return (
    <div className="rounded-2xl bg-surface p-5 shadow-soft">
      <div className="flex items-start justify-between gap-3 mb-3">
        <GratitudeCategoryBadge categoryId={entry.category} size="sm" />
        <span className="text-xs text-stone font-light tabular-nums shrink-0">
          {formatGratitudeTime(entry.timestamp)}
        </span>
      </div>
      <p className="text-sm text-ink font-light leading-relaxed">
        {entry.text}
      </p>
      {onDelete && (
        <button
          onClick={() => onDelete(entry)}
          className="mt-3 text-xs text-stone font-light hover:text-clay transition-colors"
          aria-label="Delete this entry"
        >
          Remove
        </button>
      )}
    </div>
  );
}
