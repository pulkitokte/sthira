// src/components/morningFlow/MorningFlowSessionSummary.jsx
// Stat tiles shown on the completion screen. Extracted separately from
// MorningFlowCompletion so summary display logic stays reusable and
// isolated from the completion screen's layout/buttons/quote.

import { CheckCircle2, Clock } from "lucide-react";
import { formatEstimatedTime } from "../../utils/morningFlowPlayer";

export default function MorningFlowSessionSummary({
  completedCount,
  totalExercises,
  estimatedSeconds,
}) {
  return (
    <div className="grid grid-cols-2 gap-3 w-full max-w-xs">
      <div className="rounded-2xl bg-surface p-4 text-center shadow-soft">
        <CheckCircle2
          size={18}
          className="mx-auto text-sage"
          strokeWidth={1.8}
        />
        <p className="mt-2 font-display text-lg font-semibold text-ink">
          {completedCount}/{totalExercises}
        </p>
        <p className="text-xs text-stone font-light">Exercises</p>
      </div>
      <div className="rounded-2xl bg-surface p-4 text-center shadow-soft">
        <Clock size={18} className="mx-auto text-dew" strokeWidth={1.8} />
        <p className="mt-2 font-display text-lg font-semibold text-ink">
          {formatEstimatedTime(estimatedSeconds)}
        </p>
        <p className="text-xs text-stone font-light">Estimated Time</p>
      </div>
    </div>
  );
}
