import { CheckCircle2 } from "lucide-react";
import PageContainer from "../layout/PageContainer";

export default function RoutineCompletion({
  routine,
  exerciseCount,
  onBackToLibrary,
}) {
  return (
    <PageContainer className="flex flex-1 flex-col items-center justify-center gap-6 text-center">
      <div className="flex h-20 w-20 items-center justify-center rounded-full bg-sage/20">
        <CheckCircle2 size={34} className="text-moss" strokeWidth={1.6} />
      </div>

      <div className="space-y-2">
        <h1 className="font-display text-2xl font-semibold text-ink">
          Morning routine complete.
        </h1>
        <p className="max-w-xs leading-relaxed text-stone">
          {routine.title} — well done taking this time for your body.
        </p>
      </div>

      <div className="flex w-full max-w-xs gap-3">
        <div className="flex-1 rounded-3xl border border-border bg-surface p-4">
          <p className="font-display text-2xl font-semibold text-moss">
            {routine.duration}
          </p>
          <p className="mt-1 text-xs text-stone">Minutes</p>
        </div>
        <div className="flex-1 rounded-3xl border border-border bg-surface p-4">
          <p className="font-display text-2xl font-semibold text-moss">
            {exerciseCount}
          </p>
          <p className="mt-1 text-xs text-stone">Exercises</p>
        </div>
      </div>

      <button
        onClick={onBackToLibrary}
        className="w-full max-w-xs rounded-full bg-moss py-4 font-display font-semibold tracking-wide text-canvas shadow-soft transition-colors hover:bg-moss-dark"
      >
        Back to Library
      </button>
    </PageContainer>
  );
}
