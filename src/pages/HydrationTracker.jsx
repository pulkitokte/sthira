import { useNavigate } from "react-router-dom";
import PageContainer from "../components/layout/PageContainer";
import SectionHeader from "../components/common/SectionHeader";
import HydrationProgressRing from "../components/hydration/HydrationProgressRing";
import QuickLogButtons from "../components/hydration/QuickLogButtons";
import CustomAmountInput from "../components/hydration/CustomAmountInput";
import TodayLogList from "../components/hydration/TodayLogList";
import { useHydration } from "../context/HydrationContext";
import { getEncouragementMessage } from "../utils/hydration";
import { PATHS } from "../constants/navigation";

export default function HydrationTracker() {
  const navigate = useNavigate();
  const { todayTotal, goal, remaining, percentage, todaysLogs, addLog } =
    useHydration();

  return (
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
  );
}
