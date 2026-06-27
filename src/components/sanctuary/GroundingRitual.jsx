// src/components/sanctuary/GroundingRitual.jsx
// 5-4-3-2-1 grounding ritual — step-by-step, no timers.
// User advances manually. Calm, spacious UI.

import { GROUNDING_STEPS } from "../../data/sanctuaryData";

// ── Progress dots ────────────────────────────────────────────────────────────

function StepDots({ current, total }) {
  return (
    <div className="flex items-center gap-2 justify-center">
      {[...Array(total)].map((_, i) => (
        <div
          key={i}
          className="rounded-full transition-all duration-500"
          style={{
            width: i === current ? 20 : 6,
            height: 6,
            background:
              i < current
                ? "rgba(134,159,138,0.6)"
                : i === current
                  ? "rgba(134,159,138,0.9)"
                  : "rgba(185,175,160,0.3)",
          }}
        />
      ))}
    </div>
  );
}

// ── Main component ───────────────────────────────────────────────────────────

export default function GroundingRitual({
  currentStep,
  stepIndex,
  isComplete,
  onNext,
  onFinish,
}) {
  if (isComplete) {
    return (
      <div className="flex flex-col items-center justify-center text-center space-y-8 py-8">
        {/* Completion orb */}
        <div
          className="w-20 h-20 rounded-full"
          style={{
            background: "rgba(134,159,138,0.12)",
            border: "1.5px solid rgba(134,159,138,0.3)",
          }}
        />

        <div className="space-y-3 max-w-xs">
          <p className="font-display text-2xl font-light text-ink tracking-tight">
            Grounded.
          </p>
          <p className="text-sm text-stone font-light leading-relaxed">
            You have arrived fully in this moment. That is the whole practice.
          </p>
        </div>

        <button
          onClick={onFinish}
          className="px-8 py-3 rounded-full font-display text-sm font-semibold text-canvas transition-opacity hover:opacity-90"
          style={{ background: "#869F8A" }}
        >
          Return to sanctuary
        </button>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-10">
      {/* Progress dots */}
      <StepDots current={stepIndex} total={GROUNDING_STEPS.length} />

      {/* Step content */}
      <div className="space-y-6 text-center px-2">
        {/* Count orb */}
        <div className="flex justify-center">
          <div
            className="w-16 h-16 rounded-full flex items-center justify-center"
            style={{
              background: "rgba(134,159,138,0.1)",
              border: "1.5px solid rgba(134,159,138,0.28)",
            }}
          >
            <span className="font-display text-2xl font-light text-ink">
              {currentStep.count}
            </span>
          </div>
        </div>

        {/* Instruction */}
        <div className="space-y-3">
          <p
            className="font-display font-light text-ink leading-snug"
            style={{ fontSize: "1.3rem" }}
          >
            {currentStep.instruction}
          </p>
          <p className="text-sm text-stone font-light leading-relaxed max-w-xs mx-auto">
            {currentStep.prompt}
          </p>
        </div>

        {/* Gentle cue */}
        <p className="text-xs text-stone font-light italic opacity-60">
          {currentStep.cue}
        </p>
      </div>

      {/* Next */}
      <div className="flex justify-center">
        <button
          onClick={onNext}
          className="px-10 py-3.5 rounded-full font-display font-semibold text-canvas text-sm tracking-wide transition-opacity hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-offset-2"
          style={{ background: "#869F8A" }}
        >
          {stepIndex < GROUNDING_STEPS.length - 1 ? "Continue" : "Complete"}
        </button>
      </div>

      {/* Sense label */}
      <p className="text-center text-xs text-stone font-light uppercase tracking-widest opacity-40">
        {currentStep.sense} · step {stepIndex + 1} of {GROUNDING_STEPS.length}
      </p>
    </div>
  );
}
