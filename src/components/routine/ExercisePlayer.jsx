import { useState } from "react";
import {
  Pause,
  Play,
  SkipForward,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import PageContainer from "../layout/PageContainer";
import StepTimer from "./StepTimer";
import { useTimer } from "../../hooks/useTimer";

export default function ExercisePlayer({
  exercise,
  currentIndex,
  totalExercises,
  onNext,
  onPrevious,
}) {
  const [isPaused, setIsPaused] = useState(false);
  const secondsLeft = useTimer(exercise.duration, {
    isPaused,
    onComplete: onNext,
  });

  const progressPct = ((currentIndex + 1) / totalExercises) * 100;
  const isLastExercise = currentIndex === totalExercises - 1;

  return (
    <PageContainer className="flex flex-1 flex-col">
      <div className="mb-3 flex items-center justify-between">
        <span className="font-display text-sm font-medium text-stone">
          {currentIndex + 1} / {totalExercises}
        </span>
        <span className="rounded-full bg-sage/15 px-3 py-1 text-xs font-medium text-moss">
          {exercise.bodyFocus}
        </span>
      </div>

      <div className="h-1.5 w-full overflow-hidden rounded-full bg-border">
        <div
          className="h-full rounded-full bg-moss transition-all duration-500 ease-out"
          style={{ width: `${progressPct}%` }}
        />
      </div>

      <div className="flex flex-1 flex-col items-center justify-center gap-6 py-8 text-center">
        <h1 className="font-display text-2xl font-semibold text-ink">
          {exercise.name}
        </h1>

        <StepTimer secondsLeft={secondsLeft} totalSeconds={exercise.duration} />

        <p className="max-w-xs leading-relaxed text-stone">
          {exercise.instructions}
        </p>

        <div className="flex items-center gap-4">
          <button
            onClick={() => setIsPaused((p) => !p)}
            aria-label={isPaused ? "Resume" : "Pause"}
            className="flex h-12 w-12 items-center justify-center rounded-full bg-surface text-moss shadow-soft transition-colors hover:bg-moss/10"
          >
            {isPaused ? (
              <Play size={20} strokeWidth={2} />
            ) : (
              <Pause size={20} strokeWidth={2} />
            )}
          </button>
          <button
            onClick={onNext}
            aria-label="Skip this exercise"
            className="flex h-12 w-12 items-center justify-center rounded-full bg-surface text-stone shadow-soft transition-colors hover:bg-moss/10 hover:text-moss"
          >
            <SkipForward size={20} strokeWidth={2} />
          </button>
        </div>
      </div>

      <div className="flex items-center gap-3 pb-2">
        <button
          onClick={onPrevious}
          disabled={currentIndex === 0}
          className={`flex flex-1 items-center justify-center gap-1.5 rounded-full border py-3.5 font-display font-semibold transition-colors ${
            currentIndex === 0
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
    </PageContainer>
  );
}
