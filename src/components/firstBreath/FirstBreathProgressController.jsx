// src/components/firstBreath/FirstBreathProgressController.jsx
// Minimal, accessible step-progress indicator.
// Phase 2: made more subtle (smaller dots, reduced opacity) to match
// the immersive, non-onboarding-like feel of this experience. Same
// props/API as Phase 1 — no consumer needs to change.

export default function FirstBreathProgressController({
  totalSteps,
  currentStepIndex,
}) {
  return (
    <div
      className="flex items-center gap-1.5 opacity-50"
      role="progressbar"
      aria-valuemin={1}
      aria-valuemax={totalSteps}
      aria-valuenow={currentStepIndex + 1}
      aria-label={`Step ${currentStepIndex + 1} of ${totalSteps}`}
    >
      {Array.from({ length: totalSteps }, (_, i) => (
        <div
          key={i}
          className="h-1 w-1 rounded-full transition-colors duration-300"
          style={{
            background:
              i <= currentStepIndex
                ? "var(--accent-soft)"
                : "rgba(185,175,160,0.25)",
          }}
        />
      ))}
    </div>
  );
}
