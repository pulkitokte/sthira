import { useNavigate } from "react-router-dom";
import { Droplet, ChevronLeft, Settings as SettingsIcon } from "lucide-react";
import PageContainer from "../components/layout/PageContainer";
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
              Hydration
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
