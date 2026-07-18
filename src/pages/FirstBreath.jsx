// src/pages/FirstBreath.jsx
// The First Breath — Phase 1: architecture and flow only. No final
// visuals, illustrations, or animation. Completing or skipping simply
// navigates to Home; the existing (untouched) onboarding redirect in
// App.jsx takes over from there for any user who hasn't finished
// onboarding yet.

import { useNavigate } from "react-router-dom";
import FirstBreathLayout from "../components/firstBreath/FirstBreathLayout";
import FirstBreathTransition from "../components/firstBreath/FirstBreathTransition";
import FirstBreathAnimationWrapper from "../components/firstBreath/FirstBreathAnimationWrapper";
import FirstBreathProgressController from "../components/firstBreath/FirstBreathProgressController";
import Button from "../components/common/Button";
import { useFirstBreathExperience } from "../hooks/useFirstBreathExperience";
import { useFirstBreathStatus } from "../hooks/useFirstBreathStatus";
import { useDocumentTitle } from "../hooks/useDocumentTitle";
import { PATHS } from "../constants/navigation";

export default function FirstBreath() {
  const navigate = useNavigate();
  const { completeFirstBreath } = useFirstBreathStatus();
  useDocumentTitle("Welcome");

  const handleComplete = () => {
    completeFirstBreath();
    navigate(PATHS.HOME, { replace: true });
  };

  const { currentStep, stepIndex, totalSteps, isLastStep, next, skip } =
    useFirstBreathExperience({ onComplete: handleComplete });

  return (
    <FirstBreathLayout>
      <FirstBreathAnimationWrapper className="mb-8 h-24 w-24" />

      <FirstBreathTransition stepKey={currentStep.id}>
        <p className="font-display text-lg font-light text-ink">
          {currentStep.text}
        </p>
      </FirstBreathTransition>

      <div className="mt-10 flex flex-col items-center gap-5">
        <FirstBreathProgressController
          totalSteps={totalSteps}
          currentStepIndex={stepIndex}
        />

        <Button variant="primary" onClick={next}>
          {isLastStep ? "Enter Sthira" : "Continue"}
        </Button>

        <button
          onClick={skip}
          className="text-xs text-stone font-light underline underline-offset-2 min-h-[44px] px-2"
        >
          Skip
        </button>
      </div>
    </FirstBreathLayout>
  );
}
