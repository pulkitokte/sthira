// src/components/letters/LetterOpenView.jsx
// The ceremonial letter reading experience.
// Paper-like, generous whitespace, editorial typography.
// Batch 72: removed a local confirmingDelete state that produced a
// double confirmation flow — clicking "Delete this letter" showed an
// inline confirm here, and confirming called onDelete (= confirmDelete
// at the page level), which opened a second, separate confirmation
// modal asking the same question again. The single page-level modal in
// LettersToSelf.jsx already handles confirm/cancel correctly, so this
// component now calls onDelete directly. Also removed the unused
// onBack prop (never called in this component; back navigation is
// already handled by FeatureHeader at the page level).

import LetterMoodTag from "./LetterMoodTag";
import { formatLetterDate } from "../../utils/lettersToSelf";
import { Trash2 } from "lucide-react";

export default function LetterOpenView({ letter, onDelete }) {
  return (
    <div className="flex flex-col gap-8">
      {/* Paper card */}
      <div
        className="rounded-3xl overflow-hidden"
        style={{
          background:
            "linear-gradient(180deg, rgba(255,253,248,1) 0%, rgba(252,248,240,1) 100%)",
          border: "1px solid rgba(185,175,160,0.25)",
          boxShadow: "0 4px 24px rgba(0,0,0,0.06), 0 1px 4px rgba(0,0,0,0.04)",
        }}
      >
        {/* Letter header */}
        <div
          className="px-7 pt-8 pb-5 space-y-3"
          style={{
            borderBottom: "1px solid rgba(185,175,160,0.15)",
          }}
        >
          {/* Eyebrow */}
          <p className="font-display text-xs font-semibold uppercase tracking-[0.16em] text-stone opacity-60">
            A letter to yourself
          </p>

          {/* Title */}
          <h2
            className="font-display font-light text-ink leading-snug"
            style={{ fontSize: "1.3rem" }}
          >
            {letter.title}
          </h2>

          {/* Meta row */}
          <div className="flex items-center gap-3 flex-wrap">
            <p className="text-xs text-stone font-light">
              Written {formatLetterDate(letter.createdAt)}
            </p>
            {letter.mood && <LetterMoodTag moodId={letter.mood} size="sm" />}
          </div>
        </div>

        {/* Letter body */}
        <div className="px-7 py-8">
          <p
            className="text-ink font-light leading-[2] whitespace-pre-wrap"
            style={{ fontSize: "0.95rem" }}
          >
            {letter.body}
          </p>
        </div>

        {/* Closing */}
        <div
          className="px-7 pb-8 pt-2"
          style={{ borderTop: "1px solid rgba(185,175,160,0.1)" }}
        >
          <p className="text-xs text-stone font-light italic opacity-50 text-right">
            — Written with care, for you.
          </p>
        </div>
      </div>

      {/* Delete */}
      <div>
        <button
          onClick={() => onDelete(letter)}
          className="flex items-center gap-2 text-stone font-display text-sm font-light hover:text-clay transition-colors opacity-60 hover:opacity-100 min-h-[44px]"
        >
          <Trash2 size={13} strokeWidth={1.5} />
          Delete this letter
        </button>
      </div>

      <div className="pb-4" />
    </div>
  );
}