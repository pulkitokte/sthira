import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Eye } from "lucide-react";
import EyeRecoverySessionIntro from "../components/eyeRecovery/EyeRecoverySessionIntro";
import EyeRecoveryStepPlayer from "../components/eyeRecovery/EyeRecoveryStepPlayer";
import EyeRecoveryCompletion from "../components/eyeRecovery/EyeRecoveryCompletion";
import MissingSelectionState from "../components/common/MissingSelectionState";
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
      <MissingSelectionState
        icon={Eye}
        heading="No session selected"
        description="Head back to Eye Recovery and choose a session to begin."
        buttonLabel="Browse Eye Recovery"
        onButtonClick={() => navigate(PATHS.EYE_RELAX)}
      />
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
