// src/components/firstBreath/FirstBreathProgressController.jsx
// Minimal, accessible step-progress indicator. Phase 1: functional only,
// no final visual polish — reuses the existing --accent-soft token
// rather than introducing a new color.

export default function FirstBreathProgressController({
  totalSteps,
  currentStepIndex,
}) {
  return (
    <div
      className="flex items-center gap-1.5"
      role="progressbar"
      aria-valuemin={1}
      aria-valuemax={totalSteps}
      aria-valuenow={currentStepIndex + 1}
      aria-label={`Step ${currentStepIndex + 1} of ${totalSteps}`}
    >
      {Array.from({ length: totalSteps }, (_, i) => (
        <div
          key={i}
          className="h-1.5 w-1.5 rounded-full"
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
