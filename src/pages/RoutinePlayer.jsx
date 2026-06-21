import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Sunrise } from "lucide-react";
import RoutineIntro from "../components/routine/RoutineIntro";
import ExercisePlayer from "../components/routine/ExercisePlayer";
import RoutineCompletion from "../components/routine/RoutineCompletion";
import MissingSelectionState from "../components/common/MissingSelectionState";
import { getRoutineById } from "../utils/routines";
import { useProgress } from "../context/ProgressContext";
import { useDocumentTitle } from "../hooks/useDocumentTitle";
import { PATHS } from "../constants/navigation";

const STATUS = { INTRO: "intro", ACTIVE: "active", COMPLETED: "completed" };

export default function RoutinePlayer() {
  const { state } = useLocation();
  const navigate = useNavigate();
  const { addCompletion } = useProgress();
  const routine = state?.routineId ? getRoutineById(state.routineId) : null;

  const [status, setStatus] = useState(STATUS.INTRO);
  const [currentIndex, setCurrentIndex] = useState(0);

  useDocumentTitle(routine ? routine.title : "Routine");

  if (!routine) {
    return (
      <MissingSelectionState
        icon={Sunrise}
        heading="No routine selected"
        description="Head back to the library and choose a routine to begin."
        buttonLabel="Browse Library"
        onButtonClick={() => navigate(PATHS.LIBRARY)}
      />
    );
  }

  const totalExercises = routine.exercises.length;

  const handleBegin = () => {
    setCurrentIndex(0);
    setStatus(STATUS.ACTIVE);
  };

  const handleNext = () => {
    const isLastExercise = currentIndex >= totalExercises - 1;
    if (isLastExercise) {
      addCompletion(routine);
      setStatus(STATUS.COMPLETED);
      return;
    }
    setCurrentIndex((i) => i + 1);
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
