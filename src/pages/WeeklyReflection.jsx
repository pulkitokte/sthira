import { useMemo } from "react";
import { CalendarDays } from "lucide-react";
import PageContainer from "../components/layout/PageContainer";
import EmptyState from "../components/common/EmptyState";
import GlanceItem from "../components/reflection/GlanceItem";
import ReflectionInsightCard from "../components/reflection/ReflectionInsightCard";
import { useProgress } from "../context/ProgressContext";
import { useRecoveryProgress } from "../context/RecoveryProgressContext";
import { useEyeRecoveryProgress } from "../context/EyeRecoveryProgressContext";
import { useHydration } from "../context/HydrationContext";
import { useWellness } from "../context/WellnessContext";
import { useOnboarding } from "../context/OnboardingContext";
import { useDocumentTitle } from "../hooks/useDocumentTitle";
import {
  getWeekDateRange,
  hasEnoughDataForReflection,
  getGlanceStats,
  getWellnessPatterns,
  getMovementReflection,
  getGentleSuggestions,
} from "../utils/weeklyReflection";

export default function WeeklyReflection() {
  const { completions: routineCompletions } = useProgress();
  const { completions: recoveryCompletions } = useRecoveryProgress();
  const { completions: eyeCompletions } = useEyeRecoveryProgress();
  const { dailyTotals: hydrationDailyTotals } = useHydration();
  const { entries: wellnessEntries } = useWellness();
  const { data: onboardingData } = useOnboarding();

  useDocumentTitle("Weekly Reflection");

  // Assemble data bag once — each utility receives the same shape
  const weekData = useMemo(
    () => ({
      routineCompletions,
      recoveryCompletions,
      eyeCompletions,
      hydrationDailyTotals,
      wellnessEntries,
    }),
    [
      routineCompletions,
      recoveryCompletions,
      eyeCompletions,
      hydrationDailyTotals,
      wellnessEntries,
    ],
  );

  const dateRange = getWeekDateRange();
  const hasData = hasEnoughDataForReflection(weekData);
  const glanceStats = getGlanceStats(weekData);
  const wellnessPatterns = getWellnessPatterns(weekData);
  const movementInsights = getMovementReflection(weekData);
  const suggestions = getGentleSuggestions(weekData, onboardingData);

  return (
    <PageContainer className="flex flex-col gap-8">
      <div className="px-1">
        <p className="text-xs font-medium text-stone">{dateRange}</p>
        <p className="mt-2 leading-relaxed text-stone">
          A gentle look at how you cared for yourself this week — no scores, no
          grades, just a quiet reflection.
        </p>
      </div>

      {!hasData ? (
        <EmptyState
          icon={CalendarDays}
          title="Nothing to reflect on yet"
          description="Use Sthira through the week and this space will fill with gentle observations on how you showed up for yourself."
        />
      ) : (
        <>
          {/* Section 1: At a Glance */}
          <section className="flex flex-col gap-3">
            <h2 className="px-1 font-display text-base font-semibold text-ink">
              This Week at a Glance
            </h2>
            <div className="rounded-3xl border border-border bg-surface px-5 py-2">
              <div className="divide-y divide-border">
                {glanceStats.map((stat) => (
                  <GlanceItem key={stat.id} stat={stat} />
                ))}
              </div>
            </div>
          </section>

          {/* Section 2: Wellness Patterns */}
          {wellnessPatterns.length > 0 && (
            <section className="flex flex-col gap-3">
              <h2 className="px-1 font-display text-base font-semibold text-ink">
                Wellness Patterns
              </h2>
              <div className="flex flex-col gap-2.5">
                {wellnessPatterns.map((pattern) => (
                  <ReflectionInsightCard key={pattern.id} text={pattern.text} />
                ))}
              </div>
            </section>
          )}

          {/* Section 3: Movement Reflection */}
          {movementInsights.length > 0 && (
            <section className="flex flex-col gap-3">
              <h2 className="px-1 font-display text-base font-semibold text-ink">
                Movement
              </h2>
              <div className="flex flex-col gap-2.5">
                {movementInsights.map((insight) => (
                  <ReflectionInsightCard key={insight.id} text={insight.text} />
                ))}
              </div>
            </section>
          )}

          {/* Section 4: Gentle Suggestions */}
          {suggestions.length > 0 && (
            <section className="flex flex-col gap-3">
              <h2 className="px-1 font-display text-base font-semibold text-ink">
                A Few Thoughts
              </h2>
              <div className="flex flex-col gap-2.5">
                {suggestions.map((suggestion) => (
                  <ReflectionInsightCard
                    key={suggestion.id}
                    text={suggestion.text}
                    accent="clay"
                  />
                ))}
              </div>
            </section>
          )}
        </>
      )}
    </PageContainer>
  );
}
