// src/components/morningFlow/MorningFlowControls.jsx
// Bottom controls for the exercise player: early exit, pause (visual
// only), skip, previous, next. No functionality beyond calling the
// handlers passed in — no timers, no state of its own.

import {
  ChevronLeft,
  ChevronRight,
  Pause,
  Play,
  SkipForward,
  X,
} from "lucide-react";

export default function MorningFlowControls({
  isPaused,
  isFirstExercise,
  isLastExercise,
  onPrevious,
  onNext,
  onSkip,
  onTogglePause,
  onFinish,
}) {
  return (
    <div className="space-y-3 pt-2">
      {/* Early exit */}
      <div className="flex justify-center">
        <button
          onClick={onFinish}
          className="flex items-center gap-1.5 text-xs text-stone font-light hover:text-clay transition-colors"
        >
          <X size={12} strokeWidth={1.5} />
          Finish Workout
        </button>
      </div>

      {/* Pause + Skip */}
      <div className="flex items-center justify-center gap-4">
        <button
          onClick={onTogglePause}
          aria-label={isPaused ? "Resume" : "Pause"}
          className="flex h-12 w-12 items-center justify-center rounded-full bg-surface text-dew shadow-soft transition-colors hover:bg-dew/10"
        >
          {isPaused ? (
            <Play size={20} strokeWidth={2} />
          ) : (
            <Pause size={20} strokeWidth={2} />
          )}
        </button>
        <button
          onClick={onSkip}
          aria-label="Skip this exercise"
          className="flex h-12 w-12 items-center justify-center rounded-full bg-surface text-stone shadow-soft transition-colors hover:bg-dew/10 hover:text-dew"
        >
          <SkipForward size={20} strokeWidth={2} />
        </button>
      </div>

      {/* Previous / Next */}
      <div className="flex items-center gap-3 pb-2">
        <button
          onClick={onPrevious}
          disabled={isFirstExercise}
          className={`flex flex-1 items-center justify-center gap-1.5 rounded-full border py-3.5 font-display font-semibold transition-colors ${
            isFirstExercise
              ? "cursor-not-allowed border-border text-stone/50"
              : "border-border text-ink hover:border-sage/60"
          }`}
        >
          <ChevronLeft size={18} /> Previous
        </button>
        <button
          onClick={onNext}
          className="flex flex-1 items-center justify-center gap-1.5 rounded-full bg-moss py-3.5 font-display font-semibold text-canvas shadow-soft transition-colors hover:bg-moss-dark"
        >
          {isLastExercise ? "Complete" : "Next"} <ChevronRight size={18} />
        </button>
      </div>
    </div>
  );
}
