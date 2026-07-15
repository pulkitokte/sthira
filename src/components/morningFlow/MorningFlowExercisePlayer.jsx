// src/components/morningFlow/MorningFlowExercisePlayer.jsx
// The per-exercise screen shown during an active Morning Flow session.
// Polish batch: gentle fade+scale entrance per exercise (via CSS,
// triggered naturally by the parent's key={currentIndex} remount — no
// new dependency, no timer/navigation change), a tiny milestone toast,
// and refined spacing/hierarchy. Timer, countdown, and navigation
// handlers are byte-for-byte unchanged from the previous batch.

import { useMemo } from "react";
import { Clock, Target, Sparkles, ListOrdered } from "lucide-react";
import FeatureHeader from "../layout/FeatureHeader";
import PageContainer from "../layout/PageContainer";
import MorningFlowProgressBar from "./MorningFlowProgressBar";
import MorningFlowMilestoneToast from "./MorningFlowMilestoneToast";
import MorningFlowExerciseIllustration from "./MorningFlowExerciseIllustration";
import GuidanceCard from "./GuidanceCard";
import ExerciseTipsSection from "./ExerciseTipsSection";
import MorningFlowControls from "./MorningFlowControls";
import StepTimer from "../routine/StepTimer";
import { useCountdownTimer } from "../../hooks/useCountdownTimer";
import { parseDurationToSeconds } from "../../utils/morningFlowPlayer";
import { getGuidanceForExercise } from "../../data/morningFlowGuidance";
import { getGuidancePhase } from "../../utils/morningFlowGuidance";
import { getMilestoneMessage } from "../../utils/morningFlowMilestones";

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
    onComplete: onNext,
  });

  const guidance = useMemo(() => getGuidanceForExercise(exercise), [exercise]);
  const guidancePhase = getGuidancePhase(secondsLeft, durationSeconds);
  const guidanceMessage = guidance?.[guidancePhase] ?? null;

  const milestoneMessage = useMemo(
    () => getMilestoneMessage(currentIndex, totalExercises),
    [currentIndex, totalExercises],
  );

  return (
    <>
      <FeatureHeader title={exercise.title} />
      <PageContainer className="mf-fade-scale-in flex flex-col gap-6">
        <MorningFlowProgressBar
          categoryLabel={categoryLabel}
          filledCount={indexWithinCategory + 1}
          totalInCategory={categoryExerciseCount}
          currentIndexGlobal={currentIndex}
          totalGlobal={totalExercises}
        />

        <MorningFlowMilestoneToast message={milestoneMessage} />

        <MorningFlowExerciseIllustration exercise={exercise} />

        <GuidanceCard message={guidanceMessage} />

        <StepTimer secondsLeft={secondsLeft} totalSeconds={durationSeconds} />

        <div className="flex flex-wrap items-center gap-2">
          <span className="rounded-full bg-dew/15 px-2.5 py-1 text-xs font-medium text-dew">
            {exercise.difficulty}
          </span>
          <span className="flex items-center gap-1.5 rounded-full border border-border px-2.5 py-1 text-xs font-medium text-stone">
            <Clock size={11} strokeWidth={2} />
            {exercise.duration}
          </span>
        </div>

        <p className="leading-relaxed text-stone">{exercise.description}</p>

        {/* Target muscles */}
        <div className="space-y-2">
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
        <div className="space-y-2">
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
          <ol className="space-y-2">
            {exercise.instructions.map((step, i) => (
              <li
                key={step}
                className="flex gap-2.5 text-sm text-stone leading-relaxed"
              >
                <span className="font-display text-xs font-semibold text-sage shrink-0 mt-0.5">
                  {i + 1}.
                </span>
                <span>{step}</span>
              </li>
            ))}
          </ol>
        </div>

        {/* Benefits */}
        <div className="space-y-2">
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
          <ul className="space-y-1.5">
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

        <ExerciseTipsSection exercise={exercise} />

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
