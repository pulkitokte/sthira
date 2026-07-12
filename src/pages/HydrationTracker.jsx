import { useNavigate } from "react-router-dom";
import { Droplet } from "lucide-react";
import PageContainer from "../components/layout/PageContainer";
import FeatureHeader from "../components/layout/FeatureHeader";
import SectionHeader from "../components/common/SectionHeader";
import HelperHint from "../components/common/HelperHint";
import HydrationProgressRing from "../components/hydration/HydrationProgressRing";
import QuickLogButtons from "../components/hydration/QuickLogButtons";
import CustomAmountInput from "../components/hydration/CustomAmountInput";
import TodayLogList from "../components/hydration/TodayLogList";
import { useHydration } from "../context/HydrationContext";
import { useDismissibleHint } from "../hooks/useDismissibleHint";
import { getEncouragementMessage } from "../utils/hydration";
import { useDocumentTitle } from "../hooks/useDocumentTitle";
import { HINT_IDS } from "../constants/hints";
import { PATHS } from "../constants/navigation";

export default function HydrationTracker() {
  const navigate = useNavigate();
  const { todayTotal, goal, remaining, percentage, todaysLogs, addLog } =
    useHydration();
  const hydrationHint = useDismissibleHint(HINT_IDS.HYDRATION_QUICK_LOG);
  useDocumentTitle("Hydration");

  return (
    <>
      <FeatureHeader title="Hydration" />
      <PageContainer className="flex flex-col gap-8">
        <section className="flex flex-col items-center gap-4 rounded-4xl bg-surface p-8 text-center shadow-soft">
          <HydrationProgressRing
            todayTotal={todayTotal}
            goal={goal}
            percentage={percentage}
          />
          <p className="leading-relaxed text-stone">
            {getEncouragementMessage(percentage)}
          </p>
          {remaining > 0 && (
            <p className="text-xs text-stone">
              {remaining} ml left to reach today's goal
            </p>
          )}
        </section>

        {hydrationHint.isVisible && (
          <HelperHint
            icon={Droplet}
            accent="dew"
            message="Quickly log your water intake using the buttons below — no need to be precise."
            onDismiss={hydrationHint.dismiss}
          />
        )}

        <section>
          <SectionHeader title="Log water" />
          <div className="flex flex-col gap-3">
            <QuickLogButtons onLog={addLog} />
            <CustomAmountInput onLog={addLog} />
          </div>
        </section>

        <section>
          <SectionHeader
            title="Logged today"
            actionLabel="History"
            onAction={() => navigate(PATHS.HYDRATION_HISTORY)}
            accent="dew"
          />
          <div className="rounded-3xl border border-border bg-surface p-4">
            <TodayLogList logs={todaysLogs} />
          </div>
        </section>
      </PageContainer>
    </>
  );
}
