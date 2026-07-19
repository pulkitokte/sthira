// src/pages/FirstBreath.jsx
// The First Breath — Phase 3: the flow is now
//   Seed + opening message → Breathing Ritual → Continue
// The message stage's tap/reveal/advance interaction is unchanged from
// Phase 2. What changed: the message step's completion now advances
// into the Breathing Ritual instead of finishing the experience
// directly. Skip (top-right) always finishes the whole experience
// immediately, regardless of which stage the user is in.

import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import FirstBreathLayout from "../components/firstBreath/FirstBreathLayout";
import FirstBreathTransition from "../components/firstBreath/FirstBreathTransition";
import FirstBreathAnimationWrapper from "../components/firstBreath/FirstBreathAnimationWrapper";
import FirstBreathProgressController from "../components/firstBreath/FirstBreathProgressController";
import SeedIllustration from "../components/firstBreath/SeedIllustration";
import BreathingRitual from "../components/firstBreath/BreathingRitual";
import { useFirstBreathExperience } from "../hooks/useFirstBreathExperience";
import { useFirstBreathStatus } from "../hooks/useFirstBreathStatus";
import { useDocumentTitle } from "../hooks/useDocumentTitle";
import { PATHS } from "../constants/navigation";

const STAGE = { MESSAGE: "message", BREATHING: "breathing" };

export default function FirstBreath() {
  const navigate = useNavigate();
  const { completeFirstBreath } = useFirstBreathStatus();
  useDocumentTitle("Welcome");

  const [stage, setStage] = useState(STAGE.MESSAGE);

  const handleComplete = () => {
    completeFirstBreath();
    navigate(PATHS.HOME, { replace: true });
  };

  // The message step's onComplete no longer finishes the experience —
  // it advances into the breathing ritual. useFirstBreathExperience
  // itself is completely unchanged from Phase 1/2.
  const { currentStep, stepIndex, totalSteps, next } = useFirstBreathExperience(
    { onComplete: () => setStage(STAGE.BREATHING) },
  );

  const [textVisible, setTextVisible] = useState(false);
  const interactiveRef = useRef(null);

  useEffect(() => {
    if (stage !== STAGE.MESSAGE) return undefined;
    setTextVisible(false);
    const timer = setTimeout(
      () => setTextVisible(true),
      currentStep.revealDelayMs ?? 0,
    );
    return () => clearTimeout(timer);
  }, [stage, currentStep.id, currentStep.revealDelayMs]);

  useEffect(() => {
    if (stage === STAGE.MESSAGE) interactiveRef.current?.focus();
  }, [stage, currentStep.id]);

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
      {stage === STAGE.MESSAGE && (
        <>
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

          {totalSteps > 1 && (
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
          )}
        </>
      )}

      {stage === STAGE.BREATHING && (
        <BreathingRitual onContinue={handleComplete} />
      )}

      <button
        onClick={(e) => {
          e.stopPropagation();
          handleComplete();
        }}
        className="absolute top-6 right-6 text-xs text-stone opacity-30 hover:opacity-60 transition-opacity min-h-[44px] px-3"
      >
        Skip
      </button>
    </FirstBreathLayout>
  );
}
