// src/components/morningFlow/MorningFlowExerciseIllustration.jsx
// Large illustration placeholder for the exercise player screen.
// data-illustration-placeholder / data-future-animation-id carry the
// exercise's reserved asset keys so a future illustration/Lottie phase
// has a concrete, already-wired element to target — no restructuring
// needed later.

import { Sparkles } from "lucide-react";

export default function MorningFlowExerciseIllustration({ exercise }) {
  return (
    <div
      className="w-full aspect-square max-h-64 rounded-3xl flex items-center justify-center"
      style={{
        background: "rgba(134,159,138,0.08)",
        border: "1px solid rgba(134,159,138,0.18)",
      }}
      aria-hidden="true"
      data-illustration-placeholder={exercise?.illustrationPlaceholder}
      data-future-animation-id={exercise?.futureAnimationId}
    >
      <Sparkles size={40} strokeWidth={1.2} className="text-sage opacity-40" />
    </div>
  );
}
