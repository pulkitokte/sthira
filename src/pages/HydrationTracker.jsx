import { useNavigate } from "react-router-dom";
import { ChevronRight } from "lucide-react";
import PageContainer from "../components/layout/PageContainer";
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

      <section className="flex flex-col gap-3">
        <h2 className="px-1 font-display text-base font-semibold text-ink">
          Log water
        </h2>
        <QuickLogButtons onLog={addLog} />
        <CustomAmountInput onLog={addLog} />
      </section>

      <section className="flex flex-col gap-3">
        <div className="flex items-center justify-between px-1">
          <h2 className="font-display text-base font-semibold text-ink">
            Logged today
          </h2>
          <button
            onClick={() => navigate(PATHS.HYDRATION_HISTORY)}
            className="flex items-center gap-1 text-xs font-medium text-stone transition-colors hover:text-dew"
          >
            History <ChevronRight size={14} />
          </button>
        </div>
        <div className="rounded-3xl border border-border bg-surface p-4">
          <TodayLogList logs={todaysLogs} />
        </div>
      </section>
    </PageContainer>
  );
}
