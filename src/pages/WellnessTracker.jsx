import PageContainer from "../components/layout/PageContainer";
import WellnessCheckIn from "../components/wellness/WellnessCheckIn";
import WellnessInsightCard from "../components/wellness/WellnessInsightCard";
import WeeklyOverviewList from "../components/wellness/WeeklyOverviewList";
import { useWellness } from "../context/WellnessContext";
import { getWellnessInsight } from "../utils/wellness";

const REQUIRED_FIELDS = ["energy", "focus", "stress", "mood"];

export default function WellnessTracker() {
  const { todayEntry, recentEntries } = useWellness();

  const isComplete =
    Boolean(todayEntry) && REQUIRED_FIELDS.every((field) => todayEntry[field]);
  const insight = isComplete ? getWellnessInsight(todayEntry) : null;

  return (
    <PageContainer className="flex flex-col gap-8">
      <section className="flex flex-col gap-4">
        <div className="px-1">
          <h2 className="font-display text-base font-semibold text-ink">
            Today's Check-In
          </h2>
          <p className="mt-1 text-sm text-stone">
            A quiet moment to notice how you're doing.
          </p>
        </div>
        <WellnessCheckIn />
      </section>

      <section className="flex flex-col gap-3">
        <h2 className="px-1 font-display text-base font-semibold text-ink">
          Today's Insight
        </h2>
        <WellnessInsightCard insight={insight} />
      </section>

      <section className="flex flex-col gap-3">
        <h2 className="px-1 font-display text-base font-semibold text-ink">
          Past 7 Days
        </h2>
        <WeeklyOverviewList entries={recentEntries} />
      </section>
    </PageContainer>
  );
}
