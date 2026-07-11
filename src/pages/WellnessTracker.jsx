import { useNavigate } from "react-router-dom";
import { Leaf, ChevronLeft, Settings as SettingsIcon } from "lucide-react";
import PageContainer from "../components/layout/PageContainer";
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
  const navigate = useNavigate();
  const { todayEntry, recentEntries } = useWellness();
  const wellnessHint = useDismissibleHint(HINT_IDS.WELLNESS_DAILY_CHECKIN);
  useDocumentTitle("Wellness");
  useScrollRestoration(PATHS.WELLNESS_TRACKER);

  const isComplete =
    Boolean(todayEntry) && REQUIRED_FIELDS.every((field) => todayEntry[field]);
  const insight = isComplete ? getWellnessInsight(todayEntry) : null;

  return (
    <>
      {/* ── Header — shared pattern used by Letters/Companion/Calm Sounds ── */}
      <div
        className="sticky top-0 z-10 px-4 pt-12 pb-4"
        style={{
          background: "rgba(250,248,244,0.9)",
          backdropFilter: "blur(12px)",
          WebkitBackdropFilter: "blur(12px)",
          borderBottom: "1px solid rgba(185,175,160,0.12)",
        }}
      >
        <div className="max-w-lg mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2">
            <button
              onClick={() => navigate(-1)}
              className="p-2 -ml-2 rounded-xl transition-all"
              style={{ color: "#8a8070" }}
              aria-label="Go back"
            >
              <ChevronLeft size={20} strokeWidth={1.5} />
            </button>
            <h1
              className="font-display font-light text-ink tracking-tight"
              style={{ fontSize: "1.15rem" }}
            >
              Wellness
            </h1>
          </div>
          <button
            onClick={() => navigate(PATHS.SETTINGS)}
            aria-label="Settings"
            className="rounded-full p-2 text-stone transition-colors hover:bg-moss/10 hover:text-moss"
          >
            <SettingsIcon size={19} strokeWidth={2} />
          </button>
        </div>
      </div>

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
