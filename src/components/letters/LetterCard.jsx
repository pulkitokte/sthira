// src/components/letters/LetterCard.jsx
// A single letter card shown in the timeline.
// Available letters are tappable; future letters show a locked state.
// Batch 70: added shared sthira-card-interactive class for consistent,
// subtle hover elevation and press feedback on the available-letter
// button. Sealed/locked cards intentionally get no interactive feedback
// since they aren't tappable.

import { Lock } from "lucide-react";
import LetterMoodTag from "./LetterMoodTag";
import {
  formatLetterDate,
  formatUnlockDate,
  daysUntilUnlock,
  isLetterUnlocked,
} from "../../utils/lettersToSelf";

export default function LetterCard({ letter, onOpen, onDelete }) {
  const unlocked = isLetterUnlocked(letter);
  const days = daysUntilUnlock(letter.unlockDate);
  const preview =
    letter.body.length > 100
      ? letter.body.slice(0, 100).trimEnd() + "…"
      : letter.body;

  if (!unlocked) {
    return (
      <div
        className="rounded-2xl p-5 space-y-3"
        style={{
          background:
            "linear-gradient(160deg, rgba(185,175,160,0.08) 0%, rgba(160,155,148,0.06) 100%)",
          border: "1px dashed rgba(185,175,160,0.35)",
        }}
      >
        <div className="flex items-start justify-between gap-3">
          <div className="flex items-center gap-2">
            <Lock
              size={13}
              strokeWidth={1.5}
              className="text-stone opacity-50 shrink-0"
            />
            <p className="font-display text-sm font-medium text-stone opacity-70 leading-snug line-clamp-1">
              {letter.title}
            </p>
          </div>
          {letter.mood && <LetterMoodTag moodId={letter.mood} size="sm" />}
        </div>

        <p className="text-xs text-stone font-light italic opacity-60">
          This letter is waiting patiently for you.
        </p>

        <div className="flex items-center justify-between">
          <p className="text-xs text-stone font-light opacity-50">
            Opens {formatUnlockDate(letter.unlockDate)}
            {days > 0 && ` · ${days} ${days === 1 ? "day" : "days"} away`}
          </p>
          <button
            onClick={() => onDelete(letter)}
            className="text-xs text-stone font-light opacity-40 hover:opacity-70 transition-opacity min-h-[32px] px-1"
            aria-label={`Remove sealed letter "${letter.title}"`}
          >
            Remove
          </button>
        </div>
      </div>
    );
  }

  return (
    <button
      onClick={() => onOpen(letter)}
      className="sthira-card-interactive w-full text-left rounded-2xl p-5 space-y-3 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-1"
      style={{
        background:
          "linear-gradient(160deg, rgba(255,252,245,1) 0%, rgba(248,244,236,1) 100%)",
        border: "1px solid rgba(185,175,160,0.28)",
        boxShadow: "0 1px 8px rgba(0,0,0,0.04)",
      }}
      aria-label={`Open letter: ${letter.title}`}
    >
      <div className="flex items-start justify-between gap-3">
        <p className="font-display text-sm font-medium text-ink leading-snug line-clamp-1 flex-1">
          {letter.title}
        </p>
        {letter.mood && <LetterMoodTag moodId={letter.mood} size="sm" />}
      </div>

      <p className="text-sm text-stone font-light leading-relaxed line-clamp-2">
        {preview}
      </p>

      <p className="text-xs text-stone font-light opacity-60">
        {formatLetterDate(letter.createdAt)}
      </p>
    </button>
  );
}
