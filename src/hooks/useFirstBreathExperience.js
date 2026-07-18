// src/hooks/useFirstBreathExperience.js
// The "experience controller" — owns step progression only. Completely
// decoupled from routing/navigation; it just calls onComplete when the
// user finishes or skips, and the page decides what that means.

import { useState, useCallback } from "react";
import { FIRST_BREATH_STEPS } from "../constants/firstBreath";

export function useFirstBreathExperience({ onComplete }) {
  const [stepIndex, setStepIndex] = useState(0);

  const totalSteps = FIRST_BREATH_STEPS.length;
  const currentStep = FIRST_BREATH_STEPS[stepIndex];
  const isLastStep = stepIndex === totalSteps - 1;

  const next = useCallback(() => {
    if (isLastStep) {
      onComplete?.();
      return;
    }
    setStepIndex((i) => i + 1);
  }, [isLastStep, onComplete]);

  const skip = useCallback(() => {
    onComplete?.();
  }, [onComplete]);

  return {
    currentStep,
    stepIndex,
    totalSteps,
    isLastStep,
    next,
    skip,
  };
}
