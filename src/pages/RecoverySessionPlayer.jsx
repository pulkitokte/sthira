import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import PageContainer from "../components/layout/PageContainer";
import RecoverySessionIntro from "../components/recovery/RecoverySessionIntro";
import RecoveryStepPlayer from "../components/recovery/RecoveryStepPlayer";
import RecoveryCompletion from "../components/recovery/RecoveryCompletion";
import { getSessionById } from "../utils/recovery";
import { RECOVERY_CATEGORIES } from "../data/recoveryCategories";
import { useRecoveryProgress } from "../context/RecoveryProgressContext";
import { PATHS } from "../constants/navigation";

const STATUS = { INTRO: "intro", ACTIVE: "active", COMPLETED: "completed" };

export default function RecoverySessionPlayer() {
  const { state } = useLocation();
  const navigate = useNavigate();
  const { addCompletion } = useRecoveryProgress();
  const session = state?.sessionId ? getSessionById(state.sessionId) : null;

  const [status, setStatus] = useState(STATUS.INTRO);
  const [currentIndex, setCurrentIndex] = useState(0);

  if (!session) {
    return (
      <PageContainer className="flex flex-1 flex-col items-center justify-center gap-4 text-center">
        <h1 className="font-display text-xl font-semibold text-moss">
          No session selected
        </h1>
        <p className="max-w-xs leading-relaxed text-stone">
          Head back to the Recovery Library and choose a session to begin.
        </p>
        <button
          onClick={() => navigate(PATHS.RECOVERY_LIBRARY)}
          className="rounded-full bg-moss px-6 py-3 font-display font-semibold text-canvas shadow-soft transition-colors hover:bg-moss-dark"
        >
          Browse Recovery Library
        </button>
      </PageContainer>
    );
  }

  const categoryLabel = RECOVERY_CATEGORIES.find(
    (c) => c.id === session.categoryId,
  )?.label;
  const totalSteps = session.steps.length;

  const handleBegin = () => {
    setCurrentIndex(0);
    setStatus(STATUS.ACTIVE);
  };

  const handleNext = () => {
    const isLastStep = currentIndex >= totalSteps - 1;
    if (isLastStep) {
      addCompletion(session);
      setStatus(STATUS.COMPLETED);
      return;
    }
    setCurrentIndex((i) => i + 1);
  };

  const handlePrevious = () => setCurrentIndex((i) => Math.max(i - 1, 0));

  const handleBackToLibrary = () => navigate(PATHS.RECOVERY_LIBRARY);

  if (status === STATUS.INTRO) {
    return (
      <RecoverySessionIntro
        session={session}
        categoryLabel={categoryLabel}
        onBegin={handleBegin}
      />
    );
  }

  if (status === STATUS.COMPLETED) {
    return (
      <RecoveryCompletion
        session={session}
        onBackToLibrary={handleBackToLibrary}
      />
    );
  }

  return (
    <RecoveryStepPlayer
      step={session.steps[currentIndex]}
      currentIndex={currentIndex}
      totalSteps={totalSteps}
      onNext={handleNext}
      onPrevious={handlePrevious}
    />
  );
}
