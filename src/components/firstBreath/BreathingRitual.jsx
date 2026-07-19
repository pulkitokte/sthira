// src/components/firstBreath/BreathingRitual.jsx
// The Breathing Ritual: one automatic inhale → hold → exhale cycle,
// then waits for the user to tap/activate to continue. Runs exactly
// once — never replays, never auto-advances past the final tap.
// Reuses FirstBreathAnimationWrapper and FirstBreathTransition from
// Phase 1/2 unchanged.

import { useRef, useEffect } from "react";
import FirstBreathAnimationWrapper from "./FirstBreathAnimationWrapper";
import FirstBreathTransition from "./FirstBreathTransition";
import SeedIllustration from "./SeedIllustration";
import BreathCircle from "./BreathCircle";
import { useBreathingRitual } from "../../hooks/useBreathingRitual";

export default function BreathingRitual({ onContinue }) {
  const { phase, isComplete } = useBreathingRitual({ isActive: true });
  const regionRef = useRef(null);

  useEffect(() => {
    if (isComplete) regionRef.current?.focus();
  }, [isComplete]);

  const handleActivate = () => {
    if (isComplete) onContinue();
  };

  const handleKeyDown = (e) => {
    if ((e.key === "Enter" || e.key === " ") && isComplete) {
      e.preventDefault();
      handleActivate();
    }
  };

  return (
    <div
      ref={regionRef}
      role={isComplete ? "button" : undefined}
      tabIndex={isComplete ? 0 : -1}
      onClick={handleActivate}
      onKeyDown={handleKeyDown}
      aria-label={isComplete ? "Continue" : undefined}
      aria-live="polite"
      className={`flex flex-col items-center gap-10 w-full min-h-[70vh] justify-center focus:outline-none ${
        isComplete ? "cursor-pointer" : ""
      }`}
    >
      <FirstBreathAnimationWrapper className="relative h-20 w-20 flex items-center justify-center">
        <BreathCircle phase={phase} />
        <SeedIllustration breathPhase={phase} />
      </FirstBreathAnimationWrapper>

      <div className="min-h-[3.5rem] flex flex-col items-center justify-center gap-4">
        {!isComplete ? (
          <FirstBreathTransition stepKey={phase.id}>
            <p className="font-display text-lg font-light text-ink leading-relaxed">
              {phase.label}
            </p>
          </FirstBreathTransition>
        ) : (
          <FirstBreathTransition stepKey="complete">
            <span className="fb-tap-indicator text-stone opacity-40 text-sm font-display font-light">
              Tap to continue
            </span>
          </FirstBreathTransition>
        )}
      </div>
    </div>
  );
}
