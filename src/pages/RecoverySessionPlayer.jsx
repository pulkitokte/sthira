import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Timer } from "lucide-react";
import RecoverySessionIntro from "../components/recovery/RecoverySessionIntro";
import RecoveryStepPlayer from "../components/recovery/RecoveryStepPlayer";
import RecoveryCompletion from "../components/recovery/RecoveryCompletion";
import MissingSelectionState from "../components/common/MissingSelectionState";
import { getSessionById } from "../utils/recovery";
import { RECOVERY_CATEGORIES } from "../data/recoveryCategories";
import { useRecoveryProgress } from "../context/RecoveryProgressContext";
import { useDocumentTitle } from "../hooks/useDocumentTitle";
import { PATHS } from "../constants/navigation";

const STATUS = { INTRO: "intro", ACTIVE: "active", COMPLETED: "completed" };

export default function RecoverySessionPlayer() {
  const { state } = useLocation();
  const navigate = useNavigate();
  const { addCompletion } = useRecoveryProgress();
  const session = state?.sessionId ? getSessionById(state.sessionId) : null;

  const [status, setStatus] = useState(STATUS.INTRO);
  const [currentIndex, setCurrentIndex] = useState(0);

  useDocumentTitle(session ? session.title : "Recovery Session");

  if (!session) {
    return (
      <MissingSelectionState
        icon={Timer}
        heading="No session selected"
        description="Head back to Study Break Recovery and choose a session to begin."
        buttonLabel="Browse Recovery"
        onButtonClick={() => navigate(PATHS.RECOVERY_LIBRARY)}
      />
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
      key={currentIndex}
      step={session.steps[currentIndex]}
      currentIndex={currentIndex}
      totalSteps={totalSteps}
      onNext={handleNext}
      onPrevious={handlePrevious}
    />
  );
}
