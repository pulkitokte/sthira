// src/components/checkin/DailyCheckInCard.jsx
// The daily check-in card rendered on the Home screen.
// Shown only when today's check-in is not yet complete.
// Transitions smoothly from question → affirmation → hidden.

import { CHECKIN_STATE } from "../../hooks/useDailyCheckIn";

export default function DailyCheckInCard({ checkIn }) {
  const {
    question,
    status,
    isCompleted,
    isAffirming,
    selectedOption,
    affirmation,
    selectOption,
    acknowledge,
  } = checkIn;

  // Card is fully hidden once done
  if (isCompleted) return null;

  // ─── Affirmation view ─────────────────────────────────────────────────
  if (isAffirming) {
    return (
      <div className="rounded-3xl bg-surface p-6 shadow-soft">
        <div className="flex flex-col items-start gap-4">
          {/* Selected option echo */}
          <div className="flex items-center gap-2">
            <span
              className="inline-block px-3 py-1 rounded-full text-xs font-medium"
              style={{
                background: "rgba(134, 159, 138, 0.15)",
                color: "#4a7055",
                border: "1px solid rgba(134, 159, 138, 0.3)",
              }}
            >
              {selectedOption}
            </span>
          </div>

          {/* Affirmation text */}
          <p className="font-display text-base font-light text-ink leading-relaxed">
            {affirmation}
          </p>

          {/* Dismiss */}
          <button
            onClick={acknowledge}
            className="mt-1 text-xs text-stone font-light tracking-wide hover:text-ink transition-colors"
          >
            Continue →
          </button>
        </div>
      </div>
    );
  }

  // ─── Question view ────────────────────────────────────────────────────
  return (
    <div className="rounded-3xl bg-surface p-6 shadow-soft">
      {/* Eyebrow */}
      <p className="font-display text-xs font-semibold uppercase tracking-[0.12em] text-sage mb-3">
        Daily Check-In
      </p>

      {/* Question */}
      <p className="font-display text-base font-medium text-ink leading-snug mb-5">
        {question.question}
      </p>

      {/* Options */}
      <div className="flex flex-col gap-2">
        {question.options.map((option) => (
          <button
            key={option.label}
            onClick={() => selectOption(option)}
            className="w-full text-left px-4 py-3 rounded-2xl text-sm font-light text-ink transition-all duration-150 hover:shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-1"
            style={{
              background: "rgba(134, 159, 138, 0.06)",
              border: "1px solid rgba(134, 159, 138, 0.2)",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = "rgba(134, 159, 138, 0.13)";
              e.currentTarget.style.borderColor = "rgba(134, 159, 138, 0.4)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = "rgba(134, 159, 138, 0.06)";
              e.currentTarget.style.borderColor = "rgba(134, 159, 138, 0.2)";
            }}
          >
            {option.label}
          </button>
        ))}
      </div>
    </div>
  );
}
