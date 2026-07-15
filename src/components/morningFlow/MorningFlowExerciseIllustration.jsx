// src/components/morningFlow/MorningFlowExerciseIllustration.jsx
// Renders the registered illustration for the current exercise, if one
// exists, falling back to the original placeholder icon otherwise (so
// any future exercise added without an illustration yet degrades
// gracefully instead of breaking).
// data-illustration-placeholder / data-future-animation-id are preserved
// unchanged as reserved hooks for a future asset/animation phase.

import { Sparkles } from "lucide-react";
import { MORNING_FLOW_ILLUSTRATIONS } from "../../data/morningFlowIllustrations";

export default function MorningFlowExerciseIllustration({ exercise }) {
  const Illustration = exercise?.id
    ? MORNING_FLOW_ILLUSTRATIONS[exercise.id]
    : null;

  return (
    <div
      className="w-full aspect-square max-h-64 rounded-3xl flex items-center justify-center p-8"
      style={{
        background: "rgba(134,159,138,0.08)",
        border: "1px solid rgba(134,159,138,0.18)",
      }}
      data-illustration-placeholder={exercise?.illustrationPlaceholder}
      data-future-animation-id={exercise?.futureAnimationId}
      aria-hidden={Illustration ? undefined : true}
    >
      {Illustration ? (
        <Illustration />
      ) : (
        <Sparkles
          size={40}
          strokeWidth={1.2}
          className="text-sage opacity-40"
        />
      )}
    </div>
  );
}
