import { Leaf } from "lucide-react";
import PageContainer from "../components/layout/PageContainer";
import FeatureHeader from "../components/layout/FeatureHeader";
import HelperHint from "../components/common/HelperHint";
import WellnessCheckIn from "../components/wellness/WellnessCheckIn";
import WellnessInsightCard from "../components/wellness/WellnessInsightCard";
import WeeklyOverviewList from "../components/wellness/WeeklyOverviewList";
import { useWellness } from "../context/WellnessContext";
import { useDismissibleHint } from "../hooks/useDismissibleHint";
import { getWellnessInsight } from "../utils/wellness";
import { useDocumentTitle } from "../hooks/useDocumentTitle";
import { useScrollRestoration } from "../hooks/useScrollRestoration";
import { HINT_IDS } from "../constants/hints";
import { PATHS } from "../constants/navigation";

const REQUIRED_FIELDS = ["energy", "focus", "stress", "mood"];

export default function WellnessTracker() {
  const { todayEntry, recentEntries } = useWellness();
  const wellnessHint = useDismissibleHint(HINT_IDS.WELLNESS_DAILY_CHECKIN);
  useDocumentTitle("Wellness");
  useScrollRestoration(PATHS.WELLNESS_TRACKER);

  const isComplete =
    Boolean(todayEntry) && REQUIRED_FIELDS.every((field) => todayEntry[field]);
  const insight = isComplete ? getWellnessInsight(todayEntry) : null;

  return (
    <>
      <FeatureHeader title="Wellness" />
      <PageContainer className="flex flex-col gap-8">
        {wellnessHint.isVisible && (
          <HelperHint
            icon={Leaf}
            message="Check in once a day — it takes less than a minute and helps you notice patterns."
            onDismiss={wellnessHint.dismiss}
          />
        )}

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
    </>
  );
}
