import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import PageContainer from "../components/layout/PageContainer";
import EyeRecoverySessionIntro from "../components/eyeRecovery/EyeRecoverySessionIntro";
import EyeRecoveryStepPlayer from "../components/eyeRecovery/EyeRecoveryStepPlayer";
import EyeRecoveryCompletion from "../components/eyeRecovery/EyeRecoveryCompletion";
import { getEyeSessionById } from "../utils/eyeRecovery";
import { EYE_RECOVERY_CATEGORIES } from "../data/eyeRecoveryCategories";
import { useEyeRecoveryProgress } from "../context/EyeRecoveryProgressContext";
import { PATHS } from "../constants/navigation";

const STATUS = { INTRO: "intro", ACTIVE: "active", COMPLETED: "completed" };

export default function EyeRecoverySessionPlayer() {
  const { state } = useLocation();
  const navigate = useNavigate();
  const { addCompletion } = useEyeRecoveryProgress();
  const session = state?.sessionId ? getEyeSessionById(state.sessionId) : null;

  const [status, setStatus] = useState(STATUS.INTRO);
  const [currentIndex, setCurrentIndex] = useState(0);

  if (!session) {
    return (
      <PageContainer className="flex flex-1 flex-col items-center justify-center gap-4 text-center">
        <h1 className="font-display text-xl font-semibold text-moss">
          No session selected
        </h1>
        <p className="max-w-xs leading-relaxed text-stone">
          Head back to Eye Recovery and choose a session to begin.
        </p>
        <button
          onClick={() => navigate(PATHS.EYE_RELAX)}
          className="rounded-full bg-moss px-6 py-3 font-display font-semibold text-canvas shadow-soft transition-colors hover:bg-moss-dark"
        >
          Browse Eye Recovery
        </button>
      </PageContainer>
    );
  }

  const categoryLabel = EYE_RECOVERY_CATEGORIES.find(
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

  const handleBackToLibrary = () => navigate(PATHS.EYE_RELAX);

  if (status === STATUS.INTRO) {
    return (
      <EyeRecoverySessionIntro
        session={session}
        categoryLabel={categoryLabel}
        onBegin={handleBegin}
      />
    );
  }

  if (status === STATUS.COMPLETED) {
    return (
      <EyeRecoveryCompletion
        session={session}
        onBackToLibrary={handleBackToLibrary}
      />
    );
  }

  return (
    <EyeRecoveryStepPlayer
      key={currentIndex}
      step={session.steps[currentIndex]}
      currentIndex={currentIndex}
      totalSteps={totalSteps}
      onNext={handleNext}
      onPrevious={handlePrevious}
    />
  );
}
