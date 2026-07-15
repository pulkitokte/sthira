// src/components/morningFlow/MorningFlowCompletion.jsx
// Completion screen. Polish batch: subtle pulse on the icon (CSS only,
// respects prefers-reduced-motion via the global rule), refined
// hierarchy, "Do Again" label. Handlers and business logic unchanged.

import { Sunrise } from "lucide-react";
import MorningFlowSessionSummary from "./MorningFlowSessionSummary";
import { getQuoteOfTheDay } from "../../data/morningFlowQuotes";

export default function MorningFlowCompletion({
  completedCount,
  totalExercises,
  estimatedSeconds,
  onReturnHome,
  onRestart,
}) {
  const quote = getQuoteOfTheDay();

  return (
    <div
      className="mf-fade-scale-in min-h-screen flex flex-col items-center justify-center text-center px-6 py-16 gap-8"
      style={{
        background:
          "linear-gradient(180deg, #faf8f4 0%, #f7f4ef 50%, #faf8f4 100%)",
      }}
    >
      <div
        className="mf-soft-pulse w-20 h-20 rounded-full flex items-center justify-center"
        style={{
          background: "rgba(134,159,138,0.12)",
          border: "1.5px solid rgba(134,159,138,0.35)",
        }}
        aria-hidden="true"
      >
        <Sunrise size={30} strokeWidth={1.5} className="text-sage" />
      </div>

      <div className="space-y-2.5 max-w-xs">
        <p className="font-display text-2xl font-light text-ink tracking-tight">
          Morning Flow Complete
        </p>
        <p className="text-sm text-stone font-light leading-relaxed">
          You showed up for yourself this morning.
        </p>
      </div>

      <MorningFlowSessionSummary
        completedCount={completedCount}
        totalExercises={totalExercises}
        estimatedSeconds={estimatedSeconds}
      />

      <p className="max-w-xs text-sm text-stone font-light italic leading-relaxed">
        "{quote}"
      </p>

      <div className="w-full max-w-xs flex flex-col gap-3 pt-2">
        <button
          onClick={onReturnHome}
          className="w-full py-3.5 rounded-full font-display font-semibold text-canvas text-sm tracking-wide transition-opacity hover:opacity-90"
          style={{ background: "#869F8A" }}
        >
          Return Home
        </button>
        <button
          onClick={onRestart}
          className="w-full py-3 rounded-full font-display text-sm font-medium text-stone hover:text-ink transition-colors"
        >
          Do Again
        </button>
      </div>
    </div>
  );
}
