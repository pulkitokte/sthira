import { useState } from "react";
import {
  Pause,
  Play,
  SkipForward,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import PageContainer from "../layout/PageContainer";
import StepTimer from "../routine/StepTimer";
import { useTimer } from "../../hooks/useTimer";

export default function EyeRecoveryStepPlayer({
  step,
  currentIndex,
  totalSteps,
  onNext,
  onPrevious,
}) {
  const [isPaused, setIsPaused] = useState(false);
  const secondsLeft = useTimer(step.duration, { isPaused, onComplete: onNext });

  const progressPct = ((currentIndex + 1) / totalSteps) * 100;

  return (
    <PageContainer className="flex flex-1 flex-col">
      <span className="font-display text-sm font-medium text-stone">
        {currentIndex + 1} / {totalSteps}
      </span>

      <div className="mt-3 h-1.5 w-full overflow-hidden rounded-full bg-border">
        <div
          className="h-full rounded-full bg-dew transition-all duration-500 ease-out"
          style={{ width: `${progressPct}%` }}
        />
      </div>

      <div className="flex flex-1 flex-col items-center justify-center gap-6 py-8 text-center">
        <h1 className="font-display text-2xl font-semibold text-ink">
          {step.title}
        </h1>

        <StepTimer secondsLeft={secondsLeft} totalSeconds={step.duration} />

        <p className="max-w-xs leading-relaxed text-stone">
          {step.instruction}
        </p>

        <div className="flex items-center gap-4">
          <button
            onClick={() => setIsPaused((p) => !p)}
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
            onClick={onNext}
            aria-label="Skip this step"
            className="flex h-12 w-12 items-center justify-center rounded-full bg-surface text-stone shadow-soft transition-colors hover:bg-dew/10 hover:text-dew"
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
          Next <ChevronRight size={18} />
        </button>
      </div>
    </PageContainer>
  );
}
