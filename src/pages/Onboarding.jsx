import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useOnboarding } from "../context/OnboardingContext";
import OnboardingShell from "../components/onboarding/OnboardingShell";
import WelcomeStep from "../components/onboarding/steps/WelcomeStep";
import ScheduleStep from "../components/onboarding/steps/ScheduleStep";
import StudyLifestyleStep from "../components/onboarding/steps/StudyLifestyleStep";
import MovementPreferenceStep from "../components/onboarding/steps/MovementPreferenceStep";
import ActivityLevelStep from "../components/onboarding/steps/ActivityLevelStep";
import PrimaryGoalStep from "../components/onboarding/steps/PrimaryGoalStep";
import CompletionStep from "../components/onboarding/steps/CompletionStep";
import { PATHS } from "../constants/navigation";

const STEPS = [
  WelcomeStep,
  ScheduleStep,
  StudyLifestyleStep,
  MovementPreferenceStep,
  ActivityLevelStep,
  PrimaryGoalStep,
  CompletionStep,
];

function canContinue(stepIndex, data) {
  switch (stepIndex) {
    case 0:
      return data.firstName.trim().length > 0;
    case 1:
      return Boolean(data.wakeTime && data.sleepTime);
    case 2:
      return Boolean(data.studyHours);
    case 3:
      return Boolean(data.routineDuration);
    case 4:
      return Boolean(data.activityLevel);
    case 5:
      return Boolean(data.primaryGoal);
    default:
      return true;
  }
}

export default function Onboarding() {
  const [step, setStep] = useState(0);
  const { data, updateField, completeOnboarding } = useOnboarding();
  const navigate = useNavigate();

  const StepComponent = STEPS[step];
  const isLastStep = step === STEPS.length - 1;
  const ready = canContinue(step, data);

  const handleNext = () => {
    if (isLastStep) {
      completeOnboarding();
      navigate(PATHS.HOME, { replace: true });
      return;
    }
    setStep((s) => Math.min(s + 1, STEPS.length - 1));
  };

  const handleBack = () => setStep((s) => Math.max(s - 1, 0));

  return (
    <OnboardingShell
      step={step}
      onBack={step > 0 ? handleBack : null}
      footer={
        <button
          onClick={handleNext}
          disabled={!ready}
          className={`w-full rounded-full py-4 font-display font-semibold tracking-wide shadow-soft transition-colors duration-200 ${
            ready
              ? "bg-moss text-canvas hover:bg-moss-dark"
              : "cursor-not-allowed bg-border text-stone"
          }`}
        >
          {isLastStep ? "Start My Journey" : "Continue"}
        </button>
      }
    >
      <StepComponent data={data} updateField={updateField} />
    </OnboardingShell>
  );
}
