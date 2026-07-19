// src/pages/FirstBreath.jsx
// The First Breath — Phase 2: the emotional atmosphere.
// Interaction model changed per this batch's spec: no traditional
// Next/Continue button. The whole seed+message region is one
// focusable, tappable area — tapping/pressing Enter or Space either
// reveals the current step's message early (skipping its pause) or,
// once revealed, advances to the next step via the exact same next()
// the old button called. useFirstBreathExperience itself is untouched.

import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import FirstBreathLayout from "../components/firstBreath/FirstBreathLayout";
import FirstBreathTransition from "../components/firstBreath/FirstBreathTransition";
import FirstBreathAnimationWrapper from "../components/firstBreath/FirstBreathAnimationWrapper";
import FirstBreathProgressController from "../components/firstBreath/FirstBreathProgressController";
import SeedIllustration from "../components/firstBreath/SeedIllustration";
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

  const { currentStep, stepIndex, totalSteps, next, skip } =
    useFirstBreathExperience({ onComplete: handleComplete });

  const [textVisible, setTextVisible] = useState(false);
  const interactiveRef = useRef(null);

  // Reset and re-arm the reveal pause whenever the step changes.
  useEffect(() => {
    setTextVisible(false);
    const timer = setTimeout(
      () => setTextVisible(true),
      currentStep.revealDelayMs ?? 0,
    );
    return () => clearTimeout(timer);
  }, [currentStep.id, currentStep.revealDelayMs]);

  // Keep keyboard focus on the interactive region as steps change, so
  // keyboard/screen reader users always land somewhere actionable.
  useEffect(() => {
    interactiveRef.current?.focus();
  }, [currentStep.id]);

  const handleAdvance = () => {
    if (!textVisible) {
      setTextVisible(true);
      return;
    }
    next();
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      handleAdvance();
    }
  };

  return (
    <FirstBreathLayout>
      <div
        ref={interactiveRef}
        role="button"
        tabIndex={0}
        onClick={handleAdvance}
        onKeyDown={handleKeyDown}
        aria-label={textVisible ? "Continue" : "Reveal message"}
        className="flex flex-col items-center gap-10 w-full min-h-[70vh] justify-center cursor-pointer focus:outline-none"
      >
        <FirstBreathAnimationWrapper className="h-20 w-20 flex items-center justify-center">
          <SeedIllustration />
        </FirstBreathAnimationWrapper>

        <div className="min-h-[3.5rem] flex items-center justify-center">
          {textVisible && (
            <FirstBreathTransition stepKey={currentStep.id}>
              <p className="font-display text-lg font-light text-ink leading-relaxed whitespace-pre-line max-w-xs">
                {currentStep.text}
              </p>
            </FirstBreathTransition>
          )}
        </div>
      </div>

      <div className="absolute bottom-12 left-0 right-0 flex flex-col items-center gap-3">
        <FirstBreathProgressController
          totalSteps={totalSteps}
          currentStepIndex={stepIndex}
        />
        <span
          className="fb-tap-indicator text-stone opacity-30"
          aria-hidden="true"
        >
          ⌄
        </span>
      </div>

      <button
        onClick={(e) => {
          e.stopPropagation();
          skip();
        }}
        className="absolute top-6 right-6 text-xs text-stone opacity-30 hover:opacity-60 transition-opacity min-h-[44px] px-3"
      >
        Skip
      </button>
    </FirstBreathLayout>
  );
}
