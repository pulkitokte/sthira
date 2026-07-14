// src/components/morningFlow/MorningFlowExercisePlayer.jsx
// The per-exercise screen shown during an active Morning Flow session.
// Now runs a real countdown timer for each exercise: counts down from
// the exercise's duration, auto-advances via onNext when it reaches
// zero, and fully stops/resumes with the player's pause state.
// Timer resets naturally each time this component remounts (parent
// renders it with key={currentIndex}), so Skip/Previous/auto-advance
// all get a correctly-reset timer for free — no extra reset logic here.

import { Clock, Target, Sparkles, ListOrdered } from "lucide-react";
import FeatureHeader from "../layout/FeatureHeader";
import PageContainer from "../layout/PageContainer";
import MorningFlowProgressBar from "./MorningFlowProgressBar";
import MorningFlowExerciseIllustration from "./MorningFlowExerciseIllustration";
import MorningFlowControls from "./MorningFlowControls";
import StepTimer from "../routine/StepTimer";
import { useCountdownTimer } from "../../hooks/useCountdownTimer";
import { parseDurationToSeconds } from "../../utils/morningFlowPlayer";

export default function MorningFlowExercisePlayer({
  exercise,
  categoryLabel,
  currentIndex,
  totalExercises,
  indexWithinCategory,
  categoryExerciseCount,
  isPaused,
  isFirstExercise,
  isLastExercise,
  onPrevious,
  onNext,
  onSkip,
  onTogglePause,
  onFinish,
}) {
  const durationSeconds = parseDurationToSeconds(exercise.duration);

  const { secondsLeft } = useCountdownTimer(durationSeconds, {
    isPaused,
    // Reaching zero auto-advances through the same goNext used by the
    // "Next"/"Complete" button, so there is exactly one path that moves
    // the workout forward — no duplicated advance logic.
    onComplete: onNext,
  });

  return (
    <>
      <FeatureHeader title={exercise.title} />
      <PageContainer className="flex flex-col gap-6">
        <MorningFlowProgressBar
          categoryLabel={categoryLabel}
          filledCount={indexWithinCategory + 1}
          totalInCategory={categoryExerciseCount}
          currentIndexGlobal={currentIndex}
          totalGlobal={totalExercises}
        />

        <MorningFlowExerciseIllustration exercise={exercise} />

        <StepTimer secondsLeft={secondsLeft} totalSeconds={durationSeconds} />

        <div className="flex flex-wrap items-center gap-2">
          <span className="rounded-full bg-dew/15 px-2.5 py-0.5 text-xs font-medium text-dew">
            {exercise.difficulty}
          </span>
          <span className="flex items-center gap-1 rounded-full border border-border px-2.5 py-0.5 text-xs font-medium text-stone">
            <Clock size={11} strokeWidth={2} />
            {exercise.duration}
          </span>
        </div>

        <p className="leading-relaxed text-stone">{exercise.description}</p>

        {/* Target muscles */}
        <div className="space-y-1.5">
          <div className="flex items-center gap-1.5">
            <Target
              size={12}
              strokeWidth={2}
              className="text-stone opacity-60"
            />
            <p className="font-display text-xs font-semibold uppercase tracking-[0.1em] text-stone opacity-70">
              Muscles Involved
            </p>
          </div>
          <div className="flex flex-wrap gap-1.5">
            {exercise.targetMuscles.map((muscle) => (
              <span
                key={muscle}
                className="rounded-full px-2.5 py-1 text-xs font-medium text-ink"
                style={{ background: "rgba(185,175,160,0.1)" }}
              >
                {muscle}
              </span>
            ))}
          </div>
        </div>

        {/* Instructions */}
        <div className="space-y-1.5">
          <div className="flex items-center gap-1.5">
            <ListOrdered
              size={12}
              strokeWidth={2}
              className="text-stone opacity-60"
            />
            <p className="font-display text-xs font-semibold uppercase tracking-[0.1em] text-stone opacity-70">
              Instructions
            </p>
          </div>
          <ol className="space-y-1.5">
            {exercise.instructions.map((step, i) => (
              <li
                key={step}
                className="flex gap-2 text-sm text-stone leading-relaxed"
              >
                <span className="font-display text-xs font-semibold text-sage shrink-0">
                  {i + 1}.
                </span>
                {step}
              </li>
            ))}
          </ol>
        </div>

        {/* Benefits */}
        <div className="space-y-1.5">
          <div className="flex items-center gap-1.5">
            <Sparkles
              size={12}
              strokeWidth={2}
              className="text-stone opacity-60"
            />
            <p className="font-display text-xs font-semibold uppercase tracking-[0.1em] text-stone opacity-70">
              Benefits
            </p>
          </div>
          <ul className="space-y-1">
            {exercise.benefits.map((benefit) => (
              <li
                key={benefit}
                className="flex items-start gap-2 text-sm text-stone"
              >
                <span
                  className="mt-1.5 w-1 h-1 rounded-full bg-sage shrink-0"
                  aria-hidden="true"
                />
                {benefit}
              </li>
            ))}
          </ul>
        </div>

        <MorningFlowControls
          isPaused={isPaused}
          isFirstExercise={isFirstExercise}
          isLastExercise={isLastExercise}
          onPrevious={onPrevious}
          onNext={onNext}
          onSkip={onSkip}
          onTogglePause={onTogglePause}
          onFinish={onFinish}
        />
      </PageContainer>
    </>
  );
}
