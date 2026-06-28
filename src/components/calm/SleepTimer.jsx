// src/components/calm/SleepTimer.jsx
// Optional sleep timer — lets user stop playback after a set duration.
// Shows a countdown when active.

import { X } from "lucide-react";
import { SLEEP_TIMER_OPTIONS } from "../../data/calmSounds";

export default function SleepTimer({
  timerActive,
  timerSeconds,
  formattedTimer,
  onStart,
  onCancel,
}) {
  if (timerActive) {
    // Active countdown display
    return (
      <div
        className="rounded-2xl p-4 flex items-center justify-between gap-3"
        style={{
          background: "rgba(134,159,138,0.08)",
          border: "1px solid rgba(134,159,138,0.2)",
        }}
      >
        <div className="space-y-0.5">
          <p className="text-xs font-display font-semibold uppercase tracking-[0.12em] text-stone opacity-70">
            Sleep timer
          </p>
          <p
            className="font-display font-light text-ink tabular-nums"
            style={{ fontSize: "1.4rem" }}
          >
            {formattedTimer}
          </p>
          <p className="text-xs text-stone font-light opacity-60">
            Sound will stop when the timer ends.
          </p>
        </div>
        <button
          onClick={onCancel}
          className="p-2 rounded-xl text-stone hover:text-ink transition-colors"
          aria-label="Cancel sleep timer"
        >
          <X size={16} strokeWidth={1.5} />
        </button>
      </div>
    );
  }

  // Timer selection
  return (
    <div className="space-y-3">
      <p className="text-xs font-display font-semibold uppercase tracking-[0.12em] text-stone opacity-70">
        Sleep timer
        <span className="ml-1.5 font-light normal-case tracking-normal opacity-60">
          (optional)
        </span>
      </p>
      <div className="flex flex-wrap gap-2">
        {SLEEP_TIMER_OPTIONS.map((opt) => (
          <button
            key={opt.label}
            onClick={() => onStart(opt.seconds)}
            className="px-3.5 py-1.5 rounded-full font-display text-xs font-medium transition-all duration-150 hover:shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-1"
            style={{
              background: "rgba(185,175,160,0.08)",
              border: "1px solid rgba(185,175,160,0.22)",
              color: "#6a6050",
            }}
          >
            {opt.label}
          </button>
        ))}
      </div>
    </div>
  );
}
