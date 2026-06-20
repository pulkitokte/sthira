import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ChevronRight, Trash2 } from "lucide-react";
import PageContainer from "../components/layout/PageContainer";
import { useProgress } from "../context/ProgressContext";
import { useHydration } from "../context/HydrationContext";
import { PATHS } from "../constants/navigation";

const LINKS = [
  { label: "Completion History", path: PATHS.HISTORY },
  { label: "Hydration History", path: PATHS.HYDRATION_HISTORY },
  { label: "Reminders", path: PATHS.REMINDERS },
  { label: "Replay onboarding", path: PATHS.ONBOARDING },
];

export default function Settings() {
  const navigate = useNavigate();
  const { resetProgress } = useProgress();
  const { goal, updateGoal, resetHydrationHistory } = useHydration();

  const [confirmingReset, setConfirmingReset] = useState(false);
  const [confirmingHydrationReset, setConfirmingHydrationReset] =
    useState(false);
  const [isEditingGoal, setIsEditingGoal] = useState(false);
  const [goalInput, setGoalInput] = useState(String(goal));

  const handleConfirmReset = () => {
    resetProgress();
    setConfirmingReset(false);
  };

  const handleSaveGoal = () => {
    const value = parseInt(goalInput, 10);
    if (value > 0) {
      updateGoal(value);
      setIsEditingGoal(false);
    }
  };

  const handleCancelGoalEdit = () => {
    setGoalInput(String(goal));
    setIsEditingGoal(false);
  };

  const handleConfirmHydrationReset = () => {
    resetHydrationHistory();
    setConfirmingHydrationReset(false);
  };

  return (
    <PageContainer className="flex flex-col gap-3">
      {LINKS.map(({ label, path }) => (
        <button
          key={path}
          onClick={() => navigate(path)}
          className="flex items-center justify-between rounded-2xl bg-surface p-4 text-left shadow-soft"
        >
          <span className="font-display text-base font-medium text-ink">
            {label}
          </span>
          <ChevronRight size={18} className="text-stone" />
        </button>
      ))}

      <div className="mt-3 rounded-2xl border border-border bg-surface p-4">
        {!isEditingGoal ? (
          <button
            onClick={() => setIsEditingGoal(true)}
            className="flex w-full items-center justify-between text-left"
          >
            <div>
              <span className="font-display text-base font-medium text-ink">
                Daily hydration goal
              </span>
              <p className="mt-0.5 text-xs text-stone">{goal} ml per day</p>
            </div>
            <ChevronRight size={18} className="text-stone" />
          </button>
        ) : (
          <div className="space-y-3">
            <p className="font-display text-sm font-medium text-ink">
              Daily hydration goal (ml)
            </p>
            <input
              type="number"
              inputMode="numeric"
              min="1"
              value={goalInput}
              onChange={(e) => setGoalInput(e.target.value)}
              autoFocus
              className="w-full rounded-2xl border border-border bg-canvas px-4 py-3 text-ink focus:border-dew focus:outline-none"
            />
            <div className="flex gap-2">
              <button
                onClick={handleCancelGoalEdit}
                className="flex-1 rounded-full border border-border py-2.5 font-display text-sm font-semibold text-ink"
              >
                Cancel
              </button>
              <button
                onClick={handleSaveGoal}
                className="flex-1 rounded-full bg-moss py-2.5 font-display text-sm font-semibold text-canvas"
              >
                Save
              </button>
            </div>
          </div>
        )}
      </div>

      <div className="rounded-2xl border border-border bg-surface p-4">
        {!confirmingHydrationReset ? (
          <button
            onClick={() => setConfirmingHydrationReset(true)}
            className="flex w-full items-center justify-between text-left"
          >
            <span className="font-display text-base font-medium text-clay">
              Reset Hydration History
            </span>
            <Trash2 size={18} className="text-clay" />
          </button>
        ) : (
          <div className="space-y-3">
            <p className="text-sm leading-relaxed text-stone">
              This clears your hydration log. Your daily goal stays the same.
              This can't be undone.
            </p>
            <div className="flex gap-2">
              <button
                onClick={() => setConfirmingHydrationReset(false)}
                className="flex-1 rounded-full border border-border py-2.5 font-display text-sm font-semibold text-ink"
              >
                Cancel
              </button>
              <button
                onClick={handleConfirmHydrationReset}
                className="flex-1 rounded-full bg-clay py-2.5 font-display text-sm font-semibold text-canvas"
              >
                Reset
              </button>
            </div>
          </div>
        )}
      </div>

      <div className="rounded-2xl border border-border bg-surface p-4">
        {!confirmingReset ? (
          <button
            onClick={() => setConfirmingReset(true)}
            className="flex w-full items-center justify-between text-left"
          >
            <span className="font-display text-base font-medium text-clay">
              Reset Progress
            </span>
            <Trash2 size={18} className="text-clay" />
          </button>
        ) : (
          <div className="space-y-3">
            <p className="text-sm leading-relaxed text-stone">
              This clears your streaks and completion history. Your onboarding
              setup stays the same. This can't be undone.
            </p>
            <div className="flex gap-2">
              <button
                onClick={() => setConfirmingReset(false)}
                className="flex-1 rounded-full border border-border py-2.5 font-display text-sm font-semibold text-ink"
              >
                Cancel
              </button>
              <button
                onClick={handleConfirmReset}
                className="flex-1 rounded-full bg-clay py-2.5 font-display text-sm font-semibold text-canvas"
              >
                Reset
              </button>
            </div>
          </div>
        )}
      </div>

      <p className="px-1 text-sm text-stone">
        More preferences are coming soon.
      </p>
    </PageContainer>
  );
}
