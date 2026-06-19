import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import PageContainer from "../components/layout/PageContainer";
import RoutineIntro from "../components/routine/RoutineIntro";
import ExercisePlayer from "../components/routine/ExercisePlayer";
import RoutineCompletion from "../components/routine/RoutineCompletion";
import { getRoutineById } from "../utils/routines";
import { PATHS } from "../constants/navigation";

const STATUS = { INTRO: "intro", ACTIVE: "active", COMPLETED: "completed" };

export default function RoutinePlayer() {
  const { state } = useLocation();
  const navigate = useNavigate();
  const routine = state?.routineId ? getRoutineById(state.routineId) : null;

  const [status, setStatus] = useState(STATUS.INTRO);
  const [currentIndex, setCurrentIndex] = useState(0);

  if (!routine) {
    return (
      <PageContainer className="flex flex-1 flex-col items-center justify-center gap-4 text-center">
        <h1 className="font-display text-xl font-semibold text-moss">
          No routine selected
        </h1>
        <p className="max-w-xs leading-relaxed text-stone">
          Head back to the library and choose a routine to begin.
        </p>
        <button
          onClick={() => navigate(PATHS.LIBRARY)}
          className="rounded-full bg-moss px-6 py-3 font-display font-semibold text-canvas shadow-soft transition-colors hover:bg-moss-dark"
        >
          Browse Library
        </button>
      </PageContainer>
    );
  }

  const totalExercises = routine.exercises.length;

  const handleBegin = () => {
    setCurrentIndex(0);
    setStatus(STATUS.ACTIVE);
  };

  const handleNext = () => {
    setCurrentIndex((i) => {
      if (i >= totalExercises - 1) {
        setStatus(STATUS.COMPLETED);
        return i;
      }
      return i + 1;
    });
  };

  const handlePrevious = () => {
    setCurrentIndex((i) => Math.max(i - 1, 0));
  };

  const handleBackToLibrary = () => navigate(PATHS.LIBRARY);

  if (status === STATUS.INTRO) {
    return <RoutineIntro routine={routine} onBegin={handleBegin} />;
  }

  if (status === STATUS.COMPLETED) {
    return (
      <RoutineCompletion
        routine={routine}
        exerciseCount={totalExercises}
        onBackToLibrary={handleBackToLibrary}
      />
    );
  }

  return (
    <ExercisePlayer
      key={currentIndex}
      exercise={routine.exercises[currentIndex]}
      currentIndex={currentIndex}
      totalExercises={totalExercises}
      onNext={handleNext}
      onPrevious={handlePrevious}
    />
  );
}
