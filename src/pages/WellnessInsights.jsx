import { useMemo } from "react";
import { BarChart2 } from "lucide-react";
import PageContainer from "../components/layout/PageContainer";
import EmptyState from "../components/common/EmptyState";
import InsightStatGrid from "../components/insights/InsightStatGrid";
import InsightReflectionCard from "../components/insights/InsightReflectionCard";
import { useProgress } from "../context/ProgressContext";
import { useRecoveryProgress } from "../context/RecoveryProgressContext";
import { useEyeRecoveryProgress } from "../context/EyeRecoveryProgressContext";
import { useHydration } from "../context/HydrationContext";
import { useWellness } from "../context/WellnessContext";
import { useOnboarding } from "../context/OnboardingContext";
import { useAchievements } from "../context/AchievementsContext";
import { useDocumentTitle } from "../hooks/useDocumentTitle";
import { ROUTINES } from "../data/routines";
import { ROUTINE_CATEGORIES } from "../data/routineCategories";
import {
  getMovementOverview,
  getHydrationPatterns,
  getWellnessTrends,
  getRecoveryHabits,
  getGentleReflections,
} from "../utils/wellnessInsights";

// Build a stable map of { routineId: categoryId } and { categoryId: label }
// outside the component so it never re-creates during render.
const ROUTINE_CATEGORY_MAP = Object.fromEntries(
  ROUTINES.map((r) => [r.id, r.categoryId]),
);
const CATEGORY_LABELS = Object.fromEntries(
  ROUTINE_CATEGORIES.map((c) => [c.id, c.label]),
);

export default function WellnessInsights() {
  const {
    completions: routineCompletions,
    currentStreak,
    longestStreak,
  } = useProgress();
  const { completions: recoveryCompletions } = useRecoveryProgress();
  const { completions: eyeCompletions } = useEyeRecoveryProgress();
  const { dailyTotals: hydrationDailyTotals, goal: hydrationGoal } =
    useHydration();
  const { entries: wellnessEntries } = useWellness();
  const { data: onboardingData } = useOnboarding();
  const { unlockedCount: unlockedAchievementsCount } = useAchievements();

  useDocumentTitle("Wellness Insights");

  const insightData = useMemo(
    () => ({
      routineCompletions,
      recoveryCompletions,
      eyeCompletions,
      hydrationDailyTotals,
      hydrationGoal,
      wellnessEntries,
      currentStreak,
      longestStreak,
      routineCategoryMap: ROUTINE_CATEGORY_MAP,
      categoryLabels: CATEGORY_LABELS,
      preferredRoutineDuration: onboardingData.routineDuration,
      unlockedAchievementsCount,
    }),
    [
      routineCompletions,
      recoveryCompletions,
      eyeCompletions,
      hydrationDailyTotals,
      hydrationGoal,
      wellnessEntries,
      currentStreak,
      longestStreak,
      onboardingData.routineDuration,
      unlockedAchievementsCount,
    ],
  );

  const movementStats = useMemo(
    () => getMovementOverview(insightData),
    [insightData],
  );
  const hydrationStats = useMemo(
    () => getHydrationPatterns(insightData),
    [insightData],
  );
  const wellnessTrends = useMemo(
    () => getWellnessTrends(insightData),
    [insightData],
  );
  const recoveryStats = useMemo(
    () => getRecoveryHabits(insightData),
    [insightData],
  );
  const reflections = useMemo(
    () => getGentleReflections(insightData),
    [insightData],
  );

  const hasAnyData =
    routineCompletions.length > 0 ||
    recoveryCompletions.length > 0 ||
    eyeCompletions.length > 0 ||
    hydrationDailyTotals.some((d) => d.total > 0) ||
    wellnessEntries.length > 0;

  return (
    <PageContainer className="flex flex-col gap-8">
      <p className="leading-relaxed text-stone">
        A quiet overview of how you have been caring for yourself — no scores,
        no comparisons, just patterns worth noticing.
      </p>

      {!hasAnyData ? (
        <EmptyState
          icon={BarChart2}
          title="Nothing to reflect on yet"
          description="Use Sthira across a few days and this space will fill with gentle observations about your habits."
        />
      ) : (
        <>
          {/* Movement Overview */}
          {movementStats.length > 0 && (
            <section className="flex flex-col gap-3">
              <h2 className="px-1 font-display text-base font-semibold text-ink">
                Movement
              </h2>
              <InsightStatGrid stats={movementStats} />
            </section>
          )}

          {/* Hydration Patterns */}
          {hydrationStats.length > 0 && (
            <section className="flex flex-col gap-3">
              <h2 className="px-1 font-display text-base font-semibold text-ink">
                Hydration
              </h2>
              <InsightStatGrid stats={hydrationStats} />
            </section>
          )}

          {/* Wellness Trends */}
          {wellnessTrends.length > 0 && (
            <section className="flex flex-col gap-3">
              <h2 className="px-1 font-display text-base font-semibold text-ink">
                Wellness
              </h2>
              <InsightStatGrid stats={wellnessTrends} />
            </section>
          )}

          {/* Recovery Habits */}
          {recoveryStats.length > 0 && (
            <section className="flex flex-col gap-3">
              <h2 className="px-1 font-display text-base font-semibold text-ink">
                Recovery
              </h2>
              <InsightStatGrid stats={recoveryStats} />
            </section>
          )}

          {/* Gentle Reflections */}
          {reflections.length > 0 && (
            <section className="flex flex-col gap-3">
              <h2 className="px-1 font-display text-base font-semibold text-ink">
                Reflections
              </h2>
              <div className="flex flex-col gap-2.5">
                {reflections.map((text, i) => (
                  <InsightReflectionCard key={i} text={text} />
                ))}
              </div>
            </section>
          )}
        </>
      )}
    </PageContainer>
  );
}
