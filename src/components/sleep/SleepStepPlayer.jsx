import { useState } from "react";
import { ChevronLeft, ChevronRight, Timer } from "lucide-react";
import StepTimer from "../routine/StepTimer";
import { useTimer } from "../../hooks/useTimer";
import { formatSuggestedDuration } from "../../utils/sleepUtils";

/**
 * Individual step player for sleep rituals.
 * Timer is opt-in: the user taps the clock icon to start a countdown
 * for the suggested duration, but can ignore it and tap Next whenever ready.
 */
export default function SleepStepPlayer({
  step,
  currentIndex,
  totalSteps,
  onNext,
  onPrevious,
}) {
  const [timerActive, setTimerActive] = useState(false);
  const [timerKey, setTimerKey] = useState(0);

  const progressPct = ((currentIndex + 1) / totalSteps) * 100;
  const isLastStep = currentIndex === totalSteps - 1;
  const durationLabel = formatSuggestedDuration(step.suggestedSeconds);

  const handleTimerComplete = () => {
    setTimerActive(false);
  };

  const handleToggleTimer = () => {
    if (!timerActive) {
      setTimerKey((k) => k + 1);
      setTimerActive(true);
    } else {
      setTimerActive(false);
    }
  };

  // Move to next step and reset timer state
  const handleNext = () => {
    setTimerActive(false);
    setTimerKey((k) => k + 1);
    onNext();
  };

  const handlePrevious = () => {
    setTimerActive(false);
    setTimerKey((k) => k + 1);
    onPrevious();
  };

  return (
    <div className="flex flex-1 flex-col px-6 py-6">
      {/* Progress */}
      <div className="mb-3 flex items-center justify-between">
        <span className="font-display text-sm font-medium text-stone">
          {currentIndex + 1} / {totalSteps}
        </span>
        {durationLabel && (
          <span className="text-xs text-stone/60">{durationLabel}</span>
        )}
      </div>
      <div className="h-1 w-full overflow-hidden rounded-full bg-border">
        <div
          className="h-full rounded-full bg-clay/50 transition-all duration-500 ease-out"
          style={{ width: `${progressPct}%` }}
        />
      </div>

      {/* Step content */}
      <div className="flex flex-1 flex-col items-center justify-center gap-6 py-8 text-center">
        <h1 className="font-display text-2xl font-semibold text-ink">
          {step.title}
        </h1>
        <p className="max-w-xs leading-relaxed text-stone">
          {step.instruction}
        </p>

        {/* Optional timer */}
        {timerActive && step.suggestedSeconds ? (
          <TimerWidget
            key={timerKey}
            duration={step.suggestedSeconds}
            onComplete={handleTimerComplete}
          />
        ) : step.suggestedSeconds ? (
          <button
            onClick={handleToggleTimer}
            aria-label="Start optional timer for this step"
            className="flex items-center gap-1.5 rounded-full border border-border px-4 py-2 text-xs font-medium text-stone transition-colors hover:border-clay/50 hover:text-clay"
          >
            <Timer size={13} strokeWidth={2} aria-hidden="true" />
            {durationLabel} timer
          </button>
        ) : null}
      </div>

      {/* Navigation */}
      <div className="flex items-center gap-3 pb-2">
        <button
          onClick={handlePrevious}
          disabled={currentIndex === 0}
          className={`flex flex-1 items-center justify-center gap-1.5 rounded-full border py-3.5 font-display font-semibold transition-colors ${
            currentIndex === 0
              ? "cursor-not-allowed border-border text-stone/50"
              : "border-border text-ink hover:border-clay/40"
          }`}
        >
          <ChevronLeft size={18} aria-hidden="true" /> Previous
        </button>
        <button
          onClick={handleNext}
          className="flex flex-1 items-center justify-center gap-1.5 rounded-full bg-clay/80 py-3.5 font-display font-semibold text-canvas shadow-soft transition-colors hover:bg-clay"
        >
          {isLastStep ? "Complete" : "Next"}{" "}
          <ChevronRight size={18} aria-hidden="true" />
        </button>
      </div>
    </div>
  );
}

// Thin wrapper so SleepStepPlayer can pass a fresh key to reset the timer
function TimerWidget({ duration, onComplete }) {
  const secondsLeft = useTimer(duration, { isPaused: false, onComplete });
  return <StepTimer secondsLeft={secondsLeft} totalSeconds={duration} />;
}
