import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ChevronRight, Trash2 } from "lucide-react";
import PageContainer from "../components/layout/PageContainer";
import { useProgress } from "../context/ProgressContext";
import { useHydration } from "../context/HydrationContext";
import { useEyeRecoveryProgress } from "../context/EyeRecoveryProgressContext";
import { useWellness } from "../context/WellnessContext";
import { useJourney } from "../context/JourneyContext";
import { useAchievements } from "../context/AchievementsContext";
import { useDocumentTitle } from "../hooks/useDocumentTitle";
import { PATHS } from "../constants/navigation";

const LINKS = [
  { label: "Letters to Self", path: PATHS.LETTERS },
  { label: "Emotional Weather", path: PATHS.EMOTIONAL_WEATHER },
  { label: "Daily Wisdom", path: PATHS.WISDOM },
  { label: "Digital Sanctuary", path: PATHS.SANCTUARY },
  { label: "Gratitude Garden", path: PATHS.GRATITUDE_GARDEN },
  { label: "Evening Reflection", path: PATHS.EVENING_REFLECTION },
  { label: "Mood Journal", path: PATHS.MOOD_JOURNAL },
  { label: "Mindful Breathing", path: PATHS.BREATHING },
  { label: "Sleep Wind-Down", path: PATHS.SLEEP_WIND_DOWN },
  { label: "Focus Sessions", path: PATHS.FOCUS_SESSIONS },
  { label: "Wellness Insights", path: PATHS.WELLNESS_INSIGHTS },
  { label: "Achievements", path: PATHS.ACHIEVEMENTS },
  { label: "Weekly Reflection", path: PATHS.WEEKLY_REFLECTION },
  { label: "Completion History", path: PATHS.HISTORY },
  { label: "Hydration History", path: PATHS.HYDRATION_HISTORY },
  { label: "Reminders", path: PATHS.REMINDERS },
  { label: "About Sthira", path: PATHS.ABOUT },
  { label: "Replay onboarding", path: PATHS.ONBOARDING },
];

export default function Settings() {
  const navigate = useNavigate();
  const { resetProgress } = useProgress();
  const { goal, isCustomGoal, updateGoal, resetHydrationHistory } =
    useHydration();
  const { resetEyeRecoveryProgress } = useEyeRecoveryProgress();
  const { resetWellnessData } = useWellness();
  const { resetJourney } = useJourney();
  const { resetAchievements } = useAchievements();

  useDocumentTitle("Settings");

  const [confirmingReset, setConfirmingReset] = useState(false);
  const [confirmingHydrationReset, setConfirmingHydrationReset] =
    useState(false);
  const [confirmingEyeReset, setConfirmingEyeReset] = useState(false);
  const [confirmingWellnessReset, setConfirmingWellnessReset] = useState(false);
  const [confirmingJourneyReset, setConfirmingJourneyReset] = useState(false);
  const [confirmingAchievementsReset, setConfirmingAchievementsReset] =
    useState(false);
  const [isEditingGoal, setIsEditingGoal] = useState(false);
  const [goalInput, setGoalInput] = useState(String(goal));

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

      {/* Hydration goal */}
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
              <p className="mt-0.5 text-xs text-stone">
                {goal} ml per day ·{" "}
                {isCustomGoal ? "custom" : "suggested for you"}
              </p>
            </div>
            <ChevronRight size={18} className="text-stone" />
          </button>
        ) : (
          <div className="space-y-3">
            <label
              htmlFor="hydration-goal-input"
              className="block font-display text-sm font-medium text-ink"
            >
              Daily hydration goal (ml)
            </label>
            <input
              id="hydration-goal-input"
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

      {[
        {
          key: "achievements",
          confirming: confirmingAchievementsReset,
          setConfirming: setConfirmingAchievementsReset,
          label: "Reset Achievements",
          description:
            "This clears all earned milestones. You can earn them again. This can't be undone.",
          onConfirm: () => {
            resetAchievements();
            setConfirmingAchievementsReset(false);
          },
        },
        {
          key: "journey",
          confirming: confirmingJourneyReset,
          setConfirming: setConfirmingJourneyReset,
          label: "Reset Journey Progress",
          description:
            "This clears today's journey check-ins. All other data stays the same. This can't be undone.",
          onConfirm: () => {
            resetJourney();
            setConfirmingJourneyReset(false);
          },
        },
        {
          key: "hydration",
          confirming: confirmingHydrationReset,
          setConfirming: setConfirmingHydrationReset,
          label: "Reset Hydration History",
          description:
            "This clears your hydration log. Your daily goal stays the same. This can't be undone.",
          onConfirm: () => {
            resetHydrationHistory();
            setConfirmingHydrationReset(false);
          },
        },
        {
          key: "eye",
          confirming: confirmingEyeReset,
          setConfirming: setConfirmingEyeReset,
          label: "Reset Eye Recovery Progress",
          description:
            "This clears your eye recovery completion history. Other data stays the same. This can't be undone.",
          onConfirm: () => {
            resetEyeRecoveryProgress();
            setConfirmingEyeReset(false);
          },
        },
        {
          key: "wellness",
          confirming: confirmingWellnessReset,
          setConfirming: setConfirmingWellnessReset,
          label: "Reset Wellness Data",
          description:
            "This clears your daily check-ins and insight history. Other data stays the same. This can't be undone.",
          onConfirm: () => {
            resetWellnessData();
            setConfirmingWellnessReset(false);
          },
        },
        {
          key: "progress",
          confirming: confirmingReset,
          setConfirming: setConfirmingReset,
          label: "Reset Progress",
          description:
            "This clears your streaks and completion history. Your onboarding stays the same. This can't be undone.",
          onConfirm: () => {
            resetProgress();
            setConfirmingReset(false);
          },
        },
      ].map(
        ({ key, confirming, setConfirming, label, description, onConfirm }) => (
          <div
            key={key}
            className="rounded-2xl border border-border bg-surface p-4"
          >
            {!confirming ? (
              <button
                onClick={() => setConfirming(true)}
                className="flex w-full items-center justify-between text-left"
              >
                <span className="font-display text-base font-medium text-clay">
                  {label}
                </span>
                <Trash2 size={18} className="text-clay" />
              </button>
            ) : (
              <div className="space-y-3">
                <p className="text-sm leading-relaxed text-stone">
                  {description}
                </p>
                <div className="flex gap-2">
                  <button
                    onClick={() => setConfirming(false)}
                    className="flex-1 rounded-full border border-border py-2.5 font-display text-sm font-semibold text-ink"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={onConfirm}
                    className="flex-1 rounded-full bg-clay py-2.5 font-display text-sm font-semibold text-canvas"
                  >
                    Reset
                  </button>
                </div>
              </div>
            )}
          </div>
        ),
      )}

      <p className="px-1 text-sm text-stone">
        More preferences are coming soon.
      </p>
    </PageContainer>
  );
}
