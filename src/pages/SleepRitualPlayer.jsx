import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Moon } from "lucide-react";
import PageContainer from "../components/layout/PageContainer";
import SleepStepPlayer from "../components/sleep/SleepStepPlayer";
import MissingSelectionState from "../components/common/MissingSelectionState";
import { getSleepRitualById, getBedtimeReflection } from "../data/sleepRituals";
import { useDocumentTitle } from "../hooks/useDocumentTitle";
import { PATHS } from "../constants/navigation";

const STATUS = { INTRO: "intro", ACTIVE: "active", COMPLETED: "completed" };

export default function SleepRitualPlayer() {
  const { state } = useLocation();
  const navigate = useNavigate();
  const ritual = state?.ritualId ? getSleepRitualById(state.ritualId) : null;

  const [status, setStatus] = useState(STATUS.INTRO);
  const [currentIndex, setCurrentIndex] = useState(0);

  useDocumentTitle(ritual ? ritual.title : "Sleep Wind-Down");

  if (!ritual) {
    return (
      <MissingSelectionState
        icon={Moon}
        heading="No ritual selected"
        description="Head back to Sleep Wind-Down and choose a ritual to begin."
        buttonLabel="Browse Wind-Down Rituals"
        onButtonClick={() => navigate(PATHS.SLEEP_WIND_DOWN)}
      />
    );
  }

  const totalSteps = ritual.steps.length;
  const reflection = getBedtimeReflection(ritual.id);

  const handleBegin = () => {
    setCurrentIndex(0);
    setStatus(STATUS.ACTIVE);
  };

  const handleNext = () => {
    if (currentIndex >= totalSteps - 1) {
      setStatus(STATUS.COMPLETED);
      return;
    }
    setCurrentIndex((i) => i + 1);
  };

  const handlePrevious = () => {
    setCurrentIndex((i) => Math.max(i - 1, 0));
  };

  // ── INTRO ─────────────────────────────────────────────────────────────────
  if (status === STATUS.INTRO) {
    return (
      <PageContainer className="flex flex-1 flex-col gap-8">
        <div>
          <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-clay/15">
            <Moon
              size={24}
              className="text-clay"
              strokeWidth={1.6}
              aria-hidden="true"
            />
          </div>
          <h1 className="font-display text-[26px] font-semibold leading-snug text-ink">
            {ritual.title}
          </h1>
          <p className="mt-3 leading-relaxed text-stone">
            {ritual.description}
          </p>

          <div className="mt-5 flex flex-wrap gap-2">
            <span className="rounded-full border border-border px-3 py-1 text-xs font-medium text-stone">
              {ritual.duration} minutes
            </span>
            <span className="rounded-full border border-border px-3 py-1 text-xs font-medium text-stone">
              {totalSteps} step{totalSteps !== 1 ? "s" : ""}
            </span>
          </div>
        </div>

        <div className="rounded-3xl border border-border bg-canvas px-5 py-4">
          <p className="text-sm leading-relaxed text-stone">
            Move through each step at your own pace. There is no hurry here.
          </p>
        </div>

        <div className="mt-auto">
          <p className="mb-3 text-center text-xs text-stone">
            Dim your screen brightness before you begin.
          </p>
          <button
            onClick={handleBegin}
            className="w-full rounded-full bg-clay/80 py-4 font-display font-semibold tracking-wide text-canvas shadow-soft transition-colors hover:bg-clay"
          >
            Begin Wind-Down
          </button>
        </div>
      </PageContainer>
    );
  }

  // ── COMPLETED ─────────────────────────────────────────────────────────────
  if (status === STATUS.COMPLETED) {
    return (
      <PageContainer className="flex flex-1 flex-col items-center justify-center gap-6 text-center">
        <div className="flex h-20 w-20 items-center justify-center rounded-full bg-clay/15">
          <Moon
            size={34}
            className="text-clay"
            strokeWidth={1.6}
            aria-hidden="true"
          />
        </div>

        <div className="space-y-2">
          <h1 className="font-display text-2xl font-semibold text-ink">
            {ritual.title} complete.
          </h1>
          <p className="max-w-xs leading-relaxed text-stone">{reflection}</p>
        </div>

        <div className="rounded-3xl border border-border bg-canvas px-6 py-5 text-center">
          <p className="text-sm leading-relaxed text-stone">
            There is nothing left to do tonight. Let the body rest.
          </p>
        </div>

        <button
          onClick={() => navigate(PATHS.SLEEP_WIND_DOWN)}
          className="w-full max-w-xs rounded-full bg-clay/80 py-4 font-display font-semibold tracking-wide text-canvas shadow-soft transition-colors hover:bg-clay"
        >
          Back to Wind-Down
        </button>
      </PageContainer>
    );
  }

  // ── ACTIVE ────────────────────────────────────────────────────────────────
  return (
    <SleepStepPlayer
      step={ritual.steps[currentIndex]}
      currentIndex={currentIndex}
      totalSteps={totalSteps}
      onNext={handleNext}
      onPrevious={handlePrevious}
    />
  );
}
