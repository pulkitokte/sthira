import { ArrowLeft } from "lucide-react";
import ProgressDots from "./ProgressDots";
import { TOTAL_STEPS } from "../../constants/onboarding";

export default function OnboardingShell({ step, onBack, children, footer }) {
  return (
    <div className="flex flex-1 flex-col">
      <div className="flex items-center gap-3 px-6 pt-6">
        {onBack ? (
          <button
            onClick={onBack}
            aria-label="Go back"
            className="-ml-2 rounded-full p-2 text-stone transition-colors hover:bg-moss/10 hover:text-moss"
          >
            <ArrowLeft size={19} strokeWidth={2} />
          </button>
        ) : (
          <span className="w-9" />
        )}
        <div className="flex flex-1 justify-center">
          <ProgressDots total={TOTAL_STEPS} current={step} />
        </div>
        <span className="w-9" />
      </div>

      <main className="flex flex-1 flex-col px-6 py-8">{children}</main>

      {footer && <div className="px-6 pb-8 pt-2">{footer}</div>}
    </div>
  );
}
