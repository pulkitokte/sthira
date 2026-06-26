// src/components/evening/ReflectionEntryCard.jsx
// A single reflection card shown in the timeline.

import { getReflectionMoodById } from "../../data/eveningReflectionData";
import {
  formatReflectionTime,
  buildReflectionPreview,
} from "../../utils/eveningReflection";

function MoodPill({ moodId }) {
  const mood = getReflectionMoodById(moodId);
  if (!mood) return null;
  return (
    <span
      className="inline-block rounded-full font-display text-xs font-medium px-2.5 py-1 shrink-0"
      style={{
        background: mood.bg,
        border: `1px solid ${mood.border}`,
        color: mood.color,
      }}
    >
      {mood.label}
    </span>
  );
}

export default function ReflectionEntryCard({ entry, onOpen }) {
  const preview = buildReflectionPreview(entry);

  return (
    <button
      onClick={() => onOpen(entry)}
      className="w-full text-left rounded-2xl bg-surface p-5 shadow-soft transition-all duration-150 hover:shadow-md focus:outline-none focus:ring-2 focus:ring-offset-1"
    >
      <div className="flex items-start justify-between gap-3 mb-3">
        <div className="flex items-center gap-2 flex-wrap">
          {entry.mood && <MoodPill moodId={entry.mood} />}
        </div>
        <span className="text-xs text-stone font-light tabular-nums shrink-0">
          {formatReflectionTime(entry.timestamp)}
        </span>
      </div>
      {preview ? (
        <p className="text-sm text-stone font-light leading-relaxed line-clamp-2">
          {preview}
        </p>
      ) : (
        <p className="text-sm text-stone font-light italic opacity-50">
          No text recorded.
        </p>
      )}
    </button>
  );
}
