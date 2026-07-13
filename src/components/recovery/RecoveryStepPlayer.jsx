import { ChevronLeft, ChevronRight } from "lucide-react";
import PageContainer from "../layout/PageContainer";
import FeatureHeader from "../layout/FeatureHeader";

export default function RecoveryStepPlayer({
  step,
  currentIndex,
  totalSteps,
  onNext,
  onPrevious,
}) {
  const isLastStep = currentIndex === totalSteps - 1;
  const progressPct = ((currentIndex + 1) / totalSteps) * 100;

  return (
    <>
      <FeatureHeader title={step.title} />
      <PageContainer className="flex flex-1 flex-col">
        <span className="font-display text-sm font-medium text-stone">
          {currentIndex + 1} / {totalSteps}
        </span>

        <div className="mt-3 h-1.5 w-full overflow-hidden rounded-full bg-border">
          <div
            className="h-full rounded-full bg-dew transition-all duration-500 ease-out"
            style={{ width: `${progressPct}%` }}
          />
        </div>

        <div className="flex flex-1 flex-col items-center justify-center gap-6 py-8 text-center">
          <span className="flex h-16 w-16 items-center justify-center rounded-full bg-dew/15">
            <span className="font-display text-xl font-semibold text-dew">
              {currentIndex + 1}
            </span>
          </span>
          <p className="max-w-xs leading-relaxed text-stone">
            {step.instruction}
          </p>
        </div>

        <div className="flex items-center gap-3 pb-2">
          <button
            onClick={onPrevious}
            disabled={currentIndex === 0}
            className={`flex flex-1 items-center justify-center gap-1.5 rounded-full border py-3.5 font-display font-semibold transition-colors ${
              currentIndex === 0
                ? "cursor-not-allowed border-border text-stone/50"
                : "border-border text-ink hover:border-sage/60"
            }`}
          >
            <ChevronLeft size={18} /> Previous
          </button>
          <button
            onClick={onNext}
            className="flex flex-1 items-center justify-center gap-1.5 rounded-full bg-moss py-3.5 font-display font-semibold text-canvas shadow-soft transition-colors hover:bg-moss-dark"
          >
            {isLastStep ? "Complete" : "Next"} <ChevronRight size={18} />
          </button>
        </div>
      </PageContainer>
    </>
  );
}
