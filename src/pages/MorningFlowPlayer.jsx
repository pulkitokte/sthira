// src/pages/MorningFlowPlayer.jsx
// Router between the Morning Flow player's three screens: Intro, Active
// (per-exercise), and Completed. All state lives in useMorningFlowPlayer.

import { useNavigate } from "react-router-dom";
import {
  useMorningFlowPlayer,
  PLAYER_STATUS,
} from "../hooks/useMorningFlowPlayer";
import MorningFlowIntro from "../components/morningFlow/MorningFlowIntro";
import MorningFlowExercisePlayer from "../components/morningFlow/MorningFlowExercisePlayer";
import MorningFlowCompletion from "../components/morningFlow/MorningFlowCompletion";
import { useDocumentTitle } from "../hooks/useDocumentTitle";
import { PATHS } from "../constants/navigation";

export default function MorningFlowPlayer() {
  const navigate = useNavigate();
  useDocumentTitle("Morning Flow");

  const {
    status,
    currentExercise,
    currentIndex,
    totalExercises,
    indexWithinCategory,
    categoryExerciseCount,
    isPaused,
    completedCount,
    estimatedTotalSeconds,
    begin,
    goNext,
    goPrevious,
    skipExercise,
    togglePause,
    finishWorkout,
    restart,
  } = useMorningFlowPlayer();

  if (status === PLAYER_STATUS.INTRO) {
    return (
      <MorningFlowIntro
        totalExercises={totalExercises}
        estimatedTotalSeconds={estimatedTotalSeconds}
        onBegin={begin}
      />
    );
  }

  if (status === PLAYER_STATUS.COMPLETED) {
    return (
      <MorningFlowCompletion
        completedCount={completedCount}
        totalExercises={totalExercises}
        estimatedSeconds={estimatedTotalSeconds}
        onReturnHome={() => navigate(PATHS.HOME)}
        onRestart={restart}
      />
    );
  }

  return (
    <MorningFlowExercisePlayer
      key={currentIndex}
      exercise={currentExercise}
      categoryLabel={currentExercise?.categoryLabel}
      currentIndex={currentIndex}
      totalExercises={totalExercises}
      indexWithinCategory={indexWithinCategory}
      categoryExerciseCount={categoryExerciseCount}
      isPaused={isPaused}
      isFirstExercise={currentIndex === 0}
      isLastExercise={currentIndex === totalExercises - 1}
      onPrevious={goPrevious}
      onNext={goNext}
      onSkip={skipExercise}
      onTogglePause={togglePause}
      onFinish={finishWorkout}
    />
  );
}
