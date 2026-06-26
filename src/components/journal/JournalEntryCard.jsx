// src/components/journal/JournalEntryCard.jsx
// A single entry card shown in the timeline.

import MoodBadge from "./MoodBadge";
import { formatEntryTime } from "../../utils/moodJournal";

export default function JournalEntryCard({ entry, onOpen }) {
  const hasText = entry.text && entry.text.trim().length > 0;
  const preview = hasText
    ? entry.text.length > 120
      ? entry.text.slice(0, 120).trimEnd() + "…"
      : entry.text
    : null;

  return (
    <button
      onClick={() => onOpen(entry)}
      className="w-full text-left rounded-2xl bg-surface p-5 shadow-soft transition-all duration-150 hover:shadow-md focus:outline-none focus:ring-2 focus:ring-offset-1"
    >
      <div className="flex items-start justify-between gap-3 mb-3">
        <MoodBadge moodId={entry.mood} size="sm" />
        <span className="text-xs text-stone font-light tabular-nums shrink-0">
          {formatEntryTime(entry.timestamp)}
        </span>
      </div>
      {preview ? (
        <p className="text-sm text-stone font-light leading-relaxed line-clamp-3">
          {preview}
        </p>
      ) : (
        <p className="text-sm text-stone font-light italic opacity-60">
          No text added.
        </p>
      )}
    </button>
  );
}
