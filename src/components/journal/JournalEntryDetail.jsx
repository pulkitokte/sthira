// src/components/journal/JournalEntryDetail.jsx
// Full detail view for a single journal entry.
// Supports edit and delete actions.

import { useState } from "react";
import { Pencil, Trash2 } from "lucide-react";
import MoodBadge from "./MoodBadge";
import { formatEntryDate, formatEntryTime } from "../../utils/moodJournal";

export default function JournalEntryDetail({ entry, onEdit, onDelete }) {
  const [confirmingDelete, setConfirmingDelete] = useState(false);

  const hasText = entry.text && entry.text.trim().length > 0;

  return (
    <div className="flex flex-col gap-6">
      {/* Meta */}
      <div className="flex items-center justify-between">
        <div className="space-y-1">
          <p className="font-display text-xs font-semibold uppercase tracking-[0.12em] text-stone">
            {formatEntryDate(entry.date)}
          </p>
          <p className="text-xs text-stone font-light">
            {formatEntryTime(entry.timestamp)}
            {entry.editedAt && (
              <span className="ml-2 opacity-60">· edited</span>
            )}
          </p>
        </div>
        <MoodBadge moodId={entry.mood} size="md" />
      </div>

      {/* Divider */}
      <div className="h-px bg-border" />

      {/* Entry text */}
      {hasText ? (
        <p className="text-base text-ink font-light leading-[1.8] whitespace-pre-wrap">
          {entry.text}
        </p>
      ) : (
        <p className="text-sm text-stone font-light italic opacity-60">
          No reflection was written for this entry.
        </p>
      )}

      {/* Actions */}
      <div className="flex gap-3 pt-2">
        <button
          onClick={() => onEdit(entry)}
          className="flex items-center gap-2 flex-1 justify-center rounded-full border border-border py-3 font-display text-sm font-semibold text-ink transition-colors hover:bg-surface"
        >
          <Pencil size={14} strokeWidth={1.5} />
          Edit
        </button>

        {!confirmingDelete ? (
          <button
            onClick={() => setConfirmingDelete(true)}
            className="flex items-center gap-2 flex-1 justify-center rounded-full border border-border py-3 font-display text-sm font-semibold text-clay transition-colors hover:bg-surface"
          >
            <Trash2 size={14} strokeWidth={1.5} />
            Delete
          </button>
        ) : (
          <div className="flex-1 rounded-2xl border border-border bg-surface p-3 space-y-2">
            <p className="text-xs text-stone text-center leading-relaxed">
              Delete this entry? This cannot be undone.
            </p>
            <div className="flex gap-2">
              <button
                onClick={() => setConfirmingDelete(false)}
                className="flex-1 rounded-full border border-border py-2 font-display text-xs font-semibold text-ink"
              >
                Cancel
              </button>
              <button
                onClick={() => onDelete(entry.id)}
                className="flex-1 rounded-full bg-clay py-2 font-display text-xs font-semibold text-canvas"
              >
                Delete
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
