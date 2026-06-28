// src/components/letters/LetterComposer.jsx
// The letter writing form — editorial, generous, warm.

import {
  LETTER_MOODS,
  DELIVERY_TYPES,
  getLetterPromptForDate,
} from "../../data/lettersData";
import { getTomorrowKey } from "../../utils/lettersToSelf";

export default function LetterComposer({
  title,
  setTitle,
  body,
  setBody,
  mood,
  setMood,
  deliveryType,
  setDeliveryType,
  unlockDate,
  setUnlockDate,
  onSave,
  onCancel,
  canSave,
}) {
  const today = new Date().toISOString().slice(0, 10);
  const bodyPlaceholder = getLetterPromptForDate(today);
  const tomorrow = getTomorrowKey();

  return (
    <div className="flex flex-col gap-7">
      {/* Gentle intro */}
      <div className="space-y-1">
        <p
          className="font-display font-light text-ink leading-snug"
          style={{ fontSize: "1.05rem" }}
        >
          Write to yourself.
        </p>
        <p className="text-sm text-stone font-light leading-relaxed">
          There is no one else to impress. Just you, and the words that feel
          true.
        </p>
      </div>

      {/* Title */}
      <div className="space-y-2">
        <label
          htmlFor="letter-title"
          className="block font-display text-sm font-medium text-ink"
        >
          Title
          <span className="text-clay ml-1 text-xs">required</span>
        </label>
        <input
          id="letter-title"
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="To myself, on a difficult day…"
          className="w-full rounded-2xl border border-border bg-canvas px-4 py-3 text-sm text-ink font-light placeholder:text-stone placeholder:opacity-50 focus:border-sage focus:outline-none transition-colors"
          style={{ fontFamily: "inherit" }}
          autoFocus
        />
      </div>

      {/* Body */}
      <div className="space-y-2">
        <label
          htmlFor="letter-body"
          className="block font-display text-sm font-medium text-ink"
        >
          Your letter
          <span className="text-clay ml-1 text-xs">required</span>
        </label>
        <textarea
          id="letter-body"
          value={body}
          onChange={(e) => setBody(e.target.value)}
          placeholder={bodyPlaceholder}
          rows={9}
          className="w-full rounded-2xl border border-border bg-canvas px-4 py-3.5 text-sm text-ink font-light leading-[1.8] placeholder:text-stone placeholder:opacity-50 resize-none focus:border-sage focus:outline-none transition-colors"
          style={{ fontFamily: "inherit" }}
        />
        {body.length > 0 && (
          <p className="text-right text-xs text-stone font-light opacity-50">
            {body.length} characters
          </p>
        )}
      </div>

      {/* Mood */}
      <div className="space-y-3">
        <p className="font-display text-sm font-medium text-ink">
          How are you feeling as you write this?
          <span className="text-stone font-light ml-1 text-xs">(optional)</span>
        </p>
        <div className="flex flex-wrap gap-2">
          {LETTER_MOODS.map((m) => {
            const isSelected = mood === m.id;
            return (
              <button
                key={m.id}
                onClick={() => setMood(isSelected ? null : m.id)}
                className="rounded-full font-display text-xs font-medium px-3.5 py-1.5 transition-all duration-150 focus:outline-none focus:ring-2 focus:ring-offset-1"
                style={{
                  background: isSelected ? m.bg : "transparent",
                  border: `1.5px solid ${isSelected ? m.border : "rgba(185,175,160,0.25)"}`,
                  color: isSelected ? m.color : "#8a8070",
                  transform: isSelected ? "scale(1.04)" : "scale(1)",
                }}
                aria-pressed={isSelected}
              >
                {m.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* Delivery type */}
      <div className="space-y-3">
        <p className="font-display text-sm font-medium text-ink">
          When can this letter be read?
        </p>
        <div className="flex gap-2">
          {[
            { id: DELIVERY_TYPES.ANYTIME, label: "Read Anytime" },
            { id: DELIVERY_TYPES.LATER, label: "Open Later" },
          ].map((opt) => {
            const isSelected = deliveryType === opt.id;
            return (
              <button
                key={opt.id}
                onClick={() => setDeliveryType(opt.id)}
                className="flex-1 py-2.5 rounded-2xl font-display text-sm font-medium transition-all duration-150 focus:outline-none focus:ring-2 focus:ring-offset-1"
                style={{
                  background: isSelected
                    ? "rgba(134,159,138,0.12)"
                    : "rgba(185,175,160,0.06)",
                  border: `1.5px solid ${isSelected ? "rgba(134,159,138,0.4)" : "rgba(185,175,160,0.2)"}`,
                  color: isSelected ? "#3a5a40" : "#8a8070",
                }}
                aria-pressed={isSelected}
              >
                {opt.label}
              </button>
            );
          })}
        </div>

        {/* Unlock date picker */}
        {deliveryType === DELIVERY_TYPES.LATER && (
          <div className="space-y-2 pt-1">
            <label
              htmlFor="unlock-date"
              className="block text-xs text-stone font-light"
            >
              Open on or after
            </label>
            <input
              id="unlock-date"
              type="date"
              value={unlockDate}
              min={tomorrow}
              onChange={(e) => setUnlockDate(e.target.value)}
              className="w-full rounded-2xl border border-border bg-canvas px-4 py-3 text-sm text-ink font-light focus:border-sage focus:outline-none transition-colors"
              style={{ fontFamily: "inherit" }}
            />
            <p className="text-xs text-stone font-light italic opacity-60">
              This letter will stay sealed until that date arrives.
            </p>
          </div>
        )}
      </div>

      {/* Actions */}
      <div className="flex flex-col gap-3 pt-2 pb-8">
        <button
          onClick={onSave}
          disabled={!canSave}
          className="w-full py-3.5 rounded-full font-display font-semibold text-canvas text-sm tracking-wide transition-opacity focus:outline-none focus:ring-2 focus:ring-offset-2"
          style={{
            background: canSave ? "#869F8A" : "rgba(134,159,138,0.35)",
            cursor: canSave ? "pointer" : "not-allowed",
          }}
        >
          {deliveryType === DELIVERY_TYPES.LATER
            ? "Seal this letter"
            : "Save this letter"}
        </button>
        <button
          onClick={onCancel}
          className="w-full py-3 rounded-full font-display text-sm font-medium text-stone hover:text-ink transition-colors"
        >
          Cancel
        </button>
      </div>
    </div>
  );
}
