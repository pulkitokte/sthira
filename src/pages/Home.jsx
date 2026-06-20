import { useNavigate } from "react-router-dom";
import { Sunrise, ChevronRight } from "lucide-react";
import PageContainer from "../components/layout/PageContainer";
import TodaysProgressCard from "../components/tracker/TodaysProgressCard";
import ConsistencyCard from "../components/tracker/ConsistencyCard";
import StudyBreakCard from "../components/tracker/StudyBreakCard";
import HydrationSummaryCard from "../components/tracker/HydrationSummaryCard";
import EyeRecoveryHomeCard from "../components/tracker/EyeRecoveryHomeCard";
import WellnessHomeCard from "../components/tracker/WellnessHomeCard";
import { useProgress } from "../context/ProgressContext";
import { useHydration } from "../context/HydrationContext";
import { useWellness } from "../context/WellnessContext";
import { getRecommendedSession } from "../utils/recovery";
import { getRecommendedEyeSession } from "../utils/eyeRecovery";
import { PATHS } from "../constants/navigation";

export default function Home() {
  const navigate = useNavigate();
  const {
    hasCompletedToday,
    totalCompletedToday,
    currentStreak,
    longestStreak,
  } = useProgress();
  const { todayTotal, goal, remaining, percentage } = useHydration();
  const { todayEntry } = useWellness();
  const recommendedSession = getRecommendedSession();
  const recommendedEyeSession = getRecommendedEyeSession();

  const handleSelectRecommended = () => {
    navigate(PATHS.RECOVERY_PLAYER, {
      state: { sessionId: recommendedSession.id },
    });
  };

  const handleSelectRecommendedEye = () => {
    navigate(PATHS.EYE_RECOVERY_PLAYER, {
      state: { sessionId: recommendedEyeSession.id },
    });
  };

  return (
    <PageContainer className="flex flex-col gap-10">
      <section className="rounded-4xl bg-surface p-8 shadow-soft">
        <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-full bg-sage/20">
          <Sunrise size={22} className="text-moss" strokeWidth={1.8} />
        </div>

        <p className="font-display text-sm font-semibold uppercase tracking-[0.12em] text-sage">
          Good morning
        </p>
        <h1 className="mt-2 font-display text-[28px] font-semibold leading-snug text-ink">
          Begin with a little movement
        </h1>
        <p className="mt-3 leading-relaxed text-stone">
          A few gentle minutes before the day takes over. That's all your
          morning routine needs to be.
        </p>

        <button
          onClick={() => navigate(PATHS.LIBRARY)}
          className="mt-6 w-full rounded-full bg-moss py-4 font-display font-semibold tracking-wide text-canvas shadow-soft transition-colors duration-200 hover:bg-moss-dark"
        >
          Start Morning Routine
        </button>
      </section>

      <section>
        <div className="mb-4 flex items-center justify-between px-1">
          <h2 className="font-display text-base font-semibold text-ink">
            Today's Progress
          </h2>
          <button
            onClick={() => navigate(PATHS.HISTORY)}
            className="flex items-center gap-1 text-xs font-medium text-stone transition-colors hover:text-moss"
          >
            History <ChevronRight size={14} />
          </button>
        </div>
        <div className="flex flex-col gap-3">
          <TodaysProgressCard
            hasCompletedToday={hasCompletedToday}
            totalCompletedToday={totalCompletedToday}
          />
          <ConsistencyCard
            currentStreak={currentStreak}
            longestStreak={longestStreak}
          />
        </div>
      </section>

      <section>
        <div className="mb-4 flex items-center justify-between px-1">
          <h2 className="font-display text-base font-semibold text-ink">
            Study Break
          </h2>
          <button
            onClick={() => navigate(PATHS.RECOVERY_LIBRARY)}
            className="flex items-center gap-1 text-xs font-medium text-stone transition-colors hover:text-moss"
          >
            See all <ChevronRight size={14} />
          </button>
        </div>
        <StudyBreakCard
          session={recommendedSession}
          onSelect={handleSelectRecommended}
        />
      </section>

      <section>
        <h2 className="mb-4 px-1 font-display text-base font-semibold text-ink">
          Hydration
        </h2>
        <HydrationSummaryCard
          todayTotal={todayTotal}
          goal={goal}
          remaining={remaining}
          percentage={percentage}
          onSelect={() => navigate(PATHS.HYDRATION)}
        />
      </section>

      <section>
        <div className="mb-4 flex items-center justify-between px-1">
          <h2 className="font-display text-base font-semibold text-ink">
            Eye Recovery
          </h2>
          <button
            onClick={() => navigate(PATHS.EYE_RELAX)}
            className="flex items-center gap-1 text-xs font-medium text-stone transition-colors hover:text-dew"
          >
            See all <ChevronRight size={14} />
          </button>
        </div>
        <EyeRecoveryHomeCard
          session={recommendedEyeSession}
          onSelect={handleSelectRecommendedEye}
        />
      </section>

      <section>
        <h2 className="mb-4 px-1 font-display text-base font-semibold text-ink">
          Wellness
        </h2>
        <WellnessHomeCard
          todayEntry={todayEntry}
          onSelect={() => navigate(PATHS.WELLNESS_TRACKER)}
        />
      </section>
    </PageContainer>
  );
}
